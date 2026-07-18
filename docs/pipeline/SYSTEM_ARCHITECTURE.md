# SAPTHAM CREATIVE PIPELINE — SYSTEM ARCHITECTURE
### Principal architecture for the multi-provider asset generation system · v1.0
**Design-only. No implementation code. Companion docs: `FOLDER_STRUCTURE.md`, `IMPLEMENTATION_PLAN.md`, `PIPELINE_FLOW.md`, `DATA_MODELS.md`.**

> The pipeline turns the Saptham design system (`CANON.md`, `MASTER_ASSET_INVENTORY.md`, `PROMPT_LIBRARY.md`, `STORYBOARD.md`) into finished, versioned, searchable assets by orchestrating multiple AI providers (Gemini Image, OpenAI Images, Runway, Kling, and future models) behind one abstraction.

---

## 1 · GOALS & NON-GOALS

**Goals**
- One command generates any asset, batch, or **scene** with the correct style locked in automatically.
- Providers are pluggable; adding a future model is a config + adapter change, never a core rewrite.
- Every artifact is versioned, traceable to its exact prompt/seed/provider, and searchable.
- The Design Bible (`{{GSC}}`, tokens, NEG presets, acceptance test) is injected — never re-typed, never drifts.
- The Storyboard drives *what* to make and *in what order*; the pipeline reports scene completeness.

**Non-goals (explicitly out of scope for this system)**
- 3D authoring (Blender) — external; the pipeline only *references/registers* 3D deliverables.
- Website/runtime code — the site consumes `delivery/`, it is not part of this pipeline.
- Human art direction judgement — the pipeline *gates* on the acceptance test but a human approves.

---

## 2 · GUIDING PRINCIPLES

1. **Contract-first.** Every layer talks through a stable schema (see `DATA_MODELS.md`). Milestones build in parallel behind these contracts.
2. **Canon is data, not prose.** The bible's GSC, tokens, NEG presets, and naming rules live in `canon.yaml` and are *injected*, so no prompt is ever authored without them.
3. **Declarative units of work.** A **Prompt Card** (one YAML per asset) is the atomic job. The engine composes; the provider executes; nothing is imperative until the adapter.
4. **Deterministic & idempotent.** A request key = hash of (asset, version, composed prompt, provider, model, seed, params). Re-runs skip existing artifacts unless `--force`.
5. **Provider-agnostic core.** The core knows only `GenerationRequest`/`GenerationResult`. Dialect and quirks live in adapters.
6. **Immutable outputs, promotable versions.** Generations are never overwritten; status transitions (draft→candidate→approved→published) move them forward.
7. **Everything is provenance.** Each artifact carries a full lineage record; the index is rebuildable from sidecars.
8. **Fail loud, retry smart.** Structured errors, exponential backoff, per-provider circuit breakers, dead-letter for human review.

---

## 3 · LAYERED ARCHITECTURE

```
┌────────────────────────────────────────────────────────────────────────┐
│  L9  INTERFACE            CLI · run-configs · review/approve · reports    │
├────────────────────────────────────────────────────────────────────────┤
│  L8  OBSERVABILITY        structured logs · cost ledger · run manifests   │
├────────────────────────────────────────────────────────────────────────┤
│  L7  INDEX & SEARCH       metadata DB (SQLite+FTS) · query API            │
├────────────────────────────────────────────────────────────────────────┤
│  L6  STORAGE & VERSIONING output manager · content store · version graph  │
├────────────────────────────────────────────────────────────────────────┤
│  L5  ORCHESTRATION        planner · job queue · scheduler · retry · CB     │
├────────────────────────────────────────────────────────────────────────┤
│  L4  PROVIDER ABSTRACTION  Provider iface · capability registry · router   │
│                            adapters: Gemini · OpenAI · Runway · Kling · …  │
├────────────────────────────────────────────────────────────────────────┤
│  L3  PROMPT ENGINE        compose(GSC+card+tokens+NEG) · dialect · AR map  │
├────────────────────────────────────────────────────────────────────────┤
│  L2  KNOWLEDGE BASE       ingest docs → Asset/PromptCard/Scene registry    │
├────────────────────────────────────────────────────────────────────────┤
│  L1  DOMAIN MODEL         Asset · Card · Scene · Batch · Job · Artifact …  │
├────────────────────────────────────────────────────────────────────────┤
│  L0  CANON / CONFIG       canon.yaml (GSC/tokens/NEG) · providers.yaml ·   │
│                           secrets (.env) · policy.yaml                     │
└────────────────────────────────────────────────────────────────────────┘

CROSS-CUTTING
  Design-Bible integration : L0 canon → injected at L3 → gated at L9
  Storyboard integration   : L2 scene graph → planned at L5 → reported at L8/L9
```

**Dependency rule:** upper layers depend only on the *contracts* of lower layers, never their internals. L4 adapters depend on the Provider interface (L4) + request/result schema (L1) — nothing else.

---

## 4 · COMPONENT CATALOG

### 4.1 Canon & Config (L0)
- **`canon.yaml`** — machine-readable Design Bible: `gsc` (verbatim block), `tokens` (palette, `gold_gradient`, `swara_hues`), `neg_presets` (A/B/C-tex/C-particle/photo), `naming_convention`, `acceptance_test` checklist, `families` (A/B/C rules incl. lighting/background overrides).
- **`providers.yaml`** — per-provider config: enabled, model ids, capability overrides, cost, rate limits, family/modality priority.
- **`policy.yaml`** — routing & governance: cost ceilings, quality-vs-cost preference, retry/backoff params, concurrency caps, approval requirements per priority.
- **Secrets** — API keys via environment / secret manager only; never in `canon`/`providers`.

### 4.2 Domain Model (L1)
Pure schemas, no behavior: `Asset`, `PromptCard`, `Scene`, `Batch`, `ProviderConfig`, `Capability`, `GenerationRequest`, `GenerationResult`, `Artifact`, `AssetVersion`, `Job`, `RunManifest`, `IndexRecord`, `CostEntry`, `LogEvent`. (Full spec: `DATA_MODELS.md`.)

### 4.3 Knowledge Base / Registry (L2)
- **Ingesters** parse `MASTER_ASSET_INVENTORY.md`, `PROMPT_LIBRARY.md`, `STORYBOARD.md` (and `CANON.md`) into validated records. Prefer a **structured mirror** (`registry/*.yaml`) generated once and hand-corrected, so the pipeline reads data, not markdown, at runtime.
- **Validators** enforce: every asset has a canonical ID; every Card resolves to a registered Asset; every Scene's required assets exist; NEG preset + family are valid.
- **Scene graph** — Scene → required Asset IDs (from `STORYBOARD.md` matrix), enabling scene-aware planning + completeness reporting.

### 4.4 Prompt Engine (L3)
Deterministic composition pipeline:
```
PromptCard + canon(GSC,tokens,NEG) + scene(swara hue)
  → resolve tokens (swara→hue, gold gradient)
  → assemble composed_prompt = GSC ⊕ subject ⊕ fields (family-aware overrides)
  → resolve negative = neg_preset[family] ⊕ card.negative_delta
  → map aspect_ratio → provider param (per dialect)
  → attach references (style_anchor + batch_anchor) for consistency
  → provider dialect pass (phrasing/param names)
  → emit GenerationRequest + prompt_hash
```
Guarantees: same inputs → same `composed_prompt` + `prompt_hash` (idempotency & caching). The engine is provider-*aware* but not provider-*coupled* (dialect is a strategy).

### 4.5 Provider Abstraction (L4)
- **`Provider` interface** (uniform contract): `describe_capabilities()`, `validate(request)`, `submit(request)→JobHandle|Result`, `poll(handle)→Status|Result`, `fetch(ref)→bytes`, `estimate_cost(request)`.
- **`Capability`** descriptor per provider/model: modality (image|video), sync|async, `max_resolution`, `aspect_ratios`, `supports_negative_prompt`, `reference_images` (count), `supports_seed`, `formats`, `cost_unit`, `rate_limit`.
- **Adapters** normalize each vendor to the canonical request/result: `GeminiImageAdapter`, `OpenAIImageAdapter`, `RunwayAdapter` (video, async), `KlingAdapter` (video, async). Adapters own auth, payload shaping, polling, error mapping.
- **Router / Dispatcher** — given a `GenerationRequest`, returns an ordered provider candidate list from: modality match → capability match (AR/res/negatives/refs) → family policy (`providers.yaml` priority) → availability (circuit-breaker state) → cost policy. Produces a **fallback chain**, not a single pick.
- **Capability-aware degradation** — if a chosen provider lacks native negatives, the engine folds negatives into the prompt; if it lacks the exact AR, router picks the nearest supported + flags for crop.

### 4.6 Orchestration (L5)
- **Planner** expands a target (`--asset`, `--batch`, `--scene`, `--all`) into a job set using the registry + scene graph + roadmap production order; applies dependency rules (style anchor first; batch anchor before siblings).
- **Job queue + scheduler** — concurrency caps per provider (from `policy.yaml`), respects rate limits, honors idempotency (skip existing).
- **Retry & resilience** — exponential backoff w/ jitter; classify errors (retryable: 429/5xx/timeouts; fatal: 4xx/validation); **circuit breaker** per provider trips to fallback; **dead-letter queue** for exhausted/fatal jobs → surfaced for human review.
- **Async handling** — video jobs (Runway/Kling) submit → persist `JobHandle` → poll loop (or webhook) → fetch on completion. The queue is durable so long video jobs survive restarts.

### 4.7 Storage & Versioning (L6)
- **Output Manager** writes each result to a deterministic path (see `FOLDER_STRUCTURE.md`) with a **JSON sidecar** (full metadata + provenance) and a **content hash**.
- **Version graph** — per canonical asset: `AssetVersion` records (`v1`, `v2`, …), each with `variants` (candidates/seeds), `status` (draft→candidate→approved→published→deprecated), `parent`, `lineage` (prompt_hash, provider, model, seed, reference_ids). History is immutable; promotion never mutates bytes.
- **Delivery** — approving/publishing a variant *copies* it to `delivery/` under the CANON file name, ready for the website. The store keeps every candidate.

### 4.8 Index & Search (L7)
- **Metadata DB** — SQLite + FTS5 (single-file, zero-ops, rebuildable from sidecars). Tables: `assets`, `artifacts`, `versions`, `runs`, `costs`, `scene_assets`, `fts_prompts`.
- **Query API** — search by any facet: `id`, `scene`, `batch`, `family`, `category`, `provider`, `model`, `status`, `tag`, free-text over `composed_prompt`/`subject`, dimensions, cost range, date. Powers CLI queries and completeness reports.
- **Rebuild** — `index rebuild` re-scans sidecars → DB, so the index is never the source of truth (files are).

### 4.9 Observability (L8)
- **Structured logging** (JSON events) with correlation ids (`run_id`, `job_id`, `asset_id`).
- **Run manifest** per invocation: inputs, resolved job set, per-job outcome, retries, cost, duration — a reproducible record.
- **Cost ledger** — every provider call logs a `CostEntry`; reports roll up by run/provider/scene/batch.
- **Provenance** — the sidecar + manifest together let anyone answer "how was this pixel made?" months later.

### 4.10 Interface (L9)
- **CLI** (thin; all logic in libraries): `ingest`, `plan`, `compose` (dry-run prompt), `generate`, `retry`, `status`, `review`, `approve`, `publish`, `search`, `report`, `scene`, `index`.
- **Run-configs** — YAML files describing a run (target, provider policy, variants, ceilings) for reproducible, reviewable batch runs.
- **Review/approval** — a lightweight local review surface (contact-sheet HTML generated from the index) + `approve`/`reject` writing status back to versions; enforces the **acceptance-test gate** before publish for Critical/High assets.

---

## 5 · CROSS-CUTTING DESIGN

### 5.1 Design-Bible integration (consistency is structural, not hoped)
- `{{GSC}}`, tokens, NEG presets loaded from `canon.yaml`; the Prompt Engine **always** prepends GSC and resolves swara tint from the asset's scene.
- **Reference-image pinning** — the approved **Style Anchor (Batch 00)** and the current **batch anchor** are auto-attached as provider reference images (where supported), enforcing the pipeline's #1 anti-drift rule.
- **Acceptance gate** — publish is blocked for C/H assets until a human records the 5-point acceptance-test result (stored on the version).

### 5.2 Storyboard integration (scene awareness)
- Scene graph (`registry/scenes.yaml` from `STORYBOARD.md`) maps Scene → required Asset IDs + swara accent + priority.
- `generate --scene 06` plans exactly that scene's assets; `report --scenes` shows per-scene completeness (approved/total), gating a scene as "ready to build" only when its Critical assets are published.

### 5.3 Idempotency & caching
- Request key = `sha256(asset_id | version | prompt_hash | provider | model | seed | params)`. Existing artifact → skip. Prompt cache keyed by `prompt_hash` avoids recompute.

### 5.4 Governance
- Cost ceilings per run/provider in `policy.yaml`; the planner estimates cost before executing and refuses to exceed the ceiling without `--confirm`.
- Rate-limit + concurrency from config; circuit breakers protect against provider outages.

---

## 6 · EXTENSIBILITY — ADDING A FUTURE MODEL
A new provider is a **4-step, core-untouched** change:
1. Add its block to `providers.yaml` (models, capabilities, cost, priority).
2. Implement a new adapter satisfying the `Provider` interface + a `Capability` descriptor.
3. (Optional) add a **dialect** strategy in the Prompt Engine if its phrasing differs.
4. Register it; the Router picks it up automatically via capability/policy matching.
**Contract tests** (a shared adapter test-suite) guarantee any new adapter behaves. No changes to L1/L2/L3/L5/L6/L7.

---

## 7 · RECOMMENDED TECH STACK (for the build phase — not written yet)
| Concern | Recommendation | Why |
|---|---|---|
| Language | Python 3.12 | Best AI-SDK coverage; team familiarity |
| Schemas/validation | Pydantic v2 | Contracts as code; the `DATA_MODELS.md` maps 1:1 |
| CLI | Typer | Thin, typed CLI surface (L9) |
| HTTP | httpx | Async, needed for video polling |
| Retry | tenacity | Backoff/jitter/circuit patterns |
| Index | SQLite + FTS5 | Zero-ops, single-file, rebuildable |
| Cards/config | YAML | Human-editable declarative units |
| Sidecars/manifests | JSON | Machine-canonical provenance |
| Queue (v1) | in-process durable (SQLite-backed) | Simple; upgrade to a broker only if needed |
*(These are recommendations to lock at M0; the architecture is language-agnostic.)*

---

## 8 · KEY ARCHITECTURAL DECISIONS (ADR summary)
| # | Decision | Rationale |
|---|---|---|
| ADR-1 | Canon as injected data, not authored prose | Kills style drift at the source |
| ADR-2 | Prompt Card = atomic declarative job | Reproducible, reviewable, diffable |
| ADR-3 | Provider interface + router w/ fallback chain | Pluggable providers; resilience |
| ADR-4 | Files are source of truth; index is derived | Rebuildable, portable, git-friendly |
| ADR-5 | Immutable artifacts + promotable versions | Full history, safe approvals |
| ADR-6 | Scene graph drives planning & completeness | Storyboard-aware production |
| ADR-7 | Contract-first layers | Milestones built independently in parallel |

---
*Saptham Creative Pipeline · System Architecture v1.0 · design before code.*

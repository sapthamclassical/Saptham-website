# SAPTHAM CREATIVE PIPELINE — IMPLEMENTATION PLAN
### Milestone roadmap · contract-first, independently buildable · v1.0
**Design-only. Companion to `SYSTEM_ARCHITECTURE.md`, `DATA_MODELS.md`, `PIPELINE_FLOW.md`, `FOLDER_STRUCTURE.md`. No code written yet.**

> Principle: **M0 locks every contract** (schemas + interfaces). After that, each milestone is built against those contracts behind mocks, so **M1–M9 can proceed in parallel by different people** and integrate cleanly. Each milestone below states its **contract dependency** (what it needs from M0), its **runtime dependency** (what it needs live — kept minimal), its **deliverable**, and its **acceptance criteria / definition of done**.

---

## 0 · MILESTONE MAP AT A GLANCE

| M | Name | Layer(s) | Runtime deps | Parallelizable after M0? | Ships value |
|---|---|---|---|---|---|
| **M0** | Contracts & Canon | L0–L1 | — | (is the gate) | Schemas, canon.yaml, validation |
| **M1** | Registry & Ingestion | L2 | M0 | ✅ | Docs → validated data |
| **M2** | Prompt Engine | L3 | M0 | ✅ (mock cards) | Deterministic composed prompts (dry-run) |
| **M3** | Provider Abstraction + Gemini | L4 | M0 | ✅ (mock requests) | 1 image provider behind the interface |
| **M4** | Orchestration + Storage + Versioning | L5–L6 | M0 (+M3 for live) | ✅ (mock provider) | End-to-end single-asset generation |
| **M5** | Index & Search + Scene Awareness | L7 | M0 (+M4 data) | ✅ | Searchable catalog, generate-by-scene |
| **M6** | 2nd image provider + Routing/Fallback | L4 | M3 | ✅ | OpenAI + resilient routing |
| **M7** | Video providers (Runway, Kling) | L4–L5 | M3 pattern | ✅ | Async video generation |
| **M8** | Review / Approve / Publish + Bible gate | L9–L6 | M4 | ✅ | Human gate → delivery |
| **M9** | Observability, Reports, Extensibility SDK | L8–L9 | M4/M5 | ✅ | Cost/completeness dashboards, plugin SDK |

**Critical path to first real asset:** `M0 → M3 → M4` (with a hand-written card). Everything else enriches around it.

---

## M0 · CONTRACTS & CANON  *(the gate — do first, alone)*
**Goal:** freeze every schema and interface so all other milestones build in parallel.
**Scope**
- Author all `DATA_MODELS.md` entities as validated schemas (Pydantic v2 recommended).
- Define the **`Provider` interface** + `Capability` descriptor as an abstract contract.
- Author `canon.yaml`, `providers.yaml`, `policy.yaml` schemas + a real `canon.yaml` (from `CANON.md`).
- Repo skeleton (`pipeline/`, `vault/`, `configs/`), `.gitignore`/`.gitattributes` (LFS), env template.
- Import-lint rule enforcing layer dependency direction.
**Deliverable:** compiling schema package + config loaders + validators (no generation).
**Contract dep:** none. **Runtime dep:** none.
**Definition of done:** `canon load` validates all three config files; a sample `Asset`, `PromptCard`, `GenerationRequest`, `Artifact` round-trip through schema validation; the `Provider` interface + a `FakeProvider` (returns a static image) exist for downstream mocking.
**Independence:** this is the only sequential prerequisite; nothing else starts until contracts are frozen.

---

## M1 · REGISTRY & INGESTION
**Goal:** turn the design docs into validated `registry/*.yaml`.
**Scope:** ingesters for `MASTER_ASSET_INVENTORY.md`, `PROMPT_LIBRARY.md`, `STORYBOARD.md`, `ASSET_PRODUCTION_ROADMAP.md`; referential validators (§PIPELINE_FLOW 2); scene graph builder.
**Deliverable:** `ingest` command → `registry/assets.yaml`, `scenes.yaml`, `batches.yaml`, `cards/*` stubs; a validation report listing any gaps.
**Contract dep:** M0 (Asset/Scene/Batch/Card schemas). **Runtime dep:** none.
**DoD:** ingest produces registry files that pass validation; every scene's required assets resolve; a gap report is emitted for anything missing (e.g., flags the CANON-added assets that still lack cards).
**Independence:** pure transform; testable against fixture docs.

---

## M2 · PROMPT ENGINE
**Goal:** deterministic `PromptCard + Canon → GenerationRequest`.
**Scope:** compose (GSC ⊕ subject ⊕ fields, family-aware overrides), negative resolution, swara-token resolution, aspect mapping, reference attachment, **dialect strategy** interface (+ a default dialect), `prompt_hash`.
**Deliverable:** `compose <asset>` (dry-run) prints the exact composed prompt + negative + refs + hash.
**Contract dep:** M0 (Card, Canon, Request). **Runtime dep:** none (mock cards ok).
**DoD:** same inputs → identical `composed_prompt` + `prompt_hash` (golden tests); family-A asset shows flat-lighting override; a swara-scene asset resolves the correct hue; negatives = preset ⊕ delta.
**Independence:** fully offline; no provider needed.

---

## M3 · PROVIDER ABSTRACTION + GEMINI IMAGE
**Goal:** first real provider behind the interface.
**Scope:** `providers/base` (interface, capability registry, request/result normalizers); `GeminiImageAdapter` (auth, payload, negatives-folding when unsupported, error mapping, seed, references); a minimal single-pick router (image only).
**Deliverable:** given a `GenerationRequest`, returns a `GenerationResult` with real image bytes.
**Contract dep:** M0 (Provider iface, Request/Result). **Runtime dep:** Gemini API key.
**DoD:** contract-test suite (shared, provider-agnostic) passes for Gemini; capability descriptor accurate; a live smoke test generates 1 image; failures map to typed `ErrorInfo{retryable}`.
**Independence:** consumes M0 contracts + mock requests; does not need M2/M4 to be tested.

---

## M4 · ORCHESTRATION + STORAGE + VERSIONING
**Goal:** end-to-end single-asset generation with durable, versioned outputs.
**Scope:** planner (single asset + anchor-first rule), in-process durable job queue, concurrency caps, retry/backoff + circuit breaker + DLQ; output manager (content store, sidecars, working paths), version graph + status machine, delivery scaffold.
**Deliverable:** `generate --asset <ID>` → candidates on disk with sidecars + `asset.json`; retries + DLQ observable.
**Contract dep:** M0. **Runtime dep:** M3 for live pixels (or `FakeProvider` for full offline test).
**DoD:** with `FakeProvider`, `generate` produces versioned candidates + sidecars + run manifest; forced provider error exercises backoff → circuit-breaker → DLQ; re-run is idempotent (skips).
**Independence:** testable entirely on `FakeProvider`; swap in M3 for reality.

---

## M5 · INDEX & SEARCH + SCENE AWARENESS
**Goal:** searchable catalog + storyboard-driven runs/reports.
**Scope:** SQLite+FTS schema, sidecar→DB writer + `index rebuild`, query API + `search`, scene planner (`generate --scene`), completeness `report --scenes`.
**Deliverable:** `search`/`report` answer facet + free-text queries; `generate --scene 06` plans that scene.
**Contract dep:** M0. **Runtime dep:** M4 outputs (or fixture sidecars).
**DoD:** rebuild reconstructs the DB from sidecars alone; queries by scene/batch/family/provider/status/free-text return correct sets; scene report shows approved/total per scene.
**Independence:** builds against fixture sidecars; no provider needed.

---

## M6 · SECOND IMAGE PROVIDER + ROUTING / FALLBACK
**Goal:** resilient multi-provider image routing.
**Scope:** `OpenAIImageAdapter`; upgrade router to capability + family-policy candidate list with fallback chain; cost-aware pick; provider circuit-breaker integration.
**Deliverable:** `generate` transparently fails over Gemini↔OpenAI; policy chooses per family/cost.
**Contract dep:** M0. **Runtime dep:** M3 (interface) + OpenAI key.
**DoD:** contract suite passes for OpenAI; killing provider #1 mid-run fails over to #2 without data loss; routing respects `providers.yaml` family priority + `policy.yaml` ceilings.
**Independence:** additive to M3; router upgrade is isolated.

---

## M7 · VIDEO PROVIDERS (RUNWAY, KLING)
**Goal:** async video generation.
**Scope:** `RunwayAdapter`, `KlingAdapter` (async submit/poll/fetch); durable async job handling in the queue; optional webhook short-circuit; video-aware capability/router.
**Deliverable:** `generate --asset HERO-11` produces an mp4 via submit→poll→fetch, surviving process restart.
**Contract dep:** M0 (Provider iface incl. `poll`). **Runtime dep:** M3 pattern + Runway/Kling keys.
**DoD:** contract suite (async variant) passes; a long job persists `job_handle`, survives a restart, then fetches; failure paths hit retry/DLQ.
**Independence:** reuses the M3 interface + M4 queue; no changes to image path.

---

## M8 · REVIEW / APPROVE / PUBLISH + DESIGN-BIBLE GATE
**Goal:** human gate from candidate → website-ready delivery.
**Scope:** contact-sheet generator (from index), `approve`/`reject`/`publish`, acceptance-test capture, C/H publish gate, delivery copy with CANON naming, style-anchor reference pinning enforcement.
**Deliverable:** review a run visually, approve a variant, publish → `vault/delivery/**`.
**Contract dep:** M0 (Version/Artifact status). **Runtime dep:** M4 (+M5 index).
**DoD:** publishing a C/H asset is blocked until acceptance recorded; published variant appears under correct CANON filename; anchor-not-approved blocks sibling generation (drift guard verified).
**Independence:** operates on stored artifacts + index; provider-agnostic.

---

## M9 · OBSERVABILITY, REPORTS & EXTENSIBILITY SDK
**Goal:** operational visibility + a clean path for future models.
**Scope:** cost ledger rollups, run manifests, `report --cost/--batches`, structured-log dashboards; **provider plugin SDK** (adapter template + shared contract-test kit) so a future model is a drop-in; docs for "add a provider in 4 steps."
**Deliverable:** cost/completeness reports; a documented, test-backed extension path.
**Contract dep:** M0. **Runtime dep:** M4/M5.
**DoD:** cost report reconciles with per-job `CostEntry`; a throwaway `TemplateProvider` built from the SDK passes the contract suite without touching core; completeness report drives "scene ready to build."
**Independence:** reporting reads the index; SDK reuses the M3 interface.

---

## SEQUENCING & PARALLELIZATION

```
            ┌──────────────── M1 Registry ────────────────┐
            │                                              │
M0 ─gate─▶ ├── M2 Prompt Engine ──┐                        ├─▶ integrate
            │                      ├─▶ M4 Orchestration+Storage ─┬─▶ M5 Index/Scene ─▶ M8 Review/Publish
            ├── M3 Providers+Gemini┘                            │                       │
            │        │                                          └─────────▶ M9 Observability/SDK
            │        ├── M6 OpenAI+Routing (after M3)
            │        └── M7 Video (after M3)
```
- **Wave 1 (parallel after M0):** M1, M2, M3.
- **Wave 2:** M4 (needs M2+M3 contracts; testable on FakeProvider).
- **Wave 3 (parallel):** M5, M6, M7.
- **Wave 4:** M8, then M9.
- **First usable product (walking skeleton):** M0 → M3 → M4 with one hand-written card = a real generated, versioned asset. Everything after is enrichment.

---

## GLOBAL DEFINITION OF DONE (applies to every milestone)
1. Contract-conformant (no schema outside `DATA_MODELS.md`).
2. Unit tests + (for providers) the shared contract-test suite pass.
3. Works offline against mocks/fixtures where its runtime dep isn't present.
4. Structured logs + (if it writes assets) sidecars + manifest.
5. A one-paragraph runbook entry (how to invoke, what it needs, failure modes).

## RISKS & MITIGATIONS
| Risk | Mitigation |
|---|---|
| Provider API drift | Capability in config + contract tests catch breakage early |
| Style drift across runs | Canon injection + anchor reference pinning (M8 gate) |
| Cost overrun | `policy.yaml` ceilings + pre-run estimate + `--confirm` |
| Long video jobs lost | Durable queue + persisted `job_handle` (M7) |
| Docs↔pipeline divergence | `ingest` re-derives registry; validation blocks gaps (M1) |
| Index corruption | Files are truth; `index rebuild` from sidecars |

---
*Saptham Creative Pipeline · Implementation Plan v1.0 · lock M0, then build in parallel.*

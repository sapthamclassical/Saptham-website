# SAPTHAM CREATIVE PIPELINE — PIPELINE FLOW
### End-to-end flows, sequences & state machines · v1.0
**Design-only. Companion to `SYSTEM_ARCHITECTURE.md` + `DATA_MODELS.md`. Diagrams are ASCII; no code.**

---

## 1 · MACRO FLOW (docs → delivered asset)

```
 DESIGN DOCS                CANON/REGISTRY            PER-ASSET GENERATION            DELIVERY
 ───────────                ──────────────            ────────────────────            ────────
 CANON.md        ─ingest→   canon.yaml        ┐
 INVENTORY.md    ─ingest→   registry/assets   ┤
 PROMPT_LIB.md   ─ingest→   cards/*.yaml      ┼─plan→ jobs ─compose→ request ─route→ provider
 STORYBOARD.md   ─ingest→   registry/scenes   ┤                                   │
 ROADMAP.md      ─ingest→   registry/batches  ┘                        retry/CB ◀──┤ (on error)
                                                                                    ▼
                                        artifacts ◀─store/version◀─ result ◀─fetch─ provider
                                            │
                                     index ◀┴─ observability(log,cost,manifest)
                                            │
                                     review → approve → publish → delivery/ (website consumes)
```

---

## 2 · INGESTION FLOW (one-time + on doc change)

```
ingest ──▶ parse each design doc ──▶ normalize to records ──▶ VALIDATE ──▶ write registry/*.yaml
                                                              │
                              referential checks:             ├─ every asset has canonical id
                                                              ├─ every card ↔ registered asset
                                                              ├─ every scene asset exists
                                                              ├─ family ∈ {A,B,C-tex,C-particle,photo,assembly}
                                                              └─ neg preset + naming resolvable
                                                              │
                                            FAIL → report gaps (exit) ── PASS → registry ready
```
Output is **hand-verified** once, then treated as source data (docs → data happens rarely).

---

## 3 · SINGLE-ASSET GENERATION (image, sync provider)

```
CLI: generate --asset LGT-01
  │
  ▼
PLANNER      load Asset(LGT-01) + Card + Scene(swara) + policy(variants, ceiling)
  │          resolve dependency: is batch anchor approved? (LGT-01 IS the b07 anchor → self)
  ▼
PROMPT ENGINE  compose_prompt = GSC ⊕ subject ⊕ fields (family B overrides)
  │            negative = neg_presets[B] ⊕ card.negative_delta
  │            references = [style_anchor, batch_anchor(b07)]
  │            aspect 4:5 ; prompt_hash = sha256(...)
  ▼
IDEMPOTENCY   request_key exists in index?  ──yes(no --force)──▶ SKIP (log) ─┐
  │ no                                                                        │
  ▼                                                                          │
ROUTER        candidates = [gemini_image, openai_image]  (image + AR + refs match)
  │           validate(request, capability) ; pick #1 ; hold #2 as fallback
  ▼
ADAPTER       submit → provider → GenerationResult{artifacts[var-01..04], cost, latency}
  │            (provider lacks native negatives → engine already folded them into prompt)
  ▼
STORAGE       for each variant: content_hash → store/<..>.png ; write sidecar json (provenance)
  │            update assets/LGT-01/v1/ ; asset.json status=candidate
  ▼
INDEX+OBS     upsert artifacts/versions ; log events ; CostEntry ; append run manifest
  │
  ▼
RESULT        4 candidates ready for review  ───────────────────────────────────┘
```

---

## 4 · BATCH / SCENE FLOW (fan-out with anchor-first rule)

```
generate --scene 06        (or --batch b07-lit-objects)
  │
PLANNER  expand → asset set (scene.required_assets or batch.members)
  │      ORDER: [style_anchor?] → batch anchor(s) → remaining, respecting roadmap order
  │      concurrency cap from policy; skip already-satisfied (idempotent)
  ▼
FOR anchor:   run single-asset flow → HALT for approval (anchor gates the batch)
  │           anchor approved? ──no──▶ stop (siblings blocked to prevent drift)
  │           yes → pin approved anchor artifact as reference for siblings
  ▼
FOR siblings (parallel ≤ cap):  single-asset flow, each pinned to anchor + style_anchor
  ▼
REPORT   scene/batch completeness: approved N / total M ; DLQ items ; cost roll-up
```

**Anti-drift rule enforced in flow:** siblings never generate before the batch anchor is *approved*; the approved anchor becomes a reference image for all siblings.

---

## 5 · ASYNC VIDEO FLOW (Runway / Kling)

```
generate --asset HERO-11 (modality: video)
  │
ROUTER  candidates=[runway, kling] (video match) ; pick #1
  ▼
ADAPTER submit(request) → job_handle ; persist Job{state=awaiting_poll, job_handle}
  │                                     (durable → survives restarts)
  ▼
POLLER  loop: poll(job_handle) every backoff interval
  │      ├─ running        → wait
  │      ├─ failed(retryable) → retry policy (below)
  │      └─ succeeded      → fetch(artifact) → STORAGE → INDEX → candidate
  ▼
(webhook optional: provider callback short-circuits the poll loop)
```
The queue is durable so multi-minute video jobs are not tied to a live process.

---

## 6 · RETRY / RESILIENCE FLOW

```
provider call ──error?──no──▶ success path
        │yes
        ▼
classify error
  ├─ retryable (429, 5xx, timeout, transient net)
  │      attempts < max?  ──yes──▶ backoff(2^n + jitter) ──▶ retry (same provider)
  │                        │no
  │                        ▼
  │               provider circuit-breaker trips ──▶ ROUTER fallback (#2 provider)
  │                        │ fallback exhausted
  │                        ▼
  │                  DEAD-LETTER (dlq.jsonl) → surfaced in report for human
  └─ fatal (4xx validation, unsupported request)
         ▼
       no retry → mark Job=dead_letter with reason → report
```
- **Circuit breaker** per provider: N consecutive failures → OPEN (skip provider for cooldown) → HALF-OPEN probe → CLOSE on success.
- **Idempotency** guarantees retries never duplicate stored artifacts.

---

## 7 · REVIEW → APPROVE → PUBLISH FLOW

```
review --run <id>         generate contact-sheet.html from index (candidates + prompts + provenance)
  │
HUMAN inspects variants against the 5-point ACCEPTANCE TEST (canon.acceptance_test)
  │
approve --asset LGT-01 --variant var-03 [--acceptance-notes "…"]
  │      version.status: candidate → approved ; record acceptance{passed, reviewer, ts}
  │      GATE: C/H assets REQUIRE recorded acceptance before publish
  ▼
publish --asset LGT-01
  │      copy approved variant → delivery/lighting/sap_lgt_oillamp_hero@4k.png (CANON naming)
  │      version.status → published ; asset.json.current updated
  ▼
website consumes vault/delivery/** (only published assets)
```
Rejecting a candidate (`reject`) marks it `deprecated` and can auto-queue a re-generation with a tweaked card.

---

## 8 · ARTIFACT / VERSION STATE MACHINE

```
        generate
   ┌──────────────┐
   ▼              │
 draft ─▶ candidate ─approve─▶ approved ─publish─▶ published
             │  ▲                  │                    │
        reject│  │re-gen           │ supersede          │ supersede
             ▼  │                  ▼                    ▼
         deprecated ◀───────────────────────────── deprecated
   (fatal at gen) ─▶ failed
```
Rules: bytes immutable; only status/pointers change; `published` is unique per asset `current`; older published → `deprecated` on new publish.

---

## 9 · DESIGN-BIBLE & STORYBOARD INJECTION POINTS

```
canon.yaml ──┬─(GSC prepend)───────▶ Prompt Engine (every request)
             ├─(swara hue by scene)▶ Prompt Engine (color token)
             ├─(neg preset by family)▶ Prompt Engine (negative)
             ├─(style anchor ref)───▶ Router/adapter (every request)
             └─(acceptance test)────▶ Review gate (before publish)

storyboard(scenes.yaml) ──┬─(required_assets)─▶ Planner (scene fan-out)
                          ├─(swara accent)────▶ Prompt Engine (tint)
                          └─(scene priority)──▶ Report (completeness/gating)
```

---

## 10 · CLI COMMAND MAP (surface → flow)
| Command | Triggers flow |
|---|---|
| `ingest` | §2 |
| `plan <target>` | §3/§4 planner only (dry) |
| `compose <asset>` | §3 prompt engine only (dry-run, prints composed prompt) |
| `generate <target>` | §3 / §4 / §5 |
| `retry <run\|job>` | §6 |
| `status <run>` | §8 read |
| `review <run>` / `approve` / `publish` / `reject` | §7 |
| `search <query>` | index query (facets §DATA_MODELS 11) |
| `report [--scenes\|--batches\|--cost]` | §8 rollups |
| `index rebuild` | rebuild derived DB from sidecars |

---
*Saptham Creative Pipeline · Pipeline Flow v1.0.*

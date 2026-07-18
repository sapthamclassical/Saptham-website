# SAPTHAM CREATIVE PIPELINE — DATA MODELS
### Canonical schemas & relationships · v1.0
**Design-only. Schemas are shown as language-agnostic field specs + YAML/JSON examples (config/data, not application code). These map 1:1 to the eventual Pydantic models locked at Milestone M0.**

> Files are the source of truth (`DATA_MODELS` defines their shape); the SQLite index is a derived projection of these.

---

## 1 · ENTITY RELATIONSHIP OVERVIEW

```
Canon (1) ──feeds──> PromptEngine
Scene (1) ──requires──> (N) Asset          [from storyboard]
Batch (1) ──contains──> (N) Asset          [from roadmap]
Asset (1) ──has──> (1) PromptCard
PromptCard ─(compose w/ Canon)→ GenerationRequest
GenerationRequest ─(router)→ Provider ─(exec)→ GenerationResult
GenerationResult ─(store)→ (N) Artifact
Asset (1) ──has──> (N) AssetVersion ──has──> (N) Artifact(variant)
Run (1) ──produces──> (N) Job ──yields──> (N) Artifact
Job ──logs──> (N) LogEvent + (1) CostEntry
IndexRecord = projection(Asset, AssetVersion, Artifact) for search
```

**Enums (shared):**
- `Modality` = `image | video | vector-source | 3d-ref`
- `Family` = `A` (flat/vector) `| B` (lit/volumetric) `| C-tex | C-particle | photo | assembly`
- `Priority` = `C | H | M | L`
- `Status` (version/artifact) = `draft | candidate | approved | published | deprecated | failed`
- `JobState` = `queued | running | awaiting_poll | succeeded | retrying | dead_letter`
- `ProviderModality` = `image | video`

---

## 2 · CANON  (`vault/canon/canon.yaml`)
Machine-readable Design Bible. Injected by the Prompt Engine.

```yaml
version: "1.0"
gsc: >
  warm candlelit chiaroscuro lighting, 2700-3200K, deep warm near-black background (#0E0B08),
  antique temple-brass gold (#C9A24B) accents, single directional key light, rich deep shadows,
  small controlled specular highlights, subtle incense haze and drifting gold-dust particles,
  cinematic 2.39:1 or 3:2 framing, shallow depth of field, film grain, no flash, no cold blue
  light, no neon, no clutter, museum-grade, luxurious, restrained.
tokens:
  palette:
    garbhagriha_black: "#0E0B08"
    vibhuti_ivory: "#F4EDE0"
    kumkum_crimson: "#9B1C2E"
    alta_vermillion: "#D64027"
  gold_gradient: ["#8A6A25", "#C9A24B", "#EBD08A"]
  swara_hues:            # scene/asset tint by swara (CANON §2)
    Sa: "#C9A24B"; Ri: "#C57B26"; Ga: "#14604E"; Ma: "#0E5A63"
    Pa: "#9B1C2E"; Da: "#5E2E52"; Ni: "#1C2A57"
neg_presets:
  A:       "photorealism, 3D, shading, inner gradients, drop shadows, filled shapes, background color, uneven strokes, blur, cartoon, clip-art, cold colors, neon, rainbow, watermark, text, signature"
  B:       "flat even lighting, cold blue/white light, neon, blown highlights, chrome/plastic, flat yellow gold, cluttered background, tourist saturation, harsh flash, deformed anatomy, extra fingers, low contrast, muddy shadows, watermark, text"
  C-tex:   "seams, visible repeat, directional hotspot, any subject, focal point, text, watermark, uneven exposure, color-cast, plastic sheen, blur"
  C-particle: "hard edges, solid shape, background, frame, banding, neon, clustered particles, text, watermark"
  photo:   "flash, cold white balance, clutter, plastic chairs, banners, oversaturation, heavy retouch, plastic skin, deformed hands, motion smear on face, low contrast, watermark"
families:
  A: { lighting_override: "flat, no directional light", background_default: "transparent", vectorize: true }
  B: { lighting_override: null, background_default: "black, alpha-isolated" }
  C-tex: { lighting_override: "flat even, no hotspot", tileable: true }
naming_convention: "sap_[cat]_[asset]_[variant]_[state]@[res].[ext]"
acceptance_test: ["light law", "restraint law", "workshop law", "movement law", "recital-not-flyer"]
```

---

## 3 · ASSET  (`vault/registry/assets.yaml` — one record per canonical asset)
Mirror of `MASTER_ASSET_INVENTORY.md` + `CANON.md`.

| Field | Type | Notes |
|---|---|---|
| `id` | string | Canonical ID, e.g. `LGT-01` (authoritative) |
| `name` | string | Human name |
| `category` | string | Inventory category slug |
| `batch` | string | Canonical roadmap batch, e.g. `b07-lit-objects` |
| `family` | Family | Drives NEG preset + lighting override |
| `modality` | Modality | image / video / vector-source / 3d-ref |
| `priority` | Priority | C/H/M/L |
| `scenes` | [string] | Scene IDs that require it (from storyboard) |
| `transparent_bg` | bool\|"variant" | |
| `resolution` | string | Target, e.g. `4096` / `vector` / `2048-tile` |
| `aspect_ratio` | string | e.g. `1:1`, `2.39:1` |
| `can_3d` | `Y\|~\|N` | |
| `reuse` | `Global\|Multi\|Single` | |
| `derives_from` | string? | If it's a derivation (dedupe), the master ID |
| `naming` | string | Resolved CANON filename stem |

```yaml
- id: LGT-01
  name: "Oil Lamp (Deepam) + Flame"
  category: lighting
  batch: b07-lit-objects
  family: B
  modality: image
  priority: C
  scenes: ["00", "01", "14"]
  transparent_bg: true
  resolution: "3840"
  aspect_ratio: "4:5"
  can_3d: "Y"
  reuse: Global
  derives_from: null
  naming: "sap_lgt_oillamp_hero"
```

---

## 4 · PROMPT CARD  (`vault/cards/<batch>/<ID>.yaml` — the unit of work)
Structured mirror of the `PROMPT_LIBRARY.md` 14-field entry. The Prompt Engine consumes this + Canon.

| Field | Type | Notes |
|---|---|---|
| `asset_id` | string | FK → Asset.id |
| `subject` | string | Only the individual asset |
| `composition` | string | |
| `lighting` | string | May override Canon (family-aware) |
| `materials` | string | |
| `color_palette` | string | May reference `swara:<Sa..Ni>` token |
| `camera_angle` | string | |
| `background` | string | |
| `texture` | string | |
| `symmetry` | string | |
| `constraints` | string | |
| `negative_delta` | string | Appended to `neg_presets[family]` |
| `output_format` | string | e.g. `SVG (vectorize from 2048² PNG)` |
| `aspect_ratio` | string | Overrides asset default if set |
| `members` | [Member]? | For sets: per-member `{key, subject}` |
| `variants` | int | # candidates to generate (default from policy) |
| `provider_hint` | string? | Optional preferred provider |
| `reference_ids` | [string]? | Extra reference artifacts beyond anchor/batch-anchor |

```yaml
asset_id: LGT-01
subject: "A brass temple oil lamp (kuthuvilakku) with a live warm flame in darkness, lit by its own flame."
composition: "Centered, tight hero; flame the brightest point; 60-70% black negative space."
lighting: "Lit by its own flame; warm bloom; gold reflections rippling on patinated metal; faint smoke."
materials: "Aged brass/bronze, flame, faint smoke."
color_palette: "brass gradient + flame #EBD08A/#D64027, on garbhagriha_black"
camera_angle: "Eye-level, slightly low hero."
background: "Garbhagriha black, isolated with alpha."
texture: "Brass micro-scratch, patina, haze, grain."
symmetry: "Near-bilateral."
constraints: "One hero object; museum-vitrine; the light source that calibrates Batch 07."
negative_delta: "electric bulb, candle wax, plastic"
output_format: "PNG with alpha, 3840px"
aspect_ratio: "4:5"
variants: 4
```

---

## 5 · GENERATION REQUEST  (produced by the Prompt Engine; consumed by providers)

| Field | Type | Notes |
|---|---|---|
| `request_id` | uuid | |
| `asset_id` | string | |
| `version` | string | Target asset version, e.g. `v1` |
| `modality` | Modality | |
| `family` | Family | |
| `composed_prompt` | string | `GSC ⊕ subject ⊕ fields` (final text) |
| `negative_prompt` | string | Resolved preset + delta |
| `aspect_ratio` | string | Canonical AR (router maps to provider param) |
| `resolution` | string | |
| `seed` | int? | If set, deterministic |
| `num_variants` | int | |
| `reference_images` | [ref] | style_anchor + batch_anchor + card.reference_ids |
| `scene_id` | string? | For scene-aware runs |
| `prompt_hash` | string | `sha256(composed_prompt + negative + AR + refs)` |
| `provider_hint` | string? | |
| `cost_ceiling` | number? | |
| `params` | map | Reserved provider passthrough |

---

## 6 · CAPABILITY  (`vault/canon/providers.yaml` per model)

```yaml
gemini_image:
  enabled: true
  models: ["<model-id>"]
  capability:
    modality: image
    mode: sync
    max_resolution: 2048
    aspect_ratios: ["1:1","3:2","2.39:1","9:16","16:9","4:5"]
    supports_negative_prompt: false     # → engine folds negatives into prompt
    reference_images: 3
    supports_seed: true
    formats: ["png","webp"]
  cost_unit: { per_image: 0.00 }
  rate_limit: { rpm: 60, concurrency: 8 }
  priority: { A: 1, B: 2 }               # per-family routing weight
runway:
  enabled: true
  models: ["<gen-model>"]
  capability:
    modality: video
    mode: async                          # submit → poll → fetch
    max_resolution: 1280
    aspect_ratios: ["16:9","9:16","1:1"]
    supports_negative_prompt: false
    reference_images: 1
    formats: ["mp4"]
  cost_unit: { per_second: 0.00 }
  rate_limit: { concurrency: 2 }
```
*(OpenAI Images: `modality: image`, `supports_negative_prompt` per model, `reference_images` for edits/variations. Kling: `modality: video, mode: async`. Future models: same shape.)*

---

## 7 · GENERATION RESULT  (adapter → core)

| Field | Type | Notes |
|---|---|---|
| `request_id` | uuid | |
| `provider` / `model` | string | |
| `state` | JobState | terminal or `awaiting_poll` for video |
| `job_handle` | string? | For async polling |
| `artifacts` | [ArtifactRef] | one per variant returned |
| `revised_prompt` | string? | If provider rewrote it |
| `latency_ms` | int | |
| `cost` | number | |
| `raw_response_ref` | path | Stored raw (keys stripped) |
| `error` | ErrorInfo? | `{code, retryable, message}` |

**ArtifactRef:** `{ bytes|uri, mime, width, height, duration?, seed_used, variant_index }`

---

## 8 · ARTIFACT & VERSION  (`vault/assets/<...>/asset.json` + `<variant>.json`)

**Artifact (sidecar `<variant>.json`)**
| Field | Type |
|---|---|
| `artifact_id` / `content_hash` | string |
| `asset_id` / `version` / `variant` | string |
| `path` | store path |
| `mime` / `width` / `height` / `duration` | — |
| `status` | Status |
| `provenance` | `{ prompt_hash, provider, model, seed, reference_ids, request_id, run_id }` |
| `acceptance` | `{ passed: bool?, notes, reviewer, ts }` |
| `created_at` | ts |

**AssetVersion (`asset.json`)**
```json
{
  "asset_id": "LGT-01",
  "current": { "version": "v1", "published_variant": "var-03" },
  "versions": [
    { "version": "v1", "status": "published", "parent": null,
      "variants": ["var-01","var-02","var-03","var-04"],
      "approved": "var-03", "prompt_hash": "…", "run_id": "…" }
  ]
}
```
**Status machine:** `draft → candidate → approved → published`; `→ deprecated` (superseded) or `→ failed`. Bytes are immutable; only status/pointers move. (State diagram in `PIPELINE_FLOW.md`.)

---

## 9 · SCENE & BATCH  (`vault/registry/scenes.yaml`, `batches.yaml`)

```yaml
# scenes.yaml (from STORYBOARD.md)
- id: "06"
  name: "Varnam (Events)"
  swara: "Pa"
  order: 6
  route: "/events"
  priority: C
  required_assets: ["EVT-01","EVT-02","EVT-03","PHO-02","ARC-03","LGT-06","PAR-05","TEX-02"]
```
```yaml
# batches.yaml (from ASSET_PRODUCTION_ROADMAP.md)
- id: b07-lit-objects
  family: B
  order: 7
  anchor_asset: LGT-01          # generate/approve first; pinned as reference for siblings
  members: ["LGT-01","INS-04","INS-05","INS-06","INS-07","BRD-06","LGT-09"]
```

---

## 10 · RUN, JOB, COST, LOG  (`vault/runs/<run_id>/…`)

**RunManifest (`manifest.json`)**
`{ run_id, ts, target, resolved_jobs[], policy, totals:{cost, count, retries, duration}, dlq_count }`

**Job**
`{ job_id, run_id, asset_id, version, variant_target, request_id, state: JobState, provider, attempts, last_error, artifact_ids[] }`

**CostEntry** — `{ ts, run_id, job_id, provider, model, units, cost }`
**LogEvent (`log.jsonl`)** — `{ ts, level, run_id, job_id, asset_id, event, data }`

---

## 11 · INDEX SCHEMA  (`vault/index/catalog.db` — derived; SQLite + FTS5)

```
assets(id PK, name, category, batch, family, modality, priority, reuse, derives_from)
scene_assets(scene_id, asset_id)                      -- N:N
versions(asset_id, version, status, approved_variant, prompt_hash, run_id, parent)
artifacts(content_hash PK, asset_id, version, variant, path, mime, width, height,
          duration, status, provider, model, seed, cost, created_at)
runs(run_id PK, ts, target, cost_total, job_count, retry_count, dlq_count)
costs(id PK, run_id, job_id, provider, model, units, cost, ts)
fts_prompts(asset_id, composed_prompt, subject, negative)   -- FTS5 virtual table
```
**Query facets:** id · scene · batch · family · category · provider · model · status · tag · dims · cost-range · date · free-text(prompt/subject). **Rebuild:** `index rebuild` re-scans sidecars → tables (index is never source of truth).

---

## 12 · IDENTITY & HASHING RULES
- **Asset ID** — canonical, from inventory (never provider-assigned).
- **prompt_hash** = `sha256(composed_prompt | negative_prompt | aspect_ratio | reference_ids)`.
- **content_hash** = `sha256(bytes)` → dedup key + store path.
- **request key (idempotency)** = `sha256(asset_id | version | prompt_hash | provider | model | seed | params)`.
Same design inputs ⇒ same `prompt_hash`; same output bytes ⇒ same `content_hash` (dedup).

---
*Saptham Creative Pipeline · Data Models v1.0.*

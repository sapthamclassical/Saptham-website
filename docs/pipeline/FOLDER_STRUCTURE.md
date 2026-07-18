# SAPTHAM CREATIVE PIPELINE — FOLDER STRUCTURE
### Repository & storage layout · v1.0
**Design-only. Companion to `SYSTEM_ARCHITECTURE.md`. Paths are language-agnostic; the source tree assumes the recommended Python stack but the shape holds regardless.**

> Two trees: the **code tree** (`pipeline/`) and the **data tree** (`vault/`). Files are the source of truth; the index is derived. Everything is git-friendly except large binaries (which live under a git-ignored or LFS-tracked `vault/store`).

---

## 1 · TOP-LEVEL

```
saptham-pipeline/
├── pipeline/                 # the code (one package per architecture layer)
├── vault/                    # the data (canon, cards, outputs, index, runs)
├── configs/                  # run-configs & policy
├── docs/                     # these architecture docs live alongside the design docs
├── tests/                    # unit + contract tests (incl. the shared adapter suite)
├── .env.example              # secret names only, never values
├── pyproject.toml            # (build phase) deps + entrypoint
└── README.md
```

---

## 2 · CODE TREE — `pipeline/` (mirrors the L0–L9 layers)

```
pipeline/
├── canon/            # L0 · load & validate canon.yaml, providers.yaml, policy.yaml
│   ├── loader        #      parse + schema-validate config
│   └── secrets       #      env/secret-manager access (no values committed)
├── domain/           # L1 · pure schemas (Asset, Card, Scene, Request, Result, Artifact…)
├── registry/         # L2 · ingest docs → structured records; validators; scene graph
│   ├── ingest        #      markdown/YAML → records (inventory, prompt library, storyboard)
│   └── validate      #      referential integrity checks
├── prompt_engine/    # L3 · compose · token resolution · negatives · aspect map · dialects
│   └── dialects/     #      per-provider phrasing strategies (gemini, openai, runway, kling)
├── providers/        # L4 · interface + capability registry + router + adapters
│   ├── base          #      Provider interface, Capability, request/result normalizers
│   ├── router        #      candidate resolution + fallback chain
│   └── adapters/     #      gemini_image, openai_image, runway, kling, <future>
├── orchestration/    # L5 · planner · queue · scheduler · retry · circuit-breaker · DLQ
├── storage/          # L6 · output manager · content store · version graph · delivery
├── index/            # L7 · SQLite+FTS schema · writer · query API · rebuild
├── observability/    # L8 · structured logging · run manifest · cost ledger
├── cli/              # L9 · thin command surface (ingest/plan/generate/review/…)
└── review/           # L9 · contact-sheet generator + approval writer (acceptance gate)
```

**Rule:** a layer package imports only from lower-layer *contracts* (`domain/`) and its own config — enforced by an import-lint rule in `tests/`.

---

## 3 · DATA TREE — `vault/`

```
vault/
├── canon/                          # L0 machine-readable design bible (source of truth)
│   ├── canon.yaml                  #   GSC, tokens (palette, gold_gradient, swara_hues), neg_presets, families, acceptance_test, naming
│   ├── providers.yaml              #   provider models, capabilities, cost, rate limits, priority
│   └── policy.yaml                 #   routing, ceilings, retry/backoff, concurrency, approval rules
│
├── registry/                       # L2 structured mirror of the design docs (data, not markdown)
│   ├── assets.yaml                 #   every canonical asset (from MASTER_ASSET_INVENTORY + CANON)
│   ├── scenes.yaml                 #   storyboard scenes → required asset ids, swara accent, order
│   └── batches.yaml                #   roadmap batches → member assets, family, run order
│
├── cards/                          # L3 Prompt Cards — one YAML per asset (the unit of work)
│   ├── b01-brand/                  #   grouped by canonical batch
│   │   ├── BRD-01.yaml
│   │   └── …
│   ├── b07-lit-objects/
│   │   └── LGT-01.yaml
│   └── …                           #   file name = <ASSET_ID>.yaml
│
├── store/                          # L6 immutable content-addressed outputs (LFS/ignored)
│   └── <sha256[:2]>/<sha256>.<ext> #   raw bytes by content hash (dedup, never overwritten)
│
├── assets/                         # L6 human-navigable working outputs (symlinks/refs into store)
│   └── <batch>/<category>/<ASSET_ID>/
│       ├── v1/
│       │   ├── var-01.png          #   candidate variants (seeds)
│       │   ├── var-01.json         #   sidecar: full metadata + provenance
│       │   ├── var-02.png
│       │   └── var-02.json
│       ├── v2/ …
│       └── asset.json              #   version graph + current status pointer
│
├── delivery/                       # L6 approved+published, named per CANON convention → the website consumes THIS
│   └── <category>/sap_<cat>_<asset>_<variant>@<res>.<ext>
│
├── runs/                           # L8 one folder per invocation
│   └── <run_id>/
│       ├── manifest.json           #   inputs, resolved jobs, outcomes, cost, duration
│       ├── log.jsonl               #   structured events (correlation ids)
│       └── dlq.jsonl               #   dead-letter: exhausted/fatal jobs for review
│
├── index/                          # L7 derived, rebuildable
│   └── catalog.db                  #   SQLite + FTS5 (assets, artifacts, versions, runs, costs, scene_assets, fts_prompts)
│
└── review/                         # L9 generated review surfaces
    └── <run_id>/contact-sheet.html #   local approval UI (reads index)
```

---

## 4 · OUTPUT PATH & NAMING RULES

### 4.1 Working path (navigable)
`vault/assets/<batch>/<category>/<ASSET_ID>/<version>/<variant>.<ext>`
- `<batch>` = canonical roadmap batch, e.g. `b07-lit-objects`
- `<category>` = inventory category slug, e.g. `lighting`
- `<ASSET_ID>` = canonical id, e.g. `LGT-01`
- `<version>` = `v1`, `v2`, …
- `<variant>` = `var-01`, `var-02`, … (one per seed/candidate)
- Each `<variant>.<ext>` has a sibling `<variant>.json` sidecar.

### 4.2 Content store (immutable)
`vault/store/<hash[:2]>/<hash>.<ext>` — deduplicated raw bytes. Working files are references/links into the store; deleting a working file never loses history.

### 4.3 Delivery (what the website imports)
`vault/delivery/<category>/<CANON filename>` using the CANON convention `sap_[cat]_[asset]_[variant]_[state]@[res].[ext]`, e.g. `sap_lgt_oillamp_hero@4k.png`. Only **published** variants land here.

### 4.4 Cards
`vault/cards/<batch>/<ASSET_ID>.yaml` — one card per asset; sets = one card with a `members` list (per-member subject overrides). Card filename always equals the canonical Asset ID.

---

## 5 · WHAT IS SOURCE-OF-TRUTH vs DERIVED

| Path | Role | Rebuildable? |
|---|---|---|
| `vault/canon/*` | Source of truth (design bible as data) | No — authored |
| `vault/registry/*` | Source (structured mirror of docs) | Regenerable from docs via `ingest`, then hand-verified |
| `vault/cards/*` | Source (units of work) | No — authored/generated once |
| `vault/store/*`, `vault/assets/*` | Source (the artifacts + sidecars) | No — the pixels |
| `vault/delivery/*` | Derived (copies of published variants) | Yes — from approved versions |
| `vault/index/catalog.db` | Derived | Yes — `index rebuild` from sidecars |
| `vault/runs/*` | Append-only history | No — audit record |

**Consequence:** losing the index is a non-event (`index rebuild`); losing `store/` + sidecars is the only real data loss → those are the backup/LFS targets.

---

## 6 · GIT & STORAGE POLICY
- **Committed:** all of `pipeline/`, `configs/`, `vault/canon/`, `vault/registry/`, `vault/cards/`, sidecar `*.json`, `runs/*/manifest.json` + `log.jsonl`.
- **LFS or ignored:** `vault/store/`, binary variants under `vault/assets/`, `vault/delivery/` binaries, `vault/index/catalog.db`, generated review HTML.
- **Never committed:** secrets (`.env`), provider raw responses containing keys.
- `.gitignore` + `.gitattributes` (LFS) authored at M0.

---

## 7 · CONFIG vs CARD — where does a setting live?
| Setting | Lives in | Why |
|---|---|---|
| GSC text, tokens, NEG presets, naming, acceptance test | `canon.yaml` | Global design law |
| Provider models, capabilities, cost, rate limits | `providers.yaml` | Provider facts |
| Routing policy, ceilings, retry, concurrency | `policy.yaml` | Ops governance |
| Per-asset subject/composition/lighting/AR/negative-delta/scene | `cards/<ID>.yaml` | Asset specifics |
| Per-run target/variants/provider-override/ceiling | `configs/runs/*.yaml` | Reproducible runs |

---
*Saptham Creative Pipeline · Folder Structure v1.0.*

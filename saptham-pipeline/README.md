# Saptham AI Creative Production Engine

Provider-agnostic asset generation pipeline. Implements the design-only canon in
`../docs/pipeline/` (SYSTEM_ARCHITECTURE, DATA_MODELS, PIPELINE_FLOW, FOLDER_STRUCTURE,
IMPLEMENTATION_PLAN) in **TypeScript/Node**.

## Status: **M0 — Contracts & Canon** (offline, no credentials)

M0 freezes every schema + interface and loads the machine-readable Design Bible. It performs
**no generation** and needs **no auth, no API keys, no credits**.

### Layout
```
pipeline/            # code core (L0–L9). M0 ships: domain/, canon/, providers/base/
vault/canon/         # canon.yaml · providers.yaml · policy.yaml  (source of truth)
vault/{registry,cards,store,assets,references,delivery,rejected,runs,index}/  # data tree
configs/runs/        # reproducible run-configs
tests/               # unit + contract tests
```

### Verify M0
```bash
npm install
npm run canon:load   # validates canon.yaml + providers.yaml + policy.yaml
npm run typecheck    # tsc --noEmit
npm test             # vitest: schema round-trips + FakeProvider contract
```

## Auth / credit posture
- **Higgsfield MCP** (the connected multi-provider aggregator: Nano Banana Pro, Recraft, Soul,
  Seedance 2.0, Kling 3.0, Veo 3.1, Wan, Hailuo, Gemini Omni…) — no key required, **needs credits**.
- All other providers (`openart`, `pixverse`, `lumeflow`, local OSS) are staged **disabled** in
  `vault/canon/providers.yaml` until you supply their credentials.
- The **AuthGate** (M3) halts before any generation lacking auth/credits — nothing is spent silently.

## Next milestones
M1 Registry & Ingestion → M2 Prompt Engine (dry-run) → M3 Providers + HiggsfieldMcpAdapter + AuthGate
→ M4 Orchestration/Storage/Versioning → M5 Index → M6 Routing → M7 Video → M8 Review/Publish → M9 Obs/SDK.

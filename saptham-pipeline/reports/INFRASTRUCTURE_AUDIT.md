# SAPTHAM CREATIVE OS — INFRASTRUCTURE AUDIT
### Pre-M7 validation · 2026-07-16
**Method:** live provider probes + dynamic model discovery + full offline gate (`typecheck` / `test` / `lint`). Evidence is from this run, not assumption.

---

## 0 · VERDICT — ⛔ NOT READY FOR LIVE M7 (code-ready, operationally blocked)

The **code + architecture pass every validation** (66/66 tests, lint clean, typecheck clean). Two **operational** prerequisites for M7 (video) are missing:
1. **Insufficient cloud credits** — cheapest OpenArt video = 50 credits; balance = **10**. Kling = **0**.
2. **FFmpeg not installed / not on PATH** — video post (loop/reframe/poster/encode) cannot run. Blender (3D) likewise missing.

Detail in `M7_READINESS_REPORT.md`.

---

## 1 · INTEGRATION INVENTORY (11)

| Integration | Reachable? | Auth | Notes |
|---|---|---|---|
| Filesystem | ✅ | n/a | vault read/write verified (published assets present) |
| GitHub | ✅ | n/a | repo is git; not exercised this audit |
| **OpenArt MCP** (primary) | ✅ UP | OAuth ok | Free plan, **10 credits**; 15 models discovered dynamically |
| Kling MCP | ✅ UP | ok | Free, **0 credits** → needs_credits |
| PixVerse | ⚠️ config-only | `PIXVERSE_API_KEY` set | HTTP adapter built; not called (also reachable via OpenArt) |
| Gemini | ⚠️ config-only | `GEMINI_API_KEY` set | HTTP adapter built; not called |
| Ollama | ✅ UP | none | `llama3.2:1b`, `llama3.2:latest`; enhance live-verified |
| ComfyUI | ❌ DOWN | token set | server not running (127.0.0.1:8188 ECONNREFUSED) |
| **FFmpeg** | ❌ MISSING | `FFMPEG_PATH=ffmpeg` | **binary not on PATH** (`command not found`) |
| **Blender** | ❌ MISSING | `BLENDER_PATH=blender` | **binary not on PATH** (`command not found`) |
| LumeFlow | ⚪ disabled | none | optional stub in providers.yaml (by design) |

**Discrepancy flagged:** env vars for FFmpeg/Blender are *set*, but the executables they name do not exist on PATH. The AuthGate validates env **presence**, not binary **existence** — so it reports these "ready" when they are not. See §2.4.

---

## 2 · VALIDATION DIMENSIONS (13)

| # | Dimension | Result | Evidence |
|---|---|---|---|
| 1 | **Provider discovery** | ✅ PASS | `openart_model_list` → 15 models resolved at runtime; nothing hardcoded (`dynamic_catalog: true`) |
| 2 | **Capability routing** | ✅ PASS | `routeCapability` ranks ready→free-first→quality; `m3.router.test` (incl. `svg_generation` → unmet) |
| 3 | **Authentication** | ✅ PASS (with caveat) | `AuthGate`: OpenArt ready, Kling/Higgsfield needs_credits, api_key present → ready; **caveat §2.4** |
| 4 | **Environment variables** | ⚠️ PARTIAL | all 7 vars present; but `FFMPEG_PATH`/`BLENDER_PATH` name missing binaries |
| 5 | **Fallback routing** | ✅ PASS | router returns full ranked chain; ready-first ordering asserted |
| 6 | **Local providers** | ⚠️ PARTIAL | Ollama UP; ComfyUI DOWN; FFmpeg/Blender missing |
| 7 | **Offline execution** | ✅ PASS | FakeProvider/FakeAsyncProvider end-to-end; 66 tests run with zero network |
| 8 | **Prompt compiler** | ✅ PASS | `composeRequest` deterministic; GSC⊕fields, family override, swara, neg preset⊕delta; golden tests |
| 9 | **Metadata pipeline** | ✅ PASS | per-variant sidecar provenance (prompt_hash/provider/model/refs/run); validated on live LGT-01/STYLE-00 |
| 10 | **Asset storage** | ✅ PASS | content-addressed store + working tree + delivery; live JPEGs stored + hashed |
| 11 | **Caching** | ✅ PASS | idempotency (`alreadyStored`), `prompt_hash`, content-hash dedup |
| 12 | **Versioning** | ✅ PASS | draft→candidate→approved→published→deprecated; publish drift-guard + C/H gate |
| 13 | **Retry logic** | ✅ PASS | backoff+jitter, circuit breaker, DLQ; async poll retry (m4/m7 tests) |

### 2.4 · Auth caveat (action item)
`AuthGate.check()` for local tools tests only that `requires_env` names are set. It does **not** test that the referenced binary/host is live. Recommendation: add a **liveness probe** to the gate for `kind: local` (ffmpeg `-version`, blender `--version`, ComfyUI `/system_stats`) so "ready" means "actually runnable." `doctor` already probes ComfyUI/Ollama; extend to ffmpeg/blender.

---

## 3 · CODE GATE (this run)
```
typecheck (tsc --noEmit) .... 0 errors
test (vitest) ............... 66 / 66 passed (12 files: M0–M5, M7, M8, ComfyUI)
lint (eslint) ............... 0 errors, 0 warnings
```

## 4 · VAULT STATE
- Published: **STYLE-00** (root anchor) + **LGT-01**, both in `vault/delivery/**` under CANON names.
- Index: 205 assets, FTS operational, 2 published.

---
*Infrastructure Audit v1.0 · code-ready; blocked on credits + FFmpeg for M7.*

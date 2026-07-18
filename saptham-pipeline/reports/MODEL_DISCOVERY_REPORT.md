# SAPTHAM CREATIVE OS — MODEL DISCOVERY REPORT
### 2026-07-16 · dynamically discovered (nothing hardcoded)

Models are resolved at runtime via `openart_model_list` (OpenArt is the primary cloud execution layer). This snapshot is a **point-in-time capture** for the audit only — the pipeline never hardcodes model IDs; new models appear here automatically.

---

## 1 · OPENART CATALOG — 15 models

### Image (text2image + image2image)
| Model ID | Vendor | Notes |
|---|---|---|
| `nano-banana-2` | Google | native 4K, realistic + accurate text, ≤14 refs |
| `nano-banana-pro` | Google | highest-quality Nano Banana; 4K; best text/reference |
| `nano-banana-2-lite` | Google | fast, cost-efficient 1K; strong text fidelity *(used for STYLE-00 + LGT-01)* |
| `gpt-image-2` | OpenAI | luxury product/hero; precise tiny text + UI; multilingual layouts |
| `byte-plus-seedream-4-5` | ByteDance | Asian-leaning aesthetic; 2K; strong poster/logo layout |
| `byte-plus-seedream-5-lite` | ByteDance | efficient Seedream; 2K |
| `kling-3-omni` | Kling | 4K; also video (below) |

### Video (text2video / image2video / element2video)
| Model ID | Vendor | Modes | Notes |
|---|---|---|---|
| `kling-3-omni` | Kling | t2v, i2v, e2v | 4K, batch-friendly, multi-shot + element refs, audio |
| `byte-plus-seedance-2` | ByteDance | t2v, i2v, e2v | most realistic; synced BGM/SFX; image/video/audio elements |
| `byte-plus-seedance-2-fast` | ByteDance | t2v, i2v, e2v | lower-latency Seedance 2.0 |
| `byte-plus-seedance-2-mini` | ByteDance | t2v, i2v, e2v | lightweight Seedance 2.0 |
| `wan2-7` | Alibaba | t2v, i2v, e2v | cinematic; high i2v stability; start/end-frame control |
| `pixverseV6` | PixVerse | t2v, i2v | natural camera motion; best cost/perf |
| `gemini-omni-flash` | Google | t2v, i2v, e2v | conversational t2v; subject refs |
| `grok-imagine-1-5` | xAI | i2v only | extremely fast |

**Reconciliation with the plan:** the IMPLEMENTATION_PLAN named *Runway/Kling*. **Runway is not exposed** by OpenArt. The modern equivalents present are **Seedance 2.x, Kling 3, Veo-class (Gemini Omni), Wan 2.7, PixVerse** — all async, all reachable through the single OpenArt connection. No duplicate direct adapters were built for these (OpenArt is the execution layer).

---

## 2 · PRICING SNAPSHOT (credits per 1 job, default config)

| Kind | Model / config | Credits |
|---|---|---|
| Image (cheapest) | `kling-3-omni` text2image 1K | **10** |
| Image | lite tiers (`nano-banana-2-lite`, `seedream-4-5/5-lite`) | 15 |
| Image | `nano-banana-2` 1K | 20 |
| Image (premium) | `nano-banana-pro`, `gpt-image-2` | 40–42 |
| **Video (cheapest)** | `pixverseV6` 540p / 5s | **50** |
| Video | `wan2-7` 720p / 5s | 125 |
| Video | `kling-3-omni` std / 5s +audio | 175 |
| Video | `seedance-2-mini` 720p / 5s | 200 |
| Video | `gemini-omni-flash` 5s | 250 |
| Video | `seedance-2` fast / full | 350 / 400 |

> Pricing scales with resolution/duration/count/audio and is finalized at generation time. **Current balance: OpenArt 10, Kling 0.**

---

## 3 · OTHER PROVIDERS
- **Kling MCP** (`59437aad`): connected, own catalog via `who_am_i`; **0 credits**. Redundant with OpenArt's `kling-3-omni`.
- **Ollama** (local): `llama3.2:1b`, `llama3.2:latest` — used for prompt enhancement / asset review (free).
- **Gemini / PixVerse** (direct HTTP): available via env keys; also reachable through OpenArt (`nano-banana` = Gemini family; `pixverseV6`).

---
*Model Discovery Report v1.0 · captured live; the pipeline re-discovers on every run.*

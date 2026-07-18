# SAPTHAM CREATIVE OS — PROVIDER CAPABILITY MATRIX
### 2026-07-16 · derived from `providers.yaml` + live probes

Routing is by **capability**, not provider. The router filters providers advertising the capability, gates each via AuthGate, and ranks **ready → free-first tier → quality**. Free-first tier order: `local_oss > free_mcp > free_api > free_credits > paid`.

---

## 1 · PROVIDER STATUS

| Provider | Kind | Tier | Quality | Auth state (live) | Operational |
|---|---|---|---|---|---|
| **openart** (primary) | mcp | free_mcp | 5 | **ready** (10 credits) | ✅ (credit-limited) |
| kling | mcp | free_mcp | 4 | needs_credits (0) | ❌ |
| higgsfield | mcp | free_mcp | 3 | needs_credits (0) | ❌ |
| pixverse | http | free_api | 3 | ready (key set) | ⚠️ untested |
| gemini | http | free_api | 4 | ready (key set) | ⚠️ untested |
| comfyui | local | local_oss | 4 | env set | ❌ server down |
| ollama | local | local_oss | 3 | ready | ✅ UP |
| ffmpeg | local | local_oss | 5 | env set | ❌ binary missing |
| blender | local | local_oss | 5 | env set | ❌ binary missing |
| lumeflow | local | local_oss | 3 | disabled | ⚪ optional |

---

## 2 · CAPABILITY → PROVIDER MATRIX

`✅` advertises + operational · `⛔` advertises but blocked · `—` not advertised

| Capability | openart | kling | higgs | pixverse | gemini | comfyui | ollama | ffmpeg | blender | **Effective route (today)** |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|---|
| text_to_image | ✅ | ⛔ | ⛔ | — | ✅ | ⛔ | — | — | — | **openart** (comfyui down) |
| image_to_image | ✅ | ⛔ | — | — | ✅ | ⛔ | — | — | — | **openart** |
| text_to_video | ⛔ | ⛔ | ⛔ | ⚠️ | — | — | — | — | — | **blocked** (credits) |
| image_to_video | ⛔ | ⛔ | ⛔ | ⚠️ | — | — | — | — | — | **blocked** (credits) |
| camera_motion | ⛔ | ⛔ | ⛔ | ⚠️ | — | — | — | — | — | **blocked** (credits) |
| style_transfer | ✅ | — | — | — | — | ⛔ | — | — | — | openart |
| material_reference | ✅ | — | — | — | — | ⛔ | — | — | — | openart |
| lighting_reference | ✅ | — | — | — | — | ⛔ | — | — | — | openart |
| character_consistency | ✅ | ⛔ | — | — | — | — | — | — | — | openart |
| upscaling | ✅ | — | ⛔ | — | — | ⛔ | — | — | — | openart |
| asset_review | — | — | — | — | ✅ | — | ✅ | — | — | **ollama** (free, UP) |
| prompt_enhancement | — | — | — | — | ✅ | — | ✅ | — | — | **ollama** (free, live-verified) |
| svg_generation | — | — | — | — | — | — | — | — | — | **UNMET** (no provider) |
| video_post | — | — | — | — | — | — | — | ⛔ | — | **blocked** (ffmpeg missing) |
| model_3d | — | — | — | — | — | — | — | — | ⛔ | **blocked** (blender missing) |

⚠️ pixverse video: advertised + key present, but adapter execution is not wired live (M6 scope); OpenArt is the funded video route.

---

## 3 · READINESS SUMMARY BY CAPABILITY

- **Operational now:** text_to_image, image_to_image, style/material/lighting reference, character_consistency, upscaling (all via **OpenArt**, gated by 10 credits ≈ one lite image); **prompt_enhancement + asset_review** via **Ollama** (free, unlimited).
- **Blocked — credits:** all video (`text/image_to_video`, `camera_motion`).
- **Blocked — missing local binary:** `video_post` (FFmpeg), `model_3d` (Blender).
- **Blocked — server down:** local free image via ComfyUI.
- **Unmet — no provider:** `svg_generation` (needs a vectorize step; tracked).

---
*Provider Capability Matrix v1.0.*

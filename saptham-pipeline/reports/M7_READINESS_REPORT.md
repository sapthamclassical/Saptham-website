# SAPTHAM CREATIVE OS — M7 READINESS REPORT
### Async video generation · 2026-07-16

## VERDICT: ⛔ NOT READY to execute live M7 video — 2 blockers

The **M7 code/architecture is complete and validated**; what is missing is **operational**: cloud video credits and a working FFmpeg. Both are external prerequisites you must supply — I am pausing per instruction, not implementing further.

---

## 1 · WHAT ALREADY EXISTS (validated this audit)

The async video *infrastructure* was implemented in the prior session and passes every test here — no new M7 code was written this turn.

| Component | File | Status |
|---|---|---|
| Async provider contract | `providers/base` (`poll`, `JobHandle`) + `FakeAsyncProvider` | ✅ tested |
| Durable job store | `orchestration/job-store.ts` (`vault/jobs/<id>.json`) | ✅ survives restart |
| Video runner | `orchestration/video-runner.ts` (submit→persist→poll→store→DLQ) | ✅ tested |
| Video capability routing | `router.ts` + `providers.yaml` (t2v/i2v/camera_motion) | ✅ tested |
| CLIs | `generate:video`, `jobs` | ✅ offline demo works |
| Video card | `cards/b10-art-directed-photography/HERO-11.yaml` | ✅ |

**DoD checks that already pass:** a fresh process resolves a persisted job it never submitted; running→succeeded polling stores the mp4; provider failure → dead_letter with `last_error`. (`tests/m7.video.test.ts`.)

---

## 2 · BLOCKERS (must clear before live M7)

### 🔴 Blocker 1 — Cloud video credits
- Cheapest video = **PixVerse V6 540p/5s = 50 credits**. Brand-quality (Kling 3 / Seedance 2) = **175–400**.
- **Balance: OpenArt 10, Kling 0.** → cannot generate a single video clip.
- **Remediation:** top up OpenArt credits. Minimum viable validation = 50 (one PixVerse clip); one hero loop at brand quality ≈ 175+.

### 🔴 Blocker 2 — FFmpeg not installed / not on PATH
- `ffmpeg` → `command not found`; `FFMPEG_PATH=ffmpeg` names a binary that doesn't exist.
- M7 video **deliverables need post-processing**: seamless-loop trimming (HERO-11 is a 6–8s loop), reframe to 9:16 mobile, poster-frame extraction, web encode (H.264/VP9). Without FFmpeg the video path stops at "raw provider mp4."
- **Remediation:** install FFmpeg and either put it on PATH or set `FFMPEG_PATH` to the full `ffmpeg.exe` path in `.env`.

---

## 3 · NON-BLOCKING GAPS (recommended, not required for M7)

| Gap | Impact | Fix |
|---|---|---|
| **AuthGate has no binary liveness probe** | reports ffmpeg/blender "ready" when absent | add `-version`/`/system_stats` probe for `kind: local` (extend `doctor`) |
| ComfyUI down | no free local image bulk (not a video path) | launch server; optional for M7 |
| Blender missing | `model_3d` blocked | not needed for M7 (that's Batch-13) |
| `svg_generation` unmet | no provider advertises it | add a vectorize post-step later |
| Live HTTP/MCP execution not wired into main runner | M7 video submit is agent-bridged, not headless | M6-style wiring (optional; agent-bridge works today) |

---

## 4 · GO CRITERIA — M7 is ready when ALL hold
1. ☐ OpenArt credits ≥ 50 (≥175 for a brand-quality hero loop).
2. ☐ `npm run doctor` shows FFmpeg present (or `FFMPEG_PATH` resolves).
3. ☑ Async job infra green (already true).
4. ☑ Video capability routing + durable jobs (already true).
5. ☑ Storage/versioning/metadata accept video mp4 (already true — MIME-aware).

**Once 1 + 2 are satisfied**, the live path is: agent calls `openart_generate_video` → persist `JobRecord` → `jobs` tracks → poll (`openart_creation_get`) → `store:external` the mp4 → FFmpeg loop/reframe → M4 store → review/approve → delivery.

---
*M7 Readiness Report v1.0 · code-ready; hold for credits + FFmpeg.*

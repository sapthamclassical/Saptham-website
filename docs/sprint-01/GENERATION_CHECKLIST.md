# SAPTHAM — GENERATION CHECKLIST (Sprint 1)
### How to run each generation, step by step · v1.0
**Use alongside `PROMPT_PACK_01.md`. This governs the *doing*; `QUALITY_CHECKLIST.md` governs the *approving*. Work strictly in the `PRODUCTION_SPRINT_01.md` Part 4 order.**

---

## A · SPRINT PRE-FLIGHT (once, before any asset)
- [ ] `{{GSC}}` verbatim block is on hand for prepending (from `PROMPT_PACK_01.md` top).
- [ ] Canonical tokens confirmed: black `#0E0B08`, gold `#8A6A25→#C9A24B→#EBD08A`, ivory `#F4EDE0`, kumkum `#9B1C2E`, swara hues.
- [ ] Vault paths ready: `vault/assets/<batch>/<category>/<ID>/v1/` and delivery target.
- [ ] Naming convention loaded: `sap_[cat]_[asset]_[variant]@[res].[ext]`.
- [ ] Platform accounts/keys available: OpenAI Images, Gemini Image, Higgsfield.
- [ ] **S1-01 must be generated & APPROVED first** — do not start S1-02..10 until it is pinned.

## B · PER-ASSET PRE-FLIGHT (before each generation)
- [ ] Correct asset selected in Part-4 order (dependencies above it already **approved**).
- [ ] Correct platform per `PRODUCTION_SPRINT_01.md` Part 5.
- [ ] Prompt copied from `PROMPT_PACK_01.md` with `{{GSC}}` prepended verbatim.
- [ ] **Reference pinning:** attach approved **S1-01 Master Style Board**; for S1-06 also attach approved **S1-02 Brass**; for S1-08/S1-09 also attach approved **S1-03/S1-04** (light/ground).
- [ ] Aspect ratio + resolution set to the asset's spec.
- [ ] Transparency setting matches spec (alpha ON for S1-04/05/06/07/10; OFF for S1-01/02/03(ground)/08/09).
- [ ] Seed recorded (if platform supports) for reproducibility.
- [ ] Variant count set (default 4 candidates).

## C · DURING GENERATION
- [ ] Generate **4 candidate variants** (not 1) so review has choice.
- [ ] For line/vector assets (S1-07, S1-10): generate at ≥2048² clean line for clean vectorization.
- [ ] For tiles (S1-02, S1-03 grain): confirm the request asks for **seamless**.
- [ ] For alpha assets: confirm the platform returns true transparency (not a checkerboard baked in).
- [ ] If a platform lacks native negative prompts: confirm negatives were folded into the prompt text.

## D · POST-GENERATION (per candidate)
- [ ] Save each variant to `vault/assets/.../v1/var-0N.<ext>`.
- [ ] Write the sidecar `var-0N.json`: prompt used, platform, model, seed, aspect, resolution, timestamp, reference IDs pinned.
- [ ] Compute + record content hash.
- [ ] Quick technical scan (not full QA yet): right AR? right transparency? no obvious text/watermark? correct gold tone vs S1-01?
- [ ] Log the run (asset ID, platform, cost/units, latency).

## E · HANDOFF TO QA
- [ ] All 4 variants present with sidecars.
- [ ] Route to `QUALITY_CHECKLIST.md` for the 12-gate approval.
- [ ] Do **not** generate the next dependent asset until this one is approved + pinned.

---

## PER-ASSET QUICK CARD (platform · AR · res · alpha · pin)

| ID | Platform | Aspect | Resolution | Alpha | Pin these approved refs |
|---|---|---|---|---|---|
| S1-01 | OpenAI Images | 16:9 | 3840×2160 | No | — (this IS the root) |
| S1-02 | Gemini Image | 1:1 | 2048² tile | No | S1-01 |
| S1-03 | Gemini Image | 16:9 / 1:1 | 3840×2160 / 2048² | Ground No / grain Yes | S1-01 |
| S1-04 | Gemini Image | 4:5 | 3840px | Yes | S1-01, S1-02 |
| S1-05 | Gemini Image | 1:1 | 1024² atlas | Yes | S1-01 |
| S1-06 | Gemini Image | 4:5 | 3840px | Yes | S1-01, S1-02, S1-04 |
| S1-07 | OpenAI Images | 21:9 | 3072×1280→SVG | Yes | S1-01 |
| S1-08 | Higgsfield | 21:9 (+9:16) | 3840×1646 | No | S1-01, S1-03, S1-04, S1-05 |
| S1-09 | Gemini Image | 21:9 (+9:16) | 4096px | No | S1-01, S1-03 |
| S1-10 | OpenAI Images | 1:1 / 2:1 | 2048²→SVG | Yes | S1-01, S1-02 |

---

## RETRY GUIDANCE (if a candidate fails QA)
1. **Diagnose against the failed gate** (see `QUALITY_CHECKLIST.md`) — don't re-roll blindly.
2. **Common fixes:** gold reads flat/yellow → strengthen "aged temple brass, lit metal, 3-stop gradient" + re-pin S1-02; cold cast → reinforce "2700–3200K warm, no cold blue"; clutter → add offending item to the negative; wrong AR/alpha → fix the request setting, not the prompt.
3. **Re-pin** the approved S1-01 (and any material/light anchor) — most drift is an un-pinned reference.
4. **Escalate platform** only if the chosen one repeatedly can't hit the look — try the backup from the Hero Reference Pack Part 5, and note the switch in the sidecar.
5. Keep failed variants as `deprecated` (never delete) for provenance.

*Generation Checklist v1.0 · Generate in order, pin the anchors, four variants, then QA.*

# SAPTHAM — QUALITY CHECKLIST (Sprint 1)
### The approval gate · every anchor must pass ALL before it is pinned · v1.0
**Governs the *approving*. An asset that fails any gate is rejected → `deprecated` → regenerated (see `GENERATION_CHECKLIST.md` Retry). No exceptions for Critical anchors — they propagate to ~500 downstream assets.**

---

## GATE 0 · THE ROOT RULE
- [ ] **S1-01 is approved before anything else is reviewed.** If S1-01 is not locked, stop — nothing downstream can be judged consistent against an unapproved root.

---

## THE 12 UNIVERSAL GATES (apply to every asset)

### The 5 Laws (from CANON / Master Reference Board Part 10)
1. **Light law** — [ ] Reads as *lit warm metal / candlelit object*, not flat digital color. Gold has a visible light source.
2. **Restraint law** — [ ] Could not be simpler and stronger with less; no gratuitous ornament.
3. **Workshop law** — [ ] Matches its neighbors: 1.5px stroke (line assets), key from upper-left ~45°, the 3-stop gold gradient, same warmth as S1-01.
4. **Movement law** — [ ] Correct family behavior (flat for line/tex, chiaroscuro for objects/scenes, self-lit for particles) + correct swara/tone (Hero = Sa gold).
5. **Recital test** — [ ] Feels like "a candlelit recital in a museum," never "a college-club flyer."

### Technical
6. **Palette** — [ ] Within canon: black `#0E0B08` base, gold 3-stop only, no off-palette hues; no rainbow.
7. **Background** — [ ] Correct per spec (transparent for S1-04/05/06/07/10; opaque black for S1-01/02/03/08/09); alpha is clean (no baked checkerboard/halo).
8. **Format** — [ ] Correct aspect ratio + resolution; line/mark assets are clean enough to vectorize.
9. **Cohesion** — [ ] Global film-grain/haze present where applicable; sits in the same warm grade as S1-01.
10. **Negative sweep** — [ ] ZERO items from the forbidden list (neon, cold light, chrome/plastic, flat-yellow gold, clutter, stock-photo look, cartoon, text/gibberish, watermark, wide-angle distortion).

### Provenance (pipeline)
11. **Traceable** — [ ] Sidecar records prompt, platform, model, seed, resolution, pinned reference IDs, content hash.
12. **Anchored** — [ ] Was generated with `{{GSC}}` prepended AND the approved S1-01 (+ required material/light anchors) pinned.

---

## PER-ASSET SPECIFIC ACCEPTANCE

| ID | Must-pass specifics (beyond the 12) |
|---|---|
| **S1-01** Style Board | All 6 cells present + monogram; gold tone is the *definitive* one all others will match; labels legible, not gibberish; cells clearly separated. **This sets the standard — be strictest here.** |
| **S1-02** Brass | Seamless (no visible repeat); aged not new; patina in crevices; the 3-stop strip matches canon exactly; usable as a PBR base. |
| **S1-03** Black + Grain | Warm not blue black; no banding; grain layer subtle + transparent; the glow is *barely* perceptible. |
| **S1-04** Oil Lamp | Real flame (not bulb); warm own-glow + reflections on brass; 60–70% black; alpha-isolated cleanly. |
| **S1-05** Dust/Incense | Soft self-luminous motes; clean alpha; sparse; smoke translucent; nothing hard-edged. |
| **S1-06** Veena | **Instrument accurate** (yali head, gourd, frets correct); aged brass not flat-yellow; single warm key; shallow DOF; alpha clean. |
| **S1-07** Kolam | One continuous unbroken line; symmetric; repeat-friendly ends; transparent; vectorizes cleanly with no double strokes. |
| **S1-08** Doorway | Real depth + volumetric god-rays; warm glow off-center; layer-separable; no modern/cold elements; no people. |
| **S1-09** Silk Backdrop | Believable silk sheen + zari flash; emerald on-token; no printed-pattern look; no subject; folds hold deep warm shadow. |
| **S1-10** Emblem | Mark is distinctive not generic; "SAPTHAM" letters correct (no gibberish); gold matches S1-01; balanced clear-space; vector-ready. |

---

## DECISION
- **PASS** (all 12 + specifics) → mark variant **approved**, copy to `delivery/` under CANON name, **pin as reference** for dependents. Record acceptance notes on the version.
- **BORDERLINE** → art-director review; if the flaw is fixable in-engine (crop/grade) note it; otherwise reject.
- **FAIL** (any gate) → **reject**, mark candidate `deprecated`, diagnose the specific failed gate, regenerate per `GENERATION_CHECKLIST.md` Retry. Never approve "close enough" on a Critical anchor.

## SPRINT 1 SIGN-OFF (Definition of Done)
- [ ] All 10 assets have an **approved** variant in `delivery/`.
- [ ] Each approved variant is **pinned** and its sidecar/acceptance recorded.
- [ ] S1-01 gold tone verified consistent across S1-02, S1-04, S1-06, S1-09, S1-10.
- [ ] A contact-sheet of all 10 approved anchors reviewed **together** — they read as ONE world, one light, one gold.
- [ ] **Only now** may Sprint 2 (dancer, lotus, silk-motion, wider batches) or implementation begin.

---
*Quality Checklist v1.0 · Twelve gates, strictest on S1-01, "one world / one light / one gold" before sign-off.*

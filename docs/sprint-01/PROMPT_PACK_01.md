# SAPTHAM — PROMPT PACK 01
### Final production prompts for Sprint 1 (Hero anchors) · v1.0
**Run these against `PRODUCTION_SPRINT_01.md` order. Every prompt is prepended with the canonical `{{GSC}}` verbatim. Pin `S1-01` (once approved) as a reference on assets 2–10.**

---

## THE PREPEND — `{{GSC}}` (paste verbatim at the front of every prompt below)
> *warm candlelit chiaroscuro lighting, 2700–3200K, deep warm near-black background (#0E0B08), antique temple-brass gold (#C9A24B) accents, single directional key light, rich deep shadows, small controlled specular highlights, subtle incense haze and drifting gold-dust particles, cinematic 2.39:1 or 3:2 framing, shallow depth of field, film grain, no flash, no cold blue light, no neon, no clutter, museum-grade, luxurious, restrained.*

**Override note:** flat-vector (S1-07, S1-10) and texture (S1-02, S1-03) assets override the chiaroscuro/DOF clause via their Lighting/Background fields; palette, gold law, warmth, restraint, and prohibitions always hold.

---

## S1-01 · MASTER STYLE BOARD  *(OpenAI Images)*
**Final production prompt:**
> {{GSC}} A reference contact-sheet on a deep warm near-black (#0E0B08) field, arranged as a clean 3×2 grid of labelled cells with generous black gutters, museum-precise: cell 1 a horizontal gold gradient bar from #8A6A25 to #C9A24B to #EBD08A; cell 2 an aged temple-brass swatch with fine micro-scratches and patina; cell 3 a jewel-emerald Kanjeevaram silk swatch with woven gold zari threads; cell 4 a pure warm-black field; cell 5 a lit brass oil lamp with a small warm flame casting gold reflections in darkness; cell 6 a single minimal gold calligraphic line-drawing of a veena; and a small elegant gold "Saptham" monogram centered above the grid. Small refined uppercase labels under each cell. Flat, orthographic, reference-grade. Avoid: mismatched styles, inconsistent gold tones, neon, cold blue light, clutter, gibberish text, watermark.
- **GSC:** {{GSC}} (prepended verbatim)
- **Composition:** Ordered 3×2 grid, isolated labelled cells, generous black gutters, monogram above.
- **Camera:** Flat orthographic, straight-on.
- **Lighting:** Dual — swatches flat-even; the oil lamp self-lit by its flame (demonstrates the master key).
- **Materials:** Brass, silk, patinated metal, flame.
- **Mood:** Definitive, museum-precise, reference-grade.
- **Color Palette:** Black #0E0B08, gold 3-stop, ivory #F4EDE0, kumkum #9B1C2E, emerald #14604E.
- **Negative Prompt:** mismatched styles, inconsistent gold, neon, cold light, clutter, gibberish text, watermark, plastic, chrome.
- **Aspect Ratio:** 16:9.
- **Resolution:** 3840×2160.
- **Transparency:** No (opaque plate).

## S1-02 · TEMPLE BRASS & GOLD SWATCH  *(Gemini Image)*
**Final production prompt:**
> {{GSC}} An extreme macro of aged temple brass filling the frame edge-to-edge and seamlessly tileable — warm metal with fine micro-scratches, darkened patina settling into crevices, and one soft broad sheen; include a thin strip along the bottom showing the three-stop gold gradient #8A6A25 → #C9A24B → #EBD08A. Flat, soft, even, diffuse light with no directional hotspot so it reads as pure material truth. Avoid: shiny new gold, chrome, plastic, flat yellow, directional hotspot, seams, any subject, watermark.
- **GSC:** {{GSC}} (Lighting overrides to flat-even for tiling)
- **Composition:** Full-bleed seamless surface + a gradient strip.
- **Camera:** Top-down orthographic, macro.
- **Lighting:** Flat, soft, even, diffuse — NO hotspot.
- **Materials:** Aged brass (metalness 1.0, roughness 0.35–0.5), patina.
- **Mood:** Precious, weighty, ancient.
- **Color Palette:** #8A6A25 → #C9A24B → #EBD08A.
- **Negative Prompt:** shiny new gold, chrome, plastic, flat yellow, hotspot, seams, subject, text, watermark.
- **Aspect Ratio:** 1:1.
- **Resolution:** 2048×2048 (seamless tile).
- **Transparency:** No.

## S1-03 · GARBHAGRIHA BLACK + FILM GRAIN  *(Gemini Image)*
**Final production prompt:**
> {{GSC}} A full-bleed warm near-black field (#0E0B08 deepening to #171310 at the edges) with a barely perceptible central warm glow, as if a distant oil lamp breathes just out of frame; extremely subtle, no subject. Deliver a second pass: a fine warm film-grain and faint haze layer on transparency for overlaying. Avoid: pure black, blue-black, banding, colored noise, heavy grain, any subject, watermark.
- **GSC:** {{GSC}} (atmospheric ground)
- **Composition:** Full-bleed radial gradient; grain as a separate transparent tile.
- **Camera:** Flat.
- **Lighting:** Implied faint central warmth.
- **Materials:** Atmospheric (none).
- **Mood:** The unlit sanctum; sacred stillness.
- **Color Palette:** #0E0B08 → #171310.
- **Negative Prompt:** pure black, blue-black, banding, colored noise, heavy grain, subject, watermark.
- **Aspect Ratio:** 16:9 (ground) + 1:1 (grain tile).
- **Resolution:** 3840×2160 (ground); 2048² (grain).
- **Transparency:** Ground No; grain layer Yes (alpha).

## S1-04 · OIL LAMP / DEEPAM  *(Gemini Image)*
**Final production prompt:**
> {{GSC}} A single brass temple oil lamp (kuthuvilakku) with a live warm flame, standing in near-total darkness, lit only by its own flame — warm bloom around the fire, gold reflections rippling across the aged patinated metal, a faint thread of smoke rising, everything else falling into deep warm black. Centered, tight hero framing, the flame the single brightest point, 60–70% of the frame in shadow. Avoid: electric bulb, candle wax, plastic, chrome, cold light, cluttered background, watermark.
- **GSC:** {{GSC}}
- **Composition:** Centered tight hero; flame brightest; 60–70% black.
- **Camera:** Eye-level, slightly low; 85mm; shallow DOF.
- **Lighting:** Self-lit by the flame; warm bloom; deep falloff to black.
- **Materials:** Aged brass, flame, faint smoke.
- **Mood:** Reverent, sacred, the origin of light.
- **Color Palette:** Brass gradient + flame #EBD08A/#D64027, on #0E0B08.
- **Negative Prompt:** electric bulb, candle wax, plastic, chrome, cold light, clutter, watermark.
- **Aspect Ratio:** 4:5.
- **Resolution:** 3840px (long edge).
- **Transparency:** Yes (alpha-isolated for compositing).

## S1-05 · GOLDEN DUST & INCENSE SHEET  *(Gemini Image)*
**Final production prompt:**
> {{GSC}} An isolated sprite sheet of soft, self-luminous warm-gold dust motes with gentle falloff halos, at several sizes, plus one translucent warm-grey incense smoke wisp — all floating on a fully transparent field, sparse and delicate, made of light and air. Avoid: hard edges, solid shapes, any background, dense cloud, neon, color banding, clustered particles, watermark.
- **GSC:** {{GSC}} (Lighting overrides to self-luminous)
- **Composition:** Sparse sprites + size variants on empty field.
- **Camera:** Flat.
- **Lighting:** Self-luminous soft glow.
- **Materials:** Light / air (no solids).
- **Mood:** Sacred atmosphere, weightless.
- **Color Palette:** #EBD08A → #C9A24B; smoke warm-grey.
- **Negative Prompt:** hard edges, solid shapes, background, dense cloud, neon, banding, clusters, watermark.
- **Aspect Ratio:** 1:1.
- **Resolution:** 1024×1024 (atlas).
- **Transparency:** Yes (clean alpha, mandatory).

## S1-06 · HERO VEENA — LIT BRASS  *(Gemini Image)*
**Final production prompt:**
> {{GSC}} A Saraswati veena rendered as lit aged brass and dark sandalwood — the carved yali (dragon) head catching a single warm key light from the upper-left, strings glinting with tiny controlled speculars, the round gourd resonator falling into shadow — placed diagonally in the frame with 60–70% deep warm-black negative space, shallow depth of field on the yali head, faint incense haze and a whisper of gold dust. Museum-vitrine, jewelry-grade. Avoid: flat yellow, chrome, plastic, cold light, cluttered background, inaccurate instrument shape, watermark.
- **GSC:** {{GSC}}
- **Composition:** Diagonal hero, vast negative space, shallow DOF on yali head.
- **Camera:** Eye-level, slightly low; 85mm; f/2.
- **Lighting:** Single warm key upper-left 45° (Rembrandt) + warm rim; deep shadow; faint bloom/haze.
- **Materials:** Aged brass + sandalwood + fine string glints.
- **Mood:** Jewel-in-a-vitrine; the melodic emblem.
- **Color Palette:** Brass gradient, lit edge #EBD08A, on #0E0B08.
- **Negative Prompt:** flat yellow, chrome, plastic, cold light, clutter, wrong instrument shape, watermark.
- **Aspect Ratio:** 4:5.
- **Resolution:** 3840px (long edge).
- **Transparency:** Yes (alpha-isolated).

## S1-07 · KOLAM DIVIDER  *(OpenAI Images)*
**Final production prompt:**
> {{GSC}} A traditional South-Indian pulli-kolam pattern drawn as one continuous, unbroken gold calligraphic line (1.5px optical weight, soft calligraphic terminals) looping symmetrically around an implied dot grid, on a fully transparent background — an ultra-wide horizontal divider band with repeat-friendly ends, elegant and precise, ready to be vectorized and self-drawn. Flat, no lighting, no fills. Avoid: broken lines, filled shapes, shading, 3D, uneven or double strokes, background color, cartoon, watermark, text.
- **GSC:** {{GSC}} (Lighting overrides to flat vector)
- **Composition:** Ultra-wide band, repeat-friendly ends; single continuous path.
- **Camera:** Flat orthographic.
- **Lighting:** None — flat.
- **Materials:** Gold line (no fill).
- **Mood:** Sacred geometry, disciplined, hand-drawn.
- **Color Palette:** Saptham Gold #C9A24B line on transparent.
- **Negative Prompt:** broken lines, fills, shading, 3D, uneven strokes, background, cartoon, watermark, text.
- **Aspect Ratio:** 21:9 (wide band).
- **Resolution:** 3072×1280 → vectorize to SVG.
- **Transparency:** Yes (mandatory).

## S1-08 · HERO ENVIRONMENT — SANCTUM DOORWAY  *(Higgsfield)*
**Final production prompt:**
> {{GSC}} Looking through a carved stone temple doorway into a dark inner sanctum where a single oil lamp glows warm-gold at the far end; the carved doorway in sharp warm relief in the foreground, the interior mysterious and deep, warm god-rays cutting through drifting incense haze, dust motes suspended, a gentle vignette. Cinematic 2.39:1 depth, off-center warm glow, layer-separable foreground/mid/background. Avoid: cold light, bright even fill, modern architecture, clutter, people, watermark.
- **GSC:** {{GSC}}
- **Composition:** Centered doorway, deep perspective, off-center warm glow; layer-separable.
- **Camera:** Eye-level, centered; 35mm (depth).
- **Lighting:** Warm glow from within, deep falloff, god-rays, incense haze.
- **Materials:** Weathered temple stone + distant flame.
- **Mood:** Threshold, mystery, the sacred beyond.
- **Color Palette:** Black + warm gold glow.
- **Negative Prompt:** cold light, bright fill, modern architecture, clutter, people, watermark.
- **Aspect Ratio:** 21:9 (+ 9:16 mobile reframe).
- **Resolution:** 3840×1646 (+ 2160×3840 mobile).
- **Transparency:** No (opaque scene; export parallax layers with alpha).

## S1-09 · HERO SILK BACKDROP  *(Gemini Image)*
**Final production prompt:**
> {{GSC}} A lush, abstract backdrop of deep emerald (#14604E) Kanjeevaram silk catching a single warm light, soft billowing folds with woven gold zari threads flashing along the creases, drifting gold dust and faint incense haze, deep warm shadow in the folds, an off-center warm light pool, real depth — no subject, no figure. Avoid: printed pattern, plastic sheen, cold light, flat lighting, subject, clutter, watermark.
- **GSC:** {{GSC}}
- **Composition:** Soft folds, off-center light pool, depth; full-bleed.
- **Camera:** Eye-level; 50mm; shallow.
- **Lighting:** Single warm key, sheen along the folds; deep fold shadow.
- **Materials:** Silk (roughness 0.3–0.5) + zari (metalness 1.0 fine lines).
- **Mood:** Lush, regal, breathing.
- **Color Palette:** Emerald #14604E silk + gold zari, on #0E0B08.
- **Negative Prompt:** printed pattern, plastic sheen, cold light, flat lighting, subject, clutter, watermark.
- **Aspect Ratio:** 21:9 (+ 9:16 mobile).
- **Resolution:** 4096px (long edge).
- **Transparency:** No.

## S1-10 · SAPTHAM EMBLEM (mark + wordmark)  *(OpenAI Images)*
**Final production prompt:**
> {{GSC}} An elegant, minimal gold emblem for "Saptham" that fuses a stylised veena-neck curve with a seven-point sapta-swara motif, reading as one confident brand mark, rendered in warm temple-brass gold (#C9A24B) on a transparent background; beneath it, the word "SAPTHAM" set in a high-contrast display serif with refined thick-thin calligraphic stress, tracked, in the same gold; balanced, generous clear-space, flat and precise, ready to vectorize. Avoid: overcomplex ornament, literal instrument drawing, generic swoosh, corporate cliché, distorted or gibberish letters, drop shadows, 3D, watermark.
- **GSC:** {{GSC}} (Lighting overrides to flat vector)
- **Composition:** Centered monogram above the wordmark, vast clear-space, balanced.
- **Camera:** Flat orthographic.
- **Lighting:** Flat (a separate gold-leaf raster variant may add a single raking highlight).
- **Materials:** Lit-gold line/fill (varak variant = hammered gold-leaf).
- **Mood:** Confident, timeless, luxury-house restraint.
- **Color Palette:** Saptham Gold #C9A24B on transparent.
- **Negative Prompt:** overcomplex, literal instrument, generic swoosh, corporate cliché, distorted/gibberish letters, drop shadows, 3D, watermark.
- **Aspect Ratio:** 1:1 (mark) / 2:1 (lockup).
- **Resolution:** 2048² → vectorize to SVG (+ gold-leaf raster variant).
- **Transparency:** Yes (mandatory).

---
*Prompt Pack 01 v1.0 · Prepend `{{GSC}}`, pin S1-01, run the QUALITY_CHECKLIST before approval.*

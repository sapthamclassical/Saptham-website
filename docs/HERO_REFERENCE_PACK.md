# SAPTHAM — HERO VISUAL ANCHOR PACK
### The first images to create · production guide for the visual anchors · v1.0
**Built on `DESIGN_BIBLE.md`, `STORYBOARD.md`, `MASTER_REFERENCE_BOARD.md`. This is the minimum set of reference images that, once approved, lock the look of every future image, video, Blender scene, and website animation.**

> The rule this pack exists to serve (from `PIPELINE_FLOW.md` §4 & Master Board Part 11): **nothing downstream generates until its anchor is approved and pinned as a reference.** Get these 12 right and the other ~500 assets inherit consistency automatically. Get them wrong and drift compounds forever.

---

# PART 1 · THE PACK (the 12 anchors, in dependency order)

| ID | Name | Purpose | Why foundational | Scenes/assets that depend on it |
|---|---|---|---|---|
| **HAP-01** | Master Style Board | The root contact-sheet (palette bar, brass, silk, black, lamp, veena line, monogram) | It IS the pinned reference for every other run — the single object that defines "correct" | **Everything** (all 12 refs + all ~500 assets) |
| **HAP-02** | Temple Brass & Gold Swatch | The material truth for all "lit metal" + the 3-stop gold | Every gold surface, icon, ornament, and Blender brass shader calibrates here | HAP-05, HAP-08; all gold UI/icons/ornaments; Music, Events, OB, Sponsors, Footer |
| **HAP-03** | Garbhagriha Black + Film Grain | The warm near-black ground + global grain overlay | Every scene sits on this exact black; the grain unifies all imagery | **Every scene** (the ground of the whole site) |
| **HAP-04** | Kanjeevaram Silk Swatch | Jewel-silk + zari material truth | All fabric backdrops, card fills, and the silk shader; seeds HAP-11 | HAP-11; Hero, Events, Alumni backdrops |
| **HAP-05** | Oil Lamp / Deepam | The light-source calibration (warm key, own-glow, reflections) | Defines the single-warm-key law for ALL Family-B renders and video lighting | All lit objects; Hero, Footer, loader; every Runway/Kling lighting seed |
| **HAP-06** | Kolam Divider | The Family-A flat-gold-line look (1.5px calligraphic, self-draw) | The signature device + the stroke/terminal spec every icon, border, ornament follows | All icons, dividers, borders, geometry; every section threshold; motion self-draw |
| **HAP-07** | Gold Dust & Incense Sheet | The self-lit particle/atmosphere look | Defines every particle system's softness, warmth, density | Hero, thresholds, stage, alumni; all Blender + motion particle systems |
| **HAP-08** | Hero Veena — Lit Brass | The Family-B object look + the Hero soloist | The look-dev target for every instrument render and the Blender veena | Hero, Music (02/instruments), Events; D3 veena model |
| **HAP-09** | Dancer — Araimandi Silhouette | The rim-lit figure/silhouette look | Anchors all silhouettes + the dance video look (Kling/Runway) | Hero foreground, Dance, Events, Gallery; dance motion clips; D3 dancer |
| **HAP-10** | Sanctum Doorway + Glow | The environment/atmosphere + depth look | Defines volumetric haze, warm-glow falloff, cinematic depth for all environments | Hero, all thresholds, Legacy, Gallery; Runway/Kling environment seeds |
| **HAP-11** | Golden Silk in Motion | The fabric-motion + hero-backdrop-video look | The first *motion* anchor — defines how cloth/light move | Hero film loop, silk transitions, all fabric video |
| **HAP-12** | Portrait Lighting Look-Dev | The human/photo lighting reference + master LUT seed | Hands the photographer the exact chiaroscuro; grades all real portraits | OB (13) + Alumni (9) shoots, performance stills, the master LUT |

---

# PART 2 · FULL SPEC PER ANCHOR

> All specs assume the canonical `{{GSC}}` is prepended (see Master Board Part 2). Fields below describe only the individual anchor.

### HAP-01 · Master Style Board
- **Subject:** Labelled contact-sheet: gold gradient bar (`#8A6A25→#C9A24B→#EBD08A`), aged-brass swatch, Kanjeevaram silk swatch, black field, a lit brass oil lamp with flame, one minimal gold-line veena, the Saptham monogram.
- **Composition:** Ordered 3×2 grid of isolated cells, generous black gutters, gallery contact-sheet.
- **Camera Angle:** Flat orthographic, straight-on.
- **Lens:** N/A (flat plate).
- **Lighting:** Dual — swatches flat-even; the lamp lit by its own warm flame (demonstrates the master key).
- **Color Palette:** Full core — black `#0E0B08`, gold 3-stop, ivory `#F4EDE0`, kumkum `#9B1C2E`, one emerald `#14604E`.
- **Materials:** Brass, silk, patinated metal, flame.
- **Mood:** Definitive, reference-grade, museum-precise.
- **Environment:** Black studio field.
- **Negative Constraints:** mismatched styles, inconsistent gold tone, neon, cold light, clutter, watermark.
- **Future Reuse:** Pinned as the style reference on EVERY subsequent generation. The root of the whole system.

### HAP-02 · Temple Brass & Gold Swatch
- **Subject:** Extreme macro of aged temple brass — micro-scratches, darkened crevices, patina, one soft broad sheen; a strip showing the 3-stop gold.
- **Composition:** Full-bleed seamless surface + a gradient strip.
- **Camera Angle:** Top-down orthographic.
- **Lens:** Macro (100mm equiv), flat.
- **Lighting:** Flat, soft, even, diffuse — NO hotspot (so it tiles/reads as material truth).
- **Color Palette:** `#8A6A25 → #C9A24B → #EBD08A`.
- **Materials:** Aged brass/bronze (metalness 1.0, roughness 0.35–0.5).
- **Mood:** Precious, weighty, ancient.
- **Environment:** Full-frame metal.
- **Negative Constraints:** shiny new gold, chrome, plastic, flat yellow, directional hotspot, seams, watermark.
- **Future Reuse:** The base-color/roughness truth for every gold surface (image + Blender PBR).

### HAP-03 · Garbhagriha Black + Film Grain
- **Subject:** Warm near-black field with a barely-there central warm glow; a separate fine warm film-grain + haze overlay.
- **Composition:** Full-bleed gradient; grain as a transparent tile.
- **Camera Angle:** Flat.
- **Lens:** N/A.
- **Lighting:** Implied faint central warmth; grain self-neutral.
- **Color Palette:** `#0E0B08 → #171310`.
- **Materials:** Atmospheric (none).
- **Mood:** The unlit sanctum; sacred stillness.
- **Environment:** Self.
- **Negative Constraints:** pure black, blue-black, banding, colored noise, heavy grain.
- **Future Reuse:** The ground of every scene; the grain overlays all imagery for analog cohesion.

### HAP-04 · Kanjeevaram Silk Swatch
- **Subject:** Macro of jewel-toned silk weave with woven gold zari catching soft light; a hero fold variant. Three colorways (emerald, crimson, indigo).
- **Composition:** Full-bleed weave, seamless; one draped-fold hero.
- **Camera Angle:** Top-down (tile) + slight 3/4 (fold).
- **Lens:** Macro.
- **Lighting:** Soft even + gentle directional sheen for the zari shimmer.
- **Color Palette:** Ga `#14604E` / Pa `#9B1C2E` / Ni `#1C2A57` + gold zari.
- **Materials:** Silk (roughness 0.3–0.5, sheen), zari (metalness 1.0 fine lines).
- **Mood:** Luxurious, tactile, regal.
- **Environment:** Full-frame fabric.
- **Negative Constraints:** printed pattern, plastic sheen, seams, cold light, watermark.
- **Future Reuse:** All fabric backdrops + the silk shader; seeds HAP-11 motion.

### HAP-05 · Oil Lamp / Deepam
- **Subject:** A brass temple oil lamp (kuthuvilakku) with a live warm flame in darkness, lit by its own flame, gold reflections rippling on patinated metal, faint smoke.
- **Composition:** Centered tight hero; flame the brightest point; 60–70% black.
- **Camera Angle:** Eye-level, slightly low (heroic).
- **Lens:** 85mm, shallow.
- **Lighting:** Self-lit by the flame; warm bloom; everything else falls to black.
- **Color Palette:** Brass gradient + flame `#EBD08A`/`#D64027`, on `#0E0B08`.
- **Materials:** Aged brass, flame, faint smoke.
- **Mood:** Reverent, sacred, the origin of light.
- **Environment:** Garbhagriha black, vignette.
- **Negative Constraints:** electric bulb, candle wax, plastic, chrome, cold light, watermark.
- **Future Reuse:** The single-warm-key calibration for ALL Family-B renders + video; the loader/footer lamp; D3 lamp target.

### HAP-06 · Kolam Divider
- **Subject:** A pulli-kolam pattern — one continuous unbroken gold line looping symmetrically around an implied dot grid.
- **Composition:** Ultra-wide band, repeat-friendly ends; a 1:1 detail crop.
- **Camera Angle:** Flat orthographic.
- **Lens:** N/A (vector-ready line).
- **Lighting:** None — flat (override).
- **Color Palette:** Saptham Gold `#C9A24B` line on transparent/black.
- **Materials:** Gold line (no fill).
- **Mood:** Sacred geometry, disciplined, hand-drawn.
- **Environment:** Transparent / black.
- **Negative Constraints:** broken lines, fills, shading, 3D, uneven/double strokes, background color, watermark.
- **Future Reuse:** The Family-A stroke/terminal spec for all icons, borders, ornaments; the self-draw motion source.

### HAP-07 · Gold Dust & Incense Sheet
- **Subject:** A sheet of soft self-luminous warm-gold dust motes + a translucent warm-grey incense smoke wisp, isolated.
- **Composition:** Sparse sprites on empty field + size variants.
- **Camera Angle:** Flat.
- **Lens:** N/A.
- **Lighting:** Self-luminous soft glow (override).
- **Color Palette:** `#EBD08A → #C9A24B`; smoke warm-grey.
- **Materials:** Light/air (no solids).
- **Mood:** Sacred atmosphere, "made of air."
- **Environment:** Transparent (clean alpha).
- **Negative Constraints:** hard edges, solid shapes, background, dense cloud, neon, banding, watermark.
- **Future Reuse:** Every particle system (image, Blender emission, motion overlays).

### HAP-08 · Hero Veena — Lit Brass
- **Subject:** A Saraswati veena as lit aged brass and dark wood — yali head catching the key, strings glinting.
- **Composition:** Diagonal hero, 60–70% black negative space, shallow DOF on the yali head.
- **Camera Angle:** Eye-level, slightly low.
- **Lens:** 85mm, f/2.
- **Lighting:** Single warm key upper-left 45° (Rembrandt) + warm rim; deep shadow; faint bloom/haze.
- **Color Palette:** Brass gradient, lit edge `#EBD08A`, on `#0E0B08`.
- **Materials:** Aged brass + sandalwood + zari-thin string glints.
- **Mood:** Jewel-in-a-vitrine; the melodic emblem.
- **Environment:** Garbhagriha black, isolated (alpha).
- **Negative Constraints:** flat yellow, chrome, plastic, cold light, cluttered background, watermark.
- **Future Reuse:** The Family-B object look-dev target; Hero soloist; all instrument renders; D3 veena.

### HAP-09 · Dancer — Araimandi Silhouette
- **Subject:** A Bharatanatyam dancer in the half-sitting araimandi stance as a solid near-black silhouette, costume fan and temple jewelry implied only in the warm gold rim.
- **Composition:** Centered/thirds, grounded triangular base, vast negative space.
- **Camera Angle:** Eye-level.
- **Lens:** 50mm.
- **Lighting:** Single warm rim from behind-side; interior near-black `#0E0B08`.
- **Color Palette:** Body `#0E0B08`, rim `#EBD08A`.
- **Materials:** Implied silk + jewelry in the lit edge only.
- **Mood:** Reverent, poised, timeless.
- **Environment:** Transparent / black.
- **Negative Constraints:** visible face detail, flat gray, missing rim light, cold light, deformed anatomy, extra fingers, watermark.
- **Future Reuse:** All silhouettes; Hero foreground; the dance-video look (Kling/Runway); D3 dancer pose.

### HAP-10 · Sanctum Doorway + Glow
- **Subject:** Looking through a carved stone temple doorway into darkness where a single oil lamp glows warm-gold; doorway in sharp relief, interior mysterious.
- **Composition:** Centered doorway, deep perspective, warm glow at the vanishing point.
- **Camera Angle:** Eye-level, centered.
- **Lens:** 35mm (depth).
- **Lighting:** Warm glow from within, deep falloff, incense haze, god-rays.
- **Color Palette:** Black + warm gold glow.
- **Materials:** Weathered temple stone + distant flame.
- **Mood:** Threshold, mystery, the sacred beyond.
- **Environment:** Dark stone interior, full-bleed.
- **Negative Constraints:** cold light, bright fill, clutter, modern architecture, watermark.
- **Future Reuse:** All environment/atmosphere; Hero + thresholds; Runway/Kling environment seed.

### HAP-11 · Golden Silk in Motion  *(motion anchor)*
- **Subject:** Deep jewel-toned Kanjeevaram silk billowing slowly, gold zari flashing, warm light and drifting gold dust — abstract, no subject.
- **Composition:** Soft folds, off-center light pool, depth; 6–8s seamless loop.
- **Camera Angle:** Eye-level, slow drift.
- **Lens:** 50mm, shallow.
- **Lighting:** Single warm key, sheen shifting as the cloth moves.
- **Color Palette:** Jewel silk + gold, on black.
- **Materials:** Silk + zari + light + dust.
- **Mood:** Lush, breathing, hypnotic.
- **Environment:** Black studio; haze.
- **Negative Constraints:** fast/chaotic motion, cold light, subject/figure, clutter, morphing artifacts, watermark.
- **Future Reuse:** Hero film loop; silk transitions; the motion-language reference for all fabric video.

### HAP-12 · Portrait Lighting Look-Dev
- **Subject:** A single figure (stand-in) in warm Rembrandt key against dark, subtle rim on hair/jewelry — a *lighting reference to hand the photographer*, not a final portrait.
- **Composition:** 4:5 head-and-shoulders, off-center, dark negative space.
- **Camera Angle:** Eye-level, slight hero tilt.
- **Lens:** 85mm, f/2.
- **Lighting:** Physical single warm key 2700–3200K + minimal cool fill; deep shadow; rim.
- **Color Palette:** LUT-graded warm — shadows to `#0E0B08`, protected highlights, gold mid-tones.
- **Materials:** Skin, hair, temple jewelry, silk.
- **Mood:** Dignified, intimate, truthful.
- **Environment:** Dark seamless studio.
- **Negative Constraints:** flash, cold WB, plastic retouch, deformed hands, clutter, watermark.
- **Future Reuse:** The OB + alumni shoot lighting; performance grade; seeds the master LUT. *(Real portraits are camera-captured per the bible — this is look-dev guidance.)*

---

# PART 3 · DEPENDENCY GRAPH

```
                          ┌─────────────────────────────┐
                          │  HAP-01  MASTER STYLE BOARD  │  ← pinned reference on EVERY run
                          └──────────────┬──────────────┘
        ┌──────────────┬────────────────┼────────────────┬──────────────┐
        ▼              ▼                ▼                ▼              ▼
   HAP-02 BRASS   HAP-03 BLACK     HAP-05 LAMP      HAP-06 KOLAM   HAP-07 PARTICLES
   (gold truth)   (+grain ground)  (light law)     (line law)     (atmos law)
        │              │                │                │              │
        │              │                ▼                │              │
        │              │        ┌───────────────┐        │              │
        │              │        │ FAMILY B look │        │              │
        ▼              ▼        ▼               ▼        ▼              ▼
   HAP-08 VEENA ◀──(brass+lamp)  HAP-09 DANCER   HAP-10 DOORWAY   [all icons/    [all atmospheric
   (object look)                 (figure look)   (environment)     dividers/      scenes:
        │                             │                │           borders]       Hero, Legacy,
        │                             │                │                          Events, Alumni]
        ▼                             ▼                ▼
   HAP-04 SILK ──▶ HAP-11 SILK-IN-MOTION (video)      HAP-12 PORTRAIT LOOK-DEV
   (fabric truth)      │                                   │
        │              ▼                                   ▼
        └──────▶ HERO FILM LOOP                     OB + ALUMNI SHOOTS + LUT

                 ── how scenes consume the anchors ──
  HERO (01)      ← HAP-01,03,05,07,08,09,10,11 (+04 backdrop)
  MUSIC (02)     ← HAP-02,05,06,08
  VISION (03)    ← HAP-01,03,06 + marble
  LEGACY (04)    ← HAP-03,05,10 (stone/environment)
  OFFICE BEARERS ← HAP-02,03,12 (portrait) + kolam frames
  VARNAM/EVENTS  ← HAP-03,04,05,08,09,10,12 (the climax pulls the most)
  WORKSHOPS/COMP ← HAP-03,05,06,09,10
  GALLERY (09)   ← HAP-03,10,12 + frames
  ALUMNI (10)    ← HAP-03,07,12 + silk
  SPONSORS (11)  ← HAP-01,02 + marble
  JOIN (12)      ← HAP-06,07 + rangoli
  CONTACT (13)   ← HAP-02,03,06
  FOOTER (14)    ← HAP-01,03,05,06 (lamp resolves)
```

**Reading:** HAP-01 gates all. HAP-02/03/05/06/07 are the five "laws" (metal, ground, light, line, atmosphere) every family inherits. HAP-08/09/10 turn laws into looks (object/figure/environment). HAP-04→11 and HAP-12 branch into motion and photography.

---

# PART 4 · ASSET GENERATION ORDER (smallest set, max consistency)

**The irreducible minimum to unblock the Hero + all families = the 6 Criticals.** Generate, approve, and pin these before anything else. High refines scene looks; Medium is the first motion anchor; Optional extends later.

| Order | Rank | ID | Why this rank |
|---|---|---|---|
| 1 | **CRITICAL** | HAP-01 Master Style Board | The root; pinned to all — literally cannot start without it |
| 2 | **CRITICAL** | HAP-02 Brass & Gold | Every gold surface depends on this material truth |
| 3 | **CRITICAL** | HAP-03 Black + Grain | The ground of every scene + the unifying grain |
| 4 | **CRITICAL** | HAP-05 Oil Lamp | The single-warm-key light law for all Family-B |
| 5 | **CRITICAL** | HAP-06 Kolam Divider | The Family-A line law for all icons/dividers |
| 6 | **CRITICAL** | HAP-08 Hero Veena | The Family-B object look + the Hero soloist |
| 7 | HIGH | HAP-04 Silk Swatch | Fabric truth; hero backdrop; seeds motion |
| 8 | HIGH | HAP-07 Particles | Atmosphere law for all scenes |
| 9 | HIGH | HAP-09 Dancer Silhouette | Figure look + dance-video anchor |
| 10 | HIGH | HAP-10 Sanctum Doorway | Environment/atmosphere for all scenes |
| 11 | HIGH | HAP-12 Portrait Look-Dev | Gates the OB/alumni shoot + master LUT |
| 12 | MEDIUM | HAP-11 Silk-in-Motion | First *video* anchor — comes after stills exist |
| — | OPTIONAL (post-pack) | Ceiling mandala · Temple jewelry macro · Gopuram dusk · Alta-feet macro | Refine specific scenes once the 12 are locked |

**Consistency principle:** 12 images (6 truly critical) anchor ~500 assets. Every additional reference is only justified if an existing anchor *cannot* express a needed look — otherwise reuse and pin, never re-anchor.

---

# PART 5 · BEST GENERATION MODEL PER ANCHOR

> Model strengths evolve — verify current capabilities before running. Rationale is based on durable strengths: **instruction-following + text + clean structured/vector-ish output → OpenAI Images**; **photoreal material/light fidelity + reference consistency → Gemini Image**; **cinematic stylized look + dramatic lighting → Higgsfield**; **motion (image→video) → Runway / Kling**.

| ID | Best model | Why | Backup |
|---|---|---|---|
| HAP-01 Style Board | **OpenAI Images** | Needs labelled cells, precise grid layout, and clean text — OpenAI leads on instruction-following + legible text + transparency | Gemini Image |
| HAP-02 Brass & Gold | **Gemini Image** | Photoreal seamless material macro, accurate metal roughness/patina, even lighting | OpenAI Images |
| HAP-03 Black + Grain | **Gemini Image** | Fine tonal control on a warm near-black + subtle grain (near-procedural; either works) | OpenAI Images / procedural |
| HAP-04 Silk Swatch | **Gemini Image** | Material realism — silk sheen, zari shimmer, weave — is Gemini's strength | OpenAI Images |
| HAP-05 Oil Lamp | **Gemini Image** | Photoreal lit object: flame, warm reflections, own-light glow, deep shadow | Higgsfield (cinematic variant) |
| HAP-06 Kolam Divider | **OpenAI Images** | Clean, symmetric, structured line-art with transparency — OpenAI follows precise geometric instruction best; easiest to vectorize | Gemini Image |
| HAP-07 Particles | **Gemini Image** | Soft self-luminous motes + smoke with clean alpha and warm glow | OpenAI Images |
| HAP-08 Hero Veena | **Gemini Image** | Photoreal aged-brass object with correct materials/lighting as the Blender look-target | Higgsfield (hero cinematic) |
| HAP-09 Dancer Silhouette | **Higgsfield** | Cinematic figure + dramatic rim-light + stylistic consistency for the dance look | Gemini Image |
| HAP-10 Sanctum Doorway | **Higgsfield** | Cinematic environment: volumetric god-rays, haze, dramatic depth | Gemini Image |
| HAP-11 Silk-in-Motion | **Runway** (image→video from HAP-04) | Best cloth/light motion control + camera moves from a still seed | Kling |
| HAP-12 Portrait Look-Dev | **Gemini Image** | Realistic portrait lighting for a look-dev reference to hand the photographer | Higgsfield |

**Routing logic:** photoreal stills (materials, objects, lamp, silk, particles, portrait) → **Gemini**; structured graphic/text (style board, kolam) → **OpenAI**; cinematic figure/environment drama → **Higgsfield**; anything that must *move* → **Runway/Kling** seeded from the approved still. Whichever model is used, **prepend `{{GSC}}`, pin HAP-01, and pass the Part 10 acceptance checklist** before approval.

---

## PRODUCTION SEQUENCE (one paragraph)
Generate **HAP-01** first and approve it against the Master Reference Board Part 10 checklist — it becomes the pinned reference for everything else. Then run the five laws (**HAP-02, 03, 05, 06, 07**) and the Hero soloist (**HAP-08**); approve each. With the six Criticals locked, the Hero scene and all family looks are unblocked. Add the Highs (**04, 09, 10, 12**) to refine scenes and gate the photo shoot, then the motion anchor (**HAP-11**). Only after the pack is approved do you generate the wider asset library — each new asset pinned to its anchor, never re-anchored.

---
*Saptham — where the seven notes become light.*
*Hero Visual Anchor Pack v1.0 · Twelve images that lock five hundred.*

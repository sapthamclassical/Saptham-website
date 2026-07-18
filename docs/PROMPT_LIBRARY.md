# SAPTHAM — PROMPT LIBRARY
### Complete per-asset generation prompts, batched in run order · v2.0
**Built from `DESIGN_BIBLE.md` + `ASSET_PRODUCTION_ROADMAP.md`. Organized by the roadmap's 15 batches (easiest → hardest). Every prompt begins with the exact Global Style Constraints below, then describes only the individual asset.**

> v2.0 note: this replaces the earlier field set with the 14-field schema (adds Subject, Camera Angle, Constraints, Suggested Aspect Ratio). File names, Blender usage, and website usage for each asset live in `MASTER_ASSET_INVENTORY.md`.

---

## THE GLOBAL STYLE CONSTRAINTS — `{{GSC}}`
**Prepend this EXACT block, verbatim, to the front of every prompt in this file. It is taken directly from the Design Bible's Global Moodboard Constraints.**

> **`{{GSC}}`** = *warm candlelit chiaroscuro lighting, 2700–3200K, deep warm near-black background (#0E0B08), antique temple-brass gold (#C9A24B) accents, single directional key light, rich deep shadows, small controlled specular highlights, subtle incense haze and drifting gold-dust particles, cinematic 2.39:1 or 3:2 framing, shallow depth of field, film grain, no flash, no cold blue light, no neon, no clutter, museum-grade, luxurious, restrained.*

**Override note:** for flat-vector and texture assets, the per-asset **Lighting / Background / Texture / Camera Angle** fields specialize or override the `{{GSC}}` defaults (you cannot apply chiaroscuro or shallow DOF to a seamless tile or a flat SVG). The palette, gold law, warmth, restraint, and prohibitions in `{{GSC}}` always hold.

## NEGATIVE-PROMPT PRESETS (referenced per asset)
- **NEG-A (flat line/vector):** photorealism, 3D, shading, inner gradients, drop shadows, filled shapes, background color, uneven/double strokes, blur, cartoon, clip-art, cold colors, neon, rainbow, watermark, text, signature
- **NEG-B (lit/volumetric):** flat even lighting, cold blue/white light, neon, blown highlights, chrome/plastic, flat yellow gold, cluttered background, tourist saturation, harsh flash, deformed anatomy, extra fingers, low contrast, muddy shadows, watermark, text
- **NEG-C-tex:** seams, visible repeat, directional hotspot, any subject, focal point, text, watermark, uneven exposure, color-cast, plastic sheen, blur
- **NEG-C-particle:** hard edges, solid shape, background, frame, banding, neon, clustered particles, text, watermark
- **NEG-photo:** flash, cold white balance, clutter, plastic chairs, banners, oversaturation, heavy retouch, plastic skin, deformed hands, motion smear on face, low contrast, watermark

**Convention:** *Sets* (icons, mudras, instruments) = one master prompt + a member Subject list; each member is one run off the shared block.

---

# BATCH 00 · STYLE ANCHOR BOARD

### Master Style Anchor Board
- **Subject:** A curated reference contact-sheet — a gold gradient bar (`#8A6A25`→`#C9A24B`→`#EBD08A`), an aged brass swatch, a Kanjeevaram silk swatch with zari, a lit brass oil lamp with live flame, one minimal gold line veena, and a gold monogram, each a labelled cell.
- **Composition:** Ordered 3×2 grid of isolated swatches/objects, generous black gutters, contact-sheet.
- **Lighting:** Dual — swatches flat-even; the oil lamp lit by its own warm flame with deep shadow (demonstrates the master key).
- **Materials:** Aged temple brass, jewel silk, patinated metal, oil-lamp flame.
- **Color Palette:** Full core — black `#0E0B08`, gold 3-stop, ivory `#F4EDE0`, kumkum `#9B1C2E`, emerald `#14604E`.
- **Camera Angle:** Flat orthographic, straight-on.
- **Background:** Garbhagriha black `#0E0B08`, full-bleed.
- **Texture:** Brass micro-scratch, silk weave, fine film grain.
- **Symmetry:** Grid symmetry.
- **Constraints:** This plate defines the whole system; approve before any other batch; pin as a reference on every subsequent run.
- **Negative Prompt:** NEG-B + mismatched styles, inconsistent gold tone, messy layout.
- **Output Format:** PNG.
- **Suggested Aspect Ratio:** 16:9.

---

# BATCH 01 · BRAND MARKS & ICONS  *(Family A)*

### Primary Monogram
- **Subject:** A minimal gold monogram for "Saptham" fusing a stylised veena-neck curve with a seven-point sapta-swara motif, one confident emblem.
- **Composition:** Single centered mark, vast clear-space, subtly balanced.
- **Lighting:** Flat, no directional light (override).
- **Materials:** Lit-gold line/fill.
- **Color Palette:** Saptham Gold `#C9A24B` on transparent.
- **Camera Angle:** Flat/orthographic.
- **Background:** Transparent.
- **Texture:** Clean vector, none.
- **Symmetry:** Near-symmetric, balanced.
- **Constraints:** Reads at 16px; also deliver 1-color.
- **Negative Prompt:** NEG-A + overcomplex, literal instrument, generic swoosh, corporate cliché.
- **Output Format:** SVG (vectorized from 2048²).
- **Suggested Aspect Ratio:** 1:1.

### Wordmark — Latin
- **Subject:** "SAPTHAM" in a high-contrast display serif (Fraunces/Canela), calligraphic thick-thin stress, tracked.
- **Composition:** Horizontal lockup, optically centered, generous margins.
- **Lighting:** Flat.
- **Materials:** Gold letterforms.
- **Color Palette:** Gold `#C9A24B` / ivory `#F4EDE0`.
- **Camera Angle:** Flat.
- **Background:** Transparent.
- **Texture:** Clean.
- **Symmetry:** Optically centered.
- **Constraints:** Set type, not drawn; outline to SVG.
- **Negative Prompt:** NEG-A + distorted letters, fake serif, uneven kerning, gibberish.
- **Output Format:** SVG outline.
- **Suggested Aspect Ratio:** 4:1.

### Wordmark — Tamil Lockup
- **Subject:** "சப்தம்" in Noto Serif Tamil display, matched in size/dignity to the Latin wordmark, hairline divider.
- **Composition:** Bilingual stack or side-by-side, equal weight.
- **Lighting:** Flat.
- **Materials:** Gold letterforms.
- **Color Palette:** Gold `#C9A24B`.
- **Camera Angle:** Flat.
- **Background:** Transparent.
- **Texture:** Clean.
- **Symmetry:** Balanced lockup.
- **Constraints:** Verify glyphs with a Tamil reader.
- **Negative Prompt:** NEG-A + malformed Tamil, wrong glyphs, Latin substituting Tamil.
- **Output Format:** SVG.
- **Suggested Aspect Ratio:** 4:1 (or stacked 2:1).

### Reversed / Mono Set
- **Subject:** Monogram + wordmark in reversed and single-color forms.
- **Composition:** As primary lockups.
- **Lighting:** Flat.
- **Materials:** Solid single color.
- **Color Palette:** Ink `#171310` on sand `#E5D6B8`; ivory on black.
- **Camera Angle:** Flat.
- **Background:** Transparent + sand variant.
- **Texture:** Clean.
- **Symmetry:** As anchor.
- **Constraints:** Light/dark/1-color set.
- **Negative Prompt:** NEG-A.
- **Output Format:** SVG.
- **Suggested Aspect Ratio:** 1:1 & 4:1.

### Favicon / Touch Set
- **Subject:** The monogram simplified for tiny sizes; solid gold + black maskable.
- **Composition:** Centered in safe area, bold enough for 16px.
- **Lighting:** Flat.
- **Materials:** Solid gold.
- **Color Palette:** Gold on transparent / black maskable.
- **Camera Angle:** Flat.
- **Background:** Transparent + black.
- **Texture:** Clean.
- **Symmetry:** Balanced.
- **Constraints:** 16/32/180/192/512 set.
- **Negative Prompt:** NEG-A + fine detail, thin strokes.
- **Output Format:** SVG + PNG set.
- **Suggested Aspect Ratio:** 1:1.

### UI System Icon Set *(master + members)*
- **Subject (per member):** A single minimal gold [ICON] glyph. Members: menu, close, arrow-left, arrow-right, chevron-down, plus/expand, external-link, play, pause, search (lotus-loupe).
- **Composition:** One glyph centered in a square keyline box, 1.5px optical stroke, calligraphic terminals, 24px ashtadala grid.
- **Lighting:** Flat (override).
- **Materials:** Gold monoline.
- **Color Palette:** `#C9A24B` (active `#D64027`).
- **Camera Angle:** Flat.
- **Background:** Transparent.
- **Texture:** Clean.
- **Symmetry:** Optically balanced.
- **Constraints:** Consistent weight/box across all members; vectorize.
- **Negative Prompt:** NEG-A.
- **Output Format:** SVG (24/32/48).
- **Suggested Aspect Ratio:** 1:1.

### Swara Glyph Set (Sa–Ni) *(master + 7 members)*
- **Subject (per member):** A small abstract gold glyph evoking the swara [Sa/Ri/Ga/Ma/Pa/Da/Ni] — a single expressive stroke or dot-cluster, cohesive family.
- **Composition:** Centered in icon box, calligraphic monoline.
- **Lighting:** Flat.
- **Materials:** Gold line.
- **Color Palette:** `#C9A24B` (may take its swara tint).
- **Camera Angle:** Flat.
- **Background:** Transparent.
- **Texture:** Clean.
- **Symmetry:** Balanced family.
- **Constraints:** Seven must read as siblings.
- **Negative Prompt:** NEG-A + literal note symbols.
- **Output Format:** SVG ×7.
- **Suggested Aspect Ratio:** 1:1.

### Mudra Icon Set *(master + 9 members)*
- **Subject (per member):** A single elegant gold line hand forming [Pataka/Tripataka/Alapadma/Anjali/Kartari-mukha/Mrigashirsha/Katakamukha/Suchi/Ardhachandra], accurate fingers.
- **Composition:** Centered, 32px grid, calligraphic monoline.
- **Lighting:** Flat.
- **Materials:** Gold line.
- **Color Palette:** `#C9A24B`.
- **Camera Angle:** Flat, palm-facing.
- **Background:** Transparent.
- **Texture:** Clean.
- **Symmetry:** Per mudra.
- **Constraints:** Verify against Bharatanatyam reference; correct finger count.
- **Negative Prompt:** NEG-A + wrong fingers, deformed hand, realistic skin.
- **Output Format:** SVG ×9.
- **Suggested Aspect Ratio:** 1:1.

### Instrument Icon Set *(master + 7 members)*
- **Subject (per member):** A single gold line [veena (yali head+gourd) / Carnatic violin / venu flute / mridangam (twin barrel) / nadaswaram (conical flare) / ghatam (clay pot) / kanjira (frame+jingle)].
- **Composition:** Centered, 32px grid, matched stroke.
- **Lighting:** Flat.
- **Materials:** Gold line.
- **Color Palette:** `#C9A24B`.
- **Camera Angle:** Flat profile.
- **Background:** Transparent.
- **Texture:** Clean.
- **Symmetry:** Per instrument.
- **Constraints:** Matched optical box across the 7.
- **Negative Prompt:** NEG-A.
- **Output Format:** SVG ×7.
- **Suggested Aspect Ratio:** 1:1.

### Social · Contact · Wayfinding · OB-Role Icons *(master + members)*
- **Subject (per member):** Social (Instagram, YouTube, Facebook redrawn in the monoline); Contact (mail, phone, map-pin); Wayfinding (home, vision, events, gallery, alumni, join); OB roles (President, VP, dance, music, design, logistics).
- **Composition:** Centered icon box, 24px grid, calligraphic monoline.
- **Lighting:** Flat.
- **Materials:** Gold line.
- **Color Palette:** `#C9A24B` (+ Alta hover).
- **Camera Angle:** Flat.
- **Background:** Transparent.
- **Texture:** Clean.
- **Symmetry:** Balanced.
- **Constraints:** Social glyphs must match the family, NOT the brands' native colors.
- **Negative Prompt:** NEG-A + official brand colors, gradient logos.
- **Output Format:** SVG (each + hover state).
- **Suggested Aspect Ratio:** 1:1.

---

# BATCH 02 · KOLAM · BORDERS · GEOMETRY · LINE-ORNAMENTS  *(Family A)*

**Shared for this batch (unless overridden):** Lighting flat/none; Materials gold monoline; Color `#C9A24B` on transparent (optional single swara tint); Camera flat/orthographic; Background transparent; Texture clean vector; Constraints continuous unbroken kolam-line where possible (draw-on ready), vectorize; Negative NEG-A; Output SVG.

### Self-Drawing Kolam Divider
- **Subject:** A pulli-kolam pattern — one continuous gold line looping symmetrically around an implied dot grid.
- **Composition:** Ultra-wide band, repeat-friendly ends.
- **Symmetry:** Bilateral + repeating.
- **Constraints:** Single continuous path; 3–5 pattern variants.
- **Suggested Aspect Ratio:** 21:9 or wider.

### Pulli Dot-Grid
- **Subject:** A regular seamless grid of small soft gold dots.
- **Composition:** Seamless tile.
- **Symmetry:** Square lattice.
- **Suggested Aspect Ratio:** 1:1 tile.

### Kolam Corner Ornaments · Under-Feet · Border Band
- **Subject:** Corner quarter-flourish; circular under-feet kolam; repeating linear kolam band.
- **Composition:** Corner-anchored / centered radial / seamless band.
- **Symmetry:** Rotatable / radial / repeating.
- **Suggested Aspect Ratio:** 1:1 (corner, radial), 21:9 (band).

### Ashtadala Lotus Geometry
- **Subject:** An eight-petal lotus, golden-ratio proportions, luminous.
- **Composition:** Centered radial ornament.
- **Symmetry:** 8-fold radial.
- **Suggested Aspect Ratio:** 1:1.

### Line Mandala Bases (Kindling / Threshold)
- **Subject:** Concentric radial mandalas of fine gold line, layered for animation.
- **Composition:** Centered concentric rings + petals.
- **Symmetry:** High-order radial (8/16).
- **Constraints:** Layer rings separately for reveal.
- **Suggested Aspect Ratio:** 1:1.

### Pambara (Pleated Fan) Radial Motif
- **Subject:** A costume fan abstracted into a gold radial pleat-burst.
- **Composition:** Half/full radial, spin-ready.
- **Symmetry:** Radial pleats.
- **Suggested Aspect Ratio:** 1:1.

### Decorative Borders (Bhairavi / Paisley / Hamsa / Vine)
- **Subject:** Repeating temple border / mango-paisley row / delicate swan / flowing vine — fine gold line.
- **Composition:** Seamless horizontal bands.
- **Symmetry:** Repeating.
- **Suggested Aspect Ratio:** 21:9 or wider (tile).

### Yali Guardian & Veena Hero Line
- **Subject:** An abstracted yali guardian as a single calligraphic line; a full detailed gold-line veena (yali head, frets, gourd).
- **Composition:** Profile emblem / diagonal hero with negative space.
- **Symmetry:** Mirrorable / naturalistic.
- **Constraints:** Draw-on ready; few continuous paths.
- **Suggested Aspect Ratio:** 1:1 (yali), 3:2 (veena).

### Anjali Emblem & Footer Blessing Glyph
- **Subject:** Joined palms (namaste); a closing lotus-and-lamp blessing mark.
- **Composition:** Centered emblems.
- **Symmetry:** Bilateral.
- **Suggested Aspect Ratio:** 1:1.

### Sacred Geometry (Phi / Yantra / Concentric / Swara Ring / Sri-Yantra)
- **Subject:** Golden-ratio spiral+grid; interlocking-triangle yantras; concentric tick-rings; seven swara glyphs on a ring; a central sacred emblem.
- **Composition:** Full-frame scaffold / centered radial.
- **Symmetry:** Radial/bilateral (spiral = logarithmic).
- **Constraints:** Swara ring layered for active-state glow.
- **Suggested Aspect Ratio:** 1:1.

### Gold Line-Ornaments (Divider ornaments / Hairline / Kintsugi / Gopuram-sep / Raga-line)
- **Subject:** Diamond/lotus-bud/knot separators; ultra-fine hairline + bindu; branching kintsugi seams; stepped gopuram-tier marker; flowing raga-line wave.
- **Composition:** Centered small emblems / full-width rules.
- **Symmetry:** Bilateral / organic (kintsugi).
- **Suggested Aspect Ratio:** 1:1 (emblems), 21:9 (rules).

### Production Title Lockups & Tala Date Badge
- **Subject:** Bilingual production wordmarks (Payanam/Vishwam/Rasaleela/Yaathra/Prema Vaibhavam) in the display serif; a date rendered in a tala-styled seal.
- **Composition:** Horizontal lockups / centered seal.
- **Symmetry:** Balanced.
- **Constraints:** Set type; verify Tamil.
- **Suggested Aspect Ratio:** 3:1 (lockups), 1:1 (badge).

---

# BATCH 03 · CEREMONIAL COLOR ORNAMENTS  *(Family A-color)*

### Ceremonial Rangoli Burst *(+ variations, announcement ornament)*
- **Subject:** A radially symmetric rangoli — fine gold-line structure filled with ONE controlled jewel color, luminous, ceremonial; concentric rings (bloom-ready).
- **Composition:** Centered radial burst.
- **Lighting:** Flat, faint inner glow.
- **Materials:** Gold outline + jewel fill.
- **Color Palette:** Gold `#C9A24B` + one of crimson `#9B1C2E` / emerald `#14604E` / indigo `#1C2A57`.
- **Camera Angle:** Top-down flat.
- **Background:** Transparent (black shown).
- **Texture:** Subtle.
- **Symmetry:** 8/16-fold radial.
- **Constraints:** ONE jewel per piece; temple-luxe, not calendar-art.
- **Negative Prompt:** NEG-A + rainbow, garish, oversaturated, calendar-art, cluttered.
- **Output Format:** SVG / 2048².
- **Suggested Aspect Ratio:** 1:1.

### Swara-Tinted Portrait Mandala Frames (7)
- **Subject:** A circular mandala frame with an empty portrait aperture, fine gold line + ONE swara accent.
- **Composition:** Ring frame, empty center.
- **Lighting:** Flat.
- **Materials:** Gold line + jewel accent.
- **Color Palette:** Gold + Sa gold / Ri ochre `#C57B26` / Ga emerald / Ma teal `#0E5A63` / Pa crimson / Da plum `#5E2E52` / Ni indigo.
- **Camera Angle:** Flat.
- **Background:** Transparent.
- **Texture:** Clean.
- **Symmetry:** Radial.
- **Constraints:** 7 consistent variants; center aperture clear.
- **Negative Prompt:** NEG-A + filled center, rainbow.
- **Output Format:** SVG ×7.
- **Suggested Aspect Ratio:** 1:1.

---

# BATCH 04 · MATERIAL & TEXTURE LIBRARY  *(Family C)*

**Shared:** Lighting flat/soft/even/diffuse, NO hotspot (override — for seamless tiling); Camera top-down orthographic; Symmetry none (organic); Constraints seamless/tileable, no subject; Negative NEG-C-tex; Output WEBP tile; Aspect 1:1.

### Brass Patina *(anchor)*
- **Subject:** Aged temple brass macro — micro-scratches, darkened crevices, patina, one soft broad sheen.
- **Materials:** Aged brass. **Color:** `#8A6A25`→`#C9A24B`→`#EBD08A`. **Texture:** micro-scratch/patina. **Background:** full-bleed metal.
- **Output Format:** 2048² seamless.

### Kanjeevaram Silk + Zari (3 hues)
- **Subject:** Jewel silk weave with gold zari catching soft light; hero fold variant.
- **Lighting:** soft even + gentle sheen for zari. **Materials:** silk+gold thread. **Color:** emerald/crimson/indigo + zari. **Texture:** woven weave, zari glints. **Background:** full-bleed.
- **Output Format:** 4096² hero + 2048² tile.

### Granite · Palm-Leaf · Sandalwood · Marble · Sand · Temple Wall
- **Subject:** Honed granite / inscribed palm-leaf / carved sandalwood grain / cream marble with grey-gold veins / sandal-paste paper / weathered warm plaster.
- **Materials/Color/Texture:** per material, warm-biased. **Background:** full-bleed.
- **Constraints:** marble subtle (no busy Carrara); palm-leaf no readable text.
- **Output Format:** 2048² (marble 4096²).

### Gold-Leaf (Varak) Sheet & Bas-Relief Tile
- **Subject:** Hammered gold leaf, torn edges + cracks over dark; carved stone relief band.
- **Lighting:** soft raking (reveals leaf/relief — mild key allowed). **Materials:** gold leaf / carved stone. **Symmetry:** relief = repeating.
- **Output Format:** 2048² (leaf: 3 sheets; relief: 2 patterns).

### Black Gradient & Film Grain
- **Subject:** Warm near-black field with faint central glow; fine warm grain+haze overlay.
- **Color:** `#0E0B08`→`#171310`. **Background:** self / transparent (grain).
- **Constraints:** grain transparent overlay, low opacity.
- **Output Format:** 2560px (gradient), 2048² PNG alpha (grain).

---

# BATCH 05 · PARTICLES & LIGHT SPRITES  *(Family C)*

**Shared:** Lighting self-luminous soft glow (override); Camera flat; Background transparent clean alpha; Symmetry soft radial; Constraints single isolated sprite + rotation/size variants, "made of light/air"; Negative NEG-C-particle; Output PNG atlas; Aspect 1:1.

### Gold Dust Mote *(anchor)*
- **Subject:** A soft warm-gold glowing dust mote with gentle falloff halo. **Color:** `#EBD08A`→`#C9A24B`. **Output:** 256²/512² atlas.

### Bloom Sprites · Incense Smoke · Vibhuti Ash · Jasmine Petals · Embers · Bokeh Orbs · Lens Flare
- **Subject:** Soft warm halo blooms; translucent warm-grey smoke wisp; pale cool ash mote; delicate white jasmine petal with faint gold rim; warm ember spark with trailing glow; soft out-of-focus warm orbs; restrained warm flare kiss.
- **Color:** warm gold/amber (ash cool-pale; embers add Alta `#D64027`). **Texture:** soft.
- **Constraints:** low density in use; feels like air, not effects.
- **Output Format:** 256²–1024² PNG atlas.

---

# BATCH 06 · SILHOUETTES & FIGURATIVE SHAPES  *(Family B)*

**Shared:** Lighting single warm rim from behind/side, deep black interior; Materials implied silk/jewelry in lit edge only; Color body `#0E0B08` + rim `#EBD08A`; Camera eye-level (gopuram: low); Background transparent (ensemble: dim silk, opaque); Texture faint grain; Constraints clean readable shape, gesture clarity, generous negative space; Negative NEG-B + visible face detail, flat gray, missing rim light; Output 3840px PNG alpha.

### Dancer Silhouette — Araimandi *(anchor)*
- **Subject:** A Bharatanatyam dancer in the half-sitting araimandi stance, costume fan and jewelry implied in the rim.
- **Composition:** Centered/thirds, grounded triangular base.
- **Symmetry:** Near-bilateral.
- **Suggested Aspect Ratio:** 3:2 & 9:16.

### Dancer Silhouette — Tribhanga
- **Subject:** A dancer in the tribhanga three-bend S-curve. **Composition:** off-center S-curve. **Symmetry:** asymmetric. **Aspect:** 3:2 & 9:16.

### Veena / Tambura / Gopuram Silhouettes
- **Subject:** Rim-lit veena; slender rim-lit tambura; tiered gopuram against warm dusk-to-black.
- **Composition:** diagonal / vertical / low-angle vertical with negative sky.
- **Camera:** eye-level / eye-level / low.
- **Symmetry:** naturalistic / vertical / bilateral tiering.
- **Aspect:** 3:2 (instruments), 9:16 (gopuram).

### Ensemble Silhouette
- **Subject:** A seated Carnatic ensemble as warm rim-lit silhouettes against dim jewel silk with haze, one spotlight.
- **Composition:** horizontal group, cinematic. **Background:** dim silk wash (opaque). **Symmetry:** balanced group.
- **Suggested Aspect Ratio:** 2.39:1.

---

# BATCH 07 · LIT METAL HERO OBJECTS  *(Family B)*

**Shared:** Lighting single warm key 2700–3200K upper-left 45° (Rembrandt) + warm rim, small speculars, deep shadow, faint bloom/haze; Materials aged temple brass/bronze (patina, micro-scratch), dark wood, clay, gemstones, gold-leaf; Color brass `#8A6A25`–`#C9A24B`, lit edge `#EBD08A`, gemstone kumkum/emerald, on `#0E0B08`; Camera eye-level to slightly-low hero; Background Garbhagriha black, isolated with alpha; Texture brass micro-scratch/patina, grain; Symmetry object-natural, centered; Constraints one hero object per frame, museum-vitrine, 60–70% negative space, shallow DOF; Negative NEG-B + flat yellow, chrome, plastic; Output 3840px PNG alpha; Aspect 4:5 & 1:1 (hero object), 3:2 (scene).

### Oil Lamp (Deepam) + Flame *(anchor)*
- **Subject:** A brass kuthuvilakku oil lamp with a live warm flame in darkness, lit by its own flame, gold reflections rippling, faint smoke; flame the brightest point.
- **Constraints:** the light source that calibrates the whole batch.
- **Negative Prompt:** NEG-B + electric bulb, candle wax.

### Veena · Mridangam · Ghatam Renders
- **Subject:** Lit aged-brass veena (yali head catching key, strings glinting); mridangam (leather + dark wood + brass rings, optional hand-strike); clay ghatam (earthy matte terracotta + brass glint).
- **Camera:** diagonal hero / centered / centered.
- **Materials:** brass+wood / leather+brass / terracotta.

### Temple Jewelry Pieces (4)
- **Subject:** Nethichutti / jhumka / oddiyanam / maatal in aged temple gold with rubies/emeralds on dark silk.
- **Composition:** one piece per frame, single specular per stone.
- **Materials:** temple gold + gemstones + silk.

### Diya Row & Logo on Brass
- **Subject:** A row of small oil lamps with flames; the monogram embossed + gold-leaf inlaid in a lit brass plate.
- **Camera:** eye-level row / centered tight.
- **Constraints:** logo-on-brass — no engraved brand text.

---

# BATCH 08 · CINEMATIC ATMOSPHERE & BACKGROUNDS  *(Family B)*

**Shared:** Lighting single dominant warm source (in-frame/implied), god-rays through haze, deep falloff to warm black, gentle vignette; Materials stone, silk, haze, light, flame-glow; Color black base + warm gold light + one jewel wash per scene; Camera cinematic (low/eye-level/looking-up per subject); Background full-bleed opaque (overlays/parallax = alpha); Texture stone relief, haze, grain; Symmetry asymmetric cinematic (doorway/ceiling = symmetric); Constraints 2.39:1, FG/MG/BG depth separation, off-center subject, vast negative darkness, layer-separable; Negative NEG-B; Output 3840×2160 (+2160×3840 mobile).

### Sanctum Doorway + Glow *(anchor)*
- **Subject:** Through a carved stone doorway into darkness where an oil lamp glows warm-gold; doorway in sharp relief, interior mysterious, haze.
- **Camera:** centered deep perspective. **Symmetry:** bilateral. **Aspect:** 21:9 & 16:9.

### God-Rays · Spotlight Cone · Rim Gradients · Vignette
- **Subject:** Warm shafts through incense smoke with suspended dust; a single warm spotlight cone on empty dark stage; warm edge-light gradients; warm-to-black radial vignette.
- **Background:** alpha overlays. **Constraints:** overlay-ready.
- **Aspect:** 21:9 / 16:9 / any.

### Silk Light Field · Colonnade · Gopuram Tiers · Ceiling Mandala · Lotus Low-Light · Costume Fabric
- **Subject:** Abstract jewel-silk backdrop with drifting dust; receding carved pillars with one shaft; gopuram tiers into warm haze; carved mandala ceiling looking up; single lotus rim-lit on dark water; Kanjeevaram fan-pleat macro.
- **Camera:** eye-level / perspective / vertical / looking-up / off-center / macro.
- **Symmetry:** asymmetric (ceiling radial). **Background:** full-bleed opaque.
- **Aspect:** 21:9 (silk/colonnade/lotus), 9:16 (gopuram tiers), 1:1 (ceiling), 3:2 (fabric).

### Parallax Layer Plates
- **Subject:** For a key scene, separate FG (performer/instrument) / MG (light/haze) / BG (silk/architecture) plates that move independently.
- **Background:** each isolated with clean alpha. **Constraints:** aligned to one composition.
- **Aspect:** 3840px per plane.

---

# BATCH 09 · HERO COMPOSITE SCENES  *(Family B)*

### Hero Master Composition (Desktop + Mobile) & Foreground Plate
- **Subject:** The invocation — a spotlit implied stage with a veena and oil lamp, deep jewel-silk backdrop, drifting gold dust and haze, deep black, with a reserved wordmark zone; plus an isolated rim-lit foreground plate.
- **Composition:** Off-center focal, huge negative space top for type, layer-separated for parallax.
- **Lighting:** Batch-07/08 chiaroscuro; lamp/spotlight is the key.
- **Materials:** Silk backdrop, brass veena/lamp, dust.
- **Color Palette:** Black + gold + one jewel silk.
- **Camera Angle:** Eye-level, slightly low (heroic).
- **Background:** Opaque scene; foreground plate with alpha.
- **Texture:** Silk sheen, haze, grain.
- **Symmetry:** Asymmetric cinematic.
- **Constraints:** The most-crafted view; assembled/refined from Batch 04–08 elements; reserve type space.
- **Negative Prompt:** NEG-B + centered symmetry, clutter, cold light.
- **Output Format:** Layered PNG/WEBP (desktop + mobile).
- **Suggested Aspect Ratio:** 2.39:1 desktop, 9:16 mobile.

---

# BATCH 10 · ART-DIRECTED PHOTOGRAPHY  *(Camera capture — direction, not AI-gen)*

### Master LUT *(grade first)*
- **Subject:** A reference grade from one hero frame — warm crushed shadows, protected highlights, gold mid-tones.
- **Constraints:** deliver `.cube` + presets; apply to ALL images. **Output:** LUT file.

### OB Portraits (13) · Alumni Portraits (9+)
- **Subject:** Office bearers (calm, dignified) / alumni (warmer, intimate) single-key Rembrandt portraits, subtle rim on hair/jewelry.
- **Composition:** 4:5 head-and-shoulders; consistent eyeline/crop across each set.
- **Lighting:** Physical warm key 2700–3200K + minimal cool fill; deep shadow.
- **Materials:** Real costume/jewelry.
- **Color Palette:** LUT-graded warm.
- **Camera Angle:** Eye-level, slight hero tilt.
- **Background:** Dark seamless hall.
- **Texture:** Natural, filmic.
- **Symmetry:** Off-center, thirds.
- **Constraints:** Uniform rig across the set; cutout-mask variant.
- **Negative Prompt:** NEG-photo.
- **Output Format:** 1600×2000 WEBP.
- **Suggested Aspect Ratio:** 4:5.

### Performance Heroes · Macro/Detail Library · Event Archive · Film Loop · Motion Clips
- **Subject:** Spotlit performance stills (motion blur skirt/pallu, sharp calm face); macro details (mudras, alta feet, ghungroo, jewelry, strings, kohl eyes); re-graded event archive; ambient b-roll loop; dancer-spin clip.
- **Composition:** 2.39:1/3:2 performance; extreme-close macro (single catchlight).
- **Lighting/Color:** as above + master LUT.
- **Camera Angle:** Low heroic / macro / handheld-intimate.
- **Background:** Dark hall.
- **Constraints:** Truthful abhinaya/effort; no flash.
- **Negative Prompt:** NEG-photo.
- **Output Format:** 3840px WEBP / 2560px WEBP / WEBM loop.
- **Suggested Aspect Ratio:** 2.39:1, 3:2, 16:9 (loop).

---

# BATCH 11 · SOCIAL & MARKETING TEMPLATES  *(Assembly)*

### Social Template Family *(IG post/story, event announcement, quote share, avatar, covers, OG, countdown, reel end-card, handle lockup)*
- **Subject:** Editorial branded layouts — gold wordmark + a single dim spotlit performance image + tracked uppercase eyebrow + thin gold rule; avatar = monogram; announcement = rangoli-framed date/title.
- **Composition:** Per-platform; vast dark negative space; left-weighted type; one hero image.
- **Lighting:** Flat UI over dark cinematic photo fields.
- **Materials:** Gold rule, ivory type, photographic imagery.
- **Color Palette:** Black, gold, ivory + one swara accent per campaign.
- **Camera Angle:** N/A (layout).
- **Background:** Opaque dark (handle lockup transparent).
- **Texture:** Subtle grain.
- **Symmetry:** Asymmetric editorial.
- **Constraints:** Assembled from brand marks (B01) + photography (B10) + ornaments (B02/03); one hero image only.
- **Negative Prompt:** NEG-B + busy, multiple images, clutter.
- **Output Format:** PNG (per-platform) / SVG (handle lockup).
- **Suggested Aspect Ratio:** 1:1, 9:16, 1.91:1.

---

# BATCH 12 · UI COMPONENTS & DECORATIVE  *(Assembly — built in code/Figma)*

### Component Family *(buttons, nav pill, form fields, tags, cards, quote plinth, badges, scroll UI, modal, cursor, toast, skeleton)*
- **Subject:** Brass-line UI assembled from B01/B02 vectors + B04 textures — gold-ignite hover, kolam-draw underline, swara-tinted active states.
- **Composition:** Tala spacing scale, asymmetric editorial, generous negative space.
- **Lighting:** Flat UI; subtle gold glow on active/hover only.
- **Materials:** Brass-line, gold, marble (plinths), silk (card fills).
- **Color Palette:** Full core system + per-section swara accent.
- **Camera Angle:** N/A.
- **Background:** Transparent component layers over dark ground.
- **Texture:** From B04 textures.
- **Symmetry:** Layout-driven.
- **Constraints:** Assembled, not image-generated; validate against icon/line families.
- **Negative Prompt:** N/A (assembly).
- **Output Format:** SVG / CSS / component code.
- **Suggested Aspect Ratio:** Responsive.

---

# BATCH 13 · 3D MODELS  *(GLB — concept-render prompts + build spec)*

### 3D Shortlist *(oil lamp, veena, mridangam, gopuram, dancer, hero scene)*
- **Subject:** Web-optimized 3D of [object] matching its Batch-07 render.
- **Composition:** Isolated hero object, turntable-ready.
- **Lighting:** One warm key + warm rim baked; warm low-key HDRI IBL; match Blender view-transform to the master LUT.
- **Materials:** Batch-04 textures as PBR (brass `sap_tex_brass_2k`, granite); Batch-07 renders as look targets.
- **Color Palette:** Same as Batch 07.
- **Camera Angle:** Eye-level turntable; hero 3/4.
- **Background:** Black / transparent canvas.
- **Texture:** PBR from library textures.
- **Symmetry:** Object-natural.
- **Constraints:** Draco GLB, KTX2 ≤2K, ≤150k tris, baked static PNG fallback mandatory.
- **Negative Prompt (concept renders):** NEG-B + over-poly, missing fallback.
- **Output Format:** GLB + 3840px baked PNG fallback.
- **Suggested Aspect Ratio:** 1:1 & 3:2 (previews).

---

# BATCH 14 · MOTION & AUDIO  *(Derived — no new imagery)*

### Motion & Audio Set *(loader, page transition, kolam draw, blooms, pulse, waveforms, wipes, footer resolve; tambura drone, micro-cues, invocation note, stingers)*
- **Subject:** Animations/audio assembled from the approved static masters (kolam from B02, kindling from B02+B07, silk wipes from B04, pulse from instrument masters).
- **Composition / Lighting / Materials / Color / Camera / Background / Texture / Symmetry:** Inherited from source masters — nothing new introduced.
- **Constraints:** Bible §13 easing ("veena-decay" ease-out, long tail), seamless loops, ≤200KB Lottie, 60fps, `prefers-reduced-motion` still-frame fallback.
- **Negative Prompt:** N/A (derived).
- **Output Format:** Lottie JSON / WEBM(alpha)+MP4 / audio (WEBM+MP3).
- **Suggested Aspect Ratio:** Inherited per asset.

---

## RUN DISCIPLINE (every generation)
1. Prepend `{{GSC}}` verbatim; pin the Batch-00 board + the batch anchor as references.
2. Generate the batch **anchor first**, approve, then run siblings on the same seed.
3. Never mix treatment families A / B / C in one call.
4. Vectorize line-art; keep textures seamless; keep sprites on clean alpha.
5. Save to the inventory's exact File Name; run the 5-point Acceptance Test before it enters the library.

*Saptham — where the seven notes become light.*
*Prompt Library v2.0 · Batched, 14-field, `{{GSC}}`-prefixed.*

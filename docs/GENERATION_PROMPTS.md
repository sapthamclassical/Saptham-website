# SAPTHAM — ASSET GENERATION PROMPTS
### Production Prompt Library · v1.0
**Fourth companion. Read `DESIGN_BIBLE.md`, `ASSET_PRODUCTION_CHECKLIST.md`, and `GENERATION_PIPELINE.md` first. This document holds a ready-to-run prompt for every generatable asset, organized by generation batch.**

---

## HOW TO USE THIS FILE

- **Every prompt begins with `{{GSC}}`** — the Global Style Constraints block, defined once below. Expand it (paste the full text) at the front of every generation call. This is non-negotiable and is what holds the whole asset library together.
- Each asset then lists **Subject · Composition · Lighting · Materials · Color Palette · Texture · Background · Symmetry · Negative Prompt · Output Notes**.
- **Lighting/Background/Texture fields may override `{{GSC}}`** for flat-vector and texture assets (you cannot apply chiaroscuro to a seamless tile). Where they do, the field says so.
- **Negative prompts use presets** (NEG-A…NEG-photo, defined below) plus any per-asset delta.
- **Icon/instrument/mudra *sets*** are written as a master block + per-member Subject bullets. Each bullet is one generation using the shared block — this is what keeps a set internally identical.
- Batches **12–13 are derived/assembled**, not image-generated; see the short note at the end.

---

## `{{GSC}}` — GLOBAL STYLE CONSTRAINTS (expand at the front of EVERY prompt)

> **HARMONIZED (per `PRODUCTION_AUDIT.md` §2.3 / `CANON.md`):** the canonical `{{GSC}}` is the Design Bible's verbatim Global Moodboard Constraints. Use exactly this text in every prompt across all docs:
>
> **`{{GSC}}`** = *warm candlelit chiaroscuro lighting, 2700–3200K, deep warm near-black background (#0E0B08), antique temple-brass gold (#C9A24B) accents, single directional key light, rich deep shadows, small controlled specular highlights, subtle incense haze and drifting gold-dust particles, cinematic 2.39:1 or 3:2 framing, shallow depth of field, film grain, no flash, no cold blue light, no neon, no clutter, museum-grade, luxurious, restrained.*
>
> **Override note:** for flat-vector and texture assets the per-asset Lighting/Background/Texture fields specialize or override the `{{GSC}}` chiaroscuro/DOF defaults (you cannot apply chiaroscuro to a seamless tile or a flat SVG). The palette, gold-as-lit-metal law, warmth, restraint, and prohibitions always hold. Gold, wherever it is a fill/metal, uses the 3-stop gradient `#8A6A25` → `#C9A24B` → `#EBD08A`.

## NEGATIVE-PROMPT PRESETS

- **NEG-A (flat line / vector):** `photorealism, 3D render, shading, inner gradients, drop shadows, filled shapes, background color, sketchy/uneven/double strokes, wobbly line weight, blur, pixelation, cartoon mascot, clip-art, cold colors, neon, rainbow, watermark, text, signature`
- **NEG-B (lit / volumetric):** `flat even lighting, cold blue or white light, neon, HDR glare, blown-out highlights, chrome or plastic finish, flat yellow gold, cluttered or busy background, stage clutter, tourist oversaturation, harsh flash, deformed anatomy, extra fingers, extra limbs, low contrast, muddy shadows, watermark, text, logo`
- **NEG-C-tex (textures):** `seams, visible repeat, tiling artifacts, directional hotspot, any subject or object, focal point, text, watermark, uneven exposure, color-cast shift, plastic sheen, blur, low resolution`
- **NEG-C-particle (sprites):** `hard edges, solid shape, background, frame or box, color banding, neon, clustered multiple particles, text, watermark`
- **NEG-photo (capture look):** `flash, cold white balance, cluttered stage, plastic chairs, banners, oversaturation, heavy retouch, plastic skin, deformed hands, extra fingers, motion smear on face, low contrast, watermark, logo`

---

# BATCH 00 · MASTER STYLE ANCHOR BOARD

### STYLE-00 · Master Style Anchor Board *(generate & approve FIRST)*
- **Subject:** A curated reference contact-sheet on deep warm black: a horizontal gold gradient bar (`#8A6A25`→`#C9A24B`→`#EBD08A`), an aged brass patina swatch, a Kanjeevaram silk swatch with gold zari, a single lit brass oil lamp with a live flame, one minimal gold line-drawn veena, and a small gold monogram — each a labelled cell.
- **Composition:** Clean 3×2 grid of isolated swatches/objects, generous black gutters, orthographic, centered, gallery contact-sheet feel.
- **Lighting:** Two zones — swatches lit flat-even; the oil lamp lit by its own warm flame with deep shadow (demonstrates the chiaroscuro key for the whole system).
- **Materials:** Aged temple brass, jewel silk, patinated metal, oil-lamp flame.
- **Color Palette:** Full core system — black `#0E0B08`, gold 3-stop, ivory `#F4EDE0`, kumkum `#9B1C2E`, one emerald `#14604E` accent.
- **Texture:** Fine film grain overall; visible brass micro-scratches and silk weave in swatches.
- **Background:** Garbhagriha black `#0E0B08`, full-bleed.
- **Symmetry:** Ordered grid symmetry.
- **Negative Prompt:** NEG-B + `messy layout, mismatched styles, inconsistent gold tone`
- **Output Notes:** 3840×2160, PNG. This plate is pinned as a style-reference image on every subsequent batch.

---

# BATCH 01 · BRAND & IDENTITY MARKS

**Batch shared:** luxury-house restraint; display serif (Fraunces/Canela family) + Noto Serif Tamil at equal weight; gold-on-black default. Lighting flat for vector marks (overrides GSC key light) except the on-brass variant.

### BRD-01 · Primary monogram *(batch anchor)*
- **Subject:** A minimal, elegant monogram for "Saptham" — an abstract mark fusing a stylised veena-neck curve with a seven-point/seven-note motif (sapta swara), reading as a single confident gold emblem.
- **Composition:** Single centered mark, vast clear-space (≥1× mark height margin), perfectly balanced.
- **Lighting:** Flat, even (vector); no cast shadow.
- **Materials:** Lit gold line/fill.
- **Color Palette:** Saptham Gold `#C9A24B` on black; also deliver 1-color.
- **Texture:** Clean, none.
- **Background:** Transparent (shown on black).
- **Symmetry:** Near-symmetric, subtly balanced.
- **Negative Prompt:** NEG-A + `overcomplex, literal instrument drawing, generic swoosh, corporate logo cliché`
- **Output Notes:** Generate 2048² → vectorize SVG.

### BRD-02 · Wordmark (Latin)
- **Subject:** The word "SAPTHAM" set in a high-contrast display serif, refined thick-thin calligraphic stress, tracked for gravitas.
- **Composition:** Single horizontal lockup, centered, generous margins.
- **Lighting:** Flat vector.
- **Materials:** Gold letterforms.
- **Color Palette:** Gold `#C9A24B` / ivory `#F4EDE0` variants on black.
- **Texture:** Clean.
- **Background:** Transparent.
- **Symmetry:** Optically centered baseline.
- **Negative Prompt:** NEG-A + `distorted letters, fake serif, uneven kerning, gibberish glyphs`
- **Output Notes:** Deliver as set type (Fraunces/Canela) → SVG outline; 2048².

### BRD-03 · Wordmark (Tamil lockup)
- **Subject:** "சப்தம்" set in Noto Serif Tamil display, matched in size and dignity to the Latin wordmark, optionally stacked below it separated by a thin gold hairline.
- **Composition:** Bilingual stack or side-by-side, equal visual weight, hairline divider.
- **Lighting:** Flat vector.
- **Materials:** Gold letterforms.
- **Color Palette:** Gold `#C9A24B` on black.
- **Texture:** Clean.
- **Background:** Transparent.
- **Symmetry:** Balanced bilingual lockup.
- **Negative Prompt:** NEG-A + `malformed Tamil characters, wrong glyphs, Latin substituting Tamil`
- **Output Notes:** Set with correct Tamil font → SVG. Verify glyph accuracy with a Tamil reader.

### BRD-05 · Reversed / mono
- **Subject:** The monogram + wordmark in reversed and single-color forms for light/sand backgrounds and fallbacks.
- **Composition:** Same lockups as BRD-01/02.
- **Lighting:** Flat.
- **Materials:** Solid single color.
- **Color Palette:** Ink `#171310` on sand `#E5D6B8`; and pure ivory on black.
- **Texture:** Clean.
- **Background:** Transparent + sand variant.
- **Symmetry:** As anchor.
- **Negative Prompt:** NEG-A.
- **Output Notes:** SVG, light/dark/1-color set.

### BRD-04 · Logo on brass (lit hero variant)
- **Subject:** The monogram embossed/inlaid into an aged temple-brass plate, catching a single raking flame-light.
- **Composition:** Centered mark on plate, tight crop, hero.
- **Lighting:** Single warm raking key from upper-left; deep shadow in the emboss; small speculars on the metal ridges.
- **Materials:** Aged brass plate with patina; gold-leaf inlay.
- **Color Palette:** Brass `#8A6A25`–`#C9A24B`, lit edge `#EBD08A`, black surround.
- **Texture:** Brass micro-scratch, faint patina, film grain.
- **Background:** Garbhagriha black, slight vignette.
- **Symmetry:** Centered.
- **Negative Prompt:** NEG-B + `flat yellow, plastic, engraved text, brand names`
- **Output Notes:** 2048², PNG with alpha around plate.

### BRD-07 · OG / social share cards
- **Subject:** Link-preview card templates — the wordmark + a single spotlit hero image area + a thin gold rule + a tracked uppercase eyebrow.
- **Composition:** 1.91:1 editorial layout, left-weighted type, vast dark negative space.
- **Lighting:** Flat UI over a dark cinematic photo field.
- **Materials:** Gold rule, ivory type.
- **Color Palette:** Black, gold, ivory.
- **Texture:** Subtle grain.
- **Background:** Garbhagriha black with a dim performance image.
- **Symmetry:** Asymmetric editorial.
- **Negative Prompt:** NEG-B + `busy, multiple images, clutter`
- **Output Notes:** 1200×630 PNG; one per key page.

---

# BATCH 02 · MATERIAL & TEXTURE LIBRARY

**Batch shared — OVERRIDE:** lighting is **flat, soft, even, diffuse** (no directional hotspot) so textures tile seamlessly. Full-bleed, top-down/orthographic, seamless, no subject, no focal point. Background = the material itself (opaque). Symmetry = none (organic even field). Negative = NEG-C-tex.

### GLD-02 · Brass patina *(batch anchor — the gold source)*
- **Subject:** Extreme macro of aged temple brass — warm metal with fine micro-scratches, darkened crevices, gentle patina, one soft sweeping sheen.
- **Composition:** Edge-to-edge flat surface, seamless.
- **Lighting:** Flat even diffuse; soft broad sheen, no hotspot.
- **Materials:** Aged brass/bronze.
- **Color Palette:** `#8A6A25`→`#C9A24B`→`#EBD08A`.
- **Texture:** Micro-scratch, patina grain.
- **Background:** N/A (full-bleed metal).
- **Symmetry:** None (organic).
- **Negative Prompt:** NEG-C-tex + `new shiny gold, chrome, plastic`
- **Output Notes:** 2048² seamless tile.

### TEX-02 · Kanjeevaram silk + zari
- **Subject:** Macro of jewel-toned silk weave with woven gold zari threads catching soft light; luxurious.
- **Composition:** Full-bleed weave, seamless; a hero variant with soft folds.
- **Lighting:** Soft even, gentle directional sheen for the zari shimmer.
- **Materials:** Silk + gold thread.
- **Color Palette:** Emerald `#14604E`, crimson `#9B1C2E`, indigo `#1C2A57` variants + gold zari.
- **Texture:** Fine woven weave, zari glints.
- **Background:** N/A.
- **Symmetry:** None.
- **Negative Prompt:** NEG-C-tex + `printed pattern, plastic sheen`
- **Output Notes:** 4096² hero + 2048² tile; 3 colorways.

### TEX-03 · Honed granite
- **Subject:** Fine-speckled dark temple granite, honed matte.
- **Composition:** Full-bleed, seamless.
- **Lighting:** Flat even, faint grazing to show grain.
- **Materials:** Granite stone.
- **Color Palette:** `#2A241D`–`#4A4236`.
- **Texture:** Fine speckle grain.
- **Background:** N/A.
- **Symmetry:** None.
- **Negative Prompt:** NEG-C-tex.
- **Output Notes:** 2048² tile.

### TEX-04 · Palm-leaf (ola) manuscript
- **Subject:** Aged inscribed palm-leaf manuscript surface, warm fibrous grain, faint etched marks.
- **Composition:** Full-bleed, seamless.
- **Lighting:** Flat even, warm.
- **Materials:** Dried palm leaf.
- **Color Palette:** Warm tan `#C9A24B`-adjacent, `#E5D6B8`.
- **Texture:** Fibrous, aged.
- **Background:** N/A.
- **Symmetry:** None.
- **Negative Prompt:** NEG-C-tex + `readable text, modern paper`
- **Output Notes:** 2048² tile.

### TEX-05 · Sandalwood grain
- **Subject:** Warm carved sandalwood with soft relief grain.
- **Composition:** Full-bleed, seamless.
- **Lighting:** Flat even; shallow shadow in grooves.
- **Materials:** Sandalwood.
- **Color Palette:** Warm brown, `#4A4236`–`#8A6A25`.
- **Texture:** Wood grain + low relief.
- **Background:** N/A.
- **Symmetry:** None.
- **Negative Prompt:** NEG-C-tex.
- **Output Notes:** 2048² tile.

### TEX-06 · Marble veining
- **Subject:** Warm-cream marble with soft grey-gold veins.
- **Composition:** Full-bleed; hero slab variant.
- **Lighting:** Flat even, soft.
- **Materials:** Polished-honed marble.
- **Color Palette:** `#F0E7D6`, `#D8CDB6`, gold-grey veins.
- **Texture:** Subtle veining.
- **Background:** N/A.
- **Symmetry:** None.
- **Negative Prompt:** NEG-C-tex + `busy Carrara drama, high contrast veins`
- **Output Notes:** 4096².

### TEX-08 · Chandana sand paper
- **Subject:** Warm sandalwood-paste / handmade-paper surface for light sections.
- **Composition:** Full-bleed, seamless.
- **Lighting:** Flat even.
- **Materials:** Handmade paper / sandal paste.
- **Color Palette:** `#E5D6B8`.
- **Texture:** Fine fibre.
- **Background:** N/A.
- **Symmetry:** None.
- **Negative Prompt:** NEG-C-tex.
- **Output Notes:** 2048² tile.

### TEX-01 · Garbhagriha black gradient
- **Subject:** A warm near-black base field with a barely-there radial warm glow center.
- **Composition:** Full-bleed gradient.
- **Lighting:** Implied faint central warmth.
- **Materials:** N/A (atmospheric).
- **Color Palette:** `#0E0B08` → `#171310`.
- **Texture:** Faint grain.
- **Background:** Self.
- **Symmetry:** Radial.
- **Negative Prompt:** NEG-C-tex + `pure black, blue-black, banding`
- **Output Notes:** 2560px; also CSS-reproducible.

### TEX-07 · Global film grain / haze overlay
- **Subject:** A fine warm film-grain + soft haze overlay texture.
- **Composition:** Full-bleed, seamless, sparse.
- **Lighting:** N/A.
- **Materials:** N/A.
- **Color Palette:** Warm neutral grain, transparent base.
- **Texture:** Fine grain + faint haze.
- **Background:** Transparent (overlay).
- **Symmetry:** None.
- **Negative Prompt:** NEG-C-particle + `heavy noise, colored noise`
- **Output Notes:** 2048² tile, PNG alpha; low opacity in use.

### GLD-01 · Gold-leaf (varak) sheet
- **Subject:** Hammered gold leaf with torn edges and fine cracks over dark ground.
- **Composition:** Full-bleed sheet, seamless-ish; a few torn-edge variants.
- **Lighting:** Soft raking to reveal leaf texture.
- **Materials:** Gold leaf / varak.
- **Color Palette:** `#C9A24B`–`#EBD08A` on `#0E0B08`.
- **Texture:** Hammered, cracked, leaf-edge.
- **Background:** Dark where leaf is torn.
- **Symmetry:** None.
- **Negative Prompt:** NEG-C-tex + `smooth foil, plastic, uniform`
- **Output Notes:** 2048², 3 sheets.

### ARC-06 · Stone bas-relief tile
- **Subject:** Carved temple-stone bas-relief pattern band (abstract floral/geometric), shallow relief.
- **Composition:** Horizontal seamless band + tile.
- **Lighting:** Warm raking side-light to reveal relief depth (mild directional — the one texture allowed a soft key).
- **Materials:** Carved granite/stone.
- **Color Palette:** Stone neutrals `#2A241D`–`#4A4236`, warm.
- **Texture:** Relief carving, cool shadow in grooves.
- **Background:** Stone.
- **Symmetry:** Repeating horizontal.
- **Negative Prompt:** NEG-C-tex + `figures, deities, faces`
- **Output Notes:** 2048² tile; 2 patterns.

---

# BATCH 03 · ICONOGRAPHY & WAYFINDING

**ICON MASTER BLOCK (applies to every icon below).**
- **Lighting:** Flat, no directional light (overrides GSC key); pure vector.
- **Materials:** Single gold monoline.
- **Color Palette:** Saptham Gold `#C9A24B` line on transparent (active state may swap to Alta `#D64027`).
- **Texture:** None — clean vector.
- **Background:** Transparent (mandatory).
- **Symmetry:** Optically balanced within a square keyline box; consistent padding.
- **Composition:** Single glyph centered, 1.5px optical stroke, calligraphic terminals, rounded joins, drawn on a 24/32/48 ashtadala grid.
- **Negative Prompt:** NEG-A.
- **Output Notes:** Generate 1024²/2048² clean line → vectorize to SVG at 24/32/48.

### ICO-04 · UI system icons *(batch anchor — locks the family)*
Generate each as one run off the ICON MASTER BLOCK. **Subjects:**
- menu (three tapered gold lines) · close (fine gold cross) · arrow-left · arrow-right · chevron-down · plus/expand · external-link · play · pause · search (lotus-loupe). Each: minimal gold monoline glyph, calligraphic terminal.

### ICO-02 · Swara glyph set (Sa–Ni)
- **Subject:** Seven distinct minimal gold glyphs, one per swara, each a small abstract mark (a single expressive stroke / dot cluster) evoking a musical note — Sa, Ri, Ga, Ma, Pa, Da, Ni — as a cohesive family. *(7 subjects; may include the Devanagari/Tamil solfa letter abstracted.)*
- **Composition/Lighting/etc.:** ICON MASTER BLOCK.
- **Output Notes:** 7 SVGs + a combined "swara ring" arrangement (see GEO-04).

### BN-01 · Mudra icon set
Master = ICON MASTER BLOCK. **Subjects (one run each):**
- Pataka (flat palm) · Tripataka · Alapadma (lotus/opened palm) · Anjali (joined palms) · Kartari-mukha · Mrigashirsha · Katakamukha · Suchi (pointing) · Ardhachandra. Each: a single elegant gold line-drawn hand in the named mudra, accurate finger positions, calligraphic line.
- **Negative Prompt:** NEG-A + `wrong finger count, anatomically wrong hand, realistic skin`
- **Output Notes:** 9 SVGs; verify mudra accuracy with a Bharatanatyam reference.

### ICO-07 / INS-icons · Instrument icon set
Master = ICON MASTER BLOCK. **Subjects (one run each):**
- **Veena** (`INS-01`): yali-headed long-necked lute with gourd, single gold line. · **Violin** (`INS-06`): Carnatic seated-position violin with scroll. · **Flute/Venu** (`INS-07`): horizontal bamboo flute, finger-hole dots. · **Mridangam** (`INS-08`): twin-faced barrel drum. · **Nadaswaram** (`INS-13`): long conical flaring pipe. · **Ghatam** (`INS-14`): clay-pot with mouth opening. · **Kanjira** (`INS-15`): small frame-drum with jingle slit.
- **Output Notes:** 7 SVGs, matched stroke and box.

### ICO-06 · Contact icons
Master block. **Subjects:** mail (envelope) · phone (handset) · map-pin (location) — brass-line, to replace generic UI icons. 3 SVGs.

### ICO-03 · Social icons
Master block. **Subjects:** Instagram glyph · YouTube glyph · Facebook glyph — redrawn in the 1.5px calligraphic gold monoline to match the family (not the brands' native logos' color).
- **Negative Prompt:** NEG-A + `official brand colors, gradient logos`
- **Output Notes:** 3 SVGs + hover (Alta) state.

### BN-08 · Ghungroo icon
Master block. **Subject:** a curved strand of ankle bells (salangai), gold line, a few bells, calligraphic. + a "shimmer" state (tiny sparks).

### SCR-05 · Scroll cue
Master block. **Subject:** a slender downward chevron or a small descending kolam-dot trail signalling "continue," minimal gold line, breathing-ready.

### ICO-08 · Favicon / touch icons
- **Subject:** The monogram (BRD-01) simplified for tiny sizes.
- **Composition:** Centered in safe area, bold enough for 16px.
- **Lighting/Materials/etc.:** ICON MASTER BLOCK; solid gold on black for maskable variant.
- **Background:** Transparent + black maskable.
- **Output Notes:** 16/32/180/192/512 set.

---

# BATCH 04 · KOLAM · BORDERS · GEOMETRY · DIVIDERS

**LINE-ORNAMENT MASTER BLOCK (applies to all below).** Same as ICON MASTER BLOCK: flat gold `#C9A24B` monoline (1.5px), transparent background, no light, clean vector, calligraphic. **Kolam logic:** a single continuous unbroken looping line where possible (self-draw-ready). Symmetry radial/bilateral where sacred. Negative = NEG-A. Output = generate 2048² → vectorize SVG. Only the per-asset Subject / Composition / Symmetry / aspect vary.

### KOL-02 / DIV-01 · Self-drawing kolam divider *(batch anchor)*
- **Subject:** A traditional pulli-kolam pattern — a continuous gold line looping symmetrically around an implied dot grid, elegant and unbroken.
- **Composition:** Ultra-wide horizontal band, pattern centered, repeat-friendly ends.
- **Symmetry:** Bilateral + repeating.
- **Aspect/Output:** 21:9 or wider; SVG single continuous path. Deliver 3–5 pattern variants.

### KOL-01 · Pulli dot-grid
- **Subject:** A regular grid of small gold dots (kolam pulli matrix).
- **Composition:** Seamless tile.
- **Symmetry:** Square lattice.
- **Aspect/Output:** 1:1 tile SVG; density variants.

### KOL-05 · Kolam corner ornaments
- **Subject:** A continuous-line kolam flourish sized for a card/frame corner.
- **Composition:** Corner-anchored quarter motif.
- **Symmetry:** Rotatable to 4 corners.
- **Output:** 1:1 SVG, 4-corner set.

### KOL-06 · Kolam under-feet motif
- **Subject:** A circular kolam designed to sit beneath dancer's feet (shared with dance detail).
- **Composition:** Centered radial.
- **Symmetry:** Radial.
- **Output:** 1:1 SVG.

### LOT-01 · Ashtadala (8-petal) lotus geometry
- **Subject:** A precise eight-petal lotus in fine gold line, golden-ratio proportions, luminous.
- **Composition:** Centered radial ornament.
- **Symmetry:** 8-fold radial.
- **Output:** 1:1 SVG.

### LOT-03 · Lotus icon
- **Subject:** A simplified single lotus bloom mark for "vision" wayfinding.
- **Composition:** Centered, icon-box.
- **Symmetry:** Bilateral.
- **Output:** 24/32/48 SVG.

### MAN-01 · Kindling load mandala (line base)
- **Subject:** A concentric radial mandala of fine gold line, ready to animate radiating outward from center.
- **Composition:** Centered, concentric rings + petals.
- **Symmetry:** High-order radial (8/16-fold).
- **Output:** 1:1 SVG (layered rings for animation).

### MAN-02 / DIV-04 · Threshold mandala
- **Subject:** A radial mandala for section transitions, slightly more ornate than MAN-01.
- **Composition:** Centered radial.
- **Symmetry:** Radial.
- **Output:** 1:1 SVG, layered.

### MAN-03 · Portrait/avatar mandala frame
- **Subject:** A circular mandala frame to enclose a portrait, with a clear center aperture.
- **Composition:** Ring frame, empty center.
- **Symmetry:** Radial.
- **Color delta:** Provide 7 swara-tinted variants (gold line + one swara accent each).
- **Output:** 1:1 SVG ×7.

### BN-10 · Pambara (pleated fan) radial motif
- **Subject:** The accordion-pleated front fan of a Bharatanatyam costume abstracted into a gold radial pleat-burst.
- **Composition:** Half-radial fan or full radial.
- **Symmetry:** Radial pleats.
- **Output:** 1:1 SVG (spin-ready).

### BOR-01 · Bhairavi/temple border band
- **Subject:** A repeating South-Indian temple border pattern in gold line.
- **Composition:** Seamless horizontal band.
- **Symmetry:** Repeating.
- **Output:** wide-tile SVG; 2 weights.

### BOR-02 · Mango/paisley border
- **Subject:** A row of gold-line mango/paisley (mankolam) motifs.
- **Composition:** Seamless horizontal band.
- **Symmetry:** Repeating.
- **Output:** wide-tile SVG.

### BOR-05 / FTR-04 · Zari-thread gold hairline
- **Subject:** A single ultra-fine gold hairline rule, optionally with a tiny center diamond/bindu.
- **Composition:** Full-width thin line.
- **Symmetry:** Centered.
- **Output:** SVG (horizontal + vertical).

### BOR-06 · Corner flourish set
- **Subject:** Fine gold-line corner flourishes for frames/plaques.
- **Composition:** Corner-anchored.
- **Symmetry:** 4-corner rotatable.
- **Output:** SVG set.

### DIV-02 · Gold hairline + ornament divider
- **Subject:** A hairline rule centered on a small kolam/lotus ornament.
- **Composition:** Wide, centered ornament.
- **Symmetry:** Bilateral.
- **Output:** SVG; 3 variants.

### DIV-06 · Gopuram-tier separator
- **Subject:** A minimal gold-line stepped gopuram-tier motif used as a timeline step marker.
- **Composition:** Small centered emblem.
- **Symmetry:** Bilateral.
- **Output:** SVG.

### GLD-03 · Gold divider ornaments
- **Subject:** Ornamental gold separators (diamond, lotus-bud, kolam-knot) for section breaks.
- **Composition:** Centered small emblems.
- **Symmetry:** Bilateral.
- **Output:** SVG; 3 designs.

### GLD-05 · Underline stroke
- **Subject:** A single hand-drawn kolam-like gold underline stroke (for links/active nav).
- **Composition:** Short horizontal stroke, tapered ends.
- **Symmetry:** None (organic).
- **Output:** SVG (single path, draw-ready).

### GLD-06 · Kintsugi crack seams
- **Subject:** Fine gold-fracture seams that trace kolam-like paths across a surface.
- **Composition:** Branching cracks, sparse.
- **Symmetry:** Organic.
- **Output:** SVG/PNG; 2–3.

### GEO-01 · Phi / golden-ratio overlays
- **Subject:** Golden-ratio spiral + grid construction lines, fine gold.
- **Composition:** Full-frame scaffold.
- **Symmetry:** Logarithmic spiral.
- **Output:** SVG.

### GEO-02 · Yantra line sets
- **Subject:** Sacred-geometry yantra forms (interlocking triangles, circles, lotus rings) in fine gold line.
- **Composition:** Centered radial.
- **Symmetry:** Radial/bilateral.
- **Output:** SVG; 2–3.

### GEO-03 · Concentric circle systems
- **Subject:** Nested concentric gold rings with subtle tick divisions (wayfinding/data).
- **Composition:** Centered.
- **Symmetry:** Radial.
- **Output:** SVG.

### GEO-04 · Swara spectrum ring
- **Subject:** A circular arrangement of the seven swara glyphs (ICO-02) around a ring, each seat subtly tintable to its swara hue.
- **Composition:** Radial ring, 7 seats.
- **Symmetry:** 7-fold radial.
- **Color delta:** gold ring + 7 swara accents.
- **Output:** SVG (layered for active-state glow).

---

# BATCH 05 · FIGURATIVE LINE MOTIFS & SILHOUETTES

**Sub-style A (figurative line):** LINE-ORNAMENT MASTER BLOCK (gold monoline, transparent, flat, NEG-A).
**Sub-style B (silhouette):** solid near-black shape with a warm gold rim-light; transparent background; NEG-B; single warm rim key.

### BOR-03 · Yali guardian motif *(anchor, sub-style A)*
- **Subject:** A mythical yali (temple guardian creature) abstracted to a single elegant gold calligraphic line, minimal, not busy.
- **Composition:** Profile emblem; mirrored pair variant.
- **Symmetry:** Mirrorable.
- **Output:** SVG.

### BOR-04 · Hamsa/swan border
- **Subject:** A delicate gold-line hamsa (swan) motif, repeatable.
- **Composition:** Small emblem + seamless band.
- **Symmetry:** Repeating/mirror.
- **Output:** SVG.

### INS-04 · Veena yali-head ornament
- **Subject:** The carved yali-head curl of a veena isolated as a decorative gold-line curl.
- **Composition:** Corner/threshold flourish, 2 orientations.
- **Symmetry:** Mirrorable.
- **Output:** SVG.

### INS-02 · Veena hero gold-line illustration
- **Subject:** A full Saraswati veena rendered as an elegant, detailed gold calligraphic line-drawing — yali head, frets, gourd — hero quality, draw-on ready.
- **Composition:** Diagonal hero placement, generous negative space.
- **Symmetry:** None (naturalistic).
- **Output:** SVG single/few paths, 2048² master.

### BN-03 / FTR-02 · Anjali mudra emblem
- **Subject:** Two joined palms (namaste/anjali) in gold line, serene, calligraphic.
- **Composition:** Centered emblem.
- **Symmetry:** Bilateral.
- **Output:** SVG.

### FTR-01 · Footer blessing glyph
- **Subject:** A small closing emblem — a lotus-and-lamp or anjali-with-swara mark signalling "mangalam" (blessing/close).
- **Composition:** Centered, small, final-note feel.
- **Symmetry:** Bilateral.
- **Output:** SVG (glow-ready).

### BN-04 · Dancer silhouette — araimandi *(anchor, sub-style B)*
- **Subject:** A Bharatanatyam dancer in the araimandi (half-sitting) stance, full silhouette, costume fan and jewelry implied in the edge, warm gold rim-light.
- **Composition:** Centered/thirds, grounded triangular base, vast negative space.
- **Lighting:** Single warm rim from behind-side; interior near-black `#0E0B08`.
- **Materials:** Implied silk + jewelry in rim only.
- **Color Palette:** Black body, `#EBD08A` rim; optional jewel backdrop.
- **Texture:** Faint grain.
- **Background:** Transparent.
- **Symmetry:** Near-bilateral (dance pose).
- **Negative Prompt:** NEG-B + `visible face detail, flat gray silhouette, no rim light`
- **Output Notes:** 3840px PNG alpha.

### BN-05 · Dancer silhouette — tribhanga
- **Subject:** A dancer in the tribhanga three-bend S-curve pose, rim-lit silhouette.
- **Composition:** Elegant off-center S-curve.
- **(Lighting/etc.):** sub-style B.
- **Output:** 3840px PNG alpha.

### INS-05 · Veena silhouette
- **Subject:** A veena as a clean rim-lit silhouette for atmospheric backdrops.
- **Composition:** Diagonal, negative space.
- **(Lighting/etc.):** sub-style B.
- **Output:** PNG alpha.

### INS-12 · Tambura silhouette
- **Subject:** A slender tambura rim-lit silhouette (foundation/drone motif).
- **Composition:** Vertical, quiet.
- **(Lighting/etc.):** sub-style B.
- **Output:** PNG alpha.

### INS-17 · Concert ensemble silhouette
- **Subject:** A seated Carnatic ensemble as warm rim-lit silhouettes against a dim jewel-toned backdrop with haze.
- **Composition:** Horizontal group, one spotlight, cinematic.
- **Lighting:** Single warm spotlight, deep shadow, smoke.
- **Background:** Dim emerald/crimson silk wash (not transparent).
- **Symmetry:** Balanced group.
- **Negative Prompt:** NEG-B.
- **Output:** 3840px WEBP.

### ARC-01 · Gopuram silhouette
- **Subject:** A South-Indian gopuram tower as a tiered rim-lit silhouette against warm dusk-to-black.
- **Composition:** Vertical, low angle, negative sky.
- **Lighting:** Warm underglow rim; deep shadow.
- **Background:** Transparent + dusk-gradient variant; 2 depths.
- **Symmetry:** Bilateral tiering.
- **Negative Prompt:** NEG-B.
- **Output:** 3840px PNG alpha.

---

# BATCH 06 · CEREMONIAL COLOR ORNAMENTS

**Batch shared:** radially symmetric, disciplined jewel palette + gold outline, festive-but-restrained (ONE jewel per piece, never rainbow), still "temple luxe" not "calendar art." Flat lighting for ornaments; centered/concentric; transparent bg (except backdrop). Negative = NEG-A + `garish, oversaturated, calendar-art, cluttered, rainbow`.

### RAN-01 · Ceremonial rangoli burst *(batch anchor)*
- **Subject:** A single radially symmetric rangoli — gold line structure filled with ONE controlled jewel color, luminous, ceremonial.
- **Composition:** Centered radial burst, bloom-ready (concentric rings for animation).
- **Lighting:** Flat, faint inner glow.
- **Materials:** Gold outline + jewel fill.
- **Color Palette:** Gold `#C9A24B` + one of: crimson `#9B1C2E` / emerald `#14604E` / indigo `#1C2A57`.
- **Texture:** Subtle.
- **Background:** Transparent (black shown).
- **Symmetry:** 8/16-fold radial.
- **Negative Prompt:** as batch.
- **Output:** 2048²; vectorize where possible.

### RAN-02 · Rangoli variations
- **Subject:** 2–3 alternate ceremonial rangoli designs, same discipline, different jewel per piece.
- **(All fields):** as anchor.
- **Output:** 2048² ×3.

### MAN-03-color · Swara-tinted portrait frames (7)
- **Subject:** The mandala portrait frame (MAN-03) in seven versions, each gold line + one swara jewel accent (Sa gold, Ri ochre `#C57B26`, Ga emerald, Ma teal `#0E5A63`, Pa crimson, Da plum `#5E2E52`, Ni indigo).
- **Composition:** Ring frame, empty center.
- **Symmetry:** Radial.
- **Output:** SVG ×7.

### MAN-04 · Ceiling mandala backdrop
- **Subject:** Looking up at a carved/painted temple ceiling with concentric mandala geometry, warm low grazing light.
- **Composition:** Centered radial, full-bleed, awe.
- **Lighting:** Soft warm grazing (mild key).
- **Materials:** Carved stone/paint + gold.
- **Color Palette:** Warm gold + one jewel wash on dark.
- **Texture:** Carved relief, grain.
- **Background:** Full-bleed (opaque).
- **Symmetry:** High radial.
- **Negative Prompt:** NEG-B + `flat, garish`
- **Output:** 3840² raster.

---

# BATCH 07 · LIT METAL HERO OBJECTS

**Batch shared:** photoreal aged temple brass/bronze (patina, micro-scratches, darkened crevices), jewelry-grade, single hero object per frame, museum-vitrine. Lighting: single warm key 2700–3200K upper-left 45° (Rembrandt) + strong warm rim, small speculars, deep shadow, faint bloom + haze. Composition: object centered/thirds, 60–70% black negative space, shallow DOF, subtle ground reflection. Background: Garbhagriha black, isolated for compositing (alpha). Symmetry: object-natural, centered. Negative = NEG-B. Output: 3840px PNG alpha.

### LGT-01 · Oil lamp (deepam) + flame *(batch anchor — the light source)*
- **Subject:** A brass temple oil lamp (kuthuvilakku) with a live warm flame, patinated metal, in darkness.
- **Composition:** Centered, tight, hero; flame the brightest point.
- **Lighting:** Lit by its own flame — warm bloom, gold reflections rippling on the metal, everything else falling to black.
- **Materials:** Aged brass + flame + faint smoke.
- **Color Palette:** Brass 3-stop, flame `#EBD08A`/`#D64027` core, black.
- **Texture:** Brass micro-scratch, patina, haze, grain.
- **Background:** Black, vignette.
- **Symmetry:** Near-bilateral.
- **Negative Prompt:** NEG-B + `electric bulb, candle wax, plastic`
- **Output Notes:** 3840px PNG alpha; also seeds LGT-04 loader + 3D.

### INS-02-render · Veena brass hero
- **Subject:** A Saraswati veena as lit aged brass/wood, yali head catching the key light, strings glinting.
- **Composition:** Diagonal hero, deep negative space, shallow DOF on the yali head.
- **(Lighting/materials/etc.):** batch shared.
- **Output:** 3840px PNG alpha.

### INS-08-render · Mridangam
- **Subject:** A mridangam barrel drum, warm-lit, leather + dark wood + brass rings, one hand-strike optional.
- **Composition:** Centered/thirds, shallow DOF.
- **(etc.):** batch shared.
- **Output:** 3840px PNG alpha.

### BN-09 · Temple jewelry pieces
- **Subject:** Individual temple-gold jewelry — nethichutti, jhumka earrings, oddiyanam waist belt — with rubies/emeralds, on dark silk.
- **Composition:** One piece per frame, jewel-vitrine, single specular per stone.
- **Materials:** Aged temple gold + gemstones + silk.
- **Color Palette:** Gold + kumkum ruby + emerald on black silk.
- **(etc.):** batch shared.
- **Output:** 3840px PNG alpha; 3–4 pieces.

### INS-14-render · Ghatam
- **Subject:** A clay ghatam pot, warm-lit, earthy matte terracotta with a subtle brass accent nearby.
- **Composition:** Centered, humble, warm.
- **Materials:** Terracotta clay.
- **Color Palette:** Terracotta warm brown + gold accent, black.
- **(etc.):** batch shared.
- **Output:** 3840px PNG alpha.

### BRD-04-in-batch · Logo on brass
*(See BRD-04 — generate within this batch's lighting for consistency.)*

---

# BATCH 08 · CINEMATIC ATMOSPHERE & BACKGROUNDS

**Batch shared:** cinematic chiaroscuro environments, deep stage darkness, volumetric warm light + incense haze, dust motes, film grain, uncluttered, letterbox. Lighting: single dominant warm source (in-frame or implied), god-rays through haze, deep falloff to warm black, gentle vignette. Composition: 2.39:1, foreground/mid/background depth separation, subject off-center, vast negative darkness, layer-separable. Background: full-bleed (opaque); parallax layers exported per-plane with alpha. Symmetry: asymmetric cinematic (except doorway). Negative = NEG-B. Output: 3840×2160 (+ 2160×3840 mobile).

### ARC-05 · Sanctum doorway + glow *(batch anchor)*
- **Subject:** Looking through a carved stone temple doorway (arch) into darkness where a single oil lamp glows warm-gold; frame in sharp relief, interior mysterious.
- **Composition:** Centered doorway, deep perspective, warm glow at end.
- **Lighting:** Warm glow from within, deep falloff, haze.
- **Materials:** Carved stone + distant flame.
- **Color Palette:** Black + warm gold glow.
- **Texture:** Stone relief, haze, grain.
- **Background:** Full-bleed.
- **Symmetry:** Bilateral (doorway).
- **Negative Prompt:** NEG-B.
- **Output:** 3840×2160.

### LGT-02 · Volumetric light shafts
- **Subject:** Warm god-rays cutting through incense smoke into a dark stone interior, dust suspended.
- **Composition:** Diagonal shafts, strong beams, deep shadow.
- **Symmetry:** Asymmetric.
- **Output:** 3840px; 2–3 angles; PNG alpha overlay variant.

### LGT-06 · Stage spotlight cone
- **Subject:** A single warm spotlight cone isolating an empty patch of dark stage, haze-lit.
- **Composition:** Central cone, black surround.
- **Symmetry:** Near-bilateral.
- **Output:** 2560px; alpha overlay variant.

### HRO-03 · Hero silk / light field
- **Subject:** A lush layered backdrop of deep jewel-toned Kanjeevaram silk catching warm light, with drifting gold dust and haze — abstract, no subject.
- **Composition:** Soft folds, off-center light pool, depth.
- **Materials:** Silk + zari + light.
- **Color Palette:** Emerald/crimson/indigo silk + gold, black.
- **Symmetry:** Asymmetric.
- **Output:** 4096px; 3 colorways (desktop + mobile).

### HRO-01 · Hero composition base
- **Subject:** The invocation scene base — a spotlit implied stage with a veena/lamp placement zone, silk backdrop, particles, deep black, room for the wordmark.
- **Composition:** 2.39:1, off-center focal, huge negative space top for type.
- **Symmetry:** Asymmetric.
- **Output:** 3840×2160 desktop + 2160×3840 mobile; layer-separated.

### ARC-02 · Gopuram tier backdrop
- **Subject:** A gopuram's stacked tiers receding into warm haze, cinematic, for the legacy timeline.
- **Composition:** Vertical tiers, atmospheric depth.
- **Symmetry:** Bilateral tiering.
- **Output:** 2160×3840.

### ARC-04 · Colonnade
- **Subject:** A receding row of carved temple pillars in a dark hall, one warm shaft crossing them.
- **Composition:** Perspective colonnade, deep shadow.
- **Symmetry:** Perspective-symmetric.
- **Output:** 3840×2160.

### LOT-04 · Lotus in low light
- **Subject:** A single lotus emerging from dark water, warm rim-light on petals, dew highlights, serene.
- **Composition:** Off-center bloom, negative dark water.
- **Symmetry:** Natural.
- **Output:** 3840px WEBP.

### SCR-02 · Parallax layer plates
- **Subject:** For key scenes, separate foreground (performer/instrument), mid (light/haze), background (silk/architecture) plates designed to move independently.
- **Composition:** Each plate isolated with alpha, aligned to one scene.
- **Symmetry:** Per scene.
- **Output:** 3840px PNG alpha per plane; per hero scene.

---

# BATCH 09 · PARTICLES & LIGHT SPRITES

**Batch shared:** single isolated particle/sprite, soft-edged, warm-glowing, "made of light/air," clean alpha. Lighting: self-luminous soft glow (overrides GSC key). Composition: one sprite centered on empty field + a few size/rotation variants per sheet. Background: transparent (mandatory). Symmetry: soft radial. Negative = NEG-C-particle. Output: 512²–1024² PNG atlas.

### PAR-02 · Gold dust mote *(batch anchor — sets glow)*
- **Subject:** A single soft warm-gold glowing dust mote with a gentle falloff halo.
- **Color Palette:** `#EBD08A`→`#C9A24B` soft.
- **Output:** 256²/512² atlas; density variants.

### LGT-03 · Bloom sprites
- **Subject:** Soft warm circular glow/bloom sprites for haloing lights and gold.
- **Output:** 1024² soft + tight variants.

### PAR-01 · Incense smoke
- **Subject:** A wisp of soft warm-grey incense smoke, translucent, drifting.
- **Output:** 1024² atlas.

### PAR-03 · Vibhuti ash
- **Subject:** A fine pale sacred-ash mote, softer/cooler than gold dust.
- **Output:** 256² atlas.

### PAR-05 · Ember / spark
- **Subject:** A small warm ember spark with a faint trailing glow (Thillana energy).
- **Color Palette:** `#EBD08A`/`#D64027`.
- **Output:** 256² atlas.

### PAR-04 · Jasmine petals
- **Subject:** A single delicate white jasmine petal, soft-lit, gently curled.
- **Composition:** Petal centered, rotation variants.
- **Color Palette:** Warm white + faint gold rim.
- **Output:** 512² atlas.

### LGT-07 · Lens flare
- **Subject:** A subtle warm anamorphic-soft flare kiss (very restrained).
- **Output:** 2048² PNG alpha; low-opacity use.

---

# BATCH 10 · ART-DIRECTED PHOTOGRAPHY *(capture briefs — camera, not AI; unified by one LUT)*

**Batch shared:** cinematic chiaroscuro capture, single warm key (Rembrandt) 2700–3200K + minimal cool fill, shallow DOF, truthful abhinaya/effort, no flash, no clutter; ONE master LUT on all. Composition: one soloist per frame, off-center, dark negative space, architectural framing. Negative (retouch/grade) = NEG-photo.

### PHO-07 · Master color LUT *(anchor — grade FIRST)*
- **Subject:** A reference grade built from one hero frame: warm shadows crushed to `#0E0B08`, protected highlights, gold mid-tones, rich-not-oversaturated jewel tones.
- **Output Notes:** Deliver .cube LUT + 2–3 treatment presets; apply to ALL images.

### PHO-03 · Office-bearer portraits
- **Subject:** Each office bearer, single warm key Rembrandt portrait, calm dignified expression, dark background, subtle rim on hair/jewelry.
- **Composition:** 4:5 head-and-shoulders, consistent eyeline/crop across all 13.
- **Output:** 1600×2000; uniform setup; cutout-mask variant for cards.

### PHO-04 · Alumni portraits
- **Subject:** Warmer, more intimate Padam-style portraits/crops of alumni.
- **Composition:** 4:5, closer, expressive.
- **Output:** 1600×2000; 9+.

### PHO-01 · Performance heroes
- **Subject:** Spotlit dancer/musician mid-performance, cinematic, motion where apt.
- **Composition:** 2.39:1 & 3:2, off-center, dark hall.
- **Output:** 3840px; 8–12 frames.

### PHO-02 · Detail / macro library
- **Subject:** Macro shots — mudras (hands), alta-red feet mid-step, ghungroo, temple jewelry, fingers on veena strings, kohl-lined eyes (abhinaya).
- **Composition:** Extreme close, shallow DOF, single catchlight.
- **Output:** 2560px; 15–20 shots.

### PHO-05 · Event archive re-grade
- **Subject:** Curated existing event photos re-graded to the master LUT for the gallery.
- **Output:** 2560px WEBP; per event.

### PHO-06 · Hero background film loop
- **Subject:** Ambient performance b-roll — silk in motion, slow spotlit gesture, drifting particles — seamless.
- **Output:** 3840×2160 WEBM/MP4, 6–8s loop.

---

# BATCH 11 · 3D MODELS *(model briefs — match Batch 07 exactly)*

**Batch shared:** web-optimized GLB (Draco), aged-brass/stone PBR matching Batch 07 renders (use them as texture/lighting reference), single warm key + warm rim baked, warm low-key HDRI IBL, isolated hero on black, each ships a 3840px baked static PNG fallback. Negative (concept renders) = NEG-B.

- **LGT-01-3D · Oil lamp** *(anchor — validates pipeline):* brass kuthuvilakku with animatable flame; ≤80k tris; 2K KTX2.
- **INS-03 · Veena:** full Saraswati veena, yali head, playable-looking strings; ≤150k tris; 2K.
- **INS-10 · Mridangam:** barrel drum, twin faces, brass rings; ≤120k tris; 2K.
- **ARC-07 · Gopuram:** tiered temple tower for deep-scroll environment; modular tiers; ≤150k tris; 2K.
- **BN-07 · Dancer:** stylised Bharatanatyam figure in araimandi; ≤150k tris; 2K; optional simple pose morphs.
- **HRO-04 · Hero scene:** assembly of veena + lamp + particles in a lit black stage, parallax-ready; baked fallback PNG mandatory.

---

# BATCHES 12–13 · DERIVED / ASSEMBLED *(not image-generated)*

These produce **no new imagery** — they animate or assemble the approved masters above, so they have build specs (in `GENERATION_PIPELINE.md`), not generation prompts:

- **Batch 12 (Motion & Sound):** Lottie/video/audio built from the static masters (kolam self-draw from KOL-02, kindling from MAN-01+LGT-01, silk wipes from TEX-02, pulse-rings from INS-08, tambura drone audio, etc.). Follow bible §13 easing; no new art generated.
- **Batch 13 (Interface & Components):** buttons, cards, forms, modal, cursor, scroll UI, timeline — assembled in code/Figma from the Batch 03/04 vectors, Batch 02 textures, and Batch 10 photography.

**The one exception worth a prompt** — the 404 "lost note" scene (`SYS-05`), which is illustrative:

### SYS-05 · 404 "Lost Note" scene
- **Subject:** A single dim, unlit brass oil lamp in a vast dark hall with one faint drifting gold mote — quiet, poetic, "a note that lost its way."
- **Composition:** Tiny lamp lower-third, immense negative darkness above for the 404 message.
- **Lighting:** Very low warm ambient, near-extinguished.
- **Materials:** Aged brass, faint haze.
- **Color Palette:** Black + faint gold.
- **Texture:** Grain, haze.
- **Background:** Garbhagriha black, full-bleed.
- **Symmetry:** Asymmetric.
- **Negative Prompt:** NEG-B + `bright, cheerful, busy`
- **Output Notes:** 2560px; pair with a kolam that trails off unfinished.

---

## FINAL RUN DISCIPLINE (repeat on every generation)
1. Expand `{{GSC}}` at the front — always.
2. Pin the Batch-00 board + the batch anchor as image references.
3. Generate the batch **anchor first**; approve; then run siblings on the same seed.
4. Never mix treatment families (A/B/C) in one call.
5. Vectorize all line-art; keep textures seamless; keep particles/sprites on clean alpha.
6. Run every output through the 5-point Acceptance Test (checklist §Acceptance) before it enters the library.

*Saptham — where the seven notes become light.*
*Asset Generation Prompts v1.0 · Fourth companion to the Design Bible.*

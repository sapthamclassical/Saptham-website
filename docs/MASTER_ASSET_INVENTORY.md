# SAPTHAM — MASTER ASSET INVENTORY
### The definitive pre-production asset register · v1.0
**The single authoritative list of EVERY visual asset the website requires. Built on `DESIGN_BIBLE.md` and harmonized with `ASSET_PRODUCTION_CHECKLIST.md`, `GENERATION_PIPELINE.md`, `GENERATION_PROMPTS.md`, `PROMPT_LIBRARY.md`.**

> Purpose: nothing enters production that is not registered here. This inventory is the checklist Production, 3D, and Web all work from. IDs are category-prefixed and match the prompt library where an asset already has a prompt.

> **⚠ CANONICAL NOTICE (added post-audit).** This inventory's **IDs are canonical** for the whole project (per `PRODUCTION_AUDIT.md` §2.1). Where any other doc uses a different ID for the same asset, this one wins — see the crosswalk in `CANON.md`. **`CANON.md` is the top authority**: it carries the resolved decisions, design tokens (swara hues + gold gradient), the newly-registered sections/assets (Workshops, Competitions, Sponsors, Join-via-WhatsApp, the hidden Admin panel + Events Calendar, 404, map frame, and other system assets), and the dedupe resolutions. **When any document conflicts with `CANON.md`, `CANON.md` wins.** Canonical count after audit fixes: **≈ 235 line items ≈ 530 files**.

---

## HOW TO READ THIS FILE

Each of the 15 required fields is captured, but to stay readable at scale, **six fields that are usually uniform within a category are declared once as “Category Defaults”** and only appear in a row’s **Overrides** cell when that asset differs. The six defaulted fields are:

`Type (2D/SVG/3D/Video) · Transparent Bg · Resolution · Can→3D · Animation Potential · Reusability`

The per-row table always shows the eight fields that vary most: **ID · Asset Name · Description · Purpose · Section(s) · Priority · Static/Animated · Overrides.**

### Legend / codes
- **Priority:** `C` Critical · `H` High · `M` Medium · `L` Low
- **Static/Animated (S/A):** `S` static · `A` animated · `S+A` static master + animated variant
- **Type:** `SVG` · `2D` (raster PNG/WEBP) · `3D` (GLB) · `VID` (WEBM/MP4)
- **Transparent Bg:** `Y` · `N` · `~` (variant-dependent)
- **Can→3D:** `Y` yes · `~` partial/hybrid · `N` flat only
- **Animation Potential:** `Hi` · `Med` · `Lo`
- **Reusability:** `Global` (many pages) · `Multi` (several sections) · `Single` (one use)

### Section shorthand (Margam movements from the bible)
`HERO`(Pushpanjali) · `INTRO`(Alarippu) · `VISION`(Jatiswaram) · `LEGACY`(Shabdam) · `OB` · `EVENTS`(Varnam) · `GALLERY` · `ALUMNI`(Padam) · `JOIN`(Thillana) · `CONTACT` · `FOOTER`(Mangalam) · `GLOBAL`

### Global file-naming convention
`sap_[cat]_[asset]_[variant]_[state]@[res].[ext]` — lowercase, per-category `[cat]` token given in each section.

---

# 0 · BRAND & IDENTITY MARKS
**Naming:** `sap_brand_[asset]_[variant].[ext]`
**Category defaults:** SVG · Transparent Y · vector (2048² raster masters) · Can→3D ~ · Anim Hi · Reuse Global

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| BRD-01 | Primary Monogram | Abstract veena-curve + 7-note sapta-swara mark | Core brand emblem | GLOBAL | C | S | — |
| BRD-02 | Wordmark (Latin) | "SAPTHAM" high-contrast display serif, gold | Primary logotype | GLOBAL | C | S | — |
| BRD-03 | Wordmark (Tamil) | "சப்தம்" Noto Serif Tamil, equal dignity | Bilingual identity | GLOBAL | C | S | — |
| BRD-04 | Bilingual Lockup | Latin + Tamil + hairline stack | Formal lockup | HERO,FOOTER | H | S | — |
| BRD-05 | Reversed / Mono Set | Light-bg + 1-color fallbacks | Light sections/print | GLOBAL | C | S | Bg ~ |
| BRD-06 | Logo on Brass (lit) | Monogram embossed in lit brass plate | Prestige hero mark | HERO,FOOTER | H | S | 2D · 2K · Can→3D Y · Anim Lo |
| BRD-07 | Logo Bloom | Animated gold self-draw/bloom reveal | Loader/intro | GLOBAL | H | A | Lottie |
| BRD-08 | Favicon / Touch Set | Simplified mark 16→512 + maskable | Browser/PWA | GLOBAL | C | S | 2D+SVG |
| BRD-09 | OG / Share Card Template | Wordmark + hero image link-preview | Social/SEO | GLOBAL | C | S | 2D · 1200×630 · Bg N · Reuse Multi |

---

# 1 · HERO ASSETS
**Naming:** `sap_hero_[asset]_[variant]@[res].[ext]`
**Category defaults:** 2D layered · Transparent ~ · 3840×2160 (+2160×3840 mobile) · Can→3D Y · Anim Hi · Reuse Single(HERO)

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| HERO-01 | Hero Master Composition (Desktop) | Full invocation scene, spotlit stage | The arrival moment | HERO | C | S+A | — |
| HERO-02 | Hero Master Composition (Mobile) | Reframed vertical invocation | Mobile hero | HERO | C | S+A | 2160×3840 |
| HERO-03 | Hero Silk/Light Field | Layered jewel-silk backdrop, 3 colorways | Backdrop depth | HERO | C | S+A | Reuse Multi |
| HERO-04 | Hero Foreground Plate | Rim-lit dancer/veena foreground layer | Parallax FG | HERO | H | S | Bg Y |
| HERO-05 | Hero 3D Stage Scene | Veena+lamp+particles interactive scene | WebGL centrepiece | HERO | L | S+A | 3D · +PNG fallback |
| HERO-06 | Hero Wordmark Reveal | Gold wordmark bloom on load | Name entrance | HERO | C | A | SVG/Lottie |
| HERO-07 | Hero Scroll Cue | Breathing "begin" indicator | Invite scroll | HERO | C | A | SVG · Reuse Global |
| HERO-08 | Hero Particle Layer | Gold-dust + haze layer | Atmosphere | HERO | H | A | Bg Y |
| HERO-09 | Hero God-Ray Overlay | Volumetric warm shafts | Sacred light | HERO | H | S+A | Bg Y · Reuse Multi |
| HERO-10 | Hero Vignette | Warm focus-pull overlay | Framing | HERO | H | S | Bg Y · Reuse Global |
| HERO-11 | Hero Film Loop | Ambient performance b-roll 6–8s | Living backdrop | HERO | H | A | VID |
| HERO-12 | Hero Parallax Layer Set | FG/MG/BG separated planes | Scroll depth | HERO | H | S | Bg Y |

---

# 2 · MUSICAL INSTRUMENTS
**Naming:** `sap_ins_[instrument]_[form]@[res].[ext]` (form = icon/line/render/silhouette)
**Category defaults:** SVG · Transparent Y · vector · Can→3D Y · Anim Med · Reuse Multi

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| INS-01 | Instrument Icon Set (7) | Veena/violin/flute/mridangam/nadaswaram/ghatam/kanjira line icons | Music wayfinding | GLOBAL,VISION,EVENTS | C | S | Reuse Global |
| INS-02 | Veena Hero Line Illustration | Detailed gold calligraphic veena | Signature emblem | HERO,VISION | H | S+A | Anim Hi |
| INS-03 | Veena Yali-Head Ornament | Isolated carved-scroll curl | Recurring flourish | GLOBAL | H | S | — |
| INS-04 | Veena Brass Render | Lit aged-brass veena, vitrine | Cinematic hero | HERO,EVENTS | H | S | 2D · 4K · Bg Y · Anim Lo |
| INS-05 | Mridangam Render | Lit barrel drum | Rhythm hero | EVENTS | H | S | 2D · 4K · Bg Y · Anim Lo |
| INS-06 | Ghatam Render | Warm-lit clay pot | Earthy accent | EVENTS | M | S | 2D · 4K · Bg Y |
| INS-07 | Temple Jewelry Renders (4) | Nethichutti/jhumka/oddiyanam/maatal in lit gold | Gold detail | OB,ALUMNI | M | S | 2D · 4K · Bg Y |
| INS-08 | Veena Silhouette | Rim-lit veena shape | Backdrop | EVENTS,GALLERY | M | S | 2D · 4K |
| INS-09 | Tambura Silhouette | Slender rim-lit drone body | Foundation motif | LEGACY,FOOTER | M | S | 2D · 4K |
| INS-10 | Ensemble Silhouette | Seated group, spotlit | Cinematic backdrop | EVENTS,GALLERY | M | S | 2D · 4K · Bg N |
| INS-11 | Tambura Drone Waveform | Ambient oscillating line | The site's sruti hum | GLOBAL | H | A | Anim Hi · Can→3D N |
| INS-12 | Mridangam Pulse-Rings | Twin concentric beat rings | Tala-pulse system | GLOBAL | H | A | Anim Hi · Can→3D N |
| INS-13 | Instrument Sound-Forms (2) | Audio-reactive veena/tambura lines | Live sound viz | HERO,EVENTS | L | A | Can→3D N |

---

# 3 · BHARATANATYAM ASSETS
**Naming:** `sap_bn_[asset]_[variant]@[res].[ext]`
**Category defaults:** SVG · Transparent Y · vector · Can→3D ~ · Anim Med · Reuse Multi

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| BN-01 | Mudra Icon Set (9) | Pataka/Alapadma/Anjali/… gold hands | Human-motif icons | GLOBAL | C | S | Reuse Global |
| BN-02 | Alapadma Bloom Reveal | Lotus-hand opening animation | Signature reveal | GLOBAL,HERO | H | A | Lottie · Anim Hi |
| BN-03 | Anjali Emblem | Joined palms namaste mark | Greeting/sign-off | FOOTER,CONTACT,JOIN | H | S | — |
| BN-04 | Dancer Silhouette — Araimandi | Half-sitting rim-lit shape | Structural figure | HERO,EVENTS | H | S | 2D · 4K · Can→3D Y |
| BN-05 | Dancer Silhouette — Tribhanga | S-curve rim-lit shape | Flowing accent | VISION,GALLERY | M | S | 2D · 4K · Can→3D Y |
| BN-06 | Dancer Spin Motion Clip | Motion-blur skirt/pallu turn | Kinetic hero | HERO,EVENTS | H | A | VID · Bg ~ |
| BN-07 | Ghungroo Icon + Shimmer | Ankle-bell strand + sparks | Rhythm micro-motif | JOIN,EVENTS | M | S+A | Anim Hi |
| BN-08 | Pambara Radial Motif | Pleated costume-fan burst | Loader/ornament | GLOBAL | H | S+A | Anim Hi · Can→3D Y |
| BN-09 | Alta Feet + Kolam Plate | Top-down red feet on kolam | Detail atmosphere | GALLERY,LEGACY | M | S | 2D · 2560 · Bg ~ |
| BN-10 | Costume Fabric Detail | Kanjeevaram fan-pleat macro | Texture/backdrop | EVENTS,ALUMNI | M | S | 2D · 4K · Bg N |
| BN-11 | Abhinaya Eyes Interactive | Cursor-following expressive eyes | "Eyes lead" micro-int | HERO,GLOBAL | L | A | Can→3D N |

---

# 4 · TEMPLE ARCHITECTURE
**Naming:** `sap_arc_[asset]_[variant]@[res].[ext]`
**Category defaults:** 2D · Transparent ~ · 3840px · Can→3D Y · Anim Med · Reuse Multi

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| ARC-01 | Gopuram Silhouette | Tiered tower, rim-lit, dusk | Hero/legacy backdrop | HERO,LEGACY | H | S | Bg Y |
| ARC-02 | Gopuram Tier Timeline Graphic | Years mapped to temple tiers | Legacy timeline spine | LEGACY | H | S+A | SVG · Anim Hi |
| ARC-03 | Pointed Arch Frame (3 ratios) | Carved arch image frame | Museum-plate framing | EVENTS,ALUMNI,GALLERY | H | S | SVG · Bg Y |
| ARC-04 | Colonnade / Pillar Divider | Receding carved pillars | Grid/gallery rhythm | VISION,EVENTS | M | S | SVG+2D |
| ARC-05 | Sanctum Doorway + Glow | Arch into lamp-lit dark | Threshold atmosphere | HERO,thresholds | H | S+A | 2D · 4K · Bg N |
| ARC-06 | Bas-Relief Band | Carved stone relief tile | Section-break texture | dividers | M | S | 2D · 2K tile · Bg N |
| ARC-07 | Gopuram 3D Model | Modular tiered tower | Deep-scroll environment | HERO,LEGACY | L | S+A | 3D · +PNG fallback |
| ARC-08 | Single Carved Pillar | Isolated mandapam pillar | Framing device | GLOBAL | M | S | Bg Y |

---

# 5 · KOLAM PATTERNS
**Naming:** `sap_kolam_[asset]_[pattern].[ext]`
**Category defaults:** SVG · Transparent Y · vector · Can→3D Y (bevel) · Anim Hi · Reuse Global

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| KOL-01 | Pulli Dot-Grid | Kolam dot matrix | Underlying grid logic | GLOBAL | C | S | Anim Lo |
| KOL-02 | Self-Drawing Divider (3–5) | Continuous-line kolam bands | Signature divider | GLOBAL | C | A | — |
| KOL-03 | Kolam Loader | Self-drawing load animation | Brand loader | GLOBAL | H | A | Lottie |
| KOL-04 | Generative Kolam Transition | Seed-based threshold pattern | Section transitions | thresholds | H | A | JSON/Canvas |
| KOL-05 | Kolam Corner Ornaments | Quarter-motif flourishes | Card/frame corners | cards | M | S | Anim Lo |
| KOL-06 | Kolam Under-Feet Motif | Circular floor kolam | Dance/detail plate | GALLERY,LEGACY | M | S | Anim Lo |
| KOL-07 | Kolam Border Band | Repeating linear kolam | Ornamental band | dividers | M | S | Anim Lo |

---

# 6 · RANGOLI
**Naming:** `sap_rangoli_[asset]_[hue].[ext]`
**Category defaults:** SVG · Transparent Y · 2048² · Can→3D ~ · Anim Med · Reuse Multi

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| RAN-01 | Ceremonial Rangoli Burst | Radial gold+1-jewel bloom | Invocation focal | HERO,EVENTS | M | S+A | Anim Hi |
| RAN-02 | Rangoli Variations (3) | Alternate ceremonial designs | Festival accents | EVENTS,JOIN | L | S | — |
| RAN-03 | Festival Announcement Ornament | Rangoli-framed date badge | Event highlight | EVENTS | L | S | Reuse Single |

---

# 7 · MANDALAS
**Naming:** `sap_mandala_[asset]_[variant].[ext]`
**Category defaults:** SVG · Transparent Y · vector · Can→3D Y · Anim Hi · Reuse Global

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| MAN-01 | Kindling Load Mandala | Radiating concentric mandala | Loader reveal | GLOBAL | C | A | — |
| MAN-02 | Threshold Mandala | Radial section transition | Movement change | thresholds | H | A | — |
| MAN-03 | Portrait Mandala Frame (7) | Swara-tinted circular frames | OB/alumni framing | OB,ALUMNI | H | S | Anim Lo · Reuse Multi |
| MAN-04 | Ceiling Mandala Backdrop | Carved-ceiling look-up plate | Awe backdrop | LEGACY,ALUMNI | M | S | 2D · 4K · Bg N |

---

# 8 · LOTUS DESIGNS
**Naming:** `sap_lotus_[asset]_[variant].[ext]`
**Category defaults:** SVG · Transparent Y · vector · Can→3D Y · Anim Med · Reuse Multi

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| LOT-01 | Ashtadala Geometry | 8-petal golden-ratio lotus | Sacred-geometry core | VISION,GLOBAL | H | S | — |
| LOT-02 | Lotus Bloom Reveal | Petals-open animation | Reveal motif | VISION,HERO | H | A | Lottie · Anim Hi |
| LOT-03 | Lotus Icon | Simplified bloom mark | Vision wayfinding | VISION,nav | H | S | Anim Lo |
| LOT-04 | Lotus Low-Light Plate | Rim-lit lotus on dark water | Serene atmosphere | VISION,ALUMNI | M | S | 2D · 4K · Bg N |
| LOT-05 | Lotus 3D Model | Blooming lotus mesh | Interactive accent | VISION | L | S+A | 3D |

---

# 9 · DECORATIVE BORDERS
**Naming:** `sap_border_[asset]_[weight].[ext]`
**Category defaults:** SVG · Transparent Y · vector · Can→3D Y (trim) · Anim Lo · Reuse Global

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| BOR-01 | Bhairavi Temple Band | Repeating temple border | Ornamental band | dividers,EVENTS | H | S | — |
| BOR-02 | Mango/Paisley Band | Mankolam motif row | Editorial border | LEGACY,ALUMNI | M | S | — |
| BOR-03 | Yali Guardian Motif | Abstracted line guardian | Threshold flourish | thresholds | M | S | Can→3D Y |
| BOR-04 | Hamsa/Swan Border | Delicate swan motif | Border punctuation | ALUMNI,FOOTER | L | S | — |
| BOR-05 | Zari Gold Hairline | Ultra-fine rule + bindu | Universal separator | GLOBAL | C | S | — |
| BOR-06 | Corner Flourish Set | 4-corner frame ornaments | Frame/card corners | cards,plaques | M | S | — |
| BOR-07 | Creeper/Vine Border | Flowing floral vine line | Editorial accent | VISION,ALUMNI | L | S | — |

---

# 10 · SACRED GEOMETRY
**Naming:** `sap_geo_[asset].[ext]`
**Category defaults:** SVG · Transparent Y · vector · Can→3D ~ · Anim Med · Reuse Global

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| GEO-01 | Phi / Golden-Ratio Overlays | Spiral + grid scaffold | Composition system | GLOBAL | M | S | Anim Lo |
| GEO-02 | Yantra Line Sets (2–3) | Interlocking triangle/circle forms | Sacred focal marks | VISION,thresholds | M | S | — |
| GEO-03 | Concentric Circle Systems | Nested tick rings | Wayfinding/data | GLOBAL | M | S | — |
| GEO-04 | Swara Spectrum Ring | 7 swara glyphs on a ring | Nav/section-key wheel | GLOBAL | H | S+A | Anim Hi |
| GEO-05 | Sri-Yantra Focal | Central sacred-geometry emblem | Ceremonial focal | HERO,VISION | L | S | Anim Lo |

---

# 11 · GOLD ORNAMENTS
**Naming:** `sap_gld_[asset]_[variant].[ext]`
**Category defaults:** SVG · Transparent Y · vector · Can→3D Y · Anim Med · Reuse Global

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| GLD-01 | Gold-Leaf (Varak) Sheet | Cracked hammered leaf texture | Precious highlight fill | HERO,plaques | H | S | 2D · 2K · Bg Y · Can→3D N |
| GLD-02 | Gold Divider Ornaments (3) | Diamond/lotus-bud/knot | Section-break emblems | GLOBAL | H | S | — |
| GLD-03 | Gold Framing Corners | Precious frame corners | Prestige frames | ALUMNI,awards | M | S | — |
| GLD-04 | Gold Underline Stroke | Kolam-like link underline | Link/active state | GLOBAL | C | A | Anim Hi |
| GLD-05 | Kintsugi Crack Seams | Gold-fracture kolam paths | Precious accents | HERO,thresholds | L | S | Can→3D ~ |
| GLD-06 | Gold Medallion / Seal | Circular embossed emblem | Awards/prestige badge | ALUMNI,EVENTS | M | S | Can→3D Y |
| GLD-07 | Hanging Jhumar Ornament | Suspended lamp/tassel line | Vertical decor | HERO,FOOTER | L | S+A | Anim Hi |

---

# 12 · LIGHTING ELEMENTS
**Naming:** `sap_lgt_[asset]_[variant]@[res].[ext]`
**Category defaults:** 2D · Transparent Y · 2048–3840px · Can→3D ~ · Anim Med · Reuse Global

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| LGT-01 | Oil Lamp (Deepam) + Flame | Lit brass lamp, live flame | The light-source motif | HERO,FOOTER,loader | C | S+A | Can→3D Y |
| LGT-02 | Volumetric God-Rays | Warm shafts through haze | Sacred atmosphere | HERO,thresholds | H | S+A | Reuse Multi |
| LGT-03 | Bloom / Glow Sprites | Soft warm halos | Halo lights & gold | GLOBAL | C | S | Anim Lo |
| LGT-04 | Light-Kindling Sequence | Black→gold point→spread | Load reveal | GLOBAL | C | A | Lottie/VID |
| LGT-05 | Rim-Light Gradient Overlays | Warm edge separators | Subject/metal separation | GLOBAL | H | S | Anim Lo |
| LGT-06 | Stage Spotlight Cone | Warm haze-lit cone | Isolate the soloist | HERO,EVENTS | H | S+A | Reuse Multi |
| LGT-07 | Lens Flare | Restrained warm flare | Highlight kiss | HERO,EVENTS | L | S | Anim Lo |
| LGT-08 | Vignette Overlay | Warm focus-pull | Global framing | GLOBAL | C | S | Anim Lo |
| LGT-09 | Diya / Hanging Lamp Row | Row of small oil lamps | Warm decor band | HERO,FOOTER | M | S+A | Can→3D Y · Anim Hi |

---

# 13 · DUST & PARTICLE EFFECTS
**Naming:** `sap_particle_[asset]_atlas.png` (+ `sap_particle_config_[scene].json`)
**Category defaults:** 2D sprite · Transparent Y · 256²–1024² · Can→3D N · Anim Hi · Reuse Global

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| PAR-01 | Gold Dust Motes | Soft glowing gold specks | Ambient light field | GLOBAL | C | A | — |
| PAR-02 | Incense Smoke | Drifting translucent wisps | Sacred haze | HERO,thresholds | H | A | 1024² |
| PAR-03 | Vibhuti Ash | Pale cool drifting motes | Sacred-ash ambience | HERO,LEGACY | M | A | — |
| PAR-04 | Jasmine Petals | Falling white petals | Delicate accent | ALUMNI,JOIN | M | A | 512² |
| PAR-05 | Embers / Sparks | Warm trailing sparks | Thillana energy | JOIN | M | A | — |
| PAR-06 | Bokeh Light Orbs | Soft out-of-focus warm orbs | Depth/atmosphere | HERO,EVENTS | L | A | 1024² |
| PAR-07 | Particle Config Presets | Tuned emitter JSON per scene | System control | GLOBAL | C | — | JSON · S |

---

# 14 · BACKGROUND TEXTURES
**Naming:** `sap_tex_[material]_[hue]@[res].webp`
**Category defaults:** 2D tileable · Transparent N · 2048² (heroes 4096²) · Can→3D Y (PBR maps) · Anim Lo · Reuse Global

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| TEX-01 | Garbhagriha Black Gradient | Warm near-black base field | Default background | GLOBAL | C | S | Can→3D N |
| TEX-02 | Kanjeevaram Silk (3 hues) | Jewel silk + zari weave | Hero/feature backdrop | HERO,EVENTS | C | S+A | 4096² · Anim Med |
| TEX-03 | Honed Granite | Fine-speckle dark stone | Dark surfaces/footer | footers,panels | H | S | — |
| TEX-04 | Palm-Leaf (Ola) | Fibrous manuscript surface | Legacy/manuscript | LEGACY,ALUMNI | H | S | — |
| TEX-05 | Sandalwood Grain | Warm carved wood | Threshold/frame | thresholds | M | S | — |
| TEX-06 | Marble Veining | Cream + grey-gold veins | Prestige/light | awards,quotes | M | S | 4096² |
| TEX-07 | Film Grain / Haze Overlay | Warm analog grain | Global unifier | GLOBAL | C | S+A | Transparent Y |
| TEX-08 | Chandana Sand Paper | Sandal-paste paper | Light editorial base | light sections | M | S | — |
| TEX-09 | Brass Patina | Aged brass macro | Source of all UI gold | GLOBAL | C | S | — |
| TEX-10 | Temple Wall / Stucco | Weathered warm plaster | Aged environment | LEGACY | L | S | — |

---

# 15 · SECTION DIVIDERS
**Naming:** `sap_div_[asset]_[variant].[ext]`
**Category defaults:** SVG · Transparent Y · vector · Can→3D N · Anim Hi · Reuse Global

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| DIV-01 | Kolam Self-Draw Divider | Continuous-line band (=KOL-02) | Primary divider | GLOBAL | C | A | — |
| DIV-02 | Gold Hairline + Ornament | Quiet editorial separator | Section break | GLOBAL | C | S | Anim Lo |
| DIV-03 | Silk Transition Wipe | Lush fabric movement change | Movement threshold | thresholds | H | A | VID · Bg Y |
| DIV-04 | Mandala Threshold | Radial section change (=MAN-02) | Threshold | thresholds | H | A | — |
| DIV-05 | Page Transition | Curtain/light-wipe route change | Route transition | GLOBAL | C | A | VID/JSON · Bg Y |
| DIV-06 | Gopuram-Tier Separator | Stepped tier marker | Timeline steps | LEGACY | M | S | — |
| DIV-07 | Raga-Line Wave Divider | Flowing melodic-line separator | Musical divider | VISION,EVENTS | L | S+A | — |

---

# 16 · ICONS
**Naming:** `sap_icon_[name]_[state].svg`
**Category defaults:** SVG · Transparent Y · 24/32/48 · Can→3D ~ · Anim Med · Reuse Global

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| ICO-01 | UI System Icons (10) | menu/close/arrows/play/pause/expand/etc. | Interface controls | GLOBAL | C | S | Anim Lo |
| ICO-02 | Swara Glyph Set (7) | Sa–Ni abstract note glyphs | Section keys | GLOBAL | C | S+A | Anim Hi |
| ICO-03 | Social Icons (3) | IG/YT/FB brass-line + hover | Social links | FOOTER,CONTACT | C | S | — |
| ICO-04 | Contact Icons (3) | mail/phone/pin brass-line | Contact details | CONTACT,FOOTER | C | S | — |
| ICO-05 | Section/Wayfinding Icons (6) | home/vision/events/gallery/alumni/join | Nav wayfinding | GLOBAL | H | S | — |
| ICO-06 | Instrument Icons (=INS-01) | Cross-ref music set | Music wayfinding | VISION,EVENTS | C | S | — |
| ICO-07 | Mudra Icons (=BN-01) | Cross-ref dance set | Human-motif icons | GLOBAL | C | S | — |
| ICO-08 | OB Role Icons (6) | President/VP/dance/music/design/logistics | Role tagging | OB | M | S | Reuse Single |

---

# 17 · UI DECORATIVE ELEMENTS
**Naming:** `sap_ui_[element]_[state].[ext]`
**Category defaults:** SVG/CSS · Transparent Y · vector · Can→3D N · Anim Hi · Reuse Global

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| UID-01 | Primary Button (gold-ignite) | States: default/hover/active/disabled | Main CTAs | GLOBAL | C | S+A | — |
| UID-02 | Secondary / Ghost Button | Lower-emphasis states | Secondary actions | GLOBAL | C | S+A | — |
| UID-03 | Icon Button (circle brass) | Compact icon action states | Icon actions | GLOBAL | C | S+A | — |
| UID-04 | Nav Pill / Active State (7) | Swara-tinted current-page glow | Nav indicator | GLOBAL | C | S+A | — |
| UID-05 | Card Frame Ornament | Brass-line card border + corners | Content cards | EVENTS,OB,ALUMNI | H | S | — |
| UID-06 | Input Field (brass) | Form field states | Contact form | CONTACT | C | S+A | — |
| UID-07 | Tag / Chip | Category/date pill | Labels | EVENTS,GALLERY | M | S | — |
| UID-08 | Scroll Progress — Swara Ladder | Sa→Ni climb indicator | Scroll position | GLOBAL | H | A | — |
| UID-09 | Custom Cursor Light-Mote | Gold lamp-mote cursor | Interactive delight | GLOBAL | L | A | Can→3D N |
| UID-10 | Quote Plinth Ornament | Marble/gold quote pedestal | Testimonials | ALUMNI | M | S | — |
| UID-11 | Award / Seal Badge | Circular prestige badge | Awards/highlights | EVENTS,ALUMNI | M | S | Can→3D Y |
| UID-12 | Skeleton / Loading Shimmer | Reverent placeholder states | Loading UX | GLOBAL | H | A | — |
| UID-13 | Modal / Lightbox Chrome | Gallery full-view frame + controls | Image lightbox | GALLERY | C | S+A | — |
| UID-14 | Toast / Status Message | Success/error/info styling | System feedback | CONTACT,GLOBAL | H | S | — |

---

# 18 · FOOTER DECORATIONS (Mangalam)
**Naming:** `sap_ftr_[asset]_[variant].[ext]`
**Category defaults:** SVG · Transparent Y · vector · Can→3D ~ · Anim Med · Reuse Single(FOOTER)

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| FTR-01 | Blessing Glyph | Closing gold mark (lotus+lamp) | The final "note" | FOOTER | C | S+A | Anim Hi |
| FTR-02 | Anjali Sign-Off (=BN-03) | Namaste gratitude gesture | Gratitude | FOOTER | H | S | — |
| FTR-03 | Diya / Lamp Accent | Warm lamp with flame loop | Drone-to-silence resolve | FOOTER | H | S+A | Can→3D Y |
| FTR-04 | Footer Gold Divider (=BOR-05) | Top separator | Section top rule | FOOTER | C | S | — |
| FTR-05 | Footer Logo Lockup + Tamil | Bilingual brand sign-off | Brand close | FOOTER | C | S | — |
| FTR-06 | Ritardando Fade Overlay | Warm-to-black resolve | Final resolve | FOOTER | M | A | 2D/CSS · Bg Y |
| FTR-07 | Footer Kolam Band | Fine kolam strip | Decorative base | FOOTER | M | S | — |

---

# 19 · ALUMNI ASSETS (Padam)
**Naming:** `sap_alumni_[asset]_[name]@[res].[ext]`
**Category defaults:** mixed · Transparent ~ · per-item · Can→3D N · Anim Lo · Reuse Single(ALUMNI)

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| ALM-01 | Alumni Portraits (9+) | Warm intimate Padam-style photos | Testimonial faces | ALUMNI | C | S | 2D · 1600×2000 · Can→3D N |
| ALM-02 | Alumni Portrait Frame | Swara-tinted mandala frame (=MAN-03) | Portrait framing | ALUMNI | H | S | SVG |
| ALM-03 | Testimonial Quote Card | Marble/gold quote plinth ornament | Quote presentation | ALUMNI | H | S | SVG |
| ALM-04 | Parampara Lineage Thread | Continuous gold line linking eras | Continuity motif | ALUMNI,LEGACY | M | S+A | SVG · Anim Hi |
| ALM-05 | Batch-Year Badge | "'21–'22" mono seal | Cohort tagging | ALUMNI | M | S | SVG |
| ALM-06 | Alumni Carousel Controls | Prev/next + progress | Navigation | ALUMNI | H | S+A | SVG |

---

# 20 · OB (OFFICE BEARER) ASSETS
**Naming:** `sap_ob_[asset]_[name]@[res].[ext]`
**Category defaults:** mixed · Transparent ~ · per-item · Can→3D N · Anim Lo · Reuse Single(OB)

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| OB-01 | OB Portraits (13) | Uniform chiaroscuro board portraits | Board faces | OB | C | S | 2D · 1600×2000 |
| OB-02 | OB Portrait Frame | Swara-tinted mandala frame (=MAN-03) | Portrait framing | OB | H | S | SVG |
| OB-03 | OB Role Icon Set (=ICO-08) | 6 position icons | Role tagging | OB | M | S | SVG |
| OB-04 | OB Card Ornament | Brass-line card + name plate | Card styling | OB | H | S | SVG |
| OB-05 | OB Name Plate Lockup | Serif name + dept + role typographic | Identity block | OB | H | S | SVG |
| OB-06 | OB Carousel Controls | Prev/next + progress | Navigation | OB | H | S+A | SVG |

---

# 21 · EVENT ASSETS (Varnam)
**Naming:** `sap_evt_[asset]_[event]@[res].[ext]`
**Category defaults:** mixed · Transparent ~ · per-item · Can→3D ~ · Anim Med · Reuse Multi

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| EVT-01 | Production Hero Images (5) | Payanam/Vishwam/Rasaleela/Yaathra/Prema Vaibhavam | Signature productions | EVENTS,GALLERY | C | S | 2D · 3840px · Bg N |
| EVT-02 | Event Card Frame (arch) | Arch-framed event tile (=ARC-03) | Event listing | EVENTS | C | S | SVG |
| EVT-03 | Production Title Lockups (5) | Bilingual production wordmarks | Production identity | EVENTS | H | S | SVG · Bg Y |
| EVT-04 | Event Date / Tala Badge | Date in tala-styled seal | Date display | EVENTS | M | S | SVG |
| EVT-05 | Event Category Tag Chips | Production/general/workshop chips | Filtering/labels | EVENTS | M | S | SVG |
| EVT-06 | Timeline Milestone Marker | Gopuram-tier node (=DIV-06) | Legacy/event timeline | EVENTS,LEGACY | M | S+A | SVG |
| EVT-07 | General Event Thumbnails (6) | Techofes/Agni/Vizha/etc. graded photos | Other events grid | EVENTS | H | S | 2D · 2560px · Bg N |
| EVT-08 | Event Poster Template | Reusable production poster layout | Promo/print | EVENTS,SOC | L | S | 2D · print · Reuse Multi |

---

# 22 · SOCIAL MEDIA ASSETS
**Naming:** `sap_social_[platform]_[type]@[res].[ext]`
**Category defaults:** 2D · Transparent N · per-platform · Can→3D N · Anim Med · Reuse Multi

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| SOC-01 | Instagram Post Template | 1:1 branded layout | Feed posts | external | H | S | 1080² |
| SOC-02 | Instagram Story Template | 9:16 branded layout | Stories | external | H | S | 1080×1920 |
| SOC-03 | Event Announcement Template | Rangoli-framed date/title | Event promo | external | H | S | multi-ratio |
| SOC-04 | Quote / Testimonial Share | Alumni quote share card | Advocacy | external | M | S | 1080² |
| SOC-05 | Brand Avatar / PFP | Monogram profile picture | Profile identity | external | C | S | 1080² · Bg ~ |
| SOC-06 | Cover Banners (YT/FB) | Channel/page headers | Channel branding | external | M | S | per-platform |
| SOC-07 | OG / Link Preview (=BRD-09) | Route share cards | Link sharing | GLOBAL | C | S | 1200×630 |
| SOC-08 | Reel End-Card / Lower-Third | Motion outro + name strap | Video branding | external | L | A | VID/Lottie |
| SOC-09 | Countdown Template | "X days to Varnam" graphic | Event hype | external | L | S+A | multi-ratio |
| SOC-10 | Hashtag / Handle Lockup | @sapthamclassical gold lockup | Consistent tagging | external | M | S | SVG · Bg Y |

---

# 23 · PHOTOGRAPHY (Art-Directed Capture)
**Naming:** `sap_photo_[type]_[subject]@[res].webp` · **LUT:** `sap_photo_LUT_master.cube`
**Category defaults:** 2D capture · Transparent N · per-item · Can→3D N · Anim Lo · Reuse Multi
*Camera capture graded to one master LUT — not AI-generated. Portraits cross-referenced in OB/ALM.*

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| PHO-01 | Master Color LUT | Unified candlelit grade + presets | Consistency backbone | GLOBAL | C | — | .cube |
| PHO-02 | Performance Hero Stills (8–12) | Spotlit cinematic performance | Hero/feature imagery | HERO,EVENTS | C | S | 3840px |
| PHO-03 | Detail / Macro Library (15–20) | Mudras/feet/ghungroo/jewelry/strings/eyes | Connective tissue | GLOBAL | C | S | 2560px |
| PHO-04 | Event Archive Re-grade | Curated LUT-graded event photos | Gallery content | GALLERY,EVENTS | C | S | 2560px |
| PHO-05 | Hero Film Loop (=HERO-11) | Ambient b-roll loop | Living backdrop | HERO | H | A | VID |

---

# 24 · 3D MODELS
**Naming:** `sap_3d_[object].glb` (+ `sap_3d_[object]_fallback@4k.png`)
**Category defaults:** 3D GLB · Transparent Y · KTX2 ≤2K, ≤150k tris · Can→3D (is 3D) · Anim Hi · Reuse Multi
*Phase-4 ceiling; each ships a baked static PNG fallback. Authored in Blender from Batch-07 renders + library textures.*

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| D3-01 | Oil Lamp | Brass deepam + emission flame | Pipeline anchor / hero | HERO,FOOTER | L | S+A | ≤80k tris |
| D3-02 | Veena | Saraswati veena, playable look | Music centrepiece | HERO,EVENTS | L | S+A | — |
| D3-03 | Mridangam | Barrel drum, twin faces | Rhythm feature | EVENTS | L | S+A | ≤120k tris |
| D3-04 | Gopuram | Modular tiered tower | Deep-scroll environment | HERO,LEGACY | L | S+A | — |
| D3-05 | Dancer | Stylised araimandi figure | Interactive centrepiece | HERO | L | S+A | + pose morphs |
| D3-06 | Hero Scene | Veena+lamp+particles stage | WebGL hero assembly | HERO | L | S+A | +PNG fallback mandatory |

---

# 25 · MOTION & TRANSITION ASSETS (Derived)
**Naming:** `sap_motion_[name].[json/webm]` · **Audio:** `sap_audio_[name].[webm/mp3]`
**Category defaults:** Lottie/VID/Audio · Transparent ~ · vector/HD · Can→3D N · Anim (is animation) · Reuse Global
*Assembled from the static masters above; no new imagery generated.*

| ID | Asset Name | Description | Purpose | Section(s) | Pri | S/A | Overrides |
|---|---|---|---|---|---|---|---|
| MOT-01 | Loader (Kindling + Kolam) | Light ignites + kolam draws | Brand load | GLOBAL | C | A | — |
| MOT-02 | Page Transition | Curtain/light-wipe (=DIV-05) | Route change | GLOBAL | C | A | — |
| MOT-03 | Scroll-Linked Kolam Draw | Line draws on scroll | Divider reveal | GLOBAL | H | A | — |
| MOT-04 | Reveal Blooms | Alapadma/lotus/mandala opens | Content reveals | GLOBAL | H | A | — |
| MOT-05 | Tala-Pulse Ambient | Breathing glow/particle rhythm | Living ambience | GLOBAL | M | A | — |
| MOT-06 | Sound-Reactive Waveform | Live veena/tambura oscillation | Audio viz | HERO,EVENTS | L | A | — |
| MOT-07 | Tambura Drone (Audio) | Ambient sruti loop | The site's hum | GLOBAL | H | A | Audio |
| MOT-08 | Micro-Interaction Cues (Audio) | Plucked-string/ghungroo taps | Interaction feedback | GLOBAL | M | A | Audio |
| MOT-09 | Invocation Note (Audio) | Single struck note on load | Hero "Nada" | HERO | H | A | Audio |
| MOT-10 | Transition Stingers (Audio) | Subtle swells between movements | Section audio | thresholds | L | A | Audio |

---

# INVENTORY SUMMARY

## Line-item & discrete-file counts by category
Many line items are **sets** (e.g., "Mudra Icon Set (9)"). Below: **line items** (register rows) and **discrete files** (expanding set members, variants, portraits).

| Category | Line items | ~Discrete files |
|---|---|---|
| 0 · Brand & Identity | 9 | 14 |
| 1 · Hero | 12 | 16 |
| 2 · Musical Instruments | 13 | 26 |
| 3 · Bharatanatyam | 11 | 22 |
| 4 · Temple Architecture | 8 | 12 |
| 5 · Kolam | 7 | 13 |
| 6 · Rangoli | 3 | 6 |
| 7 · Mandalas | 4 | 11 |
| 8 · Lotus | 5 | 6 |
| 9 · Decorative Borders | 7 | 9 |
| 10 · Sacred Geometry | 5 | 7 |
| 11 · Gold Ornaments | 7 | 11 |
| 12 · Lighting | 9 | 13 |
| 13 · Dust & Particles | 7 | 12 |
| 14 · Background Textures | 10 | 15 |
| 15 · Section Dividers | 7 | 11 |
| 16 · Icons | 8 | 45 |
| 17 · UI Decorative | 14 | 30 |
| 18 · Footer | 7 | 8 |
| 19 · Alumni | 6 | 20 |
| 20 · OB | 6 | 26 |
| 21 · Event | 8 | 30 |
| 22 · Social Media | 10 | 16 |
| 23 · Photography | 5 | 45+ |
| 24 · 3D Models | 6 | 12 |
| 25 · Motion & Transition | 10 | 14 |
| **TOTAL** | **≈ 204 line items** | **≈ 490 discrete files** |

## Headline estimate
> **~204 registered asset line items**, expanding to **~480–500 discrete deliverable files** once icon sets, swara/portrait variants, board & alumni portraits, and the photography library are itemized. Budget/plan around **~500 files**.

## Priority distribution (line items)
| Priority | ~Count | Meaning |
|---|---|---|
| **Critical** | ~55 | MVP — site cannot launch without |
| **High** | ~70 | Delivers the premium experience |
| **Medium** | ~55 | Polish & richness |
| **Low** | ~25 | 3D / audio / advanced ceiling |

## Cross-reference guard (produce ONCE, reuse)
`=` entries above already flag shared assets. Key shared masters: **MAN-03** (portrait frame → OB-02, ALM-02); **BN-03** (anjali → FTR-02); **KOL-02** (kolam → DIV-01); **MAN-02** (→ DIV-04); **BOR-05** (hairline → FTR-04); **INS-01** (→ ICO-06); **BN-01** (→ ICO-07); **ARC-03** (arch → EVT-02); **BRD-09** (→ SOC-07); **HERO-11** (→ PHO-05).

## Longest-lead items (start now)
1. **Photography (§23, OB §20, ALM §19)** — needs a physical chiaroscuro shoot + the master LUT graded first. Critical *and* slow.
2. **Master Style Anchor Board** (STYLE-00 in the pipeline) — must be approved before ANY generation.
3. **3D shortlist (§24)** — long modeling lead; author 2D masters "3D-in-mind" now.

## Reusability note (why this scales)
Assets tagged **Global/Multi** (kolam, gold ornaments, particles, textures, icons, dividers, lighting) are authored once and carry the entire site — roughly **40% of line items are Global**, which is what keeps a ~500-file production tractable for a student team.

---

*Saptham — where the seven notes become light.*
*Master Asset Inventory v1.0 · The definitive pre-production register.*

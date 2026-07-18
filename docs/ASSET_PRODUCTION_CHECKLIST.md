# SAPTHAM — ASSET PRODUCTION CHECKLIST
### Production-Ready Asset Manifest · v1.0
**Companion to `DESIGN_BIBLE.md` — read that first. This document governs every asset that must be produced, sourced, or generated for the Saptham website.**

> Scope: this is the master manifest for a AAA / Awwwards-grade build. It lists ~190 assets across 24 production categories. Every asset here inherits the Global Moodboard Constraints and Design Keywords from the bible. Nothing is produced that violates the two non-negotiables: **(1) warm darkness + directed gold light, always; (2) restraint — when unsure, remove.**

---

## LEGEND (read once)

**Priority**
- **C — Critical** · site cannot launch without it (MVP / Phase 1)
- **H — High** · required for the intended premium experience (Phase 2)
- **M — Medium** · meaningful polish (Phase 3)
- **O — Optional** · aspirational / "wow" ceiling (Phase 4, budget-permitting)

**Mode** — S = Static · A = Animated · S+A = static master + animated variant
**Format** — SVG · PNG · WEBP · 3D (glTF/GLB) · MP4/WEBM · Lottie (vector JSON) · JSON (particle config) · AUDIO
**Bg** — Transparent background required? Y / N
**3D** — Can/should it become 3D? Y = yes, plan for it · ~ = partial / hybrid · N = flat only
**Variations** — required variants (counts, states, or "7" = one per swara)

**Website Section shorthand** (mapped to Margam movements in the bible §4)
`HERO`=Pushpanjali · `INTRO`=Alarippu · `VISION`=Jatiswaram · `LEGACY`=Shabdam timeline · `OB`=Office Bearers · `EVENTS`=Varnam · `GALLERY` · `ALUMNI`=Padam · `JOIN`=Thillana · `CONTACT` · `FOOTER`=Mangalam · `GLOBAL`=all pages (nav/loader/cursor/bg)

---

## GLOBAL PRODUCTION STANDARDS (apply to every asset)

| Standard | Spec |
|---|---|
| **Color profile** | sRGB; master art in Display-P3 where gold saturation matters, exported sRGB. Blacks anchor to Garbhagriha `#0E0B08` (never pure `#000`). |
| **Gold rule** | All "gold" assets carry a 3-stop gradient (Brass Umber `#8A6A25` → Saptham Gold `#C9A24B` → Deepam Gold `#EBD08A`) and must read as *lit metal*, never flat yellow. |
| **Vector-first** | Anything that can be SVG/Lottie must be — icons, kolam, borders, geometry, dividers. Raster only for photographic/textural/volumetric assets. |
| **Naming convention** | `sap_[category]_[asset]_[variant]_[state]@[res].[ext]` — e.g. `sap_kolam_divider_lotus_draw.json`, `sap_icon_mudra-alapadma_gold.svg`, `sap_hero_veena_3d.glb`. |
| **Export sizes (raster)** | Provide @1x/@2x/@3x; heroes at 3840px longest edge; textures 2048² (tileable) or 4096² for hero fabric. |
| **Video delivery** | Master ProRes 4444 (alpha where needed) → deliver WEBM (VP9/alpha) + MP4 (H.264) fallback; ≤ 8s loops; ≤ 3–4 MB target after compression. |
| **Lottie budget** | ≤ 200 KB per animation; no raster inside; test at 60fps. |
| **3D budget** | Web glTF/GLB, Draco-compressed; hero models ≤ 150k tris, KTX2 textures ≤ 2K; must include a baked "static beauty" PNG fallback. |
| **Motion timing** | All animated assets follow bible §13 easing ("veena-decay" ease-out, long tail); loops seamless; respect `prefers-reduced-motion` (ship a still frame). |
| **Accessibility** | Decorative assets get `aria-hidden`; meaningful icons ship with labels; transparent PNGs need matte-safe edges for dark bg. |
| **Consistency contract** | Every asset must look like it "came from the same brass workshop" — shared stroke weight (1.5px optical), same grid, same light angle (key from upper-left 45°). |

---

# THE MANIFEST

## 1 · MUSICAL INSTRUMENTS
*Bible §16 — reduce each instrument to a silhouette + a "sound-form" line. Never a cluttered band. The Tambura is conceptual (the drone), not an icon.*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| INS-01 | Veena — line icon | Carnatic-music wayfinding mark | C | S | SVG | vector | Y | GLOBAL, VISION, EVENTS | Y | icon + detailed |
| INS-02 | Veena — hero gold-line illustration | Signature melodic emblem, hero moment | H | S+A | SVG/Lottie | vector | Y | HERO, VISION | Y | draw-on anim |
| INS-03 | Veena — 3D model | Interactive/parallax hero centrepiece | O | S+A | 3D (GLB) | 2K tex | Y | HERO | — | + baked PNG |
| INS-04 | Veena yali-head ornament | Recurring decorative curl motif | H | S | SVG | vector | Y | GLOBAL dividers | Y | 2 orientations |
| INS-05 | Veena — silhouette | Atmospheric backdrop element | M | S | SVG/PNG | vector | Y | EVENTS, GALLERY | ~ | — |
| INS-06 | Violin (Carnatic) — line icon | "Strings/melody" marker | H | S | SVG | vector | Y | VISION, EVENTS | Y | — |
| INS-07 | Flute (Venu) — line icon + breath emitter | "Air/breath" motif; doubles as divider | H | S+A | SVG/Lottie | vector | Y | VISION, INTRO | Y | with/without particles |
| INS-08 | Mridangam — line icon | Rhythm emblem | C | S | SVG | vector | Y | GLOBAL, EVENTS | Y | icon + detailed |
| INS-09 | Mridangam — twin pulse-rings | Drives the tala-pulse motion system | H | A | Lottie | vector | Y | GLOBAL (ambient) | N | tempo variants |
| INS-10 | Mridangam — 3D model | Interactive rhythm feature | O | S+A | 3D (GLB) | 2K tex | Y | EVENTS | — | + baked PNG |
| INS-11 | Tambura — ambient drone waveform | The site's eternal sruti (background hum line) | H | A | Lottie/SVG | vector | Y | GLOBAL bg | N | amplitude states |
| INS-12 | Tambura — slender silhouette | Legacy/foundation accent | M | S | SVG | vector | Y | LEGACY, FOOTER | ~ | — |
| INS-13 | Nadaswaram — ceremonial burst icon | Grand events / arangetram / finale marker | M | S+A | SVG/Lottie | vector | Y | EVENTS, JOIN | Y | flare anim |
| INS-14 | Ghatam — clay-pot circle + terracotta tex | Earthy rhythm accent; humble counterpoint | M | S | SVG+PNG | vector/1K | Y | EVENTS | Y | — |
| INS-15 | Kanjira — frame-drum + jingle spark | Small-percussion "spark" accent | M | S+A | SVG/Lottie | vector | Y | EVENTS, JOIN | ~ | spark on/off |
| INS-16 | Audio-reactive waveform set | Live veena/tambura vibration where sound plays | O | A | JSON/Canvas | vector | Y | HERO, EVENTS | N | 2–3 instruments |
| INS-17 | Concert ensemble silhouette | Cinematic backdrop (rim-lit performers) | M | S | PNG/WEBP | 3840px | Y | EVENTS, GALLERY | ~ | — |

---

## 2 · BHARATANATYAM
*Bible §17 — gesture, geometry, emotion. Abstract and honor; never cartoon. Let real photography carry human truth.*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| BN-01 | Mudra icon set | Primary human-motif icon family | C | S | SVG | vector | Y | GLOBAL nav/icons | Y | 5–9 mudras |
| BN-02 | Alapadma bloom (reveal) | Signature "opening" reveal animation | H | A | Lottie | vector | Y | GLOBAL reveals, HERO | ~ | — |
| BN-03 | Anjali (namaste) mudra | Greeting / thank-you / footer sign-off | H | S | SVG | vector | Y | FOOTER, CONTACT, JOIN | Y | — |
| BN-04 | Dancer silhouette — araimandi | Grounded structural/backdrop motif | H | S | SVG/PNG | vector | Y | HERO, EVENTS | ~ | — |
| BN-05 | Dancer silhouette — tribhanga | Flowing S-curve accent | M | S | SVG/PNG | vector | Y | VISION, GALLERY | ~ | — |
| BN-06 | Dancer — spin/motion sequence | Motion-blur hero clip (skirt/pallu flare) | H | A | WEBM/MP4 | 3840px | ~ | HERO, EVENTS | ~ | 2 crops |
| BN-07 | Dancer — 3D model | Ambitious interactive centrepiece | O | S+A | 3D (GLB) | 2K tex | Y | HERO | — | + baked PNG |
| BN-08 | Ghungroo / salangai — icon + shimmer | Rhythm/sound micro-motif; Thillana quickening | M | S+A | SVG/Lottie | vector | Y | JOIN, EVENTS | Y | shimmer states |
| BN-09 | Temple jewelry pieces | Gold-detail assets (nethichutti, jhumka, oddiyanam) | M | S | SVG/PNG | vector/1K | Y | OB, ALUMNI frames | Y | 3–4 pieces |
| BN-10 | Pleated fan (pambara) radial motif | Loader + radial ornament (pleats = rhythm) | H | S+A | SVG/Lottie | vector | Y | GLOBAL loader, dividers | Y | + spin anim |
| BN-11 | Alta feet + kolam (top-down) | Detail/atmosphere plate | M | S | PNG/WEBP | 2560px | ~ | GALLERY, LEGACY | N | — |
| BN-12 | Abhinaya eyes — cursor-follow | Interactive "eyes lead" micro-interaction | O | A | JSON/Canvas | vector | Y | HERO/GLOBAL | N | — |

---

## 3 · TEMPLE ARCHITECTURE
*Bible §18 — structure & wayfinding. Gopuram tiering = vertical hierarchy; colonnade = grid; arch = image framing.*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| ARC-01 | Gopuram silhouette | Hero/legacy atmospheric backdrop | H | S | SVG/PNG | 3840px | Y | HERO, LEGACY | Y | 2 depths |
| ARC-02 | Gopuram tiered timeline graphic | Legacy years mapped to temple tiers | H | S+A | SVG | vector | Y | LEGACY | ~ | draw-on |
| ARC-03 | Pointed arch frame | Frames key imagery (museum-plate) | H | S | SVG | vector | Y | EVENTS, ALUMNI, GALLERY | Y | 2–3 aspect ratios |
| ARC-04 | Pillar / colonnade divider | Rhythmic column layout & separators | M | S | SVG/PNG | vector | Y | VISION, EVENTS | Y | — |
| ARC-05 | Sanctum doorway + glow | Threshold with warm garbhagriha glow | H | S+A | PNG/Video | 3840px | ~ | HERO, section thresholds | ~ | glow pulse |
| ARC-06 | Stone bas-relief band | Decorative relief at section breaks | M | S | PNG/WEBP | 2048² tile | Y | dividers | Y | 2 patterns |
| ARC-07 | Gopuram — 3D model | Deep-scroll/parallax hero environment | O | S+A | 3D (GLB) | 2K tex | Y | HERO, LEGACY | — | + baked PNG |

---

## 4 · KOLAM
*The #1 signature device (bible §18). The dot-grid is the site's underlying logic; dividers/loaders are self-drawing kolam.*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| KOL-01 | Pulli dot-grid background | Literal underlying grid matrix | C | S | SVG | vector/tile | Y | GLOBAL bg | N | density variants |
| KOL-02 | Self-drawing kolam divider | Signature section divider (draws on scroll) | C | A | Lottie/SVG | vector | Y | GLOBAL dividers | N | 3–5 patterns |
| KOL-03 | Kolam loader | Brand loading animation | H | A | Lottie | vector | Y | GLOBAL loader | N | — |
| KOL-04 | Generative kolam transition | Movement-to-movement threshold | H | A | JSON/Canvas | vector | Y | section transitions | N | seed-based |
| KOL-05 | Kolam corner ornaments | Card/frame corner flourishes | M | S | SVG | vector | Y | cards, frames | Y | 4 corners |
| KOL-06 | Kolam under-feet composition | Shared with BN-11 (dance detail) | M | S | SVG/PNG | vector | Y | GALLERY, LEGACY | N | — |

---

## 5 · RANGOLI
*Bible §18 — the one place controlled COLOR is permitted, used once as a jewel. Never wallpaper.*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| RAN-01 | Ceremonial rangoli burst | Invocation/festival focal ornament (bloom) | M | S+A | Lottie/SVG | vector | Y | HERO invocation, EVENTS | ~ | bloom anim |
| RAN-02 | Rangoli focal variations | Festival/announcement accents | O | S | SVG | vector | Y | EVENTS, JOIN | ~ | 2–3 designs |

---

## 6 · MANDALAS
*Bible §18 — concentric radial symmetry for loaders, thresholds, portrait frames, the "kindling" load.*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| MAN-01 | Kindling load mandala | Light radiates outward on load (bible §13) | C | A | Lottie | vector | Y | GLOBAL loader | N | — |
| MAN-02 | Threshold transition mandala | Section-to-section radial transition | H | A | Lottie/SVG | vector | Y | section thresholds | N | — |
| MAN-03 | Portrait/avatar mandala frame | Frames OB & alumni faces | H | S | SVG | vector | Y | OB, ALUMNI | Y | 7 (swara-tinted) |
| MAN-04 | Ceiling mandala backdrop | Awe-moment background (look-up ceiling) | M | S | PNG/WEBP | 3840px | ~ | LEGACY, ALUMNI | Y | — |

---

## 7 · LOTUS
*Bible §18 — ashtadala 8-petal, golden-ratio proportioned. The "vision" motif and reveal bloom.*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| LOT-01 | Ashtadala 8-petal geometry | Core sacred-geometry ornament (gold line) | H | S | SVG | vector | Y | VISION, GLOBAL | Y | — |
| LOT-02 | Lotus bloom reveal | Petals open (ties to Alapadma reveal) | H | A | Lottie | vector | Y | VISION, HERO | ~ | — |
| LOT-03 | Lotus icon | "Vision/objectives" wayfinding mark | H | S | SVG | vector | Y | VISION, nav | Y | — |
| LOT-04 | Lotus in low-light (photo/render) | Serene hero/section atmosphere plate | M | S | WEBP | 3840px | N | VISION, ALUMNI | ~ | — |

---

## 8 · DECORATIVE BORDERS
*Bible §18 — South Indian motifs as punctuation, not paragraphs. Fine gold line.*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| BOR-01 | Bhairavi/temple border pattern | Horizontal ornamental band | H | S | SVG | vector/tile | Y | dividers, EVENTS | Y | 2 weights |
| BOR-02 | Mango/paisley border | Editorial/manuscript border accent | M | S | SVG | vector/tile | Y | LEGACY, ALUMNI | Y | — |
| BOR-03 | Yali guardian line motif | Framing/threshold flourish | M | S | SVG | vector | Y | thresholds | Y | mirrored pair |
| BOR-04 | Hamsa/swan border | Delicate border punctuation | O | S | SVG | vector/tile | Y | ALUMNI, FOOTER | Y | — |
| BOR-05 | Zari-thread gold hairline | The universal fine gold rule/separator | C | S | SVG | vector | Y | GLOBAL | N | horizontal/vertical |
| BOR-06 | Corner flourish set | Frames & card corners | M | S | SVG | vector | Y | cards, plaques | Y | 4-corner set |

---

## 9 · SACRED GEOMETRY
*Bible §18 — geometry earns its place by doing a job (structure/wayfinding), not filling emptiness.*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| GEO-01 | Phi / golden-ratio overlays | Composition scaffolding + subtle ornament | M | S | SVG | vector | Y | GLOBAL layout | N | — |
| GEO-02 | Yantra-style line sets | Sacred geometric focal marks | M | S | SVG | vector | Y | VISION, thresholds | Y | 2–3 |
| GEO-03 | Concentric circle systems | Radial rhythm / data & wayfinding | M | S+A | SVG/Lottie | vector | Y | GLOBAL | N | — |
| GEO-04 | Swara spectrum ring | Seven-hue wayfinding wheel (Sa–Ni) | H | S+A | SVG/Lottie | vector | Y | GLOBAL nav | N | 7 states |

---

## 10 · LIGHTING ELEMENTS
*Bible §9 — the single oil-lamp chiaroscuro. Light is precious and directed. Warm 2700–3200K.*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| LGT-01 | Oil lamp (deepam) + flame | The light-source motif; "kindling" origin | C | S+A | SVG/Lottie/3D | vector | Y | HERO, FOOTER, loader | Y | static + flame + 3D |
| LGT-02 | Volumetric light shaft (god-rays) | Sacred atmosphere at thresholds | H | S+A | PNG/WEBM | 3840px | Y | HERO, thresholds | N | 2–3 angles |
| LGT-03 | Bloom / glow sprites | Warm halo around lights & gold | C | S | PNG | 1024² | Y | GLOBAL | N | soft/tight |
| LGT-04 | Light-kindling sequence | Load reveal (black→gold point→spread) | C | A | Lottie/Video | vector | Y | GLOBAL loader | N | — |
| LGT-05 | Rim-light gradient overlays | Separates subjects from black; metal sing | H | S | PNG | 2048px | Y | GLOBAL | N | L/R |
| LGT-06 | Stage spotlight cone | Isolates the "soloist" per view | H | S+A | PNG/WEBM | 2560px | Y | EVENTS, HERO | N | — |
| LGT-07 | Subtle warm lens flare | Occasional highlight kiss | O | S | PNG | 2048px | Y | HERO, EVENTS | N | — |
| LGT-08 | Vignette overlay | Global focus-pull to center | C | S | PNG | 3840px | Y | GLOBAL | N | strength variants |

---

## 11 · GOLD DECORATIVE PIECES
*Bible §8, §12 — gold-leaf/varak is the rarest material: one moment per page max. Its imperfection (cracks, torn edges) is the point.*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| GLD-01 | Gold-leaf (varak) texture | Precious highlight fill; kintsugi seams | H | S | PNG/WEBP | 2048² | Y | HERO, plaques | N | 3 sheets |
| GLD-02 | Brass patina surface | The source texture for all UI "gold" | C | S | PNG/WEBP | 2048² | N | GLOBAL | N | — |
| GLD-03 | Gold divider ornaments | Ornamental separators (with BOR-05) | H | S | SVG | vector | Y | GLOBAL dividers | Y | 3 designs |
| GLD-04 | Gold framing corners | Precious frames for prestige content | M | S | SVG | vector | Y | ALUMNI, awards | Y | 4-corner set |
| GLD-05 | Gold underline stroke | Self-drawing link/active underline | C | A | Lottie/SVG | vector | Y | GLOBAL links | N | — |
| GLD-06 | Kintsugi crack seams | Gold-fracture accents tracing kolam lines | O | S | SVG/PNG | vector | Y | thresholds, HERO | ~ | 2–3 |

---

## 12 · PARTICLES
*Bible §9 — LOW density. A few dozen, not a snowstorm. Must feel like air, not effects.*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| PAR-01 | Incense smoke drift | Sacred atmosphere haze | H | A | JSON+PNG | 512² sprite | Y | HERO, thresholds | N | — |
| PAR-02 | Gold dust motes | Ambient floating light specks | C | A | JSON+PNG | 256² sprite | Y | GLOBAL | N | density states |
| PAR-03 | Floating ash (vibhuti) | Slow drifting sacred-ash motes | M | A | JSON+PNG | 256² sprite | Y | HERO, LEGACY | N | — |
| PAR-04 | Jasmine petals falling | Occasional delicate petal fall | M | A | JSON+PNG | 512² sprite | Y | ALUMNI, JOIN | N | — |
| PAR-05 | Ember / spark burst | Thillana finale energy (with Alta accent) | M | A | JSON+PNG | 256² sprite | Y | JOIN | N | — |
| PAR-06 | Master particle configs | Tuned emitter presets (density/speed/wind) | C | — | JSON | — | — | GLOBAL | N | per-scene |

---

## 13 · BACKGROUND TEXTURES
*Bible §14 — felt, not shouted. One dominant texture per view. Global film grain unifies everything.*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| TEX-01 | Garbhagriha black base gradient | The default warm near-black field | C | S | WEBP/CSS | 2560px | N | GLOBAL bg | N | subtle variants |
| TEX-02 | Kanjeevaram silk weave + zari | Hero/feature fabric backdrop (sheen-animatable) | C | S+A | WEBP | 4096² | N | HERO, EVENTS | ~ | jewel tones ×3 |
| TEX-03 | Honed granite | Dark surface/footer texture | H | S | WEBP | 2048² tile | N | footers, panels | N | — |
| TEX-04 | Palm-leaf (ola) paper | Manuscript/legacy sections | H | S | WEBP | 2048² tile | N | LEGACY, ALUMNI | N | — |
| TEX-05 | Sandalwood grain | Warm threshold/frame texture | M | S | WEBP | 2048² tile | N | thresholds | N | — |
| TEX-06 | Marble veining | Prestige/light sections | M | S | WEBP | 4096² | N | awards, quotes | N | — |
| TEX-07 | Global film grain / haze | Unifies all views (analog warmth) | C | S+A | PNG/WEBM | 2048² tile | Y | GLOBAL overlay | N | grain/animated |
| TEX-08 | Chandana sand paper | Light "manuscript" section base | M | S | WEBP | 2048² tile | N | light sections | N | — |

---

## 14 · HERO ASSETS (Pushpanjali)
*Bible §4, §13 — the invocation. Awe on arrival. The most crafted moment on the site.*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| HRO-01 | Hero master composition | The full invocation scene (comp of layers) | C | S+A | layered | 3840px | N | HERO | ~ | desktop/mobile |
| HRO-02 | Saptham wordmark — gold reveal | Name blooms in gold on arrival | C | A | Lottie/SVG | vector | Y | HERO | Y | + Tamil lockup |
| HRO-03 | Hero silk/light background field | Lush layered backdrop (with TEX-02) | C | S+A | WEBP/WEBM | 4096px | N | HERO | ~ | — |
| HRO-04 | Hero 3D scene | Veena + lamp + particles, parallax depth | O | S+A | 3D (GLB) | 2K tex | Y | HERO | — | + baked PNG |
| HRO-05 | Scroll cue indicator | "Begin" prompt (subtle, breathing) | C | A | Lottie/SVG | vector | Y | HERO | N | — |
| HRO-06 | Hero mobile composition | Reframed vertical invocation | C | S+A | layered | 1290px | N | HERO | ~ | — |

---

## 15 · SECTION DIVIDERS
*Bible §5, §13 — space is silence; transitions are musical rests. No hard cuts.*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| DIV-01 | Self-drawing kolam divider | Primary divider (shared KOL-02) | C | A | Lottie | vector | Y | GLOBAL | N | 3–5 |
| DIV-02 | Gold hairline + ornament | Quiet editorial separator | C | S | SVG | vector | Y | GLOBAL | N | 3 |
| DIV-03 | Silk transition wipe | Lush movement change | H | A | WEBM | 2560px | Y | thresholds | N | jewel tones |
| DIV-04 | Mandala threshold | Radial section change (shared MAN-02) | H | A | Lottie | vector | Y | thresholds | N | — |
| DIV-05 | Page transition (curtain/light-wipe) | Route-to-route transition | C | A | WEBM/JSON | 2560px | Y | GLOBAL routes | N | 2 styles |
| DIV-06 | Gopuram-tier separator | Legacy timeline step marker | M | S | SVG | vector | Y | LEGACY | ~ | — |

---

## 16 · ICONS
*Bible §15 — brass line icons on a mandala/ashtadala grid, 1.5px optical weight, calligraphic terminals. Cultural metaphors, not generic clichés.*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| ICO-01 | Navigation icon set (mudra-based) | Primary nav wayfinding | C | S | SVG | 24/32/48 | Y | GLOBAL nav | Y | ~7 items |
| ICO-02 | Swara glyph set (Sa–Ni) | Section keys + wayfinding | C | S+A | SVG/Lottie | vector | Y | GLOBAL | N | 7 (+glow states) |
| ICO-03 | Social icons (IG/YT/FB) | Brass-line social links | C | S | SVG | 24/32 | Y | FOOTER, CONTACT | N | + hover state |
| ICO-04 | UI system icons | menu, close, arrows, play/pause, expand, external | C | S | SVG | 24 | Y | GLOBAL | N | ~10 icons |
| ICO-05 | Sound toggle icon | Ambient audio on/off (tambura drone) | H | S+A | SVG/Lottie | 24 | Y | GLOBAL | N | on/off/animated |
| ICO-06 | Contact/detail icons | mail, phone, location (brass-line, replace lucide) | C | S | SVG | 24 | Y | CONTACT, FOOTER | N | — |
| ICO-07 | Instrument icon set | Shared with §1 (INS-01/06/08/13…) | C | S | SVG | 32 | Y | VISION, EVENTS | Y | 8 |
| ICO-08 | Favicon / touch icons | Browser + PWA marks | C | S | SVG/PNG | 16→512 | ~ | GLOBAL | N | full set |

---

## 17 · BUTTONS
*Bible §13 — gold border "ignites" (fills with light L→R) on hover; underline draws like a kolam stroke.*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| BTN-01 | Primary CTA (gold-ignite) | Main actions (Join, Explore) — all states | C | S+A | SVG/CSS | vector | Y | GLOBAL | N | default/hover/active/disabled |
| BTN-02 | Secondary / ghost button | Lower-emphasis actions | C | S+A | SVG/CSS | vector | Y | GLOBAL | N | states |
| BTN-03 | Icon button (circle brass) | Compact icon actions | C | S+A | SVG/CSS | vector | Y | GLOBAL | N | states |
| BTN-04 | Nav pill / active state | Current-page indicator (swara glow) | C | S+A | SVG/CSS | vector | Y | GLOBAL nav | N | 7 swara tints |
| BTN-05 | Gallery/carousel controls | Prev/next/close (temple-arch styling) | H | S+A | SVG | vector | Y | GALLERY, EVENTS | N | states |
| BTN-06 | Sound/experience toggle | Enter-with-sound prompt (first visit) | H | S+A | SVG/CSS | vector | Y | GLOBAL | N | — |
| BTN-07 | Form submit + states | Contact form send (loading/success/error) | C | S+A | SVG/CSS | vector | Y | CONTACT | N | 4 states |

---

## 18 · SCROLL DECORATIONS
*Bible §13 — the visitor is the conductor; scroll = moving through the performance. Parallax = stage depth.*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| SCR-01 | Scroll progress — swara ladder | Progress shown as Sa→Ni tambura-string climb | H | A | SVG/Lottie | vector | Y | GLOBAL | N | 7 nodes |
| SCR-02 | Parallax depth layers | Fg/mg/bg staging plates per major scene | H | S | layered PNG | 3840px | Y | HERO, EVENTS, LEGACY | ~ | per scene |
| SCR-03 | Scroll-triggered kolam draw | Line draws as you scroll into view | H | A | Lottie/JSON | vector | Y | GLOBAL | N | — |
| SCR-04 | Floating swara section markers | Sticky key-signature indicator per movement | M | S+A | SVG | vector | Y | GLOBAL | N | 7 |
| SCR-05 | Scroll cue / down chevron | Gentle "continue" hint between movements | M | A | Lottie/SVG | vector | Y | GLOBAL | N | — |
| SCR-06 | Sticky nav condense state | Nav shrink/brass-bg on scroll | C | S+A | SVG/CSS | vector | Y | GLOBAL | N | — |

---

## 19 · FOOTER ELEMENTS (Mangalam — the Blessing)
*Bible §4 — the last emotion is resonance. Design the exit for the hum after the last note, not for "links."*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| FTR-01 | Footer blessing glyph / final gold mark | The closing "note" that lingers | C | S+A | SVG/Lottie | vector | Y | FOOTER | Y | — |
| FTR-02 | Anjali (namaste) sign-off | Gratitude gesture (shared BN-03) | H | S | SVG | vector | Y | FOOTER | Y | — |
| FTR-03 | Footer diya/lamp accent | Warm resolve; drone fades to silence | H | S+A | SVG/Lottie | vector | Y | FOOTER | Y | flame loop |
| FTR-04 | Footer gold divider | Top separator (shared BOR-05/GLD-03) | C | S | SVG | vector | Y | FOOTER | N | — |
| FTR-05 | Footer logo lockup + Tamil | Full bilingual brand sign-off | C | S | SVG | vector | Y | FOOTER | N | — |
| FTR-06 | Ritardando fade overlay | The final warm-to-black resolve | M | A | CSS/WEBM | 2560px | Y | FOOTER | N | — |

---

## 20 · BRAND & IDENTITY MARKS *(added — critical, implied by bible §2, §10, §19)*
*The logo system. Gold monogram on aged brass, bilingual, luxury-house restraint.*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| BRD-01 | Primary logo / monogram | Core brand mark (gold, lit) | C | S | SVG | vector | Y | GLOBAL | Y | — |
| BRD-02 | Wordmark — Latin | "SAPTHAM" in display serif, gold | C | S | SVG | vector | Y | GLOBAL | Y | — |
| BRD-03 | Wordmark — Tamil lockup | Tamil equal-dignity lockup (Noto Serif Tamil) | C | S | SVG | vector | Y | GLOBAL | Y | — |
| BRD-04 | Logo on brass (hero mark) | Embossed-on-metal prestige treatment | H | S | PNG/WEBP | 2048px | Y | HERO, FOOTER | ~ | — |
| BRD-05 | Logo — reversed / mono | On light/sand sections & fallbacks | C | S | SVG | vector | Y | light sections | N | light/dark/1-color |
| BRD-06 | Animated logo bloom | Signature reveal (shared HRO-02) | H | A | Lottie | vector | Y | HERO, loader | ~ | — |
| BRD-07 | OG / social share cards | Link-preview + share imagery (SEO) | C | S | PNG | 1200×630 | N | GLOBAL meta | N | per page |

---

## 21 · CURSOR & SYSTEM UI *(added — bible §13 micro-interactions)*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| SYS-01 | Custom cursor — gold light-mote | Visitor "carries a small lamp"; UI reacts | O | A | SVG/Canvas | vector | Y | GLOBAL desktop | N | default/hover/drag |
| SYS-02 | Loading/skeleton states | Reverent placeholders (not spinners) | H | S+A | SVG/CSS | vector | Y | GLOBAL | N | per component |
| SYS-03 | Modal / lightbox chrome | Gallery full-view frame + controls | C | S+A | SVG/CSS | vector | Y | GALLERY | N | — |
| SYS-04 | Toast / status messages | Form + system feedback styling | H | S | SVG/CSS | vector | Y | CONTACT, GLOBAL | N | success/error/info |
| SYS-05 | 404 / error scene | On-brand "lost note" page | M | S+A | SVG/Lottie | vector | Y | error routes | ~ | — |

---

## 22 · PHOTOGRAPHY & VIDEO *(art-directed capture — bible §11)*
*Not "generated" — shot or curated to the bible's chiaroscuro LUT. Listed because they are production assets that must be commissioned.*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| PHO-01 | Performance hero photography | Cinematic spotlit dancer/musician stills | C | S | WEBP | 3840px | N | HERO, EVENTS | ~ | 8–12 frames |
| PHO-02 | Detail/macro library | Mudras, feet, ghungroo, jewelry, strings, eyes | C | S | WEBP | 2560px | ~ | GLOBAL | N | 15–20 shots |
| PHO-03 | Office-bearer portraits | Consistent chiaroscuro board portraits | C | S | WEBP | 1600px | ~ | OB | N | 13+ (uniform) |
| PHO-04 | Alumni portraits/testimonials | Warm intimate Padam-style crops | C | S | WEBP | 1600px | ~ | ALUMNI | N | 9+ |
| PHO-05 | Event archive photography | Curated, re-graded gallery images | C | S | WEBP | 2560px | N | GALLERY, EVENTS | N | per event |
| PHO-06 | Hero background film loop | Ambient performance b-roll (silk/motion) | H | A | WEBM/MP4 | 3840px | N | HERO | N | 6–8s loop |
| PHO-07 | Master color LUT | The unified "candlelit hall" grade | C | — | LUT/CUBE | — | — | GLOBAL | N | — |
| PHO-08 | Duotone/treatment presets | Consistent gold-black image processing | H | — | preset | — | — | GLOBAL | N | 2–3 |

---

## 23 · AUDIO / SOUND DESIGN *(added — bible §13, §16: "motion is music")*
*The tambura is the site's literal drone. Opt-in, off by default; must respect autoplay policies.*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| AUD-01 | Tambura ambient drone bed | The eternal sruti under the whole experience | H | A | AUDIO (loop) | — | — | GLOBAL | N | seamless loop |
| AUD-02 | Micro-interaction cues | Plucked-string / ghungroo taps on hover/click | M | A | AUDIO | — | — | GLOBAL | N | 4–6 cues |
| AUD-03 | Movement transition stingers | Subtle swells between margam sections | O | A | AUDIO | — | — | thresholds | N | per movement |
| AUD-04 | Hero invocation cue | The single struck note on load ("Nada") | H | A | AUDIO | — | — | HERO/loader | N | — |

---

## 24 · TEMPLATED / SYSTEM COMPONENTS *(design-system art, not one-offs)*

| ID | Asset | Purpose | Pri | Mode | Format | Res | Bg | Sections | 3D | Variations |
|---|---|---|---|---|---|---|---|---|---|---|
| CMP-01 | Event card | Varnam event tiles (arch-framed) | C | S+A | design/SVG | vector | Y | EVENTS | N | states |
| CMP-02 | Office-bearer card | Portrait + mandala frame + swara tint | C | S+A | design/SVG | vector | Y | OB | N | 7 tints |
| CMP-03 | Testimonial/alumni card | Padam quote plinth (marble/gold) | C | S+A | design/SVG | vector | Y | ALUMNI | N | — |
| CMP-04 | Timeline node | Legacy gopuram-tier milestone | H | S+A | design/SVG | vector | Y | LEGACY | ~ | — |
| CMP-05 | Gallery tile + hover | Museum-plate image tile | C | S+A | design/SVG | vector | Y | GALLERY | N | states |
| CMP-06 | Form fields | Brass-line inputs (name/email/message) | C | S+A | design/SVG | vector | Y | CONTACT | N | states |
| CMP-07 | Map frame | Arch-framed Google Maps embed treatment | M | S | design/SVG | vector | Y | CONTACT | N | — |

---

# PRODUCTION SUMMARY

## Asset count by priority
| Priority | Count (approx) | Meaning |
|---|---|---|
| **Critical** | ~55 | Blocks launch — the MVP skeleton |
| **High** | ~65 | Delivers the premium/Awwwards experience |
| **Medium** | ~45 | Polish and richness |
| **Optional** | ~25 | The "wow ceiling" (3D, cursor, audio stingers) |
| **Total** | **~190 assets across 24 categories** | |

## Recommended production phasing
| Phase | Focus | Asset groups |
|---|---|---|
| **Phase 1 — The Skeleton (Critical only)** | Brand marks, core icon/swara system, kolam divider + dot-grid, black/silk/grain textures, buttons, hero composition (2D), loader, essential photography + LUT, form/gallery components | BRD, ICO-01/02/04/06/08, KOL-01/02, TEX-01/02/07, LGT-01/03/04/08, BTN, HRO-01/02/05, PHO-01/02/03/05/07, CMP |
| **Phase 2 — The Performance (High)** | Instrument line-art, mudra/dance motifs, temple architecture, mandalas/lotus, dividers & transitions, particles, scroll system, footer Mangalam, tambura drone | INS, BN, ARC, MAN, LOT, DIV, PAR, SCR, FTR, AUD-01/04 |
| **Phase 3 — The Ornament (Medium)** | Decorative borders, sacred geometry, extra textures, rangoli, extended lighting, system states, timeline richness | BOR, GEO, RAN, TEX-05/06/08, LGT-06/07, SYS, GLD-04/06 |
| **Phase 4 — The Ceiling (Optional)** | 3D instrument/dancer/gopuram models, custom cursor, audio-reactive waveforms, abhinaya cursor-follow, audio stingers | INS-03/10/16, BN-07/12, ARC-07, HRO-04, SYS-01, AUD-02/03 |

## The 3D shortlist (assets designed to become GLB from day one)
Model these in 3D only when Phase 4 is greenlit — but **author their 2D masters now with 3D in mind** (clean silhouettes, single light angle, separable layers): **Veena (INS-03), Mridangam (INS-10), Gopuram (ARC-07), Oil lamp (LGT-01), Dancer (BN-07), Hero scene (HRO-04).** Every one ships with a baked static PNG fallback so the site is never blocked on WebGL.

## Cross-reference guard (avoid duplicate production)
Several assets are shared across categories — produce **once**, reference everywhere:
- Kolam divider = `KOL-02` = `DIV-01`
- Anjali mudra = `BN-03` = `FTR-02`
- Instrument icons = `INS-01/06/08/13…` = `ICO-07`
- Mandala threshold = `MAN-02` = `DIV-04`
- Gold hairline = `BOR-05` = `FTR-04` = part of `GLD-03`
- Logo bloom = `HRO-02` = `BRD-06`
- Oil lamp = `LGT-01` = `FTR-03` origin = loader `LGT-04`

---

## THE ACCEPTANCE TEST (every asset must pass before it ships)
1. **Light law:** does it read as *lit warm metal / candlelit object*, or as flat digital color? (Flat = reject.)
2. **Restraint law:** could it be simpler and stronger with less? (If yes = revise.)
3. **Workshop law:** does it look like it came from the same brass workshop as its neighbors (weight, grid, light angle, gold gradient)?
4. **Movement law:** is it tagged to a Margam movement, its one swara accent, and the correct tempo?
5. **The feel test:** *candlelit recital in a museum — or college club flyer?* Only the former ships.

*Saptham — where the seven notes become light.*
*Asset Production Checklist v1.0 · Companion to the Design Bible.*

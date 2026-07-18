# SAPTHAM — ASSET PRODUCTION ROADMAP
### Batched generation plan, easiest → hardest · v1.0
**Derived from `MASTER_ASSET_INVENTORY.md`. Consistent with `GENERATION_PIPELINE.md` (technique families), `PROMPT_LIBRARY.md` (run-ready prompts), and the bible.**

> This roadmap sequences every registered asset into **15 batches arranged from easiest to hardest to produce**. Each batch is a single-sitting job with one visual language, so a generator (or artist) never context-switches mid-run. Difficulty rises as lighting, material fidelity, composition, and human/logistics load increase.

---

## HOW TO USE

- **Batch 00 (Style Anchor) is a prerequisite, not a difficulty tier** — it must be produced and approved before ANY other batch. It is the reference image pinned to every run.
- Batches **01 → 13** then run in rising difficulty; **14 (Motion/Audio)** is a final derived-assembly track.
- Every prompt still opens with `{{GSC}}` (see `PROMPT_LIBRARY.md`) and uses the shared NEG presets referenced below.
- **Golden rule (from the pipeline): never mix treatment families in one call.** The three families are `A` flat-line/vector, `B` lit/volumetric, `C` material/ambient. Each batch below is a single family (noted).
- **Difficulty** = ★ (trivial/deterministic) → ★★★★★ (highest craft/logistics/lead-time).

### Shared Negative-Prompt presets (referenced per batch)
- **NEG-A (flat line/vector):** `photorealism, 3D, shading, inner gradients, drop shadows, filled shapes, background color, uneven/double strokes, blur, cartoon, clip-art, cold colors, neon, rainbow, watermark, text, signature`
- **NEG-B (lit/volumetric):** `flat even lighting, cold blue/white light, neon, blown highlights, chrome/plastic, flat yellow gold, cluttered background, tourist saturation, harsh flash, deformed anatomy, extra fingers, low contrast, muddy shadows, watermark, text`
- **NEG-C-tex:** `seams, visible repeat, directional hotspot, any subject, focal point, text, watermark, uneven exposure, color-cast, plastic sheen, blur`
- **NEG-C-particle:** `hard edges, solid shape, background, frame, banding, neon, clustered particles, text, watermark`
- **NEG-photo:** `flash, cold white balance, clutter, plastic chairs, banners, oversaturation, heavy retouch, plastic skin, deformed hands, motion smear on face, low contrast, watermark`

### Reading order at a glance
| Order | Batch | Family | Difficulty | ~Images |
|---|---|---|---|---|
| 00 | Style Anchor Board | ref | ★ (gate) | 1 |
| 01 | Brand Marks & Icons | A | ★ | ~55 |
| 02 | Kolam · Borders · Geometry · Line-Ornaments | A | ★ | ~50 |
| 03 | Ceremonial Color Ornaments | A(color) | ★★ | ~13 |
| 04 | Material & Texture Library | C | ★★ | ~15 |
| 05 | Particles & Light Sprites | C | ★★ | ~12 |
| 06 | Silhouettes & Figurative Shapes | B | ★★★ | ~14 |
| 07 | Lit Metal Hero Objects | B | ★★★★ | ~13 |
| 08 | Cinematic Atmosphere & Backgrounds | B | ★★★★ | ~20 |
| 09 | Hero Composite Scenes | B | ★★★★ | ~8 |
| 10 | Art-Directed Photography (capture) | B(camera) | ★★★★★ | ~45+ |
| 11 | Social & Marketing Templates | assembly | ★★★ | ~16 |
| 12 | UI Components & Decorative | assembly | ★★★ | ~30 |
| 13 | 3D Models | 3D | ★★★★★ | ~12 |
| 14 | Motion & Audio (derived) | assembly | ★★★★ | ~14 |

---

# BATCH 00 · STYLE ANCHOR BOARD  *(prerequisite gate — ★)*
- **Assets Included:** STYLE-00 (contains swatches of GLD-02 brass, TEX-02 silk, TEX-01 black, LGT-01 lamp, INS-01 veena line, BRD-01 monogram).
- **Recommended Generation Order:** palette bar → black field → brass + silk swatches → oil lamp → veena line → monogram → assemble board.
- **Estimated Number of Images:** 1 (plus 2–3 tuning variants to pick from).
- **Shared Style Rules:** Establishes the entire look — 1.5px calligraphic line, gold-as-lit-metal, warm 45° key. Approve before proceeding.
- **Shared Lighting:** Dual — swatches flat-even; lamp lit by its own flame (demonstrates the key).
- **Shared Materials:** Brass, silk, flame.
- **Shared Composition:** 3×2 contact-sheet grid, generous black gutters.
- **Shared Color Palette:** Full core system (black `#0E0B08`, gold 3-stop, ivory `#F4EDE0`, kumkum `#9B1C2E`, one emerald `#14604E`).
- **Background Rules:** Garbhagriha black `#0E0B08`, full-bleed.
- **Negative Prompt Rules:** NEG-B + `mismatched styles, inconsistent gold tone, messy layout`.

---

# BATCH 01 · BRAND MARKS & ICONS  *(Family A · ★ easiest)*
- **Assets Included:** BRD-01,02,03,04,05,08; ICO-01 (UI 10), ICO-02 (swara 7), ICO-03 (social 3), ICO-04 (contact 3), ICO-05 (wayfinding 6), ICO-08 (OB roles 6), INS-01 (instrument icons 7), BN-01 (mudras 9), BN-07 (ghungroo), LOT-03 (lotus icon), GLD-04 (underline), HERO-07 (scroll cue), OB-03 (=ICO-08).
- **Recommended Generation Order:** one UI icon (locks stroke/terminal/box) → full UI set → swara glyphs → mudra set → instrument set → wayfinding + contact + social → OB role icons → brand monogram → wordmarks (Latin, Tamil, lockup) → favicon.
- **Estimated Number of Images:** ~55 (icon-heavy; many are set members).
- **Shared Style Rules:** Flat gold monoline, 1.5px optical stroke, calligraphic terminals, rounded joins, drawn on 24/32/48 ashtadala grid; vectorize all output. Wordmarks = set type (Fraunces/Canela + Noto Serif Tamil), not drawn.
- **Shared Lighting:** None — flat vector (overrides GSC key).
- **Shared Materials:** Single gold line/fill.
- **Shared Composition:** One glyph centered in a square keyline box, consistent padding, optical balance.
- **Shared Color Palette:** Saptham Gold `#C9A24B` on transparent; active state Alta `#D64027`.
- **Background Rules:** Transparent (mandatory).
- **Negative Prompt Rules:** NEG-A + (wordmarks) `distorted letters, fake serif, malformed Tamil glyphs`.

---

# BATCH 02 · KOLAM · BORDERS · GEOMETRY · LINE-ORNAMENTS  *(Family A · ★)*
- **Assets Included:** KOL-01,05,06,07; BOR-01..07; GEO-01,02,03,04,05; LOT-01 (ashtadala); MAN-01,02 (line mandala bases); BN-08 (pambara); GLD-02 (divider ornaments), GLD-05 (kintsugi); DIV-02 (hairline+ornament), DIV-06 (gopuram sep), DIV-07 (raga-line); BOR-05 (hairline); FTR-04,07 (footer line); INS-02 (veena hero line), INS-03 (yali ornament); BN-03 (anjali), FTR-01 (blessing glyph); EVT-03 (production title lockups), EVT-04 (tala date badge).
- **Recommended Generation Order:** kolam divider (anchor — continuous-line logic) → dot-grid → ashtadala → mandala bases → pambara → borders (bhairavi, paisley, hamsa, vine) → yali + veena hero line → anjali + blessing → hairline + gold divider ornaments → geometry (phi, yantra, concentric, swara ring) → footer line → production lockups + date badge → kintsugi.
- **Estimated Number of Images:** ~50.
- **Shared Style Rules:** Same as Batch 01 line spec — continuous unbroken kolam-line where possible (draw-on ready), symmetric where sacred, no fills.
- **Shared Lighting:** None — flat vector.
- **Shared Materials:** Gold line.
- **Shared Composition:** Radial/bilateral ornaments centered; dividers ultra-wide bands; borders seamless.
- **Shared Color Palette:** Saptham Gold `#C9A24B` line; optional single swara tint per instance.
- **Background Rules:** Transparent (mandatory).
- **Negative Prompt Rules:** NEG-A.

---

# BATCH 03 · CEREMONIAL COLOR ORNAMENTS  *(Family A-color · ★★)*
- **Assets Included:** RAN-01, RAN-02 (3), RAN-03; MAN-03 (7 swara portrait frames).
- **Recommended Generation Order:** ceremonial rangoli (anchor — jewel+gold discipline) → rangoli variations → announcement ornament → swara-tinted frame set (7).
- **Estimated Number of Images:** ~13.
- **Shared Style Rules:** Radially symmetric, gold outline + ONE jewel fill per piece, festive-but-restrained, temple-luxe not calendar-art. The only Family-A batch that leads with color — kept separate so saturation never contaminates the gold-line batches.
- **Shared Lighting:** Flat, faint inner glow.
- **Shared Materials:** Gold line + jewel fill.
- **Shared Color Palette:** Gold `#C9A24B` + one swara jewel: crimson `#9B1C2E` / emerald `#14604E` / indigo `#1C2A57` / ochre `#C57B26` / teal `#0E5A63` / plum `#5E2E52`.
- **Shared Composition:** Perfectly radial/concentric, centered.
- **Background Rules:** Transparent (black shown).
- **Negative Prompt Rules:** NEG-A + `rainbow, garish, oversaturated, calendar-art, cluttered`.

---

# BATCH 04 · MATERIAL & TEXTURE LIBRARY  *(Family C · ★★)*
- **Assets Included:** TEX-01..10; GLD-01 (gold leaf); ARC-06 (bas-relief tile).
- **Recommended Generation Order:** brass patina (anchor — the gold source) → silk (3 hues) → granite → palm-leaf → sandalwood → marble → sand → temple wall → gold-leaf → bas-relief → black gradient → film grain.
- **Estimated Number of Images:** ~15.
- **Shared Style Rules:** Photoreal material macro, seamless/tileable, warm and aged (never new/plastic), no subject, no focal point.
- **Shared Lighting:** **Flat, soft, even, diffuse — NO directional hotspot** (deliberate exception to chiaroscuro so textures tile). Bas-relief gets a mild raking key only.
- **Shared Materials:** Brass, silk+zari, granite, palm-leaf, sandalwood, marble, sand, gold-leaf, stone.
- **Shared Composition:** Full-bleed orthographic surface, edge-to-edge.
- **Shared Color Palette:** Each = its own warm-biased material color; blacks anchor `#0E0B08`.
- **Background Rules:** Opaque (the material fills the frame); film grain = transparent overlay.
- **Negative Prompt Rules:** NEG-C-tex.

---

# BATCH 05 · PARTICLES & LIGHT SPRITES  *(Family C · ★★)*
- **Assets Included:** PAR-01..06 (+ PAR-07 config JSON); LGT-03 (bloom), LGT-07 (flare); TEX-07 (grain, shared).
- **Recommended Generation Order:** gold dust mote (anchor — sets glow) → bloom sprites → incense smoke → vibhuti ash → embers → jasmine petals → bokeh orbs → flare.
- **Estimated Number of Images:** ~12 (sprite atlases).
- **Shared Style Rules:** Single isolated particle/sprite, soft-edged, warm-glowing, "made of light/air"; small atlas per type.
- **Shared Lighting:** **Self-luminous soft glow** (overrides GSC key) — the only self-lit batch.
- **Shared Materials:** Light, smoke, ash, petal.
- **Shared Composition:** One sprite centered on empty field + size/rotation variants.
- **Shared Color Palette:** Warm gold/amber `#EBD08A`→`#C9A24B`; embers add Alta `#D64027`; ash pale-cool.
- **Background Rules:** Transparent, clean alpha (mandatory).
- **Negative Prompt Rules:** NEG-C-particle.

---

# BATCH 06 · SILHOUETTES & FIGURATIVE SHAPES  *(Family B · ★★★)*
- **Assets Included:** BN-04 (araimandi), BN-05 (tribhanga); INS-08 (veena sil), INS-09 (tambura sil), INS-10 (ensemble); ARC-01 (gopuram sil); BOR-03 (yali), BOR-04 (hamsa) if rendered as rim-lit.
- **Recommended Generation Order:** araimandi (anchor — locks rim-light + silhouette read) → tribhanga → veena/tambura silhouettes → gopuram → ensemble.
- **Estimated Number of Images:** ~14.
- **Shared Style Rules:** Clean readable solid shapes, warm gold rim-light, interior near-black; profile/gesture clarity; generous negative space.
- **Shared Lighting:** Single warm rim from behind/side, deep black interior (first batch to introduce directional light).
- **Shared Materials:** Implied silk + jewelry in the lit edge only.
- **Shared Composition:** Single figure centered or thirds; grounded base for dancers.
- **Shared Color Palette:** Body `#0E0B08`, rim `#EBD08A`; optional dim jewel backdrop.
- **Background Rules:** Transparent (ensemble may use a dim silk backdrop, opaque).
- **Negative Prompt Rules:** NEG-B + `visible face detail, flat gray, missing rim light`.

---

# BATCH 07 · LIT METAL HERO OBJECTS  *(Family B · ★★★★)*
- **Assets Included:** LGT-01 (oil lamp), INS-04 (veena render), INS-05 (mridangam), INS-06 (ghatam), INS-07 (jewelry 4), BRD-06 (logo on brass), LGT-09 (diya row).
- **Recommended Generation Order:** oil lamp (anchor — it IS the light source; locks temperature + reflection) → veena → mridangam → jewelry set → ghatam → diya row → logo-on-brass.
- **Estimated Number of Images:** ~13.
- **Shared Style Rules:** Photoreal aged temple brass/bronze (patina, micro-scratch, darkened crevices), jewelry-grade, one hero object per frame, museum-vitrine.
- **Shared Lighting:** Single warm key 2700–3200K upper-left 45° (Rembrandt) + strong warm rim, small speculars, deep shadow, faint bloom + haze.
- **Shared Materials:** Aged brass, dark wood, clay (ghatam), gemstones, gold-leaf.
- **Shared Composition:** One object centered/thirds, 60–70% black negative space, shallow DOF, subtle ground reflection.
- **Shared Color Palette:** Brass `#8A6A25`–`#C9A24B`, lit edge `#EBD08A`, gemstone kumkum/emerald, on `#0E0B08`.
- **Background Rules:** Garbhagriha black; isolated with alpha for compositing.
- **Negative Prompt Rules:** NEG-B + `flat yellow, chrome, plastic, electric bulb`.

---

# BATCH 08 · CINEMATIC ATMOSPHERE & BACKGROUNDS  *(Family B · ★★★★)*
- **Assets Included:** ARC-05 (doorway), ARC-02 (gopuram tiers), ARC-04 (colonnade); LGT-02 (god-rays), LGT-05 (rim gradients), LGT-06 (spotlight), LGT-08 (vignette); MAN-04 (ceiling); LOT-04 (lotus low-light); HERO-03 (silk field), HERO-08 (particle layer), HERO-09 (god-ray overlay), HERO-10 (vignette); BN-10 (costume fabric); HERO-12 / SCR-02 (parallax plates).
- **Recommended Generation Order:** sanctum doorway (anchor — depth/haze/glow falloff) → god-rays → spotlight cone → rim/vignette overlays → silk light field → colonnade → gopuram tiers → ceiling → lotus low-light → costume fabric → parallax plates.
- **Estimated Number of Images:** ~20.
- **Shared Style Rules:** Cinematic chiaroscuro environments, deep stage darkness, volumetric warm light + incense haze, dust motes, film grain, uncluttered, letterbox.
- **Shared Lighting:** Single dominant warm source (in-frame or implied), god-rays through haze, deep falloff to warm black, gentle vignette.
- **Shared Materials:** Stone, silk, haze, light, flame-glow.
- **Shared Composition:** 2.39:1, foreground/mid/background depth separation, subject off-center, vast negative darkness, layer-separable.
- **Shared Color Palette:** Black base, warm gold light, one jewel wash (silk emerald/crimson/indigo) per scene.
- **Background Rules:** Full-bleed opaque scenes; parallax layers + overlays exported with alpha.
- **Negative Prompt Rules:** NEG-B.

---

# BATCH 09 · HERO COMPOSITE SCENES  *(Family B · ★★★★)*
- **Assets Included:** HERO-01 (desktop master), HERO-02 (mobile master), HERO-04 (foreground plate).
- **Recommended Generation Order:** assemble the desktop master from Batch 04/05/06/07/08 outputs (silk field + lamp + veena/dancer + particles + god-rays + vignette) → reframe mobile → isolate foreground plate. Generation-assisted, but primarily a *composite* of approved elements.
- **Estimated Number of Images:** ~8 (incl. colorway/layout variants).
- **Shared Style Rules:** The invocation — the single most-crafted view; obeys all Batch-08 rules at maximum polish; huge negative space reserved for the wordmark.
- **Shared Lighting:** Batch-07/08 chiaroscuro; the lamp/spotlight is the key.
- **Shared Materials:** Silk backdrop, brass veena/lamp, dust.
- **Shared Composition:** 2.39:1 desktop + 9:16 mobile, off-center focal, layer-separated for parallax.
- **Shared Color Palette:** Black + gold + one jewel silk.
- **Background Rules:** Opaque scene; layers with alpha.
- **Negative Prompt Rules:** NEG-B + `centered symmetry, clutter, cold light`.

---

# BATCH 10 · ART-DIRECTED PHOTOGRAPHY  *(Camera capture · ★★★★★)*
- **Assets Included:** PHO-01 (LUT), PHO-02 (performance heroes), PHO-03 (detail/macro), PHO-04 (event archive re-grade); OB-01 (13 portraits); ALM-01 (9+ alumni portraits); EVT-01 (5 production heroes), EVT-07 (6 general-event thumbs); BN-06 (dancer spin clip), BN-09 (alta feet); HERO-11/PHO-05 (film loop).
- **Recommended Generation Order:** grade the **master LUT first** → OB portraits (uniform rig) → alumni portraits → performance heroes → macro/detail library → event archive re-grade → film loop → motion clips.
- **Estimated Number of Images:** ~45+ (largest single batch; the portrait + macro libraries dominate).
- **Shared Style Rules:** **Not AI — physical chiaroscuro capture.** Truthful abhinaya and effort; one LUT applied to ALL; consistent portrait crop/eyeline.
- **Shared Lighting:** Physical single warm key 2700–3200K (Rembrandt) + minimal cool fill; deep shadow; rim on subject/jewelry.
- **Shared Materials:** Real costume, jewelry, instruments, stage.
- **Shared Composition:** One soloist per frame, off-center, dark negative space, architectural framing; 4:5 portraits, 2.39:1/3:2 performance.
- **Shared Color Palette:** Warm shadows to `#0E0B08`, protected highlights, gold mid-tones, rich-not-oversaturated jewel tones (via LUT).
- **Background Rules:** Dark hall / seamless dark; cutout-mask variants for cards.
- **Negative Prompt Rules (grade/direction):** NEG-photo.
- **NOTE:** Longest-lead, highest-logistics batch. **Schedule the shoot early** despite its late difficulty rank — many Critical assets depend on it.

---

# BATCH 11 · SOCIAL & MARKETING TEMPLATES  *(Assembly · ★★★)*
- **Assets Included:** SOC-01..10; EVT-08 (poster); BRD-09 / SOC-07 (OG cards).
- **Recommended Generation Order:** OG card (anchor layout) → IG post → IG story → event announcement → quote share → countdown → avatar/PFP → cover banners → handle lockup → reel end-card → poster.
- **Estimated Number of Images:** ~16 templates.
- **Shared Style Rules:** Editorial layouts assembled from brand marks (B01) + photography (B10) + ornaments (B02/03); vast dark negative space, one hero image, tracked eyebrow, gold rule.
- **Shared Lighting:** Flat UI over dark cinematic photo fields.
- **Shared Materials:** Gold rule, ivory type, photographic imagery.
- **Shared Composition:** Per-platform ratios (1:1, 9:16, 1.91:1); left-weighted editorial type.
- **Shared Color Palette:** Black, gold, ivory + one swara accent per campaign.
- **Background Rules:** Opaque (dark) except transparent handle lockup.
- **Negative Prompt Rules:** NEG-B + `busy, multiple images, clutter`.

---

# BATCH 12 · UI COMPONENTS & DECORATIVE  *(Assembly · ★★★)*
- **Assets Included:** UID-01..14; OB-02,04,05,06; ALM-02,03,05,06; EVT-02,05,06; MAN-03 frames (shared); UID-13 modal, UID-14 toast.
- **Recommended Generation Order:** design tokens → buttons (primary/ghost/icon) → nav pill (7 swara) → form fields → tags/chips → cards (event/OB/alumni) → quote plinth → badges/seals → scroll UI → modal/lightbox → cursor → toast/skeleton.
- **Estimated Number of Images:** ~30 (component art layers).
- **Shared Style Rules:** Brass-line UI assembled from B01/B02 vectors + B04 textures; gold-ignite hover, kolam-draw underline, Tala spacing, swara-tinted active states. Built in code/Figma, not image-generated.
- **Shared Lighting:** Flat UI; subtle gold glow on active/hover only.
- **Shared Materials:** Brass-line, gold, marble (plinths), silk (card fills).
- **Shared Composition:** Bible §6 layout grid (Tala scale), asymmetric editorial, generous negative space.
- **Shared Color Palette:** Full core system + per-section swara accent.
- **Background Rules:** Transparent component layers over the site's dark ground.
- **Negative Prompt Rules:** N/A (assembled) — validate against the icon/line families for consistency.

---

# BATCH 13 · 3D MODELS  *(3D · ★★★★★)*
- **Assets Included:** D3-01 (oil lamp), D3-02 (veena), D3-03 (mridangam), D3-04 (gopuram), D3-05 (dancer), D3-06 (hero scene).
- **Recommended Generation Order:** oil lamp (anchor — simplest; validates material/light pipeline) → veena → mridangam → gopuram → dancer → hero scene assembly.
- **Estimated Number of Images:** ~12 (6 GLB + 6 baked PNG fallbacks).
- **Shared Style Rules:** Web-optimized GLB (Draco), aged-brass/stone PBR matching Batch-07 renders exactly; each ships a 3840px baked static PNG fallback.
- **Shared Lighting:** One warm key + warm rim baked; warm low-key HDRI IBL. Match Blender view-transform to the master LUT.
- **Shared Materials:** Batch-04 textures as PBR maps (brass, granite), Batch-07 renders as look targets.
- **Shared Composition:** Isolated hero object, turntable-ready, black environment.
- **Shared Color Palette:** Same as Batch 07.
- **Background Rules:** Transparent canvas / isolated in-scene.
- **Negative Prompt Rules (concept renders):** NEG-B + `over-poly, missing fallback`.
- **NOTE:** Longest modeling lead-time; Phase-4 ceiling. Author 2D masters "3D-in-mind" throughout.

---

# BATCH 14 · MOTION & AUDIO  *(Derived assembly · ★★★★)*
- **Assets Included:** MOT-01..10; KOL-02,03,04 (animated); MAN-01,02 (bloom anims); BRD-07 (logo bloom); LOT-02 (lotus bloom); BN-02 (alapadma bloom); INS-11,12,13 (waveforms/pulse); GEO-04 (ring glow); DIV-03,05 (wipes/transitions); FTR-01,03,06 (footer motion); UID-08,12 (scroll/skeleton); HERO-06,07 (wordmark reveal/cue).
- **Recommended Generation Order:** loader (kindling + kolam) → page transition → dividers/wipes → reveal blooms → ambient particle/pulse → scroll-linked draws → footer resolve → audio bed → micro-cues → invocation note → stingers.
- **Estimated Number of Images/Files:** ~14 motion/audio deliverables.
- **Shared Style Rules:** Animated/assembled from the approved static masters — **no new imagery generated**. Bible §13 easing ("veena-decay" ease-out, long tail), seamless loops, ≤200KB Lottie, 60fps, `prefers-reduced-motion` still-frame fallback.
- **Shared Lighting:** Inherited from source masters (animate opacity/transform/glow only).
- **Shared Materials:** Inherited.
- **Shared Composition:** Inherited.
- **Shared Color Palette:** Inherited — no new color introduced.
- **Background Rules:** Transparent where the source master is transparent.
- **Negative Prompt Rules:** N/A (derived).

---

# ROADMAP SUMMARY

## Why this order (difficulty logic)
1. **Flat vector first (B01–B02)** — deterministic, forgiving, no lighting or anatomy; also the highest-reuse assets, so completing them unblocks UI, dividers, and framing everywhere.
2. **Color & material next (B03–B05)** — one new variable at a time: color discipline, then seamless texture, then self-lit particles.
3. **Directional light enters (B06)** — silhouettes are the gentlest introduction to the warm rim before full renders.
4. **Full chiaroscuro (B07–B09)** — material fidelity, then environments, then the hardest composite (hero).
5. **Capture & 3D (B10, B13)** — highest craft + logistics + lead-time.
6. **Assembly tracks (B11, B12, B14)** — depend on everything above; sequenced by dependency once their inputs exist.

## Effort / volume distribution
| Difficulty | Batches | ~Images | ~Effort share |
|---|---|---|---|
| ★ trivial | 00,01,02 | ~106 | Fast, high-volume, high-reuse |
| ★★ moderate | 03,04,05 | ~40 | One new variable each |
| ★★★ craft | 06,11,12 | ~60 | Light + assembly |
| ★★★★ high | 07,08,09,14 | ~55 | Full chiaroscuro + motion |
| ★★★★★ hardest | 10,13 | ~57 | Shoot + 3D lead-time |

## Critical-path callouts
- **Gate:** Batch 00 blocks everything. Produce + approve first.
- **Start-early-despite-late-rank:** Batch 10 photography (physical shoot + LUT) and Batch 13 3D have the longest lead times — kick off scheduling/scoping in parallel with the easy batches even though they finish last.
- **Highest-leverage:** Batches 01–02 (~106 files, mostly Global reuse) deliver the most site-wide coverage per hour — do them first and completely.

## Alignment with the phased plan (from the inventory)
| Phase | Batches |
|---|---|
| **Phase 1 — MVP skeleton** | 00, 01, 02, core of 04, part of 07/08/10, 12 |
| **Phase 2 — Performance** | 03, 05, 06, 08, 09, 14 (motion), audio |
| **Phase 3 — Ornament & polish** | remainder of 07/08, 11, system states in 12 |
| **Phase 4 — Ceiling** | 13 (3D), advanced 14 (audio-reactive), cursor |

## Run discipline (every batch)
1. Expand `{{GSC}}`; pin the Batch-00 board + the batch anchor as references.
2. Generate the batch **anchor first**, approve, then run siblings on the same seed.
3. Never mix families A/B/C in one call.
4. Vectorize line-art; keep textures seamless; keep sprites on clean alpha.
5. Save to the inventory's exact File Name; run the 5-point Acceptance Test before it enters the library.

*Saptham — where the seven notes become light.*
*Asset Production Roadmap v1.0 · Easiest → hardest batched plan.*

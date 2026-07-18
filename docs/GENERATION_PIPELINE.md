# SAPTHAM — ASSET GENERATION PIPELINE
### Batch Plan for Maximum Visual Consistency · v1.0
**Third in the set. Read `DESIGN_BIBLE.md` and `ASSET_PRODUCTION_CHECKLIST.md` first. This document sequences the ~190 checklist assets into generation batches engineered to minimize style drift.**

---

## THE GOVERNING PRINCIPLE — BATCH BY TECHNIQUE, NOT BY SUBJECT

An image model drifts the moment a single run mixes rendering techniques. A veena as a **flat gold line-icon**, a veena as a **volumetric lit-brass render**, and a veena as a **rim-lit silhouette** must NOT be generated together — despite all being "veena" in the checklist. They belong in three different batches, each surrounded by neighbors that share its exact light, palette, and composition.

Therefore this pipeline **dissolves the 24 semantic categories** of the checklist and **re-sorts every asset by visual treatment**. Assets that must look identical in finish are generated in the same run, off the same seed and reference images.

## THE STYLE-LOCK PROTOCOL (how drift is actually prevented)

1. **Batch 00 is generated first and approved before anything else.** It is a small "master style board" that hard-codes the palette, the gold gradient, the light angle, and the black. It becomes the **style-reference image** attached to every subsequent batch.
2. **Reference chaining:** each batch is generated with (a) the Batch-00 board and (b) its own approved *anchor asset* pinned as image references. Downstream batches inherit upstream look, never re-invent it.
3. **Anchor-first within every batch:** the first asset listed in each batch's generation order is produced, reviewed, and locked *before* the rest of the batch runs. If the anchor is right, the batch is right.
4. **One seed per batch** (where the tool supports it) + fixed style tokens, so intra-batch variation is subject-only, not style.
5. **No cross-technique runs. Ever.** Line-art never shares a run with renders; textures never share a run with icons.

---

## PIPELINE OVERVIEW (batch sequence = generation order)

| # | Batch | Technique | Why here in the order |
|---|---|---|---|
| **00** | Master Style Anchor Board | mixed reference plate | Locks the look; seeds everything |
| **01** | Brand & Identity Marks | bespoke vector + lit variant | Establishes type + gold law |
| **02** | Material & Texture Library | even-lit tileable swatches | Foundational surfaces for all comps |
| **03** | Iconography & Wayfinding | flat gold line-art | Core UI system; high reuse |
| **04** | Kolam · Borders · Geometry · Dividers | flat gold line-art (same spec as 03) | Ornamental line systems |
| **05** | Figurative Line Motifs & Silhouettes | line-art + rim-lit silhouette | Cultural figures, dancer/instrument shapes |
| **06** | Ceremonial Color Ornaments | flat radial color (the one color exception) | Rangoli + swara-tinted frames |
| **07** | Lit Metal Hero Objects | chiaroscuro product render | Instruments, lamp, jewelry as brass |
| **08** | Cinematic Atmosphere & Backgrounds | volumetric environment plates | Doorways, light shafts, silk fields |
| **09** | Particles & Light Sprites | isolated soft sprites | Smoke, dust, bloom, embers |
| **10** | Art-Directed Photography | camera capture (LUT-graded) | Real human truth; not AI-generated |
| **11** | 3D Models | GLB, referencing Batch 07 | Phase-4 ceiling |
| **12** | Motion & Sound (Derived) | Lottie/video/audio from masters | Post-production, not image-gen |
| **13** | Interface & Components | assembled from primitives | Built in code/Figma, not generated |

> Batches **12–13 are not image-generation batches** — they are assembled/animated from the outputs of 00–11. They are included so the pipeline is complete end-to-end.

---

# BATCH SPECIFICATIONS

## BATCH 00 · MASTER STYLE ANCHOR BOARD
*Generate first. Approve before any other batch. This is the north star.*

| Field | Spec |
|---|---|
| **Assets included** | A single reference plate containing: gold gradient bar (Brass Umber→Saptham→Deepam), brass patina swatch (`GLD-02`), Kanjeevaram silk swatch (`TEX-02`), Garbhagriha black field (`TEX-01`), one veena line-icon (`INS-01`), one lit oil lamp (`LGT-01`), the logo mark (`BRD-01`) |
| **Generation order** | Palette bar → black field → brass + silk swatches → oil lamp (defines the light) → veena line-icon (defines the line) → logo. Assemble as one board. |
| **Shared style constraints** | Warm temple-luxe, restrained, museum-grade, hand-finished; establishes 1.5px calligraphic line weight, gold-as-lit-metal, key light upper-left 45° |
| **Shared color palette** | `#0E0B08` black · gold `#8A6A25`→`#C9A24B`→`#EBD08A` · ivory `#F4EDE0` · kumkum `#9B1C2E` |
| **Shared lighting** | Single warm key 2700–3200K, upper-left 45°, deep shadow, small specular highlights, subtle bloom |
| **Shared composition** | Grid/contact-sheet of isolated swatches, generous black margins, centered |
| **Recommended aspect ratio** | 16:9 (board) |
| **Output resolution** | 3840×2160 |
| **Transparent background** | No (this is a reference plate) |

---

## BATCH 01 · BRAND & IDENTITY MARKS
*Foundational. Sets the typographic + gold law all headings and marks obey.*

| Field | Spec |
|---|---|
| **Assets included** | `BRD-01` monogram · `BRD-02` Latin wordmark · `BRD-03` Tamil lockup · `BRD-05` reversed/mono · `BRD-04` logo-on-brass (lit) · `BRD-07` OG/share cards |
| **Generation order** | Monogram (anchor) → Latin wordmark → Tamil lockup → reversed/mono set → logo-on-brass lit variant → OG card layouts |
| **Shared style constraints** | Luxury-house restraint; high-contrast display serif (Fraunces/Canela family) + Noto Serif Tamil at equal dignity; gold-leaf finish on the lit variant only |
| **Shared color palette** | Gold on black (primary); ivory reverse on `#E5D6B8` sand; single-color fallbacks |
| **Shared lighting** | Flat for vector marks; single raking highlight for the on-brass lit variant |
| **Shared composition** | Centered, vast clear-space (min 1× cap-height margin), one mark per frame |
| **Recommended aspect ratio** | 1:1 (marks) · 1.91:1 (OG cards) |
| **Output resolution** | Generate 2048² → deliver vector SVG; OG cards 1200×630 raster |
| **Transparent background** | Yes (marks) · No (OG cards, on-brass) |

---

## BATCH 02 · MATERIAL & TEXTURE LIBRARY
*Produced early so every later composite sits on real materials. NOTE: the ONLY batch lit flat/even — because textures must tile seamlessly.*

| Field | Spec |
|---|---|
| **Assets included** | `TEX-01` black gradient · `TEX-02` silk+zari · `TEX-03` granite · `TEX-04` palm-leaf · `TEX-05` sandalwood · `TEX-06` marble · `TEX-07` film grain · `TEX-08` sand · `GLD-01` gold-leaf sheet · `GLD-02` brass patina · `ARC-06` bas-relief tile |
| **Generation order** | Brass patina (anchor — the gold source) → silk → granite → palm-leaf → sandalwood → marble → sand → gold-leaf sheet → bas-relief → black gradient → film grain overlay |
| **Shared style constraints** | Photoreal material macro, tileable/seamless, warm and aged (never new/plastic), fibre and grain visible, no seams, no subject |
| **Shared color palette** | Each swatch = its own material color, but all warm-biased: brass/gold `#C9A24B`, silk jewel tones (emerald `#14604E` / crimson `#9B1C2E`), stone neutrals `#2A241D`–`#4A4236`, sand `#E5D6B8` |
| **Shared lighting** | Flat, soft, even, diffuse — grazing enough to reveal grain but NO directional hotspot (so it tiles). The deliberate exception to the chiaroscuro rule. |
| **Shared composition** | Full-bleed flat surface, top-down/orthographic, edge-to-edge, no focal point |
| **Recommended aspect ratio** | 1:1 (seamless) |
| **Output resolution** | 2048² tileable; hero silk + marble + gold-leaf at 4096² |
| **Transparent background** | No (except `TEX-07` grain: yes/overlayable) |

---

## BATCH 03 · ICONOGRAPHY & WAYFINDING
*Flat gold line-art. The single most consistency-critical group after Batch 00. Everything here shares ONE line spec.*

| Field | Spec |
|---|---|
| **Assets included** | `ICO-01` mudra nav set · `ICO-02` swara glyphs (Sa–Ni) · `ICO-04` UI system icons · `ICO-06` contact icons · `ICO-03` social icons · `ICO-07` instrument icon set (`INS-01/06/07/08/13/14/15`) · `ICO-08` favicon · `BN-01` mudra icons · `BN-08` ghungroo icon · `GEO-04` swara spectrum ring · `SCR-05` scroll cue |
| **Generation order** | One UI icon (anchor — locks stroke, terminal, corner radius, optical box) → swara glyph set → mudra set → instrument set → contact + social → favicon → swara ring + scroll cue |
| **Shared style constraints** | 1.5px optical stroke, calligraphic terminals (slight thick-thin), rounded joins/precise cuts, drawn on 24/32/48 ashtadala grid, monoline family, no fills, no shading |
| **Shared color palette** | Saptham Gold `#C9A24B` line on transparent; single active state may use Alta `#D64027` |
| **Shared lighting** | None — flat vector, no light |
| **Shared composition** | Single glyph centered in a square keyline box, consistent padding, optical balance |
| **Recommended aspect ratio** | 1:1 |
| **Output resolution** | Generate 1024²/2048² clean line → vectorize to SVG (24/32/48 targets) |
| **Transparent background** | Yes (mandatory) |

---

## BATCH 04 · KOLAM · BORDERS · GEOMETRY · DIVIDERS
*Same line-art spec as Batch 03 — generated adjacent so they never diverge from the icon family.*

| Field | Spec |
|---|---|
| **Assets included** | `KOL-01` dot-grid · `KOL-02`/`DIV-01` kolam divider · `KOL-05` corner ornaments · `KOL-06` under-feet · `LOT-01` ashtadala · `LOT-03` lotus icon · `BOR-01` bhairavi band · `BOR-02` paisley · `BOR-05`/`FTR-04` gold hairline · `BOR-06` corner set · `GEO-01` phi overlays · `GEO-02` yantra sets · `GEO-03` concentric circles · `GLD-03` gold divider ornaments · `GLD-05` underline stroke · `GLD-06` kintsugi seams · `DIV-02` gold hairline+ornament · `DIV-06` gopuram separator · `BN-10` pambara radial · `MAN-01/02` mandala line bases · `MAN-03` portrait frame |
| **Generation order** | Kolam divider (anchor — sets the continuous-line logic) → dot-grid → ashtadala lotus → mandala bases → pambara radial → borders (bhairavi, paisley) → corner sets → hairlines + gold ornaments → yantra/phi/concentric → kintsugi |
| **Shared style constraints** | Continuous unbroken kolam-line logic, symmetrical where sacred, 1.5px calligraphic gold line, self-draw-ready (single continuous path), no fills |
| **Shared color palette** | Saptham Gold `#C9A24B` line on transparent; optional single swara tint per instance |
| **Shared lighting** | None — flat vector |
| **Shared composition** | Symmetric/radial ornaments centered; dividers as ultra-wide horizontal bands; tileable where noted |
| **Recommended aspect ratio** | 1:1 (radial) · 21:9 or wider (dividers/borders) · 1:1 tileable (dot-grid, bands) |
| **Output resolution** | Generate 2048² → vectorize to SVG |
| **Transparent background** | Yes (mandatory) |

---

## BATCH 05 · FIGURATIVE LINE MOTIFS & SILHOUETTES
*Bridges flat line-art and atmosphere: cultural figures as gold line, plus rim-lit silhouettes. Shares Batch 03/04's line for the line pieces and Batch 08's rim-light for the silhouettes.*

| Field | Spec |
|---|---|
| **Assets included** | `INS-04` yali ornament · `BOR-03` yali motif · `BOR-04` hamsa border · `INS-02` veena hero gold-line · `BN-03`/`FTR-02` anjali · `FTR-01` blessing glyph · `BN-04` araimandi silhouette · `BN-05` tribhanga silhouette · `INS-05` veena silhouette · `INS-12` tambura silhouette · `INS-17` ensemble silhouette · `ARC-01` gopuram silhouette |
| **Generation order** | Yali line ornament (anchor for figurative line) → hamsa → veena hero gold-line → anjali + blessing glyph → THEN switch to silhouette sub-run: araimandi (anchor for silhouettes) → tribhanga → veena/tambura silhouettes → ensemble → gopuram |
| **Shared style constraints** | Two sub-styles, one palette: (a) figurative gold calligraphic line (matches Batch 03/04); (b) solid rim-lit silhouettes — clean readable shapes, warm gold edge-light, interior near-black |
| **Shared color palette** | Gold `#C9A24B` line / silhouettes near-black `#0E0B08` with Deepam Gold `#EBD08A` rim; optional jewel backdrop |
| **Shared lighting** | Line pieces: none. Silhouettes: single warm rim from behind/side, deep black interior |
| **Shared composition** | Single figure centered or rule-of-thirds, generous negative space, profile/gesture clarity |
| **Recommended aspect ratio** | 1:1 (motifs) · 3:2 & 9:16 (silhouettes, for scene use) |
| **Output resolution** | Line → 2048² vectorize; silhouettes 3840px raster PNG |
| **Transparent background** | Yes (both sub-styles) |

---

## BATCH 06 · CEREMONIAL COLOR ORNAMENTS
*The ONE batch where controlled color leads. Kept separate so its saturation never contaminates the gold-line batches.*

| Field | Spec |
|---|---|
| **Assets included** | `RAN-01` ceremonial rangoli burst · `RAN-02` rangoli variations · `MAN-03` swara-tinted portrait frames (7) · `MAN-04` ceiling mandala backdrop |
| **Generation order** | Ceremonial rangoli (anchor — sets the disciplined jewel+gold color logic) → rangoli variations → swara-tinted frame set (7) → ceiling mandala backdrop |
| **Shared style constraints** | Radially symmetric, disciplined jewel palette + gold outline, festive but restrained (one jewel per piece, never rainbow), still reads as "temple luxe" not "calendar art" |
| **Shared color palette** | Gold `#C9A24B` structure + ONE swara jewel per piece: Sa gold, Ri ochre `#C57B26`, Ga emerald `#14604E`, Ma teal `#0E5A63`, Pa crimson `#9B1C2E`, Da plum `#5E2E52`, Ni indigo `#1C2A57`, on black |
| **Shared lighting** | Flat for rangoli/frames; soft warm grazing for the ceiling backdrop |
| **Shared composition** | Perfectly radial/symmetric, centered, concentric |
| **Recommended aspect ratio** | 1:1 |
| **Output resolution** | Ornaments 2048² (vectorize where possible); ceiling backdrop 3840² raster |
| **Transparent background** | Yes (rangoli, frames) · No (ceiling backdrop) |

---

## BATCH 07 · LIT METAL HERO OBJECTS
*Chiaroscuro product-render look. The "jewel in the vitrine" batch. Every object is warm lit brass/gold on black.*

| Field | Spec |
|---|---|
| **Assets included** | `INS-02→render` veena brass hero · `INS-14` ghatam (clay+brass) · `BN-09` temple jewelry (nethichutti/jhumka/oddiyanam) · `LGT-01` oil lamp + flame · `BRD-04` logo-on-brass · (2D masters that seed the 3D shortlist: veena, mridangam) |
| **Generation order** | Oil lamp + flame (anchor — it IS the light source; locks temperature and reflection behavior) → veena brass hero → mridangam → temple jewelry set → ghatam → logo-on-brass |
| **Shared style constraints** | Photoreal aged temple brass/bronze (patina, micro-scratches, darkened crevices), jewelry-grade, catches a directional flame, never chrome/plastic/flat-yellow, single hero object per frame |
| **Shared color palette** | Aged brass `#8A6A25`–`#C9A24B`, lit edges `#EBD08A`, clay terracotta accent, gemstone kumkum `#9B1C2E`/emerald `#14604E`, on Garbhagriha black |
| **Shared lighting** | Single warm key 2700–3200K upper-left 45° (Rembrandt), strong warm rim to separate from black, small controlled speculars, deep shadow, faint bloom + haze |
| **Shared composition** | Museum-vitrine: one object centered/thirds, 60–70% black negative space, shallow depth of field, subtle ground reflection |
| **Recommended aspect ratio** | 4:5 & 1:1 (objects) · 3:2 (hero) |
| **Output resolution** | 3840px longest edge; deliver PNG with alpha |
| **Transparent background** | Yes (objects isolated for compositing) |

---

## BATCH 08 · CINEMATIC ATMOSPHERE & BACKGROUNDS
*Full-scene volumetric environments — the "hall" the objects live in.*

| Field | Spec |
|---|---|
| **Assets included** | `ARC-05` sanctum doorway+glow · `LGT-02` volumetric light shafts · `LGT-06` spotlight cone · `HRO-03` hero silk/light field · `HRO-01` hero comp base · `LOT-04` lotus low-light · `ARC-02` gopuram tier backdrop · `ARC-04` colonnade · plate bases for `SCR-02` parallax layers |
| **Generation order** | Sanctum doorway + glow (anchor — locks depth, haze, warm-glow falloff) → light shafts → spotlight cone → silk/light hero field → colonnade → gopuram tier backdrop → lotus low-light → parallax layer plates |
| **Shared style constraints** | Cinematic chiaroscuro environments, deep stage darkness, volumetric warm light + incense haze, dust motes, film grain, uncluttered, letterbox feel |
| **Shared color palette** | Garbhagriha black base, warm gold light `#C9A24B`/`#EBD08A`, one jewel wash (silk emerald/crimson/indigo) per scene |
| **Shared lighting** | Single dominant warm source in-frame or implied, god-rays through haze, deep falloff to warm black, gentle vignette |
| **Shared composition** | 2.39:1 cinematic framing, foreground/mid/background depth separation, subject off-center, vast negative darkness, layer-separable for parallax |
| **Recommended aspect ratio** | 21:9 & 16:9 (desktop) + 9:16 (mobile reframes) |
| **Output resolution** | 3840×2160 (and 2160×3840 mobile) |
| **Transparent background** | No (full-bleed scenes); parallax layers exported with alpha per plane |

---

## BATCH 09 · PARTICLES & LIGHT SPRITES
*Isolated soft sprites for the particle system. Generated together so density, softness, and glow match.*

| Field | Spec |
|---|---|
| **Assets included** | `PAR-01` incense smoke · `PAR-02` gold dust motes · `PAR-03` vibhuti ash · `PAR-04` jasmine petals · `PAR-05` embers · `LGT-03` bloom sprites · `LGT-07` lens flare |
| **Generation order** | Gold dust mote (anchor — sets glow softness + warmth) → bloom sprites → incense smoke → vibhuti ash → embers → jasmine petals → lens flare |
| **Shared style constraints** | Single isolated particle/sprite, soft-edged, warm-glowing, subtle, "made of light/air" not hard graphics; a small sprite atlas per type |
| **Shared color palette** | Warm gold/amber `#EBD08A`→`#C9A24B`, soft white-gold; embers add Alta `#D64027` |
| **Shared lighting** | Self-luminous soft glow, no external key |
| **Shared composition** | One sprite centered on empty field, plus a few size/rotation variants per sheet |
| **Recommended aspect ratio** | 1:1 |
| **Output resolution** | 512²–1024² per sprite (PNG atlas) |
| **Transparent background** | Yes (mandatory, clean alpha) |

---

## BATCH 10 · ART-DIRECTED PHOTOGRAPHY
*Camera capture, not AI generation — the bible demands real abhinaya and human truth. Listed for pipeline completeness; unified by ONE color LUT.*

| Field | Spec |
|---|---|
| **Assets included** | `PHO-01` performance heroes · `PHO-02` detail/macro library (mudras/feet/ghungroo/jewelry/strings/eyes) · `PHO-03` OB portraits · `PHO-04` alumni portraits · `PHO-05` event archive re-grade · `PHO-06` hero film loop · `PHO-07` master LUT · `PHO-08` treatment presets |
| **Generation order** | Master LUT (anchor — graded from a reference frame FIRST) → OB portraits (uniform setup) → alumni portraits → performance heroes → macro/detail library → event archive re-grade → hero film loop |
| **Shared style constraints** | Cinematic chiaroscuro capture, single warm key (Rembrandt), shallow DOF, truthful expression/effort, no flash, no clutter; one LUT applied to ALL |
| **Shared color palette** | Warm shadows to `#0E0B08`, protected highlights, gold mid-tones, rich-but-not-oversaturated jewel tones |
| **Shared lighting** | Physical single warm key 2700–3200K + minimal cool fill; deep shadow; rim on subject/jewelry |
| **Shared composition** | One soloist per frame, off-center, dark negative space, architectural framing; portraits consistent crop/eyeline |
| **Recommended aspect ratio** | 4:5 (portraits) · 3:2 & 2.39:1 (performance) · 16:9 (film loop) |
| **Output resolution** | Portraits 1600×2000 · heroes 3840px · film loop 3840×2160 |
| **Transparent background** | No (portraits may get cutout/masked variants for cards) |

---

## BATCH 11 · 3D MODELS
*Phase-4 ceiling. Built to match Batch 07's lit-brass look exactly, using its approved renders as texture/lighting reference.*

| Field | Spec |
|---|---|
| **Assets included** | `INS-03` veena · `INS-10` mridangam · `ARC-07` gopuram · `LGT-01→3D` oil lamp · `BN-07` dancer · `HRO-04` hero scene |
| **Generation order** | Oil lamp (anchor — simplest, validates the material/light pipeline) → veena → mridangam → gopuram → dancer → hero scene assembly |
| **Shared style constraints** | Web-optimized GLB (Draco), aged-brass/stone PBR matching Batch 07, single warm key baked, each ships a baked static PNG fallback |
| **Shared color palette** | Same as Batch 07 (aged brass, warm metal, stone neutrals, black) |
| **Shared lighting** | One warm key + warm rim baked into the scene; IBL from a warm low-key HDRI |
| **Shared composition** | Isolated hero object, turntable-ready, black environment |
| **Recommended aspect ratio** | N/A (real-time) — render previews 1:1 & 3:2 |
| **Output resolution** | KTX2 textures ≤2K; ≤150k tris; + 3840px baked fallback PNG |
| **Transparent background** | Yes (transparent canvas / isolated in-scene) |

---

## BATCH 12 · MOTION & SOUND *(derived — not image-generation)*
*Assembled/animated from the static masters of Batches 00–11. No new imagery is generated here.*

| Field | Spec |
|---|---|
| **Assets included** | All `*-A` animations: kolam self-draw, mandala/logo bloom, light-kindling loader, pulse-rings, silk/curtain wipes, page transitions, scroll draws; audio `AUD-01→04`; video `PHO-06`, `DIV-03/05` |
| **Generation order** | Loader (kindling + kolam) → dividers/transitions → reveal blooms → ambient particles/pulse → scroll-linked draws → audio bed + cues |
| **Shared style constraints** | Bible §13 easing ("veena-decay" ease-out, long tail), seamless loops, ≤200KB Lottie, 60fps, `prefers-reduced-motion` still-frame fallback |
| **Shared color palette** | Inherited from source masters — no new color introduced |
| **Shared lighting** | Inherited (animate opacity/transform/glow only) |
| **Shared composition** | Inherited from source masters |
| **Recommended aspect ratio** | Inherited per asset |
| **Output resolution** | Lottie vector; video WEBM(alpha)+MP4, ≤4MB |
| **Transparent background** | Yes where the source master is transparent |

---

## BATCH 13 · INTERFACE & COMPONENTS *(assembled — not image-generation)*
*Built in code/Figma from the vector primitives and textures. No AI imagery generated.*

| Field | Spec |
|---|---|
| **Assets included** | `BTN-01→07` buttons · `CMP-01→07` cards/timeline/form/map · `SYS-01→05` cursor/skeleton/modal/toast/404 · `SCR-01/04/06` scroll UI · `HRO-02/05` type animations |
| **Generation order** | Design tokens → buttons → form fields → cards → gallery/modal → scroll UI → cursor + system states → 404 scene |
| **Shared style constraints** | Brass-line UI, gold-ignite hover, kolam-draw underlines, Tala spacing scale, swara-tinted active states; matches icon/line batches exactly |
| **Shared color palette** | Full core system (black/gold/ivory/kumkum) + per-section swara accent |
| **Shared lighting** | Flat UI; subtle gold glow on active/hover only |
| **Shared composition** | Bible §6 layout grid (Tala scale), asymmetric editorial, generous negative space |
| **Recommended aspect ratio** | Responsive (component-dependent) |
| **Output resolution** | Vector / CSS |
| **Transparent background** | Yes (component art layers) |

---

# DRIFT-CONTROL SUMMARY

## The three treatment "families" (never mix within a run)
| Family | Batches | Signature | Lighting rule |
|---|---|---|---|
| **A — Flat Line & Vector** | 01, 03, 04, 05(line), 06 | Gold calligraphic line / flat color, transparent | No light (flat) |
| **B — Lit & Volumetric** | 05(silhouette), 07, 08, 10, 11 | Chiaroscuro, warm key, deep shadow | Single warm key 45° |
| **C — Material & Ambient** | 02, 09 | Tileable textures / soft sprites | Flat-even (textures) / self-glow (sprites) |

## Golden rules
1. **Batch 00 before all.** Approve the anchor board; attach it to every run.
2. **Anchor asset first, inside every batch.** Lock it before generating siblings.
3. **One technique family per run.** A- , B- , and C-family assets never share a generation call.
4. **Chain references forward.** Batch N pins Batch 00 + its own anchor + (if compositing) the relevant Batch 02 texture and Batch 07/08 render as references.
5. **Textures are the only flat-lit batch; particles are the only self-lit batch.** Everything else obeys the single warm 45° key.
6. **Vectorize line output; don't ship raster line-art.** Raster line-art is where drift hides.
7. **Color discipline:** gold-on-black is default; a run may introduce at most ONE swara jewel; only Batch 06 leads with color.

## Recommended run cadence (per phase)
- **Phase 1:** Batch 00 → 01 → 02 → 03 → parts of 07/08/10 needed for MVP hero + components (13).
- **Phase 2:** Batch 04 → 05 → 08 → 09 → 12 (motion) → audio 12.
- **Phase 3:** Batch 06 → remaining 08/10 → system states in 13.
- **Phase 4:** Batch 11 (3D) → advanced 12 (audio-reactive, stingers) → cursor in 13.

---

*Saptham — where the seven notes become light.*
*Asset Generation Pipeline v1.0 · Third companion to the Design Bible.*

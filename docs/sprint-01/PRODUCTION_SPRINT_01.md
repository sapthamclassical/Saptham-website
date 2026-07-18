# SAPTHAM — PRODUCTION SPRINT 1
### The Hero Visual Anchor Sprint · v1.0
**Reads on: `DESIGN_BIBLE.md`, `STORYBOARD.md`, `MASTER_REFERENCE_BOARD.md`, `HERO_REFERENCE_PACK.md`. Companion outputs: `PROMPT_PACK_01.md`, `GENERATION_CHECKLIST.md`, `QUALITY_CHECKLIST.md`.**

> **Objective:** produce the minimum set of world-class visual anchor assets that lock the Hero scene's look AND the global visual laws — *before any implementation begins*. Everything downstream pins to these. **Do not proceed beyond Sprint 1.**

---

## SPRINT SCOPE & DISCIPLINE

- **In scope:** 10 still anchor images (Part 1). Stills only.
- **Out of scope (deferred to Sprint 2):** the dancer silhouette (2nd hero soloist), lotus bloom, silk-in-motion video, and all wider asset batches. *Rationale: the veena alone carries the Hero soloist role for the anchor phase; adding a figure now doubles review surface without unlocking anything the veena doesn't.*
- **Definition of Done:** all 10 assets generated, passed `QUALITY_CHECKLIST.md`, approved, saved to the vault, and pinned as references. Only then does Sprint 2 (or implementation) begin.
- **Two hard rules (from the docs):** (1) `S1-01` Master Style Board is produced and approved *first* and pinned to every other run; (2) no asset is approved until it passes all 12 quality gates.

---

# PART 1 · THE REDUCED ESSENTIALS (10 assets)

Cut from the 12-anchor pack to the Hero-critical minimum. Removed for Sprint 1: HAP-09 Dancer (→ Sprint 2), HAP-11 Silk-in-Motion (→ Sprint 2, needs stills first), HAP-12 Portrait Look-Dev (→ gates the shoot, not the Hero). Added: the **Saptham Emblem** (the Hero's crowning mark) and an explicit **Hero Silk Backdrop**.

| # | ID | Asset | Rank |
|---|---|---|---|
| 1 | S1-01 | Master Style Board | Critical |
| 2 | S1-02 | Temple Brass & Gold Swatch | Critical |
| 3 | S1-03 | Garbhagriha Black + Film Grain | Critical |
| 4 | S1-04 | Oil Lamp / Deepam | Critical |
| 5 | S1-05 | Golden Dust & Incense Sheet | Critical |
| 6 | S1-06 | Hero Veena — Lit Brass | Critical |
| 7 | S1-07 | Kolam Divider | High |
| 8 | S1-08 | Hero Environment — Sanctum Doorway | High |
| 9 | S1-09 | Hero Silk Backdrop | High |
| 10 | S1-10 | Saptham Emblem (mark + wordmark) | Critical |

---

# PART 2 · ASSET DOSSIERS

### S1-01 · Master Style Board
- **Why required:** The root reference; pinned to every other generation — literally cannot start without it.
- **Scene usage:** None on-page (production tool).
- **Future reuse:** ALL assets, all sprints, all models.
- **Static/Animated:** Static.
- **Format:** 2D (raster board).
- **Best model:** OpenAI Images.
- **Difficulty:** Medium-High (labelled grid + text + multiple materials in one plate).

### S1-02 · Temple Brass & Gold Swatch
- **Why required:** The material truth for every "lit metal" surface + the 3-stop gold.
- **Scene usage:** Hero (veena, emblem, lamp), Navbar mark.
- **Future reuse:** Every gold surface/icon/ornament; Blender brass PBR.
- **Static/Animated:** Static.
- **Format:** 2D (seamless tile).
- **Best model:** Gemini Image.
- **Difficulty:** Low-Medium.

### S1-03 · Garbhagriha Black + Film Grain
- **Why required:** The warm near-black ground of every scene + the unifying grain overlay.
- **Scene usage:** Hero background base; all scenes.
- **Future reuse:** Every scene ground; global grain overlay.
- **Static/Animated:** Static.
- **Format:** 2D (gradient + alpha grain tile).
- **Best model:** Gemini Image.
- **Difficulty:** Low.

### S1-04 · Oil Lamp / Deepam
- **Why required:** Calibrates the single-warm-key light law for all Family-B renders.
- **Scene usage:** Hero (in-frame practical light), loader kindling, Footer.
- **Future reuse:** All lit-object lighting; D3 lamp; every video lighting seed.
- **Static/Animated:** Static (animatable flame later).
- **Format:** 2D (PNG, alpha-isolated).
- **Best model:** Gemini Image.
- **Difficulty:** Medium (flame + reflections + own-glow).

### S1-05 · Golden Dust & Incense Sheet
- **Why required:** Defines the self-lit particle/atmosphere look for the whole site.
- **Scene usage:** Hero atmosphere (drifting dust + haze).
- **Future reuse:** All particle systems (image, Blender emission, motion).
- **Static/Animated:** Static sprite sheet (animated in engine later).
- **Format:** 2D (PNG atlas, alpha).
- **Best model:** Gemini Image.
- **Difficulty:** Low-Medium.

### S1-06 · Hero Veena — Lit Brass
- **Why required:** The Hero soloist AND the Family-B object look-dev target.
- **Scene usage:** Hero centrepiece (foreground/parallax).
- **Future reuse:** Music/Events instrument renders; D3 veena; all brass objects.
- **Static/Animated:** Static.
- **Format:** 2D (PNG, alpha-isolated); look-target for future 3D.
- **Best model:** Gemini Image.
- **Difficulty:** High (accurate veena + aged brass + hero lighting).

### S1-07 · Kolam Divider
- **Why required:** The Family-A flat-gold-line law + the Hero's scroll-out transition.
- **Scene usage:** Hero → Intro threshold (self-draw divider).
- **Future reuse:** All icons/dividers/borders; every threshold; motion self-draw.
- **Static/Animated:** Static (self-draws in engine).
- **Format:** SVG (vectorized from 2048² line).
- **Best model:** OpenAI Images.
- **Difficulty:** Low-Medium (symmetry + clean vectorizable line).

### S1-08 · Hero Environment — Sanctum Doorway
- **Why required:** The environment/atmosphere + depth look for the Hero and all thresholds.
- **Scene usage:** Hero background environment (implied stage/sanctum).
- **Future reuse:** All environments; Legacy, Gallery; Runway/Kling env seeds.
- **Static/Animated:** Static (parallax layers in engine).
- **Format:** 2D (opaque scene; layer-separable).
- **Best model:** Higgsfield.
- **Difficulty:** Medium-High (volumetric depth + warm-glow falloff).

### S1-09 · Hero Silk Backdrop
- **Why required:** The lush jewel-silk field behind the Hero soloist.
- **Scene usage:** Hero backdrop layer.
- **Future reuse:** Events/Alumni backdrops; card fills; seeds Sprint-2 silk motion.
- **Static/Animated:** Static.
- **Format:** 2D (opaque, 3 colorways optional; emerald default).
- **Best model:** Gemini Image.
- **Difficulty:** Medium.

### S1-10 · Saptham Emblem (mark + wordmark)
- **Why required:** The Hero's crowning identity — the name that blooms in gold on arrival.
- **Scene usage:** Hero wordmark reveal; Navbar; Footer.
- **Future reuse:** Global brand mark; favicon; OG cards; all sprints.
- **Static/Animated:** Static (bloom-animated in engine).
- **Format:** SVG (vectorized) + gold-leaf raster variant.
- **Best model:** OpenAI Images.
- **Difficulty:** Medium (bespoke mark + Latin + Tamil legibility).

---

# PART 4 · PRODUCTION ORDER (why this maximizes consistency)

```
1. S1-01  Master Style Board      ── the ROOT (pinned to all that follow)
      ↓
2. S1-02  Brass & Gold Swatch     ── MATERIAL law  → feeds lamp, veena, emblem
      ↓
3. S1-03  Black + Film Grain      ── GROUND law    → feeds every scene
      ↓
4. S1-04  Oil Lamp / Deepam       ── LIGHT law     → calibrates all Family-B
      ↓
5. S1-05  Golden Dust & Incense   ── ATMOSPHERE law
      ↓
6. S1-06  Hero Veena              ── the SOLOIST (needs brass + lamp approved)
      ↓
7. S1-09  Hero Silk Backdrop      ── BACKGROUND (needs style + black)
      ↓
8. S1-08  Hero Environment        ── DEPTH (needs lamp + black + dust)
      ↓
9. S1-07  Kolam Divider           ── LINE law (independent; after the board)
      ↓
10. S1-10 Saptham Emblem          ── the MARK (needs brass + style; the capstone)
```

**Why this order:** it is strict **anchor-first dependency order** — the root first, then the four *laws* (material, ground, light, atmosphere) that every later asset inherits, then the *looks* (soloist, background, environment) that combine those laws, then the independent line law, and finally the emblem that crowns everything. Each asset is generated only after the anchors it depends on are **approved and pinned**, so consistency propagates forward and drift cannot enter. Generating the veena before the brass, or the emblem before the style board, would let each re-invent the gold — the exact failure this order prevents.

---

# PART 5 · PLATFORM PER ASSET (one each, with rationale)

| # | Asset | Platform | Why (single choice) |
|---|---|---|---|
| S1-01 | Master Style Board | **OpenAI Images** | Needs labelled cells, precise grid, and legible text — OpenAI leads on instruction-following + text + transparency |
| S1-02 | Brass & Gold Swatch | **Gemini Image** | Photoreal seamless metal macro — accurate roughness, patina, even light |
| S1-03 | Black + Grain | **Gemini Image** | Fine tonal control on warm near-black + subtle grain |
| S1-04 | Oil Lamp | **Gemini Image** | Photoreal lit object: flame, warm reflections, own-glow, deep shadow |
| S1-05 | Golden Dust & Incense | **Gemini Image** | Soft self-luminous motes + smoke with clean alpha |
| S1-06 | Hero Veena | **Gemini Image** | Photoreal aged-brass instrument as the Blender look-target |
| S1-07 | Kolam Divider | **OpenAI Images** | Clean symmetric structured line-art, transparency, easiest to vectorize |
| S1-08 | Hero Environment | **Higgsfield** | Cinematic environment: volumetric god-rays, haze, dramatic depth |
| S1-09 | Hero Silk Backdrop | **Gemini Image** | Material realism — silk sheen, zari shimmer, warm light |
| S1-10 | Saptham Emblem | **OpenAI Images** | Bespoke mark + Latin/Tamil legibility + clean vector-ready output |

**Platform split for Sprint 1:** Gemini ×6 (photoreal stills), OpenAI ×3 (graphic/text/vector), Higgsfield ×1 (cinematic environment). **No Runway/Kling** — Sprint 1 is stills only; motion begins in Sprint 2.

---

## SPRINT 1 SUMMARY
| Metric | Value |
|---|---|
| Assets | 10 (6 Critical, 4 High) |
| Modality | 100% still |
| Formats | 6× raster, 2× SVG, 2× alpha-PNG/atlas |
| Platforms | Gemini 6 · OpenAI 3 · Higgsfield 1 |
| Gate | All pass `QUALITY_CHECKLIST.md` → approved → pinned |
| Next | Sprint 2 (dancer, lotus, silk motion, wider batches) — **only after DoD** |

*Saptham — where the seven notes become light. · Production Sprint 1 v1.0 · Ten anchors, then stop.*

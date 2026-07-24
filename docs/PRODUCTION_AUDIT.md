# SAPTHAM — PRODUCTION AUDIT

> Historical creative-production audit. Any website dependency inventory in
> this document predates the 2026-07 security cleanup.
### Cross-document review, gap analysis & optimized pipeline · v1.0
**Audits `DESIGN_BIBLE.md`, `ASSET_PRODUCTION_CHECKLIST.md`, `GENERATION_PIPELINE.md`, `GENERATION_PROMPTS.md`, `PROMPT_LIBRARY.md`, `MASTER_ASSET_INVENTORY.md`, `ASSET_PRODUCTION_ROADMAP.md`.**

> Verdict: the creative system is strong and internally coherent on **aesthetics**. The problems are **operational** — the seven documents drifted apart in IDs, batch numbers, asset counts, and the GSC wording, and the plan has **content gaps against the brand's own stated goals** (sponsors, workshops, competitions, a real join mechanism). None are fatal; all are fixable with the consolidations in §10. Fix the four "canonical drift" issues in §2 **before** generating anything, or every downstream file inherits the ambiguity.

---

## 1 · EXECUTIVE SUMMARY

| Area | Status | Severity |
|---|---|---|
| Aesthetic system (palette, light, motion, type) | Coherent, production-ready | — |
| **Cross-doc ID scheme** | Drifted — same asset has different IDs in different docs | 🔴 High |
| **Batch numbering** | 3 different schemes (14 vs 15 vs 12) | 🔴 High |
| **GSC wording** | Two different "global constraints" blocks in circulation | 🔴 High |
| **Asset count** | "~190" vs "~204 / ~490" | 🟠 Medium |
| Missing content sections | Sponsors, Workshops, Competitions, Join-form absent | 🟠 Medium |
| Missing assets | 404, map frame, consent/skip/scroll-top, experience-gate | 🟠 Medium |
| Duplicate/overlapping assets | Vignette, god-rays, lamp, portrait-frame, anjali | 🟡 Low (dedupe) |
| Missing prompts | 404, sponsors/workshops, UI/motion (intentional briefs) | 🟡 Low |

---

## 2 · CRITICAL INCONSISTENCIES — FIX BEFORE PRODUCTION

These are the "root" defects. Each one, left unfixed, multiplies into every asset.

### 2.1 🔴 ID scheme drift (traceability broken)
The **same physical asset carries different IDs across documents**:
- `GENERATION_PIPELINE.md` / `GENERATION_PROMPTS.md` use `INS-01` = **veena icon**.
- `MASTER_ASSET_INVENTORY.md` uses `INS-01` = **the whole 7-instrument icon SET**, and `INS-04` = veena *render* (which the pipeline called `INS-02R`).
- `PROMPT_LIBRARY.md v2.0` follows the inventory batches, not the pipeline IDs.
→ A producer reading "INS-01" cannot know which asset is meant.
**Fix:** Adopt **`MASTER_ASSET_INVENTORY.md` IDs as canonical** (it is the newest and most complete). Publish the crosswalk in §10.4. Deprecate pipeline/prompt IDs.

### 2.2 🔴 Batch-number drift
- `GENERATION_PIPELINE.md`: 14 batches (00–13).
- `ASSET_PRODUCTION_ROADMAP.md`: 15 batches (00–14).
- `GENERATION_PROMPTS.md`: batches 00–11 + notes.
→ "Batch 07" means **Lit Metal Objects** in the roadmap but **a different grouping** in the pipeline.
**Fix:** Adopt the **ROADMAP's 15-batch scheme as canonical** (it is difficulty-ordered and already used by `PROMPT_LIBRARY.md v2.0`). Treat `GENERATION_PIPELINE.md` as the *rationale* doc, not the run order.

### 2.3 🔴 Two GSC blocks in circulation
- `GENERATION_PROMPTS.md` and `PROMPT_LIBRARY v1` used a **paraphrased** GSC ("Saptham temple-luxe visual identity…").
- `PROMPT_LIBRARY.md v2.0` uses the **bible's verbatim** Global Moodboard Constraints.
→ Assets generated from different docs will be seeded with different constraint text → subtle drift.
**Fix:** The **bible's verbatim block is canonical `{{GSC}}`** (it is the source of truth and what v2.0 already uses). Update `GENERATION_PROMPTS.md` to reference it. All tools expand the identical block.

### 2.4 🟠 Asset-count drift
"~190" (checklist) vs "~204 line items / ~490 files" (inventory) vs per-batch sums (roadmap).
**Fix:** Canonical figure = **~204 line items ≈ 490 discrete files** (inventory). Retire "~190." Update the checklist header to point at the inventory as the count of record.

---

## 3 · MISSING ASSETS
Registered nowhere, but required by the brand's stated goals/activities or by basic production reality.

| New ID | Asset | Why it's needed | Priority |
|---|---|---|---|
| SPN-01 | Sponsor / Patron logo plinth + wall | Bible names **sponsors** as core audience & "build prestige" as a goal — yet no sponsor surface exists | H |
| SPN-02 | Sponsor tier badge (Gold/Silver ornament) | Sponsorship packages / prestige | M |
| WRK-01 | Workshop card + schedule module | **Workshops** is a named primary activity with no section/asset | H |
| CMP-01 | Competition card + results/leaderboard ornament | **Competitions** is a named primary activity with no section/asset | M |
| JOIN-01 | Membership/Join form + "How to Join" module | JOIN (Thillana) is a *feeling* with **no actual mechanism**; Hero "Join Us" button still has no destination | C |
| JOIN-02 | Audition/registration CTA + WhatsApp/IG link block | Convert the Thillana energy into action | H |
| CON-01 | Contact map frame (arch/brass treatment) | The Google-Maps embed has no frame treatment (was `CMP-07`, dropped between docs) | H |
| SYS-05 | 404 "Lost Note" scene | Existed in early prompt docs, **dropped from the inventory & v2.0 library** | M |
| SYS-06 | Consent/cookie banner (brass-line) | Legal/analytics requirement for a real launch | M |
| SYS-07 | Accessibility skip-link + visible focus ring style | WCAG; bible claims accessibility but no asset | H |
| SYS-08 | Scroll-to-top control | Long cinematic scroll needs a return path | M |
| SYS-09 | "Enter / Sound On" experience gate overlay | An audio-first cinematic site needs a first-visit gate (autoplay policy); sound toggle exists but the gate does not | H |
| SYS-10 | Hero `<video>` poster/fallback frame | Prevents black flash before `HERO-11` loop loads | M |
| NAV-01 | Mobile drawer scrim + panel background | Mobile menu has icons but no defined surface | M |
| SHR-01 | Email signature / letterhead (prestige collateral) | Sponsor/alumni outreach | L |

**Estimated additional line items: ~15 (≈ 25 files).** New canonical total ≈ **219 line items / ≈ 515 files.**

---

## 4 · MISSING WEBSITE SECTIONS
Cross-referencing bible **Goals & Primary Activities** against the registered Margam sections (HERO, INTRO, VISION, LEGACY, OB, EVENTS, GALLERY, ALUMNI, JOIN, CONTACT, FOOTER):

| Missing section | Evidence it's required | Recommendation |
|---|---|---|
| **Sponsors / Patrons** | Audience = "Sponsors"; Goal = "Build prestige" | Add a restrained sponsor wall between ALUMNI and JOIN (or in FOOTER). Prestige-grade, not a busy logo grid. |
| **Workshops** | Primary Activity = "Workshops" | Add as a tab within EVENTS or its own INTRO-adjacent module. |
| **Competitions** | Primary Activity = "Competitions" | Add as a tab within EVENTS. |
| **Join / Membership mechanism** | Goal = "future club members"; Hero CTA dead | JOIN must contain a real form or clear audition/DM path, not just copy. |
| **Disciplines detail** (Carnatic / Bharatanatyam / Instrumental) | Named activities | Confirm INTRO/Jatiswaram fully covers these or add a "What We Do" module. |
| Privacy / Terms (legal) | Real-site necessity | Minimal manuscript-styled legal pages. |

**Decision needed (route the user):** Should Workshops & Competitions be **tabs inside Events** (lighter) or **first-class sections** (heavier)? See §11.

---

## 5 · MISSING PROMPTS
Assets that exist in the inventory but have **no runnable prompt** in `PROMPT_LIBRARY.md`:

| Asset | Status | Action |
|---|---|---|
| SYS-05 404 scene | Prompt existed in v1, lost in v2.0 | Re-add (Batch 08 style) |
| All §3 new assets (sponsor plinth, workshop card, join form, map frame, gate, etc.) | Not yet registered | Add prompts once IDs assigned |
| UI components (Batch 12) | Intentional *briefs*, not prompts | OK — flag clearly as "assembled, not generated" |
| Motion & Audio (Batch 14) | Derived | OK — no prompt by design |
| Individual set members (e.g., each of 9 mudras) | Covered by master + member list | OK — but ensure each member's Subject is spelled out before running |
| Per-production title lockups (5) & OB name plates (13) | Generic prompt only | Add per-item Subject list (names differ) |

**Net: ~16 genuinely missing prompts** (404 + the 15 new assets), plus a reminder that set-member Subjects must be enumerated at run time.

---

## 6 · DUPLICATE & OVERLAPPING ASSETS
Produce **once**, reference everywhere. Some are already flagged with `=` in the inventory (good); these are the ones still ambiguous or genuinely redundant.

| Redundancy | Instances | Resolution |
|---|---|---|
| **Vignette** | `LGT-08` (overlay) **=** `HERO-10` (hero vignette) | Delete `HERO-10`; it's `LGT-08` applied. |
| **God-rays** | `LGT-02` **=** `HERO-09` (hero god-ray overlay) | `HERO-09` = an instance of `LGT-02`; don't re-generate. |
| **Oil lamp** | `LGT-01` render, `D3-01` 3D, `FTR-03` diya accent, `LGT-09` diya row, loader origin | One master lamp (`LGT-01`); all others *derive* from it. |
| **Portrait frame** | `MAN-03` **=** `OB-02` **=** `ALM-02` | Single 7-tint set; OB/ALM just consume it. |
| **Anjali mudra** | `BN-01` set member **=** `BN-03` emblem **=** `FTR-02` | Same glyph at two scales; produce once, scale up for footer. |
| **Kolam divider** | `KOL-02` **=** `DIV-01` | One asset. |
| **Threshold mandala** | `MAN-02` **=** `DIV-04` | One asset. |
| **Gold hairline** | `BOR-05` **=** `FTR-04` **=** part of `GLD-02` | One rule primitive. |
| **Scroll cue** | `HERO-07` **=** earlier `SCR-05` | One asset; consolidate ID to `HERO-07`. |
| **Film grain** | `TEX-07` referenced in Textures **and** Particles batches | One tile; shared, not duplicated — note the shared reference. |
| **Silk** | `TEX-02` tile vs `HERO-03` lit field | *Not* duplicates — `HERO-03` must be built *from* `TEX-02`. Record the dependency. |
| **OG card** | `BRD-09` **=** `SOC-07` | One template. |
| **Hero film loop** | `HERO-11` **=** `PHO-05` | One capture. |

**Net dedupe: ~12 redundancies collapse to shared masters → ~15–18 fewer discrete files to produce.**

---

## 7 · STYLE INCONSISTENCIES

| Issue | Detail | Fix |
|---|---|---|
| GSC "cinematic 2.39:1 / shallow DOF" applied globally | Contradicts flat SVG icons & seamless tiles | Already handled by the v2.0 **override note**; make that note canonical in every prompt doc. |
| **Two icon libraries in current code** | `lucide-react` + `@tabler/icons-react` both installed | Redesign uses ONE custom brass-line set (Batch 01). Drop both libs. |
| **Undefined `text-navy-800`** in existing components | Vision/OfficeBearers use a Tailwind color that isn't defined → renders as default | Redesign defines the palette as tokens; map "navy" → Ni Indigo `#1C2A57`. Don't carry the bug forward. |
| **Raw `/src/assets/...` image paths** in current Events components | 404 in production | Redesign imports assets; ensure the new build never uses string paths. |
| Swara→hue table | Consistent across docs (good) — but defined only in the bible | Promote to a standalone **`swara-tokens`** table all tinted assets cite (frames, glyphs, nav pills, ring). |
| Gold gradient stops | Bible uses `#8A6A25→#C9A24B→#EBD08A`; some docs abbreviate to `#C9A24B` only | Mandate the **3-stop gradient** everywhere gold is a fill/metal. |
| Aspect-ratio vocabulary | Mixed "2.39:1" vs "21:9" vs "cinematic" | Standardize: **2.39:1** (letterbox scenes), **21:9** (dividers/banners), **16:9/9:16** (backgrounds), **4:5** (portraits), **1:1** (icons/ornaments/tiles). |

---

## 8 · ASSETS THAT SHOULD BE GENERATED TOGETHER
Beyond the family batching already in the roadmap, these **cross-category clusters must share a single run/seed** to stay identical — currently they're split across categories:

1. **Swara-tinted cluster** — swara glyphs (7) + swara ring + portrait frames (7) + nav-pill active states (7). Lock the 7 hues **in one sitting** or the tints drift between nav, frames, and glyphs.
2. **Atmospheric Overlay Kit** — vignette + god-rays + rim gradients + spotlight cone + lens flare + film grain. Same haze density, warmth, and falloff must match; generate as one overlay set (currently spread across Lighting/Particles/Atmosphere).
3. **Lit-brass object family** — lamp + veena + mridangam + ghatam + jewelry + diya row + logo-on-brass (Batch 07 — already grouped; reaffirm same key/rim/patina).
4. **Rim-lit silhouette family** — dancers + instruments + gopuram + ensemble (Batch 06 — already grouped).
5. **Bilingual typography session** — Latin wordmark + Tamil lockup + production titles (5) + OB name plates + footer lockup + hashtag lockup. One type session guarantees identical serif treatment and Tamil quality.
6. **Kolam/line-ornament family** — all Family-A vectors (Batches 01–02) off one stroke spec.
7. **Portrait-shoot cluster** — OB (13) + alumni (9) portraits in **one lighting setup**, one LUT, one day.
8. **Social template family** — all 10 SOC + poster off one grid, after brand + photography exist.

---

## 9 · ASSETS THAT SHOULD BE GENERATED LAST
Ordered by dependency (each needs upstream outputs approved first):

| Order (last→) | Asset group | Depends on |
|---|---|---|
| 1 | **Hero composite** (`HERO-01/02/04`) | Silk field, lamp/veena render, particles, overlays |
| 2 | **Social & marketing** (SOC + poster) | Brand marks + photography |
| 3 | **UI components** (Batch 12) | Icon/line families + textures |
| 4 | **3D models** (Batch 13) | Batch-07 renders + textures as PBR |
| 5 | **Motion & audio** (Batch 14) | ALL static masters (it animates them) |
| 6 | **Sound-reactive & cursor & experience-gate polish** | Everything + audio bed |

**Rule:** nothing in this list is a "generation," it is an **assembly** — so it must never start before its inputs are locked, regardless of eagerness.

---

## 10 · THE OPTIMIZED PIPELINE (canonical, deduped, gap-filled)

### 10.1 Four canonical decisions (adopt these as law)
1. **IDs:** `MASTER_ASSET_INVENTORY.md` scheme is canonical. Crosswalk in §10.4.
2. **Batches:** `ASSET_PRODUCTION_ROADMAP.md` 15-batch scheme (00–14) is canonical run order. `GENERATION_PIPELINE.md` = rationale only.
3. **GSC:** the **bible's verbatim** Global Moodboard Constraints is the one `{{GSC}}`.
4. **Count:** ~219 line items / ~515 files (after §3 additions and §6 dedupe).

### 10.2 Corrected batch sequence (with fixes folded in)
```
B00  Style Anchor Board  ─ GATE (adds: keyline sheet + 7-hue swatch + type specimen)
      ↓ approve, pin as reference to all
B01  Brand Marks & Icons              (Family A · ★)   ← includes NAV/SYS icons
B02  Kolam · Borders · Geometry · Line-Ornaments (A · ★)
B03  Ceremonial Color Ornaments       (A-color · ★★)  ← LOCK 7 swara hues here (§8.1)
B04  Material & Texture Library        (C · ★★)
B05  Particles & Overlay Kit          (C · ★★)         ← MERGE all overlays here (§8.2)
B06  Silhouettes & Figurative Shapes  (B · ★★★)
B07  Lit Metal Hero Objects           (B · ★★★★)
B08  Cinematic Atmosphere & Backgrounds(B · ★★★★)     ← re-add SYS-05 404 scene
B09  Hero Composite Scenes            (B · ★★★★)  [ASSEMBLY]
B10  Art-Directed Photography         (capture · ★★★★★)  ← START SCHEDULING AT B00
B11  Social & Marketing Templates     (assembly · ★★★)
B12  UI Components & Decorative        (assembly · ★★★)  ← add map frame, gate, consent, join form
B13  3D Models                        (3D · ★★★★★)
B14  Motion & Audio                   (derived · ★★★★)
```

### 10.3 Efficiency wins baked in
- **Merge overlays into B05** ("Particles & Overlay Kit") → one warm-haze calibration instead of three.
- **Lock swara hues in B03** → every tinted asset downstream cites the same 7 values.
- **Dedupe (§6)** removes ~15–18 files with zero quality loss.
- **Foundation-first:** B00–B02 (~106 files, ~40% Global reuse) unblock the most surface area per hour — finish them 100% before B06+.
- **Parallel track:** photography scheduling + 3D scoping run *alongside* B00–B05 (long lead), converging at B10/B13.

### 10.4 ID crosswalk (old → canonical) — publish and freeze
| Concept | Pipeline/Prompts ID | **Canonical (Inventory) ID** |
|---|---|---|
| Veena icon | INS-01 | part of **INS-01** (icon set) |
| Veena render | INS-02R | **INS-04** |
| Veena hero line | INS-02 | **INS-02** |
| Mridangam render | INS-08R | **INS-05** |
| Kolam divider | KOL-02 / DIV-01 | **KOL-02** (=DIV-01) |
| Portrait frame | MAN-03 | **MAN-03** (=OB-02=ALM-02) |
| Oil lamp render | LGT-01 | **LGT-01** |
| OG card | BRD-07/09 | **BRD-09** (=SOC-07) |
| 404 scene | SYS-05 | **SYS-05** (re-registered) |
*(Extend this table to every divergent ID; store it at the top of the inventory.)*

---

## 11 · ACTION PUNCH-LIST (do in this order)

**Before any generation (½ day, doc-only):**
1. [ ] Adopt the four canonical decisions (§10.1); add the crosswalk (§10.4) to the inventory header.
2. [ ] Update `GENERATION_PROMPTS.md` GSC → bible verbatim; add the override note.
3. [ ] Register the §3 missing assets + assign canonical IDs; add their prompts (§5).
4. [ ] Apply the §6 dedupe (delete `HERO-09/10` as standalones; mark derivations).
5. [ ] Promote the **swara-hue table** and **3-stop gold gradient** to a standalone tokens block.
6. [ ] **Route the open decision:** Workshops/Competitions as Events tabs or standalone sections? Join mechanism = form vs audition/DM link? *(needs a human answer — see below.)*

**Then (production):**
7. [ ] Produce & approve **B00** (expanded: anchor + keyline + swatch + type specimen).
8. [ ] Scope the **photography shoot** (shot list, LUT reference) — longest lead.
9. [ ] Run **B01→B02** to completion (highest leverage).
10. [ ] Pilot a **single vertical slice** (Hero + one section, end-to-end incl. UI + motion) to validate the whole pipeline *before* mass production.

## 12 · RISK NOTE & PILOT RECOMMENDATION
This is a **from-scratch cinematic rebuild**, an order of magnitude larger than the current site (a small React brochure whose build is presently **broken** — the `OfficeBearers.jsx` imports point at deleted `src/assets/OB/*` files now living in `src/assets/others/`, and Events uses production-breaking raw `/src/...` paths). Two implications:
- **Fix or formally shelve the current build** so "production" has a clean baseline; don't generate 500 assets against a repo that won't compile.
- **De-risk with a pilot slice.** Before committing to ~515 files, build ONE movement (Pushpanjali/Hero) fully — assets → components → motion → audio → performance budget — and pressure-test the whole system (does the gold read on real devices? does the tambura drone respect autoplay? is LCP acceptable with the silk hero?). Adjust the bible/roadmap from what you learn, *then* scale.

---

## AUDIT SUMMARY
| Finding class | Count | Net effect |
|---|---|---|
| Critical inconsistencies | 4 | Fix first — doc-only, ½ day |
| Missing assets | ~15 | +25 files |
| Missing sections | 4–6 | Needs one routing decision |
| Missing prompts | ~16 | Add after IDs assigned |
| Duplicates collapsed | ~12 | −15–18 files |
| Consolidated run-clusters | 8 | Major consistency gain |
| **Canonical total after fixes** | — | **~219 line items ≈ 515 files** |

*Saptham — where the seven notes become light.*
*Production Audit v1.0 · Fix the four drifts, fill the gaps, then generate.*

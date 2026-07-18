# SAPTHAM — CANON
### Single source of truth · resolved decisions · change record · v1.0
**This document has final authority. When any other document conflicts with `CANON.md`, `CANON.md` wins.** It resolves the four drifts found in `PRODUCTION_AUDIT.md`, records the user's routing decisions, and registers the assets/sections those decisions add.

---

## 0 · PRECEDENCE
Order of authority: **`CANON.md`** → `DESIGN_BIBLE.md` → `MASTER_ASSET_INVENTORY.md` → `ASSET_PRODUCTION_ROADMAP.md` → `PROMPT_LIBRARY.md` → (`GENERATION_PIPELINE.md`, `GENERATION_PROMPTS.md`, `ASSET_PRODUCTION_CHECKLIST.md` = rationale/history).

---

## 1 · THE FOUR CANONICAL DECISIONS (now law)

| # | Decision | Canonical choice |
|---|---|---|
| 1 | **Asset IDs** | `MASTER_ASSET_INVENTORY.md` scheme. Crosswalk in §5. |
| 2 | **Batch scheme / run order** | `ASSET_PRODUCTION_ROADMAP.md` — 15 batches (00–14). `GENERATION_PIPELINE.md` is rationale only. |
| 3 | **Global Style Constraints `{{GSC}}`** | The Design Bible's **verbatim** Global Moodboard Constraints (reproduced §3). All docs harmonized. |
| 4 | **Asset count** | **≈ 235 line items ≈ 530 files** (after the §6 additions and §7 dedupe). Retire "~190". |

---

## 2 · DESIGN TOKENS (single source — all tinted/gold assets cite this)

### Core palette
`Garbhagriha Black #0E0B08` · `Sabha Charcoal #171310` · `Temple Granite #2A241D` · `Vibhuti Ivory #F4EDE0` · `Chandana Sand #E5D6B8` · `Kumkum Crimson #9B1C2E` · `Alta Vermillion #D64027`.

### Gold — always the 3-stop gradient (never a flat single value for metal/fills)
`Brass Umber #8A6A25` → `Saptham Gold #C9A24B` → `Deepam Gold #EBD08A`.

### Swara 7-hue spectrum (LOCK in Batch 03; every swara-tinted asset uses these exact values)
| Sa | Ri | Ga | Ma | Pa | Da | Ni |
|---|---|---|---|---|---|---|
| `#C9A24B` gold | `#C57B26` ochre | `#14604E` emerald | `#0E5A63` teal | `#9B1C2E` crimson | `#5E2E52` plum | `#1C2A57` indigo |

**Applies to:** swara glyphs, swara ring, portrait mandala frames (7), nav-pill active states, calendar event dots, section keys. Generate all swara-tinted assets in one sitting so tints never drift.

---

## 3 · CANONICAL `{{GSC}}` (verbatim from the bible)
> *warm candlelit chiaroscuro lighting, 2700–3200K, deep warm near-black background (#0E0B08), antique temple-brass gold (#C9A24B) accents, single directional key light, rich deep shadows, small controlled specular highlights, subtle incense haze and drifting gold-dust particles, cinematic 2.39:1 or 3:2 framing, shallow depth of field, film grain, no flash, no cold blue light, no neon, no clutter, museum-grade, luxurious, restrained.*

**Override note:** flat-vector/texture assets specialize the chiaroscuro/DOF clause via their per-asset Lighting/Background/Texture fields; palette, gold law, warmth, restraint, prohibitions always hold.

---

## 4 · UPDATED SITE MAP (with routing decisions applied)

Public Margam order + the newly-confirmed sections:

```
HERO (Pushpanjali)
INTRO / Disciplines (Alarippu)
VISION (Jatiswaram)
LEGACY (Shabdam — timeline)
OFFICE BEARERS
EVENTS (Varnam — Productions + General)
   ├─ WORKSHOPS      ← NEW · standalone section (per decision)
   └─ COMPETITIONS   ← NEW · standalone section (per decision)
GALLERY
ALUMNI (Padam)
SPONSORS / PATRONS   ← NEW · standalone prestige section
JOIN (Thillana)      ← now a real mechanism: WhatsApp group (audition GForm when live)
CONTACT (+ map)
FOOTER (Mangalam)

── non-public ──
ADMIN CONTROL ROOM   ← NEW · hidden entry + passcode → Events Calendar mgmt + content
```

**Decisions recorded:**
- **Workshops & Competitions = standalone sections** (not Events tabs).
- **Join = WhatsApp group** for now; when auditions open, an admin enables a **Google Form** link. No public audition form until then.
- **Admin = hidden, passcode-gated** control room (spec §6.5) for managing the events calendar and content.

---

## 5 · ID CROSSWALK (old → canonical) — frozen
| Concept | Legacy ID(s) | **Canonical ID** |
|---|---|---|
| Veena icon | INS-01 (pipeline) | member of **INS-01** (icon set) |
| Veena render | INS-02R / INS-04 | **INS-04** |
| Veena hero line | INS-02 | **INS-02** |
| Mridangam render | INS-08R | **INS-05** |
| Kolam divider | KOL-02 / DIV-01 | **KOL-02** (=DIV-01) |
| Threshold mandala | MAN-02 / DIV-04 | **MAN-02** (=DIV-04) |
| Portrait frame | MAN-03 / OB-02 / ALM-02 | **MAN-03** (OB/ALM consume) |
| Anjali | BN-01 member / BN-03 / FTR-02 | **BN-03** (one glyph, scaled) |
| Gold hairline | BOR-05 / FTR-04 | **BOR-05** |
| Oil lamp | LGT-01 | **LGT-01** (source of D3-01, LGT-09, FTR-03, loader) |
| Vignette | LGT-08 / HERO-10 | **LGT-08** (HERO-10 deleted) |
| God-rays | LGT-02 / HERO-09 | **LGT-02** (HERO-09 = instance) |
| OG card | BRD-07 / BRD-09 / SOC-07 | **BRD-09** |
| Hero film loop | HERO-11 / PHO-05 | **HERO-11** |
| Scroll cue | HERO-07 / SCR-05 | **HERO-07** |
| 404 scene | SYS-05 | **SYS-05** (re-registered §6.6) |

---

## 6 · NEWLY REGISTERED SECTIONS & ASSETS
Batch = the canonical roadmap batch. Prompts open with `{{GSC}}`; NEG presets per `GENERATION_PROMPTS.md`.

### 6.1 Workshops (standalone) — `[Batch 08 + 12]`
| ID | Asset | Prompt (subject + key fields) | Pri |
|---|---|---|---|
| WRK-01 | Workshop section backdrop | `{{GSC}}` a dim mentoring scene — a guru and student implied as rim-lit silhouettes in a warm-lit mandapam, deep negative space; 21:9; opaque; NEG-B. | H |
| WRK-02 | Workshop card frame | Brass-line card with arch header (reuses ARC-03), swara-teal (Ma) accent; SVG; assembly. | H |
| WRK-03 | Workshop icon | `{{GSC}}` a gold monoline icon of a teaching mudra + a tuning peg, 32px grid, flat, transparent; NEG-A. | M |
| WRK-04 | Schedule module chrome | Timetable UI (day/time rows) in brass-line, Tala spacing; assembly. | M |

### 6.2 Competitions (standalone) — `[Batch 08 + 12]`
| ID | Asset | Prompt (subject + key fields) | Pri |
|---|---|---|---|
| CMP-01 | Competition backdrop | `{{GSC}}` a spotlit solo performer facing a dim implied audience/jury, cinematic tension, 21:9, opaque; NEG-B. | M |
| CMP-02 | Competition card frame | Brass-line card, crimson (Pa) accent, winner-highlight variant; SVG; assembly. | M |
| CMP-03 | Trophy / medallion ornament | `{{GSC}}` a lit aged-gold medallion with a lotus-and-veena emblem, jewelry-grade, black bg, 1:1, PNG alpha; NEG-B. (Shares GLD-06.) | M |
| CMP-04 | Results / leaderboard ornament | Ranked-list chrome with gold rank markers; assembly. | M |
| CMP-05 | Competition icon | `{{GSC}}` gold monoline icon (crossed nadaswaram + laurel/mango-leaf), flat, transparent; NEG-A. | M |

### 6.3 Sponsors / Patrons (standalone) — `[Batch 08 + 12]`
| ID | Asset | Prompt (subject + key fields) | Pri |
|---|---|---|---|
| SPN-01 | Sponsor wall / plinth | `{{GSC}}` a restrained marble-and-gold plinth wall in warm museum light, empty framed niches to hold external logos, prestige, 16:9, opaque; NEG-B. | H |
| SPN-02 | Sponsor tier badge | `{{GSC}}` gold/silver/bronze circular tier seals with a swara motif, jewelry-grade, 1:1, PNG alpha; NEG-B. (3 tiers.) | M |
| SPN-03 | Sponsor logo holder frame | Neutral brass-line frame that holds a partner's own logo gracefully on dark; SVG; assembly. | H |
| SPN-04 | "Become a Sponsor" CTA | Gold-ignite CTA block + prestige copy zone; assembly. | M |

### 6.4 Join — WhatsApp (Thillana) — `[Batch 12]`
| ID | Asset | Prompt (subject + key fields) | Pri |
|---|---|---|---|
| JOIN-01 | WhatsApp Join CTA block | `{{GSC}}` a warm gold-ignite CTA "Join the Saptham WhatsApp" with a gold-line WhatsApp glyph matched to the icon family + a framed QR slot; assembly + SVG glyph; NEG-A. Links to the club's WhatsApp group invite (URL set in config). | C |
| JOIN-02 | Audition Google-Form embed (admin-toggled) | Manuscript-styled embed wrapper for a Google Form, shown only when an admin flips `auditionsOpen`; assembly. | H |

> **Hero "Join Us" button** (dead on the current site) now links to `JOIN-01` / the JOIN section. No more no-op CTA.

### 6.5 ADMIN CONTROL ROOM + EVENTS CALENDAR (non-public) — `[Batch 12, functional]`

**Intent (from the club):** a hidden admin affordance — invisible to normal visitors — that, on a secret action + passphrase, opens a control room where admins add events to a **website calendar**, toggle the **audition Google Form**, and update key content when an event is coming.

| ID | Asset | Spec | Pri |
|---|---|---|---|
| ADM-01 | Hidden entry trigger | **Secret route** `/#/control-room` (not linked anywhere) **and** a fallback gesture (7 clicks on the footer blessing glyph `FTR-01`). Invisible to users; no visible admin button in the layout. | C |
| ADM-02 | Passcode modal | Brass-line modal: single passphrase field → verify → unlock. Passphrase stored in env var `VITE_ADMIN_PASSCODE` (see security note). | C |
| ADM-03 | Admin dashboard chrome | Dark manuscript panel: tabs for Calendar / Auditions toggle / Content. Assembly. | C |
| ADM-04 | Event editor form | Add/edit/delete an event (title, date, time, venue, description, category, poster). Assembly. | C |
| ADM-05 | Content-edit controls | Inline edit for key mutable copy (announcements banner, hero tagline). Assembly. | M |
| CAL-01 | Calendar month-view UI | Brass-line month grid, Tala spacing, swara-tinted today marker. Assembly. | H |
| CAL-02 | Event dot / marker | `{{GSC}}` small swara-tinted gold event dots/markers (per §2 hues by category), flat, transparent; NEG-A. | H |
| CAL-03 | Event detail popover | Arch-framed popover (reuses ARC-03) with event info + poster. Assembly. | H |
| CAL-04 | Calendar empty-state | Quiet kolam-and-lamp "no events yet" ornament. `{{GSC}}` gold line, transparent; NEG-A. | M |

**🔐 SECURITY — read before building (this overrides any "just hardcode it" impulse):**
1. **A client-side passphrase is obscurity, not security.** Anything shipped in the SPA bundle (including `VITE_*` env values, which Vite inlines at build time) is readable by anyone who opens dev-tools. This directly conflicts with `SECURITY_REPORT.md`'s rule: *do not ship an unauthenticated edit surface.*
2. **The passphrase is therefore NOT committed to the repo.** It lives only in `VITE_ADMIN_PASSCODE` in a local/host `.env` (git-ignored). The club sets its chosen value there. Treat it as a **soft lock for a low-stakes convenience UI only** — good enough to keep casual visitors out of the panel, not to protect real data.
3. **For events to persist for ALL visitors, you need a shared store — the passphrase alone cannot do that.** Two honest paths:
   - **Recommended (zero real-auth, simplest, safe): Google Calendar / Google Sheet as the backend.** Admins manage events in a shared Google Calendar (or Sheet); the site *reads* it (embed or API). The hidden passcode panel then mainly surfaces the "manage in Google" links + the auditions toggle. No secret worth stealing ships in the bundle.
   - **Full in-site CRUD: add real auth + a database** (Supabase or Firebase, free tier). The hidden route stays as the entry UX, but writes are gated by *server-side* auth, not the client passphrase. Choose this only if the club wants everything inside the site.
4. **Decision still needed:** which backend (Google Calendar/Sheet vs Supabase/Firebase)? Until chosen, build `CAL-*`/`ADM-*` against a local JSON stub so the UI is ready, but **do not ship** the passcode-only version as if it secures real data.

### 6.6 System & misc gaps — `[Batch 08 / 12]`
| ID | Asset | Prompt / spec | Pri |
|---|---|---|---|
| SYS-05 | 404 "Lost Note" scene | `{{GSC}}` a single dim, near-extinguished brass oil lamp in a vast dark hall with one faint drifting gold mote; tiny lamp lower-third, immense negative darkness for the message; low warm ambient; 2560px WEBP, opaque; NEG-B + `bright, cheerful, busy`. | M |
| CON-01 | Contact map frame | Arch/brass frame (reuses ARC-03) wrapping the Google-Maps embed; assembly. | H |
| SYS-06 | Consent / cookie banner | Brass-line dismissible banner; assembly. | M |
| SYS-07 | Skip-link + focus-ring style | Accessible skip-to-content + visible gold focus ring token; assembly. | H |
| SYS-08 | Scroll-to-top control | Small brass-circle button with lotus/upward glyph; SVG + assembly. | M |
| SYS-09 | Experience gate overlay | First-visit "Enter · sound on/off" gate honoring autoplay policy (gates the tambura drone `MOT-07`); `{{GSC}}` a lamp-lit black gate with the wordmark + two choices; assembly + art. | H |
| SYS-10 | Hero video poster | Static first-frame of `HERO-11` to prevent black flash; 2D 4K. | M |
| NAV-01 | Mobile drawer scrim + panel | Dark blurred scrim + granite panel for the mobile menu; assembly. | M |

**New-asset subtotal:** ~34 line items (many are Batch-12 *assembly*, not heavy generation).

---

## 7 · DEDUPE RESOLUTIONS (apply to the inventory)
Delete these as standalone items; they are instances/derivations of a master:
- `HERO-10` → **delete** (use `LGT-08` vignette).
- `HERO-09` → **delete** (instance of `LGT-02` god-rays).
- `FTR-02` → **derive** from `BN-03` (anjali, scaled).
- `DIV-01` / `DIV-04` → **derive** from `KOL-02` / `MAN-02`.
- `FTR-04` → **derive** from `BOR-05`.
- `OB-02` / `ALM-02` → **consume** `MAN-03`.
- `SOC-07` → **use** `BRD-09`.
- `PHO-05` → **use** `HERO-11`.
- Diya row `LGT-09`, footer diya `FTR-03`, loader lamp, `D3-01` → **all derive from** `LGT-01`.
Net: ~12 redundancies collapse (~15–18 fewer files).

---

## 8 · APPLIED-FIXES LOG (what changed in this pass)
1. ✅ **Canonical IDs** declared (inventory scheme) + crosswalk frozen (§5).
2. ✅ **Canonical batch scheme** declared (roadmap 15-batch).
3. ✅ **Canonical `{{GSC}}`** declared (bible verbatim); `GENERATION_PROMPTS.md` GSC block harmonized in-place; `MASTER_ASSET_INVENTORY.md` header now points here.
4. ✅ **Canonical count** set to ≈235 line items / ≈530 files.
5. ✅ **Design tokens** (swara hues + gold gradient) promoted to a single block (§2).
6. ✅ **Routing decisions** recorded: Workshops & Competitions standalone; Join via WhatsApp; hidden Admin + Calendar.
7. ✅ **New sections/assets** registered with prompts/specs (§6).
8. ✅ **Dedupe** resolutions recorded (§7).

### Still open (need a human answer)
- **Admin backend choice:** Google Calendar/Sheet (recommended, zero real-auth) **vs** Supabase/Firebase (full in-site CRUD). Blocks final build of `CAL-*` / `ADM-*` persistence.
- **WhatsApp group invite URL** and the **audition Google-Form URL** (when live) — config values to supply.
- **Current repo baseline:** the existing site's build is broken (`OfficeBearers.jsx` imports deleted `src/assets/OB/*`). Decide: fix the current build, or start the redesign on a clean branch. Do not generate ~530 assets against a repo that won't compile.

---

*Saptham — where the seven notes become light.*
*CANON v1.0 · Final authority. Fix the drifts, fill the gaps, then generate.*

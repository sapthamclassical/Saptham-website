# PERFORMANCE_REPORT.md — Saptham Website

> Historical performance snapshot. The image findings remain useful, but its
> dependency inventory predates the 2026-07 security cleanup.

**Headline:** The JS/CSS footprint is fine; **images are the entire performance story.**
~21 MB of unoptimized images (one 6.3 MB JPG) will wreck LCP and mobile data usage until
compressed. Fixing images is the single highest-leverage performance action.

## Measured build output (verified)
- `dist/assets/index-*.js` — **379.7 KB** (gzip **122.8 KB**)
- `dist/assets/index-*.css` — **58.7 KB** (gzip **10.7 KB**)
- Images — **~21 MB total**, largest offenders:
  - `OB/ashwin.jpg` — **6.3 MB**
  - `OB/ahalya.webp` — **2.5 MB**
  - `OB/Anujan.jpeg` — **0.86 MB**, `OB/dhanyaV.jpg` — **0.72 MB**
  - several gallery images 0.5–0.8 MB each

## Core Web Vitals (predicted)
| Metric | Predicted | Cause |
|--------|-----------|-------|
| **LCP** | Poor | Multi-MB hero/section images load synchronously; no responsive `srcset` |
| **CLS** | Moderate | `<img>` tags lack width/height/aspect-ratio → layout shift as images arrive |
| **INP** | Good | Little JS interactivity; light event handlers |
| **TBT/TTI** | Good | 380 KB JS is modest for React 19 + router + motion |

## Findings & fixes

### 1. Images (CRITICAL)
- **Compress & resize** every asset to its display size (portraits ≤ ~300 KB; gallery ≤
  ~200 KB). Target modern formats (WebP/AVIF).
- Add **explicit `width`/`height`** (or aspect-ratio) to all `<img>` to eliminate CLS.
- Add **`loading="lazy"`** to below-the-fold images (gallery grid, event cards, office
  bearers). Currently **no image is lazy-loaded**.
- Consider responsive `srcset`/`sizes` for the gallery.
- **Office-bearer photos are imported but never displayed** (`OfficeBearers.jsx` renders a
  generic SVG icon instead) — yet the images are still bundled. Either display them or drop
  the imports to reclaim megabytes.

### 2. Code splitting / lazy routes
- The whole app is one bundle. **Route-level `React.lazy` + `Suspense`** for `/events`,
  `/gallery`, `/contact` would trim the initial payload (Gallery imports 50+ images).
- **`Gallery.jsx` statically imports 53 images** at module load — even the home page pays
  for that graph. Lazy-loading the Gallery route defers it.

### 3. Dead code / unused dependencies
- **`swiper`** — installed, never imported. Remove.
- **`@emailjs/browser`** — installed, never imported (form uses Formspree). Remove.
- **Two icon libs** — `lucide-react` **and** `@tabler/icons-react`. Standardize on one.
- **`lib/utils.jsx` `cn()`** — unused by app code. Remove or start using it.
- **`src/index.css`** — empty & unimported. Remove.
- **`GalleryCarousel`** — reachable only via `carouselOpen`, which no control ever sets to
  `true`. Dead UI branch (plus its images).

### 4. Fonts
- No custom web fonts are loaded (uses system/daisyUI defaults) → **no font penalty**. Good.
  If a brand font is added later, use `font-display: swap` + preload.

### 5. Animations
- Framer Motion testimonial carousel uses `Math.random()` **inside render** for rotation,
  causing re-randomization on every render; also animates `filter: blur()` per word (many
  motion nodes). Acceptable at this scale but worth simplifying if the section grows.

### 6. Caching
- Vite emits content-hashed filenames → set **long `Cache-Control: immutable`** on
  `/assets/*` at the host (Netlify/Vercel do this by default). `index.html` stays no-cache.

### 7. Lighthouse quick wins
- Compress images (biggest single win).
- Add `loading="lazy"` + dimensions to images.
- Add `<meta name="description">` and Open Graph tags (SEO/social score).
- Lazy-load the Gallery route.
- Remove dead dependencies to shrink `node_modules`/build graph.

## Expected impact
Image optimization + lazy-loading alone should move mobile Lighthouse Performance from
(estimated) ~40–60 into the 85–95 range, with LCP dropping from seconds to sub-2s on 4G.

# ARCHITECTURE.md — Saptham Website

## 1. What this is
A **single-page marketing/brochure website** for **Saptham**, the official classical
dance & music club of Anna University (CEG). It is a **100% client-side React SPA**
with **no backend, no database, and no authentication**. All content is hard-coded in
component files; the only outbound integrations are a **Formspree** contact endpoint and
a **Google Maps** embed iframe.

## 2. High-level architecture

```
                          ┌──────────────────────────────┐
   Browser                │        index.html            │
   ───────                │  <div id="root"> + main.jsx  │
                          └───────────────┬──────────────┘
                                          │ createRoot().render()
                          ┌───────────────▼──────────────┐
                          │  <StrictMode>                 │
                          │   <BrowserRouter>   (history) │
                          │     <App/>                    │
                          └───────────────┬──────────────┘
                                          │
        ┌─────────────────────────────────┼─────────────────────────────────┐
        │ Navbar (persistent)             │                     Footer (persistent)
        │                          <Routes> (client-side)
        │      ┌───────────────┬───────────┴───────────┬────────────────┐
        │      │ "/"           │ "/events"             │ "/gallery"     │ "/contact"
        │  Hero+Vision+     ProductionEvents        Gallery          ContactUs
        │  OfficeBearers+   + GeneralEvents         (+GalleryCarousel) (Formspree)
        │  Testimonials         │                                          │
        │                    EventCard (shared)                    Google Maps iframe
        └───────────────────────────────────────────────────────────────────┘
```

- **Rendering model:** CSR (client-side rendering). `index.html` ships an empty
  `#root`; React mounts the whole tree in the browser. No SSR, no SSG, no hydration.
- **Routing:** `react-router-dom` v7 `BrowserRouter` with 4 routes. The home route
  composes four sections; the other three are dedicated pages. In-page navigation
  (Vision, Office Bearers) uses `scrollIntoView` anchors, not routes.
- **Styling:** Tailwind CSS **v4** (via `@tailwindcss/vite` plugin + `@import "tailwindcss"`
  in `App.css`) plus **daisyUI v5** component classes. There is **no CSS-in-JS** and only
  ~2 lines of custom CSS.
- **Animation:** `motion` (Framer Motion v12) drives the alumni testimonials carousel.

## 3. Layers / responsibilities

| Layer | Files | Responsibility |
|-------|-------|----------------|
| Bootstrap | `index.html`, `src/main.jsx` | Mount React, install router |
| App shell | `src/App.jsx` | Layout (Navbar/main/Footer) + route table |
| Pages | `Events.jsx`, `Gallery.jsx`, `ContactUs.jsx` | Route-level screens |
| Home sections | `Hero`, `Vision`, `OfficeBearers`, `Testimonials` | Composed under `/` |
| Reusable UI | `EventCard.jsx`, `GalleryCarousel.jsx`, `ui/animated-testimonials.jsx` | Shared presentational components |
| Utility | `lib/utils.jsx` (`cn()`) | Tailwind class merge helper (currently unused by app code) |
| Data | Inline arrays inside components | Officers, events, testimonials — no external data source |
| Assets | `src/assets/**` | Logo, office-bearer photos, gallery images (imported by Vite) |

## 4. Data flow
There is **no dynamic data flow**. Every piece of content is a JavaScript literal defined
inside the component that renders it:
- `OfficeBearers.jsx` → `officers[]`
- `ProductionEvents.jsx` / `GeneralEvents.jsx` → `productionEvents[]` / `events[]`
- `Testimonials.jsx` → `testimonials[]`

The single runtime data path is the **contact form**:

```
ContactUs form (name,email,message)
   → useState(formData)
   → fetch POST https://formspree.io/f/mojwgvjb  (JSON)
   → Formspree delivers email to club inbox
   → setStatus('success'|'error')
```

## 5. State management
Local component state only, via `useState`/`useEffect`. No Redux, Zustand, Context, or
React Query. State is confined to:
- `Navbar`: `isOpen` (mobile menu), `scrolled` (scroll position).
- `Gallery`: `active` category, `modalOpen`, `currentIndex`, `carouselOpen`.
- `ContactUs`: `formData`, `isLoading`, `status`.
- `AnimatedTestimonials`: `active` index.

## 6. Key architectural characteristics
- **Strengths:** tiny, understandable, fast to onboard, modern toolchain (Vite 6,
  React 19), clean component separation, no server to operate.
- **Weaknesses / risks (detail in SECURITY_REPORT & PERFORMANCE_REPORT):**
  1. Events images referenced as raw `"/src/assets/..."` strings → **404 in production**.
  2. Testimonial images reference `/images/testimonials/*.jpg` with **no `public/` folder** → 404 everywhere.
  3. SPA deep-links (`/events`, `/gallery`, `/contact`) require host **rewrite rules**.
  4. ~21 MB of **unoptimized images** bundled (single 6.3 MB JPG).
  5. Content is hard-coded → every edit is a code change + redeploy (no CMS).

## 7. Technology decisions worth knowing
- **Tailwind v4**: configured through the Vite plugin and CSS `@import`, **not** through
  the legacy `tailwind.config.js` (which is vestigial CommonJS and effectively ignored).
- **daisyUI v5**: supplies `btn`, `card`, `menu`, `carousel`, `input` classes.
- **Two icon libraries** are installed (`lucide-react` + `@tabler/icons-react`) — redundant.
- **Dead dependencies**: `swiper` and `@emailjs/browser` are installed but never imported
  (the form uses Formspree via `fetch`).

# COMPONENT_TREE.md — Saptham Website

## Runtime component tree

```
main.jsx
└── <StrictMode>
    └── <BrowserRouter>
        └── <App>
            ├── <Navbar>                         # persistent, all routes
            │     └── lucide-react <Menu>/<X>    # mobile toggle icons
            ├── <main className="pt-20">
            │   └── <Routes>
            │       ├── path="/"  ──────────────► React Fragment
            │       │     ├── <Hero>             # gradient banner, logo, CTAs
            │       │     ├── <section id="vision">
            │       │     │     └── <Vision>     # vision + objectives cards
            │       │     ├── <section id="office-bearers">
            │       │     │     └── <OfficeBearers>   # 13 officer cards (daisyUI carousel)
            │       │     └── <section id="testimonials">
            │       │           └── <Testimonials>
            │       │                 └── <AnimatedTestimonials>   # ui/, Framer Motion
            │       │                       └── @tabler IconArrowLeft/Right
            │       ├── path="/events" ─────────► <Events>
            │       │     ├── <ProductionEvents>       # 4 productions
            │       │     │     └── <EventCard> × 4
            │       │     └── <GeneralEvents>          # 6 events
            │       │           └── <EventCard> × 6
            │       ├── path="/gallery" ────────► <Gallery>
            │       │     ├── grid of <img> (lightbox modal)   # default view
            │       │     └── <GalleryCarousel>               # alternate view (daisyUI)
            │       └── path="/contact" ───────► <ContactUs>
            │             ├── lucide icons (Mail/Phone/MapPin/social)
            │             ├── <form> → Formspree
            │             └── <iframe> Google Maps
            └── <Footer>                          # persistent, all routes
```

## Component catalog

| Component | Type | Props | State | Notes |
|-----------|------|-------|-------|-------|
| `App` | shell | — | — | Layout + `<Routes>` |
| `Navbar` | container | — | `isOpen`, `scrolled` | Mixed route + anchor nav; transparent-over-hero on `/` |
| `Hero` | presentational | — | — | "Join Us" button has **no action** |
| `Vision` | presentational | — | — | Static copy; uses `text-navy-800` (custom color not defined) |
| `OfficeBearers` | presentational | — | — | Maps `officers[]`; daisyUI `carousel`; generic user icon (photos imported but not shown) |
| `Testimonials` | data+view | — | — | Maps `testimonials[]`; **duplicate `id="office-bearers"`** |
| `AnimatedTestimonials` | reusable | `testimonials`, `autoplay=false` | `active` | Framer Motion; `Math.random()` in render; images 404 |
| `Events` | wrapper | — | — | Renders ProductionEvents + GeneralEvents |
| `ProductionEvents` | data+view | — | — | 4 items; images via **raw `/src/...` strings** |
| `GeneralEvents` | data+view | — | — | 6 items; images via **raw `/src/...` strings** |
| `EventCard` | reusable | `title,date,location,description,hideMeta,images` | — | Renders only `images[0]` |
| `Gallery` | container | — | `active,modalOpen,currentIndex,carouselOpen` | Tabbed grid + keyboard-navigable lightbox |
| `GalleryCarousel` | reusable | `images` | — | daisyUI anchor carousel; `<img>` missing `alt` |
| `ContactUs` | container | — | `formData,isLoading,status` | Controlled form → Formspree |
| `Footer` | presentational | — | — | Social links **missing `rel`/`target`** |
| `cn` (`lib/utils`) | util | `...inputs` | — | `twMerge(clsx(...))`; **unused** |

## Reuse map
- **`EventCard`** — reused by `ProductionEvents` (×4) and `GeneralEvents` (×6).
- **`AnimatedTestimonials`** — generic; could be reused for any testimonial set.
- **`GalleryCarousel`** — reused per category, but currently only reachable via a
  `carouselOpen` state that no button sets to `true` (effectively dead UI path).

## Coupling notes
- `Navbar` is coupled to route knowledge (`useLocation`) and to DOM ids
  (`vision`, `office-bearers`) for anchor scrolling.
- The **duplicate `id="office-bearers"`** on both `OfficeBearers` and `Testimonials`
  sections means `document.getElementById("office-bearers")` resolves to the **first**
  match, so the navbar "Office Bearers" anchor is correct but the ids are still invalid HTML.
- Content and presentation are **not separated** — data arrays live inside view components.

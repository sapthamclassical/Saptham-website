# IMPROVEMENT_ROADMAP.md — Saptham Website

> Historical roadmap. Several dependency, deployment, routing, and backend
> items are complete; current security actions live in `docs/SECURITY_REPORT.md`.

Ordered by effort. Items marked **[BLOCKER]** must be done before a real production deploy.

## Quick wins (≈1 hour each)
1. **[BLOCKER] Fix Events images** — replace raw `"/src/assets/..."` strings in
   `ProductionEvents.jsx` & `GeneralEvents.jsx` with `import`ed assets (like `Gallery.jsx`).
2. **[BLOCKER] Fix testimonial images** — add the 9 photos to `public/images/testimonials/`
   (or import from `src/assets`); currently 404.
3. **[BLOCKER] Add SPA routing config** — `public/_redirects` (`/* /index.html 200`) for
   Netlify, or `vercel.json` rewrite.
4. **Fix duplicate `id="office-bearers"`** — `Testimonials.jsx` should use `id="testimonials"`
   (App already wraps it in a `<section id="testimonials">`, so remove the inner id).
5. **Footer link hardening** — add `target="_blank" rel="noopener noreferrer"` to social links.
6. **Add SEO meta** — `<meta name="description">`, Open Graph/Twitter tags, and fix the
   favicon (`type="image/svg+xml"` currently points at a `.png`).
7. **Remove dead code** — delete empty `src/index.css`; drop unused deps `swiper`,
   `@emailjs/browser`; pick one icon library.
8. **Wire the "Join Us" button** (Hero) — currently does nothing; link to a form/WhatsApp/IG.
9. **Replace default README** with a project-specific one (setup, deploy, editing content).

## Medium improvements (≈1 day)
1. **Image optimization pipeline** — compress/resize all assets (target ≤200–300 KB), add
   `loading="lazy"` + explicit dimensions to every `<img>` to kill CLS and cut LCP.
2. **Lazy-load routes** — `React.lazy`/`Suspense` for `/events`, `/gallery`, `/contact`
   (Gallery pulls 53 images at import time).
3. **Extract content to data files** — move `officers`, `events`, `testimonials`, gallery
   maps into `src/data/*.js` (or JSON) so content edits don't require touching JSX.
4. **Decide OfficeBearers photos** — either display the imported portraits (they're bundled
   but unused) or remove the imports to save weight.
5. **Form UX** — add inline validation, disabled-until-valid, and clearer success/error
   states; enable Formspree spam protection.
6. **Accessibility pass** — add `alt` to `GalleryCarousel` images, focus-trap the Gallery
   lightbox modal, ensure keyboard operability and visible focus rings.
7. **CI** — GitHub Action running `npm ci && npm run lint && npm run build` on PRs, plus
   `npm audit`.

## Major improvements (≈1 week)
1. **Headless CMS for content** — integrate a free CMS (e.g. Sanity, Contentful free tier,
   or Decap/Netlify CMS) so non-developer secretaries can edit events, office bearers, and
   testimonials without code changes. Highest long-term maintenance win.
2. **TypeScript migration** — the ESLint config already hints at it; adds safety as more
   students contribute.
3. **Design-system cleanup** — define the custom colors actually used (`text-navy-800`,
   brand orange/purple) as Tailwind theme tokens; today `navy-800` isn't defined and silently
   renders as default text color.
4. **Testing** — add Vitest + React Testing Library for the interactive bits (Navbar menu,
   Gallery lightbox, Contact form) and Playwright smoke tests for the 4 routes.
5. **Analytics & error monitoring** — privacy-friendly analytics (Plausible/Umami) + a
   lightweight error boundary and Sentry (free tier).

## Long-term roadmap
- **Events calendar / RSVP** backed by a serverless function + lightweight DB (or a Google
  Sheet/Form) so upcoming events are dynamic.
- **Member portal** — authenticated area for practice schedules, resources, attendance.
- **Media/press page** — YouTube performance embeds, recordings, program booklets.
- **Blog / "Saptham Journal"** — articles on classical arts, alumni spotlights (SEO magnet).
- **Newsletter signup** integrated with the club's mail tooling.
- **PWA** — installable, offline-capable brochure for on-campus events.

## Future features suited to a modern college-club site
- Interactive **event archive timeline** (Payanam → Vishwam → Rasaleela → Yaathra → …).
- **Ticketing / registration** for annual productions.
- **Alumni network** map + directory.
- **"Prema Vaibhavam"** and any newer productions promoted to first-class Events entries
  (currently Prema Vaibhavam exists only in the Gallery, not on the Events page).
- **Dark mode** (daisyUI already ships `light`/`dark` themes — wire a toggle).
- **Multilingual** (Tamil/English) content toggle.

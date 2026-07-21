# Saptham Website

Premium website for Saptham, the classical music and dance club of CEG, Anna
University. The project is a React/Vite single-page application with a
cinematic visual system, route-level animations, Supabase-backed CMS data, and
bundled fallbacks so the public site continues to render even when the backend
is not configured.

## Highlights

- React 19 + Vite application with lazy-loaded routes.
- Tailwind CSS v4 and DaisyUI styling, with a custom Saptham design system.
- Motion-rich UI using Motion, GSAP ScrollTrigger, Lenis smooth scrolling, and
  canvas-based ambient effects.
- Supabase CMS integration for office bearers, alumni, calendar events, and
  future content sections.
- JSON and local asset fallbacks for reliable first paint and offline-friendly
  development.
- Hidden Supabase-authenticated admin flow for managing the season calendar.
- Separate TypeScript creative asset pipeline under `saptham-pipeline/`.

## Tech Stack

- React
- Vite
- React Router
- Tailwind CSS
- DaisyUI
- Motion
- GSAP
- Lenis
- Supabase
- TypeScript for repository/backend types and pipeline tooling

## Architecture

The website is a client-rendered SPA.

```text
index.html
  -> src/main.jsx
    -> BrowserRouter
      -> src/App.jsx
        -> global shell
        -> route pages
        -> section components
        -> data hooks
        -> Supabase repositories with fallback data
```

`src/App.jsx` owns the global layout, route transitions, navigation shell,
smooth scrolling, custom cursor, scroll progress, and page routing.

Routes are split by page:

- `/` - home
- `/events` - productions and festival performances
- `/gallery` - category-based photo gallery
- `/office-bearers` - current team roster
- `/alumni` - alumni roster and testimonials
- `/contact` - contact form and location
- `/calendar` - public season calendar and admin editing surface

## Repository Structure

```text
.
|-- docs/                 Project, design, deployment, security, and pipeline docs
|-- public/brand/         Favicons, web manifest assets, and public brand files
|-- scripts/              Database and brand maintenance scripts
|-- saptham-pipeline/     TypeScript creative production engine
|-- src/
|   |-- assets/           Gallery photos, portraits, logos, and hero media
|   |-- components/       UI sections, shared components, motion, brand, stage effects
|   |-- data/             JSON fallback data and Supabase repositories
|   |-- hooks/            Content hooks and in-memory content cache
|   |-- lib/              Supabase client, motion constants, scroll, gallery, people helpers
|   `-- routes/           Route-level page components
|-- supabase/             SQL migrations, RLS, grants, storage, seed, bundled SQL
|-- package.json          Website scripts and dependencies
|-- vite.config.js        Vite configuration and manual chunks
`-- tsconfig.json         Type checking for TypeScript source files
```

## Important Source Areas

- `src/components/stage/Stage.jsx` contains the reusable cinematic primitives:
  atmosphere layers, particles, beams, orbs, character reveals, mandala rings,
  kolam knots, sound waves, and GSAP scroll helpers.
- `src/components/motion/` contains shared animation wrappers such as reveal,
  stagger, parallax, magnetic hover, and tilt cards.
- `src/components/shared/PersonCard.jsx` renders office bearer and alumni cards.
- `src/lib/gallery.js` auto-discovers gallery images at build time with
  `import.meta.glob`.
- `src/lib/people.js` auto-maps portraits by normalized person name.
- `src/hooks/useContent.js` caches content requests and seeds UI state from
  fallback JSON before Supabase resolves.
- `src/data/repositories/` is the CMS data-access layer.
- `src/lib/supabase.ts` creates the browser Supabase client when env vars exist.

## Data Flow

The app follows a Supabase-first, fallback-safe model:

1. Components call hooks from `src/hooks/useContent.js`.
2. Hooks seed initial UI state from local JSON or empty arrays.
3. Hooks call repository functions in `src/data/repositories/`.
4. Repositories query Supabase when `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_PUBLISHABLE_KEY` are configured.
5. On missing env vars, network errors, empty migrated tables, or API errors,
   repositories return local fallback data.
6. UI components render the same shape regardless of source.

Currently visible content uses:

- `office_bearers` with `src/data/officeBearers.json` fallback.
- `alumni` with `src/data/alumni.json` fallback.
- `calendar_events` for the season calendar.
- Local gallery files discovered from `src/assets/Gallery/`.
- Static event constants for the public Events page.

Repository support also exists for announcements, achievements, settings,
events, event gallery, and contact messages.

## Supabase Integration

Supabase SQL lives in `supabase/`.

Key files:

- `supabase/migrations/20260718090001_schema.sql` - tables, enums, triggers,
  and `public.is_admin()`.
- `supabase/migrations/20260718090002_rls.sql` - row-level security policies.
- `supabase/migrations/20260718090004_grants.sql` - table grants required by
  PostgREST.
- `supabase/migrations/20260718090003_storage.sql` - public storage buckets and
  storage policies.
- `supabase/migrations/20260719100001_calendar_admin.sql` - calendar table and
  admin auth bootstrap.
- `supabase/seed/0001_seed.sql` - generated seed data.
- `supabase/apply_all.sql` - generated SQL bundle.

The public anon key is safe in the browser because access is constrained by RLS.
Never commit a service role key.

## Admin Flow

The admin surface is intentionally hidden from normal navigation.

- `Footer.jsx` attaches a secret click gesture to the footer copyright mark.
- `AdminGate.jsx` opens a password modal.
- `adminAuth.js` signs in to Supabase using the fixed admin email.
- Calendar writes in `CalendarPage.jsx` are allowed only when RLS sees an
  authenticated admin user.

## Build And Quality

Common commands:

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
```

Database commands:

```bash
npm run db:seed
npm run db:bundle
npm run db:migrate
npm run db:verify
```

The root project currently has no `test` script. The separate creative pipeline
has its own test command inside `saptham-pipeline/`.

## Creative Pipeline

`saptham-pipeline/` is a separate Node/TypeScript package for managing the
asset-generation canon, prompt cards, providers, storage, review, indexing, and
publishing workflow.

Run it from its own directory:

```bash
cd saptham-pipeline
npm install
npm run canon:load
npm run typecheck
npm test
```

Provider credentials are optional until generation commands are used. See
`saptham-pipeline/.env.example` and `saptham-pipeline/README.md`.

## Documentation

Useful docs:

- `docs/ARCHITECTURE.md`
- `docs/COMPONENT_TREE.md`
- `docs/DEPLOYMENT_GUIDE.md`
- `docs/MAINTAINER_GUIDE.md`
- `docs/SECURITY_REPORT.md`
- `supabase/README.md`
- `docs/pipeline/SYSTEM_ARCHITECTURE.md`

For step-by-step local setup and full project operation, read `HOW_TO_RUN.md`.

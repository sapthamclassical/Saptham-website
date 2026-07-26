<p align="center">
  <img src="public/brand/saptham-gold.svg" alt="Saptham" width="420" />
</p>

<h1 align="center">Saptham</h1>

<p align="center">
  The official digital home of the Classical Music &amp; Dance Club of the
  College of Engineering Guindy, Anna University.
</p>

<p align="center">
  <a href="https://saptham-website.pages.dev/"><strong>Visit the live website</strong></a>
  &middot;
  <a href="#getting-started">Local setup</a>
  &middot;
  <a href="#deployment">Deployment</a>
  &middot;
  <a href="#documentation">Documentation</a>
</p>

<p align="center">
  <img alt="React 19" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&amp;logoColor=0B0806" />
  <img alt="Vite 6" src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&amp;logoColor=white" />
  <img alt="Supabase" src="https://img.shields.io/badge/Backend-Supabase-3FCF8E?logo=supabase&amp;logoColor=white" />
  <img alt="Cloudflare Pages" src="https://img.shields.io/badge/Hosted_on-Cloudflare_Pages-F38020?logo=cloudflarepages&amp;logoColor=white" />
  <img alt="Node 22.22+" src="https://img.shields.io/badge/Node.js-%E2%89%A522.22.0-339933?logo=nodedotjs&amp;logoColor=white" />
</p>

---

## Overview

Saptham is a production React single-page application that presents the club's
Carnatic music, classical dance, performances, people, and lineage through a
responsive, cinematic interface.

The public experience is deployed on Cloudflare Pages. Supabase provides
content, authentication, PostgREST APIs, and media storage, while bundled
fallback data keeps the public website functional during local development or
temporary backend unavailability.

**Production:** [saptham-website.pages.dev](https://saptham-website.pages.dev/)

## Experience

- Cinematic, responsive homepage with motion, parallax, ambient stage effects,
  and touch-playable Sapta Swara strings.
- Dedicated pages for events, galleries, office bearers, alumni, contact
  information, and the public season calendar.
- Supabase-backed content repositories with typed database contracts and local
  JSON fallbacks.
- Restricted calendar management protected by Supabase Auth, database grants,
  and Row Level Security.
- Route-level code splitting, production-safe motion configuration, reduced
  motion support, and keyboard-accessible interactions.
- Branded favicons, social metadata, web manifest, and optimized production
  assets.
- Content Security Policy, HSTS, clickjacking protection, permissions policy,
  and intentional cache rules delivered by Cloudflare Pages.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage, club story, current team, and alumni voices |
| `/events` | Productions, performances, and general events |
| `/gallery` | Categorized performance and club photography |
| `/office-bearers` | Current office bearers |
| `/alumni` | Alumni roster and testimonials |
| `/contact` | Contact form, social links, and location |
| `/calendar` | Public season calendar and authorized management interface |

## Technology

| Layer | Technology |
| --- | --- |
| UI | React 19, React Router 8 |
| Build | Vite 6 |
| Styling | Tailwind CSS 4, DaisyUI, custom design system |
| Motion | Motion, GSAP ScrollTrigger, Lenis |
| Backend | Supabase Auth, PostgREST, PostgreSQL, Storage |
| Contact delivery | Formspree |
| Hosting | Cloudflare Pages |
| Tooling | TypeScript, ESLint, npm |

## Architecture

```text
Cloudflare Pages
+-- React + Vite single-page application
    +-- Route and section components
    +-- Content hooks with an in-memory cache
    +-- Typed repository layer
    |   +-- Supabase content and Storage
    |   `-- Bundled JSON and local asset fallbacks
    +-- Supabase Auth + RLS-protected administration
    `-- Formspree contact delivery
```

Office-bearer and alumni content use a fallback-safe data flow:

1. Components request content through `src/hooks/useContent.js`.
2. Hooks initialize the interface from bundled data.
3. Repository modules query Supabase when browser-safe project variables exist.
4. Successful Supabase responses replace the fallback state.
5. Missing configuration, empty migrated tables, or network failures leave
   those public sections operational with bundled content.

The calendar intentionally has no bundled event fallback: it reports an empty
or unavailable state when live calendar data cannot be reached.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 22.22.0 or newer
- npm
- Git
- A Supabase project only when working with live CMS data or administration

The required Node version is recorded in `.node-version` and enforced through
`package.json`.

### Installation

```bash
git clone https://github.com/sapthamclassical/Saptham-website.git
cd Saptham-website
npm ci
npm run dev
```

Vite will print the local address, normally `http://localhost:5173/`.

Supabase configuration is optional for the public interface. Without it, the
website uses its bundled content and assets.

### Environment Variables

Copy `.env.example` to `.env` when connecting a Supabase project:

```bash
# macOS or Linux
cp .env.example .env

# Windows Command Prompt
copy .env.example .env
```

| Variable | Scope | Purpose |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Browser | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Browser | Publishable key constrained by grants and RLS |
| `SUPABASE_DB_URL` | Local database tooling | Explicit PostgreSQL connection URL |
| `SUPABASE_DB_HOST` and related fields | Local database tooling | Alternative explicit connection components |
| `SUPABASE_DB_CA_CERT` | Local database tooling | Path to the Supabase project CA certificate |

Only variables prefixed with `VITE_` are embedded in the browser build. Never
place a Supabase secret/service-role key, database password, or migration
credential in a `VITE_*` variable.

## Commands

### Website

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create the production bundle in `dist/` |
| `npm run preview` | Preview the production bundle locally |
| `npm run typecheck` | Run TypeScript checks |
| `npm run lint` | Run ESLint |

The root website package currently has no test script. Automated tests for the
optional creative pipeline live in `saptham-pipeline/`.

### Supabase

| Command | Description |
| --- | --- |
| `npm run db:seed` | Regenerate seed SQL from local content |
| `npm run db:bundle` | Regenerate `supabase/apply_all.sql` |
| `npm run db:bundle:check` | Verify that the generated SQL bundle is current |
| `npm run db:migrate` | Apply migrations without seed upserts |
| `npm run db:migrate:seed` | Apply migrations and explicitly upsert seed data |
| `npm run db:verify` | Run read-only schema, RLS, privilege, and Storage checks |

Database commands require an explicit connection target and verified TLS. Read
[`supabase/README.md`](supabase/README.md) before applying changes to a live
project. Seed mode can overwrite CMS rows that share seeded identifiers, so use
it only when that content update is intentional.

## Supabase Backend

The canonical database source is `supabase/migrations/`. It defines content
tables, RLS policies, API grants, the season calendar, administrative
membership, and Storage policies.

The browser uses only the publishable key. Effective access is controlled by:

- explicit PostgreSQL grants;
- Row Level Security on public and Storage tables;
- server-side administrator membership checks;
- restricted function execution privileges; and
- an authenticated Supabase session for privileged calendar writes.

`supabase/apply_all.sql` is a generated bootstrap artifact and includes seed
upserts. Use the individual migrations or the guarded migration runner for
routine live changes.

Recommended operator sequence:

```bash
npm run db:bundle:check
npm run db:verify
npm run db:migrate
npm run db:verify
```

Administrator provisioning and credential operations are intentionally kept
out of migrations. Follow the private operator process and the setup notes in
[`supabase/README.md`](supabase/README.md); never commit credentials.

## Deployment

The production website is deployed with Cloudflare Pages:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Root directory | Repository root |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | `22.22.0` |
| Public environment | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` |

Import the GitHub repository into Cloudflare Pages and configure the settings
above. With Git integration enabled, pushes to `main` create a new production
deployment automatically.

`public/_headers` is copied into the production output and defines the
Content Security Policy, security headers, and cache behavior. HTML revalidates
on every visit, while hashed assets are cached immutably.

Cloudflare Pages serves this SPA's direct routes through its automatic fallback
behavior. A direct visit or refresh on `/calendar`, for example, resolves to the
application without a custom catch-all redirect.

Before deploying:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run db:bundle:check
npm audit
```

Then verify the homepage, direct route refreshes, Supabase reads, authorized
calendar operations, contact delivery, and response security headers. See
[`docs/DEPLOYMENT_GUIDE.md`](docs/DEPLOYMENT_GUIDE.md) for the full release and
rollback procedure.

## Repository Structure

```text
.
+-- docs/                  Architecture, operations, design, and security docs
+-- public/                Brand assets, manifest, and Cloudflare headers
+-- scripts/               Seed, SQL bundle, migration, and brand tooling
+-- saptham-pipeline/      Optional TypeScript creative production engine
+-- src/
|   +-- assets/            Photography, portraits, logos, and hero media
|   +-- components/        Sections, shared UI, motion, brand, and stage effects
|   +-- data/              Fallback content and Supabase repositories
|   +-- hooks/             Content hooks and cache
|   +-- lib/               Supabase, motion, scroll, gallery, and people utilities
|   `-- routes/            Route-level page components
+-- supabase/              Migrations, seed data, generated SQL, and backend docs
+-- index.html             Metadata and application entry document
`-- vite.config.js         Vite, React, Tailwind, and production build settings
```

## Creative Pipeline

`saptham-pipeline/` is an independent TypeScript package for the club's
provider-agnostic asset production workflow. It manages the creative canon,
prompt cards, generation providers, versioned storage, review, indexing, and
publishing.

```bash
cd saptham-pipeline
npm ci
npm run canon:load
npm run typecheck
npm run lint
npm test
```

See [`saptham-pipeline/README.md`](saptham-pipeline/README.md) for provider
configuration and operational commands.

## Documentation

- [Complete local setup](HOW_TO_RUN.md)
- [System architecture](docs/ARCHITECTURE.md)
- [Deployment guide](docs/DEPLOYMENT_GUIDE.md)
- [Maintainer guide](docs/MAINTAINER_GUIDE.md)
- [Security report](docs/SECURITY_REPORT.md)
- [Supabase operations](supabase/README.md)
- [Creative pipeline](saptham-pipeline/README.md)

## Maintenance Workflow

Keep changes focused, avoid committing generated secrets or local environment
files, and validate production work before merging:

```bash
npm run typecheck
npm run lint
npm run build
npm run db:bundle:check
```

For security-sensitive or database changes, review the relevant migration,
verify the intended Supabase project before applying it, and document any
required manual production action.

---

<p align="center">
  Built by Saptham &middot; CEG, Anna University
</p>

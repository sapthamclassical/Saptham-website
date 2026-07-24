# Saptham maintainer guide

## Setup

1. Install Node 22.22.0 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Add the browser-safe Supabase URL and publishable key.
5. Run `npm run dev`.

The site still renders bundled fallback content without Supabase configuration.

## Routine checks

```bash
npm run typecheck
npm run lint
npm run build
npm audit
```

The separate `saptham-pipeline/` package has its own install, typecheck, lint,
test, and audit commands.

## Content

- Office bearers: `src/data/officeBearers.json` plus Supabase
  `office_bearers`
- Alumni: `src/data/alumni.json` plus Supabase `alumni`
- Calendar: Supabase `calendar_events`
- Gallery: `src/assets/Gallery/`
- Public events page: component-local content/assets
- Contact/social/map details: `src/components/ContactUs.jsx` and
  `src/components/Footer.jsx`

The public Formspree form and the optional Supabase contact repository are
separate submission paths. Formspree dashboard access is required to manage
recipients, quotas, and anti-spam settings.

## Admin access

The footer's hidden gesture opens a password-only modal. Internally, the app
authenticates the fixed Supabase user and verifies `public.is_admin()`. Never
put a password or verifier in source code or migrations.

Administrator creation, password rotation, and membership are manual security
operations documented in `supabase/README.md`.

## Database operations

Database tooling requires an explicit Supabase target and the project's CA
certificate:

```bash
npm run db:verify
npm run db:migrate
```

Seeding is intentionally separate because it upserts and can overwrite edited
CMS rows:

```bash
npm run db:migrate:seed
```

Do not apply migrations, rotate credentials, or change Storage visibility
without confirming the target/project and backup implications.

## Deployment

Cloudflare Pages build command: `npm run build`
Output: `dist`

After deployment, directly open and refresh `/calendar`, verify Supabase reads,
inspect security headers, test admin authorization, and submit one contact
message. See `docs/DEPLOYMENT_GUIDE.md`.

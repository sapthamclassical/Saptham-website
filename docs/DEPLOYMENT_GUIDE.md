# Saptham Cloudflare Pages deployment

## Production architecture

- Host: Cloudflare Pages static deployment
- Build command: `npm run build` (Pages performs dependency installation)
- Output directory: `dist`
- Node: 22.22.0 or newer (`.node-version`)
- Browser backend: Supabase Auth, PostgREST, Realtime, and public Storage
- Contact delivery: Formspree

The website does not need a server process. Supabase database credentials and
service-role keys must never be configured as Vite/Cloudflare browser
variables.

## Cloudflare environment variables

Configure only the browser-safe project values:

```text
VITE_SUPABASE_URL=https://PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

The publishable key is expected in the browser bundle. Its effective authority
comes from the deployed Postgres grants/RLS.

Database migration variables, the database password, and
`SUPABASE_DB_CA_CERT` are local operator inputs for `scripts/migrate.mjs`; they
are not Pages build variables.

## Routing and headers

- With no top-level `404.html`, Cloudflare Pages applies its automatic SPA
  fallback for direct routes such as `/calendar`. Do not add the old catch-all
  `_redirects` rule; Wrangler rejects it as an infinite loop.
- `public/_headers` supplies CSP, HSTS, clickjacking, content-type, referrer,
  permissions, and opener policies plus cache rules.
- Hashed `/assets/*` files are immutable; HTML and route responses must
  revalidate.

Before deployment, check Cloudflare dashboard features that inject scripts
(especially Rocket Loader or Web Analytics). Either keep them disabled or
review and deliberately add the exact required CSP source. Do not weaken
`script-src` just to silence a violation.

## Safe release sequence

1. Complete the admin password rotation and membership check described in
   `docs/SECURITY_REPORT.md`.
2. Configure the local database target and Supabase CA certificate.
3. Run `npm run db:verify` against the intended project.
4. Review and apply `npm run db:migrate`; seed data is excluded.
5. Run `npm run db:verify` again.
6. Run local validation:

   ```bash
   npm ci
   npm run typecheck
   npm run lint
   npm run build
   npm run db:bundle:check
   npm audit
   ```

7. Deploy the reviewed Git revision through Cloudflare Pages.
8. Verify `/`, `/calendar`, a direct-route refresh, Supabase reads, admin
   authorization/write errors, and one Formspree submission.
9. Inspect response headers on both `/` and `/calendar`; confirm the CSP has no
   unexpected production violations.

## Rollback

Cloudflare Pages can roll back the static deployment, but that does not roll
back Supabase migrations or data. The security migration is data-preserving;
do not attempt database rollback by deleting data. Prepare any future
destructive database change as a separate reviewed migration and backup first.

No deployment, live database mutation, password rotation, commit, or push is
performed automatically by this guide.

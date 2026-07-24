# Saptham architecture

## Runtime

Saptham is a client-rendered React/Vite SPA deployed as static files on
Cloudflare Pages. There is no custom server process. Dynamic content,
authentication, authorization, and media storage are supplied by Supabase.
Formspree handles the active contact form.

```text
Cloudflare Pages
  index.html + hashed assets
          |
          v
React 19 / BrowserRouter
  |-- route components
  |-- content hooks + local fallbacks
  |-- Supabase repositories
  `-- hidden password-only admin entry
          |
          +--> Supabase Auth / PostgREST / Realtime / Storage
          `--> Formspree (contact form)
```

## Application layers

| Layer | Location | Responsibility |
|---|---|---|
| Bootstrap/shell | `src/main.jsx`, `src/App.jsx` | router, global layout, transitions |
| Routes | `src/routes/` | page-level screens and lazy route chunks |
| Components | `src/components/` | sections, stage effects, motion, shared UI |
| Content hooks | `src/hooks/useContent.js` | synchronous fallback seed and async refresh |
| Repositories | `src/data/repositories/` | typed Supabase queries and writes |
| Browser backend client | `src/lib/supabase.ts` | publishable client/session configuration |
| Database security | `supabase/migrations/` | schema, grants, RLS, functions, Storage |
| Deployment policy | `public/_headers` | CSP, security headers, and cache rules |

## Data flow

Public content hooks render bundled JSON/assets immediately and then resolve
Supabase data. Missing configuration, empty migrated tables, or network errors
fall back without breaking first paint. The season calendar has no bundled
event fallback and displays an explicit load failure for backend errors.

The active contact form posts to Formspree. An optional, currently unused
Supabase contact repository is protected by column-level grants and a bounded
anonymous insert policy.

## Authentication and authorization

The admin modal asks only for a password; the client internally signs in as the
fixed Supabase identity `admin@saptham.club`. A successful session is not enough:
the client verifies `public.is_admin()`, and all writes are independently
checked by RLS. Draft calendar rows are filtered immediately and refetched when
admin status is lost.

The hidden gesture is discoverability only, never a security boundary.

## Deployment behavior

Cloudflare Pages performs automatic SPA fallback because there is no top-level
`404.html`. `_headers` is copied into `dist` by Vite. The React Router 8 minimum,
Node 22.22.0, is pinned in `.node-version`. Database migrations are an explicit
operator step and are not part of the Pages build.

## Known architectural trade-offs

- Admin sessions persist in browser local storage.
- The fixed shared admin identity has no per-person attribution or MFA.
- Storage buckets are public-read, so draft object URLs are not private.
- CSP allows `*.supabase.co` to preserve preview/staging compatibility.
- Large image assets and the main JavaScript chunk remain performance work.

See `docs/SECURITY_REPORT.md`, `docs/DEPLOYMENT_GUIDE.md`, and
`supabase/README.md`.

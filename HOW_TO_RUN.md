# How To Run The Entire Project

This project has three runnable parts:

1. The Saptham website.
2. The Supabase backend setup and verification scripts.
3. The optional creative production pipeline in `saptham-pipeline/`.

Run commands from the repository root unless a section explicitly says to
change directories.

## Prerequisites

- Node.js 22.22.0 or newer (the minimum is pinned by `.node-version`).
- npm.
- Git.
- A Supabase project, only if you want live CMS data.
- Supabase database connection details and CA certificate, only if you want to
  verify or run migrations from the CLI.
- Optional pipeline tools for asset generation:
  - ffmpeg
  - Blender
  - ComfyUI
  - Ollama
  - Gemini API key

The website can run without Supabase credentials because it falls back to local
JSON and bundled assets.

## 1. Install Website Dependencies

```bash
npm install
```

## 2. Configure Environment Variables

Create a local `.env` file from the example:

```bash
copy .env.example .env
```

On macOS/Linux:

```bash
cp .env.example .env
```

Fill these values if you have a Supabase project:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxxxxxxxxxx
```

These values are browser-safe publishable credentials. Do not place the
Supabase `service_role` key in this repository or in any `VITE_*` variable.

For database tooling, provide either `SUPABASE_DB_URL` or all explicit
connection components, plus the project database CA certificate path:

```env
SUPABASE_DB_URL=postgresql://user:password@host:5432/postgres
SUPABASE_DB_CA_CERT=C:\secure\supabase-ca.pem
```

Do not use a generic `DATABASE_URL`. The runner refuses implicit project
defaults and unverified TLS.

## 3. Start The Website Locally

```bash
npm run dev
```

Vite will print a local URL, usually:

```text
http://localhost:5173/
```

Open that URL in your browser.

## 4. Build The Website

```bash
npm run build
```

The production build is written to:

```text
dist/
```

## 5. Preview The Production Build

```bash
npm run preview
```

Vite will print a preview URL. Use this to inspect the built output before
deployment.

## 6. Run Code Checks

```bash
npm run lint
npm run typecheck
```

Notes:

- `npm run lint` currently passes with Fast Refresh warnings in files that export
  both components and helper constants/functions.
- `npm run typecheck` checks TypeScript files under `src/`.
- The root website package does not currently define an `npm test` script.

## 7. Run The Supabase Backend

Read `supabase/README.md` before applying SQL to a real project.

To apply migrations from the CLI:

```bash
npm run db:migrate
```

This excludes seed upserts. To deliberately reapply generated content too:

```bash
npm run db:migrate:seed
```

To run read-only schema, RLS, privilege, row-count, and Storage verification:

```bash
npm run db:verify
```

To regenerate seed data from local JSON:

```bash
npm run db:seed
```

To regenerate the combined SQL bundle:

```bash
npm run db:bundle
```

To verify that the bundle is current without rewriting it:

```bash
npm run db:bundle:check
```

If applying manually from the Supabase SQL Editor, run the migration files one
at a time in the order documented in `supabase/README.md`. Prefer individual
files over pasting `apply_all.sql` into the SQL Editor because the dashboard can
wrap the whole script in one transaction.

## 8. Admin Calendar Flow

The `/calendar` route is public. Admin editing appears only after sign-in.

Admin sign-in flow:

1. Open the website.
2. Scroll to the footer.
3. Click the footer copyright mark seven times within four seconds.
4. Enter the admin passphrase.
5. The app signs in to Supabase as `admin@saptham.club`.
6. You are sent to `/calendar`, where admin controls are shown.

Calendar write access is enforced by Supabase RLS. The hidden UI is only an
entry point; it is not the security boundary.

## 9. Run The Creative Pipeline

The creative pipeline is a separate package.

```bash
cd saptham-pipeline
npm install
```

Validate the canon:

```bash
npm run canon:load
```

Run pipeline checks:

```bash
npm run typecheck
npm run lint
npm test
```

Optional pipeline environment:

```bash
copy .env.example .env
```

On macOS/Linux:

```bash
cp .env.example .env
```

Fill provider credentials only when you need generation commands.

Useful pipeline commands:

```bash
npm run ingest
npm run compose -- STYLE-00
npm run generate -- STYLE-00
npm run index:rebuild
npm run search -- --q "hero"
npm run doctor
```

Return to the website root:

```bash
cd ..
```

## 10. Deployment Checklist

Before deployment:

```bash
npm run lint
npm run typecheck
npm run build
```

Also confirm:

- `.env` and `.env.local` are not committed.
- Supabase migrations have been applied if live CMS data is expected.
- The host supports SPA fallback rewrites to `index.html`.
- The deployed environment has `VITE_SUPABASE_URL` and
  `VITE_SUPABASE_PUBLISHABLE_KEY`.
- Large media files are acceptable for the chosen hosting provider.

## 11. Common Problems

### The site runs but CMS content does not load

Check `.env`, Supabase RLS, grants, and whether the schema cache has refreshed.
The app will keep rendering fallback data when Supabase is unavailable.

### Supabase says permission denied

RLS policies are not enough by themselves. The grants migration must also be
applied.

### Supabase says a table is missing but it exists

PostgREST may still have an old schema cache. Run:

```sql
notify pgrst, 'reload schema';
```

### The calendar admin controls do not appear

Confirm Supabase is configured, the admin user exists, the entered password is
correct, and `admin_users` contains the authenticated user id.

### Root `npm test` fails

This is expected right now because the website package has no `test` script.
Pipeline tests live in `saptham-pipeline/`.

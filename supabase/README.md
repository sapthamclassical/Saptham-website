# Saptham — Supabase backend

Content lives in Postgres, images in Storage; the React app reads it through a
typed repository layer with an offline JSON fallback.

```
supabase/
  migrations/
    20260718090001_schema.sql   STEP 1 — tables, enums, triggers, is_admin()
    20260718090002_rls.sql      STEP 2 — RLS + policies on every table
    20260718090004_grants.sql   STEP 3 — role GRANTs (without these, RLS is unreachable)
    20260718090003_storage.sql  STEP 5 — the 7 buckets + object policies  (run LAST)
  seed/
    0001_seed.sql               STEP 4 — GENERATED from src/data/*.json
  apply_all.sql                 all five, in order (schema → RLS → grants → seed → storage)
```

## Applying it

```bash
npm run db:migrate    # applies each file in its OWN transaction, then verifies
npm run db:verify     # re-run the catalog verification only
```

Needs `SUPABASE_DB_PASSWORD` in `.env` (git-ignored). Paste the password raw —
the runner percent-encodes it, so `@ # / ?` are safe.

Each file runs in a separate transaction, so a failure is isolated and every
earlier success stays committed. On failure the runner prints the **verbatim**
PostgreSQL error — code, detail, hint, and the offending source line — and stops.
Every file is idempotent, so re-running is always safe.

Prefer the dashboard? Paste the files in the numbered order above, one at a time
(**SQL Editor → New query → Run**). Don't paste `apply_all.sql` there: the SQL
Editor wraps a script in a single transaction, so one bad statement rolls back
everything and leaves you with zero tables.

## Two things that will bite you

**1. RLS is not enough — you also need GRANTs.** Policies decide *which rows* a
role may see, but Postgres checks table-level privileges first. With RLS
configured but no `GRANT`, every request fails with:

```
42501  permission denied for table office_bearers
```

That is *not* a policy problem, and no amount of policy editing fixes it. That's
what `20260718090004_grants.sql` is for.

**2. PostgREST caches the schema.** Right after creating tables, the API can
still answer:

```
PGRST205  Could not find the table 'public.office_bearers' in the schema cache
```

The tables exist; the API just hasn't noticed. Force a refresh:

```sql
notify pgrst, 'reload schema';
```

> **If the storage step errors, you are still fine.** `storage.objects` is owned
> by `supabase_storage_admin` and some projects refuse policy changes from the
> SQL Editor. Everything before it is already committed and the website works.
> Buckets marked `public` are world-readable without any policy, which is all the
> site needs to *display* images; the write policies only matter for uploading
> from the browser and can be added in Dashboard → Storage → Policies.

Regenerate after editing content or migrations:

```bash
npm run db:seed     # rebuild seed from src/data/*.json
npm run db:bundle   # rebuild apply_all.sql
```

## Becoming an admin

RLS is deny-by-default: the public can read published content and submit contact
messages; everything else needs an admin. Admins are rows in `admin_users`:

1. Authentication → Users → Add user (or sign up in the app).
2. SQL Editor:

```sql
insert into public.admin_users (user_id, email, note)
select id, email, 'secretary 2025-26' from auth.users where email = 'you@example.com'
on conflict (user_id) do nothing;
```

## Security model

| Table | anon (public site) | admin |
|---|---|---|
| `office_bearers`, `alumni`, `events`, `event_gallery`, `performances`, `achievements`, `sponsors` | SELECT where `is_published = true` | full |
| `announcements` | SELECT where published **and** inside `starts_at`…`ends_at` | full |
| `contact_messages` | **INSERT only** — cannot read anyone's messages | full |
| `media_assets` | SELECT (files are public anyway) | full |
| `settings` | SELECT where `is_public = true` | full |
| `admin_users` | none | full (users may read their own row) |

RLS is `ENABLE`d, never `FORCE`d — forcing it would subject the table owner to
the policies and break the seed and any service_role maintenance.

`VITE_SUPABASE_PUBLISHABLE_KEY` is *designed* to ship in the browser bundle; it
grants only what the policies above allow. **Never** put the `service_role` key
in this repo or any `VITE_*` variable — it bypasses RLS entirely.

## Storage buckets

`office-bearers` · `alumni` · `events` · `gallery` · `hero` · `assets` · `logos`

All public-read, admin-write, with size caps and mime allow-lists.

Store the **path** (e.g. `dhanya-v.jpg`) in the row's `image_path`; the app turns
it into a public URL. Leave it `null` and the UI keeps the premium initials
placeholder — no broken images, and never an AI-generated face.

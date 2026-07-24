# Saptham — Supabase backend

The Vite SPA uses Supabase Auth, PostgREST, Realtime, and public Storage. The
publishable browser key is expected to be public; authorization is enforced by
Postgres grants and RLS.

## Migration order

The canonical source is `supabase/migrations/*.sql`:

1. `20260718090001_schema.sql` — tables, triggers, and `is_admin()`
2. `20260718090002_rls.sql` — RLS policies
3. `20260718090004_grants.sql` — explicit API privileges
4. `20260719100001_calendar_admin.sql` — calendar table and policies
5. `20260724090001_least_privilege_grants.sql` — forward hardening
6. `20260718090003_storage.sql` — buckets and object policies (runner moves this
   timestamped migration last because managed Storage ownership can reject it)

`supabase/apply_all.sql` is a generated fresh-project/bootstrap artifact. It
also includes seed upserts, so do not use it as a routine live migration.

## Secure runner

Copy `.env.example` to `.env` and provide an explicit database URL, or the
explicit host/user/password components. Also download the project database CA
certificate from Supabase and set `SUPABASE_DB_CA_CERT` to its local path. The
runner refuses unverified TLS, generic `DATABASE_URL`, implicit project
defaults, unknown flags, and invocations without an explicit mode. Verification
also rejects unreviewed public/storage policies and buckets.

```bash
npm run db:verify          # read-only catalog/security verification
npm run db:migrate         # migrations only; no content seed
npm run db:migrate:seed    # explicit migration + seed upserts
```

Each migration uses its own transaction and the run holds a Postgres advisory
lock. A failure stops the run and prints safe server diagnostics/position
without echoing SQL source text or row-bearing error detail. The scripts are
idempotent, but there is no migration ledger yet; reruns execute every file.

Regenerate/check local artifacts:

```bash
npm run db:seed
npm run db:bundle
npm run db:bundle:check
```

## One-time administrator setup

No credential, password verifier, `auth.users` row, or admin membership is
created by migrations.

1. In Supabase Dashboard → Authentication → Users, create the fixed application
   identity `admin@saptham.club` with a unique randomly generated password.
2. Because an earlier public Git revision contained a bcrypt verifier, rotate
   that identity's password before relying on this deployment.
3. In SQL Editor, grant the existing identity membership:

```sql
insert into public.admin_users (user_id, email, note)
select id, email, 'site admin'
from auth.users
where email = 'admin@saptham.club'
on conflict (user_id) do update
set email = excluded.email;
```

The browser intentionally asks only for the password. It signs in with the
fixed email internally and then calls `public.is_admin()`; a valid Supabase
session without an `admin_users` row is rejected.

## API security model

| Resource | Anonymous | Authenticated admin |
|---|---|---|
| Published content and calendar | `SELECT` through RLS | full CRUD through RLS |
| `contact_messages` | column-limited `INSERT`; no read | full CRUD through RLS |
| `admin_users` | no table access | self-read/admin management through RLS |
| `is_admin()` | execute | execute |
| Future tables/functions | no API privilege by default | no API privilege by default |

`TRUNCATE`, `TRIGGER`, and `REFERENCES` are removed from both API roles. The
roles also cannot create objects in `public`, and future functions do not
inherit PostgreSQL's default `PUBLIC EXECUTE`. The anonymous contact policy
bounds new public input without imposing constraints on unknown legacy inbox
rows. Calendar fields are bounded in the admin UI; add database constraints
only after inspecting existing live rows.

Never place a `service_role`/secret key in this repository or in a `VITE_*`
variable. It bypasses RLS.

## Storage

The seven configured buckets are public-read and admin-write. Public buckets
cannot protect draft objects: an object URL remains readable even if its
database row is unpublished. Changing bucket visibility or allowed MIME types
can break existing assets, so review that separately in the Supabase Dashboard
before tightening it.

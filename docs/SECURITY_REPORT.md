# Saptham security report

Audit date: 2026-07-24
Scope: website, Git history, dependencies, Supabase SQL/tooling, forms, and
Cloudflare Pages configuration.

## Architecture

Saptham is a static Vite/React SPA on Cloudflare Pages. The browser talks
directly to Supabase Auth/PostgREST/Realtime/Storage with a publishable key and
to Formspree for the active contact form. Supabase grants and RLS—not the hidden
admin UI—are the authorization boundary.

## Fixed in the current worktree

- Removed the committed admin bcrypt verifier and all executable credential/
  `auth.users` bootstrapping from SQL.
- Replaced broad current/future Postgres API grants with an explicit
  table/operation matrix; denied API-role schema creation; and made future
  functions private with a verified global default-ACL override.
- Enabled RLS before the schema migration can commit.
- Secured `is_admin()` and trigger function search paths and execution grants.
- Required the UI to verify `is_admin()` after authentication.
- Made calendar writes require exactly one returned row so RLS-hidden writes
  cannot be reported as successful after authorization is lost.
- Repaired child-content publication policies and bounded anonymous contact
  input without constraining unknown legacy inbox rows.
- Made the migration runner require an explicit target/mode, verified TLS,
  an advisory lock, explicit opt-in before seed upserts, strict policy/bucket
  allowlists, and redacted database error detail that may contain row values.
- Added CSP and Cloudflare security headers; reduced unused CSP sources.
- Added Formspree's supported honeypot and client-side field bounds.
- Removed unused packages, upgraded React Router past the current advisory, and
  pinned its Node 22.22.0 minimum.
- Disabled URL-session parsing because this app has no OAuth, magic-link, or
  recovery redirect flow.

## Critical manual action

Git commit `a1fee98d1d7a326793642d6363f5e0355998a496` in this public repository
contained the administrator's bcrypt verifier. Removing it from the current
tree does not remove it from public history, and it permits offline password
guessing.

Before relying on admin access, an authorized operator must:

1. Rotate the Supabase password for `admin@saptham.club` to a unique,
   randomly generated password.
2. Confirm the corresponding `admin_users` membership.
3. Decide whether to coordinate a Git history rewrite. That is disruptive and
   was not performed by this audit.

No plaintext database password, private key, service-role/secret Supabase key,
JWT signing secret, or common cloud/API token was found in reachable or dangling
Git blobs. `.env` was not found in Git history.

## Remaining decisions and risks

- Auth sessions persist in browser local storage. Switching to session-only
  storage changes admin UX and requires a product decision.
- The password-only shared administrator has no MFA or per-person audit
  attribution. Supabase authorization is enforced, but identity assurance is
  limited.
- Public Storage buckets make object URLs public even when related database
  rows are drafts. SVG is also allowed in two buckets. Bucket/MIME changes
  require an asset compatibility review.
- `performances.event_id` is nullable and uses `ON DELETE SET NULL`; a published
  child of a deleted unpublished event can become a public standalone row.
  Changing this requires a content-model/data decision.
- Public content rows can expose every selected column (for example office
  bearer contact fields and media metadata). A public-view design would reduce
  that surface but changes API/types.
- The active contact route is Formspree while a separate Supabase contact
  repository remains anonymously writable without server-side rate limiting.
  Pick one canonical inbox before adding CAPTCHA/Edge Function controls.
- CSP permits any `*.supabase.co` project so previews can use a different
  project. Pinning the production project origin is stronger but changes the
  preview/staging setup.
- Formspree reCAPTCHA and server-side spam settings must be enabled/verified in
  the Formspree dashboard.
- The migration runner intentionally has no database migration ledger yet; its
  SQL is idempotent and replays every file.
- The local `.env` Windows ACL should be reviewed because local machine users
  may have broader access than necessary.

## Live verification still required

No live Supabase mutation, password rotation, Cloudflare deployment, Git
history rewrite, commit, or push is part of this worktree audit. With authorized
credentials, run `npm run db:verify`, review the output, apply migrations, and
verify again. An anonymous browser smoke test confirmed that the local build can
read the deployed calendar backend, but that does not verify the live catalog,
RLS drift, admin writes, or Storage writes. The current Cloudflare deployment
also predates the pending CSP headers. See `supabase/README.md` and
`docs/DEPLOYMENT_GUIDE.md`.

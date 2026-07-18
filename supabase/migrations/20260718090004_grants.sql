-- ============================================================================
-- STEP 5 — ROLE GRANTS
-- ============================================================================
-- RLS answers "which rows may this role see?" — but Postgres checks table-level
-- privileges FIRST. Without a GRANT, PostgREST fails with 42501 "permission
-- denied for table ..." and never reaches the policies at all.
--
-- The Supabase posture, which this follows: grants are deliberately permissive,
-- and RLS does the real enforcement. That is safe here only because every table
-- has RLS enabled with explicit policies (see 20260718090002_rls.sql).
--
-- Idempotent — safe to re-run.
-- ============================================================================

grant usage on schema public to anon, authenticated;

-- Read: RLS then narrows this to published rows only.
grant select on all tables in schema public to anon, authenticated;

-- Write: only admins get past the is_admin() policies, but the privilege must
-- exist for the policy to even be evaluated.
grant insert, update, delete on all tables in schema public to authenticated;

-- The public contact form posts as anon.
grant insert on public.contact_messages to anon;

-- Defence in depth: anon has no business reading anyone's messages. The RLS
-- policy already restricts SELECT to admins; this removes the privilege too, so
-- a future policy mistake cannot expose them.
revoke select on public.contact_messages from anon;

-- Same reasoning for the admin roster.
revoke select on public.admin_users from anon;

grant usage, select on all sequences in schema public to anon, authenticated;

-- Anything created later inherits the same posture.
alter default privileges in schema public
  grant select on tables to anon, authenticated;
alter default privileges in schema public
  grant insert, update, delete on tables to authenticated;
alter default privileges in schema public
  grant usage, select on sequences to anon, authenticated;

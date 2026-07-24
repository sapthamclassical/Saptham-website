-- ============================================================================
-- Saptham CMS — STEP 3 · Explicit API role grants
-- ============================================================================
-- RLS decides which rows an operation may reach. These grants independently
-- decide which operations PostgREST may attempt at all.
--
-- New tables receive NO API privilege by default. Add each future table here
-- only after its RLS policies have been reviewed.
-- Idempotent.
-- ============================================================================

revoke create on schema public from public, anon, authenticated;
grant usage on schema public to anon, authenticated;

-- Remove Supabase's broad defaults for the application tables, then restore
-- only the operations the browser application actually uses.
revoke all privileges on table
  public.admin_users,
  public.office_bearers,
  public.alumni,
  public.events,
  public.event_gallery,
  public.performances,
  public.achievements,
  public.announcements,
  public.sponsors,
  public.contact_messages,
  public.media_assets,
  public.settings
from anon, authenticated;

grant select on table
  public.office_bearers,
  public.alumni,
  public.events,
  public.event_gallery,
  public.performances,
  public.achievements,
  public.announcements,
  public.sponsors,
  public.media_assets,
  public.settings
to anon;

-- Authenticated users still pass through RLS; only admin_users members can see
-- private rows or modify content.
grant select on table
  public.admin_users,
  public.office_bearers,
  public.alumni,
  public.events,
  public.event_gallery,
  public.performances,
  public.achievements,
  public.announcements,
  public.sponsors,
  public.contact_messages,
  public.media_assets,
  public.settings
to authenticated;

grant insert, update, delete on table
  public.admin_users,
  public.office_bearers,
  public.alumni,
  public.events,
  public.event_gallery,
  public.performances,
  public.achievements,
  public.announcements,
  public.sponsors,
  public.contact_messages,
  public.media_assets,
  public.settings
to authenticated;

-- The optional Supabase contact repository may submit only user-controlled
-- fields. IDs, status, admin notes, and timestamps remain server-controlled.
grant insert (name, email, subject, message, source)
  on table public.contact_messages to anon;

-- UUID keys do not use public sequences.
revoke all privileges on all sequences in schema public from anon, authenticated;

-- Objects created later are private until explicitly reviewed and granted.
alter default privileges in schema public
  revoke all privileges on tables from public, anon, authenticated;
alter default privileges in schema public
  revoke all privileges on sequences from public, anon, authenticated;
alter default privileges
  revoke execute on functions from public, anon, authenticated;

-- Only the authorization predicate is callable through the public API.
revoke all privileges on function public.is_admin() from public, anon, authenticated;
grant execute on function public.is_admin() to anon, authenticated;

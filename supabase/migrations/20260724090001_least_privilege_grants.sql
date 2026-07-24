-- ============================================================================
-- SECURITY HARDENING — API grants, functions, policies, and input bounds
-- ============================================================================
-- Forward migration for databases that already applied the original schema.
-- It is deliberately data-preserving and idempotent.
-- ============================================================================

-- ── RLS must be enabled before any API grants are restored ──────────────────
alter table public.admin_users       enable row level security;
alter table public.office_bearers    enable row level security;
alter table public.alumni            enable row level security;
alter table public.events            enable row level security;
alter table public.event_gallery     enable row level security;
alter table public.performances      enable row level security;
alter table public.achievements      enable row level security;
alter table public.announcements     enable row level security;
alter table public.sponsors          enable row level security;
alter table public.contact_messages  enable row level security;
alter table public.media_assets      enable row level security;
alter table public.settings          enable row level security;
alter table public.calendar_events   enable row level security;

-- ── Secure function execution and SECURITY DEFINER name resolution ──────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end $$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users a
    where a.user_id = auth.uid()
  );
$$;

revoke all privileges on function public.set_updated_at()
  from public, anon, authenticated;
revoke all privileges on function public.is_admin()
  from public, anon, authenticated;
grant execute on function public.is_admin() to anon, authenticated;

-- Future functions are not callable through PostgREST until reviewed.
alter default privileges
  revoke execute on functions from public, anon, authenticated;

-- ── Repair parent/child publication and public inbox policies ───────────────
drop policy if exists public_read_published on public.event_gallery;
create policy public_read_published on public.event_gallery
  for select to anon, authenticated
  using (
    is_published = true
    and (
      event_id is null
      or exists (
        select 1
        from public.events e
        where e.id = event_gallery.event_id
          and e.is_published = true
      )
    )
  );

drop policy if exists public_read_published on public.performances;
create policy public_read_published on public.performances
  for select to anon, authenticated
  using (
    is_published = true
    and (
      event_id is null
      or exists (
        select 1
        from public.events e
        where e.id = performances.event_id
          and e.is_published = true
      )
    )
  );

drop policy if exists anyone_can_submit on public.contact_messages;
create policy anyone_can_submit on public.contact_messages
  for insert to anon
  with check (
    status = 'new'
    and admin_notes is null
    and source = 'website'
    and char_length(btrim(name)) between 1 and 120
    and char_length(email) between 3 and 254
    and email ~* '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'
    and (subject is null or char_length(subject) <= 200)
    and char_length(btrim(message)) between 1 and 5000
  );

drop policy if exists admin_insert_messages on public.contact_messages;
create policy admin_insert_messages on public.contact_messages
  for insert to authenticated
  with check (public.is_admin());

drop policy if exists public_read_published on public.calendar_events;
create policy public_read_published on public.calendar_events
  for select to anon, authenticated
  using (is_published = true or public.is_admin());

drop policy if exists admin_all on public.calendar_events;
create policy admin_all on public.calendar_events
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ── Replace broad current/default API privileges with an explicit matrix ────
revoke create on schema public from public, anon, authenticated;
grant usage on schema public to anon, authenticated;

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
  public.settings,
  public.calendar_events
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
  public.settings,
  public.calendar_events
to anon;

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
  public.settings,
  public.calendar_events
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
  public.settings,
  public.calendar_events
to authenticated;

grant insert (name, email, subject, message, source)
  on table public.contact_messages to anon;

revoke all privileges on all sequences in schema public from anon, authenticated;

alter default privileges in schema public
  revoke all privileges on tables from public, anon, authenticated;
alter default privileges in schema public
  revoke all privileges on sequences from public, anon, authenticated;

notify pgrst, 'reload schema';

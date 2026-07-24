-- ============================================================================
-- CALENDAR + ADMIN — team priorities 5-7
-- A calendar_events table the public reads and admins edit. The admin's write
-- authorization is enforced server-side by RLS is_admin().
--
-- SECURITY: the admin auth user and admin_users membership are created OUT OF
-- BAND. A credential or verifier must never live in this public repository.
-- An earlier revision committed a bcrypt verifier; removing it here does not
-- remove Git history, so that password must be rotated separately.
-- Idempotent — safe to re-run.
-- ============================================================================

create table if not exists public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  details text,
  venue text,
  happens_on date not null,
  time_note text,
  accent text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists calendar_events_date_idx on public.calendar_events (happens_on);

drop trigger if exists set_updated_at on public.calendar_events;
create trigger set_updated_at before update on public.calendar_events
  for each row execute function public.set_updated_at();

alter table public.calendar_events enable row level security;

drop policy if exists public_read_published on public.calendar_events;
create policy public_read_published on public.calendar_events
  for select to anon, authenticated
  using (is_published = true or public.is_admin());

drop policy if exists admin_all on public.calendar_events;
create policy admin_all on public.calendar_events
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

grant select on public.calendar_events to anon, authenticated;
grant insert, update, delete on public.calendar_events to authenticated;

-- No auth.users or admin_users rows are created here. See supabase/README.md for
-- the reviewed, manual one-time membership step.

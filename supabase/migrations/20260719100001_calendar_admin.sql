-- ============================================================================
-- CALENDAR + ADMIN — team priorities 5-7
-- A calendar_events table the public reads and admins edit, plus one real
-- Supabase auth user so the password-only admin door is enforced by RLS,
-- not by client-side obscurity. Only the bcrypt hash lives here.
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
  for select using (is_published = true or public.is_admin());

drop policy if exists admin_all on public.calendar_events;
create policy admin_all on public.calendar_events
  for all using (public.is_admin()) with check (public.is_admin());

grant select on public.calendar_events to anon, authenticated;
grant insert, update, delete on public.calendar_events to authenticated;

-- ── the admin auth user (email fixed, password entered in the hidden door) ──
do $$
declare uid uuid := 'ad111000-0000-4000-8000-000000000001';
begin
  if not exists (select 1 from auth.users where email = 'admin@saptham.club') then
    insert into auth.users (
      instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
      raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
      confirmation_token, recovery_token, email_change_token_new, email_change
    ) values (
      '00000000-0000-0000-0000-000000000000', uid, 'authenticated', 'authenticated',
      'admin@saptham.club',
      '$2a$06$V1PoaUvtCdRHQMmexH7el.WV9rR1.oBibG8gCQI/J3a8eZUfUsgO.',
      now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(),
      '', '', '', ''
    );
    insert into auth.identities (
      id, user_id, provider_id, identity_data, provider,
      last_sign_in_at, created_at, updated_at
    ) values (
      gen_random_uuid(), uid, uid::text,
      jsonb_build_object('sub', uid::text, 'email', 'admin@saptham.club', 'email_verified', true),
      'email', now(), now(), now()
    );
  end if;

  insert into public.admin_users (user_id, email, note)
  select id, email, 'site admin (calendar)' from auth.users where email = 'admin@saptham.club'
  on conflict (user_id) do nothing;
end $$;

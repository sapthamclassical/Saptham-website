-- ============================================================================
-- Saptham CMS — STEP 2 · Row Level Security
--
-- Model:
--   • anon / authenticated  → SELECT published rows on public content only
--   • contact_messages      → INSERT-only for the public, never readable
--   • admin_users members   → full read/write everywhere (public.is_admin())
--   • settings              → only rows flagged is_public are world-readable
--
-- Written as plain, explicit statements (no DO loops, no nested dollar-quoting)
-- so that any failure names the exact table it happened on.
--
-- NOTE: "enable" only, never "force". FORCE would subject the table OWNER to
-- RLS too, blocking the STEP 4 seed inserts and any service_role maintenance.
-- Idempotent.
-- ============================================================================

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

-- ─── office_bearers ─────────────────────────────────────────────────────────
drop policy if exists public_read_published on public.office_bearers;
create policy public_read_published on public.office_bearers
  for select to anon, authenticated using (is_published = true);

drop policy if exists admin_all on public.office_bearers;
create policy admin_all on public.office_bearers
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ─── alumni ─────────────────────────────────────────────────────────────────
drop policy if exists public_read_published on public.alumni;
create policy public_read_published on public.alumni
  for select to anon, authenticated using (is_published = true);

drop policy if exists admin_all on public.alumni;
create policy admin_all on public.alumni
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ─── events ─────────────────────────────────────────────────────────────────
drop policy if exists public_read_published on public.events;
create policy public_read_published on public.events
  for select to anon, authenticated using (is_published = true);

drop policy if exists admin_all on public.events;
create policy admin_all on public.events
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ─── event_gallery ──────────────────────────────────────────────────────────
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

drop policy if exists admin_all on public.event_gallery;
create policy admin_all on public.event_gallery
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ─── performances ───────────────────────────────────────────────────────────
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

drop policy if exists admin_all on public.performances;
create policy admin_all on public.performances
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ─── achievements ───────────────────────────────────────────────────────────
drop policy if exists public_read_published on public.achievements;
create policy public_read_published on public.achievements
  for select to anon, authenticated using (is_published = true);

drop policy if exists admin_all on public.achievements;
create policy admin_all on public.achievements
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ─── sponsors ───────────────────────────────────────────────────────────────
drop policy if exists public_read_published on public.sponsors;
create policy public_read_published on public.sponsors
  for select to anon, authenticated using (is_published = true);

drop policy if exists admin_all on public.sponsors;
create policy admin_all on public.sponsors
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ─── announcements: published AND inside its live window ────────────────────
drop policy if exists public_read_active on public.announcements;
create policy public_read_active on public.announcements
  for select to anon, authenticated
  using (
    is_published = true
    and starts_at <= now()
    and (ends_at is null or ends_at > now())
  );

drop policy if exists admin_all on public.announcements;
create policy admin_all on public.announcements
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ─── contact_messages: write-only inbox ─────────────────────────────────────
-- Anonymous visitors may submit; nobody but an admin may read. The absence of a SELECT
-- policy for anon is what makes the table unreadable from the browser.
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
  for insert to authenticated with check (public.is_admin());

drop policy if exists admin_read_messages on public.contact_messages;
create policy admin_read_messages on public.contact_messages
  for select to authenticated using (public.is_admin());

drop policy if exists admin_update_messages on public.contact_messages;
create policy admin_update_messages on public.contact_messages
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists admin_delete_messages on public.contact_messages;
create policy admin_delete_messages on public.contact_messages
  for delete to authenticated using (public.is_admin());

-- ─── media_assets: public read (the files are public anyway), admin write ───
drop policy if exists public_read_media on public.media_assets;
create policy public_read_media on public.media_assets
  for select to anon, authenticated using (true);

drop policy if exists admin_all on public.media_assets;
create policy admin_all on public.media_assets
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ─── settings: only explicitly public keys are exposed ──────────────────────
drop policy if exists public_read_public_settings on public.settings;
create policy public_read_public_settings on public.settings
  for select to anon, authenticated using (is_public = true);

drop policy if exists admin_all on public.settings;
create policy admin_all on public.settings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ─── admin_users: self-read, admin-manage ───────────────────────────────────
drop policy if exists read_own_admin_row on public.admin_users;
create policy read_own_admin_row on public.admin_users
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists admin_manage_admins on public.admin_users;
create policy admin_manage_admins on public.admin_users
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

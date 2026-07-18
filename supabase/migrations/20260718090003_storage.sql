-- ============================================================================
-- Saptham CMS — STEP 3 · Storage buckets + object policies
--
-- Run this AFTER steps 1 and 2 have committed. It is deliberately the last
-- schema step because `storage.objects` is owned by `supabase_storage_admin`,
-- and on some projects the SQL Editor role cannot create policies on it.
--
-- IF THIS STEP ERRORS, NOTHING ELSE IS LOST — steps 1, 2 and 4 are already
-- committed and the website works. Buckets marked `public` are world-readable
-- without any policy, which is all the site needs to display images. You would
-- only need the write policies to upload from the browser as an admin; those
-- can also be added in Dashboard → Storage → Policies.
--
-- All seven buckets: PUBLIC READ, ADMIN WRITE, with size caps and mime limits.
-- Idempotent.
-- ============================================================================

-- ─── Buckets ────────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('office-bearers','office-bearers', true,  10485760, array['image/jpeg','image/png','image/webp','image/avif']),
  ('alumni',        'alumni',         true,  10485760, array['image/jpeg','image/png','image/webp','image/avif']),
  ('events',        'events',         true,  15728640, array['image/jpeg','image/png','image/webp','image/avif']),
  ('gallery',       'gallery',        true,  15728640, array['image/jpeg','image/png','image/webp','image/avif']),
  ('hero',          'hero',           true,  52428800, array['image/jpeg','image/png','image/webp','image/avif','video/mp4','video/webm']),
  ('assets',        'assets',         true,  52428800, array['image/jpeg','image/png','image/webp','image/avif','image/svg+xml','video/mp4','video/webm','audio/mpeg','audio/webm']),
  ('logos',         'logos',          true,   5242880, array['image/jpeg','image/png','image/webp','image/avif','image/svg+xml'])
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- ─── Public read, one policy per bucket ─────────────────────────────────────
drop policy if exists public_read_office_bearers on storage.objects;
create policy public_read_office_bearers on storage.objects
  for select to anon, authenticated using (bucket_id = 'office-bearers');

drop policy if exists public_read_alumni on storage.objects;
create policy public_read_alumni on storage.objects
  for select to anon, authenticated using (bucket_id = 'alumni');

drop policy if exists public_read_events on storage.objects;
create policy public_read_events on storage.objects
  for select to anon, authenticated using (bucket_id = 'events');

drop policy if exists public_read_gallery on storage.objects;
create policy public_read_gallery on storage.objects
  for select to anon, authenticated using (bucket_id = 'gallery');

drop policy if exists public_read_hero on storage.objects;
create policy public_read_hero on storage.objects
  for select to anon, authenticated using (bucket_id = 'hero');

drop policy if exists public_read_assets on storage.objects;
create policy public_read_assets on storage.objects
  for select to anon, authenticated using (bucket_id = 'assets');

drop policy if exists public_read_logos on storage.objects;
create policy public_read_logos on storage.objects
  for select to anon, authenticated using (bucket_id = 'logos');

-- ─── Admin write, one policy per bucket ─────────────────────────────────────
drop policy if exists admin_write_office_bearers on storage.objects;
create policy admin_write_office_bearers on storage.objects
  for all to authenticated
  using (bucket_id = 'office-bearers' and public.is_admin())
  with check (bucket_id = 'office-bearers' and public.is_admin());

drop policy if exists admin_write_alumni on storage.objects;
create policy admin_write_alumni on storage.objects
  for all to authenticated
  using (bucket_id = 'alumni' and public.is_admin())
  with check (bucket_id = 'alumni' and public.is_admin());

drop policy if exists admin_write_events on storage.objects;
create policy admin_write_events on storage.objects
  for all to authenticated
  using (bucket_id = 'events' and public.is_admin())
  with check (bucket_id = 'events' and public.is_admin());

drop policy if exists admin_write_gallery on storage.objects;
create policy admin_write_gallery on storage.objects
  for all to authenticated
  using (bucket_id = 'gallery' and public.is_admin())
  with check (bucket_id = 'gallery' and public.is_admin());

drop policy if exists admin_write_hero on storage.objects;
create policy admin_write_hero on storage.objects
  for all to authenticated
  using (bucket_id = 'hero' and public.is_admin())
  with check (bucket_id = 'hero' and public.is_admin());

drop policy if exists admin_write_assets on storage.objects;
create policy admin_write_assets on storage.objects
  for all to authenticated
  using (bucket_id = 'assets' and public.is_admin())
  with check (bucket_id = 'assets' and public.is_admin());

drop policy if exists admin_write_logos on storage.objects;
create policy admin_write_logos on storage.objects
  for all to authenticated
  using (bucket_id = 'logos' and public.is_admin())
  with check (bucket_id = 'logos' and public.is_admin());

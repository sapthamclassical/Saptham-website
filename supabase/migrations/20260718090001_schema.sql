-- ============================================================================
-- Saptham CMS — STEP 1 · Tables
--
-- Deliberately plain SQL: no extensions, no auth.* foreign keys, no nested
-- dollar-quoting. The Supabase SQL Editor runs a pasted script as ONE
-- transaction, so a single failing statement rolls back everything — this file
-- avoids every construct that can fail on a locked-down project.
--
-- gen_random_uuid() is built into PostgreSQL 13+ (no pgcrypto needed).
-- Idempotent: safe to re-run.
-- ============================================================================

-- ─── Enums ──────────────────────────────────────────────────────────────────
do $$ begin
  create type public.event_type as enum
    ('production','festival','workshop','competition','symposium','other');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.performance_type as enum
    ('dance','vocal','instrumental','drama','fusion','other');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.sponsor_tier as enum
    ('title','gold','silver','bronze','partner','supporter');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.message_status as enum
    ('new','read','replied','archived','spam');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.media_kind as enum
    ('image','video','audio','document','other');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.announcement_priority as enum
    ('low','normal','high','urgent');
exception when duplicate_object then null; end $$;

-- ─── Helpers ────────────────────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end $$;

revoke all privileges on function public.set_updated_at() from public;

-- Admin registry. RLS needs an admin predicate. `user_id` holds an auth.users
-- id but carries no FK: adding one requires REFERENCES on the auth schema,
-- which is not guaranteed to be grantable in the SQL Editor.
create table if not exists public.admin_users (
  user_id     uuid primary key,
  email       text,
  note        text,
  created_at  timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admin_users a where a.user_id = auth.uid());
$$;

revoke all privileges on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- ─── office_bearers ─────────────────────────────────────────────────────────
create table if not exists public.office_bearers (
  id             uuid primary key default gen_random_uuid(),
  full_name      text not null,
  role           text not null,
  department     text,
  academic_year  text not null,
  image_path     text,
  bio            text,
  email          text,
  phone          text,
  social         jsonb not null default '{}'::jsonb,
  display_order  integer not null default 0,
  is_published   boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  constraint office_bearers_unique_per_year unique (full_name, academic_year)
);
create index if not exists office_bearers_year_order_idx
  on public.office_bearers (academic_year, display_order);

-- ─── alumni ─────────────────────────────────────────────────────────────────
create table if not exists public.alumni (
  id              uuid primary key default gen_random_uuid(),
  full_name       text not null,
  role            text,
  tenure          text,
  graduation_year smallint,
  quote           text,
  image_path      text,
  display_order   integer not null default 0,
  is_featured     boolean not null default true,
  is_published    boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  constraint alumni_unique_person unique (full_name, tenure)
);
create index if not exists alumni_order_idx on public.alumni (display_order);

-- ─── events ─────────────────────────────────────────────────────────────────
create table if not exists public.events (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  title            text not null,
  subtitle         text,
  description      text,
  event_type       public.event_type not null default 'other',
  event_date       date,
  venue            text,
  cover_image_path text,
  display_order    integer not null default 0,
  is_published     boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create index if not exists events_type_order_idx on public.events (event_type, display_order);

-- ─── event_gallery ──────────────────────────────────────────────────────────
create table if not exists public.event_gallery (
  id            uuid primary key default gen_random_uuid(),
  event_id      uuid references public.events(id) on delete cascade,
  category      text,
  image_path    text not null,
  caption       text,
  alt_text      text,
  display_order integer not null default 0,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now()
);
create index if not exists event_gallery_event_idx on public.event_gallery (event_id, display_order);
create index if not exists event_gallery_category_idx on public.event_gallery (category, display_order);

-- ─── performances ───────────────────────────────────────────────────────────
create table if not exists public.performances (
  id               uuid primary key default gen_random_uuid(),
  event_id         uuid references public.events(id) on delete set null,
  title            text not null,
  performance_type public.performance_type not null default 'other',
  description      text,
  performers       text[] not null default '{}',
  raga             text,
  tala             text,
  video_url        text,
  performed_on     date,
  display_order    integer not null default 0,
  is_published     boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create index if not exists performances_event_idx on public.performances (event_id, display_order);

-- ─── achievements ───────────────────────────────────────────────────────────
create table if not exists public.achievements (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  description   text,
  awarding_body text,
  category      text,
  awarded_on    date,
  image_path    text,
  display_order integer not null default 0,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ─── announcements ──────────────────────────────────────────────────────────
create table if not exists public.announcements (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  body         text,
  link_url     text,
  priority     public.announcement_priority not null default 'normal',
  starts_at    timestamptz not null default now(),
  ends_at      timestamptz,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists announcements_window_idx on public.announcements (starts_at, ends_at);

-- ─── sponsors ───────────────────────────────────────────────────────────────
create table if not exists public.sponsors (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  tier          public.sponsor_tier not null default 'supporter',
  logo_path     text,
  website_url   text,
  description   text,
  display_order integer not null default 0,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists sponsors_tier_idx on public.sponsors (tier, display_order);

-- ─── contact_messages ───────────────────────────────────────────────────────
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  subject     text,
  message     text not null,
  status      public.message_status not null default 'new',
  source      text not null default 'website',
  admin_notes text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists contact_messages_status_idx on public.contact_messages (status, created_at desc);

-- ─── media_assets ───────────────────────────────────────────────────────────
create table if not exists public.media_assets (
  id          uuid primary key default gen_random_uuid(),
  bucket      text not null,
  path        text not null,
  kind        public.media_kind not null default 'image',
  title       text,
  alt_text    text,
  caption     text,
  mime_type   text,
  size_bytes  bigint,
  width       integer,
  height      integer,
  checksum    text,
  uploaded_by uuid,
  created_at  timestamptz not null default now(),
  constraint media_assets_unique_object unique (bucket, path)
);

-- ─── settings ───────────────────────────────────────────────────────────────
create table if not exists public.settings (
  key         text primary key,
  value       jsonb not null default '{}'::jsonb,
  description text,
  is_public   boolean not null default true,
  updated_at  timestamptz not null default now()
);

-- ─── updated_at triggers ────────────────────────────────────────────────────
drop trigger if exists set_updated_at on public.office_bearers;
create trigger set_updated_at before update on public.office_bearers
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.alumni;
create trigger set_updated_at before update on public.alumni
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.events;
create trigger set_updated_at before update on public.events
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.performances;
create trigger set_updated_at before update on public.performances
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.achievements;
create trigger set_updated_at before update on public.achievements
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.announcements;
create trigger set_updated_at before update on public.announcements
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.sponsors;
create trigger set_updated_at before update on public.sponsors
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.contact_messages;
create trigger set_updated_at before update on public.contact_messages
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.settings;
create trigger set_updated_at before update on public.settings
  for each row execute function public.set_updated_at();

-- Enable RLS before this migration commits. Policies arrive in the next
-- migration, so a clean deployment is deny-by-default during that interval.
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

/**
 * Database types for the Saptham CMS.
 *
 * Mirrors supabase/migrations/*.sql exactly. Regenerate with the CLI once the
 * project is linked:
 *   supabase gen types typescript --project-id <ref> > src/lib/database.types.ts
 *
 * NOTE: every row shape is declared with `type`, never `interface`.
 * supabase-js constrains tables to `Row: Record<string, unknown>`, and interfaces
 * have no implicit index signature — using one silently degrades the whole
 * schema to `never` and breaks `.insert()` inference.
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type EventType =
  | "production" | "festival" | "workshop" | "competition" | "symposium" | "other";
export type PerformanceType =
  | "dance" | "vocal" | "instrumental" | "drama" | "fusion" | "other";
export type SponsorTier =
  | "title" | "gold" | "silver" | "bronze" | "partner" | "supporter";
export type MessageStatus = "new" | "read" | "replied" | "archived" | "spam";
export type MediaKind = "image" | "video" | "audio" | "document" | "other";
export type AnnouncementPriority = "low" | "normal" | "high" | "urgent";

export type OfficeBearerRow = {
  id: string;
  full_name: string;
  role: string;
  department: string | null;
  academic_year: string;
  image_path: string | null;
  bio: string | null;
  email: string | null;
  phone: string | null;
  social: Json;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type AlumnusRow = {
  id: string;
  full_name: string;
  role: string | null;
  tenure: string | null;
  graduation_year: number | null;
  quote: string | null;
  image_path: string | null;
  display_order: number;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type EventRow = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  event_type: EventType;
  event_date: string | null;
  venue: string | null;
  cover_image_path: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type EventGalleryRow = {
  id: string;
  event_id: string | null;
  category: string | null;
  image_path: string;
  caption: string | null;
  alt_text: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
};

export type PerformanceRow = {
  id: string;
  event_id: string | null;
  title: string;
  performance_type: PerformanceType;
  description: string | null;
  performers: string[];
  raga: string | null;
  tala: string | null;
  video_url: string | null;
  performed_on: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type AchievementRow = {
  id: string;
  title: string;
  description: string | null;
  awarding_body: string | null;
  category: string | null;
  awarded_on: string | null;
  image_path: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type AnnouncementRow = {
  id: string;
  title: string;
  body: string | null;
  link_url: string | null;
  priority: AnnouncementPriority;
  starts_at: string;
  ends_at: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type SponsorRow = {
  id: string;
  name: string;
  tier: SponsorTier;
  logo_path: string | null;
  website_url: string | null;
  description: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type ContactMessageRow = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: MessageStatus;
  source: string;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type MediaAssetRow = {
  id: string;
  bucket: string;
  path: string;
  kind: MediaKind;
  title: string | null;
  alt_text: string | null;
  caption: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  width: number | null;
  height: number | null;
  checksum: string | null;
  uploaded_by: string | null;
  created_at: string;
};

export type SettingRow = {
  key: string;
  value: Json;
  description: string | null;
  is_public: boolean;
  updated_at: string;
};

/** Collapses an intersection into one object type so `.insert()` infers cleanly. */
type Flatten<T> = { [K in keyof T]: T[K] };

/** Row / Insert / Update triple, matching supabase-gen output shape. */
type Table<Row, Required extends keyof Row> = {
  Row: Row;
  Insert: Flatten<Pick<Row, Required> & Partial<Omit<Row, Required>>>;
  Update: Partial<Row>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      office_bearers: Table<OfficeBearerRow, "full_name" | "role" | "academic_year">;
      alumni: Table<AlumnusRow, "full_name">;
      events: Table<EventRow, "slug" | "title">;
      event_gallery: Table<EventGalleryRow, "image_path">;
      performances: Table<PerformanceRow, "title">;
      achievements: Table<AchievementRow, "title">;
      announcements: Table<AnnouncementRow, "title">;
      sponsors: Table<SponsorRow, "name">;
      contact_messages: Table<ContactMessageRow, "name" | "email" | "message">;
      media_assets: Table<MediaAssetRow, "bucket" | "path">;
      settings: Table<SettingRow, "key">;
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: {
      event_type: EventType;
      performance_type: PerformanceType;
      sponsor_tier: SponsorTier;
      message_status: MessageStatus;
      media_kind: MediaKind;
      announcement_priority: AnnouncementPriority;
    };
    CompositeTypes: Record<string, never>;
  };
};

/** Storage buckets, as created in 0003_storage.sql. */
export const BUCKETS = [
  "office-bearers", "alumni", "events", "gallery", "hero", "assets", "logos",
] as const;
export type Bucket = (typeof BUCKETS)[number];

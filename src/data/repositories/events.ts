import { supabase, storageUrl } from "../../lib/supabase";
import type { EventRow, EventGalleryRow, EventType } from "../../lib/database.types";
import { withFallback, type Result } from "./base";

export interface SapthamEvent {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  type: EventType;
  date: string | null;
  venue: string;
  coverImage: string | null;
}

export interface GalleryImage {
  id: string;
  eventId: string | null;
  category: string | null;
  url: string | null;
  caption: string;
  alt: string;
}

function toEvent(row: EventRow): SapthamEvent {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle ?? "",
    description: row.description ?? "",
    type: row.event_type,
    date: row.event_date,
    venue: row.venue ?? "",
    coverImage: storageUrl("events", row.cover_image_path),
  };
}

/**
 * Published events, optionally filtered by type. Events currently render from
 * component constants, so the fallback is an empty list — callers keep their
 * existing data until the Events UI is wired in a later phase.
 */
export async function getEvents(type?: EventType): Promise<Result<SapthamEvent[]>> {
  const result = await withFallback<EventRow[]>(
    "events",
    async () => {
      let q = supabase!
        .from("events")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });
      if (type) q = q.eq("event_type", type);
      return await q;
    },
    [],
  );

  return {
    data: result.source === "supabase" ? result.data.map(toEvent) : [],
    source: result.source,
    error: result.error,
  };
}

/** Gallery images for one event, or for a standalone category album. */
export async function getGalleryImages(opts: {
  eventId?: string;
  category?: string;
}): Promise<Result<GalleryImage[]>> {
  const result = await withFallback<EventGalleryRow[]>(
    "event_gallery",
    async () => {
      let q = supabase!
        .from("event_gallery")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });
      if (opts.eventId) q = q.eq("event_id", opts.eventId);
      if (opts.category) q = q.eq("category", opts.category);
      return await q;
    },
    [],
  );

  return {
    data:
      result.source === "supabase"
        ? result.data.map((row) => ({
            id: row.id,
            eventId: row.event_id,
            category: row.category,
            url: storageUrl("gallery", row.image_path),
            caption: row.caption ?? "",
            alt: row.alt_text ?? row.caption ?? "",
          }))
        : [],
    source: result.source,
    error: result.error,
  };
}

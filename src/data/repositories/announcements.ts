import { supabase } from "../../lib/supabase";
import type { AnnouncementRow } from "../../lib/database.types";
import { withFallback, type Result } from "./base";

/** UI shape for the announcement ribbon. */
export interface Announcement {
  id: string;
  title: string;
  body: string;
  linkUrl: string | null;
  priority: string;
}

const fallback: Announcement[] = [];

function toAnnouncement(row: AnnouncementRow): Announcement {
  return {
    id: row.id,
    title: row.title,
    body: row.body ?? "",
    linkUrl: row.link_url,
    priority: row.priority,
  };
}

/**
 * Live announcements only.
 *
 * The RLS policy already restricts anon to rows inside their start/end window,
 * but the same window is applied here too: an authenticated admin bypasses that
 * policy, and without this filter they would see expired notices on the public
 * site while everyone else saw none.
 */
export async function getAnnouncements(): Promise<Result<Announcement[]>> {
  const nowIso = new Date().toISOString();

  const result = await withFallback<AnnouncementRow[]>(
    "announcements",
    async () =>
      await supabase!
        .from("announcements")
        .select("*")
        .eq("is_published", true)
        .lte("starts_at", nowIso)
        .or(`ends_at.is.null,ends_at.gte.${nowIso}`)
        .order("priority", { ascending: false }),
    [],
  );

  if (result.source === "fallback") {
    return { data: fallback, source: "fallback", error: result.error };
  }
  return { data: result.data.map(toAnnouncement), source: "supabase", error: null };
}

import { supabase, isSupabaseConfigured } from "../../lib/supabase";
import type { CalendarEventRow } from "../../lib/database.types";
import { withFallback, type Result } from "./base";

/** UI shape for one performance on the season calendar. */
export interface SeasonEvent {
  id: string;
  title: string;
  details: string;
  venue: string;
  date: string; // ISO yyyy-mm-dd
  timeNote: string;
  accent: string | null;
  isPublished: boolean;
}

const toSeasonEvent = (row: CalendarEventRow): SeasonEvent => ({
  id: row.id,
  title: row.title,
  details: row.details ?? "",
  venue: row.venue ?? "",
  date: row.happens_on,
  timeNote: row.time_note ?? "",
  accent: row.accent,
  isPublished: row.is_published,
});

/**
 * Upcoming performances, soonest first. No bundled fallback exists — an empty
 * season is a legitimate answer, so the page renders its empty state.
 */
export async function getSeasonEvents(): Promise<Result<SeasonEvent[]>> {
  const result = await withFallback<CalendarEventRow[]>(
    "calendar",
    async () =>
      await supabase!
        .from("calendar_events")
        .select("*")
        .order("happens_on", { ascending: true }),
    [],
  );
  if (result.source === "fallback") {
    return { data: [], source: "fallback", error: result.error };
  }
  return { data: result.data.map(toSeasonEvent), source: "supabase", error: null };
}

/* ── Admin writes — RLS admits only the authenticated admin session ──────── */

export async function createSeasonEvent(input: {
  title: string;
  date: string;
  venue?: string;
  details?: string;
  timeNote?: string;
  accent?: string;
}): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured || !supabase) return { error: "Supabase not configured" };
  const { data, error } = await supabase
    .from("calendar_events")
    .insert({
      title: input.title,
      happens_on: input.date,
      venue: input.venue ?? null,
      details: input.details ?? null,
      time_note: input.timeNote ?? null,
      accent: input.accent ?? null,
    })
    .select("id");
  if (error) return { error: error.message };
  return { error: data?.length === 1 ? null : "The calendar event was not created." };
}

export async function updateSeasonEvent(
  id: string,
  patch: Partial<{ title: string; date: string; venue: string; details: string; timeNote: string; accent: string; isPublished: boolean }>,
): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured || !supabase) return { error: "Supabase not configured" };
  const { data, error } = await supabase
    .from("calendar_events")
    .update({
      ...(patch.title !== undefined && { title: patch.title }),
      ...(patch.date !== undefined && { happens_on: patch.date }),
      ...(patch.venue !== undefined && { venue: patch.venue }),
      ...(patch.details !== undefined && { details: patch.details }),
      ...(patch.timeNote !== undefined && { time_note: patch.timeNote }),
      ...(patch.accent !== undefined && { accent: patch.accent }),
      ...(patch.isPublished !== undefined && { is_published: patch.isPublished }),
    })
    .eq("id", id)
    .select("id");
  if (error) return { error: error.message };
  return { error: data?.length === 1 ? null : "The calendar event was not updated." };
}

export async function deleteSeasonEvent(id: string): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured || !supabase) return { error: "Supabase not configured" };
  const { data, error } = await supabase
    .from("calendar_events")
    .delete()
    .eq("id", id)
    .select("id");
  if (error) return { error: error.message };
  return { error: data?.length === 1 ? null : "The calendar event was not deleted." };
}

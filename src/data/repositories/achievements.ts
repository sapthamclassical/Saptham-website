import { supabase, storageUrl } from "../../lib/supabase";
import type { AchievementRow } from "../../lib/database.types";
import { withFallback, type Result } from "./base";

/** UI shape for an achievement card. */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  awardingBody: string;
  category: string;
  awardedOn: string | null;
  image: string;
}

/**
 * No bundled JSON exists for achievements — the section is new and the table is
 * the only source. An empty list is a legitimate answer here, so the section
 * simply renders nothing rather than falling back to invented content.
 */
const fallback: Achievement[] = [];

function toAchievement(row: AchievementRow): Achievement {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    awardingBody: row.awarding_body ?? "",
    category: row.category ?? "",
    awardedOn: row.awarded_on,
    image: storageUrl("assets", row.image_path) ?? "",
  };
}

export async function getAchievements(): Promise<Result<Achievement[]>> {
  const result = await withFallback<AchievementRow[]>(
    "achievements",
    async () =>
      await supabase!
        .from("achievements")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true }),
    [],
  );

  if (result.source === "fallback") {
    return { data: fallback, source: "fallback", error: result.error };
  }
  return { data: result.data.map(toAchievement), source: "supabase", error: null };
}

import { supabase } from "../../lib/supabase";
import type { Json, SettingRow } from "../../lib/database.types";
import { withFallback, type Result } from "./base";

export type SettingsMap = Record<string, Json>;

/** All world-readable settings, keyed (`site.title`, `contact.email`, …). */
export async function getPublicSettings(): Promise<Result<SettingsMap>> {
  const result = await withFallback<SettingRow[]>(
    "settings",
    async () => await supabase!.from("settings").select("*").eq("is_public", true),
    [],
  );

  if (result.source === "fallback") {
    return { data: {}, source: "fallback", error: result.error };
  }
  return {
    data: Object.fromEntries(result.data.map((r) => [r.key, r.value])),
    source: "supabase",
    error: null,
  };
}

/** One setting, with a caller-supplied default. */
export async function getSetting<T extends Json>(key: string, fallbackValue: T): Promise<T> {
  const { data } = await getPublicSettings();
  return (data[key] as T | undefined) ?? fallbackValue;
}

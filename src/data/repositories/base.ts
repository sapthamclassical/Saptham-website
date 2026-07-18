import { supabase, isSupabaseConfigured } from "../../lib/supabase";

/** Where a repository's data came from — useful for diagnostics and tests. */
export type DataSource = "supabase" | "fallback";

export interface Result<T> {
  data: T;
  source: DataSource;
  error: string | null;
}

const DEV = import.meta.env.DEV;

/**
 * Runs a Supabase query, degrading to bundled JSON on any failure.
 *
 * The site must never break because the network blipped, the env vars are
 * missing, or the tables haven't been migrated yet — during the migration
 * window all three are expected. An empty table also counts as "not migrated
 * yet" and yields the fallback, so content never silently disappears.
 */
export async function withFallback<T>(
  label: string,
  query: () => Promise<{ data: T | null; error: { message: string } | null }>,
  fallback: T,
  isEmpty: (value: T) => boolean = (v) => Array.isArray(v) && v.length === 0,
): Promise<Result<T>> {
  if (!isSupabaseConfigured || !supabase) {
    return { data: fallback, source: "fallback", error: null };
  }

  try {
    const { data, error } = await query();

    if (error) {
      if (DEV) console.warn(`[saptham/${label}] Supabase error — using bundled data:`, error.message);
      return { data: fallback, source: "fallback", error: error.message };
    }
    if (data === null || isEmpty(data)) {
      if (DEV) console.info(`[saptham/${label}] no rows yet — using bundled data.`);
      return { data: fallback, source: "fallback", error: null };
    }
    return { data, source: "supabase", error: null };
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : String(cause);
    if (DEV) console.warn(`[saptham/${label}] request failed — using bundled data:`, message);
    return { data: fallback, source: "fallback", error: message };
  }
}

import { supabase, storageUrl } from "../../lib/supabase";
import type { AlumnusRow } from "../../lib/database.types";
import { withFallback, type Result } from "./base";
import fallbackJson from "../alumni.json";

/** The shape the Testimonials carousel already renders. */
export interface Alumnus {
  name: string;
  role: string;
  year: string;
  image: string;
  quote: string;
}

const fallback: Alumnus[] = fallbackJson.members as Alumnus[];

function toAlumnus(row: AlumnusRow): Alumnus {
  return {
    name: row.full_name,
    role: row.role ?? "",
    year: row.tenure ?? (row.graduation_year ? `'${String(row.graduation_year).slice(2)}` : ""),
    image: storageUrl("alumni", row.image_path) ?? "",
    quote: row.quote ?? "",
  };
}

/** Featured alumni voices, ordered. Falls back to the bundled JSON. */
export async function getAlumni(): Promise<Result<Alumnus[]>> {
  const result = await withFallback<AlumnusRow[]>(
    "alumni",
    async () =>
      await supabase!
        .from("alumni")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true }),
    [],
  );

  if (result.source === "fallback") {
    return { data: fallback, source: "fallback", error: result.error };
  }
  return { data: result.data.map(toAlumnus), source: "supabase", error: null };
}

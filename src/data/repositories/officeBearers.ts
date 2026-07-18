import { supabase, storageUrl } from "../../lib/supabase";
import type { OfficeBearerRow } from "../../lib/database.types";
import { withFallback, type Result } from "./base";
import fallbackJson from "../officeBearers.json";

/**
 * The shape the UI already renders (PersonCard / OfficeBearers). DB rows are
 * adapted to this so no component markup had to change.
 */
export interface Person {
  name: string;
  role: string;
  department: string;
  image: string;
  bio: string;
  social: Record<string, string>;
}

export interface OfficeBearersData {
  year: string;
  members: Person[];
}

const fallback: OfficeBearersData = {
  year: fallbackJson.year,
  members: fallbackJson.members as Person[],
};

function toPerson(row: OfficeBearerRow): Person {
  return {
    name: row.full_name,
    role: row.role,
    department: row.department ?? "",
    // null image_path → "" → PersonCard keeps the initials placeholder
    image: storageUrl("office-bearers", row.image_path) ?? "",
    bio: row.bio ?? "",
    social: (row.social as Record<string, string> | null) ?? {},
  };
}

/** Current bearers, ordered as configured. Falls back to the bundled JSON. */
export async function getOfficeBearers(academicYear?: string): Promise<Result<OfficeBearersData>> {
  const result = await withFallback<OfficeBearerRow[]>(
    "office_bearers",
    async () => {
      let q = supabase!
        .from("office_bearers")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });
      if (academicYear) q = q.eq("academic_year", academicYear);
      return await q;
    },
    [],
  );

  if (result.source === "fallback") {
    return { data: fallback, source: "fallback", error: result.error };
  }

  return {
    data: {
      year: result.data[0]?.academic_year ?? fallback.year,
      members: result.data.map(toPerson),
    },
    source: "supabase",
    error: null,
  };
}

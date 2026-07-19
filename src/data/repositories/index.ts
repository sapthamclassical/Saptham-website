/**
 * Data-access layer for the Saptham CMS.
 *
 * Every function returns `{ data, source, error }` and degrades to the bundled
 * JSON when Supabase is unconfigured, unreachable, or not yet migrated — so the
 * UI renders identically before and after the backend goes live.
 */
export { withFallback } from "./base";
export type { Result, DataSource } from "./base";

export { getOfficeBearers } from "./officeBearers";
export type { Person, OfficeBearersData } from "./officeBearers";

export { getAlumni } from "./alumni";
export type { Alumnus } from "./alumni";

export { getEvents, getGalleryImages } from "./events";
export type { SapthamEvent, GalleryImage } from "./events";

export { getAchievements } from "./achievements";
export type { Achievement } from "./achievements";

export { getAnnouncements } from "./announcements";
export type { Announcement } from "./announcements";

export { submitContactMessage } from "./contact";
export type { ContactSubmission } from "./contact";

export { getPublicSettings, getSetting } from "./settings";

export { getSeasonEvents, createSeasonEvent, updateSeasonEvent, deleteSeasonEvent } from "./calendar";
export type { SeasonEvent } from "./calendar";
export type { SettingsMap } from "./settings";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database, Bucket } from "./database.types";

/**
 * Browser Supabase client (Vite SPA — no SSR, no cookies, no middleware).
 *
 * If the env vars are absent the client is simply `null`: every repository then
 * falls back to the bundled JSON, so the site keeps working with zero config.
 */
const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(url && publishableKey);

export const supabase: SupabaseClient<Database> | null = isSupabaseConfigured
  ? createClient<Database>(url, publishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        // SPA: tokens arrive in the URL hash after an OAuth/magic-link redirect.
        detectSessionInUrl: true,
      },
      global: { headers: { "x-application-name": "saptham-web" } },
    })
  : null;

/**
 * Public URL for an object in a Storage bucket.
 * `path` may be null (no image uploaded yet) or already an absolute URL.
 */
export function storageUrl(bucket: Bucket, path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path; // already absolute
  if (!supabase) return null;
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl ?? null;
}

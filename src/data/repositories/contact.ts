import { supabase, isSupabaseConfigured } from "../../lib/supabase";

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

/**
 * Records a contact message.
 *
 * RLS allows anonymous INSERT on `contact_messages` but no SELECT, so a
 * submitter can send a message and can never read anyone else's. Returns false
 * (rather than throwing) when Supabase isn't configured, letting the existing
 * Formspree path stay the source of truth during the migration window.
 */
export async function submitContactMessage(
  payload: ContactSubmission,
): Promise<{ ok: boolean; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) {
    return { ok: false, error: "supabase-not-configured" };
  }
  const { error } = await supabase.from("contact_messages").insert({
    name: payload.name.trim(),
    email: payload.email.trim(),
    subject: payload.subject?.trim() ?? null,
    message: payload.message.trim(),
    source: "website",
  });
  return { ok: !error, error: error?.message ?? null };
}

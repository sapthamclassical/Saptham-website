import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "./supabase";

/**
 * The hidden admin door.
 *
 * The UI asks only for a password; under the hood it is a real Supabase auth
 * session for a fixed admin identity, so every calendar write is enforced by
 * Row Level Security on the server. Guessing the trigger reveals nothing:
 * without the password there is no session, and without a session Postgres
 * refuses the write — the client holds no secrets at all.
 */
const ADMIN_EMAIL = "admin@saptham.club";

export async function signInAdmin(password) {
  if (!isSupabaseConfigured || !supabase) return { ok: false, error: "Backend not configured" };
  const { error } = await supabase.auth.signInWithPassword({ email: ADMIN_EMAIL, password });
  if (error) return { ok: false, error: "That is not the key." };
  return { ok: true, error: null };
}

export async function signOutAdmin() {
  await supabase?.auth.signOut();
}

/** Live admin-session state; updates on sign-in/out across the app. */
export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setIsAdmin(Boolean(data.session)));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setIsAdmin(Boolean(session));
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return isAdmin;
}

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

async function getAdminMembership() {
  if (!supabase) return { allowed: false, verificationFailed: true };
  try {
    const { data, error } = await supabase.rpc("is_admin");
    if (error) return { allowed: false, verificationFailed: true };
    return { allowed: data === true, verificationFailed: false };
  } catch {
    return { allowed: false, verificationFailed: true };
  }
}

export async function signInAdmin(password) {
  if (!isSupabaseConfigured || !supabase) return { ok: false, error: "Backend not configured" };
  const { error } = await supabase.auth.signInWithPassword({ email: ADMIN_EMAIL, password });
  if (error) return { ok: false, error: "That is not the key." };

  const membership = await getAdminMembership();
  if (!membership.allowed) {
    try {
      await supabase.auth.signOut({ scope: "local" });
    } catch {
      // Fail closed even if clearing the local session reports a network error.
    }
    return {
      ok: false,
      error: membership.verificationFailed
        ? "Admin access could not be verified. Please try again."
        : "This account is not allowed into the green room.",
    };
  }

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

    let active = true;
    let checkId = 0;
    let authTimer;
    const refreshAdminState = async (session) => {
      const currentCheck = ++checkId;
      const membership = session
        ? await getAdminMembership()
        : { allowed: false, verificationFailed: false };
      const next = Boolean(session) && membership.allowed;
      if (active && currentCheck === checkId) setIsAdmin(next);
    };

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      void refreshAdminState(data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      window.clearTimeout(authTimer);
      if (!session) {
        checkId += 1;
        setIsAdmin(false);
        return;
      }
      // Supabase holds an internal auth lock while invoking this callback.
      // Defer API work until the callback has returned to avoid a deadlock.
      authTimer = window.setTimeout(() => {
        void refreshAdminState(session);
      }, 0);
    });
    return () => {
      active = false;
      checkId += 1;
      window.clearTimeout(authTimer);
      sub.subscription.unsubscribe();
    };
  }, []);

  return isAdmin;
}

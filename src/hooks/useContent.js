import { useEffect, useState } from "react";
import {
  getOfficeBearers,
  getAlumni,
  getEvents,
  getGalleryImages,
  getAchievements,
  getAnnouncements,
} from "../data/repositories";
import officeBearersJson from "../data/officeBearers.json";
import alumniJson from "../data/alumni.json";

/**
 * Content hooks — Supabase first, bundled JSON as the immediate fallback.
 *
 * They seed state synchronously from the JSON so the very first paint is
 * identical to before (no spinner, no layout shift, no animation change), then
 * quietly swap in live CMS data once it resolves.
 */

/**
 * Process-lifetime cache, keyed by request.
 *
 * Routes are code-split and unmount on navigation, so without this every trip
 * to /events and back re-hits the network for data that cannot have changed.
 * We cache the in-flight PROMISE rather than the resolved value, which also
 * collapses the duplicate requests React StrictMode fires in development.
 */
const cache = new Map();

function cached(key, load) {
  if (!cache.has(key)) {
    cache.set(
      key,
      load().catch((error) => {
        // A rejection must not stay cached — the next mount should retry.
        cache.delete(key);
        throw error;
      }),
    );
  }
  return cache.get(key);
}

/** Clears the content cache. Exposed for an admin "refresh" affordance later. */
export function invalidateContentCache() {
  cache.clear();
}

/**
 * Shared plumbing: seed synchronously, resolve asynchronously, and ignore the
 * result if the component unmounted first.
 */
function useCachedList(key, load) {
  const [state, setState] = useState({ data: [], source: "fallback", loading: true });

  useEffect(() => {
    let cancelled = false;
    cached(key, load)
      .then((result) => {
        if (!cancelled) setState({ data: result.data, source: result.source, loading: false });
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, loading: false }));
      });
    return () => {
      cancelled = true;
    };
  }, [key, load]);

  return state;
}

/** @returns {{ year: string, members: Array, source: string, loading: boolean }} */
export function useOfficeBearers(academicYear) {
  const key = `office_bearers:${academicYear ?? "current"}`;
  const [state, setState] = useState({
    year: officeBearersJson.year,
    members: officeBearersJson.members,
    source: "fallback",
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    cached(key, () => getOfficeBearers(academicYear))
      .then(({ data, source }) => {
        if (cancelled) return;
        if (data?.members?.length) {
          setState({ year: data.year, members: data.members, source, loading: false });
        } else {
          setState((s) => ({ ...s, loading: false }));
        }
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, loading: false }));
      });
    return () => {
      cancelled = true;
    };
  }, [key, academicYear]);

  return state;
}

/** @returns {{ members: Array, source: string, loading: boolean }} */
export function useAlumni() {
  const [state, setState] = useState({
    members: alumniJson.members,
    source: "fallback",
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    cached("alumni", getAlumni)
      .then(({ data, source }) => {
        if (cancelled) return;
        if (data?.length) setState({ members: data, source, loading: false });
        else setState((s) => ({ ...s, loading: false }));
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, loading: false }));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

/** @returns {{ data: Array, source: string, loading: boolean }} */
export function useEvents() {
  return useCachedList("events", getEvents);
}

/** @returns {{ data: Array, source: string, loading: boolean }} */
export function useGalleryImages() {
  return useCachedList("gallery", getGalleryImages);
}

/** @returns {{ data: Array, source: string, loading: boolean }} */
export function useAchievements() {
  return useCachedList("achievements", getAchievements);
}

/** @returns {{ data: Array, source: string, loading: boolean }} */
export function useAnnouncements() {
  return useCachedList("announcements", getAnnouncements);
}

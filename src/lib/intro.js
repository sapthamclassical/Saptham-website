/**
 * Overture session state, shared between the Overture itself and the Hero.
 *
 * The Hero reads `introDelay()` so its letter bloom begins as the curtains
 * part instead of having already finished behind them — the two sequences form
 * one continuous piece of choreography.
 */
const KEY = "saptham-overture-seen";

export function shouldPlayOverture() {
  try {
    return sessionStorage.getItem(KEY) === null;
  } catch {
    return false;
  }
}

export function markOvertureSeen() {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* private mode — the overture simply plays every load */
  }
}

/**
 * Extra delay (s) the hero adds to its own entrance when the overture is
 * playing this load. The curtains start parting at ~2.45s; the letters begin
 * rising just before they're fully open.
 */
let playedThisLoad = null;

export function introDelay() {
  if (playedThisLoad === null) playedThisLoad = shouldPlayOverture();
  return playedThisLoad ? 2.1 : 0;
}

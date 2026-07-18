/**
 * Saptham mark — geometry, single source of truth.
 *
 * The React components and scripts/build-brand.mjs both import from here, so an
 * exported .svg/.png can never drift from what the site renders.
 *
 * ── What is preserved from the original logo ───────────────────────────────
 *   · the calligraphic S, still the dominant form
 *   · the vertical string bisecting it (the tanpura/veena drone string)
 *   · a dancer held in the S's upper counter
 *   · the fan of blades radiating from the lower bowl
 *
 * ── What is modernised ─────────────────────────────────────────────────────
 *   · the S is rebuilt as one closed contour with true calligraphic modulation
 *     (thin horizontals, thick diagonal) instead of a scanned brush stroke
 *   · the dancer is reduced to four geometric strokes — legible at 32px, where
 *     the original's rendered detail turned to mush
 *   · the fan is exactly SEVEN blades. Saptham means seven; the original's
 *     arbitrary pleats become the seven swaras. Same silhouette, real meaning.
 *   · the muddy purple/lime/orange is gone in favour of the one gold ramp
 */

/** Everything is authored in a 512×512 box. */
export const VIEWBOX = 512;

/**
 * The S — one closed path. Outer contour runs top-right → around the bowl →
 * down the diagonal → around the lower bowl → out to the bottom-left terminal;
 * the inner contour returns, offset tighter at the horizontals than at the
 * diagonal. That difference IS the calligraphic contrast (~34u vs ~46u).
 */
export const S_PATH = [
  "M374 148",
  "C368 96 312 64 250 64",
  "C178 64 116 106 116 174",
  "C116 240 178 270 246 292",
  "C312 313 348 332 348 368",
  "C348 403 305 422 252 422",
  "C203 422 164 405 154 371",
  "L112 384",
  "C127 437 186 466 254 466",
  "C341 466 396 425 396 364",
  "C396 295 331 263 263 241",
  "C199 220 164 203 164 172",
  "C164 139 202 100 250 100",
  "C302 100 334 122 338 152",
  "Z",
].join(" ");

/**
 * The drone string — dead vertical, deliberately crossing the S.
 * Kept just inside the S's own extremes (64…466) so it reads as threaded
 * through the letter rather than as a stray rule running off the artwork.
 */
export const STRING = { x: 256, y1: 48, y2: 470 };

/**
 * The dancer, in the S's upper counter — head, an extended arm, the torso's
 * tribhanga tilt, and a flared skirt.
 *
 * Sized to about a fifth of the S's height: any smaller and it collapsed into
 * a blob, any larger and it competed with the letterform.
 */
export const DANCER = {
  // Shifted clear of the drone string at x=256 — overlapping it clipped the head.
  head: { cx: 274, cy: 126, r: 12 },
  /** arm extended and bent — carrying the line out into the open counter */
  arm: "M272 150 C288 146 300 154 303 168",
  /** torso, carrying the tribhanga (thrice-bent) curve */
  torso: "M274 140 C279 156 276 170 270 182",
  /**
   * Skirt — a bell with a CONCAVE hem. The inward sweep is what makes it read
   * as pleated fabric in motion instead of a flat triangle, and it rhymes with
   * the fan of blades below. Roughly 4:3 tall-to-wide; flatter than that and it
   * stops reading as a skirt and starts reading as a hat brim.
   */
  skirt: "M270 182 C258 192 251 206 248 224 C266 217 288 217 304 224 C300 205 288 191 270 182 Z",
};

/**
 * SEVEN blades — one per swara — fanning out of the lower bowl.
 * Returned as line segments so they can be stroked with round caps: lighter
 * than filled wedges and it stays crisp at small sizes.
 */
export function fanBlades() {
  const originX = 250;
  const originY = 438;
  const startDeg = -104; // near-vertical
  const stepDeg = 13.5;
  return Array.from({ length: 7 }, (_, i) => {
    const rad = ((startDeg + i * stepDeg) * Math.PI) / 180;
    // middle blades reach furthest — gives the fan a soft convex edge
    const len = 96 + 30 * Math.sin((i / 6) * Math.PI);
    return {
      key: `swara-${i}`,
      x1: originX,
      y1: originY,
      x2: +(originX + Math.cos(rad) * len).toFixed(2),
      y2: +(originY + Math.sin(rad) * len).toFixed(2),
      // outer blades thin out, so the fan reads as one shape not seven sticks
      width: +(7 - 2.4 * Math.abs(i - 3) / 3).toFixed(2),
    };
  });
}

/** The gold ramp, matching --color-goldhi / --color-gold / --color-goldlo. */
export const GOLD = { hi: "#EBD08A", mid: "#C9A24B", lo: "#8A6A25" };
export const INK = "#0E0B08";
export const IVORY = "#F4EDE0";

/**
 * Resolved fills per variant.
 *   primary — gold gradient on transparent (the default lockup)
 *   gold    — flat gold, for single-colour gold printing/foil
 *   mono    — single ink colour, inherits currentColor
 *   light   — for placing on dark grounds (ivory)
 *   dark    — for placing on light grounds (near-black)
 */
export function paletteFor(variant) {
  switch (variant) {
    case "gold":
      return { s: GOLD.mid, string: GOLD.mid, dancer: GOLD.mid, fan: GOLD.mid };
    case "mono":
      return { s: "currentColor", string: "currentColor", dancer: "currentColor", fan: "currentColor" };
    case "light":
      return { s: IVORY, string: IVORY, dancer: IVORY, fan: IVORY };
    case "dark":
      return { s: INK, string: INK, dancer: INK, fan: INK };
    case "primary":
    default:
      return { s: "url(#saptham-gold)", string: GOLD.lo, dancer: GOLD.hi, fan: "url(#saptham-gold)" };
  }
}

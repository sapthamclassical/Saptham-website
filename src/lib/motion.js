/**
 * Saptham motion vocabulary.
 *
 * One set of easings and durations, used everywhere, so the whole site feels
 * choreographed by one hand rather than assembled from unrelated effects.
 *
 * Rules that hold across every animation here:
 *   · transform + opacity + clip-path ONLY — never width/height/top/left, which
 *     force layout on every frame and drop you off 60fps
 *   · nothing animates that the user did not scroll to
 *   · every motion has a reduced-motion answer (see `useMotionSafe`)
 */

/** "Veena decay" — a held beat, then a long soft settle. The house ease. */
export const EASE = [0.16, 1, 0.3, 1];
/** For elements leaving; slightly faster in than out feels responsive. */
export const EASE_IN = [0.7, 0, 0.84, 0];
/** Symmetric — for hovers and toggles. */
export const EASE_SOFT = [0.4, 0, 0.2, 1];

export const DUR = {
  fast: 0.35,
  base: 0.7,
  slow: 1.1,
  curtain: 0.55,
};

/** Trigger a little before the element is fully on screen — feels anticipatory. */
export const VIEWPORT = { once: true, margin: "-12% 0px -8% 0px" };

/* ── variants ─────────────────────────────────────────────────────────────── */

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.slow, ease: EASE } },
};

/**
 * Image reveal — a mask wipes upward off the image while the image itself
 * settles from a slight scale. clip-path is compositor-friendly; animating
 * height here would thrash layout.
 */
export const maskUp = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: { duration: 1.2, ease: EASE },
  },
};

/** Words/lines rising out of an overflow-hidden line box. */
export const lineUp = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

/**
 * Card stagger. `beat` is the gap between children — think of it as tempo.
 * 0.06–0.1 reads as rhythm; above ~0.15 it reads as waiting.
 */
export const stagger = (beat = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: beat, delayChildren: delay } },
});

/* ── reduced motion ───────────────────────────────────────────────────────── */

/**
 * Collapses a variant pair to "already in its final state".
 * Used by every motion component so `prefers-reduced-motion` produces a static,
 * fully-legible page rather than a page with invisible content.
 */
export function stillVariant(variants) {
  const show = variants.show ?? {};
  const resolved = typeof show === "function" ? show(0) : show;
  const { transition: _t, ...rest } = resolved;
  void _t;
  return { hidden: rest, show: rest };
}

import Lenis from "lenis";

/**
 * Inertia scrolling — the single biggest "feel" difference between a good site
 * and an award-winning one. Lenis eases the wheel input so the page glides and
 * settles instead of stepping, which is what makes scroll-linked parallax read
 * as cinematography instead of jitter.
 *
 * One instance for the app, exported so ScrollToTop can command it directly:
 * a route change must snap (immediate), never glide, or the reset becomes a
 * visible 3000px scroll animation.
 */
let lenis = null;

export function startLenis() {
  if (lenis) return lenis;
  lenis = new Lenis({
    autoRaf: true,
    anchors: true, // in-page #links glide instead of jumping
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  return lenis;
}

export function stopLenis() {
  lenis?.destroy();
  lenis = null;
}

/** Route-change reset: instant, and through Lenis so its internal state agrees. */
export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

/**
 * Scroll to an element (hash anchors). MUST go through Lenis when it is
 * active: a native scrollIntoView only sets scrollTop, and Lenis lerps right
 * back to its own target on the next frame — the page visibly snaps back.
 */
export function scrollToEl(el) {
  if (lenis) lenis.scrollTo(el, { offset: -84 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Pause/resume user scrolling (used while the Overture holds the stage). */
export function lockScroll(locked) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

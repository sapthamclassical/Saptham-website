import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { scrollToTop } from "../lib/scroll";

/**
 * Guarantees every route opens at the top.
 *
 * Why this is not one line:
 *
 * 1. Browsers restore the previous scroll offset themselves on reload and on
 *    back/forward. With a client-side router that restore lands on the WRONG
 *    document — you navigate to /gallery and open 1400px down. So we take that
 *    over with `history.scrollRestoration = "manual"`.
 *
 * 2. The reset runs in `useLayoutEffect`, before paint. In `useEffect` the
 *    browser has already painted the new route at the old offset, which shows
 *    up as a visible flash-then-jump.
 *
 * 3. `behavior: "instant"` is explicit because the stylesheet sets
 *    `scroll-behavior: smooth` globally for anchor links. Without it the reset
 *    inherits smooth and you watch the new page scroll itself up — which reads
 *    as a bug, and on a long page can take over a second.
 *
 * Back/forward stays intuitive: the transition curtain covers the swap, so the
 * user sees a deliberate cut, not a lurch.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useLayoutEffect(() => {
    // An in-page anchor (/#office-bearers) is a deliberate request for a
    // position — honour it instead of overriding it.
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    scrollToTop();
  }, [pathname, hash, navigationType]);

  return null;
};

export default ScrollToTop;

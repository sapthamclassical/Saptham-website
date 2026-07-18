import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "motion/react";
import { EASE, EASE_IN } from "../lib/motion";
import { lockScroll } from "../lib/scroll";
import { markOvertureSeen, shouldPlayOverture } from "../lib/intro";

/**
 * The Overture — the site's entry choreography.
 *
 * A recital does not start with the first item; it starts with tuning. Seven
 * gold columns rise one after another like an orchestra finding its pitch, the
 * name appears, and the black parts like stage curtains onto the hero.
 *
 * Discipline rules:
 *   · plays once per session (sessionStorage), never on every route change
 *   · under 2.5s total — an overture, not an intermission
 *   · reduced-motion or a repeat visit skips it entirely, zero flash
 *   · scroll is locked while it holds the stage
 */
const BARS = [0.55, 0.7, 0.62, 0.86, 1.0, 0.76, 0.92];

const Overture = () => {
  const still = useReducedMotion();
  const [playing, setPlaying] = useState(() => !still && shouldPlayOverture());

  useEffect(() => {
    if (!playing) return;
    lockScroll(true);
    markOvertureSeen();
    const t = setTimeout(() => {
      setPlaying(false);
    }, 2450);
    return () => {
      clearTimeout(t);
      lockScroll(false);
    };
  }, [playing]);

  return (
    <AnimatePresence>
      {playing && (
        <Motion.div
          className="on-blue fixed inset-0 z-[100] flex items-center justify-center bg-msdeep"
          aria-hidden="true"
          exit={{ opacity: 0, transition: { duration: 0.01 } }}
        >
          {/* the two curtain panels — they part left/right at the end */}
          <Motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-msblue"
            initial={{ x: 0 }}
            exit={{ x: "-100%", transition: { duration: 0.9, ease: EASE } }}
          />
          <Motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-msblue"
            initial={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 0.9, ease: EASE } }}
          />
          {/* a hairline of lamplight where the curtains will part */}
          <Motion.div
            className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #C9A24B 30%, #EBD08A 50%, #C9A24B 70%, transparent)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.9] }}
            transition={{ duration: 2.2, times: [0, 0.82, 1] }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          />

          {/* the tuning */}
          <Motion.div
            className="relative flex flex-col items-center gap-8"
            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.35, ease: EASE_IN } }}
          >
            <div className="flex h-24 items-end gap-2.5">
              {BARS.map((h, i) => (
                <Motion.span
                  key={i}
                  className="swara-bar w-1.5 rounded-full"
                  style={{ height: `${h * 100}%`, transformOrigin: "bottom", animation: "none" }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: [0, 1, 0.85, 1], opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.25 + i * 0.14, ease: EASE }}
                />
              ))}
            </div>
            <Motion.p
              className="font-display text-lg font-medium tracking-[0.5em] text-goldhi"
              initial={{ opacity: 0, letterSpacing: "0.8em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 1.1, delay: 1.15, ease: EASE }}
            >
              SAPTHAM
            </Motion.p>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default Overture;

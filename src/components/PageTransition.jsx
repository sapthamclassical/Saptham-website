import { motion as Motion, useReducedMotion } from "motion/react";
import { EASE, DUR } from "../lib/motion";

/**
 * Cinematic route transition — a slow gold-lit wipe, like a stage blackout
 * between items in a recital.
 *
 * `mode="wait"` on the parent AnimatePresence means the outgoing route finishes
 * leaving before the incoming one mounts. That ordering is what lets
 * ScrollToTop reset the offset unseen: the curtain is down at the moment the
 * scroll snaps back.
 *
 * Only opacity and transform animate here, so the whole transition runs on the
 * compositor and does not fight the incoming route's first paint.
 */
const PageTransition = ({ children }) => {
  const still = useReducedMotion();

  if (still) return <div>{children}</div>;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: DUR.curtain, ease: EASE }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </Motion.div>
  );
};

export default PageTransition;

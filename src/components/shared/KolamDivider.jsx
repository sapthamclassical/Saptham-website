import { motion as Motion, useReducedMotion } from "motion/react";

/**
 * Section boundary — the korvai border of a Kanchipuram silk: an arakku strip
 * carrying zari temple-teeth, edged by MS Blue selvages (see .korvai in
 * App.css). It weaves itself across the page on scroll-into-view.
 *
 * scaleX only — compositor-safe — and the weave direction alternates via
 * `flip`, like the shuttle passing back across the loom.
 */
const KolamDivider = ({ className = "", flip = false }) => {
  const still = useReducedMotion();
  return (
    <div className={`py-14 md:py-20 ${className}`} aria-hidden="true">
      <Motion.div
        className={`korvai ${flip ? "korvai--flip" : ""}`}
        initial={still ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: flip ? "right" : "left" }}
      />
    </div>
  );
};

export default KolamDivider;

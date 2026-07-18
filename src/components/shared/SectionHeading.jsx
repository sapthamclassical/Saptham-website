import { motion as Motion, useReducedMotion } from "motion/react";
import { Reveal, TextReveal } from "../motion/Motion";
import { VIEWPORT, EASE } from "../../lib/motion";

/**
 * The typographic rhythm (Bible §10): tracked mono-caps eyebrow above a huge
 * high-contrast serif — one soloist per view.
 *
 * The title's words rise out of clipped line boxes one beat apart, so a heading
 * arrives with a tempo rather than simply appearing. The eyebrow leads, the
 * rule draws itself, the subtitle follows — an entrance in four counts.
 *
 * `.gold-text` is applied to the inner word spans, never to a transformed
 * parent: `background-clip: text` on an element whose children are transformed
 * renders the fill invisible.
 */
const SectionHeading = ({ eyebrow, title, sub, align = "center" }) => {
  const still = useReducedMotion();
  const centered = align === "center";

  return (
    <div className={centered ? "text-center" : "text-left"}>
      {eyebrow && (
        <Reveal y={12}>
          <p className="eyebrow mb-4">{eyebrow}</p>
        </Reveal>
      )}

      <TextReveal
        as="h2"
        text={title}
        delay={0.08}
        beat={0.06}
        className="font-display text-4xl leading-[1.05] font-medium md:text-6xl"
        wordClassName="gold-text"
      />

      {/* the rule draws itself open — scaleX is transform-only, so it composites */}
      <Motion.div
        className={`gold-hairline mt-6 h-px w-24 ${centered ? "mx-auto" : ""}`}
        initial={still ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.7 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
        style={{ transformOrigin: centered ? "center" : "left" }}
      />

      {sub && (
        <Reveal delay={0.18}>
          <p className={`mt-5 max-w-2xl leading-relaxed text-ash ${centered ? "mx-auto" : ""}`}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeading;

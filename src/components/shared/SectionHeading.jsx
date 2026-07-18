import { motion as Motion, useReducedMotion } from "motion/react";
import { Reveal, TextReveal } from "../motion/Motion";
import { VIEWPORT, EASE } from "../../lib/motion";

/**
 * The typographic rhythm: tracked eyebrow in arakku above enormous ink
 * Fraunces — one soloist per view. Words rise out of clipped line boxes one
 * beat apart; the rule beneath weaves itself open like a thread pulled taut.
 *
 * On MS Blue fields wrap the section in `.on-blue` — the eyebrow flips to
 * zari and `tone="light"` sets the display in silk.
 */
const SectionHeading = ({ eyebrow, title, sub, align = "center", tone = "ink" }) => {
  const still = useReducedMotion();
  const centered = align === "center";
  const display = tone === "light" ? "text-sanctum" : "text-ivory";
  const subColor = tone === "light" ? "text-sanctum/75" : "text-ash";

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
        className={`font-display text-4xl leading-[1.04] font-medium tracking-tight md:text-6xl ${display}`}
      />

      {/* the thread pulls taut — scaleX is transform-only, so it composites */}
      <Motion.div
        className={`mt-6 h-[3px] w-24 bg-kumkum ${centered ? "mx-auto" : ""}`}
        initial={still ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
        style={{ transformOrigin: centered ? "center" : "left" }}
      />

      {sub && (
        <Reveal delay={0.18}>
          <p className={`mt-5 max-w-2xl leading-relaxed ${subColor} ${centered ? "mx-auto" : ""}`}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeading;

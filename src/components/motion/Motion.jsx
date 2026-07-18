import { useRef } from "react";
import { motion as Motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { EASE, DUR, VIEWPORT, fadeUp, maskUp, lineUp, stagger, stillVariant } from "../../lib/motion";

/**
 * The motion primitives every section is built from.
 *
 * Each one checks `useReducedMotion()` and degrades to a static, already-visible
 * element — never to a blank one. That is the difference between an accessible
 * site and a site that is empty for anyone who set the OS preference.
 */

/* ── Reveal: the workhorse ────────────────────────────────────────────────── */

export const Reveal = ({ children, delay = 0, y = 28, className = "", as = "div" }) => {
  const still = useReducedMotion();
  const C = Motion[as] ?? Motion.div;
  const variants = still ? stillVariant(fadeUp) : { ...fadeUp, hidden: { opacity: 0, y } };
  return (
    <C
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ delay }}
    >
      {children}
    </C>
  );
};

/* ── Stagger group ────────────────────────────────────────────────────────── */

export const StaggerGroup = ({ children, beat = 0.08, delay = 0, className = "", as = "div" }) => {
  const still = useReducedMotion();
  const C = Motion[as] ?? Motion.div;
  return (
    <C
      className={className}
      variants={still ? { hidden: {}, show: {} } : stagger(beat, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </C>
  );
};

export const StaggerItem = ({ children, className = "", y = 24, as = "div" }) => {
  const still = useReducedMotion();
  const C = Motion[as] ?? Motion.div;
  const variants = still
    ? stillVariant(fadeUp)
    : { hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } } };
  return (
    <C className={className} variants={variants}>
      {children}
    </C>
  );
};

/* ── Text reveal ──────────────────────────────────────────────────────────── */

/**
 * Splits on words and lifts each out of its own clipped line box.
 *
 * The visible text is aria-hidden and the real string is exposed once via
 * sr-only, so a screen reader reads "Office Bearers" rather than spelling out
 * seven separate spans.
 *
 * `wordClassName` exists for a specific trap: `background-clip: text` (our
 * `.gold-text`) paints NOTHING when the element's children are transformed, and
 * every word here is transformed. The gradient therefore has to sit on each
 * word, not on the heading. Pass it via `wordClassName`, never `className`.
 */
export const TextReveal = ({
  text,
  className = "",
  wordClassName = "",
  beat = 0.045,
  delay = 0,
  as = "span",
}) => {
  const Tag = as;
  const still = useReducedMotion();
  if (still) {
    return (
      <Tag className={className}>
        <span className={wordClassName}>{text}</span>
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <Motion.span
        aria-hidden="true"
        className="inline"
        variants={stagger(beat, delay)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        {String(text)
          .split(" ")
          .map((word, i) => (
            <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
              <Motion.span className={`inline-block ${wordClassName}`} variants={lineUp}>
                {word}
                {" "}
              </Motion.span>
            </span>
          ))}
      </Motion.span>
    </Tag>
  );
};

/* ── Image mask reveal ────────────────────────────────────────────────────── */

export const ImageReveal = ({ children, className = "", delay = 0 }) => {
  const still = useReducedMotion();
  return (
    <Motion.div
      className={`overflow-hidden ${className}`}
      variants={still ? stillVariant(maskUp) : maskUp}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ delay }}
      style={{ willChange: still ? undefined : "clip-path, transform" }}
    >
      {children}
    </Motion.div>
  );
};

/* ── Parallax ─────────────────────────────────────────────────────────────── */

/**
 * Scroll-linked translate. `depth` is in pixels of total travel across the
 * element's full pass through the viewport — keep it under ~120 or the layers
 * visibly detach from the page and it reads as a bug.
 */
export const Parallax = ({ children, depth = 60, className = "" }) => {
  const ref = useRef(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [depth, -depth]);

  return (
    <div ref={ref} className={className}>
      <Motion.div style={still ? undefined : { y, willChange: "transform" }}>{children}</Motion.div>
    </div>
  );
};

/* ── Sticky storytelling ──────────────────────────────────────────────────── */

/**
 * Pins a panel while its siblings scroll past. Height is expressed in viewport
 * multiples so the pin duration is predictable across screen sizes.
 */
export const StickyScene = ({ children, heightVh = 220, className = "" }) => (
  <section className={`relative ${className}`} style={{ height: `${heightVh}vh` }}>
    <div className="sticky top-0 flex h-svh items-center overflow-hidden">{children}</div>
  </section>
);

/** Fades/scales its children according to progress through a StickyScene. */
export const SceneLayer = ({ children, range = [0, 1], className = "" }) => {
  const ref = useRef(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const opacity = useTransform(scrollYProgress, range, [0, 1]);
  return (
    <Motion.div ref={ref} className={className} style={still ? undefined : { opacity }}>
      {children}
    </Motion.div>
  );
};

/* ── Premium hover ────────────────────────────────────────────────────────── */

/** Lifts and settles — spring, not duration, so repeated hovers stay fluid. */
export const HoverLift = ({ children, className = "", lift = -6 }) => {
  const still = useReducedMotion();
  return (
    <Motion.div
      className={className}
      whileHover={still ? undefined : { y: lift }}
      whileTap={still ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
    >
      {children}
    </Motion.div>
  );
};

export default Reveal;

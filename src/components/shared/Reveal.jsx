import { motion as Motion } from "motion/react";

/**
 * Abhinaya reveal (Bible §13): a held beat, then bloom — expo-out with a long decay.
 * Children stagger like musical beats when `stagger` is set on a parent Reveal.
 */
const EASE = [0.16, 1, 0.3, 1]; // "veena decay"

export const Reveal = ({ children, delay = 0, y = 28, once = true, className = "" }) => (
  <Motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, margin: "-80px" }}
    transition={{ duration: 0.9, delay, ease: EASE }}
  >
    {children}
  </Motion.div>
);

export const RevealStagger = ({ children, className = "", beat = 0.1 }) => (
  <Motion.div
    className={className}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-60px" }}
    variants={{ hidden: {}, show: { transition: { staggerChildren: beat } } }}
  >
    {children}
  </Motion.div>
);

export const RevealItem = ({ children, className = "", y = 24 }) => (
  <Motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y },
      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
    }}
  >
    {children}
  </Motion.div>
);

export default Reveal;

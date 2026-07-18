import { motion as Motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * A hairline of gold along the very top edge, filling with progress through the
 * page — the lamp burning down through the recital. scaleX only; compositor-safe.
 */
const ScrollProgress = () => {
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  if (still) return null;

  return (
    <Motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #8A6A25, #C9A24B 60%, #EBD08A)",
        boxShadow: "0 0 8px rgba(201, 162, 75, 0.4)",
      }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;

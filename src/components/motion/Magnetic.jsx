import { useRef } from "react";
import { motion as Motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * Magnetic hover — the element leans toward the cursor while it is inside,
 * then springs home. The pull is fractional (`strength`), so the element
 * gestures toward the hand rather than chasing it.
 *
 * Wrap CTAs sparingly: one magnetic pair per view is charm, five is a carnival.
 */
const Magnetic = ({ children, strength = 0.28, className = "" }) => {
  const ref = useRef(null);
  const still = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });

  if (still) return <div className={className}>{children}</div>;

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </Motion.div>
  );
};

export default Magnetic;

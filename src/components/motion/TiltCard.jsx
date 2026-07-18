import { useRef } from "react";
import { motion as Motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

/**
 * 3D tilt — the card turns toward the cursor like a framed portrait catching
 * lamplight. Rotation is capped low (`max` degrees): past ~8° the effect stops
 * reading as material and starts reading as a gimmick.
 *
 * A gloss layer sweeps opposite the tilt, selling the surface.
 */
const TiltCard = ({ children, max = 7, className = "" }) => {
  const ref = useRef(null);
  const still = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 160, damping: 20 });
  const sy = useSpring(py, { stiffness: 160, damping: 20 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glossX = useTransform(sx, [0, 1], ["120%", "-20%"]);
  const glossY = useTransform(sy, [0, 1], ["120%", "-20%"]);

  if (still) return <div className={className}>{children}</div>;

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <Motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
      {/* lamplight gloss, drifting opposite the tilt */}
      <Motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--gx) var(--gy), rgba(235,208,138,0.08), transparent 65%)",
          "--gx": glossX,
          "--gy": glossY,
        }}
        aria-hidden="true"
      />
    </Motion.div>
  );
};

export default TiltCard;

import { useEffect, useState } from "react";
import { motion as Motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * The ember — a custom cursor for pointer devices.
 *
 * A hot gold point that IS the cursor, and a slow brass ring that trails it
 * like the afterglow of an aarti lamp. Over anything interactive the ring
 * blooms and the point contracts — light gathering on what can be touched.
 *
 * Renders nothing on touch devices, and nothing under reduced motion — a
 * trailing element is exactly the kind of motion that setting asks to remove.
 * The native cursor is hidden by CSS only when this component actually mounts
 * (the `has-ember` class), so there is never a cursorless failure state.
 */
const Cursor = () => {
  const still = useReducedMotion();
  const [fine, setFine] = useState(false);
  const [hot, setHot] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // the point tracks tight; the ring breathes behind it
  const rx = useSpring(x, { stiffness: 250, damping: 28, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 250, damping: 28, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!fine || still) return;
    document.documentElement.classList.add("has-ember");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      setHot(!!e.target.closest?.("a, button, [role='button'], input, textarea, select, [data-cursor]"));
    };
    const press = () => setDown(true);
    const release = () => setDown(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", press);
    window.addEventListener("mouseup", release);
    return () => {
      document.documentElement.classList.remove("has-ember");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", press);
      window.removeEventListener("mouseup", release);
    };
  }, [fine, still, x, y]);

  if (!fine || still) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[110]" aria-hidden="true">
      {/* the point */}
      <Motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-kumkum shadow-[0_0_10px_2px_rgba(142,27,30,0.45)]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hot ? 0.4 : down ? 0.7 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 26 }}
      />
      {/* the afterglow ring */}
      <Motion.div
        className="absolute h-8 w-8 rounded-full border border-msblue/50"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hot ? 1.9 : down ? 0.8 : 1, opacity: hot ? 0.9 : 0.55 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      />
    </div>
  );
};

export default Cursor;

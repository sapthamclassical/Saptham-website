import { useRef } from "react";
import {
  motion as Motion,
  useMotionValue,
  useScroll,
  useVelocity,
  useAnimationFrame,
  useReducedMotion,
  useTransform,
} from "motion/react";
import officialGold from "../../assets/logo-gold.png";

/** Map a value into the half-open range [min, max) — no dependency on motion's util. */
const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * The processional — a band of vast outlined type moving like a temple
 * procession between sections, with the mark walking between the words.
 *
 * Scroll-velocity reactive (the Awwwards move): it drifts at a base speed, but
 * scrolling flings it faster and flips its direction to match the scroll, then
 * eases back to the drift. Position is a single wrapped `x` transform — GPU
 * cheap, and it degrades to a static row under reduced motion.
 */
const WORDS = ["Music", "Dance", "Tradition"];

const Strip = () => (
  <div className="flex shrink-0 items-center">
    {WORDS.map((w) => (
      <span key={w} className="flex items-center">
        <span className="marquee-word font-display px-8 text-7xl font-medium whitespace-nowrap md:px-14 md:text-8xl">
          {w}
        </span>
        <img src={officialGold} alt="" className="h-12 w-auto opacity-70 md:h-14" draggable="false" />
      </span>
    ))}
  </div>
);

const Marquee = ({ baseVelocity = -2 }) => {
  const still = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  // the scroll fling factor, smoothed toward 0 by the frame loop below
  const velFactor = useTransform(scrollVelocity, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  // each Strip is 50% of the doubled track; wrap keeps x in [-50, 0]%
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_t, delta) => {
    if (still) return;
    let moveBy = dir.current * baseVelocity * (delta / 1000);
    const vf = velFactor.get();
    if (vf < 0) dir.current = -1;
    else if (vf > 0) dir.current = 1;
    moveBy += dir.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  if (still) {
    return (
      <div className="marquee relative overflow-hidden py-10 select-none" aria-hidden="true">
        <div className="flex w-max">
          <Strip />
        </div>
      </div>
    );
  }

  return (
    <div className="marquee relative overflow-hidden py-10 select-none" aria-hidden="true">
      <Motion.div className="flex w-max flex-nowrap" style={{ x, willChange: "transform" }}>
        <Strip />
        <Strip />
        <Strip />
        <Strip />
      </Motion.div>
    </div>
  );
};

export default Marquee;

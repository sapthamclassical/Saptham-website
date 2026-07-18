import { motion as Motion } from "motion/react";

/**
 * KOL-02 — the signature self-drawing kolam divider: one continuous gold line
 * looping around an implied pulli dot-grid, drawing itself on scroll-into-view.
 */
const KolamDivider = ({ className = "" }) => {
  const loops = [0, 1, 2, 3, 4];
  return (
    <div className={`flex justify-center py-14 md:py-20 ${className}`} aria-hidden="true">
      <svg width="360" height="44" viewBox="0 0 360 44" fill="none" className="opacity-80">
        {/* pulli dots */}
        {loops.map((i) => (
          <circle key={`d${i}`} cx={60 + i * 60} cy="22" r="1.6" fill="#8A6A25" />
        ))}
        {/* one continuous looping line */}
        <Motion.path
          d="M10 22
             C 30 22, 40 6, 60 6 S 90 22, 60 22 S 40 38, 60 38 S 90 22, 120 22
             C 140 22, 150 6, 170 6 S 200 22, 170 22 S 150 38, 170 38 S 200 22, 230 22
             C 250 22, 260 6, 280 6 S 310 22, 280 22 S 260 38, 280 38 S 310 22, 350 22"
          stroke="url(#kolamGold)"
          strokeWidth="1.3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="kolamGold" x1="0" y1="0" x2="360" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8A6A25" />
            <stop offset="0.5" stopColor="#EBD08A" />
            <stop offset="1" stopColor="#8A6A25" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default KolamDivider;

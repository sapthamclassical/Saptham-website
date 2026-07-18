import { useRef } from "react";
import { motion as Motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import heroLoop from "../assets/brand/hero-loop.mp4";
import lampStill from "../assets/brand/lamp.jpg";
import Magnetic from "./motion/Magnetic";
import { introDelay } from "../lib/intro";

const EASE = [0.16, 1, 0.3, 1];
/* When the Overture plays, the hero waits in the wings and enters as the
   curtains part — one continuous piece of choreography, not two intros. */
const HOLD = introDelay();

/* Deterministic gold-dust field (PAR-01) — low density, "made of air" */
const MOTES = [...Array(18)].map((_, i) => ({
  left: `${(i * 53) % 100}%`,
  size: 2 + ((i * 7) % 4),
  duration: 14 + ((i * 5) % 12),
  delay: -((i * 3.7) % 14),
  opacity: 0.35 + ((i * 13) % 40) / 100,
  drift: ((i % 2 ? 1 : -1) * (14 + ((i * 11) % 30))),
}));

const letterVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  show: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, delay: HOLD + 0.9 + i * 0.09, ease: EASE },
  }),
};

const Hero = () => {
  const ref = useRef(null);
  const still = useReducedMotion();

  /*
   * Three depths moving at three speeds as the hero leaves: the lamp drifts
   * slowest, the invocation rises fastest, and the frame dims out. Driven off
   * scroll PROGRESS rather than a scroll listener, so the values interpolate
   * on the compositor instead of inside a React render on every frame.
   */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const lampY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const lampScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-34%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex h-svh min-h-[640px] items-center justify-center overflow-hidden bg-sanctum"
    >
      {/* The lamp — ambient film loop (HERO-11), still fallback for reduced-motion */}
      <Motion.div
        className="absolute inset-0"
        style={still ? undefined : { y: lampY, scale: lampScale, willChange: "transform" }}
      >
        <video
          className="h-full w-full object-cover opacity-70 motion-reduce:hidden"
          src={heroLoop}
          poster={lampStill}
          autoPlay
          muted
          loop
          playsInline
        />
        <img
          src={lampStill}
          alt=""
          className="hidden h-full w-full object-cover opacity-70 motion-reduce:block"
        />
        {/* chiaroscuro shaping: deep sides, warm center, vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-sanctum via-sanctum/35 to-sanctum" />
        <div className="absolute inset-0 bg-gradient-to-t from-sanctum via-transparent to-sanctum/80" />
        <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 220px 80px #0E0B08" }} />
      </Motion.div>

      {/* gold dust */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {MOTES.map((m, i) => (
          <span
            key={i}
            className="mote"
            style={{
              left: m.left,
              width: m.size,
              height: m.size,
              animationDuration: `${m.duration}s`,
              animationDelay: `${m.delay}s`,
              "--mote-o": m.opacity,
              "--mote-x": `${m.drift}px`,
            }}
          />
        ))}
      </div>

      {/* The invocation */}
      <Motion.div
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
        style={still ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <Motion.p
          className="eyebrow mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: HOLD + 0.4 }}
        >
          College of Engineering Guindy · Anna University
        </Motion.p>

        {/* SAPTHAM — per-letter bloom */}
        <h1
          className="font-display select-none text-[17vw] leading-[0.95] font-medium sm:text-[13vw] lg:text-[9.5rem]"
          aria-label="Saptham"
        >
          {"SAPTHAM".split("").map((ch, i) => (
            <Motion.span
              key={i}
              className="gold-text inline-block"
              custom={i}
              initial="hidden"
              animate="show"
              variants={letterVariants}
            >
              {ch}
            </Motion.span>
          ))}
        </h1>

        {/* a rule under the wordmark, holding the beat the Tamil line used to */}
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: HOLD + 1.9, ease: EASE }}
        >
          <div className="gold-hairline mx-auto my-6 w-56" />
          <p className="font-tamil text-2xl text-gold md:text-3xl">சப்தம்</p>
        </Motion.div>

        <Motion.p
          className="mx-auto mt-8 max-w-xl leading-relaxed text-ash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: HOLD + 2.4 }}
        >
          The classical music &amp; dance sabha of CEG — where the seven notes
          become light, and tradition meets technology.
        </Motion.p>

        <Motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: HOLD + 2.8, ease: EASE }}
        >
          <Magnetic>
            <Link to="/events" className="btn-brass">
              Witness the Recital
            </Link>
          </Magnetic>
          <Magnetic>
            <a href="#office-bearers" className="btn-brass btn-brass--ghost">
              Meet the Custodians
            </a>
          </Magnetic>
        </Motion.div>
      </Motion.div>

      {/* breathing scroll cue */}
      <Motion.a
        href="#vision"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: HOLD + 3.6, duration: 1.2 }}
        aria-label="Begin"
      >
        <div className="tala-pulse flex flex-col items-center gap-3">
          <span className="eyebrow !text-[0.6rem]">Begin</span>
          <span className="block h-12 w-px bg-gradient-to-b from-gold to-transparent" />
        </div>
      </Motion.a>
    </section>
  );
};

export default Hero;

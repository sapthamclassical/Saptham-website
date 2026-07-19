import { useRef } from "react";
import { motion as Motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import heroLoop from "../assets/brand/hero-loop.mp4";
import lampStill from "../assets/brand/lamp.jpg";
import SapthamMark from "./brand/SapthamMark";
import Magnetic from "./motion/Magnetic";
import { Atmosphere, CharReveal, SWARA_LIGHTS } from "./stage/Stage";
import { introDelay } from "../lib/intro";

const EASE = [0.16, 1, 0.3, 1];
/* When the Overture plays, the hero waits in the wings and enters as the
   curtains part — one continuous piece of choreography, not two intros. */
const HOLD = introDelay();

/* The seven lights, in swara order, for the orbit around the lamp. */
const ORBIT = Object.values(SWARA_LIGHTS);

/**
 * Scene 01 · The stage in the dark.
 *
 * A full lighting rig (Atmosphere: orbs, two beams, dense embers), a
 * per-character headline blooming out of the void, the lamp footage
 * screen-blended inside a slowly turning ring of all seven swara lights,
 * and the mark rotating vast and faint behind everything.
 */
const Hero = () => {
  const ref = useRef(null);
  const still = useReducedMotion();

  /* Three depths as the hero leaves: the lamp sinks slow, the words rise
     faster, both dim. Scroll-linked transforms — compositor only. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const wordsY = useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]);
  const lampY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-svh items-center overflow-hidden bg-sanctum pt-24">
      {/* the rig: 8 orbs, 2 beams, ember canvas, kolam field, vignette */}
      <Atmosphere
        colors={[SWARA_LIGHTS.sa, SWARA_LIGHTS.pa, SWARA_LIGHTS.da, SWARA_LIGHTS.ma]}
        beams={2}
        particles={90}
        dense
      />

      {/* the mark — a vast, slowly turning watermark behind the stage */}
      <div
        className="pointer-events-none absolute top-1/2 -right-44 -translate-y-1/2 lg:-right-24"
        aria-hidden="true"
      >
        <Motion.div
          animate={still ? undefined : { rotate: 360 }}
          transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
        >
          <SapthamMark size={680} variant="mono" title="" className="text-goldhi opacity-[0.05]" />
        </Motion.div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-8">
        {/* ── The words ── */}
        <Motion.div style={still ? undefined : { y: wordsY, opacity: fade }}>
          {/* the name, set plainly in the display face — the logo stays in the chrome */}
          <Motion.p
            className="font-display gold-text mb-5 text-3xl font-medium tracking-[0.32em] uppercase md:text-4xl"
            initial={still ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: HOLD + 0.15, ease: EASE }}
          >
            Saptham
          </Motion.p>
          <Motion.p
            className="eyebrow"
            initial={still ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: HOLD + 0.3 }}
          >
            Classical Music &amp; Dance · CEG, Anna University
          </Motion.p>

          <h1
            className="font-display mt-6 text-[12.5vw] leading-[1.06] font-medium tracking-tight text-ivory sm:text-6xl lg:text-7xl xl:text-[5.3rem]"
            aria-label="Where the seven notes come home."
          >
            <CharReveal text="Where the" as="span" className="block" delay={HOLD + 0.35} />
            <CharReveal
              text="seven notes"
              as="span"
              className="block"
              charClassName="accent-ital"
              delay={HOLD + 0.65}
            />
            <CharReveal text="come home." as="span" className="text-glow block" delay={HOLD + 0.95} />
          </h1>

          <Motion.div
            initial={still ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: HOLD + 1.45, ease: EASE }}
          >
            <p className="mt-7 max-w-lg leading-relaxed text-ash">
              Saptham is the classical music and dance club of the College of
              Engineering Guindy — Carnatic ragas, Bharatanatyam, and a family
              that has carried both across generations of students.
            </p>
            <p className="font-tamil mt-3 text-lg text-kumkum/80">சப்தம்</p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Magnetic>
                <Link to="/events" className="btn-brass">
                  See the Season
                </Link>
              </Magnetic>
              <Magnetic>
                <a href="#office-bearers" className="btn-brass btn-brass--ghost">
                  Meet the Team
                </a>
              </Magnetic>
            </div>
          </Motion.div>
        </Motion.div>

        {/* ── The lamp, held in a turning ring of all seven lights ── */}
        <Motion.div style={still ? undefined : { y: lampY, opacity: fade }}>
          <Motion.div
            className="relative mx-auto w-full max-w-xs sm:max-w-sm"
            initial={still ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: HOLD + 0.8, ease: EASE }}
          >
            <div className="relative mx-auto aspect-square w-full">
              {/* halo bloom behind the ring */}
              <div
                className="absolute -inset-10 rounded-full opacity-50 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,184,77,0.38), rgba(176,107,255,0.16) 58%, transparent 76%)",
                }}
                aria-hidden="true"
              />

              {/* the ragamalika rim — a conic sweep of the seven lights, turning */}
              <Motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(from 0deg, ${ORBIT.join(", ")}, ${ORBIT[0]})`,
                }}
                animate={still ? undefined : { rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              >
                <div className="absolute inset-[2px] rounded-full bg-sanctum" />
              </Motion.div>

              {/* zari inner rim */}
              <div className="absolute inset-[7px] rounded-full border border-goldhi/30" aria-hidden="true" />

              {/* seven swara satellites in slow orbit */}
              <Motion.div
                className="pointer-events-none absolute inset-0"
                animate={still ? undefined : { rotate: -360 }}
                transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              >
                {ORBIT.map((c, i) => {
                  const a = (i / ORBIT.length) * Math.PI * 2;
                  return (
                    <span
                      key={c}
                      className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{
                        left: `${50 + 49 * Math.cos(a)}%`,
                        top: `${50 + 49 * Math.sin(a)}%`,
                        background: c,
                        boxShadow: `0 0 10px ${c}, 0 0 26px ${c}66`,
                      }}
                    />
                  );
                })}
              </Motion.div>

              {/* the lamp footage, screen-blended so its darkness melts into the void */}
              <div className="absolute inset-[16px] overflow-hidden rounded-full">
                <video
                  className="h-full w-full object-cover mix-blend-screen motion-reduce:hidden"
                  src={heroLoop}
                  poster={lampStill}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <img
                  src={lampStill}
                  alt="A lit temple lamp"
                  className="hidden h-full w-full object-cover motion-reduce:block"
                />
                {/* inner vignette folds the footage into the stage */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: "inset 0 0 70px 28px #06070D" }}
                  aria-hidden="true"
                />
              </div>
            </div>

            <p className="mt-6 text-center text-[0.62rem] tracking-[0.3em] text-goldhi/80 uppercase">
              The lamp is always lit
            </p>
          </Motion.div>
        </Motion.div>
      </div>

      {/* breathing scroll cue */}
      <Motion.a
        href="#vision"
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
        initial={still ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: HOLD + 2.2, duration: 1.2 }}
        aria-label="Begin"
      >
        <div className="tala-pulse flex flex-col items-center gap-3">
          <span className="eyebrow !text-[0.6rem]">Begin</span>
          <span
            className="block h-10 w-px"
            style={{ background: `linear-gradient(to bottom, ${SWARA_LIGHTS.ma}, transparent)` }}
          />
        </div>
      </Motion.a>
    </section>
  );
};

export default Hero;

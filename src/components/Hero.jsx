import { useRef } from "react";
import { motion as Motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import heroLoop from "../assets/brand/hero-loop.mp4";
import lampStill from "../assets/brand/lamp.jpg";
import SapthamMark from "./brand/SapthamMark";
import Magnetic from "./motion/Magnetic";
import { introDelay } from "../lib/intro";

const EASE = [0.16, 1, 0.3, 1];
/* When the Overture plays, the hero waits in the wings and enters as the
   curtains part — one continuous piece of choreography, not two intros. */
const HOLD = introDelay();

/* The headline, one word per beat. "seven notes" carries the lac-red thread. */
const HEADLINE = [
  { t: "Where" },
  { t: "the" },
  { t: "seven", accent: true },
  { t: "notes", accent: true },
  { t: "come" },
  { t: "home." },
];

const wordVariants = {
  hidden: { y: "112%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 0.95, delay: HOLD + 0.35 + i * 0.09, ease: EASE },
  }),
};

const Hero = () => {
  const ref = useRef(null);
  const still = useReducedMotion();

  /* Two depths as the hero leaves: the arch drifts slow, the words rise faster.
     Driven off scroll progress, so values interpolate on the compositor. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const archY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const wordsY = useTransform(scrollYProgress, [0, 1], ["0%", "-26%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh items-center overflow-hidden bg-sanctum pt-24"
    >
      {/* faint kolam field over the silk */}
      <div className="kolam-dots absolute inset-0 opacity-40" aria-hidden="true" />

      {/* pollen drift */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="mote"
            style={{
              left: `${(i * 53) % 100}%`,
              width: 2 + ((i * 7) % 3),
              height: 2 + ((i * 7) % 3),
              animationDuration: `${16 + ((i * 5) % 12)}s`,
              animationDelay: `${-((i * 3.7) % 14)}s`,
              "--mote-o": 0.3,
              "--mote-x": `${(i % 2 ? 1 : -1) * (14 + ((i * 11) % 30))}px`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:px-8">
        {/* ── The words ── */}
        <Motion.div style={still ? undefined : { y: wordsY, opacity: fade }}>
          <Motion.p
            className="eyebrow"
            initial={still ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: HOLD + 0.2 }}
          >
            The Classical Music &amp; Dance Sabha · CEG, Anna University
          </Motion.p>

          <h1
            className="font-display mt-6 text-[13vw] leading-[1.02] font-medium tracking-tight text-ivory sm:text-6xl lg:text-7xl xl:text-[5.2rem]"
            aria-label="Where the seven notes come home."
          >
            {HEADLINE.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <Motion.span
                  className={`inline-block pr-[0.24em] ${w.accent ? "accent-ital" : ""}`}
                  custom={i}
                  initial={still ? false : "hidden"}
                  animate="show"
                  variants={still ? undefined : wordVariants}
                >
                  {w.t}
                </Motion.span>
              </span>
            ))}
          </h1>

          <Motion.div
            initial={still ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: HOLD + 1.1, ease: EASE }}
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
                  Meet the Sabha
                </a>
              </Magnetic>
            </div>
          </Motion.div>
        </Motion.div>

        {/* ── The niche: lamp footage in a temple arch on MS Blue ── */}
        <Motion.div
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
          style={still ? undefined : { y: archY }}
          initial={still ? false : { opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: HOLD + 0.7, ease: EASE }}
        >
          <div className="on-blue relative bg-msblue p-5 pb-7 shadow-[0_28px_70px_rgba(22,36,78,0.35)] md:p-7 md:pb-9">
            {/* the mark, woven faint into the blue */}
            <SapthamMark
              size={220}
              variant="mono"
              title=""
              className="pointer-events-none absolute -right-10 -bottom-10 text-goldhi opacity-[0.07]"
            />
            <div className="arch relative overflow-hidden border-2 border-goldhi/60">
              <video
                className="aspect-[4/5] h-auto w-full object-cover motion-reduce:hidden"
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
                className="hidden aspect-[4/5] w-full object-cover motion-reduce:block"
              />
            </div>
            <p className="mt-5 text-center text-[0.62rem] tracking-[0.3em] text-goldhi/90 uppercase">
              The lamp is always lit
            </p>
            {/* korvai selvage along the panel's bottom edge */}
            <div className="korvai absolute inset-x-0 bottom-0 !h-[14px] !border-t-2 !border-b-0" />
          </div>
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
          <span className="block h-10 w-px bg-gradient-to-b from-kumkum to-transparent" />
        </div>
      </Motion.a>
    </section>
  );
};

export default Hero;

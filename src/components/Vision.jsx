import { motion as Motion, useReducedMotion } from "motion/react";
import SectionHeading from "./shared/SectionHeading";
import SapthamMark from "./brand/SapthamMark";
import { Reveal, StaggerGroup, StaggerItem, HoverLift, Parallax } from "./motion/Motion";
import { Atmosphere, ScrollFloat, SWARA_LIGHTS } from "./stage/Stage";
import { EASE, VIEWPORT } from "../lib/motion";

/**
 * Scene 02 · The chord — the seven swaras as a live equalizer.
 *
 * Each column now burns in ITS OWN swara light: entrance rise (scroll-triggered
 * scaleY), then an endless equalizer breathe, each note on its own tempo so the
 * chord shimmers rather than marches. The instrument sits on a glow-border
 * panel that floats against the scroll while the mark parallaxes behind it.
 */
const SWARAS = [
  { latin: "Sa", tamil: "ச", h: 0.52, c: SWARA_LIGHTS.sa },
  { latin: "Ri", tamil: "ரி", h: 0.66, c: SWARA_LIGHTS.ri },
  { latin: "Ga", tamil: "க", h: 0.58, c: SWARA_LIGHTS.ga },
  { latin: "Ma", tamil: "ம", h: 0.82, c: SWARA_LIGHTS.ma },
  { latin: "Pa", tamil: "ப", h: 1.0, c: SWARA_LIGHTS.pa },
  { latin: "Da", tamil: "த", h: 0.72, c: SWARA_LIGHTS.da },
  { latin: "Ni", tamil: "நி", h: 0.9, c: SWARA_LIGHTS.ni },
];

const PILLARS = [
  {
    n: "01",
    title: "Carnatic Music",
    body: "Veena to violin, mridangam to voice — the discipline of the seven swaras, practiced and performed as living tradition.",
    a: SWARA_LIGHTS.sa,
    b: SWARA_LIGHTS.ri,
  },
  {
    n: "02",
    title: "Classical Dance",
    body: "Bharatanatyam and beyond — geometry, devotion and storytelling carried in araimandi, mudra and abhinaya.",
    a: SWARA_LIGHTS.ga,
    b: SWARA_LIGHTS.ma,
  },
  {
    n: "03",
    title: "One Family",
    body: "An unbroken lineage of students and alumni — a sabha where every newcomer belongs and every senior still returns.",
    a: SWARA_LIGHTS.pa,
    b: SWARA_LIGHTS.da,
  },
];

/**
 * One note of the chord — a live equalizer bar.
 *
 * Driven by `animate` (runs on MOUNT, every time), NOT whileInView — the old
 * whileInView pinned scaleY inline and killed the breathe, so the bars sat
 * dead. Now each note bounces its full height on its own tempo and amplitude,
 * so the chord shimmers like an instrument responding to sound. A glow cap
 * rides the tip, a pool of light pulses at the base. Transforms/opacity only,
 * and a static bar under reduced motion.
 */
const BOUNCE = [
  [0.5, 1, 0.62, 0.92, 0.55, 0.8, 0.5],
  [0.6, 0.85, 1, 0.55, 0.9, 0.66, 0.6],
  [0.45, 0.95, 0.6, 1, 0.7, 0.85, 0.45],
];

const SwaraBar = ({ swara, index }) => {
  const still = useReducedMotion();
  const seq = BOUNCE[index % BOUNCE.length];
  const dur = 2.6 + (index % 4) * 0.5;

  return (
    <div className="flex flex-1 flex-col items-center gap-3">
      <span className="font-tamil text-sm" style={{ color: swara.c }}>
        {swara.tamil}
      </span>

      <div className="relative flex h-44 w-full items-end justify-center md:h-56">
        {/* pool of light pulsing at the base */}
        {!still && (
          <Motion.span
            className="absolute bottom-0 h-5 w-7 rounded-full blur-md"
            style={{ background: swara.c }}
            animate={{ opacity: [0.25, 0.6, 0.25], scale: [0.8, 1.15, 0.8] }}
            transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: index * 0.12 }}
            aria-hidden="true"
          />
        )}

        {/* the bar — bounces its whole height, forever */}
        <Motion.div
          className="relative w-2.5 rounded-full md:w-3"
          style={{
            height: `${swara.h * 100}%`,
            transformOrigin: "bottom",
            background: `linear-gradient(to top, ${swara.c}33, ${swara.c})`,
            boxShadow: `0 0 14px ${swara.c}99, 0 0 36px ${swara.c}44`,
          }}
          initial={still ? false : { scaleY: seq[0], opacity: 0 }}
          animate={still ? undefined : { scaleY: seq, opacity: 1 }}
          transition={{
            scaleY: { duration: dur, repeat: Infinity, ease: "easeInOut", delay: index * 0.12 },
            opacity: { duration: 0.7, delay: 0.1 + index * 0.06 },
          }}
        >
          {/* a brighter tip, baked into the bar so scaleY can't squish it */}
          <span
            className="absolute inset-x-0 top-0 h-2 rounded-full"
            style={{ background: "#fff", opacity: 0.85, filter: `drop-shadow(0 0 6px ${swara.c})` }}
            aria-hidden="true"
          />
        </Motion.div>
      </div>

      <span className="text-[0.7rem] tracking-[0.24em] uppercase" style={{ color: swara.c }}>
        {swara.latin}
      </span>
    </div>
  );
};

/** Note-embers drifting up off the chord — deterministic so SSR/paint is stable. */
const EMBERS = [...Array(14)].map((_, i) => ({
  left: `${6 + ((i * 47) % 88)}%`,
  color: Object.values(SWARA_LIGHTS)[i % 7],
  size: 2 + (i % 3),
  dur: 5 + ((i * 7) % 6),
  delay: -((i * 13) % 10),
  drift: (i % 2 ? 1 : -1) * (8 + ((i * 11) % 20)),
}));

const SwaraEmbers = () => {
  const still = useReducedMotion();
  if (still) return null;
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {EMBERS.map((e, i) => (
        <Motion.span
          key={i}
          className="absolute bottom-6 rounded-full"
          style={{
            left: e.left,
            width: e.size,
            height: e.size,
            background: e.color,
            boxShadow: `0 0 8px ${e.color}`,
          }}
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{ opacity: [0, 0.9, 0], y: [-4, -150], x: [0, e.drift] }}
          transition={{ duration: e.dur, delay: e.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

const Vision = () => (
  <section id="vision" className="relative overflow-hidden py-24 md:py-32">
    {/* second movement — the stage turns emerald and peacock */}
    <Atmosphere colors={[SWARA_LIGHTS.ga, SWARA_LIGHTS.ma]} beams={1} particles={40} />

    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* The chord — seven notes standing in their own lights */}
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative mx-auto max-w-md">
            {/* the mark, vast and faint behind the instrument */}
            <Parallax depth={28} className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <SapthamMark size={380} variant="mono" title="" className="text-teal-swara opacity-[0.06]" />
            </Parallax>

            {/* the panel floats against the scroll — the parallax moment */}
            <ScrollFloat depth={36}>
              <div
                className="glow-border relative overflow-hidden px-6 py-10 shadow-[0_24px_60px_rgba(6,7,13,0.6)] md:px-10"
                style={{ "--gb-a": SWARA_LIGHTS.ga, "--gb-b": SWARA_LIGHTS.ma }}
              >
                {/* note-embers rising off the chord — the sound made visible */}
                <SwaraEmbers />
                <div className="relative flex items-end gap-2 md:gap-3">
                  {SWARAS.map((s, i) => (
                    <SwaraBar key={s.latin} swara={s} index={i} />
                  ))}
                </div>
                <div
                  className="mt-8 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${SWARA_LIGHTS.ga}, ${SWARA_LIGHTS.ma}, transparent)`,
                  }}
                  aria-hidden="true"
                />
                <p className="mt-4 text-center text-[0.6rem] tracking-[0.3em] text-ash uppercase">
                  Sapta Swara · the seven notes
                </p>
              </div>
            </ScrollFloat>
          </div>
        </Reveal>

        {/* The words */}
        <div className="order-1 lg:order-2">
          <SectionHeading align="left" eyebrow="Who We Are" title="A living sabha, not a showcase" />
          <Reveal delay={0.15}>
            <p className="mt-6 leading-relaxed text-ivory/80">
              Saptham — from <em className="text-gold not-italic">sapta</em>, seven — is the
              classical music and dance club of the College of Engineering Guindy. We exist so
              that the ancient arts are not preserved behind glass but{" "}
              <span className="text-goldhi">performed, taught, and passed on</span> — from
              seniors to freshers, from alumni to the stage.
            </p>
            <p className="mt-4 leading-relaxed text-ash">
              Every year we train, rehearse and stage full productions — carrying the seven
              notes from the practice room to festival halls, and carrying each other along
              the way.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Three pillars — each lit by its own pair of swara lights */}
      <StaggerGroup beat={0.12} className="mt-24 grid gap-6 md:grid-cols-3">
        {PILLARS.map((p) => (
          <StaggerItem key={p.title} className="h-full">
            <HoverLift className="h-full" lift={-8}>
              <div
                className="glow-border group relative h-full overflow-hidden p-8"
                style={{ "--gb-a": p.a, "--gb-b": p.b }}
              >
                {/* top light-strip ignites on hover */}
                <div
                  className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.a}, ${p.b}, transparent)` }}
                  aria-hidden="true"
                />
                <span className="font-display text-glow text-sm tracking-[0.3em]" style={{ color: p.a }}>
                  {p.n}
                </span>
                <h3 className="font-display mt-3 text-xl text-ivory">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ash">{p.body}</p>
              </div>
            </HoverLift>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  </section>
);

export default Vision;

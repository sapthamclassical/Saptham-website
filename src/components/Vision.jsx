import SectionHeading from "./shared/SectionHeading";
import SapthamMark from "./brand/SapthamMark";
import { Reveal, StaggerGroup, StaggerItem, HoverLift, Parallax } from "./motion/Motion";
import { Atmosphere, ScrollFloat, SWARA_LIGHTS } from "./stage/Stage";

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
 * One swara — a resonating veena string.
 *
 * Pure CSS (a mis-built bundle can drop Motion loops; a keyframe cannot). Each
 * string is plucked in sequence via a staggered delay, so a run travels up the
 * course; a bright node rides the string where it's plucked. The cadence is
 * shared across strings (same duration) so the seven read as one instrument.
 */
const STRING_DUR = 5.6; // slow, resonant

/**
 * The swara colour and the string's tempo/stagger travel as CSS variables, so
 * the two states — an always-on ripple on touch devices, and a rest-dim /
 * glow-on-hover "strum" on pointer devices — both live in App.css (see the
 * `@media (hover: hover)` block).
 */
const SwaraString = ({ swara, index }) => (
  <div
    className="veena-col group flex flex-1 flex-col items-center gap-4"
    style={{
      "--swara": swara.c,
      "--sdur": `${STRING_DUR}s`,
      "--sdelay": `${index * (STRING_DUR / 7)}s`,
    }}
  >
    <span className="font-tamil text-sm" style={{ color: swara.c }}>
      {swara.tamil}
    </span>

    <div className="relative flex h-40 w-full items-stretch justify-center md:h-52">
      <div className="veena-string" aria-hidden="true" />
      <span className="veena-node" aria-hidden="true" />
    </div>

    <span className="text-[0.7rem] tracking-[0.24em] uppercase" style={{ color: swara.c }}>
      {swara.latin}
    </span>
  </div>
);

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
                className="glow-border relative px-6 py-10 shadow-[0_24px_60px_rgba(6,7,13,0.6)] md:px-10"
                style={{ "--gb-a": SWARA_LIGHTS.ga, "--gb-b": SWARA_LIGHTS.ma }}
              >
                <div className="relative flex items-stretch gap-2 md:gap-3">
                  {/* the veena bridge — the strings resonate over it */}
                  <div
                    className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${SWARA_LIGHTS.ga}55, ${SWARA_LIGHTS.ma}55, transparent)`,
                    }}
                    aria-hidden="true"
                  />
                  {SWARAS.map((s, i) => (
                    <SwaraString key={s.latin} swara={s} index={i} />
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

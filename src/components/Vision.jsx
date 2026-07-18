import { motion as Motion, useReducedMotion } from "motion/react";
import SectionHeading from "./shared/SectionHeading";
import SapthamMark from "./brand/SapthamMark";
import { Reveal, StaggerGroup, StaggerItem, HoverLift, Parallax } from "./motion/Motion";
import { EASE, VIEWPORT } from "../lib/motion";

/**
 * The seven swaras — the club's namesake — rendered as a living instrument:
 * seven gold columns that rise like a held chord. Tamil letters ride above the
 * Latin names; the script survives here as an accent, not a system.
 */
const SWARAS = [
  { latin: "Sa", tamil: "ச", h: 0.52 },
  { latin: "Ri", tamil: "ரி", h: 0.66 },
  { latin: "Ga", tamil: "க", h: 0.58 },
  { latin: "Ma", tamil: "ம", h: 0.82 },
  { latin: "Pa", tamil: "ப", h: 1.0 },
  { latin: "Da", tamil: "த", h: 0.72 },
  { latin: "Ni", tamil: "நி", h: 0.9 },
];

const PILLARS = [
  {
    n: "01",
    title: "Carnatic Music",
    body: "Veena to violin, mridangam to voice — the discipline of the seven swaras, practiced and performed as living tradition.",
  },
  {
    n: "02",
    title: "Classical Dance",
    body: "Bharatanatyam and beyond — geometry, devotion and storytelling carried in araimandi, mudra and abhinaya.",
  },
  {
    n: "03",
    title: "One Family",
    body: "An unbroken lineage of students and alumni — a sabha where every newcomer belongs and every senior still returns.",
  },
];

/** One column of the chord. Scale-only animation, so it never touches layout. */
const SwaraBar = ({ swara, index }) => {
  const still = useReducedMotion();
  return (
    <div className="flex flex-1 flex-col items-center gap-3">
      <span className="font-tamil text-sm text-goldhi/70">{swara.tamil}</span>
      <div className="relative flex h-44 w-full items-end justify-center md:h-56">
        <Motion.div
          className="swara-bar w-2.5 rounded-full md:w-3"
          style={{
            height: `${swara.h * 100}%`,
            transformOrigin: "bottom",
            animationDelay: still ? undefined : `${index * 0.45}s`,
          }}
          initial={still ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1.1, delay: 0.15 + index * 0.09, ease: EASE }}
        />
      </div>
      <span className="text-[0.7rem] tracking-[0.24em] text-goldhi/80 uppercase">{swara.latin}</span>
    </div>
  );
};

const Vision = () => (
  <section id="vision" className="relative overflow-hidden py-24 md:py-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* The chord — seven notes standing like lamp flames */}
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative mx-auto max-w-md">
            {/* the mark, vast and faint behind the instrument */}
            <Parallax depth={28} className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <SapthamMark size={380} variant="mono" title="" className="text-msblue opacity-[0.06]" />
            </Parallax>

            <div className="on-blue relative bg-msblue px-6 py-10 shadow-[0_24px_60px_rgba(22,36,78,0.3)] md:px-10">
              
              <div className="relative flex items-end gap-2 md:gap-3">
                {SWARAS.map((s, i) => (
                  <SwaraBar key={s.latin} swara={s} index={i} />
                ))}
              </div>
              <div className="gold-hairline mt-8" />
              <p className="mt-4 text-center text-[0.6rem] tracking-[0.3em] text-goldhi/80 uppercase">
                Sapta Swara · the seven notes
              </p>
            </div>
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

      {/* Three pillars */}
      <StaggerGroup beat={0.12} className="mt-24 grid gap-6 md:grid-cols-3">
        {PILLARS.map((p) => (
          <StaggerItem key={p.title} className="h-full">
            <HoverLift className="h-full" lift={-8}>
              <div className="group relative h-full overflow-hidden border border-granite/70 bg-charcoal/60 p-8 transition-colors duration-500 hover:border-gold/40 hover:bg-charcoal">
                {/* top rule ignites on hover */}
                <div className="gold-hairline absolute inset-x-0 top-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="font-display text-sm text-goldlo/80 tracking-[0.3em]">{p.n}</span>
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

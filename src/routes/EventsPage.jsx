import { motion as Motion, useReducedMotion } from "motion/react";
import Events from "../components/Events";
import { Reveal } from "../components/motion/Motion";
import { Atmosphere, CharReveal, Orb, ScrollFloat, SWARA_LIGHTS } from "../components/stage/Stage";

/*
 * EVENTS · "Ragamalika" — a Carnatic concert stage in the dark.
 *
 * LAYER TALLY (animated/graphic layers, budget 70+):
 *   Overture header ......... Atmosphere[3 colours, 2 beams, dense] ≈ 11
 *                             + 2 solo Orbs, 6 CharReveal chars,
 *                             3 Reveals, scroll cue, ScrollFloat ....... ≈ 24
 *   Productions (pinned) .... Atmosphere[2 colours, 1 beam] ≈ 8
 *                             + scrubbed track, 4 panels × 7 layers
 *                             (glow-border, year badge, ghost-year
 *                             parallax, Ken-Burns rig, hover zoom,
 *                             scrim, swara footlight), clip-path masks,
 *                             end-cap ×3, progress bar, live counter ... ≈ 42
 *   Festival grid ........... Atmosphere[2 colours, 1 beam] ≈ 8
 *                             + SectionHeading ≈ 5, 6 cards × 9 layers
 *                             (stagger, halo, glow-border, mask reveal,
 *                             zoom, scrim, swara lamp, hairline, gloss)  ≈ 67
 *   TOTAL ................... ≈ 133 layers
 *
 * Every animation is transform / opacity / clip-path only; every one answers
 * useReducedMotion() — the GSAP scene swaps for a static stack, content stays
 * visible. Images carry aspect ratios (no CLS) and their original alt text.
 */

const EventsPage = () => {
  const still = useReducedMotion();

  return (
    <div className="relative bg-sanctum">
      {/* ── Overture — the house lights find the marquee ── */}
      <header className="relative flex min-h-[82svh] flex-col justify-center overflow-hidden px-6 pt-28 pb-20 md:px-10">
        <Atmosphere
          colors={[SWARA_LIGHTS.pa, SWARA_LIGHTS.da, SWARA_LIGHTS.sa]}
          beams={2}
          particles={70}
          dense
        />
        <Orb color={SWARA_LIGHTS.ni} x="74%" y="6%" size={300} opacity={0.18} dur={18} />
        <Orb color={SWARA_LIGHTS.ma} x="-6%" y="62%" size={340} opacity={0.14} dur={20} delay={2} />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <ScrollFloat depth={36}>
            <Reveal y={14}>
              <p className="eyebrow">Saptham · The Recital Calendar</p>
            </Reveal>

            <CharReveal
              as="h1"
              text="Events"
              delay={0.12}
              beat={0.055}
              className="font-display mt-4 block text-[19vw] leading-[0.95] font-medium tracking-tight sm:text-[8.5rem] lg:text-[11rem]"
              charClassName="gold-text"
            />

            <Reveal delay={0.55}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ash">
                One varnam a year — and a season of festival stages around it. Every
                production and performance, under the seven swara lights.
              </p>
            </Reveal>

            <Reveal delay={0.7}>
              <div className="mt-9 flex flex-wrap gap-x-9 gap-y-3 font-mono text-[0.68rem] tracking-[0.18em] uppercase">
                <span className="text-glow" style={{ color: SWARA_LIGHTS.sa }}>
                  04 Annual Productions
                </span>
                <span className="text-glow" style={{ color: SWARA_LIGHTS.ma }}>
                  06 Festival Stages
                </span>
                <span className="text-glow" style={{ color: SWARA_LIGHTS.pa }}>
                  One Family
                </span>
              </div>
            </Reveal>
          </ScrollFloat>
        </div>

        {/* scroll cue — a thread of light dripping toward the stage */}
        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2" aria-hidden="true">
          <Motion.div
            className="h-12 w-px bg-gradient-to-b from-transparent via-gold to-transparent"
            animate={still ? undefined : { y: [0, 10, 0], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </header>

      <Events />
    </div>
  );
};

export default EventsPage;

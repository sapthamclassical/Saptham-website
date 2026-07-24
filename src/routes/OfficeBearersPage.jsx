import { Link } from "react-router";
import { Atmosphere, CharReveal, MandalaRing, SoundWave, ScrollFloat, SWARA_LIGHTS } from "../components/stage/Stage";
import { Reveal, StaggerGroup } from "../components/motion/Motion";
import PersonCard from "../components/shared/PersonCard";
import KolamDivider from "../components/shared/KolamDivider";
import { useOfficeBearers } from "../hooks/useContent";

/** The garland — each bearer carries one of the seven lights, in order. */
const ACCENTS = Object.values(SWARA_LIGHTS);

/**
 * /office-bearers — the full roster under stage light. Data-driven from
 * Supabase (`office_bearers`) via useOfficeBearers(), JSON fallback baked in.
 * Cards cycle through the seven swara lights: a ragamalika of custodians.
 */
const OfficeBearersPage = () => {
  const { year, members } = useOfficeBearers();

  return (
    <div className="relative pt-24">
      {/* ── Overture — the lights come up on this year's bearers ─────────── */}
      <section className="relative overflow-hidden">
        <Atmosphere
          colors={[SWARA_LIGHTS.ma, SWARA_LIGHTS.sa, SWARA_LIGHTS.pa]}
          beams={2}
          particles={70}
          dense
        />
        <MandalaRing color={SWARA_LIGHTS.sa} size={560} opacity={0.14} className="left-1/2 top-0 -translate-x-1/2" />
        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-10 text-center sm:px-6 md:pt-24 lg:px-8">
          <Reveal y={12}>
            <p className="eyebrow">The Custodians · {year}</p>
          </Reveal>
          <h1 className="font-display mt-5 text-5xl leading-[1.02] font-medium tracking-tight text-ivory sm:text-6xl md:text-7xl">
            <CharReveal text="Office " charClassName="text-glow" />
            <CharReveal text="Bearers" charClassName="gold-text" delay={0.2} />
          </h1>
          <Reveal delay={0.35}>
            <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-ash">
              The hands that keep the lamp lit — this year's bearers of an unbroken
              lineage, each standing in their own swara light.
            </p>
          </Reveal>
        </div>
      </section>

      <SoundWave colors={[SWARA_LIGHTS.sa, SWARA_LIGHTS.ma]} height={70} amplitude={13} className="relative" />

      {/* ── The roster ───────────────────────────────────────────────────── */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerGroup
            beat={0.06}
            className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-8"
          >
            {members.map((person, i) => (
              <PersonCard
                key={`${person.name}-${i}`}
                person={person}
                accent={ACCENTS[i % ACCENTS.length]}
              />
            ))}
          </StaggerGroup>
        </div>
      </section>

      <KolamDivider />

      {/* ── Coda — the lamp passes backward ──────────────────────────────── */}
      <section className="relative overflow-hidden pb-28">
        <Atmosphere colors={[SWARA_LIGHTS.da]} beams={0} particles={24} />
        <ScrollFloat depth={24} className="relative">
          <Reveal className="mx-auto max-w-3xl px-6 text-center">
            <p className="font-display text-2xl leading-relaxed text-ivory italic md:text-3xl">
              Every bearer here inherits the lamp from someone{" "}
              <span className="accent-ital not-italic">who carried it first.</span>
            </p>
            <Link to="/alumni" className="btn-brass mt-10">
              Meet the Alumni
            </Link>
          </Reveal>
        </ScrollFloat>
      </section>
    </div>
  );
};

export default OfficeBearersPage;

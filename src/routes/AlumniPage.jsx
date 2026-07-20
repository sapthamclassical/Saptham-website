import { Atmosphere, CharReveal, MandalaRing, SoundWave, ScrollFloat, SWARA_LIGHTS } from "../components/stage/Stage";
import { Reveal, StaggerGroup } from "../components/motion/Motion";
import PersonCard from "../components/shared/PersonCard";
import KolamDivider from "../components/shared/KolamDivider";
import Testimonials from "../components/Testimonials";
import { useAlumni } from "../hooks/useContent";

/** Da — the violet swara light. The lineage's colour; it owns this page. */
const DA = SWARA_LIGHTS.da;

/**
 * /alumni — the parampara under violet light. Reads the same Supabase-backed
 * `alumni` table the Home Padam uses (useAlumni(), JSON fallback baked in):
 * adding an alumnus in the CMS surfaces here with no code change.
 */
const AlumniPage = () => {
  const { members } = useAlumni();

  return (
    <div className="relative pt-24">
      {/* ── Overture — violet wash, the colour of memory ─────────────────── */}
      <section className="relative overflow-hidden">
        <MandalaRing color={DA} size={540} opacity={0.15} className="left-1/2 top-2 -translate-x-1/2" />
        <Atmosphere colors={[DA, SWARA_LIGHTS.pa, SWARA_LIGHTS.ma]} beams={2} particles={60} dense />
        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-10 text-center sm:px-6 md:pt-24 lg:px-8">
          <Reveal y={12}>
            <p className="eyebrow" style={{ color: DA }}>
              Our Alumni
            </p>
          </Reveal>
          <h1 className="font-display mt-5 text-5xl leading-[1.02] font-medium tracking-tight text-ivory sm:text-6xl md:text-7xl">
            <CharReveal text="Alumni" charClassName="text-glow" />
          </h1>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-ash">
              Those who carried the lamp before us. The lineage is the instrument;
              we are only its current string.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── The lineage ──────────────────────────────────────────────────── */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollFloat depth={20}>
            <SoundWave colors={[DA, SWARA_LIGHTS.pa]} height={64} amplitude={12} className="relative mb-4" />
          <StaggerGroup
              beat={0.06}
              className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-8"
            >
              {members.map((person, i) => (
                <PersonCard key={`${person.name}-${i}`} person={person} accent={DA} />
              ))}
            </StaggerGroup>
          </ScrollFloat>
        </div>
      </section>

      <KolamDivider />

      {/* ── Their words — the Padam, in their own voices ─────────────────── */}
      <Testimonials />
    </div>
  );
};

export default AlumniPage;

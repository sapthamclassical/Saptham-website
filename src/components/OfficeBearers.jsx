import PersonCard from "./shared/PersonCard";
import SectionHeading from "./shared/SectionHeading";
import { StaggerGroup } from "./motion/Motion";
import { Atmosphere, SWARA_LIGHTS } from "./stage/Stage";
import { useOfficeBearers } from "../hooks/useContent";

/**
 * Scene 03 · The Custodians — data-driven from Supabase (`office_bearers`),
 * falling back to src/data/officeBearers.json until the CMS is migrated.
 *
 * Each portrait card takes the next swara light as its accent, so the grid
 * reads as the whole raga standing in a row — sa through ni and around again.
 * PersonCard renders a RevealItem, so StaggerGroup's hidden/show variants
 * cascade straight into the cards.
 */
const SWARA_CYCLE = Object.values(SWARA_LIGHTS);

const OfficeBearers = () => {
  const { year, members } = useOfficeBearers();

  return (
    <section id="office-bearers" className="relative overflow-hidden py-24 md:py-32">
      {/* low house lights — gold and violet, no beams competing with faces */}
      <Atmosphere colors={[SWARA_LIGHTS.ni, SWARA_LIGHTS.da]} beams={0} particles={28} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={`The Custodians · ${year}`}
          title="Office Bearers"
          sub="The hands that keep the lamp lit — this year's bearers of an unbroken lineage."
        />

        <StaggerGroup
          beat={0.08}
          className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-8"
        >
          {members.map((person, i) => (
            <PersonCard
              key={person.name}
              person={person}
              accent={SWARA_CYCLE[i % SWARA_CYCLE.length]}
            />
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
};

export default OfficeBearers;

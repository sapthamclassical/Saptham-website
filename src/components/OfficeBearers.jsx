import PersonCard from "./shared/PersonCard";
import SectionHeading from "./shared/SectionHeading";
import { RevealStagger } from "./shared/Reveal";
import { useOfficeBearers } from "../hooks/useContent";

/**
 * Scene 05 · The Custodians — data-driven from Supabase (`office_bearers`),
 * falling back to src/data/officeBearers.json until the CMS is migrated.
 * Portraits resolve from Storage, else from src/assets/people/ by filename
 * ("Full Name.jpg"); until a photo exists, the initials-mandala placeholder holds.
 */
const OfficeBearers = () => {
  const { year, members } = useOfficeBearers();

  return (
    <section id="office-bearers" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={`The Custodians · ${year}`}
          title="Office Bearers"
          sub="The hands that keep the lamp lit — this year's bearers of an unbroken lineage."
        />

        <RevealStagger
          beat={0.08}
          className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-8"
        >
          {members.map((person) => (
            <PersonCard key={person.name} person={person} />
          ))}
        </RevealStagger>
      </div>
    </section>
  );
};

export default OfficeBearers;

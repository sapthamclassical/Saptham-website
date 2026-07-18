import PersonCard from "../components/shared/PersonCard";
import SectionHeading from "../components/shared/SectionHeading";
import Testimonials from "../components/Testimonials";
import KolamDivider from "../components/shared/KolamDivider";
import { StaggerGroup } from "../components/motion/Motion";
import { useAlumni } from "../hooks/useContent";

const PLUM = "#B989AC"; // Da — the Padam swara, the lineage's accent

/**
 * The parampara, in full. Reads the same Supabase-backed `alumni` table the
 * Home page's Padam carousel uses — adding an alumnus in the CMS surfaces here
 * with no code change.
 */
const AlumniPage = () => {
  const { members } = useAlumni();

  return (
    <div className="pt-24">
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Parampara"
            title="Alumni"
            sub="Those who carried the lamp before us. The lineage is the instrument; we are only its current string."
          />

          <StaggerGroup
            beat={0.06}
            className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-8"
          >
            {members.map((person) => (
              <PersonCard key={person.name} person={person} accent={PLUM} />
            ))}
          </StaggerGroup>
        </div>
      </section>

      <KolamDivider />
      <Testimonials />
    </div>
  );
};

export default AlumniPage;

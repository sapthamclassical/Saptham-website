import EventCard from "./EventCard";
import SectionHeading from "./shared/SectionHeading";
import { RevealStagger } from "./shared/Reveal";
import { galleryImage } from "../lib/gallery";

/** Festival & ceremonial performances — the ensemble beside the Varnam. */
const EVENTS = [
  {
    title: "Techofes",
    description:
      "Saptham proudly performed during the inauguration of Techofes, the flagship inter-college cultural festival of CEG, bringing music, dance, and expression to kick off the grand celebrations.",
    image: "General/1.webp",
  },
  {
    title: "Agni",
    description:
      "Saptham performed at the inaugural ceremony of Agni, CEG's vibrant intra-college cultural fest, adding an artistic touch to the celebrations.",
    image: "General/14.webp",
  },
  {
    title: "Vizha",
    description:
      "Saptham contributed to the inauguration of Vizha — the freshers day of CEG — celebrating creativity, tradition, and talent through music and dance.",
    image: "General/12.webp",
  },
  {
    title: "Sampradha",
    description:
      "Saptham performed at the opening of Sampradha, an intra-college cultural fest of ACT that showcases heritage and artistry through expressive dance and music.",
    image: "General/7.webp",
  },
  {
    title: "Kalakrithi",
    description:
      "Saptham was part of the inaugural performances of Kalakrithi, the renowned inter-college festival of ACT, adding vibrant music and dance.",
    image: "General/6.webp",
  },
  {
    title: "Symposium Performances",
    description:
      "Saptham has performed during symposium events at both CEG & ACT, enriching academic gatherings with cultural performances.",
    image: "General/5.webp",
  },
];

const GeneralEvents = () => (
  <section className="relative py-20 md:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="The Ensemble"
        title="Festival Performances"
        sub="Invocations and stage appearances across the fests and ceremonies of CEG & ACT."
      />

      <RevealStagger beat={0.09} className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {EVENTS.map((e) => (
          <EventCard
            key={e.title}
            title={e.title}
            description={e.description}
            hideMeta
            images={[galleryImage(e.image)]}
          />
        ))}
      </RevealStagger>
    </div>
  </section>
);

export default GeneralEvents;

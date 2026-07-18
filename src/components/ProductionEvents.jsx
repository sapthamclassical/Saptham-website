import Reveal from "./shared/Reveal";
import SectionHeading from "./shared/SectionHeading";
import { galleryImage } from "../lib/gallery";

const KUMKUM = "#9B1C2E"; // Pa — the Varnam movement's swara accent

/** The annual productions — the Varnam, the centrepiece movement. */
const PRODUCTIONS = [
  {
    title: "Payanam",
    subtitle: "The Golden Ages of Tamil Nadu",
    date: "30 April 2022",
    location: "Vivekananda Auditorium",
    description:
      "Payanam celebrated the rich heritage and history of Tamil Nadu through Bharatanatyam, a classical dance form renowned for its finesse and grace. Set to the melodious ragams of Carnatic music, the performance beautifully brought to life stories from the golden ages of Tamil culture.",
    image: "Payanam/3.webp",
  },
  {
    title: "Vishwam",
    subtitle: "The Divine Incarnations of Lord Narayana",
    date: "20 May 2023",
    location: "Vivekananda Auditorium",
    description:
      "Vishwam presented the timeless stories of Lord Vishnu's ten avatars in a grand musical play. Combining drama, music, and devotion, the production offered an immersive journey into the divine tales of Lord Narayana.",
    image: "Vishwam/1.jpeg",
  },
  {
    title: "RasaLeela",
    subtitle: "A Complete Spectrum of Emotions",
    date: "13 April 2024",
    location: "Vivekananda Auditorium",
    description:
      "RasaLeela explored the full spectrum of human emotions through expressive music and dance. This annual production captured joy, love, longing, and devotion, leaving the audience enchanted by its artistry and storytelling.",
    image: "Rasaleela/1.webp",
  },
  {
    title: "Yaathra",
    subtitle: "Love, Life & Legacy",
    date: "17 May 2025",
    location: "Vivekananda Auditorium",
    description:
      "Yaathra wove together themes of love, longing, and devotion, presenting a journey of emotions and timeless stories. With music, movement, and expressive performances, the production offered a reflective and captivating experience for all.",
    image: "Yaathra/8.webp",
  },
];

const ProductionEvents = () => (
  <section className="relative py-20 md:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="The Annual Productions"
        title="Annual Productions"
        sub="Each year, one full-length recital — conceived, composed, rehearsed and staged entirely by students."
      />

      <div className="mt-20 space-y-24 md:space-y-32">
        {PRODUCTIONS.map((p, i) => (
          <Reveal key={p.title}>
            <article
              className={`grid items-center gap-8 md:gap-14 lg:grid-cols-2 ${
                i % 2 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Cinematic plate */}
              <div className="group relative overflow-hidden border border-granite/60">
                <div className="relative aspect-[3/2] bg-sanctum">
                  <img
                    src={galleryImage(p.image)}
                    alt={`${p.title} — ${p.subtitle}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sanctum/60 via-transparent to-transparent" />
                </div>
                {/* spotlight number */}
                <span className="font-display pointer-events-none absolute -top-4 right-4 text-7xl text-gold/15 select-none md:text-8xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Placard */}
              <div className={i % 2 ? "lg:pr-6" : "lg:pl-6"}>
                <p className="eyebrow mb-4" style={{ color: KUMKUM }}>
                  Production {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display gold-text text-4xl leading-tight md:text-5xl">
                  {p.title}
                </h3>
                <p className="font-display mt-2 text-lg text-ivory/70 italic">{p.subtitle}</p>
                <p className="mt-4 font-mono text-[0.7rem] tracking-[0.14em] text-gold/80 uppercase">
                  {p.date} · {p.location}
                </p>
                <div className="gold-hairline my-6 w-24" />
                <p className="max-w-xl leading-relaxed text-ash">{p.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default ProductionEvents;

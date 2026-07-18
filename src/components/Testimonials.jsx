import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "motion/react";
import SectionHeading from "./shared/SectionHeading";
import { getPersonImage, initialsOf } from "../lib/people";
import { useAlumni } from "../hooks/useContent";

const EASE = [0.16, 1, 0.3, 1];
const PLUM = "#5E2E52"; // Da — the Padam movement's swara accent

/**
 * Scene 10 · Padam — the alumni lineage. Data-driven from Supabase (`alumni`),
 * falling back to src/data/alumni.json until the CMS is migrated.
 */
const Portrait = ({ person }) => {
  const img = getPersonImage(person.name, person.image);
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden border border-granite bg-charcoal">
      {img ? (
        <>
          <img src={img} alt={person.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-sanctum/80 via-transparent to-transparent" />
        </>
      ) : (
        <div className="kolam-dots flex h-full w-full items-center justify-center bg-gradient-to-b from-charcoal to-sanctum">
          <div
            className="absolute h-48 w-48 rounded-full opacity-25 blur-2xl tala-pulse"
            style={{ background: `radial-gradient(circle, ${PLUM}, transparent 70%)` }}
          />
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-goldlo/70">
            <div className="absolute inset-2 rounded-full border border-gold/40 border-dashed" />
            <span className="font-display gold-text text-5xl">{initialsOf(person.name)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const Testimonials = () => {
  const { members } = useAlumni();
  const [index, setIndex] = useState(0);
  const active = members[index] ?? members[0];

  const next = useCallback(() => setIndex((i) => (i + 1) % members.length), [members.length]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + members.length) % members.length),
    [members.length],
  );

  /* slow auto-advance — the padam's unhurried tempo */
  useEffect(() => {
    const t = setInterval(next, 9000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section id="alumni" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Lineage"
          title="Voices of the Parampara"
          sub="Those who carried the lamp before us, on what Saptham meant — and means."
        />

        <div className="mt-16 grid items-center gap-10 md:grid-cols-[minmax(0,340px)_1fr] md:gap-16">
          <AnimatePresence mode="wait">
            <Motion.div
              key={`p-${index}`}
              initial={{ opacity: 0, x: -24, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 24, filter: "blur(4px)" }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <Portrait person={active} />
            </Motion.div>
          </AnimatePresence>

          <div className="relative">
            <span className="font-display gold-text pointer-events-none absolute -top-10 -left-2 text-8xl opacity-40 select-none">
              &ldquo;
            </span>
            <AnimatePresence mode="wait">
              <Motion.blockquote
                key={`q-${index}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <p className="font-display text-xl leading-relaxed font-light text-ivory/90 italic md:text-2xl">
                  {active.quote}
                </p>
                <footer className="mt-8">
                  <div className="gold-hairline mb-5 w-24" />
                  <p className="font-display text-lg text-gold">{active.name}</p>
                  <p className="eyebrow mt-1 !text-[0.62rem]" style={{ color: "#B989AC" }}>
                    {active.role} {active.year}
                  </p>
                </footer>
              </Motion.blockquote>
            </AnimatePresence>

            {/* controls */}
            <div className="mt-10 flex items-center gap-6">
              <button
                onClick={prev}
                aria-label="Previous voice"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-granite text-gold transition-all duration-300 hover:border-gold hover:shadow-[0_0_20px_rgba(201,162,75,0.25)]"
              >
                ←
              </button>
              <button
                onClick={next}
                aria-label="Next voice"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-granite text-gold transition-all duration-300 hover:border-gold hover:shadow-[0_0_20px_rgba(201,162,75,0.25)]"
              >
                →
              </button>
              <div className="ml-2 flex gap-2">
                {members.map((m, i) => (
                  <button
                    key={m.name + i}
                    onClick={() => setIndex(i)}
                    aria-label={`Voice ${i + 1}`}
                    className="h-1 w-6 transition-all duration-500"
                    style={{ background: i === index ? "#C9A24B" : "#2A241D" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

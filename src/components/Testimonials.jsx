import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "motion/react";
import SectionHeading from "./shared/SectionHeading";
import { Atmosphere, SWARA_LIGHTS } from "./stage/Stage";
import { getPersonImage, initialsOf } from "../lib/people";
import { useAlumni } from "../hooks/useContent";

const EASE = [0.16, 1, 0.3, 1];
/* Each voice takes the stage under its own swara light. */
const SWARA_CYCLE = Object.values(SWARA_LIGHTS);

/**
 * Scene 04 · Padam — the alumni lineage. Data-driven from Supabase (`alumni`),
 * falling back to src/data/alumni.json until the CMS is migrated.
 *
 * Carousel mechanics kept (slow auto-advance, prev/next, jump dots); the
 * dressing is now the stage — a violet/crimson Atmosphere, a glow-border
 * portrait frame whose light changes with each voice, and a quote mark that
 * burns in the same colour.
 */
const Portrait = ({ person, accent }) => {
  const img = getPersonImage(person.name, person.image);
  return (
    <div
      className="glow-border relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden"
      style={{ "--gb-a": accent, "--gb-b": SWARA_LIGHTS.da }}
    >
      {img ? (
        <>
          <img src={img} alt={person.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-sanctum/80 via-transparent to-transparent" />
        </>
      ) : (
        <div className="kolam-dots flex h-full w-full items-center justify-center bg-gradient-to-b from-charcoal to-sanctum">
          <div
            className="tala-pulse absolute h-48 w-48 rounded-full opacity-30 blur-2xl"
            style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
            aria-hidden="true"
          />
          <div
            className="relative flex h-40 w-40 items-center justify-center rounded-full border"
            style={{ borderColor: `${accent}88` }}
          >
            <div className="absolute inset-2 rounded-full border border-dashed border-gold/40" />
            <span className="font-display gold-text text-5xl">{initialsOf(person.name)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const Testimonials = () => {
  const { members: allMembers } = useAlumni();
  // Only quote-bearing alumni take the carousel stage — newer alumni without
  // quotes still appear on /alumni, but a blank slide here reads as a bug.
  const members = allMembers.filter((m) => m.quote);
  const still = useReducedMotion();
  const [index, setIndex] = useState(0);
  const active = members[index] ?? members[0];
  const accent = SWARA_CYCLE[index % SWARA_CYCLE.length];

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

  if (!active) return null;

  return (
    <section id="alumni" className="relative overflow-hidden py-24 md:py-32">
      {/* final movement — violet and crimson wash */}
      <Atmosphere colors={[SWARA_LIGHTS.da, SWARA_LIGHTS.pa]} beams={1} particles={40} />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Lineage"
          title="Voices of Saptham"
          sub="Those who carried the lamp before us, on what Saptham meant — and means."
        />

        <div className="mt-16 grid items-center gap-10 md:grid-cols-[minmax(0,340px)_1fr] md:gap-16">
          <AnimatePresence mode="wait">
            <Motion.div
              key={`p-${index}`}
              initial={still ? false : { opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={still ? undefined : { opacity: 0, x: 24 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <Portrait person={active} accent={accent} />
            </Motion.div>
          </AnimatePresence>

          <div className="relative">
            {/* the quote mark burns in this voice's swara light */}
            <span
              className="font-display text-glow pointer-events-none absolute -top-10 -left-2 text-8xl opacity-60 transition-colors duration-700 select-none"
              style={{ color: accent }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <AnimatePresence mode="wait">
              <Motion.blockquote
                key={`q-${index}`}
                initial={still ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={still ? undefined : { opacity: 0, y: -14 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <p className="font-display text-xl leading-relaxed font-light text-ivory/90 italic md:text-2xl">
                  {active.quote}
                </p>
                <footer className="mt-8">
                  <div
                    className="mb-5 h-px w-24"
                    style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
                    aria-hidden="true"
                  />
                  <p className="font-display text-lg text-goldhi">{active.name}</p>
                  <p className="eyebrow mt-1 !text-[0.62rem]" style={{ color: accent }}>
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
                className="flex h-11 w-11 items-center justify-center rounded-full border border-granite text-gold transition-all duration-300 hover:border-plum hover:shadow-[0_0_20px_rgba(176,107,255,0.35)]"
              >
                ←
              </button>
              <button
                onClick={next}
                aria-label="Next voice"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-granite text-gold transition-all duration-300 hover:border-plum hover:shadow-[0_0_20px_rgba(176,107,255,0.35)]"
              >
                →
              </button>
              <div className="ml-2 flex gap-2">
                {members.map((m, i) => {
                  const c = SWARA_CYCLE[i % SWARA_CYCLE.length];
                  return (
                    <button
                      key={m.name + i}
                      onClick={() => setIndex(i)}
                      aria-label={`Voice ${i + 1}`}
                      className="h-1 w-6 transition-all duration-500"
                      style={{
                        background: i === index ? c : "#232741",
                        boxShadow: i === index ? `0 0 10px ${c}` : "none",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

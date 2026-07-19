import { getPersonImage, initialsOf } from "../../lib/people";
import { RevealItem } from "./Reveal";
import TiltCard from "../motion/TiltCard";
import SapthamMark from "../brand/SapthamMark";

/**
 * Portrait card — a performer standing in their own stage light.
 *
 * PROPS CONTRACT (do not change — OfficeBearers.jsx and others call this):
 *   person: { name, role, department, year?, image, bio, social }
 *   accent: a swara-light hex; colours the glow-border, halo and name plate.
 *
 * The photograph resolves via getPersonImage(name, image). Until a real
 * portrait exists the card holds an initials placeholder — a glowing ring in
 * the person's swara colour over a SapthamMark watermark. NEVER an AI face.
 * Drop "Full Name.jpg" into src/assets/people/ and the portrait appears.
 */
const PersonCard = ({ person, accent = "#38C8E8" }) => {
  const img = getPersonImage(person.name, person.image);
  /** accent at a given strength, fading to transparent */
  const soft = (pct) => `color-mix(in srgb, ${accent} ${pct}%, transparent)`;

  return (
    <RevealItem className="group">
      <TiltCard>
        <div className="relative">
          {/* halo — the light the card throws when the visitor leans in */}
          <div
            className="pointer-events-none absolute -inset-1 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-40"
            style={{ background: `radial-gradient(60% 60% at 50% 35%, ${accent}, transparent 72%)` }}
            aria-hidden="true"
          />

          <div
            className="glow-border relative overflow-hidden"
            style={{ "--gb-a": accent, "--gb-b": accent }}
          >
            {/* The stage — portrait or placeholder */}
            <div className="relative aspect-[4/5] overflow-hidden">
              {img ? (
                <>
                  <img
                    src={img}
                    alt={person.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
                  />
                  {/* stage-floor scrim so the name plate reads */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sanctum/75 via-transparent to-transparent" />
                  {/* footlight in the person's swara colour, warming on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(to top, ${soft(28)}, transparent 55%)`,
                    }}
                    aria-hidden="true"
                  />
                </>
              ) : (
                <div
                  className="relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-charcoal to-msdeep"
                  style={{ color: accent }}
                >
                  {/* watermark — the mark, in the person's light */}
                  <SapthamMark
                    variant="mono"
                    detail="simple"
                    size={200}
                    title=""
                    className="absolute opacity-[0.07] transition-opacity duration-700 group-hover:opacity-[0.12]"
                  />
                  {/* breathing pool of light */}
                  <div
                    className="tala-pulse absolute h-44 w-44 rounded-full opacity-25 blur-3xl"
                    style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
                    aria-hidden="true"
                  />
                  {/* the glowing ring */}
                  <div
                    className="relative flex h-32 w-32 items-center justify-center rounded-full transition-transform duration-700 group-hover:scale-105"
                    style={{
                      border: `1px solid ${soft(75)}`,
                      boxShadow: `0 0 26px ${soft(35)}, inset 0 0 20px ${soft(18)}`,
                    }}
                  >
                    <div
                      className="absolute inset-2 rounded-full border border-dashed"
                      style={{ borderColor: soft(40) }}
                      aria-hidden="true"
                    />
                    <span className="font-display text-glow text-3xl" style={{ color: accent }}>
                      {initialsOf(person.name)}
                    </span>
                  </div>
                  <span
                    className="absolute bottom-4 text-[0.56rem] tracking-[0.3em] uppercase"
                    style={{ color: soft(55) }}
                  >
                    Portrait forthcoming
                  </span>
                </div>
              )}
            </div>

            {/* Name plate — lit from the seam */}
            <div className="relative px-5 py-4">
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${soft(60)}, transparent)` }}
                aria-hidden="true"
              />
              <h3 className="font-display text-lg leading-snug text-ivory">{person.name}</h3>
              <p
                className="mt-1 text-[0.62rem] font-semibold tracking-[0.22em] uppercase"
                style={{ color: accent }}
              >
                {person.role}
                {person.year ? ` · ${person.year}` : ""}
              </p>
              {person.department && <p className="mt-1 text-xs text-ash">{person.department}</p>}
            </div>
          </div>
        </div>
      </TiltCard>
    </RevealItem>
  );
};

export default PersonCard;

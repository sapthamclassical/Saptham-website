import { getPersonImage, initialsOf } from "../../lib/people";
import { RevealItem } from "./Reveal";
import TiltCard from "../motion/TiltCard";

/**
 * Portrait card — a temple-wall niche.
 *
 * The photograph sits inside an arch on an MS Blue field, the way icons sit
 * in the niches of a sabha wall. No photo yet → the niche holds a zari ring
 * with the person's initials instead (no AI faces — per the respect clause).
 * Drop "Full Name.jpg" into src/assets/people/ and the portrait replaces it
 * automatically.
 */
const ring = (
  <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" aria-hidden="true">
    <circle cx="60" cy="60" r="56" stroke="#C9A24B" strokeWidth="0.9" fill="none" opacity="0.9" />
    <circle cx="60" cy="60" r="49" stroke="#E7C568" strokeWidth="0.5" fill="none" strokeDasharray="2 5" />
    {/* ashtadala — eight petals */}
    {[...Array(8)].map((_, i) => (
      <path
        key={i}
        d="M60 6 C 65 14, 65 20, 60 26 C 55 20, 55 14, 60 6 Z"
        fill="none"
        stroke="#C9A24B"
        strokeWidth="0.6"
        opacity="0.85"
        transform={`rotate(${i * 45} 60 60)`}
      />
    ))}
  </svg>
);

const PersonCard = ({ person, accent = "#8E1B1E" }) => {
  const img = getPersonImage(person.name, person.image);
  return (
    <RevealItem className="group">
      <TiltCard>
        <div className="relative overflow-hidden border border-granite bg-charcoal shadow-[0_2px_0_#ddd3b9] transition-all duration-500 group-hover:border-gold/60 group-hover:shadow-[0_14px_40px_rgba(29,46,99,0.14)]">
          {/* The niche */}
          <div className="bg-msblue px-4 pt-5 pb-0 sm:px-5 sm:pt-6">
            <div className="arch relative aspect-[4/5] overflow-hidden border border-goldhi/50">
              {img ? (
                <>
                  <img
                    src={img}
                    alt={person.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-msdeep/45 via-transparent to-transparent" />
                </>
              ) : (
                <div className="relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-msblue to-msdeep">
                  <div
                    className="absolute h-40 w-40 rounded-full opacity-30 blur-2xl tala-pulse"
                    style={{ background: "radial-gradient(circle, #C9A24B, transparent 70%)" }}
                  />
                  <div className="relative h-32 w-32">
                    {ring}
                    <span className="font-display absolute inset-0 flex items-center justify-center text-3xl text-goldhi">
                      {initialsOf(person.name)}
                    </span>
                  </div>
                  <span className="absolute bottom-4 text-[0.56rem] tracking-[0.3em] text-goldhi/60 uppercase">
                    Portrait forthcoming
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Name plate on silk */}
          <div className="relative px-5 py-4">
            <h3 className="font-display text-lg leading-snug text-ivory">{person.name}</h3>
            <p className="eyebrow mt-1 !text-[0.62rem]" style={{ color: accent }}>
              {person.role}
              {person.year ? ` · ${person.year}` : ""}
            </p>
            {person.department && <p className="mt-1 text-xs text-ash">{person.department}</p>}
          </div>
        </div>
      </TiltCard>
    </RevealItem>
  );
};

export default PersonCard;

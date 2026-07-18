import { getPersonImage, initialsOf } from "../../lib/people";
import { RevealItem } from "./Reveal";

/**
 * Portrait card with graceful missing-image handling.
 *
 * No photo yet → a premium placeholder: warm-black field, kolam dot-grid,
 * a fine gold mandala ring holding the person's initials in the display serif.
 * (No AI faces — per the respect clause.) Drop "Full Name.jpg" into
 * src/assets/people/ and the real portrait replaces it automatically.
 */
const ring = (
  <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" aria-hidden="true">
    <circle cx="60" cy="60" r="56" stroke="#8A6A25" strokeWidth="0.8" fill="none" opacity="0.9" />
    <circle cx="60" cy="60" r="49" stroke="#C9A24B" strokeWidth="0.5" fill="none" strokeDasharray="2 5" />
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

const PersonCard = ({ person, accent = "#C9A24B" }) => {
  const img = getPersonImage(person.name, person.image);
  return (
    <RevealItem className="group">
      <div className="relative overflow-hidden border border-granite/80 bg-charcoal transition-all duration-500 group-hover:border-gold/50 group-hover:shadow-[0_8px_48px_rgba(201,162,75,0.12)]">
        {/* Portrait area — 4:5 like the OB shoot spec */}
        <div className="relative aspect-[4/5] overflow-hidden">
          {img ? (
            <>
              <img
                src={img}
                alt={person.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              {/* candlelit grade: warm shadow + protected highlight */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sanctum/85 via-transparent to-sanctum/20" />
            </>
          ) : (
            <div className="kolam-dots relative flex h-full w-full items-center justify-center bg-gradient-to-b from-charcoal to-sanctum">
              {/* soft lamp glow behind the ring */}
              <div
                className="absolute h-44 w-44 rounded-full opacity-25 blur-2xl tala-pulse"
                style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
              />
              <div className="relative h-36 w-36">
                {ring}
                <span className="absolute inset-0 flex items-center justify-center font-display text-4xl gold-text">
                  {initialsOf(person.name)}
                </span>
              </div>
              <span className="absolute bottom-4 text-[0.6rem] tracking-[0.3em] uppercase text-basalt">
                Portrait forthcoming
              </span>
            </div>
          )}
        </div>

        {/* Name plate */}
        <div className="relative px-5 py-4">
          <div className="gold-hairline absolute left-5 right-5 top-0 opacity-60" />
          <h3 className="font-display text-lg text-ivory leading-snug">{person.name}</h3>
          <p className="eyebrow mt-1 !text-[0.62rem]" style={{ color: accent }}>
            {person.role}
            {person.year ? ` · ${person.year}` : ""}
          </p>
          {person.department && <p className="mt-1 text-xs text-ash">{person.department}</p>}
        </div>
      </div>
    </RevealItem>
  );
};

export default PersonCard;

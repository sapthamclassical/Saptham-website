import { RevealItem } from "./shared/Reveal";

/**
 * Museum-plate event card (dark): image matted in warm black, gold hairline,
 * mono metadata, serif title. Used for general events & performances.
 */
const EventCard = ({ title, date, location, description, hideMeta, images }) => (
  <RevealItem className="group h-full">
    <article className="flex h-full flex-col overflow-hidden border border-granite/70 bg-charcoal/70 transition-all duration-500 hover:border-gold/40 hover:shadow-[0_12px_48px_rgba(201,162,75,0.10)]">
      {/* plate */}
      <div className="relative aspect-[3/2] overflow-hidden bg-sanctum">
        {images?.[0] && (
          <img
            src={images[0]}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sanctum/70 via-transparent to-transparent" />
      </div>

      {/* placard */}
      <div className="relative flex flex-1 flex-col px-6 py-5">
        <div className="gold-hairline absolute top-0 right-6 left-6 opacity-60" />
        <h3 className="font-display text-xl text-ivory">{title}</h3>
        {!hideMeta && (date || location) && (
          <p className="mt-2 font-mono text-[0.68rem] tracking-[0.12em] text-gold/80 uppercase">
            {date} {location ? `· ${location}` : ""}
          </p>
        )}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ash">{description}</p>
      </div>
    </article>
  </RevealItem>
);

export default EventCard;

import officialGold from "../../assets/logo-gold.png";

/**
 * The processional — a slow band of vast outlined type moving like a temple
 * procession between sections. Outlined (stroke-only) so it reads as carving,
 * not content; the mark walks between the words.
 *
 * Pure CSS animation on transform, duplicated content for a seamless loop.
 * aria-hidden — it is texture; the words also live in real content elsewhere.
 */
const WORDS = ["Music", "Dance", "Tradition"];

const Strip = () => (
  <div className="marquee-strip flex shrink-0 items-center">
    {WORDS.map((w) => (
      <span key={w} className="flex items-center">
        <span className="marquee-word font-display px-8 text-7xl font-medium whitespace-nowrap md:px-14 md:text-8xl">
          {w}
        </span>
        <img src={officialGold} alt="" className="h-12 w-auto opacity-70 md:h-14" draggable="false" />
      </span>
    ))}
  </div>
);

const Marquee = () => (
  <div className="marquee relative overflow-hidden py-10 select-none" aria-hidden="true">
    <div className="marquee-track flex w-max">
      <Strip />
      <Strip />
    </div>
  </div>
);

export default Marquee;

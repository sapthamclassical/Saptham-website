import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "motion/react";
import { Reveal } from "./motion/Motion";
import { Orb, SWARA_LIGHTS } from "./stage/Stage";
import { galleryData, galleryCategories } from "../lib/gallery";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Scene · Smriti under stage light — the gallery as a concert in the dark.
 * Every production keeps its own swara light; the chips, tile glows, and the
 * lightbox all answer in that category's colour, consistently.
 */
const CATEGORY_LIGHT = {
  General: SWARA_LIGHTS.sa, // amber — the house light
  Payanam: SWARA_LIGHTS.ma, // peacock — the journey
  Vishwam: SWARA_LIGHTS.ga, // emerald — the cosmos
  Rasaleela: SWARA_LIGHTS.pa, // crimson — the dance
  Yaathra: SWARA_LIGHTS.ri, // vermilion — the pilgrimage
  "Prema Vaibhavam": SWARA_LIGHTS.da, // violet — the love
};
const lightFor = (cat) => CATEGORY_LIGHT[cat] ?? SWARA_LIGHTS.ni;

/**
 * Ragged-grid plate ratios — FIXED per index so the masonry never reflows as
 * images decode (zero CLS). The lightbox shows the uncropped photograph.
 */
const RATIOS = [
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[5/4]",
  "aspect-[2/3]",
];

/**
 * One plate: clip-path mask entrance (the ImageReveal `maskUp` recipe, inlined
 * because a per-tile stagger delay must live outside the variant's own
 * transition), slow hover zoom, and a swara-glow ring. Transform / opacity /
 * clip-path only.
 */
const PlateTile = ({ src, idx, cat, accent, onOpen, still }) => (
  <Motion.div
    className="mb-4 break-inside-avoid"
    initial={still ? false : { clipPath: "inset(100% 0% 0% 0%)", scale: 1.06 }}
    whileInView={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
    viewport={{ once: true, margin: "-6%" }}
    transition={{ duration: 1.05, ease: EASE, delay: (idx % 4) * 0.09 }}
    style={{ willChange: still ? undefined : "clip-path, transform" }}
  >
    <button
      onClick={onOpen}
      className={`group relative block w-full overflow-hidden border border-granite/60 bg-charcoal ${
        RATIOS[idx % RATIOS.length]
      }`}
      aria-label={`Open image ${idx + 1} of ${cat}`}
    >
      {/* the photograph — slow zoom, no layout involved */}
      <img
        src={src}
        alt={`${cat} — plate ${idx + 1}`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.07]"
      />
      {/* swara glow ring — a static shadow layer whose opacity animates */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 1px ${accent}99, inset 0 0 70px ${accent}1f, 0 0 42px ${accent}33`,
        }}
        aria-hidden="true"
      />
      {/* plate placard */}
      <span
        className="pointer-events-none absolute bottom-3 left-3 flex translate-y-1 items-center gap-2 font-mono text-[0.58rem] tracking-[0.22em] uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        style={{ color: accent }}
        aria-hidden="true"
      >
        <span className="inline-block h-1 w-1 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
        plate {String(idx + 1).padStart(2, "0")}
      </span>
    </button>
  </Motion.div>
);

const Gallery = () => {
  const still = useReducedMotion();
  const [active, setActive] = useState(galleryCategories[0] ?? "General");
  const [lightbox, setLightbox] = useState(null); // index | null
  const images = galleryData[active] ?? [];
  const accent = lightFor(active);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, images.length]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      {/* The invocation lives in GalleryPage (route shell) — no double header. */}

      {/* Swara chips — each production wears its own light */}
      <Reveal className="mb-12 flex flex-wrap justify-center gap-3">
        {galleryCategories.map((cat) => {
          const on = active === cat;
          const c = lightFor(cat);
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              aria-pressed={on}
              className={`relative rounded-full border px-5 py-2 text-[0.68rem] font-medium tracking-[0.18em] uppercase transition-all duration-500 ${
                on ? "" : "border-granite text-ash hover:border-basalt/80 hover:text-ivory"
              }`}
              style={
                on
                  ? {
                      borderColor: c,
                      color: c,
                      background: `${c}14`,
                      boxShadow: `0 0 26px ${c}45, inset 0 0 14px ${c}1f`,
                      textShadow: `0 0 18px ${c}90`,
                    }
                  : undefined
              }
            >
              <span
                className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle transition-opacity duration-500"
                style={{
                  background: c,
                  boxShadow: on ? `0 0 10px ${c}` : "none",
                  opacity: on ? 1 : 0.4,
                }}
                aria-hidden="true"
              />
              {cat}
            </button>
          );
        })}
      </Reveal>

      {/* Ragged plates — masked entrances, staggered by column beat */}
      <AnimatePresence mode="wait">
        <Motion.div
          key={active}
          initial={still ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: still ? 0 : -10 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="columns-2 gap-4 md:columns-3 lg:columns-4"
        >
          {images.map((img, idx) => (
            <PlateTile
              key={img}
              src={img}
              idx={idx}
              cat={active}
              accent={accent}
              onOpen={() => setLightbox(idx)}
              still={still}
            />
          ))}
        </Motion.div>
      </AnimatePresence>

      {/* Lightbox — the deep void, one photograph in its own swara light */}
      <AnimatePresence>
        {lightbox !== null && (
          <Motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-sanctum/95 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={`${active} gallery viewer`}
            initial={still ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            {/* two low stage lights behind the plate */}
            <Orb color={accent} x="12%" y="16%" size={420} opacity={0.14} dur={16} />
            <Orb color={SWARA_LIGHTS.da} x="66%" y="62%" size={380} opacity={0.1} dur={20} delay={1.2} />

            <button
              className="absolute top-5 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border transition-transform duration-300 hover:scale-110"
              style={{ borderColor: `${accent}66`, color: accent, textShadow: `0 0 16px ${accent}` }}
              onClick={() => setLightbox(null)}
              aria-label="Close full view"
            >
              ✕
            </button>

            <Motion.figure
              key={lightbox}
              className="relative max-h-full w-full max-w-5xl"
              initial={still ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[lightbox]}
                alt={`${active} — full view ${lightbox + 1}`}
                className="mx-auto max-h-[82vh] w-auto border object-contain"
                style={{
                  borderColor: `${accent}44`,
                  boxShadow: `0 32px 120px rgba(0,0,0,0.85), 0 0 90px ${accent}1f`,
                }}
              />
              <figcaption
                className="mt-4 flex items-center justify-center gap-2 text-center font-mono text-[0.65rem] tracking-[0.2em] uppercase"
                style={{ color: accent }}
              >
                <span
                  className="inline-block h-1 w-1 rounded-full"
                  style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
                  aria-hidden="true"
                />
                {active} · plate {lightbox + 1} / {images.length}
              </figcaption>

              <button
                onClick={() => setLightbox((i) => (i - 1 + images.length) % images.length)}
                className="absolute top-1/2 -left-2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border bg-sanctum/70 transition-transform duration-300 hover:scale-110 md:-left-16"
                style={{ borderColor: `${accent}66`, color: accent, boxShadow: `0 0 24px ${accent}33` }}
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                onClick={() => setLightbox((i) => (i + 1) % images.length)}
                className="absolute top-1/2 -right-2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border bg-sanctum/70 transition-transform duration-300 hover:scale-110 md:-right-16"
                style={{ borderColor: `${accent}66`, color: accent, boxShadow: `0 0 24px ${accent}33` }}
                aria-label="Next image"
              >
                →
              </button>
            </Motion.figure>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;

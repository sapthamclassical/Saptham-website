import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "motion/react";
import Reveal, { RevealStagger, RevealItem } from "./shared/Reveal";
import { galleryData, galleryCategories } from "../lib/gallery";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Scene 09 · Smriti — the gallery as a night-museum: warm-black matting, brass
 * tab rail, images revealed like plates in a catalogue, a candlelit lightbox.
 * Categories & images auto-discover from src/assets/Gallery/<Folder>/ — drop a
 * photo in a folder and it appears; add a folder and a new tab appears.
 */
const Gallery = () => {
  const [active, setActive] = useState(galleryCategories[0] ?? "General");
  const [lightbox, setLightbox] = useState(null); // index | null
  const images = galleryData[active] ?? [];

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
      {/* Page invocation */}
      <header className="pt-16 pb-12 text-center md:pt-24">
        <Reveal>
          <p className="eyebrow mb-5">Moments &amp; Memories</p>
          <h1 className="font-display gold-text text-5xl leading-[1.05] md:text-7xl">Gallery</h1>
          <p className="mx-auto mt-5 max-w-xl text-ash">
            Moments held in warm light — from the practice hall to the proscenium.
          </p>
        </Reveal>
      </header>

      {/* Brass tab rail */}
      <Reveal className="mb-12 flex flex-wrap justify-center gap-3">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`border px-5 py-2 text-[0.7rem] tracking-[0.18em] uppercase transition-all duration-400 ${
              active === cat
                ? "border-gold bg-gold/10 text-goldhi shadow-[0_0_24px_rgba(201,162,75,0.15)]"
                : "border-granite text-ash hover:border-gold/50 hover:text-ivory"
            }`}
          >
            {cat}
          </button>
        ))}
      </Reveal>

      {/* Museum plates — masonry columns */}
      <AnimatePresence mode="wait">
        <Motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <RevealStagger beat={0.05} className="columns-2 gap-4 md:columns-3 lg:columns-4">
            {images.map((img, idx) => (
              <RevealItem key={img} className="mb-4 break-inside-avoid">
                <button
                  onClick={() => setLightbox(idx)}
                  className="group block w-full overflow-hidden border border-granite/60 bg-charcoal transition-all duration-500 hover:border-gold/50"
                  aria-label={`Open image ${idx + 1} of ${active}`}
                >
                  <img
                    src={img}
                    alt={`${active} — plate ${idx + 1}`}
                    loading="lazy"
                    className="w-full transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-90"
                  />
                </button>
              </RevealItem>
            ))}
          </RevealStagger>
        </Motion.div>
      </AnimatePresence>

      {/* Candlelit lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <Motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-sanctum/95 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-5 right-6 font-display text-2xl text-gold transition-colors hover:text-goldhi"
              onClick={() => setLightbox(null)}
              aria-label="Close full view"
            >
              ✕
            </button>

            <Motion.figure
              key={lightbox}
              className="relative max-h-full w-full max-w-5xl"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[lightbox]}
                alt={`${active} — full view ${lightbox + 1}`}
                className="mx-auto max-h-[82vh] w-auto border border-granite/70 object-contain shadow-[0_32px_120px_rgba(0,0,0,0.8)]"
              />
              <figcaption className="mt-4 text-center font-mono text-[0.65rem] tracking-[0.2em] text-ash uppercase">
                {active} · plate {lightbox + 1} / {images.length}
              </figcaption>

              <button
                onClick={() => setLightbox((i) => (i - 1 + images.length) % images.length)}
                className="absolute top-1/2 -left-2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-granite bg-sanctum/70 text-gold transition-all hover:border-gold md:-left-16"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                onClick={() => setLightbox((i) => (i + 1) % images.length)}
                className="absolute top-1/2 -right-2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-granite bg-sanctum/70 text-gold transition-all hover:border-gold md:-right-16"
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

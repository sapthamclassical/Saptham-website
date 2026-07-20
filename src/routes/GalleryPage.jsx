import { useReducedMotion } from "motion/react";
import { Reveal } from "../components/motion/Motion";
import {
  Atmosphere,
  CharReveal,
  KolamKnot,
  MandalaRing,
  SoundWave,
  SWARA_LIGHTS,
} from "../components/stage/Stage";
import Gallery from "../components/Gallery";

/**
 * GALLERY · "The Night Museum" — a Ragamalika scene.
 *
 * The page is a darkened museum wing: pa (crimson) and da (violet) stage light
 * wash the walls, a mandala turns slowly behind the invocation, a raga ribbon
 * hums beneath it, and every photograph hangs in its production's own swara.
 *
 * ── ANIMATED / GRAPHIC LAYER TALLY (default view · General, 14 plates) ──────
 *   Atmosphere (pa/da, 2 beams) . 4 orbs + 2 beams + ember canvas (80 sprites)
 *                                 + kolam dot-grid + vignette ............  9
 *   CharReveal "Gallery" ........ 7 per-character 3D risers ..............  7
 *   MandalaRing ×2 (header) ..... 3 counter-rotating rings each ..........  6
 *   SoundWave divider ........... 3 drifting raga harmonics (1 canvas) ...  3
 *   KolamKnot ×4 (corners) ...... 4 self-drawing knots + 36 pulli dots ... 40
 *   Filter chips ×6 ............. swara ember + label + shared layout halo 13
 *   Plate tiles ×14 ............. mask reveal + slow zoom + swara glow ring
 *                                 + placard lift + placard ember ......... 70
 *   Lightbox (open) ............. 2 orbs + MandalaRing (3) + figure rise
 *                                 + 2 glowing arrows + caption ...........  9
 *   ── total on the museum floor ............................... ~148 layers
 */
const GalleryPage = () => {
  const still = useReducedMotion();

  return (
    <div className="relative overflow-hidden pt-24">
      {/* the lighting rig — pa and da wash the museum walls */}
      <Atmosphere
        colors={[SWARA_LIGHTS.pa, SWARA_LIGHTS.da]}
        beams={2}
        particles={80}
      />

      {/* sacred geometry, offset behind the invocation */}
      <MandalaRing
        color={SWARA_LIGHTS.pa}
        size={540}
        className="-top-28 left-1/2 hidden -translate-x-[64%] md:block"
        opacity={0.16}
      />
      <MandalaRing
        color={SWARA_LIGHTS.da}
        size={320}
        className="top-16 -right-24 hidden lg:block"
        opacity={0.12}
      />

      {/* kolam threads in the wing's corners */}
      <KolamKnot color={SWARA_LIGHTS.da} size={150} className="top-28 -left-6 opacity-40 md:left-4" />
      <KolamKnot color={SWARA_LIGHTS.pa} size={150} className="-right-6 bottom-10 opacity-40 md:right-4" delay={0.5} />

      {/* Page invocation — per-character rise under the rig */}
      <header className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 text-center sm:px-6 md:pt-24 lg:px-8">
        <Reveal y={12}>
          <p className="eyebrow mb-5">Moments &amp; Memories</p>
        </Reveal>
        <CharReveal
          as="h1"
          text="Gallery"
          beat={0.055}
          className="font-display text-5xl leading-[1.05] md:text-7xl"
          charClassName="gold-text"
        />
        <Reveal delay={0.35}>
          <p className="mx-auto mt-5 max-w-xl text-ash">
            Moments held in stage light — from the practice hall to the proscenium.
          </p>
        </Reveal>
      </header>

      {/* the raga ribbon — the sound of the wing, drawn */}
      <div className="relative mx-auto max-w-4xl px-6" aria-hidden="true">
        {still ? (
          <div className="korvai mx-auto my-8 max-w-xs" />
        ) : (
          <SoundWave
            colors={[SWARA_LIGHTS.pa, SWARA_LIGHTS.da, SWARA_LIGHTS.ni]}
            height={96}
            amplitude={16}
          />
        )}
      </div>

      {/* the museum floor */}
      <div className="relative">
        <Gallery />
      </div>
    </div>
  );
};

export default GalleryPage;

import Hero from "../components/Hero";
import Vision from "../components/Vision";
import OfficeBearers from "../components/OfficeBearers";
import Testimonials from "../components/Testimonials";
import KolamDivider from "../components/shared/KolamDivider";
import Marquee from "../components/shared/Marquee";

/**
 * RAGAMALIKA · the Home margam — a concert moving through the seven lights.
 *
 * Layer budget tally (~125 animated/graphic layers, vs. the 70 target):
 *   Hero          ≈ 61  Atmosphere (8 orbs + 2 beams + ember canvas + kolam +
 *                       vignette ≈ 13) · 30 CharReveal characters · rotating
 *                       mark watermark · lamp ring stack (halo, conic rim,
 *                       zari rim, video, inner vignette = 5) · orbit carrier +
 *                       7 swara satellites · 2 magnetic CTAs · scroll cue ·
 *                       eyebrow fade
 *   KolamDivider  ×2 =  2  korvai light-strips weaving on scroll
 *   Vision        ≈ 30  Atmosphere ≈ 11 · 7 swara bars × 2 transforms
 *                       (entrance + breathe) · parallax mark · ScrollFloat
 *                       panel · 3 glow-border pillars with hover strips
 *   Marquee       ≈  2  processional track + inline marks
 *   OfficeBearers ≈ 18  Atmosphere (no beams) ≈ 8 · ~10 tilting PersonCards
 *                       cascading through the swara cycle
 *   Testimonials  ≈ 15  Atmosphere ≈ 11 · glow-border portrait · burning
 *                       quote mark · accent rule · glowing jump dots
 *
 * Each divider is a breath between movements; each section is lit by a
 * different pair of swara lights, so the scroll itself is the ragamalika.
 */
const Home = () => (
  <>
    <Hero />
    <KolamDivider />
    <Vision />
    <Marquee />
    <OfficeBearers />
    <KolamDivider flip />
    <Testimonials />
  </>
);

export default Home;

import Hero from "../components/Hero";
import Vision from "../components/Vision";
import OfficeBearers from "../components/OfficeBearers";
import Testimonials from "../components/Testimonials";
import KolamDivider from "../components/shared/KolamDivider";
import Marquee from "../components/shared/Marquee";

/**
 * The margam: invocation → who we are → the custodians → the lineage.
 * Each divider is a breath between movements.
 */
const Home = () => (
  <>
    <Hero />
    <KolamDivider />
    <Vision />
    <Marquee />
    <OfficeBearers />
    <KolamDivider />
    <Testimonials />
  </>
);

export default Home;

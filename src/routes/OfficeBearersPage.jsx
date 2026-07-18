import { Link } from "react-router-dom";
import OfficeBearers from "../components/OfficeBearers";
import KolamDivider from "../components/shared/KolamDivider";
import { Reveal } from "../components/motion/Motion";

/** Deep-linkable page for the full roster. Same component the Home margam uses. */
const OfficeBearersPage = () => (
  <div className="pt-24">
    <OfficeBearers />
    <KolamDivider />
    <Reveal className="mx-auto max-w-3xl px-6 pb-28 text-center">
      <p className="text-ash leading-relaxed">
        Every bearer here inherits the lamp from someone who carried it first.
      </p>
      <Link to="/alumni" className="btn-brass mt-8">
        Meet the Alumni
      </Link>
    </Reveal>
  </div>
);

export default OfficeBearersPage;

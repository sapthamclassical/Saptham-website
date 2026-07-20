import ProductionEvents from "./ProductionEvents";
import GeneralEvents from "./GeneralEvents";
import KolamDivider from "./shared/KolamDivider";

/** Scene 06 · Varnam — the events page: the climax movement of the margam. */
const Events = () => (
  <div className="relative">
    {/* The invocation lives in EventsPage (route shell) — no double header. */}
    <ProductionEvents />
    <KolamDivider />
    <GeneralEvents />
  </div>
);

export default Events;

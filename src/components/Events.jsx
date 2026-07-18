import ProductionEvents from "./ProductionEvents";
import GeneralEvents from "./GeneralEvents";
import KolamDivider from "./shared/KolamDivider";
import Reveal from "./shared/Reveal";

/** Scene 06 · Varnam — the events page: the climax movement of the margam. */
const Events = () => (
  <div className="relative">
    {/* Page invocation */}
    <header className="relative pt-16 pb-4 text-center md:pt-24">
      <Reveal>
        <p className="eyebrow mb-5">The Recital Calendar</p>
        <h1 className="font-display gold-text text-5xl leading-[1.05] md:text-7xl">Events</h1>
      </Reveal>
    </header>

    <ProductionEvents />
    <KolamDivider />
    <GeneralEvents />
  </div>
);

export default Events;

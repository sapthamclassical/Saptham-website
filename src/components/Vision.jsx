import { useCallback, useRef } from "react";
import SectionHeading from "./shared/SectionHeading";
import SapthamMark from "./brand/SapthamMark";
import { Reveal, StaggerGroup, StaggerItem, HoverLift, Parallax } from "./motion/Motion";
import { Atmosphere, ScrollFloat, SWARA_LIGHTS } from "./stage/Stage";

/**
 * Scene 02 · The chord — the seven swaras as a live equalizer.
 *
 * Each column burns in its own swara light. The strings rest between gestures,
 * then resonate when a pointer or keyboard player strums them. The instrument
 * sits on a glow-border panel that floats against the scroll while the mark
 * parallaxes behind it.
 */
const SWARAS = [
  { latin: "Sa", tamil: "ச", h: 0.52, c: SWARA_LIGHTS.sa },
  { latin: "Ri", tamil: "ரி", h: 0.66, c: SWARA_LIGHTS.ri },
  { latin: "Ga", tamil: "க", h: 0.58, c: SWARA_LIGHTS.ga },
  { latin: "Ma", tamil: "ம", h: 0.82, c: SWARA_LIGHTS.ma },
  { latin: "Pa", tamil: "ப", h: 1.0, c: SWARA_LIGHTS.pa },
  { latin: "Da", tamil: "த", h: 0.72, c: SWARA_LIGHTS.da },
  { latin: "Ni", tamil: "நி", h: 0.9, c: SWARA_LIGHTS.ni },
];

const PILLARS = [
  {
    n: "01",
    title: "Carnatic Music",
    body: "Veena to violin, mridangam to voice — the discipline of the seven swaras, practiced and performed as living tradition.",
    a: SWARA_LIGHTS.sa,
    b: SWARA_LIGHTS.ri,
  },
  {
    n: "02",
    title: "Classical Dance",
    body: "Bharatanatyam and beyond — geometry, devotion and storytelling carried in araimandi, mudra and abhinaya.",
    a: SWARA_LIGHTS.ga,
    b: SWARA_LIGHTS.ma,
  },
  {
    n: "03",
    title: "One Family",
    body: "An unbroken lineage of students and alumni — a sabha where every newcomer belongs and every senior still returns.",
    a: SWARA_LIGHTS.pa,
    b: SWARA_LIGHTS.da,
  },
];

/**
 * One swara — a resonating veena string.
 *
 * The resting strings stay dim. Fine pointers strum with hover, while touch and
 * pen input trigger a one-shot pluck at the contact point.
 */
const SwaraString = ({ swara, index }) => (
  <div
    className="veena-col group flex flex-1 flex-col items-center gap-4 outline-none"
    data-veena-string={index}
    role="button"
    tabIndex={0}
    aria-label={`Pluck ${swara.latin} string`}
    style={{
      "--swara": swara.c,
    }}
  >
    <span className="font-tamil text-sm" style={{ color: swara.c }}>
      {swara.tamil}
    </span>

    <div className="veena-course relative flex h-40 w-full items-stretch justify-center md:h-52">
      <div className="veena-string" aria-hidden="true" />
      <span className="veena-node" aria-hidden="true" />
    </div>

    <span className="text-[0.7rem] tracking-[0.24em] uppercase" style={{ color: swara.c }}>
      {swara.latin}
    </span>
  </div>
);

const restartPluck = (column, clientY) => {
  const course = column.querySelector(".veena-course");
  const rect = course?.getBoundingClientRect();
  const contact = rect?.height
    ? Math.min(94, Math.max(6, ((clientY - rect.top) / rect.height) * 100))
    : 50;
  const token = String(Number(column.dataset.pluckToken || 0) + 1);

  column.style.setProperty("--pluck-y", `${contact}%`);
  column.dataset.pluckToken = token;
  column.classList.remove("is-plucked");
  void column.offsetWidth;
  column.classList.add("is-plucked");

  window.setTimeout(() => {
    if (column.dataset.pluckToken === token) column.classList.remove("is-plucked");
  }, 950);
};

const findStringAtPointer = (event) => {
  const hit = document.elementFromPoint(event.clientX, event.clientY) || event.target;
  const column = hit?.closest?.("[data-veena-string]");
  return column && event.currentTarget.contains(column) ? column : null;
};

const Vision = () => {
  const pointerGestures = useRef(new Map());

  const beginPointer = useCallback((event) => {
    if (event.pointerType === "mouse") return;

    pointerGestures.current.set(event.pointerId, {
      startX: event.clientX,
      startY: event.clientY,
      lastString: null,
    });
  }, []);

  const strumFromPointer = useCallback((event) => {
    if (event.pointerType === "mouse") return;

    const gesture = pointerGestures.current.get(event.pointerId);
    if (!gesture) return;

    const horizontalTravel = Math.abs(event.clientX - gesture.startX);
    const verticalTravel = Math.abs(event.clientY - gesture.startY);
    if (horizontalTravel < 6 || horizontalTravel <= verticalTravel) return;

    const column = findStringAtPointer(event);
    const stringId = column?.dataset.veenaString;
    if (!column || gesture.lastString === stringId) return;

    gesture.lastString = stringId;
    restartPluck(column, event.clientY);
  }, []);

  const finishPointer = useCallback((event) => {
    const gesture = pointerGestures.current.get(event.pointerId);
    pointerGestures.current.delete(event.pointerId);

    if (!gesture || event.pointerType === "mouse" || gesture.lastString !== null) return;

    const travel = Math.hypot(
      event.clientX - gesture.startX,
      event.clientY - gesture.startY,
    );
    if (travel > 10) return;

    const column = findStringAtPointer(event);
    if (column) restartPluck(column, event.clientY);
  }, []);

  const cancelPointer = useCallback((event) => {
    pointerGestures.current.delete(event.pointerId);
  }, []);

  const pluckFromKeyboard = useCallback((event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const column = event.target.closest?.("[data-veena-string]");
    if (!column || !event.currentTarget.contains(column)) return;

    event.preventDefault();
    const course = column.querySelector(".veena-course");
    const rect = course?.getBoundingClientRect();
    restartPluck(column, rect ? rect.top + rect.height / 2 : 0);
  }, []);

  return (
    <section id="vision" className="relative overflow-hidden py-24 md:py-32">
      {/* second movement — the stage turns emerald and peacock */}
      <Atmosphere colors={[SWARA_LIGHTS.ga, SWARA_LIGHTS.ma]} beams={1} particles={40} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* The chord — seven notes standing in their own lights */}
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative mx-auto max-w-md">
            {/* the mark, vast and faint behind the instrument */}
            <Parallax depth={28} className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <SapthamMark size={380} variant="mono" title="" className="text-teal-swara opacity-[0.06]" />
            </Parallax>

            {/* the panel floats against the scroll — the parallax moment */}
            <ScrollFloat depth={36}>
              <div
                className="glow-border relative px-6 py-10 shadow-[0_24px_60px_rgba(6,7,13,0.6)] md:px-10"
                style={{ "--gb-a": SWARA_LIGHTS.ga, "--gb-b": SWARA_LIGHTS.ma }}
              >
                <div
                  className="veena-instrument relative flex items-stretch gap-2 md:gap-3"
                  onPointerDown={beginPointer}
                  onPointerMove={strumFromPointer}
                  onPointerUp={finishPointer}
                  onPointerCancel={cancelPointer}
                  onPointerLeave={cancelPointer}
                  onKeyDown={pluckFromKeyboard}
                >
                  {/* the veena bridge — the strings resonate over it */}
                  <div
                    className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${SWARA_LIGHTS.ga}55, ${SWARA_LIGHTS.ma}55, transparent)`,
                    }}
                    aria-hidden="true"
                  />
                  {SWARAS.map((s, i) => (
                    <SwaraString key={s.latin} swara={s} index={i} />
                  ))}
                </div>
                <div
                  className="mt-8 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${SWARA_LIGHTS.ga}, ${SWARA_LIGHTS.ma}, transparent)`,
                  }}
                  aria-hidden="true"
                />
                <p className="mt-4 text-center text-[0.6rem] tracking-[0.3em] text-ash uppercase">
                  Sapta Swara · the seven notes
                </p>
              </div>
            </ScrollFloat>
          </div>
        </Reveal>

        {/* The words */}
        <div className="order-1 lg:order-2">
          <SectionHeading align="left" eyebrow="Who We Are" title="A living sabha, not a showcase" />
          <Reveal delay={0.15}>
            <p className="mt-6 leading-relaxed text-ivory/80">
              Saptham — from <em className="text-gold not-italic">sapta</em>, seven — is the
              classical music and dance club of the College of Engineering Guindy. We exist so
              that the ancient arts are not preserved behind glass but{" "}
              <span className="text-goldhi">performed, taught, and passed on</span> — from
              seniors to freshers, from alumni to the stage.
            </p>
            <p className="mt-4 leading-relaxed text-ash">
              Every year we train, rehearse and stage full productions — carrying the seven
              notes from the practice room to festival halls, and carrying each other along
              the way.
            </p>
          </Reveal>
        </div>
      </div>

        {/* Three pillars — each lit by its own pair of swara lights */}
        <StaggerGroup beat={0.12} className="mt-24 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p) => (
            <StaggerItem key={p.title} className="h-full">
              <HoverLift className="h-full" lift={-8}>
                <div
                  className="glow-border group relative h-full overflow-hidden p-8"
                  style={{ "--gb-a": p.a, "--gb-b": p.b }}
                >
                  {/* top light-strip ignites on hover */}
                  <div
                    className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `linear-gradient(90deg, transparent, ${p.a}, ${p.b}, transparent)` }}
                    aria-hidden="true"
                  />
                  <span className="font-display text-glow text-sm tracking-[0.3em]" style={{ color: p.a }}>
                    {p.n}
                  </span>
                  <h3 className="font-display mt-3 text-xl text-ivory">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ash">{p.body}</p>
                </div>
              </HoverLift>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
};

export default Vision;

import { useCallback, useEffect, useRef, useState } from "react";
import { motion as Motion, useReducedMotion } from "motion/react";
import { Atmosphere, CharReveal, MandalaRing, SoundWave, KolamKnot, SWARA_LIGHTS } from "../components/stage/Stage";
import { Reveal } from "../components/motion/Motion";
import { useAdmin, signOutAdmin } from "../lib/adminAuth";
import {
  getSeasonEvents,
  createSeasonEvent,
  updateSeasonEvent,
  deleteSeasonEvent,
} from "../data/repositories";
import { EASE } from "../lib/motion";

/*
 * /calendar — THE SEASON GARLAND (team priorities 6-7)
 *
 * Not a month grid. Upcoming performances hang as glowing beads on a single
 * vertical thread — a concert garland — grouped under vast month names. Each
 * bead takes one of the seven swara lights; the thread draws itself as you
 * scroll. Admins (through the hidden door) edit the garland inline; visitors
 * see only the published season.
 *
 * Layer tally ≈ 100+: Atmosphere ×2 ≈22, per-char month headers ~40+, per-bead
 * (halo + ring + core + date medallion + card glow) 5 × N events, thread
 * gradient, marquee-less but particle-dense.
 */

const LIGHTS = Object.values(SWARA_LIGHTS);
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const fmtDay = (iso) => {
  const d = new Date(iso + "T00:00:00");
  return { day: d.getDate(), month: MONTHS[d.getMonth()], year: d.getFullYear() };
};

/* ── one bead on the garland ─────────────────────────────────────────────── */
const Bead = ({ ev, i, isAdmin, onEdit, onDelete }) => {
  const c = ev.accent || LIGHTS[i % LIGHTS.length];
  const { day } = fmtDay(ev.date);
  const left = i % 2 === 0;
  // Mobile: one left-threaded column (the alternating timeline is unreadable at
  // ~130px per side). Desktop (md+): the alternating center-thread garland.
  return (
    <Motion.li
      className={`relative flex w-full justify-end pl-12 md:pl-0 ${left ? "md:justify-start" : "md:justify-end"}`}
      initial={{ opacity: 0, x: left ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {/* the bead on the thread — left rail on mobile, centre on desktop */}
      <span
        className="absolute left-4 top-8 z-10 h-4 w-4 -translate-x-1/2 rounded-full md:left-1/2"
        style={{ background: c, boxShadow: `0 0 14px ${c}, 0 0 34px ${c}55` }}
        aria-hidden="true"
      />
      <span
        className="tala-pulse absolute left-4 top-8 z-0 h-10 w-10 -translate-x-1/2 -translate-y-3 rounded-full opacity-30 blur-md md:left-1/2"
        style={{ background: c }}
        aria-hidden="true"
      />

      <div className={`w-full text-left md:w-[calc(50%-2.5rem)] ${left ? "md:pr-2 md:text-right" : "md:pl-2 md:text-left"}`}>
        <div
          className="glow-border group relative inline-block w-full max-w-md bg-charcoal/80 p-5 backdrop-blur-sm md:p-6"
          style={{ "--gb-a": c, "--gb-b": "transparent" }}
        >
          <div className={`flex items-baseline gap-4 ${left ? "md:flex-row-reverse" : ""}`}>
            <span className="font-display text-4xl leading-none md:text-5xl" style={{ color: c }}>
              {String(day).padStart(2, "0")}
            </span>
            <div className={left ? "md:text-right" : ""}>
              <h3 className="font-display text-lg text-ivory md:text-xl">{ev.title}</h3>
              {ev.venue && <p className="mt-1 text-xs tracking-wide text-ash">{ev.venue}</p>}
              {ev.timeNote && (
                <p className="mt-0.5 text-[0.68rem] tracking-[0.18em] uppercase" style={{ color: c }}>
                  {ev.timeNote}
                </p>
              )}
            </div>
          </div>
          {ev.details && <p className={`mt-3 text-sm leading-relaxed text-ash ${left ? "md:text-right" : ""}`}>{ev.details}</p>}
          {!ev.isPublished && (
            <p className="mt-2 text-[0.62rem] tracking-[0.2em] text-kumkum uppercase">draft — hidden from visitors</p>
          )}
          {isAdmin && (
            <div className={`mt-4 flex gap-3 text-[0.66rem] tracking-[0.14em] uppercase ${left ? "md:justify-end" : ""}`}>
              <button onClick={() => onEdit(ev)} className="text-gold hover:text-goldhi">Edit</button>
              <button onClick={() => onDelete(ev)} className="text-kumkum/80 hover:text-kumkum">Remove</button>
              <button
                onClick={() => onEdit({ ...ev, __togglePublish: true })}
                className="text-ash hover:text-ivory"
              >
                {ev.isPublished ? "Unpublish" : "Publish"}
              </button>
            </div>
          )}
        </div>
      </div>
    </Motion.li>
  );
};

/* ── admin editor card ───────────────────────────────────────────────────── */
const blank = { title: "", date: "", venue: "", timeNote: "", details: "" };
const Editor = ({ initial, onSave, onCancel }) => {
  const [f, setF] = useState(initial ?? blank);
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const input = "w-full border border-granite bg-sanctum/70 px-3 py-2.5 text-sm text-ivory outline-none placeholder:text-basalt focus:border-gold";
  return (
    <Motion.form
      className="glow-border mx-auto mt-10 max-w-lg space-y-3 bg-charcoal p-6"
      style={{ "--gb-a": "#F2B458", "--gb-b": "#4FB6A6" }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={async (e) => {
        e.preventDefault();
        if (!f.title || !f.date || busy) return;
        setBusy(true);
        try {
          const saved = await onSave(f);
          if (!saved) setBusy(false);
        } catch {
          setBusy(false);
        }
      }}
    >
      <p className="eyebrow">{f.id ? "Edit performance" : "Add a performance"}</p>
      <input className={input} placeholder="Title *" value={f.title} onChange={set("title")} maxLength={160} required />
      <div className="flex gap-3">
        <input className={input} type="date" value={f.date} onChange={set("date")} aria-label="Date" required />
        <input className={input} placeholder="Time (e.g. 6:30 PM)" value={f.timeNote} onChange={set("timeNote")} maxLength={80} />
      </div>
      <input className={input} placeholder="Venue" value={f.venue} onChange={set("venue")} maxLength={200} />
      <textarea className={input} rows={3} placeholder="Details" value={f.details} onChange={set("details")} maxLength={2000} />
      <div className="flex gap-3 pt-1">
        <button type="submit" disabled={busy} className="btn-brass flex-1 justify-center">
          {busy ? "Saving…" : "Save"}
        </button>
        <button type="button" onClick={onCancel} disabled={busy} className="btn-brass btn-brass--ghost">Cancel</button>
      </div>
    </Motion.form>
  );
};

/* ── the page ────────────────────────────────────────────────────────────── */
const CalendarPage = () => {
  const isAdmin = useAdmin();
  const still = useReducedMotion();
  const [events, setEvents] = useState([]);
  const [editing, setEditing] = useState(null); // null | "new" | SeasonEvent
  const [loading, setLoading] = useState(true);
  const [writeError, setWriteError] = useState("");
  const [loadError, setLoadError] = useState("");
  const loadId = useRef(0);

  const load = useCallback(async () => {
    const currentLoad = ++loadId.current;
    const { data, error } = await getSeasonEvents();
    if (currentLoad === loadId.current) {
      setEvents(data);
      setLoadError(error ? "The season could not be refreshed. Please try again shortly." : "");
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load, isAdmin]);
  useEffect(() => {
    if (!isAdmin) {
      setEditing(null);
      setWriteError("");
    }
  }, [isAdmin]);

  const save = async (f) => {
    setWriteError("");
    try {
      const { error } = f.id
        ? await updateSeasonEvent(f.id, { title: f.title, date: f.date, venue: f.venue, timeNote: f.timeNote, details: f.details })
        : await createSeasonEvent(f);
      if (error) throw new Error("write failed");
    } catch {
      setWriteError("The performance could not be saved. Check your admin session and try again.");
      return false;
    }
    setEditing(null);
    load();
    return true;
  };
  const onEdit = async (ev) => {
    if (ev.__togglePublish) {
      setWriteError("");
      try {
        const { error } = await updateSeasonEvent(ev.id, { isPublished: !ev.isPublished });
        if (error) throw new Error("write failed");
      } catch {
        setWriteError("The publishing status could not be changed. Check your admin session and try again.");
        return;
      }
      load();
      return;
    }
    setWriteError("");
    setEditing(ev);
  };
  const onDelete = async (ev) => {
    if (window.confirm(`Remove "${ev.title}" from the season?`)) {
      setWriteError("");
      try {
        const { error } = await deleteSeasonEvent(ev.id);
        if (error) throw new Error("write failed");
      } catch {
        setWriteError("The performance could not be removed. Check your admin session and try again.");
        return;
      }
      load();
    }
  };

  // Never retain a privileged rendering path after logout, even while the
  // anonymous refetch is still in flight.
  const visibleEvents = isAdmin ? events : events.filter((ev) => ev.isPublished);

  /* group by month key, keep date order */
  const groups = visibleEvents.reduce((acc, ev) => {
    const { month, year } = fmtDay(ev.date);
    const key = `${month} ${year}`;
    (acc[acc.length - 1]?.key === key ? acc[acc.length - 1].items : acc[acc.push({ key, items: [] }) - 1].items).push(ev);
    return acc;
  }, []);

  return (
    <div className="relative pt-24">
      <section className="relative overflow-hidden pb-10">
        <Atmosphere colors={[SWARA_LIGHTS.ni, SWARA_LIGHTS.pa, SWARA_LIGHTS.ma]} beams={2} particles={70} dense />
        <MandalaRing color={SWARA_LIGHTS.ni} size={520} opacity={0.16} className="left-1/2 top-4 -translate-x-1/2" />
        <div className="relative mx-auto max-w-5xl px-6 pt-14 text-center md:pt-20">
          <Reveal y={12}>
            <p className="eyebrow">The Season</p>
          </Reveal>
          <h1 className="font-display mt-5 text-4xl leading-[1.05] font-medium tracking-tight text-ivory sm:text-6xl md:text-7xl">
            <CharReveal text="Upcoming" className="inline-block whitespace-nowrap" charClassName="text-glow" />{" "}
            <CharReveal text="performances" className="inline-block whitespace-nowrap" charClassName="accent-ital" delay={0.25} />
          </h1>
          <Reveal delay={0.4}>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-ash">
              Every recital, production and appearance of the season — strung like a garland,
              one light at a time.
            </p>
          </Reveal>
          {isAdmin && (
            <Reveal delay={0.5}>
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={() => {
                    setWriteError("");
                    setEditing("new");
                  }}
                  className="btn-brass"
                >
                  Add a performance
                </button>
                <button onClick={() => signOutAdmin()} className="btn-brass btn-brass--ghost">Leave green room</button>
              </div>
            </Reveal>
          )}
          {writeError && (
            <p role="alert" className="mx-auto mt-5 max-w-lg text-sm text-kumkum">
              {writeError}
            </p>
          )}
          {loadError && (
            <p role="status" className="mx-auto mt-5 max-w-lg text-sm text-kumkum">
              {loadError}
            </p>
          )}
        </div>
        {isAdmin && editing && (
          <div className="relative px-6">
            <Editor
              key={editing === "new" ? "new" : editing.id}
              initial={editing === "new" ? null : editing}
              onSave={save}
              onCancel={() => setEditing(null)}
            />
          </div>
        )}
      </section>

      {/* the page's drone — a living waveform between head and garland */}
      <SoundWave colors={[SWARA_LIGHTS.ni, SWARA_LIGHTS.pa, SWARA_LIGHTS.ma]} height={90} amplitude={16} className="relative" />

      {/* ── the garland ── */}
      <section className="relative pb-32">
        <KolamKnot color={SWARA_LIGHTS.ni} size={170} className="left-4 top-6 opacity-60 md:left-10" />
        <KolamKnot color={SWARA_LIGHTS.da} size={150} className="right-4 bottom-10 opacity-50 md:right-10" delay={0.4} />
        <div className="relative mx-auto max-w-4xl px-6">
          {/* the thread */}
          <Motion.div
            className="absolute inset-y-0 left-4 w-px -translate-x-1/2 md:left-1/2"
            style={{
              background: "linear-gradient(to bottom, transparent, #E8B84D66 8%, #E8B84D66 92%, transparent)",
              transformOrigin: "top",
            }}
            initial={still ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: EASE }}
            aria-hidden="true"
          />

          {loading ? (
            <p className="py-20 text-center text-ash">Tuning…</p>
          ) : groups.length === 0 ? (
            <Reveal className="py-16 text-center">
              <p className="font-display text-2xl text-ivory/85 italic">The next season is being composed.</p>
              <p className="mt-3 text-sm text-ash">Announcements land here first — check back soon.</p>
            </Reveal>
          ) : (
            groups.map((g, gi) => (
              <div key={g.key} className="relative">
                <Reveal className="relative z-10 py-10 text-center">
                  <CharReveal
                    text={g.key}
                    className="font-display text-3xl text-ivory/90 md:text-4xl"
                    delay={0.05 * gi}
                  />
                </Reveal>
                <ul className="space-y-10">
                  {g.items.map((ev, i) => (
                    <Bead key={ev.id} ev={ev} i={i + gi} isAdmin={isAdmin} onEdit={onEdit} onDelete={onDelete} />
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default CalendarPage;

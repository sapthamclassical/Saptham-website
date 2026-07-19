import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Overture from "./components/Overture";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import { startLenis, stopLenis } from "./lib/scroll";
import PageTransition from "./components/PageTransition";
import Home from "./routes/Home";

/**
 * The scroll is a margam: invocation → who we are → the custodians → the
 * lineage → blessing. Darkness is the stage (#0E0B08); a site-wide film-grain
 * overlay unifies every view.
 *
 * Home is imported eagerly — it is the landing route for nearly every visit, so
 * deferring it would only add a round trip to the Largest Contentful Paint.
 * Every other route is split, so /events does not ship the gallery lightbox and
 * /contact does not ship the hero video player.
 */
const EventsPage = lazy(() => import("./routes/EventsPage"));
const GalleryPage = lazy(() => import("./routes/GalleryPage"));
const OfficeBearersPage = lazy(() => import("./routes/OfficeBearersPage"));
const AlumniPage = lazy(() => import("./routes/AlumniPage"));
const ContactPage = lazy(() => import("./routes/ContactPage"));
const CalendarPage = lazy(() => import("./routes/CalendarPage"));

/**
 * Suspense fallback.
 *
 * Deliberately an empty box of viewport height, not a spinner: chunks resolve
 * in tens of milliseconds on a warm connection, and a spinner that flashes for
 * 40ms reads as jank. Reserving the height is what keeps CLS at zero.
 */
const RouteFallback = () => <div className="min-h-svh" aria-hidden="true" />;

function App() {
  const location = useLocation();

  // Inertia scroll for pointer input. Reduced-motion users keep native
  // scrolling — easing the wheel is itself motion they asked to remove.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    startLenis();
    return () => stopLenis();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-sanctum text-ivory">
      <Overture />
      <Cursor />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />

      <main id="main">
        {/*
          `mode="wait"` holds the incoming route until the outgoing one has
          finished leaving. That is what gives ScrollToTop a covered moment to
          reset the offset, so the jump to top is never visible.
        */}
        <AnimatePresence mode="wait" initial={false}>
          <Suspense fallback={<RouteFallback />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/events" element={<PageTransition><EventsPage /></PageTransition>} />
              <Route path="/gallery" element={<PageTransition><GalleryPage /></PageTransition>} />
              <Route
                path="/office-bearers"
                element={<PageTransition><OfficeBearersPage /></PageTransition>}
              />
              <Route path="/alumni" element={<PageTransition><AlumniPage /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
              <Route path="/calendar" element={<PageTransition><CalendarPage /></PageTransition>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      <Footer />

      {/* site-wide film grain — "shot on film in a candlelit hall" */}
      <div className="grain-overlay" aria-hidden="true" />
    </div>
  );
}

export default App;

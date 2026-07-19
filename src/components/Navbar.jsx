import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion as Motion, useReducedMotion } from "motion/react";
import SapthamMark from "./brand/SapthamMark";
import { SWARA_LIGHTS } from "./stage/Stage";
import { EASE } from "../lib/motion";

/**
 * Each destination carries its own swara light — the active link glows in its
 * note's colour, so the nav itself reads sa–ri–ga–ma–pa–da like a scale.
 */
const LINKS = [
  { to: "/", label: "Home", swara: SWARA_LIGHTS.sa },
  { to: "/events", label: "Events", swara: SWARA_LIGHTS.ri },
  { to: "/gallery", label: "Gallery", swara: SWARA_LIGHTS.ga },
  { to: "/calendar", label: "Calendar", swara: SWARA_LIGHTS.ni },
  { to: "/office-bearers", label: "Office Bearers", swara: SWARA_LIGHTS.ma },
  { to: "/alumni", label: "Alumni", swara: SWARA_LIGHTS.da },
  { to: "/contact", label: "Contact", swara: SWARA_LIGHTS.pa },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const still = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  // The menu overlays the page on mobile; letting the body scroll behind it is
  // the classic scroll-through bug.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-sanctum/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link to="/" className="group flex items-center gap-2.5" aria-label="Saptham — home">
          <Motion.span
            className="flex"
            whileHover={still ? undefined : { rotate: -4, scale: 1.06 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            <SapthamMark size={34} title="" />
          </Motion.span>
          <span className="font-display text-xl font-medium tracking-[0.14em] text-ivory sm:text-2xl">
            SAPTHAM
          </span>
        </Link>

        {/* Desktop links — each glows in its own swara when active */}
        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `draw-link text-[0.68rem] font-medium tracking-[0.18em] whitespace-nowrap uppercase transition-colors duration-300 ${
                  isActive ? "active" : "text-ivory/70 hover:text-ivory"
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? {
                      color: l.swara,
                      textShadow: `0 0 18px color-mix(in srgb, ${l.swara} 60%, transparent)`,
                    }
                  : undefined
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className={`block h-px w-6 bg-gold transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-gold transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* a strip of stage light seals the glass once the page scrolls */}
      <div
        className={`korvai transition-opacity duration-500 ${scrolled ? "opacity-50" : "opacity-0"}`}
        aria-hidden="true"
      />

      {/* Mobile menu — the curtain */}
      <AnimatePresence>
        {open && (
          <Motion.div
            className="bg-sanctum/95 backdrop-blur-lg lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="flex flex-col gap-1 px-6 pt-2 pb-10">
              {LINKS.map((l, i) => (
                <Motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4, ease: EASE }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    className={({ isActive }) =>
                      `block py-3 font-display text-2xl ${isActive ? "text-glow italic" : "text-ivory/80"}`
                    }
                    style={({ isActive }) => (isActive ? { color: l.swara } : undefined)}
                  >
                    {l.label}
                  </NavLink>
                </Motion.div>
              ))}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

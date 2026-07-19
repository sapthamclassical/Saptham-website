import { useState } from "react";
import { Link } from "react-router-dom";
import { Atmosphere, SWARA_LIGHTS } from "./stage/Stage";
import { Reveal } from "./motion/Motion";
import officialGold from "../assets/logo-gold.png";
import AdminGate, { useSecretKnock } from "./AdminGate";

const LINKS = [
  ["/", "Home"],
  ["/events", "Events"],
  ["/gallery", "Gallery"],
  ["/calendar", "Calendar"],
  ["/office-bearers", "Office Bearers"],
  ["/alumni", "Alumni"],
  ["/contact", "Contact"],
];

/** The seven lights, in scale order — the last chord before the hall goes dark. */
const SWARAS = Object.values(SWARA_LIGHTS);

/**
 * The finale. The page resolves into the deepest panel on the site, entered
 * through a korvai of stage light; a whisper of atmosphere keeps the stage
 * breathing while the house lights come down.
 */
const Footer = () => {
  const [gateOpen, setGateOpen] = useState(false);
  // seven taps on the (c) glyph inside four seconds - the hidden door
  const knock = useSecretKnock(() => setGateOpen(true));
  return (
  <footer className="relative mt-24">
    <div className="korvai" aria-hidden="true" />
    <div className="relative overflow-hidden bg-msdeep">
      {/* the last of the stage light — deliberately sparse */}
      <Atmosphere colors={[SWARA_LIGHTS.da, SWARA_LIGHTS.ma]} beams={0} particles={20} />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <div className="grid gap-12 md:grid-cols-3">
            {/* Brand + blessing */}
            <div>

              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ash">
                The classical music &amp; dance club of the College of Engineering
                Guindy, Anna University.
              </p>
              {/* the official logo, rewoven in zari for the dark stage */}
              <div className="relative mt-6 inline-block">
                <div
                  className="tala-pulse absolute -inset-6 rounded-full opacity-20 blur-2xl"
                  style={{ background: "radial-gradient(circle, #E8B84D, transparent 70%)" }}
                  aria-hidden="true"
                />
                <img
                  src={officialGold}
                  alt="Official Saptham logo"
                  className="logo-glow relative h-20 w-auto"
                  loading="lazy"
                  draggable="false"
                />
              </div>
            </div>

            {/* Wayfinding */}
            <div>
              <p className="eyebrow mb-5">Explore</p>
              <ul className="space-y-3 text-sm">
                {LINKS.map(([to, label]) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="draw-link text-ivory/70 transition-colors duration-300 hover:text-goldhi"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="eyebrow mb-5">Get in Touch</p>
              <ul className="space-y-3 text-sm text-ivory/70">
                <li>
                  <a
                    href="mailto:sapthamclassical@gmail.com"
                    className="draw-link transition-colors duration-300 hover:text-goldhi"
                  >
                    sapthamclassical@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/saptham_ceg/"
                    target="_blank"
                    rel="noreferrer"
                    className="draw-link transition-colors duration-300 hover:text-goldhi"
                  >
                    Instagram · @saptham_ceg
                  </a>
                </li>
                <li className="text-ash">College of Engineering Guindy, Chennai 600025</li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* the final chord — seven lights, then dark */}
        <div className="mt-16 flex flex-col items-center gap-5">
          <div className="gold-hairline w-full" />
          <div className="mt-2 flex items-center gap-3" aria-hidden="true">
            {SWARAS.map((c, i) => (
              <span
                key={c}
                className="tala-pulse h-1.5 w-1.5 rounded-full"
                style={{
                  background: c,
                  boxShadow: `0 0 12px 2px color-mix(in srgb, ${c} 55%, transparent)`,
                  animationDelay: `${i * 0.28}s`,
                }}
              />
            ))}
          </div>
          <p className="font-display text-center text-sm text-ivory/75 italic">
            Where the seven notes become light.
          </p>
          <p className="text-[0.65rem] tracking-[0.2em] text-ash/70 uppercase">
            <span onClick={knock} className="cursor-default select-none">©</span>{" "}
            {new Date().getFullYear()} Saptham · CEG, Anna University
          </p>
        </div>
      </div>
    </div>
    <AdminGate open={gateOpen} onClose={() => setGateOpen(false)} />
  </footer>
  );
};

export default Footer;

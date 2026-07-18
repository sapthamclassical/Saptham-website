import { Link } from "react-router-dom";
import Reveal from "./shared/Reveal";
import SapthamMark from "./brand/SapthamMark";

/**
 * The blessing — the page resolves into the deep MS Blue field, entered
 * through a korvai border, the way a recital resolves onto the tonic.
 */
const Footer = () => (
  <footer className="on-blue relative mt-24">
    <div className="korvai" aria-hidden="true" />
    <div className="bg-msblue text-sanctum">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <div className="grid gap-12 md:grid-cols-3">
            {/* Brand + blessing */}
            <div>
              <span className="flex items-center gap-3">
                <SapthamMark size={44} variant="light" title="" />
                <span className="font-display text-3xl tracking-[0.12em] text-sanctum">
                  SAPTHAM
                </span>
              </span>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-sanctum/70">
                The classical music &amp; dance club of the College of Engineering
                Guindy, Anna University.
              </p>
            </div>

            {/* Wayfinding */}
            <div>
              <p className="eyebrow mb-5">The Margam</p>
              <ul className="space-y-3 text-sm">
                {[
                  ["/", "Home"],
                  ["/events", "Events"],
                  ["/gallery", "Gallery"],
                  ["/office-bearers", "Office Bearers"],
                  ["/alumni", "Alumni"],
                  ["/contact", "Contact"],
                ].map(([to, label]) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="draw-link text-sanctum/80 transition-colors hover:text-goldhi"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="eyebrow mb-5">Reach the Sabha</p>
              <ul className="space-y-3 text-sm text-sanctum/80">
                <li>
                  <a
                    href="mailto:sapthamclassical@gmail.com"
                    className="draw-link transition-colors hover:text-goldhi"
                  >
                    sapthamclassical@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/saptham_ceg/"
                    target="_blank"
                    rel="noreferrer"
                    className="draw-link transition-colors hover:text-goldhi"
                  >
                    Instagram · @saptham_ceg
                  </a>
                </li>
                <li className="text-sanctum/60">College of Engineering Guindy, Chennai 600025</li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* the last lamp */}
        <div className="mt-16 flex flex-col items-center gap-5">
          <div className="gold-hairline w-full" />
          <div className="tala-pulse mt-2 h-2 w-2 rounded-full bg-goldhi shadow-[0_0_18px_4px_rgba(201,162,75,0.5)]" />
          <p className="font-display text-center text-sm text-sanctum/70 italic">
            Where the seven notes become light.
          </p>
          <p className="text-[0.65rem] tracking-[0.2em] text-sanctum/40 uppercase">
            © {new Date().getFullYear()} Saptham · CEG, Anna University
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

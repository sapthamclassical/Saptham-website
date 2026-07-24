import { useState } from "react";
import { motion as Motion, useReducedMotion } from "motion/react";
import { Mail, MapPin, Phone, Instagram, Facebook, Youtube } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "./motion/Motion";
import TiltCard from "./motion/TiltCard";
import Magnetic from "./motion/Magnetic";
import {
  Atmosphere,
  CharReveal,
  KolamKnot,
  MandalaRing,
  Orb,
  ScrollFloat,
  SoundWave,
  SWARA_LIGHTS,
} from "./stage/Stage";

/*
 * CONTACT · "Ragamalika" — Scene 13 · Shanta, the quiet coda.
 *
 * The house lights dim to ma (peacock) and da (violet); a tanpura drone hums
 * under the headline. Formspree submission logic is preserved verbatim; every
 * name, number and address is untouched. Each form field wakes in its own
 * swara light; the info cards tilt like framed placards in lamplight.
 */

/* per-field swara lights — sa for the name, ma for the mail, da for the message */
const FIELD_LIGHTS = {
  name: SWARA_LIGHTS.sa,
  email: SWARA_LIGHTS.ma,
  message: SWARA_LIGHTS.da,
};

const fieldBase =
  "w-full border border-granite bg-sanctum/60 px-4 py-3 text-sm text-ivory placeholder:text-basalt " +
  "outline-none transition-all duration-300";

/* ── a field that glows in its own swara colour on focus ─────────────────── */
const SwaraField = ({ id, label, color, textarea = false, ...props }) => {
  const [lit, setLit] = useState(false);
  const Tag = textarea ? "textarea" : "input";
  return (
    <div>
      <label
        htmlFor={id}
        className="eyebrow mb-2 block !text-[0.62rem] transition-colors duration-300"
        style={lit ? { color } : undefined}
      >
        {label}
      </label>
      <Tag
        id={id}
        className={fieldBase}
        style={{
          outlineColor: color,
          ...(lit
            ? { borderColor: color, boxShadow: `0 0 0 1px ${color}55, 0 0 30px ${color}26` }
            : undefined),
        }}
        onFocus={() => setLit(true)}
        onBlur={() => setLit(false)}
        {...props}
      />
    </div>
  );
};

/* ── one tilted placard in lamplight ─────────────────────────────────────── */
/* This config's no-unused-vars cannot see JSX component-prop usage
   (`<Icon />` below) — a known false positive here, hence the disable. */
// eslint-disable-next-line no-unused-vars
const InfoCard = ({ color, Icon, label, knotDelay = 0, children }) => (
  <StaggerItem>
    <TiltCard max={5}>
      <div
        className="glow-border relative h-full overflow-hidden p-6"
        style={{ "--gb-a": color, "--gb-b": `${color}55` }}
      >
        {/* kolam ornament drawing itself in the corner */}
        <KolamKnot color={color} size={110} className="-right-7 -bottom-7 opacity-35" delay={knotDelay} />
        {/* the card's swara lamp */}
        <span
          className="tala-pulse absolute top-5 right-5 h-1.5 w-1.5 rounded-full"
          style={{ background: color, boxShadow: `0 0 12px ${color}` }}
          aria-hidden="true"
        />
        <div className="flex items-start gap-4">
          <span
            className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border"
            style={{ color, borderColor: `${color}44`, background: `${color}12` }}
            aria-hidden="true"
          >
            <Icon size={17} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="eyebrow !text-[0.6rem]" style={{ color }}>
              {label}
            </p>
            <div className="mt-2 text-sm leading-relaxed">{children}</div>
          </div>
        </div>
      </div>
    </TiltCard>
  </StaggerItem>
);

/** Scene 13 · Shanta — reach the sabha. Formspree submission preserved as-is. */
const ContactUs = () => {
  const still = useReducedMotion();
  const [formData, setFormData] = useState({ name: "", email: "", message: "", _gotcha: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);
    try {
      const response = await fetch("https://formspree.io/f/mojwgvjb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", _gotcha: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* ── The invocation — house lights on ma and da, a drone held under ── */}
      <header className="relative flex min-h-[62svh] flex-col justify-center overflow-hidden px-4 pt-28 pb-10 text-center sm:px-6 md:pt-32 lg:px-8">
        <Atmosphere colors={[SWARA_LIGHTS.ma, SWARA_LIGHTS.da]} beams={1} particles={50} />
        <Orb color={SWARA_LIGHTS.ni} x="76%" y="8%" size={260} opacity={0.15} dur={19} />
        <Orb color={SWARA_LIGHTS.pa} x="-4%" y="58%" size={300} opacity={0.1} dur={22} delay={2.4} />
        <KolamKnot color={SWARA_LIGHTS.ma} size={130} className="bottom-2 left-3 hidden opacity-30 lg:block" />
        <KolamKnot color={SWARA_LIGHTS.da} size={130} className="right-3 bottom-2 hidden opacity-30 lg:block" delay={0.5} />

        <div className="relative z-10 mx-auto w-full max-w-4xl">
          <ScrollFloat depth={28}>
            <Reveal y={12}>
              <p className="eyebrow mb-5">Get in Touch</p>
            </Reveal>

            <CharReveal
              as="h1"
              text="Get in touch"
              delay={0.12}
              beat={0.04}
              className="font-display block text-[12.5vw] leading-[1.02] font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
              charClassName="gold-text"
            />

            {/* the held tanpura drone under the heading */}
            <div className="mx-auto mt-1 max-w-2xl">
              <SoundWave
                colors={[SWARA_LIGHTS.ma, SWARA_LIGHTS.da, SWARA_LIGHTS.ni]}
                height={84}
                amplitude={14}
                className="opacity-80"
              />
            </div>

            <Reveal delay={0.5}>
              <p className="mx-auto mt-4 max-w-md leading-relaxed text-ash">
                Whether you want to perform, learn, collaborate, or invite us to your
                stage — the lamp is lit and the door is open.
              </p>
            </Reveal>
          </ScrollFloat>
        </div>
      </header>

      {/* ── The correspondence — placards and the letter ── */}
      <section className="relative mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <Atmosphere colors={[SWARA_LIGHTS.ni, SWARA_LIGHTS.ma]} beams={0} particles={36} className="opacity-70" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-5 lg:gap-14">
          {/* Details — four placards, each under its own swara light */}
          <StaggerGroup className="space-y-6 lg:col-span-2">
            <InfoCard color={SWARA_LIGHTS.sa} Icon={Mail} label="Email">
              <a
                href="mailto:sapthamclassical@gmail.com"
                className="draw-link break-all text-ivory/85 hover:text-gold"
              >
                sapthamclassical@gmail.com
              </a>
            </InfoCard>

            <InfoCard color={SWARA_LIGHTS.ri} Icon={Phone} label="Phone" knotDelay={0.25}>
              <a href="tel:+918870655694" className="draw-link block text-ivory/85 hover:text-gold">
                Dhanya Vikram · +91 88706 55694
              </a>
              <a
                href="tel:+919176755377"
                className="draw-link mt-1.5 block text-ivory/85 hover:text-gold"
              >
                Anujan · +91 91767 55377
              </a>
            </InfoCard>

            <InfoCard color={SWARA_LIGHTS.ga} Icon={MapPin} label="The Hall" knotDelay={0.5}>
              <p className="text-ivory/85">
                College of Engineering Guindy, Anna University
                <br />
                Chennai 600025, Tamil Nadu
              </p>
            </InfoCard>

            <InfoCard color={SWARA_LIGHTS.pa} Icon={Instagram} label="Follow Us" knotDelay={0.75}>
              <div className="mt-1 flex gap-4">
                {[
                  {
                    href: "https://www.facebook.com/sapthamceg",
                    Icon: Facebook,
                    label: "Facebook",
                    c: SWARA_LIGHTS.ma,
                  },
                  {
                    href: "https://www.instagram.com/sapthamclassical?igsh=NGNobHdwc3k5b25l",
                    Icon: Instagram,
                    label: "Instagram",
                    c: SWARA_LIGHTS.pa,
                  },
                  {
                    href: "https://www.youtube.com/@SapthamClassicalAU",
                    Icon: Youtube,
                    label: "YouTube",
                    c: SWARA_LIGHTS.ri,
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-granite transition-all duration-300 hover:border-gold hover:shadow-[0_0_20px_rgba(232,184,77,0.25)]"
                    style={{ color: s.c }}
                  >
                    <s.Icon size={17} />
                  </a>
                ))}
              </div>
            </InfoCard>
          </StaggerGroup>

          {/* The letter — a glow-border panel with a mandala turning behind it */}
          <div className="relative lg:col-span-3">
            <MandalaRing
              color={SWARA_LIGHTS.da}
              size={620}
              className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              opacity={0.2}
            />

            <Reveal delay={0.12} className="relative z-10">
              <form
                onSubmit={handleSubmit}
                className="glow-border relative overflow-hidden p-8 md:p-10"
                style={{ "--gb-a": SWARA_LIGHTS.ma, "--gb-b": SWARA_LIGHTS.da }}
              >
                <div className="gold-hairline absolute top-0 right-8 left-8 opacity-70" />
                <div className="space-y-6">
                  <input
                    type="text"
                    name="_gotcha"
                    value={formData._gotcha}
                    onChange={handleChange}
                    autoComplete="off"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="absolute -left-[10000px] h-px w-px opacity-0"
                  />
                  <SwaraField
                    id="c-name"
                    label="Your Name"
                    color={FIELD_LIGHTS.name}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    maxLength={120}
                    required
                  />
                  <SwaraField
                    id="c-email"
                    label="Email"
                    color={FIELD_LIGHTS.email}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    maxLength={254}
                    required
                  />
                  <SwaraField
                    id="c-message"
                    label="Message"
                    color={FIELD_LIGHTS.message}
                    textarea
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={5000}
                    placeholder="Write your message…"
                    required
                  />

                  <Magnetic strength={0.16} className="block w-full">
                    <button
                      type="submit"
                      className="btn-brass w-full justify-center"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending…" : "Send the Message"}
                    </button>
                  </Magnetic>

                  {status === "success" && (
                    <Motion.p
                      initial={still ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      role="status"
                      className="text-glow text-center text-sm"
                      style={{ color: SWARA_LIGHTS.ga }}
                    >
                      Message sent — we&rsquo;ll answer soon. 🪔
                    </Motion.p>
                  )}
                  {status === "error" && (
                    <Motion.p
                      initial={still ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      role="alert"
                      className="text-center text-sm"
                      style={{ color: SWARA_LIGHTS.pa }}
                    >
                      Something went wrong — please try again.
                    </Motion.p>
                  )}
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── The map — matted like a plate, under a strip of stage light ── */}
      <section className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="korvai mb-12 opacity-70" aria-hidden="true" />
        <Reveal>
          <div
            className="glow-border overflow-hidden"
            style={{ "--gb-a": SWARA_LIGHTS.ni, "--gb-b": SWARA_LIGHTS.ma }}
          >
            <iframe
              title="Saptham Location Map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7774.791347884569!2d80.2365983!3d13.0104565!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526700035eebd9%3A0x7984c41bf20d3100!2sCEG%20Square!5e0!3m2!1sen!2sin!4v1764260329277!5m2!1sen!2sin"
              className="h-80 w-full"
              style={{ filter: "grayscale(1) contrast(0.95) brightness(0.85)" }}
              loading="lazy"
            />
          </div>
          <p className="mt-3 text-center font-mono text-[0.62rem] tracking-[0.2em] text-basalt uppercase">
            CEG Square · 13.0105° N, 80.2366° E
          </p>
        </Reveal>
      </section>
    </div>
  );
};

export default ContactUs;

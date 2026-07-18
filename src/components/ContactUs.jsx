import { useState } from "react";
import { Mail, MapPin, Phone, Instagram, Facebook, Youtube } from "lucide-react";
import Reveal from "./shared/Reveal";

const TEAL = "#0E5A63"; // Ma — Shanta, the peace after the recital

const field =
  "w-full border border-granite bg-sanctum/60 px-4 py-3 text-sm text-ivory placeholder:text-basalt " +
  "outline-none transition-all duration-300 focus:border-gold/70 focus:shadow-[0_0_24px_rgba(201,162,75,0.12)]";

/** Scene 13 · Shanta — reach the sabha. Formspree submission preserved as-is. */
const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
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
        setFormData({ name: "", email: "", message: "" });
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
    <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
      {/* Page invocation */}
      <header className="pt-16 pb-14 text-center md:pt-24">
        <Reveal>
          <p className="eyebrow mb-5">Reach the Sabha</p>
          <h1 className="font-display gold-text text-5xl leading-[1.05] md:text-7xl">
            Reach the Sabha
          </h1>
        </Reveal>
      </header>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Details */}
        <Reveal>
          <div className="space-y-8">
            <p className="max-w-md leading-relaxed text-ash">
              Whether you want to perform, learn, collaborate, or invite us to your
              stage — the lamp is lit and the door is open.
            </p>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Mail size={18} className="mt-1 shrink-0" style={{ color: TEAL }} />
                <div>
                  <p className="eyebrow !text-[0.6rem]">Email</p>
                  <a
                    href="mailto:sapthamclassical@gmail.com"
                    className="draw-link text-ivory/85 hover:text-gold"
                  >
                    sapthamclassical@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone size={18} className="mt-1 shrink-0" style={{ color: TEAL }} />
                <div>
                  <p className="eyebrow !text-[0.6rem]">Phone</p>
                  <a href="tel:+918870655694" className="draw-link block text-ivory/85 hover:text-gold">
                    Dhanya Vikram · +91 88706 55694
                  </a>
                  <a href="tel:+919176755377" className="draw-link block text-ivory/85 hover:text-gold">
                    Anujan · +91 91767 55377
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <MapPin size={18} className="mt-1 shrink-0" style={{ color: TEAL }} />
                <div>
                  <p className="eyebrow !text-[0.6rem]">The Hall</p>
                  <p className="text-ivory/85">
                    College of Engineering Guindy, Anna University
                    <br />
                    Chennai 600025, Tamil Nadu
                  </p>
                </div>
              </li>
            </ul>

            <div>
              <p className="eyebrow mb-4 !text-[0.6rem]">Follow the Sabha</p>
              <div className="flex gap-4">
                {[
                  { href: "https://www.facebook.com/sapthamceg", Icon: Facebook, label: "Facebook" },
                  {
                    href: "https://www.instagram.com/sapthamclassical?igsh=NGNobHdwc3k5b25l",
                    Icon: Instagram,
                    label: "Instagram",
                  },
                  { href: "https://www.youtube.com/@SapthamClassicalAU", Icon: Youtube, label: "YouTube" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-granite text-gold transition-all duration-300 hover:border-gold hover:shadow-[0_0_20px_rgba(201,162,75,0.25)]"
                  >
                    <s.Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* The letter — brass form */}
        <Reveal delay={0.12}>
          <form
            onSubmit={handleSubmit}
            className="relative border border-granite/70 bg-charcoal/60 p-8"
          >
            <div className="gold-hairline absolute top-0 right-8 left-8 opacity-70" />
            <div className="space-y-6">
              <div>
                <label htmlFor="c-name" className="eyebrow mb-2 block !text-[0.62rem]">
                  Your Name
                </label>
                <input
                  id="c-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={field}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="c-email" className="eyebrow mb-2 block !text-[0.62rem]">
                  Email
                </label>
                <input
                  id="c-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={field}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="c-message" className="eyebrow mb-2 block !text-[0.62rem]">
                  Message
                </label>
                <textarea
                  id="c-message"
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={field}
                  placeholder="Write your message…"
                  required
                />
              </div>

              <button type="submit" className="btn-brass w-full justify-center" disabled={isLoading}>
                {isLoading ? "Sending…" : "Send the Message"}
              </button>

              {status === "success" && (
                <p className="text-center text-sm" style={{ color: "#7FB8A4" }}>
                  Message sent — we'll answer soon. 🪔
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-sm text-[#D64027]">
                  Something went wrong — please try again.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>

      {/* The map — matted like a plate */}
      <Reveal className="mt-20">
        <div className="overflow-hidden border border-granite/70">
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
    </div>
  );
};

export default ContactUs;

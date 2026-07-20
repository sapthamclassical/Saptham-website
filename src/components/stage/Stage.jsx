import { useEffect, useRef } from "react";
import { motion as Motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * RAGAMALIKA STAGE PRIMITIVES
 *
 * The layered-graphics toolkit for the concert-stage design. One Atmosphere
 * instance contributes 10–15 independent animated layers (orbs, beams,
 * particles, vignette, grain interplay); compositions stack these to reach the
 * 70+ layer budget per page without 70 hand-written tweens.
 *
 * Rules baked in: transform/opacity only, reduced-motion always answered,
 * canvas pauses when offscreen or the tab hides.
 */

/* The seven swara lights */
/* Warmed per the team's note: cinematic but cultural — haldi, sindoor,
   mehndi, softened peacock, rose, soft violet, champa gold. */
export const SWARA_LIGHTS = {
  sa: "#F2B458",
  ri: "#E8734F",
  ga: "#7CC98F",
  ma: "#4FB6A6",
  pa: "#D95970",
  da: "#A375D9",
  ni: "#F2CE6B",
};

/* ── ParticleField — canvas dust/embers, one layer, hundreds of sprites ──── */
export const ParticleField = ({ color = "#E8B84D", count = 70, speed = 0.35, className = "" }) => {
  const ref = useRef(null);
  const still = useReducedMotion();

  useEffect(() => {
    if (still) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf = 0;
    let running = false;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const P = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * speed,
      vy: -(0.15 + Math.random() * speed),
      a: 0.15 + Math.random() * 0.5,
      tw: Math.random() * Math.PI * 2,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      for (const p of P) {
        p.x += p.vx;
        p.y += p.vy;
        p.tw += 0.03;
        if (p.y < -4) {
          p.y = h + 4;
          p.x = Math.random() * w;
        }
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        ctx.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // burn zero CPU when offscreen or tab hidden
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", resize);
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", resize);
    };
  }, [color, count, speed, still]);

  if (still) return null;
  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
};

/* ── Orb — one drifting aurora light ─────────────────────────────────────── */
export const Orb = ({ color, size = 420, x = "10%", y = "20%", drift = 40, dur = 14, opacity = 0.32, delay = 0 }) => {
  const still = useReducedMotion();
  return (
    <Motion.div
      className="orb"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        opacity,
      }}
      animate={
        still
          ? undefined
          : { x: [0, drift, -drift * 0.6, 0], y: [0, -drift * 0.7, drift * 0.5, 0], scale: [1, 1.12, 0.94, 1] }
      }
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
  );
};

/* ── Beam — a sweeping spotlight cone ────────────────────────────────────── */
export const Beam = ({ color = "#FFD98A", angle = 16, dur = 11, delay = 0, opacity = 1 }) => {
  const still = useReducedMotion();
  return (
    <Motion.div
      className="beam"
      style={{ "--beam-c": color, opacity, marginLeft: "-15vmax" }}
      animate={still ? undefined : { rotate: [-angle, angle, -angle] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
  );
};

/* ── Atmosphere — a full lighting rig in one drop-in layer stack ─────────── */
/**
 * layers: 2 orbs per colour + up to 2 beams + particles + vignette + dot grid.
 * With 3 colours ≈ 11 animated/graphic layers from one component.
 */
export const Atmosphere = ({ colors = ["#B06BFF", "#38C8E8"], beams = 1, particles = 60, dense = false, className = "" }) => (
  <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
    {colors.map((c, i) => (
      <Orb key={`a${i}`} color={c} x={`${8 + i * 34}%`} y={`${12 + ((i * 29) % 50)}%`} size={dense ? 520 : 380} dur={12 + i * 3} delay={i * 1.4} />
    ))}
    {colors.map((c, i) => (
      <Orb key={`b${i}`} color={c} x={`${62 - i * 26}%`} y={`${58 - ((i * 17) % 40)}%`} size={dense ? 360 : 260} dur={16 + i * 2} delay={i * 2.1} opacity={0.22} />
    ))}
    {Array.from({ length: beams }, (_, i) => (
      <Beam key={`beam${i}`} color={colors[i % colors.length]} angle={12 + i * 7} dur={10 + i * 4} delay={i * 1.8} opacity={0.8 - i * 0.25} />
    ))}
    <ParticleField color={colors[0]} count={particles} />
    <div className="kolam-dots absolute inset-0 opacity-[0.14]" />
    <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 180px 60px #0B0806" }} />
  </div>
);

/* ── CharReveal — per-character text physics ─────────────────────────────── */
export const CharReveal = ({ text, className = "", charClassName = "", as = "span", delay = 0, beat = 0.028, y = 46 }) => {
  const Tag = as;
  const still = useReducedMotion();
  if (still) {
    return (
      <Tag className={className}>
        <span className={charClassName}>{text}</span>
      </Tag>
    );
  }
  return (
    <Tag className={className} aria-label={text}>
      {String(text)
        .split("")
        .map((ch, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
            <Motion.span
              className={`inline-block ${charClassName}`}
              initial={{ y, opacity: 0, rotateX: 60 }}
              whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: delay + i * beat, ease: [0.16, 1, 0.3, 1] }}
            >
              {ch === " " ? " " : ch}
            </Motion.span>
          </span>
        ))}
    </Tag>
  );
};

/* ── ScrollScrub — GSAP-pinned scene with scrubbed progress ──────────────── */
/**
 * Pins its child for `lengthVh` of scroll and calls gsap with a scrubbed
 * timeline you build in `build(tl, el)`. Cleans up on unmount.
 */
export const useScrollScrub = (build, lengthVh = 160) => {
  const ref = useRef(null);
  const still = useReducedMotion();
  useEffect(() => {
    if (still || !ref.current) return;
    const el = ref.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: `+=${lengthVh}%`,
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
      },
    });
    build(tl, el);
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [build, lengthVh, still]);
  return ref;
};

/* ── ScrollFloat — Motion-based scroll parallax for any child ────────────── */
export const ScrollFloat = ({ children, depth = 60, className = "" }) => {
  const ref = useRef(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yy = useTransform(scrollYProgress, [0, 1], [depth, -depth]);
  return (
    <div ref={ref} className={className}>
      <Motion.div style={still ? undefined : { y: yy, willChange: "transform" }}>{children}</Motion.div>
    </div>
  );
};


/* ── MandalaRing — rotating sacred geometry, pure SVG transforms ─────────── */
/**
 * Three concentric rings — dashed orbit, petal ring, tick ring — turning at
 * different speeds and directions. Reads as intricate; costs three rotate
 * transforms. Drop behind headlines or in section corners.
 */
export const MandalaRing = ({ color = "#E8B84D", size = 360, className = "", opacity = 0.5 }) => {
  const still = useReducedMotion();
  const spin = (dur, dir = 1) =>
    still ? undefined : { rotate: 360 * dir };
  const trans = (dur) => ({ duration: dur, repeat: Infinity, ease: "linear" });
  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{ width: size, height: size, opacity }}
      aria-hidden="true"
    >
      {/* outer dashed orbit */}
      <Motion.svg viewBox="0 0 200 200" className="absolute inset-0" animate={spin(60)} transition={trans(60)}>
        <circle cx="100" cy="100" r="96" fill="none" stroke={color} strokeWidth="0.6" strokeDasharray="1 7" />
        <circle cx="100" cy="100" r="88" fill="none" stroke={color} strokeWidth="0.35" strokeDasharray="14 6" opacity="0.7" />
      </Motion.svg>
      {/* petal ring, counter-rotating */}
      <Motion.svg viewBox="0 0 200 200" className="absolute inset-0" animate={spin(90, -1)} transition={trans(90)}>
        {Array.from({ length: 16 }, (_, i) => (
          <path
            key={i}
            d="M100 22 C 106 34, 106 44, 100 54 C 94 44, 94 34, 100 22 Z"
            fill="none"
            stroke={color}
            strokeWidth="0.6"
            opacity="0.8"
            transform={`rotate(${i * 22.5} 100 100)`}
          />
        ))}
      </Motion.svg>
      {/* inner tick ring */}
      <Motion.svg viewBox="0 0 200 200" className="absolute inset-0" animate={spin(40)} transition={trans(40)}>
        {Array.from({ length: 28 }, (_, i) => (
          <line
            key={i}
            x1="100" y1="62" x2="100" y2="68"
            stroke={color} strokeWidth="0.7" opacity="0.75"
            transform={`rotate(${(i * 360) / 28} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="56" fill="none" stroke={color} strokeWidth="0.3" opacity="0.6" />
      </Motion.svg>
    </div>
  );
};

/* ── SoundWave — a living raga ribbon on canvas ──────────────────────────── */
/**
 * Three superimposed harmonics drifting out of phase — the sound of the page,
 * drawn. Same lifecycle discipline as ParticleField (pauses offscreen/hidden).
 */
export const SoundWave = ({ colors = ["#E8B84D"], height = 120, amplitude = 22, className = "" }) => {
  const ref = useRef(null);
  const still = useReducedMotion();

  useEffect(() => {
    if (still) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf = 0, running = false, w = 0, h = 0, t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const tick = () => {
      t += 0.012;
      ctx.clearRect(0, 0, w, h);
      colors.forEach((c, k) => {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const y =
            h / 2 +
            Math.sin(x * 0.008 + t * (1 + k * 0.35)) * amplitude * 0.6 +
            Math.sin(x * 0.021 - t * 1.4 + k) * amplitude * 0.3 +
            Math.sin(x * 0.004 + t * 0.6 + k * 2) * amplitude * 0.4;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = c;
        ctx.globalAlpha = 0.55 - k * 0.12;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    const start = () => { if (!running) { running = true; raf = requestAnimationFrame(tick); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", resize);
    return () => {
      stop(); io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", resize);
    };
  }, [colors, amplitude, still]);

  if (still) return null;
  return (
    <canvas
      ref={ref}
      className={`pointer-events-none w-full ${className}`}
      style={{ height }}
      aria-hidden="true"
    />
  );
};

/* ── KolamKnot — a kolam that draws itself, then breathes ────────────────── */
export const KolamKnot = ({ color = "#E8B84D", size = 220, className = "", delay = 0 }) => {
  const still = useReducedMotion();
  return (
    <div className={`pointer-events-none absolute ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {[30, 50, 70].map((cx) =>
          [30, 50, 70].map((cy) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.9" fill={color} opacity="0.55" />
          )),
        )}
        <Motion.path
          d="M30 10 C 55 10, 45 30, 70 30 S 90 55, 70 70 S 45 90, 30 70 S 10 45, 30 30 S 55 50, 50 50
             C 45 50, 45 45, 50 45 S 55 50, 50 50"
          fill="none"
          stroke={color}
          strokeWidth="0.9"
          strokeLinecap="round"
          initial={still ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.8 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 2.6, delay, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

export { gsap, ScrollTrigger };

#!/usr/bin/env node
/**
 * Emits the Saptham brand asset set from the single geometry source.
 *
 *   node scripts/build-brand.mjs
 *
 * SVG always; PNG raster assets when `sharp` is installed. Browser favicons
 * are derived from the same official lockup imported by the navbar.
 */
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  VIEWBOX,
  S_PATH,
  STRING,
  DANCER,
  fanBlades,
  GOLD,
  INK,
  IVORY,
  paletteFor,
} from "../src/lib/brand/geometry.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "public/brand");
const officialLogo = resolve(root, "src/assets/logo-gold.png");
mkdirSync(outDir, { recursive: true });

const BLADES = fanBlades();

/**
 * @param {object} o
 * @param {string} o.variant
 * @param {"full"|"simple"} [o.detail]
 * @param {string|null} [o.bg]      solid background (icons need one; logos don't)
 * @param {number} [o.pad]          inset the mark, for maskable icon safe-area
 */
function renderSvg({ variant, detail = "full", bg = null, pad = 0 }) {
  const c = paletteFor(variant);
  const gid = "saptham-gold";
  const fill = c.s === "url(#saptham-gold)" ? `url(#${gid})` : c.s;
  const fanFill = c.fan === "url(#saptham-gold)" ? `url(#${gid})` : c.fan;
  const mono = variant === "mono";
  // currentColor is meaningless in a standalone file — resolve it to ink.
  const R = (v) => (v === "currentColor" ? INK : v);

  const scale = (VIEWBOX - pad * 2) / VIEWBOX;
  const open = pad
    ? `<g transform="translate(${pad} ${pad}) scale(${scale.toFixed(4)})">`
    : "";
  const close = pad ? "</g>" : "";

  const defs =
    variant === "primary"
      ? `<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0.35" y2="1">` +
        `<stop offset="0%" stop-color="${GOLD.hi}"/>` +
        `<stop offset="45%" stop-color="${GOLD.mid}"/>` +
        `<stop offset="100%" stop-color="${GOLD.lo}"/>` +
        `</linearGradient></defs>`
      : "";

  const fan =
    detail === "full"
      ? BLADES.map(
          (b) =>
            `<line x1="${b.x1}" y1="${b.y1}" x2="${b.x2}" y2="${b.y2}" ` +
            `stroke="${R(fanFill)}" stroke-width="${b.width}" stroke-linecap="round" opacity="0.9"/>`,
        ).join("")
      : "";

  const dancer =
    detail === "full"
      ? `<g fill="none" stroke="${R(c.dancer)}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round">` +
        `<circle cx="${DANCER.head.cx}" cy="${DANCER.head.cy}" r="${DANCER.head.r}" fill="${R(c.dancer)}" stroke="none"/>` +
        `<path d="${DANCER.arm}"/>` +
        `<path d="${DANCER.torso}"/>` +
        `<path d="${DANCER.skirt}" fill="${R(c.dancer)}" fill-opacity="0.92" stroke="none"/>` +
        `</g>`
      : "";

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEWBOX} ${VIEWBOX}" width="${VIEWBOX}" height="${VIEWBOX}">` +
    `<title>Saptham</title>` +
    defs +
    (bg ? `<rect width="${VIEWBOX}" height="${VIEWBOX}" fill="${bg}"/>` : "") +
    open +
    fan +
    `<line x1="${STRING.x}" y1="${STRING.y1}" x2="${STRING.x}" y2="${STRING.y2}" ` +
    `stroke="${R(c.string)}" stroke-width="3" stroke-linecap="round" opacity="0.85"/>` +
    `<path d="${S_PATH}" fill="${R(fill)}"/>` +
    dancer +
    close +
    `</svg>` +
    (mono ? "" : "")
  );
}

const TARGETS = [
  ["saptham-primary.svg", { variant: "primary" }],
  ["saptham-gold.svg", { variant: "gold" }],
  ["saptham-mono.svg", { variant: "mono" }],
  ["saptham-light.svg", { variant: "light" }],
  ["saptham-dark.svg", { variant: "dark" }],
  // PWA icon needs an opaque ground, and 10% inset for Android's maskable crop
  ["icon-maskable.svg", { variant: "primary", bg: INK, pad: 52 }],
  ["icon.svg", { variant: "primary", bg: INK, pad: 24 }],
];

for (const [name, opts] of TARGETS) {
  writeFileSync(resolve(outDir, name), renderSvg(opts), "utf8");
  console.log("  ·", `public/brand/${name}`);
}

// ── raster ────────────────────────────────────────────────────────────────
let sharp;
try {
  ({ default: sharp } = await import("sharp"));
} catch {
  console.log(
    "\n  sharp not installed — skipped PNG raster.\n" +
      "  Run `npm i -D sharp` then re-run to emit favicon/apple-touch/PWA PNGs.",
  );
}

if (sharp) {
  const raster = [
    // Browser tabs use the exact official gold lockup shown in the navbar.
    ["favicon-16.png", officialLogo, 16, true],
    ["favicon-32.png", officialLogo, 32, true],
    ["favicon-48.png", officialLogo, 48, true],
    ["apple-touch-icon.png", resolve(outDir, "icon.svg"), 180],
    ["icon-192.png", resolve(outDir, "icon.svg"), 192],
    ["icon-512.png", resolve(outDir, "icon.svg"), 512],
    ["icon-maskable-512.png", resolve(outDir, "icon-maskable.svg"), 512],
    ["og-mark.png", resolve(outDir, "saptham-primary.svg"), 600],
  ];
  for (const [out, src, px, trim = false] of raster) {
    let image = sharp(src, { density: 600 });
    if (trim) {
      image = image.trim({
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      });
    }
    await image
      .resize(px, px, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(resolve(outDir, out));
    console.log("  ·", `public/brand/${out}`, `(${px}px)`);
  }
  if (existsSync(resolve(outDir, "favicon-32.png"))) {
    console.log("\n✓ brand assets built");
  }
}
console.log(`\n${TARGETS.length} SVG target(s) written to public/brand/`);
void IVORY;

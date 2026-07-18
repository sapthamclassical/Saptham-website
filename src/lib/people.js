/**
 * Filename-based portrait auto-mapping.
 *
 * Drop an image into src/assets/people/ named after the person — "Dhanya V.jpg",
 * "Harini Palaniyappan.webp" — and their card picks it up automatically on the next
 * build. No code changes, ever. Matching is exact on the normalized full name, so
 * "Harini.jpg" can never leak onto "Harini Palaniyappan".
 */
/**
 * Both folders are scanned: `people/` is the canonical drop, `OB/` is where the
 * original shoot landed. Scanning only `people/` silently ignored portraits that
 * were already in the repo, which looks identical to "no photo yet".
 */
const files = {
  ...import.meta.glob("../assets/people/*.{jpg,jpeg,png,webp,avif}", {
    eager: true,
    query: "?url",
    import: "default",
  }),
  ...import.meta.glob("../assets/OB/*.{jpg,jpeg,png,webp,avif}", {
    eager: true,
    query: "?url",
    import: "default",
  }),
};

/** "Varshhaa Pari" / "Varshhaa Pari.jpg" → "varshhaapari" */
export const normalizeName = (s) =>
  s
    .replace(/\.[a-z0-9]+$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

const byName = {};
for (const [path, url] of Object.entries(files)) {
  const base = path.split("/").pop();
  byName[normalizeName(base)] = url;
}

/**
 * URL of the person's portrait, or null if not yet provided.
 *
 * Resolution order:
 *   1. `explicit` as an absolute URL — a Supabase Storage public URL wins.
 *   2. `explicit` as a filename in src/assets/people/.
 *   3. the person's full name as a filename in src/assets/people/.
 */
export function getPersonImage(name, explicit) {
  if (explicit) {
    if (/^https?:\/\//i.test(explicit) || explicit.startsWith("/")) return explicit;
    const hit = byName[normalizeName(explicit)];
    if (hit) return hit;
  }
  return byName[normalizeName(name)] ?? null;
}

/** "Harini Palaniyappan" → "HP" · "Anujan" → "A" */
export function initialsOf(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Gallery image resolver — same philosophy as people.js: files are the source of truth.
 *
 * Every image under src/assets/Gallery/<Category>/ is auto-discovered at build time.
 * Add a photo to a folder → it appears in that gallery category. New folder → new category.
 * (This also fixes the old bug where "/src/assets/…" string paths 404'd in production.)
 */
const files = import.meta.glob("../assets/Gallery/**/*.{webp,jpg,jpeg,png,avif}", {
  eager: true,
  query: "?url",
  import: "default",
});

/** "PremaVaibhavam" → "Prema Vaibhavam" */
const displayName = (folder) => folder.replace(/([a-z])([A-Z])/g, "$1 $2");

const byCategory = {};
const byPath = {};

for (const [path, url] of Object.entries(files)) {
  // path: ../assets/Gallery/<Folder>/<file>
  const parts = path.split("/");
  const folder = parts[parts.length - 2];
  const file = parts[parts.length - 1];
  const cat = displayName(folder);
  (byCategory[cat] ??= []).push({ file, url });
  byPath[`${folder}/${file}`] = url;
}

// sort numerically inside each category (1.webp … 14.webp)
for (const cat of Object.keys(byCategory)) {
  byCategory[cat].sort(
    (a, b) => (parseInt(a.file) || 0) - (parseInt(b.file) || 0) || a.file.localeCompare(b.file),
  );
}

/** { "General": [url, …], "Payanam": [url, …], … } */
export const galleryData = Object.fromEntries(
  Object.entries(byCategory).map(([cat, items]) => [cat, items.map((i) => i.url)]),
);

/** Resolve "Payanam/3.webp" → bundled URL (null if missing). */
export function galleryImage(relPath) {
  return byPath[relPath] ?? null;
}

/** Preferred tab order: General first, then productions chronologically. */
export const galleryCategories = Object.keys(galleryData).sort((a, b) => {
  const order = ["General", "Payanam", "Vishwam", "Rasaleela", "Yaathra", "Prema Vaibhavam"];
  const ia = order.indexOf(a);
  const ib = order.indexOf(b);
  return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
});

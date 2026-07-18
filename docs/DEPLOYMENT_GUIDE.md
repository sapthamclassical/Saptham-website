# DEPLOYMENT_GUIDE.md — Saptham Website

## TL;DR
The project **builds successfully** (`vite build` produces `dist/` in ~10s), but it is
**NOT ready to deploy as-is** because a chunk of images will 404 in production. Fix the
three asset/routing blockers below, then deploy to **Netlify or Vercel** (recommended).

---

## Can it be deployed immediately?
**No.** The build compiles, but two categories of images are broken and SPA deep-links
need host configuration. None of these break the *build*; they break the *live site*.

## Blockers (must fix before a real deploy)

### BLOCKER 1 — Events images use raw `/src/assets/...` string paths (16 images)
- **Files:** `src/components/ProductionEvents.jsx`, `src/components/GeneralEvents.jsx`
- **Symptom:** every card on `/events` shows a broken image in production.
- **Why:** strings like `"/src/assets/Gallery/General/1.webp"` are only valid because the
  Vite **dev server** serves `/src`. In `dist/`, assets are hashed and `/src` doesn't
  exist. Verified: these literals ship verbatim inside `dist/assets/index-*.js`.
- **Fix:** `import` each image (as `Gallery.jsx` already does) and reference the imported
  variable, **or** move the images to `/public/...` and use `/`-rooted public paths.

### BLOCKER 2 — Testimonial images reference `/images/testimonials/*.jpg` but there is no `public/` folder (9 images)
- **File:** `src/components/Testimonials.jsx` (`src:` fields).
- **Symptom:** all 9 alumni photos are broken in **dev and prod**.
- **Fix:** create `public/images/testimonials/` and add the photos, **or** import them
  from `src/assets` like the other images.

### BLOCKER 3 — SPA client-side routing needs host rewrites
- `/events`, `/gallery`, `/contact` are handled by React Router in the browser. A direct
  visit or refresh on those URLs must serve `index.html`, or the host returns 404.
- **Fix per platform:**
  - **Netlify:** add `public/_redirects` with `/*  /index.html  200`.
  - **Vercel:** add `vercel.json` with a catch-all rewrite to `/index.html`.
  - **GitHub Pages:** needs a `404.html` copy of `index.html` hack (not recommended).

## Strongly recommended before deploy (not hard blockers)
- **Optimize images.** ~21 MB of assets, including a single **6.3 MB** `ashwin.jpg` and a
  **2.5 MB** `ahalya.webp`. Compress/resize to display size (≤200–300 KB each).
- Remove **dead deps** (`swiper`, `@emailjs/browser`) and one redundant icon library.
- Add SEO `<meta>` description + Open Graph tags (currently none).
- Confirm **Formspree** dashboard access transfers to the new maintainer.

## Missing pieces checklist
| Item | Status |
|------|--------|
| Environment variables | **None needed** (no secrets in code) |
| Secrets / API keys | None present, none required |
| Backend / database | Not applicable (static SPA) |
| Missing assets | **Yes** — testimonial photos absent; event images mis-referenced |
| Build output | Produced correctly (`dist/`) |
| Broken imports | None at module level; broken **string** asset paths only |
| Outdated packages | None critical; all modern (React 19, Vite 6, Tailwind 4) |
| Incompatible versions | None found; installs and builds clean on Node 24 |

---

## Platform comparison

| Platform | Fit | Why |
|----------|-----|-----|
| **Netlify** ⭐ | **Best** | Zero-config Vite deploy, free tier, instant `_redirects` for SPA routing, form-handling as a bonus, custom domain + auto HTTPS. Ideal for a club with no ops team. |
| **Vercel** ⭐ | **Best (tie)** | Equally trivial for Vite SPAs; `vercel.json` rewrite for routing; great DX, previews per PR. Pick this if you may add serverless functions later. |
| Cloudflare Pages | Great | Free, fast global CDN, SPA fallback setting. Excellent alternative. |
| Render | Good | Static-site hosting works, but heavier than needed for a pure SPA. |
| Railway | Overkill | Aimed at services/DBs; you'd pay/point for capabilities this static site never uses. |
| Firebase Hosting | Good | Solid CDN + easy `firebase.json` rewrite, but more setup than Netlify/Vercel. |
| **GitHub Pages** | Usable, not ideal | Free and Git-native, but SPA deep-link routing needs the `404.html` hack, and you must set Vite `base` to the repo path unless using a custom domain. Fine for a quick free demo. |
| Docker | Unnecessary | You'd wrap `nginx` around `dist/`. Adds ops burden with no benefit for a static site. |
| VPS | Worst fit | Manual nginx/HTTPS/patching. Do not run a student club site on a VPS. |

### Recommendation
**Netlify** (or Vercel). Rationale: this is a static Vite SPA maintained by rotating
student volunteers — the winning platform is the one with **zero servers to babysit**,
a **free tier**, **one-line SPA routing config**, **automatic HTTPS**, and
**git-push-to-deploy**. Netlify and Vercel both deliver all of that; Netlify edges ahead
for a non-technical maintainer because `_redirects` and form handling are the simplest.

---

## Step-by-step deploy (Netlify, after fixing blockers)
1. Fix Blockers 1 & 2 (import images / add `public/images/...`).
2. Add `public/_redirects` containing: `/*    /index.html   200`
3. Push to GitHub.
4. Netlify → "Add new site" → "Import from Git" → pick the repo.
5. Build command: `npm run build` — Publish directory: `dist`.
6. Deploy. Add a custom domain + enable HTTPS (automatic).
7. Verify `/events`, `/gallery`, `/contact` load on **direct URL and refresh**.
8. Submit the contact form once and confirm the email arrives via Formspree.

## Build facts (verified)
- Node 24.13, npm 11.8, `npm install` → 178 packages, `npm run build` → success in ~10s.
- Output: `dist/index.html` + hashed `dist/assets/*` (JS 380 KB / 123 KB gzip, CSS 59 KB / 11 KB gzip, plus ~21 MB images).

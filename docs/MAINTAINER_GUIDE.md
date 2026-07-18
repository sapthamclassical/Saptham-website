# MAINTAINER_GUIDE.md — Saptham Website

Written for the incoming **Secretary of Saptham** taking ownership of this site. You do
**not** need deep React experience to keep it running — most edits are copy/paste changes
to plain data lists.

## 1. What you're inheriting
A static React website (no server, no database). Content is hard-coded in component files.
To change text or images you edit a file and redeploy. There is nothing to "run" in
production — the host just serves pre-built files.

## 2. One-time setup
1. Install **Node.js 20+** (developed/verified on Node 24) from nodejs.org.
2. Get the code: `git clone <repo-url>` then `cd Saptham-website`.
3. Install dependencies: `npm install`.
4. Start dev server: `npm run dev` → open the shown `localhost` URL. Edits hot-reload.

## 3. Everyday commands
| Command | What it does |
|---------|--------------|
| `npm run dev` | Local preview with live reload (use while editing) |
| `npm run build` | Produce the deployable `dist/` folder |
| `npm run preview` | Serve the built `dist/` locally to sanity-check before deploy |
| `npm run lint` | Check code style / catch mistakes |

## 4. How to edit common content (no framework knowledge needed)

**Office bearers** → `src/components/OfficeBearers.jsx`
- Edit the `officers` array (name, dept, position). Add/remove `{ ... }` entries.

**Events** → `src/components/ProductionEvents.jsx` (annual productions) and
`src/components/GeneralEvents.jsx` (other performances)
- Edit the arrays. ⚠️ **Important:** image paths here currently use a broken format
  (`"/src/assets/..."`). The correct pattern is to `import` the image at the top of the
  file and use the variable — copy how `src/components/Gallery.jsx` imports images.

**Gallery photos** → `src/components/Gallery.jsx`
- Add the image file under `src/assets/Gallery/<Category>/`, add an `import`, then add the
  imported variable to the right array in `galleryData`.

**Alumni testimonials** → `src/components/Testimonials.jsx`
- Edit the `testimonials` array. ⚠️ The `src` fields point to `/images/testimonials/*.jpg`
  which **do not exist yet** — add those photos under `public/images/testimonials/` (create
  the folder) or switch to imports.

**Contact details / social links** → `src/components/ContactUs.jsx` and
`src/components/Footer.jsx` (emails, phone numbers, Instagram/YouTube/Facebook URLs, map).

## 5. The contact form (Formspree)
- Submissions go to **Formspree form `mojwgvjb`** and are emailed to the club inbox.
- You need **access to the Formspree account** to see/manage submissions and quotas.
  Ask the outgoing maintainer to add you or hand over the login. This is **outside the repo**.
- To change where emails go, update the Formspree form settings (or create a new form and
  replace the ID in `ContactUs.jsx`).

## 6. Deploying an update
1. Make your edits, run `npm run dev` to check locally.
2. Commit and push to GitHub.
3. If the site is on **Netlify/Vercel** connected to the repo, the push auto-deploys.
   Otherwise: run `npm run build` and upload `dist/` per DEPLOYMENT_GUIDE.md.
4. After deploy, **click through `/`, `/events`, `/gallery`, `/contact`** and refresh each
   to confirm nothing is broken.

## 7. Known issues to fix (see IMPROVEMENT_ROADMAP.md for full list)
- **Events & testimonial images are broken in production** — fix before relying on the live
  site (Blockers 1 & 2 in DEPLOYMENT_GUIDE.md).
- **Images are huge** (one is 6.3 MB) — compress before adding more, or the site will be slow.
- **"Join Us" button does nothing** — wire it to a form or your Instagram.
- **Duplicate HTML id** on the testimonials section — harmless but invalid.
- **Deep links need host rewrite config** — otherwise refreshing `/events` shows a 404.

## 8. Where to read more
- `docs/ARCHITECTURE.md` — how the app is wired.
- `docs/PROJECT_STRUCTURE.md` — every file and folder explained.
- `docs/COMPONENT_TREE.md` — component map and props.
- `docs/DEPLOYMENT_GUIDE.md` — step-by-step deploy + platform choice.
- `docs/SECURITY_REPORT.md` / `docs/PERFORMANCE_REPORT.md` — audits.
- `docs/IMPROVEMENT_ROADMAP.md` — prioritized upgrade plan.

## 9. Getting help
This is a small, standard **Vite + React + Tailwind** app. Any React tutorial applies, and
the codebase is small enough (~15 components) to read end-to-end in an afternoon. When in
doubt, mimic an existing component that already does what you want (e.g. copy how
`Gallery.jsx` handles images).

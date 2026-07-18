# PROJECT_STRUCTURE.md — Saptham Website

## Repository tree (source, excludes node_modules/dist/.git)

```
Saptham-website/
├── index.html                 # Vite HTML entry; mounts #root, loads /src/main.jsx
├── package.json               # Scripts + dependencies (ESM, "type":"module")
├── package-lock.json          # npm lockfile (npm is the package manager)
├── vite.config.js             # Vite + @vitejs/plugin-react + @tailwindcss/vite
├── tailwind.config.js         # LEGACY CommonJS config — vestigial under Tailwind v4
├── eslint.config.js           # Flat ESLint config (JS + react-hooks + react-refresh)
├── .gitignore                 # node_modules, dist, logs, editor dirs
├── README.md                  # Default Vite template readme (not project-specific)
├── TODO.md                    # Notes on the contact-form (mentions Formspree)
├── lib/
│   └── utils.jsx              # cn() = twMerge(clsx(...)) — currently unused by app
└── src/
    ├── main.jsx               # createRoot → StrictMode → BrowserRouter → App
    ├── App.jsx                # App shell + <Routes>
    ├── App.css                # @import "tailwindcss"; @plugin "daisyui";  (ACTIVE)
    ├── index.css              # EMPTY / unused (not imported anywhere)
    ├── assets/
    │   ├── logo.png
    │   ├── OB/                # 13 office-bearer portraits (mixed jpg/png/webp/jpeg)
    │   └── Gallery/
    │       ├── General/       # 14 .webp
    │       ├── Payanam/       # 7 .webp
    │       ├── PremaVaibhavam/# 6 .webp
    │       ├── Rasaleela/     # 10 .webp
    │       ├── Vishwam/       # 8 .jpeg
    │       └── Yaathra/       # 8 .webp
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── Vision.jsx
        ├── OfficeBearers.jsx
        ├── Testimonials.jsx
        ├── ContactUs.jsx
        ├── Events.jsx            # wrapper: ProductionEvents + GeneralEvents
        ├── ProductionEvents.jsx  # 4 annual productions
        ├── GeneralEvents.jsx     # 6 general performances
        ├── EventCard.jsx         # shared card used by both event lists
        ├── Gallery.jsx           # tabbed grid + lightbox modal
        ├── GalleryCarousel.jsx   # daisyUI carousel (alternate gallery view)
        ├── Footer.jsx
        └── ui/
            └── animated-testimonials.jsx  # Framer-Motion testimonial carousel
```

## File-count summary
- Components: **15** (13 in `components/`, 1 in `components/ui/`, plus `App.jsx`)
- Utility modules: **1** (`lib/utils.jsx`)
- Config files: **5** (`vite`, `tailwind`, `eslint`, `package.json`, `index.html`)
- Static assets: **~57 images** (~21 MB total)

## Entry points
1. **`index.html`** — served by Vite/host; contains `#root` and `<script src="/src/main.jsx">`.
2. **`src/main.jsx`** — React bootstrap + `BrowserRouter`.
3. **`src/App.jsx`** — route table and persistent layout.

## npm scripts (`package.json`)
| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `vite` | Local dev server with HMR |
| `build` | `vite build` | Production build → `dist/` |
| `preview` | `vite preview` | Serve the built `dist/` locally |
| `lint` | `eslint .` | Lint all JS/JSX |

## Notable structural issues
- **`index.css` is empty and unused** — `main.jsx` imports `App.css`, not `index.css`.
- **`tailwind.config.js` uses `module.exports`/`require`** inside an ESM package; under
  Tailwind v4 + the Vite plugin it is not the source of truth (config lives in CSS).
- **`lib/` sits outside `src/`** and its `cn()` helper is not referenced by any component.
- **Assets live under `src/assets`** (import-based) — correct for imported images, but the
  Events components bypass this and use raw string paths (see SECURITY/DEPLOYMENT reports).

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Preserve function/class names through minification. Motion resolves which
  // animation driver to use partly by constructor/function identity; esbuild's
  // default name-mangling breaks that resolution, so declarative animate/
  // whileInView keyframes silently no-op in the production build (dead ambient
  // animation on the deployed site) while the unminified dev build works.
  esbuild: {
    keepNames: true,
  },
  // Single copy of React and Motion — Motion's frame loop is a module-level
  // singleton; a duplicated instance would leave animations on a dead loop.
  resolve: {
    dedupe: ["react", "react-dom", "motion", "motion-dom", "motion-utils"],
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        /**
         * Long-lived vendor chunks. App code changes weekly; React, Motion and
         * supabase-js change on npm updates only — splitting them means a
         * returning visitor's browser cache survives every content deploy.
         */
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["motion"],
          supabase: ["@supabase/supabase-js"],
        },
      },
    },
  },
});

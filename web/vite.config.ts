import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The presentation lives in web/ but consumes assets (logo, fonts) from the
// repository-level assets/ folder, so allow the dev server to read it.
export default defineConfig({
  plugins: [react()],
  server: {
    fs: { allow: [".."] },
  },
  build: {
    // Keep woff2 font files as files instead of base64 inlining
    assetsInlineLimit: 0,
  },
});
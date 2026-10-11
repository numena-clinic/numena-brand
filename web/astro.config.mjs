import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

// The presentation lives in web/ but reads its content from the repository's
// brand/ documents and manifest.json, and consumes assets (logo, fonts) from
// the repository-level assets/ folder — so the dev server may read above web/.
export default defineConfig({
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
    server: { fs: { allow: [".."] } },
    build: { assetsInlineLimit: 0 },
  },
});

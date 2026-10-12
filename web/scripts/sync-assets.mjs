import { cp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The docs reference repository assets with relative paths (../../assets/...).
// On a doc page at /{section}/{slug} those resolve to /assets/..., so the site
// serves a copy of the assets under public/assets. Fonts are deliberately
// excluded: they are commercially licensed and must not be published.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const from = resolve(root, "assets");
const to = resolve(root, "web/public/assets");

const dirs = ["logo", "typography", "illustrations", "images"].filter((dir) =>
  existsSync(resolve(from, dir)),
);

await rm(to, { recursive: true, force: true });
for (const dir of dirs) {
  await cp(resolve(from, dir), resolve(to, dir), { recursive: true });
}

console.log(`[sync-assets] copied ${dirs.join(", ")} → web/public/assets`);

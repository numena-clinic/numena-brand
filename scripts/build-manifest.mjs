#!/usr/bin/env node
// Validates front matter, the dependency graph, and internal links across the
// brand documents, then regenerates manifest.json from them. No dependencies.
//   node scripts/build-manifest.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BRAND = join(ROOT, "brand");

const REQUIRED = ["title", "status", "summary"];
const STATUSES = ["draft", "in-review", "approved"];
const GENERATED = new Set(["manifest.json"]);

const errors = [];

function parseFrontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, raw] = kv;
    const value = raw.trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      data[key] = value.replace(/^["']|["']$/g, "");
    }
  }
  return data;
}

if (!existsSync(BRAND)) {
  console.error("brand/ directory is missing");
  process.exit(1);
}

const documents = [];
for (const file of readdirSync(BRAND).filter((f) => f.endsWith(".md"))) {
  const id = basename(file, ".md");
  const path = `brand/${file}`;
  const fm = parseFrontmatter(readFileSync(join(BRAND, file), "utf8"));
  if (!fm) {
    errors.push(`${path}: missing front matter`);
    continue;
  }
  for (const key of REQUIRED) if (!fm[key]) errors.push(`${path}: missing "${key}"`);
  if (fm.status && !STATUSES.includes(fm.status)) errors.push(`${path}: invalid status "${fm.status}"`);
  documents.push({
    id,
    path,
    title: fm.title,
    status: fm.status,
    summary: fm.summary,
    dependsOn: Array.isArray(fm.dependsOn) ? fm.dependsOn : [],
    informs: Array.isArray(fm.informs) ? fm.informs : [],
  });
}

const ids = new Set(documents.map((d) => d.id));
const consumers = new Set();

for (const d of documents) {
  for (const dep of d.dependsOn) {
    if (!ids.has(dep)) errors.push(`${d.path}: dependsOn "${dep}" is not a brand document`);
    if (dep === d.id) errors.push(`${d.path}: depends on itself`);
  }
  for (const target of d.informs) {
    if (!ids.has(target)) consumers.add(target);
  }
}

// Cycle detection over dependsOn.
const state = new Map();
function visit(id, trail) {
  if (state.get(id) === "done") return;
  if (state.get(id) === "visiting") {
    errors.push(`dependency cycle: ${[...trail, id].join(" -> ")}`);
    return;
  }
  state.set(id, "visiting");
  const doc = documents.find((d) => d.id === id);
  for (const dep of doc.dependsOn) if (ids.has(dep)) visit(dep, [...trail, id]);
  state.set(id, "done");
}
for (const d of documents) visit(d.id, []);

// Reading order: dependencies before dependents, then alphabetical.
const order = [];
const placed = new Set();
function place(id) {
  if (placed.has(id)) return;
  placed.add(id);
  const doc = documents.find((d) => d.id === id);
  for (const dep of doc.dependsOn) if (ids.has(dep)) place(dep);
  order.push(id);
}
for (const id of [...ids].sort()) place(id);
const sorted = order.map((id) => documents.find((d) => d.id === id));

// Internal link check across the repo (skip generated, vendored, asset dirs).
function markdownFiles(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    if (["node_modules", "dist", "web", "assets", "scripts"].includes(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) markdownFiles(full, out);
    else if (entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

for (const full of markdownFiles(ROOT)) {
  const rel = full.slice(ROOT.length + 1);
  const src = readFileSync(full, "utf8");
  for (const m of src.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = m[1].trim().split("#")[0].trim();
    if (!target || /^(?:[a-z][a-z0-9+.-]*:|\/|#)/i.test(target)) continue;
    if (GENERATED.has(basename(target))) continue;
    if (!existsSync(resolve(dirname(full), target))) errors.push(`${rel}: broken link -> ${m[1].trim()}`);
  }
}

const manifest = {
  name: "Numena: Brand",
  description:
    "The brand identity, voice, and visual system for Numena — written as a small set of Markdown documents with an explicit dependency graph.",
  generator: "scripts/build-manifest.mjs",
  conventions: {
    layout: "Flat brand/ directory; each document is one file.",
    frontMatter: ["title", "status", "summary", "dependsOn", "informs"],
    status: STATUSES,
    readingOrder: "Documents sorted so every dependency is read before the document that needs it.",
    authority: "Each decision has one authoritative document; summaries never override their sources.",
  },
  documents: sorted.map((d) => ({
    id: d.id,
    path: d.path,
    title: d.title,
    status: d.status,
    summary: d.summary,
    dependsOn: d.dependsOn,
    informs: d.informs,
  })),
  consumers: [...consumers].sort(),
};

if (errors.length) {
  console.error(`\n${errors.length} error(s) found:\n`);
  for (const e of errors) console.error("  ! " + e);
  process.exit(1);
}

writeFileSync(join(ROOT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`manifest.json written: ${documents.length} documents.`);
console.log(`Reading order: ${order.join(" -> ")}`);
if (consumers.size) console.log(`External consumers: ${[...consumers].join(", ")}`);
console.log("Front matter, dependency graph, and internal links valid.");

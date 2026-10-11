#!/usr/bin/env node
// Validates front matter and internal links across the brand documents,
// then regenerates manifest.json from them. No dependencies; run with:
//   node scripts/build-manifest.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const SECTIONS = [
  { id: "01-strategy", title: "Strategy" },
  { id: "02-meaning", title: "Meaning" },
  { id: "03-character", title: "Character" },
  { id: "04-visual-semantics", title: "Visual semantics" },
  { id: "05-visual-system", title: "Visual system" },
];

const REQUIRED = ["title", "section", "order", "status", "summary"];
const STATUSES = ["stub", "draft", "in-review", "approved"];
const GENERATED = new Set(["manifest.json"]);

const errors = [];

function parseFrontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, "");
  }
  return data;
}

const sections = [];

for (const { id, title } of SECTIONS) {
  const dir = join(ROOT, id);
  if (!existsSync(dir)) {
    errors.push(`${id}: section directory is missing`);
    continue;
  }
  const documents = [];
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".md") && f !== "README.md")) {
    const path = `${id}/${file}`;
    const fm = parseFrontmatter(readFileSync(join(ROOT, path), "utf8"));
    if (!fm) {
      errors.push(`${path}: missing front matter`);
      continue;
    }
    for (const key of REQUIRED) if (!fm[key]) errors.push(`${path}: missing "${key}"`);
    if (fm.section && fm.section !== id) errors.push(`${path}: section "${fm.section}" does not match "${id}"`);
    if (fm.status && !STATUSES.includes(fm.status)) errors.push(`${path}: invalid status "${fm.status}"`);
    const order = Number(fm.order);
    if (!Number.isInteger(order)) errors.push(`${path}: order must be an integer`);
    documents.push({ path, title: fm.title, order, status: fm.status, summary: fm.summary });
  }
  documents.sort((a, b) => a.order - b.order);
  const seen = new Set();
  for (const d of documents) {
    if (seen.has(d.order)) errors.push(`${d.path}: duplicate order ${d.order}`);
    seen.add(d.order);
  }
  sections.push({ id, title, readme: `${id}/README.md`, documents });
}

// Internal link check across the whole repo (skip generated, vendored, asset dirs).
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
    "The brand identity, voice, and design system for Numena: a workspace for psychologists to connect observations, hypotheses, evidence, and decisions, with every conclusion traceable.",
  generator: "scripts/build-manifest.mjs",
  conventions: {
    layout: "Five numbered top-level sections, read in order.",
    frontMatter: REQUIRED,
    status: STATUSES,
    readmes: "Each section README lists its documents in reading order.",
  },
  sections,
};

const total = sections.reduce((n, s) => n + s.documents.length, 0);

if (errors.length) {
  console.error(`\n${errors.length} error(s) found:\n`);
  for (const e of errors) console.error("  ! " + e);
  process.exit(1);
}

writeFileSync(join(ROOT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`manifest.json written: ${sections.length} sections, ${total} documents.`);
console.log("Front matter and internal links valid.");

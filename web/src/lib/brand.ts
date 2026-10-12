import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, join, basename, posix } from "node:path";
import { marked } from "marked";

// The repository root, one level above web/. docs/ is the source of truth;
// this module only reads it.
const root = resolve(process.cwd(), "..");
const docsDir = resolve(root, "docs");

export interface DocItem {
  sectionId: string;
  sectionName: string;
  slug: string;
  path: string;
  title: string;
  html: string;
}

export interface Section {
  id: string;
  name: string;
  items: DocItem[];
}

function titleize(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// Drop the YAML front matter block; it is optional and not shown in the body.
function stripFrontMatter(markdown: string): string {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
}

function frontmatter(markdown: string): Record<string, string> {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim();
  }
  return data;
}

// Docs cross-link each other with relative .md paths (e.g. `./typography.md`,
// `../brand-strategy/positioning.md`). Resolve them against the current
// document's section and rewrite to the site's document route.
function rewriteDocLinks(html: string, sectionId: string): string {
  return html.replace(/href="([^"]*?\.md)(#[^"]*)?"/gi, (match, path, hash = "") => {
    if (/^[a-z]+:\/\//i.test(path)) return match;
    const route = posix.normalize(posix.join("/", sectionId, path)).replace(/^\/+/, "").replace(/\.md$/i, "");
    return `href="/${route}${hash}"`;
  });
}

// The color document presents the palette as plain tables so the Markdown stays
// clean and renders anywhere. On the site we turn those tables into swatch
// cards for a more visual palette. Only tables whose header is Color | HEX |
// Role are converted; every other table is left untouched.
function enhanceColorTables(html: string): string {
  return html.replace(/<table>[\s\S]*?<\/table>/g, (table) => {
    if (!/<th[^>]*>\s*HEX\s*<\/th>/i.test(table)) return table;
    const rows = [...table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((m) => m[1]);
    const cards = rows
      .slice(1)
      .map((row) => {
        const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) =>
          m[1].trim(),
        );
        const [name, hex, role] = cells;
        const value = hex.replace(/<\/?code>/g, "").trim();
        return [
          '<div class="swatch">',
          `  <div class="swatch-color" style="background:${value}"></div>`,
          '  <div class="swatch-body">',
          `    <span class="swatch-name">${name}</span>`,
          `    <span class="swatch-hex">${value}</span>`,
          `    <span class="swatch-role">${role}</span>`,
          "  </div>",
          "</div>",
        ].join("\n");
      })
      .join("\n");
    return `<div class="swatch-grid">\n${cards}\n</div>`;
  });
}

// Several images written on consecutive lines (no blank line between them) form
// one Markdown paragraph. On the site, such a paragraph becomes a bento gallery;
// a lone image — or a pair kept inline on one line, e.g. an example beside a
// marker — stays a normal inline figure.
function enhanceImageGroups(html: string): string {
  return html.replace(/<p>((?:\s*<img\b[^>]*>\s*)+)<\/p>/g, (match, inner) => {
    const images = inner.match(/<img\b[^>]*>/g);
    if (!images || images.length < 2 || !/\n\s*<img/.test(inner)) return match;
    return `<div class="bento">${images.join("")}</div>`;
  });
}

function render(markdown: string, sectionId = ""): string {
  const html = marked.parse(stripFrontMatter(markdown), { async: false }) as string;
  return enhanceImageGroups(
    enhanceColorTables(sectionId ? rewriteDocLinks(html, sectionId) : html),
  );
}

function sectionDirs(): string[] {
  if (!existsSync(docsDir)) return [];
  return readdirSync(docsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .sort();
}

export function getSections(): Section[] {
  return sectionDirs().map((id) => {
    const items: DocItem[] = readdirSync(join(docsDir, id))
      .filter((file) => file.endsWith(".md") && file.toLowerCase() !== "readme.md")
      .sort()
      .map((file) => {
        const markdown = readFileSync(join(docsDir, id, file), "utf8");
        const fm = frontmatter(markdown);
        const slug = basename(file, ".md");
        return {
          sectionId: id,
          sectionName: titleize(id),
          slug,
          path: `${id}/${slug}`,
          title: fm.title || titleize(slug),
          html: render(markdown, id),
        };
      });
    return { id, name: titleize(id), items };
  });
}

export function getDocs(): DocItem[] {
  return getSections().flatMap((section) => section.items);
}

export function getDoc(path: string): DocItem | undefined {
  return getDocs().find((doc) => doc.path === path);
}

export interface FlatDoc {
  path: string;
  title: string;
  sectionId: string;
  sectionName: string;
}

// Documents in reading order across sections, for prev/next navigation.
export function getFlatDocs(): FlatDoc[] {
  return getSections().flatMap((section) =>
    section.items.map((doc) => ({
      path: doc.path,
      title: doc.title,
      sectionId: section.id,
      sectionName: section.name,
    })),
  );
}

export interface Swatch {
  name: string;
  hex: string;
  role: string;
  group: string;
}

// Read the palette straight from docs/visual-identity/color.md so the landing
// page never restates the colours — the document stays the single source.
export function getPalette(): Swatch[] {
  const file = resolve(docsDir, "visual-identity", "color.md");
  if (!existsSync(file)) return [];
  const swatches: Swatch[] = [];
  let group = "";
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const heading = line.match(/^###\s+(.+?)\s*$/);
    if (heading) group = heading[1];
    const row = line.match(
      /^\|\s*([^|]+?)\s*\|\s*`?(#[0-9A-Fa-f]{3,8})`?\s*\|\s*([^|]+?)\s*\|\s*$/,
    );
    if (row) {
      swatches.push({ name: row[1], hex: row[2], role: row[3], group });
    }
  }
  return swatches;
}

// The hand-maintained manifest indexes the docs and carries a one-line summary
// per document. Used for the document cards on the landing page.
export interface ManifestDoc {
  title: string;
  href: string;
  summary?: string;
}

export interface ManifestArea {
  id: string;
  title: string;
  role?: string;
  documents: ManifestDoc[];
}

export function getManifest(): ManifestArea[] {
  const file = resolve(root, "manifest.json");
  if (!existsSync(file)) return [];
  try {
    const data = JSON.parse(readFileSync(file, "utf8"));
    return (data.areas ?? []).map(
      (area: {
        id: string;
        title: string;
        role?: string;
        documents?: { title: string; path: string; summary?: string }[];
      }) => ({
        id: area.id,
        title: area.title,
        role: area.role,
        documents: (area.documents ?? []).map((doc) => ({
          title: doc.title,
          href: `/${String(doc.path)
            .replace(/^docs\//, "")
            .replace(/\.md$/i, "")}`,
          summary: doc.summary,
        })),
      }),
    );
  } catch {
    return [];
  }
}

// A section's own README is its landing page (e.g. /brand-strategy/), rendered
// the same way as a document but with links resolved against the section.
export interface SectionIndex {
  id: string;
  name: string;
  html: string;
}

export function getSectionIndex(sectionId: string): SectionIndex | undefined {
  const readme = resolve(docsDir, sectionId, "README.md");
  if (!existsSync(readme)) return undefined;
  return {
    id: sectionId,
    name: titleize(sectionId),
    html: render(readFileSync(readme, "utf8"), sectionId),
  };
}

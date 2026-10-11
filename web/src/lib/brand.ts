import { readFileSync, readdirSync } from "node:fs";
import { resolve, basename, join } from "node:path";
import { marked } from "marked";

// The repository root, one level above web/. brand/ documents, BRAND.md and
// manifest.json are the single source of truth; this module only reads them.
const root = resolve(process.cwd(), "..");
const brandDir = resolve(root, "brand");

export interface BrandDoc {
  id: string;
  path: string;
  title: string;
  status: "draft" | "in-review" | "approved";
  summary: string;
  dependsOn: string[];
  informs: string[];
  html: string;
}

interface Manifest {
  name: string;
  description: string;
  documents: Array<Omit<BrandDoc, "html">>;
}

function readManifest(): Manifest {
  return JSON.parse(readFileSync(resolve(root, "manifest.json"), "utf8")) as Manifest;
}

// Locate every document by its id, wherever it sits under brand/ — the folder
// layout is free to change; the manifest stays the index.
function docFileIndex(): Map<string, string> {
  const index = new Map<string, string>();
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".md")) index.set(basename(entry.name, ".md"), full);
    }
  };
  walk(brandDir);
  return index;
}

// Drop the YAML front matter block; the manifest already carries the metadata.
function stripFrontMatter(markdown: string): string {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
}

// The documents link to one another with relative Markdown paths (color.md,
// brand/foundation.md, ../branding/foundation.md …). Rewrite any link whose
// target is a brand document to its site route, keeping any #fragment.
function rewriteLinks(html: string, ids: Set<string>): string {
  return html.replace(/(<a\s[^>]*href=")([^"]+)(")/g, (_m, pre, href, post) => {
    if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("#")) return pre + href + post;
    const [path, fragment] = href.split("#");
    const target = basename(path.trim(), ".md");
    if (!ids.has(target)) return pre + href + post;
    return pre + `/${target}` + (fragment ? `#${fragment}` : "") + post;
  });
}

function render(markdown: string, ids: Set<string>): string {
  return rewriteLinks(marked.parse(markdown, { async: false }) as string, ids);
}

export function getDocs(): BrandDoc[] {
  const manifest = readManifest();
  const files = docFileIndex();
  const ids = new Set(manifest.documents.map((doc) => doc.id));
  return manifest.documents.map((doc) => {
    const file = files.get(doc.id);
    if (!file) throw new Error(`brand document not found for id "${doc.id}"`);
    return { ...doc, html: render(stripFrontMatter(readFileSync(file, "utf8")), ids) };
  });
}

export function getDoc(id: string): BrandDoc | undefined {
  return getDocs().find((doc) => doc.id === id);
}

export function getBrandSummaryHtml(): string {
  const ids = new Set(readManifest().documents.map((doc) => doc.id));
  const markdown = readFileSync(resolve(root, "BRAND.md"), "utf8");
  return render(stripFrontMatter(markdown), ids);
}

export function getSiteName(): string {
  return readManifest().name;
}

export interface NavItem {
  id: string;
  title: string;
  href: string;
}

export function getNav(): NavItem[] {
  return readManifest().documents.map((doc) => ({
    id: doc.id,
    title: doc.title,
    href: `/${doc.id}`,
  }));
}

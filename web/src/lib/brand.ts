import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, join, basename } from "node:path";
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

function render(markdown: string): string {
  return marked.parse(stripFrontMatter(markdown), { async: false }) as string;
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
          html: render(markdown),
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

export function getHomeHtml(): string {
  const readme = resolve(docsDir, "README.md");
  if (!existsSync(readme)) return "";
  return render(readFileSync(readme, "utf8"));
}

export function getSiteName(): string {
  return "Numena: Brand";
}

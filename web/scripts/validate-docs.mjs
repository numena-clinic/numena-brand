#!/usr/bin/env node
import { readFile, readdir } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = process.env.VALIDATE_DOCS_ROOT
  ? resolve(process.env.VALIDATE_DOCS_ROOT)
  : resolve(__dirname, '..', '..');

const docsDir = resolve(root, 'docs');
const assetsDir = resolve(root, 'assets');
const manifestPath = resolve(root, 'manifest.json');
const gitignorePath = resolve(root, '.gitignore');
const webSrcDir = resolve(root, 'web', 'src');

const REQUIRED_AREA_IDS = ['brand-strategy', 'visual-identity'];
const FONT_EXTENSIONS = ['.woff2', '.woff', '.ttf', '.otf'];
const WEB_ASSET_PATTERNS = [/["'`]\/assets\/[^"'`]+/g, /(?:\.\.\/)+assets\/[^"'`)\s]+/g];

const errors = [];
const warnings = [];
const categories = [];
let current = null;

function startCategory(name) {
  current = { name, errors: 0, warnings: 0 };
  categories.push(current);
  console.log(`\n${name}`);
}
function pass(msg) { console.log(`  ok   ${msg}`); }
function fail(msg) {
  current.errors += 1;
  errors.push(`[${current.name}] ${msg}`);
  console.error(`  FAIL ${msg}`);
}
function note(msg) {
  current.warnings += 1;
  warnings.push(`[${current.name}] ${msg}`);
  console.warn(`  WARN ${msg}`);
}

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim() !== '';
}
function isFile(p) {
  try { return statSync(p).isFile(); } catch { return false; }
}
function isDirectory(p) {
  try { return statSync(p).isDirectory(); } catch { return false; }
}
function isInside(parent, child) {
  const rel = relative(parent, child);
  return rel !== '' && !rel.startsWith('..') && !rel.startsWith(`..${sep}`) && !rel.startsWith(sep);
}

async function readText(p) {
  try { return await readFile(p, 'utf8'); } catch { return ''; }
}
async function readJson(p) {
  return JSON.parse(await readFile(p, 'utf8'));
}

async function walk(dir, filter, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (e) {
    if (current && existsSync(dir)) fail(`cannot read directory ${relative(root, dir)} — ${e.code || e.message}`);
    return out;
  }
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, filter, out);
    else if (!filter || filter(entry.name)) out.push(full);
  }
  return out;
}

function stripCode(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/~~~[\s\S]*?~~~/g, '')
    .replace(/`[^`\n]*`/g, '');
}

function parseLinkTargets(markdown) {
  const targets = [];
  const re = /!?\[[^\]]*\]\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(stripCode(markdown))) !== null) {
    let target = m[1].trim();
    if (target.startsWith('<') && target.endsWith('>')) target = target.slice(1, -1);
    else target = target.split(/\s+/)[0];
    if (target) targets.push(target);
  }
  return targets;
}

function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function headingAnchors(markdown) {
  const anchors = new Set();
  const counts = new Map();
  const re = /^(#{1,6})\s+(.+?)\s*#*\s*$/gm;
  let m;
  while ((m = re.exec(stripCode(markdown))) !== null) {
    let slug = slugify(m[2]);
    if (anchors.has(slug)) {
      const n = (counts.get(slug) || 0) + 1;
      counts.set(slug, n);
      slug = `${slug}-${n}`;
    }
    anchors.add(slug);
  }
  return anchors;
}

function classifyTarget(target) {
  if (target.startsWith('//')) return { kind: 'external' };
  if (target.startsWith('mailto:')) return { kind: 'email' };
  if (target.startsWith('#')) return { kind: 'anchor' };
  const scheme = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(target);
  if (scheme) {
    const proto = scheme[1].toLowerCase();
    if (proto === 'http' || proto === 'https') return { kind: 'external' };
    return { kind: 'unknown-scheme', scheme: proto };
  }
  return { kind: 'internal' };
}

function safeDecode(text) {
  try { return decodeURIComponent(text); } catch { return text; }
}

function splitTarget(target) {
  let rest = target;
  let fragment = null;
  let query = null;
  const hash = rest.indexOf('#');
  if (hash !== -1) { fragment = rest.slice(hash + 1); rest = rest.slice(0, hash); }
  const q = rest.indexOf('?');
  if (q !== -1) { query = rest.slice(q + 1); rest = rest.slice(0, q); }
  return { path: safeDecode(rest), fragment, query };
}

function validateManifest(raw) {
  startCategory('Manifest schema');
  const before = errors.length;
  const result = { areas: [], docs: [] };
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    fail('manifest root must be a JSON object');
    return result;
  }
  for (const field of ['name', 'source']) {
    if (typeof raw[field] !== 'string' || raw[field].trim() === '') {
      fail(`manifest.${field} must be a non-empty string`);
    }
  }
  if (!Array.isArray(raw.areas) || raw.areas.length === 0) {
    fail('manifest.areas must be a non-empty array');
    return result;
  }

  const areaIds = new Set();
  const areaIndexes = new Set();
  const docIds = new Set();
  const docPaths = new Set();

  raw.areas.forEach((area, i) => {
    const at = `areas[${i}]`;
    if (!area || typeof area !== 'object' || Array.isArray(area)) {
      fail(`${at} must be an object`);
      return;
    }
    for (const field of ['id', 'title', 'role']) {
      if (typeof area[field] !== 'string' || area[field].trim() === '') {
        fail(`${at}.${field} must be a non-empty string`);
      }
    }
    if (typeof area.index !== 'string' || area.index.trim() === '') {
      fail(`${at}.index must be a non-empty path string`);
    }
    if (!Array.isArray(area.documents)) {
      fail(`${at}.documents must be an array`);
      return;
    }
    if (typeof area.id === 'string' && area.id.trim() !== '') {
      if (areaIds.has(area.id)) fail(`duplicate area id: ${area.id}`);
      areaIds.add(area.id);
    }

    let indexAbs = null;
    if (typeof area.index === 'string' && area.index.trim() !== '') {
      if (area.index.startsWith('/') || area.index.split('/').includes('..')) {
        fail(`${at}.index must be a relative path inside the repository: ${area.index}`);
      } else if (!isInside(root, resolve(root, area.index))) {
        fail(`${at}.index resolves outside the repository: ${area.index}`);
      } else {
        if (areaIndexes.has(area.index)) fail(`duplicate area index path: ${area.index}`);
        areaIndexes.add(area.index);
        indexAbs = resolve(root, area.index);
        if (!isFile(indexAbs)) fail(`${at}.index does not exist: ${area.index}`);
      }
    }

    const record = { id: area.id, indexAbs, documents: [] };

    area.documents.forEach((doc, j) => {
      const dt = `${at}.documents[${j}]`;
      if (!doc || typeof doc !== 'object' || Array.isArray(doc)) {
        fail(`${dt} must be an object`);
        return;
      }
      for (const field of ['id', 'path', 'title']) {
        if (typeof doc[field] !== 'string' || doc[field].trim() === '') {
          fail(`${dt}.${field} must be a non-empty string`);
        }
      }
      if (doc.summary !== undefined && typeof doc.summary !== 'string') {
        fail(`${dt}.summary must be a string when present`);
      }
      if (typeof doc.path !== 'string' || doc.path.trim() === '') return;
      if (doc.path.startsWith('/') || doc.path.split('/').includes('..')) {
        fail(`${dt}.path must be a relative path inside the repository: ${doc.path}`);
      }
      if (docPaths.has(doc.path)) fail(`duplicate document path: ${doc.path}`);
      docPaths.add(doc.path);
      if (typeof doc.id === 'string' && doc.id.trim() !== '') {
        if (docIds.has(doc.id)) fail(`duplicate document id: ${doc.id}`);
        docIds.add(doc.id);
      }
      const abs = resolve(root, doc.path);
      if (!isFile(abs)) fail(`${dt}.path does not exist: ${doc.path}`);
      if (indexAbs && !isInside(dirname(indexAbs), abs)) {
        fail(`${dt}.path is outside its area (${relative(root, dirname(indexAbs))}/): ${doc.path}`);
      }
      const entry = { areaId: area.id, id: doc.id, relPath: doc.path, abs };
      result.docs.push(entry);
      record.documents.push(entry);
    });

    result.areas.push(record);
  });

  for (const required of REQUIRED_AREA_IDS) {
    if (!areaIds.has(required)) fail(`required area missing: ${required}`);
  }
  if (errors.length === before) pass(`valid — ${result.areas.length} area(s), ${result.docs.length} document(s)`);
  return result;
}

async function checkIndexes(result) {
  startCategory('Index coverage');
  if (result.areas.length === 0) {
    note('no areas to check');
    return;
  }
  const before = errors.length;
  for (const area of result.areas) {
    if (!area.indexAbs || !isFile(area.indexAbs)) continue;
    const linked = new Set();
    for (const target of parseLinkTargets(await readText(area.indexAbs))) {
      if (classifyTarget(target).kind !== 'internal') continue;
      const rel = splitTarget(target).path;
      if (rel) linked.add(resolve(dirname(area.indexAbs), rel));
    }
    for (const doc of area.documents) {
      if (!linked.has(doc.abs)) {
        fail(`index missing entry — ${relative(root, area.indexAbs)} does not link ${doc.relPath}`);
      }
    }
    const known = new Set(area.documents.map((d) => d.abs));
    for (const file of (await walk(dirname(area.indexAbs), (n) => n.endsWith('.md')))) {
      if (file !== area.indexAbs && !known.has(file)) {
        note(`document not listed in manifest: ${relative(root, file)}`);
      }
    }
  }
  const docsIndex = resolve(docsDir, 'README.md');
  if (isFile(docsIndex)) {
    const linked = new Set();
    for (const target of parseLinkTargets(await readText(docsIndex))) {
      if (classifyTarget(target).kind !== 'internal') continue;
      const rel = splitTarget(target).path;
      if (rel) linked.add(resolve(dirname(docsIndex), rel));
    }
    for (const area of result.areas) {
      if (!area.indexAbs) continue;
      const accepts = [area.indexAbs, dirname(area.indexAbs)];
      if (!accepts.some((p) => linked.has(p))) {
        note(`docs/README.md does not link area index ${relative(root, area.indexAbs)}`);
      }
    }
  }
  if (errors.length === before) pass('every manifest document is linked from its area index');
}

async function checkLinks(referenced) {
  startCategory('Markdown link targets');
  const before = errors.length;
  const files = await walk(docsDir, (n) => n.endsWith('.md'));
  const anchorCache = new Map();
  let internal = 0;

  async function anchorsFor(abs) {
    if (!anchorCache.has(abs)) anchorCache.set(abs, headingAnchors(await readText(abs)));
    return anchorCache.get(abs);
  }
  async function checkAnchor(abs, fragment, where) {
    const anchors = await anchorsFor(abs);
    const frag = safeDecode(fragment);
    if (!anchors.has(frag) && !anchors.has(frag.toLowerCase())) fail(`broken anchor — ${where} (#${fragment})`);
  }

  for (const file of files) {
    for (const target of parseLinkTargets(await readText(file))) {
      const c = classifyTarget(target);
      const where = `${relative(root, file)} -> ${target}`;
      if (c.kind === 'external' || c.kind === 'email') continue;
      if (c.kind === 'unknown-scheme') { note(`unrecognized link scheme "${c.scheme}:" — ${where}`); continue; }
      if (c.kind === 'anchor') { await checkAnchor(file, target.slice(1), where); continue; }

      const { path: relPath, fragment } = splitTarget(target);
      if (!relPath) continue;
      internal += 1;
      const abs = resolve(dirname(file), relPath);
      const isAsset = isInside(assetsDir, abs);
      if (target.endsWith('/')) {
        if (!isDirectory(abs)) fail(`broken directory link — ${where}`);
      } else if (isFile(abs)) {
        if (isAsset) referenced.add(abs);
        else if (fragment && abs.endsWith('.md')) await checkAnchor(abs, fragment, where);
      } else if (isAsset) {
        referenced.add(abs);
      } else if (!isDirectory(abs)) {
        fail(`broken internal link — ${where} (resolved ${relative(root, abs)})`);
      }
    }
  }
  if (errors.length === before) pass(`${files.length} document(s), ${internal} internal link(s) resolved`);
}

async function checkAssets(referenced) {
  startCategory('Asset references');
  const before = errors.length;
  for (const abs of referenced) {
    const where = `docs -> ${relative(root, abs)}`;
    if (relative(assetsDir, abs).split(sep)[0] === 'fonts') {
      note(`licensed asset referenced (expected unavailable) — ${where}`);
    } else if (!isFile(abs)) {
      fail(`missing referenced asset — ${where}`);
    }
  }

  const webFiles = await walk(webSrcDir, (n) => /\.(astro|mdx|md|ts|js|mjs|css)$/.test(n));
  for (const file of webFiles) {
    const content = await readText(file);
    for (const re of WEB_ASSET_PATTERNS) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(content)) !== null) {
        let ref = m[0].replace(/^["'`]/, '');
        if (ref.includes('${')) ref = ref.slice(0, ref.indexOf('${'));
        if (!ref || !ref.includes('assets/')) continue;
        const dirRef = ref.endsWith('/');
        const abs = ref.startsWith('/assets/')
          ? resolve(assetsDir, ref.slice('/assets/'.length))
          : resolve(dirname(file), ref);
        referenced.add(abs);
        const where = `web: ${relative(root, file)} -> ${ref}`;
        const isFont = isInside(assetsDir, abs) && relative(assetsDir, abs).split(sep)[0] === 'fonts';
        const present = dirRef ? isDirectory(abs) : existsSync(abs);
        if (!present && isFont) note(`licensed font not present in repo (expected) — ${where}`);
        else if (!present && !dirRef) fail(`missing referenced asset — ${where}`);
        else if (!present) fail(`missing referenced asset directory — ${where}`);
      }
    }
  }

  let unreferenced = 0;
  for (const abs of await walk(assetsDir)) {
    if (relative(assetsDir, abs).split(sep)[0] === 'fonts') continue;
    if (!referenced.has(abs)) { unreferenced += 1; note(`unreferenced asset: ${relative(root, abs)}`); }
  }
  if (errors.length === before) pass(`${referenced.size} referenced asset(s); ${unreferenced} unreferenced (warning only)`);
}

async function checkFontPolicy() {
  startCategory('Font policy');
  if (!existsSync(gitignorePath)) {
    fail('.gitignore is missing — font exclusion rules cannot be verified');
    return;
  }
  const patterns = (await readText(gitignorePath))
    .split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));

  if (patterns.includes('assets/fonts/')) pass('.gitignore excludes assets/fonts/');
  else fail('.gitignore does not exclude assets/fonts/');
  if (patterns.some((p) => p === '*.woff2' || p === '*.woff')) pass('.gitignore excludes web-font extensions');
  else note('.gitignore has no *.woff2/*.woff rule (assets/fonts/ still covers current files)');

  const isRepo = spawnSync('git', ['-C', root, 'rev-parse', '--is-inside-work-tree'], { encoding: 'utf8' }).stdout?.trim() === 'true';
  if (!isRepo) {
    note('git unavailable (or not a repository) — tracking of restricted fonts was not verified');
    return;
  }
  const tracked = runGit(['ls-files', '--', 'assets/fonts']);
  if (tracked) fail(`restricted font file(s) tracked under assets/fonts/:\n    ${tracked.split('\n').join('\n    ')}`);
  else pass('no files under assets/fonts/ are tracked in git');

  const trackedExt = runGit(['ls-files', '--', '*.woff2', '*.woff', '*.ttf', '*.otf']);
  if (trackedExt) fail(`restricted font extension(s) tracked outside assets/fonts/:\n    ${trackedExt.split('\n').join('\n    ')}`);
  else pass('no restricted font extensions tracked elsewhere');

  const ignored = spawnSync('git', ['-C', root, 'check-ignore', '-q', join('assets', 'fonts', 'probe.woff2')]).status === 0;
  if (ignored) pass('assets/fonts/ is ignored by git');
  else fail('assets/fonts/ is not ignored by git');
}

function runGit(args) {
  return (spawnSync('git', ['-C', root, ...args], { encoding: 'utf8' }).stdout || '').trim();
}

async function checkStructure() {
  startCategory('Repository structure');
  if (!existsSync(docsDir)) fail('required directory missing: docs/');
  else if (!isDirectory(docsDir)) fail('required path is not a directory: docs/');
  else pass('required directory present: docs/');
  if (!existsSync(assetsDir)) note('assets/ directory not present — asset references will be limited');
  else if (!isDirectory(assetsDir)) note('assets/ exists but is not a directory');
}

async function main() {
  await checkStructure();
  if (!existsSync(manifestPath)) {
    startCategory('Manifest schema');
    fail('manifest.json missing — documentation index cannot be read');
    report();
    process.exit(1);
  }
  let raw;
  try {
    raw = await readJson(manifestPath);
  } catch (e) {
    startCategory('Manifest schema');
    fail(`manifest.json is not valid JSON — ${e.message}`);
    report();
    process.exit(1);
  }

  const result = validateManifest(raw);
  const referenced = new Set();
  await checkIndexes(result);
  await checkLinks(referenced);
  await checkAssets(referenced);
  await checkFontPolicy();
  report();
  process.exit(errors.length > 0 ? 1 : 0);
}

function report() {
  console.log(`\n${'-'.repeat(56)}`);
  for (const c of categories) {
    console.log(`${c.errors > 0 ? 'FAIL' : 'ok  '} ${c.name} — ${c.errors} error(s), ${c.warnings} warning(s)`);
  }
  console.log('-'.repeat(56));
  console.log(`Total: ${errors.length} error(s), ${warnings.length} warning(s)`);
}

main().catch((e) => {
  console.error('\nUnexpected validation error:');
  console.error(e);
  process.exit(1);
});

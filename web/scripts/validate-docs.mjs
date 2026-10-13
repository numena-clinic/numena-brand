#!/usr/bin/env node
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname, relative, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, '..', '..');
const docsRoot = join(root, 'docs');

const errors = [];
const warnings = [];

function ok(msg) { console.log('✓', msg); }
function err(msg) { console.error('✗', msg); errors.push(msg); }
function warn(msg) { console.warn('⚠', msg); warnings.push(msg); }

async function readJson(p) {
  const s = await readFile(p, 'utf8');
  return JSON.parse(s);
}

async function collectMd(dir) {
  const files = [];
  async function walk(d) {
    const entries = await readdir(d, { withFileTypes: true });
    for (const e of entries) {
      if (e.name.startsWith('.')) continue;
      const p = join(d, e.name);
      if (e.isDirectory()) await walk(p);
      else if (e.name.endsWith('.md')) files.push(p);
    }
  }
  await walk(dir);
  return files;
}

async function main() {
  const manifestPath = join(root, 'manifest.json');
  if (!existsSync(manifestPath)) err('manifest.json missing'); else ok('manifest.json exists');
  const manifest = existsSync(manifestPath) ? await readJson(manifestPath) : null;
  if (manifest) {
    for (const area of manifest.areas || []) {
      for (const doc of area.documents || []) {
        const p = join(root, doc.path);
        if (!existsSync(p)) err(`manifest missing file: ${doc.path}`); else ok(`manifest entry exists: ${doc.path}`);
      }
    }
  }
  if (manifest) {
    const viArea = manifest.areas.find(a => a.id === 'visual-identity');
    const viReadme = join(docsRoot, 'visual-identity', 'README.md');
    if (existsSync(viReadme)) {
      const content = await readFile(viReadme, 'utf8');
      for (const doc of viArea.documents) {
        const base = doc.path.split('/').pop();
        if (!content.includes(base)) warn(`visual-identity README missing reference: ${base}`);
      }
      ok('visual-identity README compared to manifest');
    }
  }
  const mdFiles = await collectMd(docsRoot);
  for (const mf of mdFiles) {
    const content = await readFile(mf, 'utf8');
    const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
    let m;
    while ((m = linkRe.exec(content)) !== null) {
      const href = m[2].trim();
      if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) continue;
      const base = dirname(mf);
      const target = normalize(join(base, href));
      const clean = target.split('#')[0].split('?')[0];
      if (!existsSync(clean)) err(`broken internal link in ${relative(root, mf)} -> ${href}`);
    }
  }
  ok('internal .md links checked');
  for (const mf of mdFiles) {
    const content = await readFile(mf, 'utf8');
    const re = /(assets\/[^\s)'"`]+|\.{2}\/\.{2}\/assets\/[^\s)'"`]+)/g;
    let m;
    while ((m = re.exec(content)) !== null) {
      const ref = m[1];
      let clean;
      if (ref.startsWith('../../')) clean = normalize(join(root, ref.replace('../../', '')));
      else if (ref.startsWith('../')) clean = normalize(join(dirname(mf), ref)).split('#')[0].split('?')[0];
      else clean = normalize(join(root, ref)).split('#')[0].split('?')[0];
      if (!existsSync(clean)) warn(`asset reference missing: ${relative(root, mf)} -> ${ref}`);
    }
  }
  ok('asset references checked');
  const gi = join(root, '.gitignore');
  if (existsSync(gi)) {
    const c = await readFile(gi, 'utf8');
    if (c.includes('assets/fonts/') && c.includes('*.woff2')) ok('.gitignore has font guards');
    else warn('.gitignore font guards missing');
  }
  console.log('--- errors:', errors.length, 'warnings:', warnings.length);
  if (errors.length > 0) process.exit(1);
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });

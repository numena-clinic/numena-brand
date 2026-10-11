# Architecture

How this repository is organized, and the rules that keep it from drifting into more than one source of truth.

## Layout

```
numena-brand/
├── README.md            Entry point: what this is, how to navigate it.
├── BRAND.md             The brand on one page (summary — defers to brand/).
├── ARCHITECTURE.md      This file.
├── AGENTS.md            How an AI agent reads and changes the repo.
├── manifest.json        Generated index (do not edit by hand).
├── brand/               The brand documents — the source of truth.
│   ├── foundation.md
│   ├── voice.md
│   ├── visual-language.md
│   ├── logo.md
│   ├── color.md
│   ├── typography.md
│   └── iconography.md
├── assets/              Logo, imagery, illustrations, (gitignored) fonts.
├── scripts/
│   └── build-manifest.mjs   Validates front matter, dependencies, links.
└── web/                 The brand site: renders brand/ with Astro + Tailwind + MDX.
    ├── astro.config.mjs
    └── src/
        ├── layouts/     DocLayout, header, footer (native HTML).
        ├── lib/brand.ts Reads manifest.json + brand/*.md; renders Markdown.
        └── pages/       Home (MDX) and one page per document.
```

The documents are **flat** on purpose. A numbered folder tree invites empty placeholder files and a reading order that is guessed rather than declared; a flat folder plus front matter makes each document declare its own place.

## Authority: one decision, one document

Every brand decision has exactly one owning document. Nothing may override it.

- **`brand/foundation.md`** owns strategy. If a document disagrees with it, foundation wins.
- Each spec (`voice`, `visual-language`, `logo`, `color`, `typography`, `iconography`) owns its subject.
- **`BRAND.md` and `README.md` are summaries.** They may only restate and link; they never introduce or decide. When a summary and a source disagree, the source wins.
- **`manifest.json` is generated.** Its content comes from the documents; never hand-edit it.
- **`web/` is a rendering.** It shows the documents; it is not a source. If the presentation and the docs differ, fix the presentation.

## Dependencies

Each document declares, in front matter, what it `dependsOn` (documents it follows from) and what it `informs` (documents and consumers built on it). Dependencies form a directed acyclic graph:

```
foundation ──┬── voice
             └── visual-language ──┬── color ──┐
                                  ├── typography ──┼── logo
                                  └── iconography
```

Read direction is dependency-first: `foundation` → `visual-language` → the specs. `logo` sits last among the specs because it draws on color and typography. `scripts/build-manifest.mjs` computes the reading order from the graph, rejects cycles, and rejects a `dependsOn` that names a missing document.

`informs` may also name external consumers (`web`, `design-system`) that are not documents in this repo.

## The web presentation

`web/` is a plain, static site that renders the brand documents. Nothing on it is authored twice: it reads `manifest.json` for navigation and metadata, and the `brand/*.md` files (plus `BRAND.md`) for content, then renders the Markdown to HTML.

- **Stack:** Astro, Tailwind CSS, and MDX. Astro is the only build tool; Tailwind's theme is fed from the brand palette; MDX is available for any hand-authored page.
- **No component framework.** Do not add React, Vue, Svelte, Headless UI, or another component library. Prefer native HTML and small Astro components; reach for a library only when one specific interaction genuinely requires it, and note why.
- **Content is not duplicated.** The site owns presentation only — layout, prose styles, navigation. Any factual change belongs in `brand/`, never in the site.
- Build it with `cd web && npm run build`.

## Scope: brand, not the design system

This repo holds **brand decisions**: why Numena looks and sounds the way it does, and the concrete rules that follow. It does **not** hold the product's components, tokens pipeline, or implementation.

- The future `numena-design-system` **consumes** these documents. It must not restate them; it should link back and own only what is genuinely its own (component APIs, code tokens, the build).
- `web/` here is a brand presentation, not the product. Its radii and some values are provisional and flagged as such.
- **Assets** are brand material, owned by Numena. Licensed fonts are deliberately excluded from the public repo; see [assets/README.md](assets/README.md).

## Changing a brand decision

1. Edit the owning document in `brand/`. Mark it `status: draft` until it is reviewed, then `in-review`, then `approved`.
2. If the decision is genuinely undecided, write an **Open** callout instead of inventing an answer.
- Update any summaries only to keep them pointing at the truth — never to carry the decision themselves.
- Run `node scripts/build-manifest.mjs`. It validates front matter, the dependency graph, and every internal link, then regenerates `manifest.json`. A change is not done until this passes.

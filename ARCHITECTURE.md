# Architecture

How this repository is organized, and the rules that keep it from drifting into more than one source of truth.

## Layout

```
numena-brand/
├── README.md            Entry point: what this is, how to navigate it.
├── BRAND.md             The brand on one page (summary — defers to docs/).
├── ARCHITECTURE.md      This file.
├── AGENTS.md            How an AI agent reads and changes the repo.
├── manifest.json        Hand-maintained structural index of docs/.
├── docs/                The brand documents — the source of truth.
│   ├── README.md        Index: the two areas and how they relate.
│   ├── brand-strategy/  The intent.
│   │   ├── README.md
│   │   ├── positioning.md
│   │   ├── brand-foundation.md
│   │   └── messaging.md
│   └── visual-identity/ The expression of intent.
│       ├── README.md
│       ├── color.md
│       ├── typography.md
│       ├── logo-system.md
│       ├── imagery.md
│       ├── layout.md
  └── motion-generative-patterns.md
├── assets/              Logo, imagery, illustrations, (gitignored) fonts.
└── web/                 The brand site: renders docs/ with Astro + Tailwind + MDX.
    ├── astro.config.mjs
    └── src/
        ├── layouts/     DocLayout, header, footer (native HTML).
        ├── lib/brand.ts Scans docs/ and renders the Markdown.
        └── pages/       Home (MDX) and one page per document.
```

## Source of truth

`docs/` is the single source of truth. It is organized into two complementary areas:

- **`docs/brand-strategy/`** — the intent: what Numena stands for, whom it serves, how it is positioned, and what it communicates.
- **`docs/visual-identity/`** — the expression of that intent: color, typography, logo, imagery, layout, iconography, motion, and graphic elements.

The relationship is directional: visual decisions reinforce the strategic foundations rather than existing independently. When the two appear to conflict, the strategy wins.

Each area has a `README.md` index; [`docs/README.md`](docs/README.md) indexes the areas. Documents are plain Markdown with a single `# H1` title and no front matter.

## One decision, one document

Each fact lives in exactly one place. To change it, edit the owning document; never restate a decision in a summary, an index, or the site. `README.md`, `BRAND.md`, `manifest.json`, and `web/` may only restate and link — if they and a source conflict, the source is right.

`manifest.json` is a small structural index of `docs/` (paths and titles) for tooling and external consumers. It is hand-maintained and not the source; update it when documents change.

## The web presentation

`web/` is a plain, static site that renders the brand documents. Nothing is authored twice: it scans `docs/*/` for sections and Markdown files and renders them, skipping each section's `README.md` index.

- **Stack:** Astro, Tailwind CSS, and MDX. Astro is the only build tool; Tailwind's theme is fed from the brand palette; MDX is available for any hand-authored page.
- **No component framework.** Do not add React, Vue, Svelte, Headless UI, or another component library. Prefer native HTML and small Astro components; reach for a library only when one specific interaction genuinely requires it, and note why.
- **Content is not duplicated.** The site owns presentation only — layout, prose styles, navigation. Any factual change belongs in `docs/`, never in the site.
- Build it with `cd web && npm run build`.

## Scope: brand, not the design system

This repo holds **brand decisions**: why Numena looks and sounds the way it does, and the rules that follow. It does **not** hold the product's components, tokens pipeline, or implementation.

- The future `numena-design-system` **consumes** these documents. It must not restate them; it should link back and own only what is genuinely its own (component APIs, code tokens, the build).
- `web/` here is a brand presentation, not the product. Its measured values are provisional and flagged as such.
- **Assets** are brand material, owned by Numena. Licensed fonts are deliberately excluded from the public repo; see [assets/README.md](assets/README.md).

## Changing a brand decision

1. Edit the owning document in `docs/`.
2. If the decision is genuinely undecided, state it as an open question or hypothesis — the documents use "Validation needed," "Status: Pending," and candidate framing rather than inventing an answer.
3. Update the affected area README, [`docs/README.md`](docs/README.md), and [`manifest.json`](manifest.json) only to keep them pointing at the truth — never to carry the decision themselves.
4. If you touched `web/`, run `cd web && npm run build`.

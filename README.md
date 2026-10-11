# Numena: Brand

The brand identity, voice, and visual system for Numena — written as a small set of Markdown documents, each with one responsibility.

This repository is the **brand**. It is not the product's component library; that is the future `numena-design-system`, which will consume these documents rather than restate them. See [ARCHITECTURE.md](ARCHITECTURE.md).

## Start here

- **[brand/foundation.md](brand/foundation.md)** — the strategy everything else follows from. Read it first.
- **[BRAND.md](BRAND.md)** — the whole brand on one page, with links to the source for every claim.
- **[manifest.json](manifest.json)** — machine-readable index: every document, its status, and its dependencies.
- **[AGENTS.md](AGENTS.md)** — how an AI agent should read and change this repository.

## Documents

The brand lives in [`brand/`](brand). Each document declares its `status` (`draft`, `in-review`, `approved`), a one-line `summary`, what it `dependsOn`, and what it `informs`.

| Document | Covers |
| --- | --- |
| [Foundation](brand/foundation.md) | Purpose, brand idea, philosophy, positioning, audience, the boundary, messaging |
| [Voice](brand/voice.md) | How Numena writes and speaks |
| [Visual language](brand/visual-language.md) | Restraint, surfaces, accent roles, spacing, composition |
| [Logo](brand/logo.md) | Marks, lockups, color specs, clear space, usage |
| [Color](brand/color.md) | Palette, meaning, proportion, accessibility |
| [Typography](brand/typography.md) | Typefaces, scale, hierarchy, spacing, accessibility |
| [Iconography](brand/iconography.md) | Role, specs, sizes, states, core icon set |

Documents marked **draft** are in progress; open questions are flagged inline rather than silently decided. There are no placeholder documents.

Validate front matter, the dependency graph, and links, and regenerate the index:

```sh
node scripts/build-manifest.mjs
```

## Assets (`assets/`)

Logo, imagery, and illustrations, committed and owned by Numena. Fonts (`assets/fonts/`) are commercially licensed and stay out of this public repository; see [assets/README.md](assets/README.md) for the licensing matrix.

## Presentation (`web/`)

A single-page presentation of the brand, built only from the documents above:

```sh
cd web
npm install
npm run dev      # local server; fonts resolve from ../assets/fonts
npm run build    # tsc --noEmit + vite build
```

The build bundles the local Tiempos files into `web/dist/`, so `dist/` is gitignored and must never be published from a machine without the license.

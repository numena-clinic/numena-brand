# AGENTS.md

Orientation for AI agents working in the Numena brand repository. Humans will find [README.md](README.md) friendlier; the rules here apply to everyone.

## What this repo is

The **brand** for Numena: its strategy and visual identity. A set of Markdown documents in [`docs/`](docs), organized into two areas — `brand-strategy/` (the intent) and `visual-identity/` (the expression of intent) — plus a static site in `web/` that renders them. It is not the product's component library; that is the future `numena-design-system`, which consumes these documents. See [ARCHITECTURE.md](ARCHITECTURE.md).

## Read in this order

1. **[docs/README.md](docs/README.md)** — the index: the two areas and how they relate.
2. **[docs/brand-strategy/brand-foundation.md](docs/brand-strategy/brand-foundation.md)** — what Numena stands for; strategy first.
3. The rest of `docs/brand-strategy/`: [positioning](docs/brand-strategy/positioning.md), [messaging](docs/brand-strategy/messaging.md).
4. **[docs/visual-identity/](docs/visual-identity/)** — how the strategy is expressed visually.

[BRAND.md](BRAND.md) is a one-page summary. Use it to orient; never treat it as the source.

## Rules

1. **One decision, one document.** Each fact lives in exactly one place. To change it, edit the owner; never restate a decision in a summary, the site, or another document. Visual identity stays consistent with brand strategy; it does not redefine it.
2. **Summaries defer.** `README.md`, `docs/README.md`, `BRAND.md`, and `web/` may only restate and link. If they and a source conflict, the source is right.
3. **Don't invent decisions.** The documents state unresolved questions as hypotheses, "Validation needed," and "Status: Pending" rather than settled guidance. Keep that distinction; never fill a gap with a plausible-looking value.
4. **No placeholder documents.** A document either has real content or does not exist. Do not create empty stubs to "reserve" a topic.
5. **Never commit fonts.** `assets/fonts/` is licensed (Klim Tiempos) and gitignored. Confirm any new asset's license permits public redistribution and record it in [assets/README.md](assets/README.md).
6. **Stay in scope.** Brand only. Do not add design-system code, tokens pipelines, or product components here.
7. **The web stack is Astro + Tailwind + MDX.** `web/` renders the documents; it is never a second source. Do not add React, Vue, Svelte, Headless UI, or another component library — prefer native HTML and small Astro components, and reach for a library only when one specific interaction genuinely requires it.

## Document format

Documents in `docs/` are plain Markdown with a single `# H1` title and no front matter. Each area (`brand-strategy/`, `visual-identity/`) has a `README.md` index listing its documents; [`docs/README.md`](docs/README.md) indexes the areas. Keep the indexes and [`manifest.json`](manifest.json) in step with the files.

## Before you finish

- If you added, renamed, or removed a document, update the relevant section README, [`docs/README.md`](docs/README.md), and [`manifest.json`](manifest.json).
- If you touched `web/`, build it:

```sh
cd web && npm run build
```

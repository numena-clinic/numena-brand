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

## Decision hierarchy

When guidance conflicts or a gap appears, resolve it in this order:

1. The source document is authoritative for its subject. Edit the owner, not a summary.
2. Approved assets win over improvised stand-ins. Do not redraw, recolour, or "improve" approved artwork.
3. Summaries and the site restate and link only. They never override a source.
4. Unresolved decisions stay unresolved. Do not fill a gap with a plausible-looking value.
5. If the ambiguity genuinely changes the work, name it (or ask) instead of choosing silently.

## Decision status

The documents already mark unsettled guidance as hypotheses, "Validation needed," or "Status: Pending". Keep that distinction. Where a status label makes a handoff clearer, use only these:

- **Approved** — settled and verified.
- **Provisional** — usable, may still change.
- **Pending** — blocked on artwork, testing, or a decision.
- **Deprecated** — kept only for context.

Do not add status labels where they add nothing, and never mark something Approved without evidence.

## Document format

Documents in `docs/` are plain Markdown with a single `# H1` title and no front matter. Each area (`brand-strategy/`, `visual-identity/`) has a `README.md` index listing its documents; [`docs/README.md`](docs/README.md) indexes the areas. Keep the indexes and [`manifest.json`](manifest.json) in step with the files.

## Before you finish

- If you added, renamed, or removed a document, update the relevant section README, [`docs/README.md`](docs/README.md), and [`manifest.json`](manifest.json).
- If you touched `web/`, build it:

```sh
cd web && npm run build
```

Confirm, in order:

1. The change is consistent with the strategic intent and, where applicable, follows the relevant visual-identity guidance.
2. Approved assets were used correctly and nothing approved was altered.
3. No unsupported product, clinical, psychological, market, or validation claims were introduced.
4. Pending specifications were left pending — not filled in.
5. Brand guidance was not confused with product design-system implementation.
6. Indexes and asset references remain accurate.
7. `cd web && npm run validate:docs && npm run build` was run, and the actual result reported.

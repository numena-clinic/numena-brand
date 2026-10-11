# AGENTS.md

Orientation for AI agents working in the Numena brand repository. Humans will find [README.md](README.md) friendlier; the rules here apply to everyone.

## What this repo is

The **brand** for Numena: strategy, voice, and the visual system. A set of Markdown documents in [`brand/`](brand), each owning one subject. It is not the product's component library — that is the future `numena-design-system`, which consumes these documents. See [ARCHITECTURE.md](ARCHITECTURE.md).

## Read in this order

1. **[manifest.json](manifest.json)** — the map: every document, its `status`, `summary`, `dependsOn`, and `informs`.
2. **[brand/foundation.md](brand/foundation.md)** — strategy first; everything else follows from it.
3. The rest of `brand/` in dependency order (the manifest's order is already dependency-first).

[BRAND.md](BRAND.md) is a one-page summary. Use it to orient; never treat it as the source.

## Rules

1. **One decision, one document.** Each fact lives in exactly one place. To change it, edit the owner; never restate a decision in a summary, the presentation, or another doc. If two docs disagree, `brand/foundation.md` wins.
2. **Summaries defer.** `README.md`, `BRAND.md`, and `web/` may only restate and link. If they and a source conflict, the source is right.
3. **Don't invent decisions.** If something is undecided, add an inline **Open** callout (the documents use `> **Open — …**`) and say what must be decided. Never fill a gap with a plausible-looking value.
4. **No placeholder documents.** A document either has real content or does not exist. Do not create empty stubs to "reserve" a topic.
5. **`manifest.json` is generated.** Never edit it by hand.
6. **Never commit fonts.** `assets/fonts/` is licensed (Klim Tiempos) and gitignored. Confirm any new asset's license permits public redistribution and record it in [assets/README.md](assets/README.md).
7. **Stay in scope.** Brand only. Do not add design-system code, tokens pipelines, or product components here.

## Front matter contract

Every document in `brand/` begins with:

```yaml
---
title: Color
status: draft            # draft | in-review | approved
summary: One line.
dependsOn: [foundation, visual-language]   # documents this one follows from
informs: [logo, web, design-system]        # documents and consumers built on it
---
```

`dependsOn` must name real documents in `brand/`; `informs` may also name external consumers. The graph must stay acyclic.

## Before you finish

Run the validator — it checks front matter, the dependency graph, and every internal link, then regenerates `manifest.json`:

```sh
node scripts/build-manifest.mjs
```

A change is not done until this passes. If you touched `web/`, also run its build:

```sh
cd web && npm run build
```

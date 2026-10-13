# Numena Brand

The brand for Numena — its strategy and visual identity — written as a small set of Markdown documents and rendered by a static site.

This repository is the **brand**. It is not the product's component library; that is the future `numena-design-system`, which will consume these documents rather than restate them. See [ARCHITECTURE.md](ARCHITECTURE.md).

## Start here

- **[docs/README.md](docs/README.md)** — the index of the documentation: the two areas and how they relate.
- **[BRAND.md](BRAND.md)** — the whole brand on one page, linking to the source for every claim.
- **[ARCHITECTURE.md](ARCHITECTURE.md)** — how the repository is organized.
- **[AGENTS.md](AGENTS.md)** — how an AI agent should read and change this repository.

## The documentation (`docs/`)

The brand lives in [`docs/`](docs), organized into two complementary areas. Each area has a `README.md` index; each document owns one subject.

| Area | Document | Covers |
| --- | --- | --- |
| **Brand strategy** — the intent | [Positioning](docs/brand-strategy/positioning.md) | Category, audience, problem, differentiation, value proposition |
| | [Brand Foundation](docs/brand-strategy/brand-foundation.md) | Central idea, beliefs, promise, guiding principle, personality |
| | [Messaging and Verbal Identity](docs/brand-strategy/messaging.md) | Product description, messages, voice, tone, vocabulary |
| **Visual identity** — the expression of intent | [Graphic Language](docs/visual-identity/graphic-language.md) | How the visual elements behave together — shape, color, typography, space, composition |
| | [Color System](docs/visual-identity/color.md) | Palette, roles, hierarchy, accessibility |
| | [Typography](docs/visual-identity/typography.md) | Typefaces, their roles, typographic hierarchy |
| | [Logo System](docs/visual-identity/logo-system.md) | Logo assets, variations, application rules |
| | [Iconography](docs/visual-identity/iconography.md) | Icon system (Iconoir), sizes, color and states, usage |
| | [Imagery](docs/visual-identity/imagery.md) | Principles for photography, illustration, abstract imagery |
| | [Layout](docs/visual-identity/layout.md) | Composition, spacing, alignment, hierarchy, balance |
| | [Motion & Generative Patterns](docs/visual-identity/motion-generative-patterns.md) | Watercolor-kaleidoscope motion, generative patterns, interaction, accessibility |

The documents describe intended direction, not validated outcomes — hypotheses and unresolved questions are stated explicitly rather than decided.

## Assets (`assets/`)

Logo, imagery, and illustrations, committed and owned by Numena. Fonts (`assets/fonts/`) are commercially licensed and stay out of this public repository; see [assets/README.md](assets/README.md) for the licensing matrix.

## Site (`web/`)

A static Astro + Tailwind + MDX site that renders the documents in `docs/`, so nothing is authored twice:

```sh
cd web
npm install
npm run dev      # local server; fonts resolve from ../assets/fonts
npm run build    # astro build → static output in web/dist/
```

The build emits the local Tiempos files into `web/dist/`, so `dist/` is gitignored and must never be published from a machine without the license.

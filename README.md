# Numena: Brand

The brand identity, voice, and design system for Numena.

## Start here

- **[llms.txt](llms.txt)** — orientation for people and AI agents: how this repo is organized and where to look.
- **[manifest.json](manifest.json)** — machine-readable index of every document (section, order, status, summary).
- **[brand-guide.md](brand-guide.md)** — a one-page working summary of the whole brand.

## Documents

Five numbered sections. Each has a README with its reading order, and each document carries front matter (`title`, `section`, `order`, `status`, `summary`).

| Section | Covers |
| --- | --- |
| [01-strategy](01-strategy/README.md) | Context, audience, purpose, vision, positioning, promise, principles |
| [02-meaning](02-meaning/README.md) | Central idea, name and origin, belief, story, semantic framework |
| [03-character](03-character/README.md) | Personality, tensions, voice and tone, verbal identity |
| [04-visual-semantics](04-visual-semantics/README.md) | Creative direction, visual concepts, rationale |
| [05-visual-system](05-visual-system/README.md) | Logo, color, typography, graphic elements, iconography, imagery, layout, usage rules |

Documents with `status: stub` are placeholders awaiting content. To validate front matter and links and regenerate the index:

```sh
node scripts/build-manifest.mjs
```

## Assets (`assets/`)

Logo, imagery, and illustrations — committed, owned by Numena (see `assets/README.md` for the per-folder licensing matrix). Fonts (`assets/fonts/`) are commercially licensed web fonts and stay out of this public repo.

## Presentation (`web/`)

A single-page presentation of the brand system, built only from the documents above:

```sh
cd web
npm install
npm run dev      # local server; fonts resolve from ../assets/fonts
npm run build    # tsc --noEmit + vite build
```

Notes:

- The build bundles the local Tiempos files into `web/dist/`, so `dist/` is gitignored and must never be published from a machine without the license.
- `npm run dev` requires the licensed fonts in `assets/fonts/`; without them the pages fall back to Georgia.

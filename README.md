# Numena: Brand

The brand identity, voice, and design system for Numena.

## Quick reference

A working summary of everything below: [brand-guide.md](brand-guide.md).

## Documents (`docs/`)

1. [Color System](docs/03-color-system.md) — palette, proportion, contrast ratios, usage guide.
2. [Typography](docs/04-typography.md) — typefaces, scale, hierarchy, spacing, accessibility.
3. [Iconography](docs/05-iconography.md) — role, specs, sizes, states, core icon set.

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
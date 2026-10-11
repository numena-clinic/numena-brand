---
title: Logo
status: draft
summary: The marks, lockups, color specifications, clear space, and usage rules.
dependsOn: [foundation, color, typography]
informs: [web]
---

# Numena: Logo

The wordmark carries the name; the mark carries the color. Everything here is used exactly as supplied in `assets/logo/` — no recoloring, no redrawing.

## Marks and lockups

| Form | File | Role |
| --- | --- | --- |
| Wordmark | `logo-text.svg` | The horizontal lockup. The default identity. |
| Symbol / mark | `logo.svg` | The standalone mark, for compact and app surfaces. |
| Wordmark, reversed | `logo-text-white.svg` | White letterforms with colored glyphs, for deep purple. |
| Wordmark, monochrome | `logo-text-bw.svg` | Solid white, for dark photographic or black fields. |
| Mark, monochrome | `logo-bw.svg` | Solid white, for dark fields. |
| Raster | `logo.png` | Raster fallback. |
| Clear-space diagram | `logo-clear-space.png` | Reference diagram, as supplied. |

> **Open — pending originals.** A stacked `logo-stacked.svg` exists in `assets/logo/` but is not yet an approved lockup, and no secondary/alternate lockup is defined. Decide what is canonical.

## Approved combinations

- Wordmark on white.
- Wordmark on pale lavender.
- Reversed wordmark on deep purple.

For black or dark photographic fields, use the monochrome white wordmark or mark. See [Color](color.md) for the surfaces.

## Color specifications

| Variant | Specification |
| --- | --- |
| Wordmark — primary | `#4C207F` letterforms, colored glyphs |
| Glyph accents | Orange `#FF7C3B` · lilac `#AC6FEC` · cyan `#00D3F4` |
| Reversed / white | White letterforms with colored glyphs |
| Monochrome | Solid white, for dark fields |
| Mark — legacy | Fills predate the current palette |

> **Open — logo color reconciliation.** The wordmark's `#4C207F` and the glyph accents (`#FF7C3B`, `#AC6FEC`, `#00D3F4`) are not the brand palette in [Color](color.md) (deep purple `#462279`, peach `#F39D72`, lilac `#AE6DF0`, cyan `#47DDF3`). The mark's fills predate the palette entirely. The logo should either adopt the brand palette or the palette should be reconciled to the logo — this is undecided. Until then, use the supplied files unmodified.

## Clear space

Respect the clear space shown in `logo-clear-space.png`: leave the marked margin clear on every side, free of text, other marks, and busy background edges. The exact ratio is shown in the diagram and is not yet restated as a numeric rule.

## Minimum sizes

> **Open — not yet documented.** Digital and print minimum sizes are not defined. Decide the smallest legible width for the wordmark and the mark, and record it here.

## Usage rules

**Do**

- Use the supplied files, unmodified.
- Keep the clear space clear.
- Prefer the horizontal wordmark; use the mark only in compact surfaces.
- Use the monochrome variant on dark or busy fields.

**Don't**

- Do not rotate, skew, or add effects or shadows.
- Do not recolor, or place on a low-contrast background.
- Do not add effects or shadows.
- Do not modify proportions or rearrange elements.
- Do not alter the wordmark or add unapproved containers or shapes.
- Do not place on low-contrast backgrounds.

## Responsive and product presence

> **Open — not yet defined.** Responsive logo behavior, favicon/browser icon, app/product icon, and social avatar are not documented.

## Files and formats

Masters live in `assets/logo/` (see [assets/README.md](../assets/README.md) for licensing). Supplied as SVG, with a PNG fallback and a clear-space PNG diagram. Export formats beyond SVG/PNG, file-naming conventions, canonical master set, and print-ready files are **not yet defined**.

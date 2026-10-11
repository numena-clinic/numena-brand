---
title: Visual language
status: draft
summary: How the visual system is applied — restraint, surfaces, accent roles, spacing, and composition.
dependsOn: [foundation]
informs: [logo, color, typography, iconography, web]
---

# Numena: Visual language

This document sets the principles the concrete specs implement. Read it before [Color](color.md), [Typography](typography.md), or [Iconography](iconography.md); each one carries the numbers, this one says how they behave together.

## Restraint

**Accents only when they mean something.** The brand is quiet by default and speaks up in a few places. Surfaces do the work; bright color is a signal, never decoration.

The system has three loudness levels:

1. **Surfaces** carry the page. White for reading, pale lavender for rest.
2. **Identity** speaks in deep purple — the logo, primary actions, the words that anchor a screen.
3. **Accents** interrupt, rarely. Each has exactly one job.

If everything is loud, nothing can be a signal. Accents stay noticeable because they are rare; that is the whole mechanism. Proportion and the color values live in [Color](color.md).

## Surfaces and accent roles

| Element | Role | Where it appears |
| --- | --- | --- |
| White | Reading | Pages, panels, cards |
| Pale lavender | Rest | Quiet sections, sidebars, grouping |
| Deep purple | Identity and primary action | Logo, primary buttons, links, selected states |
| Soft peach | Warmth | Human-centered moments only — a welcome, an empty state |
| Bright cyan | Connection | A mark that something links back to its source |
| Bright lilac | Focus | Where attention is right now |

Two rules cross every surface:

- **At most one bright accent per component, no more than two on a screen.**
- **Never carry meaning by color alone.** A cyan trace also has an icon; a lilac selection also changes shape or weight. See [Color](color.md) for which accents are safe as fills versus text.

## The reasoning chain

The product's spine is the chain from observation to decision, kept visible:

**Observation → Theme → Hypothesis → Evidence → Decision**

The chain is the reason the brand exists — it is what traceability acts on. When a surface shows reasoning, it shows the chain, and every link can be inspected back to its source. Icons for each stage are fixed in [Iconography](iconography.md).

## Spacing

Everything sits on a **4 px grid**. Seven steps are enough:

| Step | Value | Typical use |
| --- | --- | --- |
| 1 | 4 px | Hairline gaps, icon-to-label |
| 2 | 8 px | Related items, list rhythm |
| 3 | 12 px | Tight grouping |
| 4 | 16 px | Paragraph spacing, default gap |
| 5 | 24 px | Between groups |
| 6 | 32 px | Between subsections |
| 7 | 48 px | Between sections |

Spacing comes from this scale, not from per-page adjustments. If a layout looks wrong, change the layout, not the margin on one element. Text-specific spacing (space above a heading is at least twice the space below it) is applied in [Typography](typography.md).

## Composition

- **Group by proximity.** Space is the primary tool for showing what belongs together; reach for a rule or a panel only when space is not enough.
- **One idea per band.** Loudness levels do not mix inside a single group; an accent is a moment, not a layer.
- **Hierarchy before decoration.** Weight, size, and spacing carry hierarchy. Color and rules come last. See [Typography](typography.md) for the fixed order.
- **Quiet is a feature.** Leaving space is a brand decision, not wasted room — it mirrors the reflection the product is for.

## Not yet defined

- Layout grid and responsive breakpoints (the presentation notes these are still to be set with the grid).
- Dark mode.
- Radius and elevation: the presentation uses provisional radii that are not yet brand decisions.

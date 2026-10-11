# Color System

This document defines the colors of the Numena brand, their roles, and the rules for using them consistently.

Numena's color identity should balance four qualities:

- **Rigor:** a considered, professional character.
- **Clarity:** a visual hierarchy that keeps attention on the message.
- **Humanity:** warmth and approachability without sacrificing seriousness.
- **Modernity:** distinctive expression without generic technology aesthetics.

The strategy is to establish recognition through violet, support readability with dark and light neutrals, and use vibrant accents selectively.

This document defines the brand identity. Interface tokens, component states, and implementation rules belong in the future design system.

## 2. The palette

The palette contains ten colors organized into three groups.

### Foundation

These colors establish the identity and provide its visual structure.

| Color | HEX | Role |
|---|---|---|
| Deep Purple | `#4C207F` | Primary brand color |
| Ink Plum | `#221A2A` | Dark neutral for readable text and visual depth |
| Pale Lavender | `#EEE9F3` | Primary tinted surface |
| White | `#FFFFFF` | Neutral surface and visual space |

### Expression

These colors add emphasis and distinction. They should not compete equally for attention.

| Color | HEX | Role |
|---|---|---|
| Vibrant Purple | `#8E36F4` | Primary expressive accent |
| Vibrant Cyan | `#25E4F8` | Cool supporting accent |
| Vibrant Tangerine | `#F57A44` | Warm supporting accent |

### Supporting tints

These colors extend the palette without introducing new hues.

| Color | HEX | Role |
|---|---|---|
| Soft Purple | `#E8D7FD` | Light violet variation |
| Soft Cyan | `#D3FAFE` | Light cool variation |
| Soft Tangerine | `#FDE4DA` | Light warm variation |

## 3. Color hierarchy

Use the colors according to this order of importance:

1. **Recognition:** Deep Purple.
2. **Readability:** Ink Plum.
3. **Visual space:** White and Pale Lavender.
4. **Primary emphasis:** Vibrant Purple.
5. **Supporting emphasis:** Vibrant Cyan and Vibrant Tangerine.
6. **Tonal variation:** Soft Purple, Soft Cyan, and Soft Tangerine.

The foundation should dominate most brand compositions. Deep Purple should remain recognizable even when the vibrant accents are absent.

As an initial art-direction guide, use light surfaces for most of the composition, Deep Purple to establish identity, and vibrant colors for selective emphasis. Exact proportions should vary by application rather than follow a rigid formula.

## 4. Meaning and usage

The associations below describe the intended brand expression. They are strategic intentions, not universal psychological effects of color.

| Color | Intended association |
|---|---|
| Deep Purple | Depth, distinction, professional seriousness |
| Ink Plum | Stability, readability, visual grounding |
| Pale Lavender | Restraint, continuity, approachability |
| White | Clarity and openness |
| Vibrant Purple | Energy and brand expression |
| Vibrant Cyan | Cool contrast and visual emphasis |
| Vibrant Tangerine | Warmth and human-centered expression |
| Soft Purple | Violet continuity |
| Soft Cyan | Lightness and cool variation |
| Soft Tangerine | Warmth with less intensity |

### Usage rules

**Keep the identity violet-led.** Deep Purple is the defining brand color. Vibrant Purple supports it; it does not replace it.

**Prioritize readability.** Use Ink Plum for dark text on light surfaces. Use foreground and background combinations that meet applicable contrast requirements.

**Use accents selectively.** Vibrant Purple is the primary accent. Cyan and tangerine provide supporting contrast. Avoid giving all three equal prominence in the same composition.

**Use tints deliberately.** The supporting tints provide tonal variation, but they do not automatically create visible boundaries against White.

**Do not assign unsupported meanings.** The palette does not establish fixed colors for clinical observations, evidence, hypotheses, decisions, or system statuses. Such conventions require separate design decisions and validation.

**Preserve recognition without neon.** Numena should remain recognizable without Vibrant Cyan and Vibrant Tangerine.

## 5. Accessibility

Color combinations must remain legible and distinguishable. The following contrast ratios are calculated from the specified sRGB values using the WCAG relative-luminance formula.

WCAG 2.2 Level AA requires a minimum contrast ratio of **4.5:1 for normal text** and **3:1 for large text**. A minimum of 3:1 also applies to relevant non-text graphical objects and component boundaries.

### Approved text combinations

| Text color | Background | Contrast | Normal text |
|---|---|---:|---|
| Ink Plum | White | 16.82:1 | Pass |
| Ink Plum | Pale Lavender | 14.08:1 | Pass |
| Ink Plum | Soft Purple | 12.41:1 | Pass |
| Ink Plum | Soft Cyan | 15.10:1 | Pass |
| Ink Plum | Soft Tangerine | 14.12:1 | Pass |
| Deep Purple | White | 11.54:1 | Pass |
| Deep Purple | Pale Lavender | 9.66:1 | Pass |
| White | Vibrant Purple | 5.27:1 | Pass |
| Ink Plum | Vibrant Cyan | 10.83:1 | Pass |
| Ink Plum | Vibrant Tangerine | 6.22:1 | Pass |

### Combinations that fail normal-text AA

| Text color | Background | Contrast |
|---|---|---:|
| White | Vibrant Cyan | 1.55:1 |
| White | Vibrant Tangerine | 2.70:1 |
| Ink Plum | Vibrant Purple | 3.20:1 |
| Deep Purple | Vibrant Purple | 2.77:1 |
| Deep Purple | Vibrant Tangerine | 4.29:1 |

Do not use these failing combinations for normal text. The same combination may be suitable for another purpose only if it meets the requirements applicable to that use.

### Light-surface boundaries

| Surface color | Contrast against White |
|---|---:|
| Pale Lavender | 1.24:1 |
| Soft Purple | 1.35:1 |
| Soft Cyan | 1.11:1 |
| Soft Tangerine | 1.24:1 |

These tints work as decorative surfaces, but color alone will not provide a sufficiently contrasting boundary against White where a 3:1 ratio is required.

### Additional requirements

Contrast ratios do not cover every accessibility concern. Applications of the brand must also account for color-vision differences, visible focus indicators where applicable, and information that must remain understandable without color alone.

Reference: [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

## 6. Validation

The palette is specified, but its effectiveness has not yet been established through audience testing.

Before final approval:

- **Test audience perception:** Ask psychologists whether the identity communicates the intended qualities without suggesting answers in advance.
- **Check competitive distinction:** Compare the complete identity with existing clinical software and adjacent professional tools.
- **Evaluate real applications:** Test contrast, hierarchy, legibility, and color distinguishability in representative compositions.
- **Verify print reproduction:** If printed materials are required, validate the colors through the intended print process.

Color psychology findings can inform hypotheses, but they do not prove that this particular palette will create trust, improve reasoning, or produce specific emotional outcomes.

## 7. Recommendation

Retain all ten colors and their existing HEX values.

The palette provides a coherent violet-led identity with dark neutrals, light surfaces, and contrasting expressive accents. Its success will depend on maintaining the hierarchy rather than changing the colors.

The guiding principle is simple: **Deep Purple establishes recognition, Ink Plum supports readability, light surfaces provide space, and vibrant accents create selective emphasis.**

**Status:** Proposed brand specification, pending audience and application validation.

**Scope:** Brand color roles, hierarchy, intended associations, usage principles, and accessibility.

**Future design-system work:** Translate the approved brand decisions into interface tokens, component states, and implementation rules.

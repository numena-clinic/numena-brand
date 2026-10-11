# Iconography

## 1. Purpose

This document defines the role of icons in Numena, the icon system the brand uses, and the rules for sizing, color, states, and usage.

Icons support the words they sit beside. They help people scan an interface and give dense screens a light visual rhythm, but they do not carry meaning alone, decorate a layout, or deliver a verdict.

This document establishes the brand-level icon direction. Interface tokens, the packaged icon component, and implementation rules belong in the future design system.

## 2. Icon system

Numena uses one icon library: **Iconoir** ([iconoir.com](https://iconoir.com), [github.com/iconoir-icons/iconoir](https://github.com/iconoir-icons/iconoir)).

Icons are drawn on a 24 x 24 px grid in a single **regular outline** style, with an even default stroke of 1.5 in grid units. The brand uses regular outline icons only; the solid style is not used, and no second icon library is introduced.

**Why Iconoir**

- **Line style.** Light, even outlines on a 24 px grid keep an interface clear and calm, and sit comfortably beside Albert Sans (see [`typography.md`](./typography.md)).
- **License.** Iconoir is MIT-licensed and free to ship in a commercial product.
- **Coverage.** The set is large and still growing, so most interface needs are already covered.
- **Formats.** SVG, icon font, React, React Native, Vue, Flutter, Figma, and Framer, so design and engineering can work from one source.

**Trade-offs**

- Iconoir is general-purpose. It has no icons for the concepts that make Numena distinct (observation, theme, hypothesis, evidence, decision, trace to source). Those use close metaphors, and a small number may need a custom icon drawn to match (see §8).
- An open-source set can rename or remove icons between releases. The package version should be pinned, and icon names checked against that pinned version.

**Validation needed:** confirm the pinned Iconoir version and re-check every icon name in §7 against its file list before implementation.

## 3. Sizes and stroke

Four sizes only. Icons are drawn on a 24 px grid, so a scaled SVG scales its stroke with it; the smallest size takes a slightly heavier stroke to keep line weight steady.

| Size | Use | Stroke (grid units) | Rendered stroke |
|---|---|---|---|
| 16 px | Beside small and caption text, chips, table cells, dense toolbars | 1.75 | about 1.2 px |
| 20 px | Beside body and label text: buttons, navigation items, form fields | 1.5 | 1.25 px |
| 24 px | Default. Standalone icon buttons, toolbars, section headers | 1.5 | 1.5 px |
| 32 px | Empty states and onboarding | 1.5 | 2 px |

**Rules**

- No other sizes. Do not use 18, 22, or 28, and do not resize an icon to fit a layout; change the layout.
- Pair icon size with the text style beside it.
- Center the icon vertically on the text line box. Leave an 8 px gap between icon and label (4 px inside a compact chip).
- Never stretch an icon or change its proportions.

**Hit areas.** The icon is small; the tap target is not. WCAG 2.2 AA asks for at least 24 x 24 px. Numena uses 40 x 40 px on desktop and 44 x 44 px on touch screens, with the icon centered inside. Icon-only buttons need that full area to respond.

These are starting values. The 16 px size is the one most likely to look too light or too heavy and should be checked in a real render.

## 4. Color and states

Icons take their color from the text beside them (`currentColor`), so they follow the same color roles as the rest of the interface and switch with a theme. One color per icon; never a gradient or a two-tone icon.

| State | Icon color | Additional cue |
|---|---|---|
| Default | Ink Plum | None |
| Hover | Deep Purple | Pointer change |
| Selected, active | Deep Purple | Pale Lavender tile behind the icon, so selection is not carried by color alone |
| Focus | Unchanged | 2 px focus ring in Vibrant Purple |
| Disabled | Ink Plum at reduced opacity | Not clickable, no hover |

The Vibrant Purple focus ring meets the 3:1 non-text minimum against both White (5.27:1) and Pale Lavender (4.41:1).

**Vibrant colors are tiles, not strokes.** Iconoir lines are thin, and Vibrant Cyan (1.55:1) and Vibrant Tangerine (2.7:1) do not pass 3:1 as a line on White. So these colors appear as a filled tile behind an Ink Plum icon, or as a mark on Deep Purple:

- **Trace to source.** The link icon in Ink Plum on a small Vibrant Cyan tile (10.83:1). This uses cyan for its assigned job, connection, and stays readable.
- **Current focus.** Selection uses the Pale Lavender tile and Deep Purple icon above. Vibrant Purple is for the focus ring, not for icon strokes.
- **Warm human moments.** An icon in Ink Plum on a Vibrant Tangerine tile (6.2:1), used rarely.

Semantic status colors are not defined yet (see [`color.md`](./color.md)). Until they are, system-state icons such as warnings use Ink Plum, with their shape and a text label doing the work.

## 5. Usage rules

### When to use an icon

1. **Label by default.** Actions and navigation carry an icon and a word. Icon-only is allowed only for a short list of well-known utilities (search, add, close, more, settings), and every icon-only control gets a tooltip and an accessible name.
2. **One icon, one meaning.** Each concept has one icon everywhere in the product. The same icon never stands for two ideas, and one idea never has two icons.
3. **Sparingly.** At most one icon per row or control. Do not put an icon before every list item or heading. If removing the icon loses nothing, remove it.
4. **Keep the reasoning stages consistent.** Observation, theme, hypothesis, evidence, decision, and trace always use the icons in §7, and always appear with their word the first time they are shown on a screen.

### What icons never do

- **Deliver a verdict.** No check marks, crosses, shields, thumbs, or traffic-light metaphors on clinical content. A check on a hypothesis reads as "confirmed", and Numena does not confirm anything. Checks are reserved for system states, such as a saved note.
- **Imply diagnosis, treatment, or risk assessment.** Avoid medical crosses, hearts, pulse lines, pills, stethoscopes, and the brain icons the library offers. They suggest the product analyzes minds or provides care, which the positioning rules out (see [`../brand-strategy/positioning.md`](../brand-strategy/positioning.md)).
- **Decorate.** No icon as page ornament, and no emoji in place of icons.
- **Mix styles.** No solid icons beside outline icons, and no second icon library.

## 6. Accessibility

- Decorative icons beside a text label are hidden from screen readers (`aria-hidden="true"`); the label does the work.
- An icon-only button has an accessible name that states the action ("Add note", not "plus").
- Icons that carry meaning need 3:1 contrast against the surface they sit on, which the color rules in §4 ensure.
- Do not rely on an icon alone to show a state. Pair it with text or a second visual cue.
- Directional icons (arrows, chevrons) flip in right-to-left layouts. Object icons (calendar, link) do not.

Reference: [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

## 7. Core icon set

These assign an Iconoir icon to each Numena concept. Names are the intended matches and must be confirmed against the pinned Iconoir version before use, since the set can change between releases.

### Concepts central to the product

These carry the product's idea, so they get the most thought.

| Concept | Iconoir icon | Why this metaphor |
|---|---|---|
| Observation | `eye` | Noticing what happened, before any interpretation. |
| Theme | `tag` | A named grouping of observations. |
| Hypothesis | `compass` | A working direction to test. `light-bulb` was rejected: it reads as "insight" or "aha", the language the voice rules avoid. |
| Evidence | `quote` | An excerpt from the source material. |
| Decision | `flag` | A marked point where the clinician commits. Not a check mark, which would read as "correct". |
| Trace to source | `link` | The connection between a conclusion and where it came from, shown on a Vibrant Cyan tile. |
| History of change | `clock-rotate-right` | How a hypothesis or theme has changed over time. |

### Interface utilities

| Purpose | Iconoir icon |
|---|---|
| Session | `calendar` |
| Comment | `chat-bubble` |
| Saved (system state) | `check` |
| Add | `plus` |
| Search | `search` |
| Close | `xmark` |
| More actions | `more-horiz` |
| Settings | `settings` |
| Filter | `filter-list` |
| Edit | `edit-pencil` |
| Next, expand | `nav-arrow-right` |
| Information | `info-circle` |
| Warning (system state) | `warning-triangle` |
| Private, locked | `lock` |
| Delete | `trash` |

## 8. Custom icons

Draw a custom icon only when the concept is central to Numena and no Iconoir icon gives a clear metaphor. The most likely candidate is trace to source, since the differentiator deserves a mark of its own. If the `link` icon reads well in testing, no custom icon is needed.

**Before drawing.** Search Iconoir under at least three synonyms of the concept. If something close exists, use it.

**To match Iconoir**

- Draw on a 24 x 24 grid with a 1.5 stroke, inside the same live area as the icons beside it.
- Copy the line cap, line join, and corner treatment from nearby Iconoir files, so a custom icon cannot be told apart by its edges.
- Outline only, no fills, one color through `currentColor`.
- Check it at 16, 20, 24, and 32 px, beside three Iconoir icons, to confirm it sits in the same family.
- Name it with a `numena-` prefix and keep custom files in their own folder, apart from the library.

**Limit.** Keep the custom set small, about six icons at most. Past that, the product is maintaining its own icon library, which is not the plan. Custom icons are Numena's own work, so their license is Numena's to set, separate from Iconoir's MIT license.

## Validation

The icon system is specified, but it has not been validated in a product context.

Before final approval:

- **Confirm the icon set.** Pin the Iconoir version and verify every name in §7 against its file list.
- **Check the small sizes.** Render the 16 px and 20 px sizes on real screens and confirm the stroke weights hold.
- **Test the metaphors.** Ask whether the concept icons read clearly to the intended audience without a label.
- **Test the vibrant tiles.** Confirm the Cyan and Vibrant Tangerine tiles stay legible and are not read as status.

**Status:** Proposed brand specification, pending validation of the icon set and sizes.

**Scope:** Brand icon system, sizes, color, states, usage principles, and accessibility.

**Future design-system work:** Translate the approved decisions into a packaged icon component, a pinned Iconoir version, interface tokens, and the required third-party license notices.

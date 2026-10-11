---
title: Typography
status: draft
summary: Typefaces, scale, hierarchy, spacing, and accessibility.
dependsOn: [foundation, visual-language]
informs: [web, design-system]
---

# Numena: Typography

Tiempos Text gives Numena its voice. Albert Sans makes that voice usable. The serif appears where attention is earned, and the sans carries everything that has to work.

## Typefaces

Numena uses two typefaces, one serif and one sans. The difference in letterform does the sorting: a reader can tell from the shapes alone whether they are looking at a title or at working content.

| Typeface | Role | Used for | Source and license |
| --- | --- | --- | --- |
| Tiempos Text | The brand's voice | H1, H2, H3 | Klim Type Foundry. Commercial. Web licenses are tiered by traffic and tied to domains. |
| Albert Sans | Reading and work | Body, H4 and below, navigation, buttons, forms, labels, captions, tables, lists | Andreas Rasmussen (a.Foundry). SIL Open Font License 1.1, free for commercial use. Nine weights with italics. |

**Why this pairing.** Tiempos Text has editorial warmth, which fits "thoughtful, not mystical" and "clear, not overly clinical". Albert Sans is plain and open, which keeps dense clinical content easy to scan. The serif is reserved for moments that deserve attention, so it keeps its weight. The sans does everything else.

**Fallback stacks.** Fonts fail to load, and licensed fonts get blocked. The fallbacks keep the serif/sans contrast intact.

```css
--font-serif: 'Tiempos Text', Georgia, 'Times New Roman', serif;
--font-sans: 'Albert Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
```

**Loading.** Self-host both as WOFF2 and use font-display: swap. Preload the two files used on first paint (Tiempos Text Bold and Albert Sans Regular). Match each fallback's size to its web font to limit layout shift.

**Licensing to settle before launch.** Tiempos Text needs a web license sized to expected traffic and the domains in use (including staging). Confirm that the purchased styles include Bold and Bold Italic, and check Klim's terms on self-hosting. Albert Sans needs no purchase, but the license file should ship with the fonts.

Sources: Klim FAQ, Albert Sans package record (Debian).

## Weights

Four styles cover the whole system. Each weight has one job, so a change in weight always means something.

| Style | Weight | Used for |
| --- | --- | --- |
| Tiempos Text Bold | 700 | H1, H2, H3. One weight for all three levels, so size and spacing carry the hierarchy. |
| Albert Sans Regular | 400 | Body text, captions, metadata, table cells, lists. |
| Albert Sans Medium | 500 | Navigation, buttons, form labels, H4, and other secondary headings. |
| Albert Sans Semibold | 600 | Strong emphasis inside text, and small headings in dense panels. Use sparingly. |

**Italics.** Italic is allowed for emphasis within running text and for quoted terms. It is not a heading style and not a label style.

**Not used.** Light and thin weights (too faint at small sizes), Black and ExtraBold (too loud for a thoughtful brand), and Tiempos Text below Bold in headlines. Tiempos Text is not used in running body text.

**Why one headline weight.** If H1, H2, and H3 all use the same weight, the only thing separating them is size and spacing, and that difference is easy to keep consistent. Mixed weights multiply the number of styles that have to be maintained.

## Type scale and line height

One value per style, not a range, so two designers building the same screen get the same result. Sizes are in px at a 16 px root, and are implemented in rem (size divided by 16). Line heights sit on a 4 px grid.

| Style | Typeface and weight | Desktop (size / line height) | Mobile (size / line height) | Line-height ratio (desktop) | Letter spacing |
| --- | --- | --- | --- | --- | --- |
| H1, page headline | Tiempos Text Bold | 48 / 56 | 36 / 44 | 1.17 | -0.01em |
| H2, section headline | Tiempos Text Bold | 36 / 44 | 28 / 36 | 1.22 | -0.01em |
| H3, subsection headline | Tiempos Text Bold | 28 / 36 | 24 / 32 | 1.29 | 0 |
| H4, minor heading | Albert Sans Medium | 20 / 28 | 18 / 24 | 1.40 | 0 |
| Body large | Albert Sans Regular | 18 / 28 | 18 / 28 | 1.56 | 0 |
| Body | Albert Sans Regular | 16 / 24 | 16 / 24 | 1.50 | 0 |
| Small | Albert Sans Regular | 14 / 20 | 14 / 20 | 1.43 | 0 |
| Label, button, navigation | Albert Sans Medium | 14 / 20 | 14 / 20 | 1.43 | 0 |
| Caption, metadata | Albert Sans Regular | 12 / 16 | 12 / 16 | 1.33 | +0.01em |

**How the scale works.** Each heading is at least 1.25 times the size of the step below it (H4 to Body is 1.25, H3 to H4 is 1.4, H2 to H3 is 1.29, H1 to H2 is 1.33). That gap is large enough to read as a different level at a glance. Headlines run tighter than body text (about 1.2 against 1.5) because short lines of large type fall apart when spaced like paragraphs.

**When to use which body size.** Body (16) is the default for interface and working content. Body large (18) is for long-form reading such as articles, help pages, and marketing copy, where more air helps. Small (14) is for secondary text and dense tables. Nothing goes below 12.

**Buttons.** Large buttons use 16 / 24 Albert Sans Medium. Everything else in the table above applies as written.

These are starting values. Line height and letter spacing are the most likely to need a small adjustment once both fonts are rendering in real layouts.

## Hierarchy rules

Readers pick up hierarchy by contrast, in a fixed order: size first, then weight, then spacing, then color, then style. Use the earlier tools before reaching for the later ones. If a design needs color and italics to make a level stand out, size and weight were not doing their job.

**Where the serif stops.** Tiempos Text is for headlines that introduce content. Once text sits inside working interface, it is Albert Sans.

| Context | Tiempos Text | What to use |
| --- | --- | --- |
| Marketing pages, help and documentation, onboarding, long-form reading | Yes, H1 to H3 | Full scale as in the table above |
| Workspace page titles and empty-state headings | Yes, at most H3 size (28 / 36) | Proposed. Keeps the app quiet and leaves the larger sizes for brand moments. |
| Panels, cards, side panels, tables, forms, dialogs, toolbars, navigation | No | Albert Sans Semibold 16 / 24 for a panel title, or H4 (Medium 20 / 28) when it heads a larger region |

**Rules**

1. One H1 per page. Never skip a level (no H2 straight to H4).
2. Show at most three heading levels in a single view. More than that means the content needs splitting, not more styles.
3. Sentence case for headings and for every UI label. No all caps, including small labels. All caps slows reading and raises the voice, and the brand speaks quietly.
4. Below H4, rank text by weight (Regular, Medium, Semibold), not by adding new sizes. The scale has nine styles and should stay that way.
5. Emphasis inside text is Semibold or italic, never both, and never underline. Underline means link. Never bold a whole paragraph.
6. Headlines are charcoal by default. Deep purple is allowed for an H1 on a brand moment. Link and button colors come from the color system.
7. The same role gets the same style everywhere. A button label is one style on every page, defined once as a token.

**One weak spot to watch.** H4 (20 px, Medium) and Body large (18 px, Regular) are close in size. They are separated by weight and by the space above the heading. Do not set an H4 directly against Body large on mobile, where H4 drops to 18 px. Use Body (16 px) there.

## Measure and spacing

**Line length.** Long lines make the eye lose its place on the return sweep, and very short lines break reading into fragments.

- Body text: 60 to 72 characters per line. In CSS, max-width: 65ch. In narrow panels the text fills the panel, but a column should not drop below about 40 characters.
- Headlines: wrap before about 40 characters per line, and use text-wrap: balance so the last line is not a single orphaned word.
- Text is left-aligned. No justified text. Center only short headlines, never paragraphs.

**Spacing around text.** A heading belongs to what follows it, so the space above it must be clearly larger than the space below. Keep it at least twice as large. Values are on a 4 px grid:

| Element | Space above | Space below |
| --- | --- | --- |
| H1 | Set by page layout | 24 |
| H2 | 48 | 16 |
| H3 | 32 | 12 |
| H4 | 24 | 8 |
| Paragraph to paragraph | 16 | |
| List item to list item | 8 | |

Spacing comes from this scale, not from per-page adjustments. If a layout looks wrong, change the layout, not the margin on one heading.

These are starting values to check in real layouts.

## Responsive behavior and accessibility

**Responsive**

- Only the three Tiempos headlines and H4 change between desktop and mobile. Body, label, and caption sizes stay the same, because reading size should not shrink with the screen.
- The switch happens at the layout's tablet breakpoint (to be set with the grid). Between breakpoints, headlines may scale fluidly with clamp(), staying within the mobile and desktop values in the scale.
- When a headline wraps badly on a small screen, reduce its size to the mobile step first. Do not shrink body text to rescue a desktop composition.
- Recheck line length and spacing at each breakpoint. The 65ch limit applies on wide screens, and on phones the text simply fills the width with a 16 px side margin.

**Accessibility**

- Set sizes in rem so users who change their browser's text size get the change. The layout must still work at 200% zoom with no horizontal scrolling.
- Body text is never below 16 px. Small (14) and Caption (12) are for secondary content only, and Caption needs full-strength text color, not a faded gray.
- Body line height of 1.5 meets the WCAG baseline for text spacing. Layouts should tolerate a user raising line spacing to 1.5 and paragraph spacing to 2 times the font size without clipping text.
- Text color pairings follow the contrast table in the Color doc. Large text (24 px and above, or 19 px and above bold) needs 3:1, everything else 4.5:1.
- Do not rely on type styling alone to carry meaning. A link is underlined, and an error has words, not only a color change.
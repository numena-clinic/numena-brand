# Numena: Iconography

Icons in Numena are quiet helpers. They support the words, mark a few repeating ideas, and stay out of the way of the reasoning.

## Role of icons and why Iconoir

Icons do three jobs in Numena: they speed up scanning, they mark a few ideas that repeat, and they give dense screens a little visual rhythm. They do not carry meaning alone, they do not decorate, and they never deliver a verdict.

**Why Iconoir.**

- **Line style.** Light, even outlines on a 24 px grid keep the interface clear and calm. That matches "clear, not overly clinical" and should sit comfortably beside Albert Sans Regular.
- **Cost and license.** MIT license, free, no sign-up. It is safe to ship in a commercial product.
- **Coverage.** The site lists 1,671 icons and the library keeps growing, so most interface needs are already covered.
- **Where it runs.** SVG, icon font, React, React Native, Flutter, Figma, and Framer. Design and engineering can use the same source.

**The trade-off.** Iconoir is general-purpose. It has no icons for the reasoning stages that make Numena distinct (observation, theme, hypothesis, evidence, decision, trace to source). Those use close metaphors from the library, and a small number may need custom icons drawn to match (see Custom icons).

**One more risk.** An open-source set can rename or remove icons between versions. Pin the package version and check names against that version.

### Iconoir specs

| Property | Value |
| --- | --- |
| License | MIT |
| Size of set | 1,671 icons listed on iconoir.com (the README says 1600+) |
| Grid | 24 x 24 px |
| Default stroke weight | 1.5 |
| Customizable | Optical size (default 24), stroke weight (default 1.5), and color |
| Formats | SVG, icon font, React, React Native, Flutter, Figma, Framer. Vue and Swift packages also exist. |
| npm packages | iconoir (raw SVG files), iconoir-react, iconoir-react-native, @iconoir/vue, iconoir_flutter, Iconoir-swift |
| CSS use | Classes named iconoir- plus the icon name. Icons are inline-block and size to the surrounding font size. |
| Styles | Regular outline. A solid style also exists (iconoir-solid.css). Numena uses regular only. |

### How Numena uses it

- One style: the regular outline icons. No solid icons, and no mixing with another icon library.
- Use the package that matches the app's framework, and import only the icons in use so unused icons do not ship.
- Pin the package version and record it in the design tokens file. Icon names in this doc were checked against the iconoir 7.11.0 file list, which I could only read in part (names starting A to D). Names outside that range are marked "confirm" in the core set below.
- Keep the MIT license text in the product's third-party notices.

Sources: Iconoir, Iconoir README on GitHub.

## Sizes and stroke

Four sizes only. Icons are drawn on a 24 px grid, and when an SVG is scaled its stroke scales with it, so a 1.5 stroke renders as 1 px at 16 px. To keep line weight steady across sizes, the smallest size gets a slightly heavier stroke. Stroke weights below are in 24-grid units, the unit Iconoir's customizer uses.

| Size | Use | Stroke weight | Rendered stroke |
| --- | --- | --- | --- |
| 16 px | Beside Small and Caption text, chips, table cells, dense toolbars | 1.75 | about 1.2 px |
| 20 px | Beside Body and Label text: buttons, navigation items, form fields | 1.5 | 1.25 px |
| 24 px | Default. Standalone icon buttons, toolbars, section headers | 1.5 | 1.5 px |
| 32 px | Empty states and onboarding | 1.5 | 2 px |

**Rules**

- No other sizes. Do not use 18, 22, or 28, and do not resize an icon to fit a layout. Change the layout.
- Pair icon size with the text style beside it: 20 with Body (16 / 24) and Label (14 / 20), 16 with Small (14 / 20) and Caption (12 / 16).
- Center the icon vertically on the text's line box. Leave an 8 px gap between icon and text (4 px inside a compact chip).
- Never stretch an icon or change its proportions.

**Hit areas.** The icon is small, the tap target is not. WCAG 2.2 AA asks for at least 24 x 24 px. Numena uses 40 x 40 px on desktop and 44 x 44 px on touch screens, with the icon centered inside. Icon-only buttons need that full area to respond.

These are starting values. Check the 16 px size in a real render, since it is the one most likely to look too light or too heavy.

## Color and states

Icons take their color from the text they sit beside (currentColor), so they follow the same tokens and switch with dark mode for free. One color per icon, never a gradient or a two-tone icon.

| State | Icon color | Extra cue |
| --- | --- | --- |
| Default | Charcoal | None |
| Hover | Deep purple | Pointer change |
| Selected, active | Deep purple | Pale lavender tile behind the icon, so selection is not carried by color alone |
| Focus | Unchanged | 2 px focus ring. Bright lilac on white (3.4:1). On lavender, use deep purple, since lilac drops to 2.8:1. |
| Disabled | Charcoal at reduced opacity | Not clickable, no hover |

**Bright colors are tiles, not strokes.** Iconoir lines are thin (1.5 px), and the Color doc shows that cyan on white is 1.6:1 and peach on white is 2.1:1. Neither passes as an icon line. So cyan and peach appear as a filled tile behind the icon, with the icon itself in charcoal (8.6:1 on cyan, 6.6:1 on peach), or as a mark on deep purple (cyan on deep purple is 7.3:1).

- **Trace to source.** The link icon in charcoal on a small cyan tile. This uses cyan for its assigned job, connection, and stays readable.
- **Current focus.** Selection uses the lavender tile and deep purple icon above. Bright lilac is for the focus ring, not for icon strokes.
- **Warm human moments.** An icon in charcoal on a peach tile, used rarely.

Semantic status colors are not defined yet (see the Color doc). Until they are, system-state icons such as warnings use charcoal with their shape and a text label doing the work.

## Usage rules

### When to use an icon

1. **Label by default.** Actions and navigation carry an icon and a word. Icon-only is allowed for a short list of well-known utilities: search, add, close, more, settings. Every icon-only control gets a tooltip and an accessible name.
2. **One icon, one meaning.** Each concept has one icon everywhere in the product. The same icon never stands for two ideas, and one idea never has two icons.
3. **Sparingly.** At most one icon per row or control. Do not put an icon before every list item or heading. If removing the icon loses nothing, remove it.
4. **The reasoning stages are consistent.** Observation, theme, hypothesis, evidence, decision, and trace always use the icons in the core set, and always with their word when first shown on a screen.

### What icons never do

- **Deliver a verdict.** No check marks, crosses, shields, thumbs, or traffic-light metaphors on clinical content. A check circle on a hypothesis reads as "confirmed", and Numena does not confirm anything. Checks are for system states, such as a saved note.
- **Imply diagnosis, treatment, or risk assessment.** Avoid medical crosses, hearts, pulse lines, pills, stethoscopes, and the brain icons the library offers (brain, brain-research, brain-electricity, brain-warning). They suggest the product analyzes minds or gives care, which the boundary rules out. Likewise no alarm or shield icons for risk.
- **Decorate.** No icon as page ornament, and no emoji in place of icons.
- **Mix styles.** No solid icons beside outline icons, and no second icon library.

## Accessibility

- Decorative icons next to a text label are hidden from screen readers (aria-hidden="true"). The label does the work.
- An icon-only button has an accessible name that says the action ("Add note", not "plus").
- Icons that carry meaning need 3:1 contrast against the surface they sit on, which the color rules above already ensure.
- Do not rely on an icon alone to show a state. Pair it with text or a second visual cue.
- Icons that show direction (arrows, chevrons) flip in right-to-left layouts. Icons that show an object (calendar, link) do not.

## Core icon set

These pick the Iconoir icon for each Numena concept. Verified means the name appears in the iconoir 7.11.0 file list. Confirm means it is my best match from memory of the library and must be checked on iconoir.com before use, because I could only read part of the list.

### Reasoning stages

These carry the product's idea, so they get the most thought.

| Concept | Icon | Status | Why this metaphor |
| --- | --- | --- | --- |
| Observation | eye | Confirm | Noticing what happened, before any interpretation. |
| Theme | tag | Confirm | A named grouping of observations. |
| Hypothesis | compass | Verified | A working direction to test, which fits openness and exploration. light-bulb was rejected: it reads as "insight" or "aha", the language the voice rules avoid. |
| Evidence | quote | Confirm | An excerpt from the source material. |
| Decision | flag | Confirm | A marked point where the clinician commits. Not a check mark, which would read as "correct". |
| Trace to source | link | Confirm | The connection between a conclusion and where it came from. Shown on a cyan tile (see Color and states). |
| History of change | clock-rotate-right | Verified | How a hypothesis or theme has changed over time. |

### Interface utilities

| Purpose | Icon | Status |
| --- | --- | --- |
| Session | calendar | Verified |
| Comment | chat-bubble | Verified |
| Saved (system state) | check | Verified |
| Add | plus | Confirm |
| Search | search | Confirm |
| Close | xmark | Confirm |
| More actions | more-horiz | Confirm |
| Settings | settings | Confirm |
| Filter | filter-list | Confirm |
| Edit | edit-pencil | Confirm |
| Next, expand | nav-arrow-right | Confirm |
| Information | info-circle | Confirm |
| Warning (system state) | warning-triangle | Confirm |
| Private, locked | lock | Confirm |
| Delete | trash | Confirm |

**Checking a "Confirm" name.** Search the name on iconoir.com. If it exists and the metaphor looks right, change its status to Verified. If not, pick the closest icon and record the swap here.

## Custom icons

Draw a custom icon only when the concept is core to Numena and no Iconoir icon gives a clear metaphor. The most likely candidate is trace to source, since the differentiator deserves a mark of its own, such as a theme joined to its source by a line. If the link icon reads well in testing, no custom icon is needed.

**Before drawing.** Search Iconoir under at least three synonyms of the concept. If something close exists, use it.

**To match Iconoir**

- Draw on a 24 x 24 grid with a 1.5 stroke. Stay inside the same live area as the Iconoir icons beside it.
- Copy the line cap, line join, and corner treatment from nearby Iconoir SVG files, so a custom icon cannot be told apart by its edges.
- Outline only, no fills, one color through currentColor.
- Check it at 16, 20, 24, and 32 px, and place it next to three Iconoir icons to see if it sits in the same family.
- Name it with a numena- prefix and keep custom files in their own folder, apart from the library.

**Limit.** Keep the custom set small, about six icons at most. Past that, the product is maintaining its own icon library, which is not the plan. Custom icons are Numena's own work, so their license is Numena's to set, separate from Iconoir's MIT license.
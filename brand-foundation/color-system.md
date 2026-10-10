# Numena: Color System

## Role of color

Color in Numena does three jobs: it signals identity, it keeps the space calm, and it marks meaning in the interface. Anything beyond that is decoration, and decoration is out.

**Governing principle: restraint.** Deep purple and pale lavender carry the experience. The brighter colors appear only when they mean something. If every color is loud, none of them can mark anything. Accents stay noticeable because they are rare.

Associations are built, not inherent. Purple does not make anyone feel rigorous. The meanings below are what we intend, and they only hold if the colors are used the same way every time. Consistency is what turns a color into a signal.

**Fit with the brand.** Numena's differentiator is traceability. Color can reinforce it: when a bright accent appears only where something connects back to its source, the accent itself becomes a cue clinicians learn without being told.

## Palette

Deep purple is the anchor and pale lavender gives space. The three brighter colors are accents with one job each. White and charcoal are the neutrals, and charcoal is a proposed value.

### Meaning

Each color has one job. The meaning is what we intend it to signal, and consistent use is what makes it stick.

| Color | Hex | Brand quality | Job | What it signals |
| --- | --- | --- | --- | --- |
| Deep purple | #462279 | Intellectual discernment | Identity and primary action | Depth, seriousness, distinction. "This is Numena, and this is where you act." |
| Pale lavender | #EBE7F0 | Reflection | Space and rest | A quiet surface. Room to pause and think. |
| Soft peach | #F39D72 | Humanistic inquiry | Warmth | The person behind the case. Used for human-centered moments only. |
| Bright cyan | #47DDF3 | Openness and exploration | Connection | Something links outward to a source or another idea. |
| Bright lilac | #AE6DF0 | Expressiveness | Focus | Where attention is right now, and the occasional signature moment. |

The jobs for cyan and lilac are proposals. They take the intended qualities and pin each to a function, so they can be used the same way every time. Product should confirm them (see Open questions).

**Why purple leads.** Discernment is the first brand quality, and deep purple is the darkest, most saturated color in the set. It carries visual weight, so it naturally becomes the identity and the primary action. The paler and brighter colors then read as support.

**What color never does.** It never delivers a verdict. No color in this set means "good", "bad", "at risk", or "confirmed". That fits the boundary in the Foundation doc: Numena does not assess, diagnose, or decide, so its color should not either.

### Hierarchy and proportion

Three tiers, from most to least present. The shares are starting guidance for a typical screen, not measurements.

| Tier | Colors | Share of a screen | Where it goes |
| --- | --- | --- | --- |
| Foundation | White, pale lavender, charcoal text | About 80 to 90% | Backgrounds, panels, body text, spacious layouts |
| Anchor | Deep purple | About 8 to 15% | Logo, primary buttons, links, selected states, headings that need weight |
| Accents | Soft peach, bright cyan, bright lilac | Under 5% combined | One purposeful mark at a time: a source link, a current selection, a warm human moment |

**Neutrals.** White and pale lavender are the two surfaces. Charcoal is the text color. #2B2B33 is a proposed value, a very dark neutral with a slight cool lean so it sits well beside purple. It is not part of the five given colors and needs confirming.

**Accent rules.**

- At most one bright accent in any one component, and no more than two on a screen.
- An accent appears only when it does its job (connection, focus, warmth). If it is not doing that job, use a neutral or purple.
- Accents are fills, marks, and highlights. They are not body text or thin lines on light surfaces (see Accessibility).

**Why the proportions matter.** The identity should feel thoughtful and rigorous. When bright colors approach equal weight with purple, it reads as playful or noisy. Keeping them rare is also what lets a single cyan or lilac mark be noticed.

## Accessibility

The deep purple and lavender anchor passes everywhere. The bright accents do not pass as text on light surfaces, so they work as fills and marks, paired with a dark color for any words.

Ratios use the WCAG 2.x contrast formula. Body text needs 4.5:1. Large text (about 18 pt, or 14 pt bold) and interface elements need 3:1. Charcoal is the proposed #2B2B33.

| Pairing (foreground on background) | Ratio | Body text | Large text and UI |
| --- | --- | --- | --- |
| Charcoal on white | 14.0 | Pass | Pass |
| Charcoal on pale lavender | 11.5 | Pass | Pass |
| Deep purple on white | 11.9 | Pass | Pass |
| Deep purple on pale lavender | 9.8 | Pass | Pass |
| White on deep purple | 11.9 | Pass | Pass |
| Pale lavender on deep purple | 9.8 | Pass | Pass |
| Bright cyan on deep purple | 7.3 | Pass | Pass |
| Charcoal on bright cyan | 8.6 | Pass | Pass |
| Charcoal on soft peach | 6.6 | Pass | Pass |
| Deep purple on soft peach | 5.6 | Pass | Pass |
| Soft peach on deep purple | 5.6 | Pass | Pass |
| Charcoal on bright lilac | 4.2 | Fail | Pass |
| Bright lilac on deep purple | 3.5 | Fail | Pass |
| Bright lilac on white | 3.4 | Fail | Pass |
| Bright lilac on pale lavender | 2.8 | Fail | Fail |
| Soft peach on white | 2.1 | Fail | Fail |
| Bright cyan on white | 1.6 | Fail | Fail |

### What follows from this

- Cyan and peach are never text or thin lines on white or lavender. Use them as fills with charcoal or purple words on top, or as marks on deep purple.
- Lilac works for large shapes, icons, and focus rings on white (3.4). It fails on lavender (2.8), so a lilac mark on a lavender panel needs a darker outline or a different surface.
- Never carry meaning by color alone. A cyan source link also needs an icon or underline, and a lilac selection also needs a shape change such as a border or weight.

Not yet checked: color-blindness simulation, dark mode, and APCA contrast. They are listed under Open questions.

## Usage guide

| Color | Do | Don't |
| --- | --- | --- |
| Deep purple | Use for the logo, primary buttons, links, selected states, and headings that need weight. Pair with white or lavender text. | Flood whole screens with it, or use it for several competing buttons at once. |
| Pale lavender | Use for panels, cards, sidebars, and quiet sections. Let it create space between ideas. | Put lilac or cyan text on it, or stack many lavender layers until the page loses structure. |
| Soft peach | Use sparingly for human-centered moments: a client-context note, a welcome, an empty state. Put charcoal or purple text on it. | Use it for warnings, errors, or urgency. Peach should never read as an alert. |
| Bright cyan | Mark connections: a source link, a trace between a theme and its evidence. Add an icon or underline. | Use it as text or a thin line on white or lavender, or as a general decoration. |
| Bright lilac | Mark current focus: a selected theme, an active hypothesis, a focus ring. Use large shapes and a second cue. | Use it for body text, small labels, or as a second brand color next to purple. |
| Charcoal | Use for body text and data labels on white or lavender. | Use pure black, or mix several grays for hierarchy where weight and size would do. |

### Combinations that work

- Deep purple with white or lavender: the default for identity and action.
- Deep purple with one cyan mark: connection stands out on a dark surface (7.3).
- Lavender surface with a deep purple selection: calm, with clear emphasis.
- Peach fill with charcoal text: warm and readable (6.6).

### Combinations to avoid

- Lilac and cyan side by side. Two bright accents in contact compete, and the identity turns playful.
- Lilac on lavender. Hue is close and contrast is low (2.8).
- Peach next to red or green status colors. It will read as part of a warning system.

Semantic colors are not defined yet. Success, warning, and error states need their own colors, kept apart from the five brand colors. Two constraints apply. First, none of them should sit close to peach, so peach is never mistaken for a warning. Second, clinical content such as themes, hypotheses, and evidence should not use red or green at all, since that would imply a verdict, which Numena does not give. Reserve status colors for system states like saving, errors, and connection problems.

## Open questions

- [ ] **Signature color.** Is deep purple final? It currently leads, but it is still a candidate.
- [ ] **Cyan and lilac jobs.** Confirm "connection" for cyan and "focus" for lilac. Cyan as a trace color depends on traceability being visible in the product.
- [ ] **Charcoal.** Confirm or replace the proposed #2B2B33.
- [ ] **Semantic colors.** Choose success, warning, and error colors that stay away from peach and never touch clinical content.
- [ ] **Tint and shade scale.** Hover, pressed, disabled, and border states need steps of purple and lavender. Next step toward tokens.
- [ ] **Dark mode.** Does Numena need one? Deep purple will need a lighter counterpart, and the bright accents change roles on dark surfaces.
- [ ] **Color-blindness check.** Deep purple, lilac, and cyan should be simulated for the common types before launch.
- [ ] **Lilac on lavender.** Decide the fix: a darker outline, a different surface, or a darker lilac for UI use.
- [ ] **Print and grayscale.** Reports and exports may lose color, so each meaning needs a non-color backup.
# Numena: Brand Guide

A working reference. Each section here condenses a full document under `brand-foundation/`; use the linked doc when you need the reasoning behind a rule.

## Identity

- **Name:** Numena. Short, easy to say, not a clinical term.
- **Descriptor:** A thoughtful space for better clinical reasoning.
- **Brand idea:** A thoughtful space for better clinical reasoning. "Better" means more examined — not faster, more automated, or more certain.
- **Core claim:** Numena connects what you observe to what you conclude, and shows the path between them.
- **One line:** A workspace for psychologists to connect observations, hypotheses, evidence, and decisions, with every conclusion traceable.
- **Boundary line:** Numena supports your judgment. It does not diagnose, provide therapy, recommend treatment, or make risk decisions.

## The boundary

Numena supports professional judgment; it does not replace it. This is brand, not a disclaimer.

- The clinician is always the author of every conclusion. Language, visuals, and features never suggest Numena reached one, assessed risk, or advised on care.
- Verbs describe what the clinician does: link, revise, decide.
- Neither color nor icons deliver a verdict. No "good", "bad", "at risk", or "confirmed" is ever implied.

## Positioning

- **Audience:** psychologists who want to examine their clinical reasoning over time. Their problem is not missing notes; it is that the reasoning behind a formulation is hard to see, check, and revisit.
- **Category:** a reasoning workspace. It sits beside record-keeping and note-taking, not in place of them.
- **Differentiator: traceability.** Select a theme, see the source material and the reasoning behind it. This is the claim to verify hardest — and the only promise the product should make.

## Voice

Four principles, in order of weight: thoughtful, human, rigorous, quietly confident.

- **Thoughtful.** Make room for nuance; use precision over cleverness; let the reader connect the dots.
- **Human.** Speak one-to-one (you, we); natural language; never reduce psychologists to users, clinicians to workflows, or clients to data.
- **Rigorous.** Say what we know; don't hide uncertainty (might, possible, we don't know yet are strengths); explain the path to a conclusion.
- **Quietly confident.** Clear statements over slogans; no hype; restraint.

Avoid: leverage, optimize workflows, unlock insights, drive efficiency, empower practitioners, next-generation, AI-powered. The tone-of-voice doc has the complete word list and before/after pairs.

## Color

| Color | Hex | Job |
| --- | --- | --- |
| Deep purple | #462279 | Identity and primary action |
| Pale lavender | #EBE7F0 | Space and rest |
| Soft peach | #F39D72 | Warmth (human-centered moments only) |
| Bright cyan | #47DDF3 | Connection, trace to source |
| Bright lilac | #AE6DF0 | Current focus |

Neutrals: white and pale lavender are the surfaces; charcoal (#2B2B33, proposed) is the text color.

Proportion on a typical screen: foundation 80–90%, deep purple 8–15%, bright accents under 5% combined.

- At most one bright accent per component; no more than two on a screen.
- Accents are fills, marks, and highlights — never text or thin lines on light surfaces. Pair any words with charcoal or deep purple.
- Semantic colors are not defined. When they arrive, none sits near peach, and red/green stays off clinical content.

## Typography

- **Serif — Tiempos Text (Bold):** H1, H2, H3. The brand's voice; editorial warmth.
- **Sans — Albert Sans:** body and everything else — H4 down, navigation, buttons, forms, labels, tables, lists.

```css
--font-serif: 'Tiempos Text', Georgia, 'Times New Roman', serif;
--font-sans: 'Albert Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
```

- One H1 per page; never skip a level; at most three heading levels in one view.
- Sentence case everywhere; no all caps, even on labels.
- Body 16 px default; nothing below 12 px. Line heights sit on a 4 px grid.
- Headlines tighter (~1.2) than body (~1.5); body measure 60–72 chars, capped at 65ch.
- Space above a heading is at least twice the space below it.

## Iconography

- Icons: Iconoir regular outline only (MIT). Pin the package version.
- Four sizes: 16, 20, 24, 32 px — nothing else.
- Icons take text color (currentColor); bright colors are tiles behind the icon, never strokes.
- Icons never deliver a verdict, never imply diagnosis or treatment (no brain, pulse, heart, medical imagery), never decorate, never mix with another set.
- Core reasoning stages map to: observation `eye`, theme `tag`, hypothesis `compass`, evidence `quote`, decision `flag`, trace to source `link`.

## Where it lives

- `brand-foundation/brand-foundation.md` — purpose, philosophy, positioning, values, boundary, naming.
- `brand-foundation/tone-of-voice.md` — voice principles, word lists, example pairs.
- `brand-foundation/color-system.md` — palette, proportion, contrast ratios, usage guide.
- `brand-foundation/typography.md` — typefaces, scale, hierarchy, spacing, accessibility.
- `brand-foundation/iconography.md` — role, specs, sizes, states, core icon set.
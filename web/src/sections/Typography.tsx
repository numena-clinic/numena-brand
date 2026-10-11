import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { typeScale } from "../data/content";

/** 05 — Typography */
export function Typography() {
  return (
    <Section id="typography" numeral="07" title="Typography">
      <div className="split">
        <Reveal as="h2" className="h2" style={{ maxWidth: "14ch" }}>
          A serif where attention is earned.
        </Reveal>

        <Reveal className="measure">
          <p className="body-large">
            Tiempos Text Bold sets H1–H3 — the moments where the reader is asked to slow down.
            Albert Sans carries everything else: body, labels, navigation, metadata. The serif
            never appears in buttons, inputs, or metadata.
          </p>
        </Reveal>
      </div>

      {/* Pairing demonstration */}
      <Reveal className="grid-2" style={{ marginTop: "var(--space-3xl)", alignItems: "end" }}>
        <div style={{ borderTop: "1px solid var(--color-rule)", paddingTop: "var(--space-lg)" }}>
          <span className="caption">Tiempos Text Bold — headings</span>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 1.7rem + 1.4vw, 2.75rem)",
              lineHeight: 1.1,
              marginTop: "var(--space-sm)",
              letterSpacing: "-0.01em",
            }}
          >
            Reasoning you can revisit.
          </p>
        </div>
        <div style={{ borderTop: "1px solid var(--color-rule)", paddingTop: "var(--space-lg)" }}>
          <span className="caption">Albert Sans — the work</span>
          <p className="body-large" style={{ marginTop: "var(--space-sm)" }}>
            Reasoning you can revisit. Observe, name a theme, revise a hypothesis, and trace every
            conclusion back to its source.
          </p>
        </div>
      </Reveal>

      {/* Full scale */}
      <div style={{ marginTop: "var(--space-3xl)" }}>
        {typeScale.map((row) => (
          <Reveal key={row.name} className="type-row">
            <p className={row.className} style={{ margin: 0 }}>
              {row.sample}
            </p>
            <p className="caption" style={{ textAlign: "right" }}>
              <span style={{ display: "block", color: "var(--color-text)" }}>{row.name}</span>
              {row.spec}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal className="measure" style={{ marginTop: "var(--space-2xl)" }}>
        <p className="caption" style={{ paddingTop: "var(--space-lg)", borderTop: "1px solid var(--color-rule)" }}>
          Body measure stays at 60–72 characters. Line heights sit on a 4 px grid. Body text never
          drops below 16 px; nothing anywhere drops below 12 px. Tiempos is a licensed Klim face —
          see the font note in the repo.
        </p>
      </Reveal>
    </Section>
  );
}
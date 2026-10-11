import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { principles } from "../data/content";

/** 05 — Brand principles */
export function Principles() {
  return (
    <Section id="principles" numeral="05" title="Principles">
      <Reveal as="h2" className="h2" style={{ maxWidth: "18ch" }}>
        Seven beliefs guide every Numena decision.
      </Reveal>

      <Reveal className="measure" style={{ marginTop: "var(--space-xl)", color: "var(--color-text-soft)" }}>
        <p className="body-large">
          These principles connect the brand's philosophy to its product, communication, and
          design. They exist to help make decisions when trade-offs arise — not merely to describe
          the qualities the brand wants to project.
        </p>
      </Reveal>

      <div style={{ marginTop: "var(--space-3xl)" }}>
        {principles.map((p, i) => (
          <Reveal key={p.title} className="principle-row">
            <span
              className="caption"
              style={{ fontVariantNumeric: "tabular-nums", color: "var(--color-primary)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="h3">{p.title}</h3>
              <p className="measure" style={{ marginTop: "var(--space-md)", color: "var(--color-text-soft)" }}>
                {p.body}
              </p>
              <p className="guiding-question">
                <strong>Guiding question: </strong>
                {p.question}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { strategyNeeds } from "../data/content";

/** 03 — Brand purpose & audience */
export function PurposeAudience() {
  return (
    <Section id="purpose-audience" numeral="03" title="Purpose &amp; audience">
      <Reveal as="h2" className="h2" style={{ maxWidth: "18ch" }}>
        Making the work of understanding people more considered.
      </Reveal>

      <Reveal className="measure" style={{ marginTop: "var(--space-xl)", color: "var(--color-text-soft)" }}>
        <p className="body-large">
          Psychological practice involves gathering information, recognizing patterns, considering
          context, exploring possible explanations, and making judgments without always having
          complete information. Numena exists to support this process — helping psychologists work
          with that complexity in a more structured, thoughtful, and transparent way.
        </p>
      </Reveal>

      <Reveal className="panel" style={{ marginTop: "var(--space-3xl)" }}>
        <p className="label">Purpose statement</p>
        <p className="body-large" style={{ marginTop: "var(--space-md)", maxWidth: "46ch" }}>
          Numena exists to support psychologists in making sense of complex human experiences
          through more structured, reflective, and transparent work.
        </p>
      </Reveal>

      <h3 className="h3" style={{ marginTop: "var(--space-4xl)" }}>
        What psychologists need
      </h3>
      <div style={{ marginTop: "var(--space-xl)" }}>
        {strategyNeeds.map((need, i) => (
          <Reveal key={need.title} className="need-row">
            <span
              className="caption"
              style={{ fontVariantNumeric: "tabular-nums", color: "var(--color-primary)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="h3" style={{ fontSize: "var(--text-h4)", lineHeight: "var(--text-h4-line)" }}>
                {need.title}
              </p>
              <p className="measure" style={{ marginTop: "var(--space-sm)", color: "var(--color-text-soft)" }}>
                {need.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="measure" style={{ marginTop: "var(--space-3xl)" }}>
        <p className="body-large">
          Numena sits at the intersection of psychological practice, information organization, and
          professional reasoning. It is intended to support the work surrounding psychological
          understanding — not to replace the psychologist or automate the complexity of human
          experience.
        </p>
      </Reveal>
    </Section>
  );
}
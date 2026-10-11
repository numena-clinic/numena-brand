import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";

/** 02 — Brand idea */
export function BrandIdea() {
  return (
    <Section id="brand-idea" numeral="02" title="Brand idea">
      <div className="split">
        <Reveal as="h2" className="h2 display-balance">
          Clinical reasoning deserves the same care as the clinical relationship.
        </Reveal>

        <Reveal className="measure" >
          <p className="body-large">
            Numena is a thoughtful space for better clinical reasoning. Better is the operative
            word, and it does not mean faster, more automated, or more certain — it means more
            examined.
          </p>

          <p style={{ marginTop: "var(--space-xl)" }}>
            The product connects what a clinician observes to what they conclude, and shows the
            path between the two. Observations become themes; themes become hypotheses; hypotheses
            meet evidence and arrive at decisions. Numena keeps that chain intact and visible, so
            the reasoning can be revisited and trusted.
          </p>

          <p
            style={{
              marginTop: "var(--space-xxl)",
              paddingTop: "var(--space-lg)",
              borderTop: "1px solid var(--color-rule)",
            }}
          >
            <strong style={{ fontWeight: 500 }}>A deliberate boundary.</strong> Numena supports
            professional judgment. It does not replace it. The tool does not diagnose, provide
            therapy, recommend treatment, or make risk decisions.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
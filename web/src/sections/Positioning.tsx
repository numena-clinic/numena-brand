import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { Icon } from "../components/Icon";
import { strategyPromiseList } from "../data/content";

/** 04 — Positioning & brand promise */
export function Positioning() {
  return (
    <Section id="positioning" numeral="04" title="Positioning &amp; promise">
      <Reveal as="h2" className="h2" style={{ maxWidth: "16ch" }}>
        A more structured way to work through psychological complexity.
      </Reveal>

      <Reveal className="measure" style={{ marginTop: "var(--space-xl)", color: "var(--color-text-soft)" }}>
        <p className="body-large">
          Where conventional digital tools focus primarily on records, scheduling, and
          administration, Numena's intended point of difference is its emphasis on the
          relationships between observations, interpretations, hypotheses, evidence, and evolving
          understanding. The distinction is not that other tools can't support reflection — it
          lies in how the work is represented and supported.
        </p>
      </Reveal>

      <Reveal className="panel" style={{ marginTop: "var(--space-3xl)" }}>
        <p className="label">Positioning statement</p>
        <p className="body-large" style={{ marginTop: "var(--space-md)", maxWidth: "46ch" }}>
          For psychologists who need to organize and interpret complex information as part of
          their professional work, Numena is a psychology platform that supports structured
          reflection and the development of understanding over time. It supports professional
          judgment rather than claiming to replace it.
        </p>
      </Reveal>

      <Reveal className="measure" style={{ marginTop: "var(--space-3xl)" }}>
        <p className="body-large">
          Numena is not positioned around faster conclusions, automated diagnoses, or eliminating
          uncertainty. Its intended distinction is a more considered approach to the work of
          understanding: helping psychologists organize what they know, examine what they think it
          means, and remain aware of what they do not yet know.
        </p>
      </Reveal>

      <h3 className="h3" style={{ marginTop: "var(--space-4xl)" }}>
        Brand promise — what this means in practice
      </h3>
      <Reveal className="measure" style={{ marginTop: "var(--space-xl)" }}>
        <p className="body-large">
          Complex work, easier to understand and work with — organized, transparent, and open to
          revision.
        </p>
        <ul className="checked-list" style={{ marginTop: "var(--space-lg)", maxWidth: "52ch" }}>
          {strategyPromiseList.map((item) => (
            <li key={item}>
              <Icon name="plus" size={16} className="li-mark" title="Included" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="caption" style={{ marginTop: "var(--space-lg)", paddingTop: "var(--space-lg)", borderTop: "1px solid var(--color-rule)" }}>
          The promise must be reflected in the product's actual behavior, not just in its
          messaging. The positioning itself is a strategic hypothesis to validate against
          psychologists' real workflows, existing tools, and unmet needs.
        </p>
      </Reveal>
    </Section>
  );
}
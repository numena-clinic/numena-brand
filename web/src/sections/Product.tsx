import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { Icon } from "../components/Icon";
import { reasoningChain } from "../data/content";

/** 08 — UI / product */
export function Product() {
  return (
    <Section id="product" numeral="10" title="Product">
      <div className="split">
        <Reveal as="h2" className="h2" style={{ maxWidth: "13ch" }}>
          One reasoning chain, kept in view.
        </Reveal>

        <Reveal className="measure">
          <p className="body-large">
            The product's job is to make the chain from observation to decision visible, and to
            keep every conclusion traceable to its source. These surfaces are illustrative — they
            show the brand applied at the component level, not the product design system itself.
          </p>
        </Reveal>
      </div>

      {/* Case panel */}
      <Reveal className="panel" style={{ marginTop: "var(--space-3xl)" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: "var(--space-md)",
            paddingBottom: "var(--space-lg)",
            borderBottom: "1px solid rgba(70,34,121,0.18)",
          }}
        >
          <div>
            <p className="caption">Case 14 · Session 6</p>
            <p className="h3" style={{ marginTop: "var(--space-xxs)" }}>Working hypothesis</p>
          </div>
          <p className="caption" style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-xs)" }}>
            <Icon name="clock" size={16} title="History" />
            Revised 3 times · view history
          </p>
        </div>

        {/* Chain */}
        <div className="chain" style={{ marginTop: "var(--space-lg)" }}>
          {reasoningChain.map((step, i) => (
            <span key={step.label} style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-md)" }}>
              <span className={`chain-step${i === 2 ? " is-selected" : ""}`}>
                <Icon name={step.icon} size={16} title={step.label} />
                {step.label}
              </span>
              {i < reasoningChain.length - 1 && (
                <Icon name="arrow-down" size={16} className="chain-arrow" title="" />
              )}
            </span>
          ))}
        </div>

        {/* Field + action row */}
        <div className="grid-2" style={{ marginTop: "var(--space-xxl)", gap: "var(--space-xl)" }}>
          <div className="field">
            <label className="field-label" htmlFor="hypothesis">
              Current hypothesis
            </label>
            <input
              id="hypothesis"
              className="field-input"
              defaultValue="Avoidance at work intensifies before missed deadlines"
              readOnly
            />
            <p className="caption" style={{ marginTop: "var(--space-xs)" }}>
              Traceable to 3 observations · 1 disconfirming note
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-md)", alignItems: "flex-start" }}>
            <span className="btn btn-primary">Save hypothesis</span>
            <span className="btn btn-secondary">Add observation</span>
            <span className="tile tile-cyan" style={{ alignSelf: "center" }}>
              <Icon name="link" size={16} title="Source" />
              Traced to 3 sources
            </span>
          </div>
        </div>
      </Reveal>

      {/* Empty state + do/don't */}
      <div className="grid-2" style={{ marginTop: "var(--space-xl)", gap: "var(--space-xl)" }}>
        <Reveal className="panel" style={{ background: "var(--soft-peach)", borderRadius: "var(--radius-md)" }}>
          <p className="label">Empty state — human warmth</p>
          <p className="body-large" style={{ marginTop: "var(--space-sm)" }}>
            No observations yet. Add the first one when you're ready.
          </p>
          <p className="caption" style={{ marginTop: "var(--space-md)", color: "var(--charcoal)" }}>
            Peach appears here and almost nowhere else.
          </p>
        </Reveal>

        <Reveal className="panel panel-white">
          <p className="label">Selection — color is never the only signal</p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            The selected chain step above carries three signals at once: a lavender fill, a purple
            border, and purple label. Color alone never carries meaning — every state also changes
            shape, weight, or position.
          </p>
        </Reveal>
      </div>

      <Reveal className="measure" style={{ marginTop: "var(--space-2xl)" }}>
        <p className="caption" style={{ paddingTop: "var(--space-lg)", borderTop: "1px solid var(--color-rule)" }}>
          All text/background pairings meet WCAG 2.2 AA. Semantic states (success / warning /
          error) are deliberately absent — the color system does not define them yet. Radius values
          are presentation placeholders pending a design-system decision.
        </p>
      </Reveal>
    </Section>
  );
}
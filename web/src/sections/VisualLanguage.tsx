import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { Icon } from "../components/Icon";

const iconGrid = [
  { name: "eye", label: "Observation" },
  { name: "label", label: "Theme" },
  { name: "compass", label: "Hypothesis" },
  { name: "quote", label: "Evidence" },
  { name: "triangle-flag", label: "Decision" },
  { name: "link", label: "Trace to source" },
] as const;

/** 07 — Visual language */
export function VisualLanguage() {
  return (
    <Section id="visual" numeral="09" title="Visual language">
      <div className="split">
        <Reveal as="h2" className="h2" style={{ maxWidth: "15ch" }}>
          Accents only when they mean something.
        </Reveal>

        <Reveal className="measure">
          <p className="body-large">
            Surfaces do the work: white for reading, lavender for rest. Bright color is a signal,
            never decoration — cyan says something links to a source, lilac says attention is here,
            peach marks a human moment.
          </p>
        </Reveal>
      </div>

      <div className="grid-2" style={{ marginTop: "var(--space-3xl)", gap: "var(--space-xl)" }}>
        {/* Surfaces */}
        <Reveal>
          <p className="label">Surfaces</p>
          <div className="grid-2" style={{ marginTop: "var(--space-md)", gap: "var(--space-md)" }}>
            <div className="panel panel-white" style={{ minHeight: 120, display: "flex", alignItems: "flex-end" }}>
              <p className="caption">White — reading</p>
            </div>
            <div className="panel" style={{ minHeight: 120, display: "flex", alignItems: "flex-end" }}>
              <p className="caption">Lavender — rest</p>
            </div>
          </div>
        </Reveal>

        {/* Accent marks */}
        <Reveal>
          <p className="label">Accent marks</p>
          <div style={{ display: "grid", gap: "var(--space-md)", marginTop: "var(--space-md)" }}>
            <div className="tile tile-cyan" style={{ justifyContent: "space-between" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-xs)" }}>
                <Icon name="link" size={16} title="Trace" />
                Traced to source
              </span>
              <span className="caption" style={{ color: "var(--charcoal)" }}>cyan = connection</span>
            </div>
            <div
              className="tile"
              style={{ background: "var(--white)", border: "2px solid var(--bright-lilac)" }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-xs)" }}>
                <Icon name="eye" size={16} title="Observation" />
                In focus
              </span>
              <span className="caption" style={{ color: "var(--charcoal)", marginLeft: "auto" }}>lilac = focus</span>
            </div>
            <div className="tile tile-peach" style={{ justifyContent: "space-between" }}>
              <span>Human moment</span>
              <span className="caption" style={{ color: "var(--charcoal)" }}>peach = warmth</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Spacing */}
      <Reveal style={{ marginTop: "var(--space-3xl)" }}>
        <p className="label">Spacing — a 4 px grid</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "var(--space-md)", marginTop: "var(--space-md)" }}>
          {[4, 8, 12, 16, 24, 32, 48].map((px) => (
            <div key={px} style={{ textAlign: "center" }}>
              <div style={{ width: 28, height: px, background: "var(--pale-lavender)", border: "1px solid rgba(70,34,121,0.25)" }} />
              <span className="caption" style={{ display: "block", marginTop: "var(--space-xs)", fontVariantNumeric: "tabular-nums" }}>{px}</span>
            </div>
          ))}
        </div>
        <p className="caption" style={{ marginTop: "var(--space-md)", maxWidth: "var(--measure)" }}>
          Spacing above a heading is at least twice the spacing below it, so headings sit visually
          with the content they introduce.
        </p>
      </Reveal>

      {/* Iconography */}
      <Reveal style={{ marginTop: "var(--space-3xl)" }}>
        <p className="label">Icons — Iconoir regular</p>
        <div className="grid-3" style={{ marginTop: "var(--space-md)", gap: "var(--space-md)" }}>
          {iconGrid.map((i) => (
            <div
              key={i.name}
              className="panel panel-white"
              style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", padding: "var(--space-md) var(--space-lg)" }}
            >
              <Icon name={i.name} size={24} title={i.label} />
              <span className="label">{i.label}</span>
            </div>
          ))}
        </div>
        <p className="caption" style={{ marginTop: "var(--space-md)", maxWidth: "var(--measure)" }}>
          One outline family, one weight, four sizes (16 / 20 / 24 / 32). Package pinned to
          iconoir-react 7.11.0. Recorded swap: the doc's core "tag" and "flag" icons do not exist
          under those names in 7.11.0 — nearest matches Label and TriangleFlag are used.
        </p>
      </Reveal>
    </Section>
  );
}
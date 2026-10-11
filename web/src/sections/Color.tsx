import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { colors, neutrals } from "../data/content";

/** 06 — Color */
export function Color() {
  return (
    <Section id="color" numeral="08" title="Color">
      <div className="split">
        <Reveal as="h2" className="h2" style={{ maxWidth: "12ch" }}>
          Lavender and purple carry the experience.
        </Reveal>

        <Reveal className="measure">
          <p className="body-large">
            Deep purple and pale lavender are the foundation. Peach, cyan, and lilac appear only
            when they mean something — connection, focus, human warmth. At most one bright accent
            per component, two per screen, and never as text on a light surface.
          </p>
        </Reveal>
      </div>

      {/* Swatches */}
      <div className="grid-3" style={{ marginTop: "var(--space-3xl)" }}>
        {colors.map((c) => (
          <Reveal key={c.hex} className="swatch">
            <div className="swatch-color" style={{ background: c.hex }} />
            <div className="swatch-body">
              <p className="label" style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-sm)" }}>
                <span>{c.name}</span>
                <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--color-text-soft)" }}>{c.hex}</span>
              </p>
              <p className="caption" style={{ marginTop: "var(--space-xs)" }}>{c.role}</p>
              <p className="caption" style={{ marginTop: "var(--space-xxs)", color: "var(--color-text)" }}>{c.signals}</p>
            </div>
          </Reveal>
        ))}

        {/* Neutrals */}
        <Reveal className="swatch">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: 120 }}>
            {neutrals.map((n) => (
              <div
                key={n.hex}
                style={{
                  background: n.hex,
                  borderBottom: n.hex === "#FFFFFF" ? "1px solid var(--color-rule)" : "none",
                }}
              />
            ))}
          </div>
          <div className="swatch-body">
            <p className="label">Neutrals</p>
            <p className="caption" style={{ marginTop: "var(--space-xs)" }}>
              {neutrals.map((n) => `${n.name} ${n.hex}`).join(" · ")}
            </p>
            <p className="caption" style={{ marginTop: "var(--space-xxs)", color: "var(--color-text)" }}>
              Surfaces, text, rules. Charcoal is a proposed value, not yet ratified.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Proportion */}
      <Reveal style={{ marginTop: "var(--space-3xl)" }}>
        <p className="label">Proportion</p>
        <div
          style={{
            display: "flex",
            height: 56,
            borderRadius: "var(--radius-sm)",
            overflow: "hidden",
            marginTop: "var(--space-md)",
            border: "1px solid var(--color-rule)",
          }}
          role="img"
          aria-label="Proportion bar: about 85 percent pale lavender foundation, 10 percent deep purple anchor, 5 percent bright accents."
        >
          <div style={{ width: "85%", background: "var(--pale-lavender)" }} />
          <div style={{ width: "10%", background: "var(--deep-purple)" }} />
          <div style={{ width: "2.5%", background: "var(--soft-peach)" }} />
          <div style={{ width: "2.5%", background: "var(--bright-cyan)" }} />
        </div>
        <div className="caption" style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-md)", marginTop: "var(--space-sm)" }}>
          <span>Foundation 80–90%</span>
          <span>Deep purple 8–15%</span>
          <span>Accents &lt;5%</span>
        </div>
      </Reveal>

      <Reveal className="measure" style={{ marginTop: "var(--space-2xl)" }}>
        <p className="caption" style={{ paddingTop: "var(--space-lg)", borderTop: "1px solid var(--color-rule)" }}>
          Semantic states — success, warning, error — are not yet defined in the color system and
          are therefore not invented here. All text/surface pairings above meet WCAG AA.
        </p>
      </Reveal>
    </Section>
  );
}
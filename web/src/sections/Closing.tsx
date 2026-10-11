import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { Logo } from "../components/Logo";

/** 10 — Closing */
export function Closing() {
  return (
    <Section id="closing" numeral="12" title="Closing">
      <Reveal as="h2" className="display" style={{ maxWidth: "18ch" }}>
        Good clinical reasoning isn’t just about finding patterns. It’s about knowing how much
        confidence to place in them.
      </Reveal>

      <Reveal className="split" style={{ marginTop: "var(--space-4xl)" }}>
        <div>
          <Logo variant="mark" height={72} />
          <p className="body-large" style={{ marginTop: "var(--space-lg)", maxWidth: "24ch" }}>
            Numena supports professional judgment. It does not replace it.
          </p>
        </div>

        <div className="measure">
          <p className="label">Where this lives</p>
          <p style={{ marginTop: "var(--space-sm)", color: "var(--color-text-soft)" }}>
            Every rule on this page comes from the Numena brand system: five documents under{" "}
            <code>docs/</code>, condensed into <code>brand-guide.md</code>. Anything not documented
            there — clear space, minimum logo size, semantic colors, radius — is shown neutrally
            here and flagged rather than invented.
          </p>
          <p style={{ marginTop: "var(--space-md)", color: "var(--color-text-soft)" }}>
            Fonts: Tiempos Text (Klim, commercial — not in the repo) and Albert Sans (SIL OFL 1.1).
            Icons: Iconoir (MIT), pinned to 7.11.0.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
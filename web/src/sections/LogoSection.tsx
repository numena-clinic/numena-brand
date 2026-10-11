import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { Icon } from "../components/Icon";

import markUrl from "../../../assets/logo/logo.svg";
import wordmarkUrl from "../../../assets/logo/logo-text.svg";
import wordmarkWhiteUrl from "../../../assets/logo/logo-text-white.svg";
import markBwUrl from "../../../assets/logo/logo-bw.svg";
import wordmarkBwUrl from "../../../assets/logo/logo-text-bw.svg";
import clearSpaceUrl from "../../../assets/logo/logo-clear-space.png";

function PendingTray({ title, note }: { title: string; note?: string }) {
  return (
    <Reveal className="tray">
      <Icon name="clock" size={20} />
      <p className="tray-title">{title}</p>
      <p className="tray-note">{note ?? "Not yet supplied or documented — shown here rather than invented."}</p>
    </Reveal>
  );
}

function SwatchDot({ color }: { color: string }) {
  return <span className="swatch-dot" style={{ background: color }} aria-hidden="true" />;
}

const glyphHexes: Array<[string, string]> = [
  ["#FF7C3B", "orange"],
  ["#AC6FEC", "lilac"],
  ["#00D3F4", "cyan"],
];

/** 04 — Logo */
export function LogoSection() {
  return (
    <Section id="logo" numeral="06" title="Logo System">
      <Reveal as="h2" className="h2" style={{ maxWidth: "16ch" }}>
        The mark carries the color. The wordmark carries the name.
      </Reveal>

      <Reveal className="measure" style={{ marginTop: "var(--space-xl)", color: "var(--color-text-soft)" }}>
        <p className="body-large">
          Everything in this section is displayed exactly as supplied in assets/logo — nothing
          recolored or redrawn. Where the brand system does not yet define a rule, the entry is
          shown as a pending tray rather than invented.
        </p>
      </Reveal>

      <h3 className="logo-group-title">Primary identities</h3>
      <div className="grid-2">
        <Reveal className="panel panel-white" style={{ minHeight: 240, display: "grid", placeItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <img src={wordmarkUrl} alt="Numena" height={44} style={{ height: 44 }} />
            <p className="caption" style={{ marginTop: "var(--space-lg)" }}>
              Wordmark — primary · full color
            </p>
          </div>
        </Reveal>

        <Reveal className="panel panel-white" style={{ minHeight: 240, display: "grid", placeItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <img src={markUrl} alt="Numena mark" height={96} style={{ height: 96 }} />
            <p className="caption" style={{ marginTop: "var(--space-lg)" }}>
              Symbol / mark — full color
            </p>
          </div>
        </Reveal>

        <Reveal className="panel" style={{ minHeight: 240, display: "grid", placeItems: "center", background: "var(--deep-purple)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <img src={wordmarkWhiteUrl} alt="Numena reversed" height={44} style={{ height: 44 }} />
            <p className="caption" style={{ marginTop: "var(--space-lg)", color: "rgba(255,255,255,0.72)" }}>
              Wordmark — reversed / white
            </p>
          </div>
        </Reveal>

        <Reveal className="panel" style={{ minHeight: 240, display: "grid", placeItems: "center", background: "var(--deep-purple)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <img src={markUrl} alt="Numena symbol on deep purple" height={96} style={{ height: 96 }} />
            <p className="caption" style={{ marginTop: "var(--space-lg)", color: "rgba(255,255,255,0.72)" }}>
              Symbol / mark — on deep purple
            </p>
          </div>
        </Reveal>
      </div>

      <h3 className="logo-group-title">Lockups &amp; secondary</h3>
      <div className="grid-2">
        <Reveal className="panel panel-white" style={{ minHeight: 132, display: "grid", placeItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <img src={wordmarkUrl} alt="Numena horizontal" height={28} style={{ height: 28 }} />
            <p className="caption" style={{ marginTop: "var(--space-lg)" }}>
              Horizontal logo — the supplied wordmark is our horizontal lockup
            </p>
          </div>
        </Reveal>

        <PendingTray title="Stacked logo" />
        <PendingTray title="Secondary / alternate lockup" />
      </div>

      <h3 className="logo-group-title">Logo color specifications</h3>
      <Reveal className="spec-list">
        <div className="spec-row">
          <span className="spec-label">Wordmark — primary</span>
          <span className="spec-value">
            #4C207F letterforms · colored glyphs
            {glyphHexes.map(([hex]) => (
              <SwatchDot key={hex} color={hex} />
            ))}
          </span>
        </div>
        <div className="spec-row">
          <span className="spec-label">Glyph accents</span>
          <span className="spec-value">
            {glyphHexes.map(([hex]) => hex).join(" · ")}
            {glyphHexes.map(([hex]) => (
              <SwatchDot key={hex} color={hex} />
            ))}
          </span>
        </div>
        <div className="spec-row">
          <span className="spec-label">Reversed / white</span>
          <span className="spec-value">White letterforms with colored glyphs</span>
        </div>
        <div className="spec-row">
          <span className="spec-label">Monochrome</span>
          <span className="spec-value">Solid white — for dark fields</span>
        </div>
        <div className="spec-row">
          <span className="spec-label">Mark — legacy</span>
          <span className="spec-value">Fills predate the current palette — pending reconciliation</span>
        </div>
      </Reveal>

      <h3 className="logo-group-title">Approved combinations</h3>
      <div className="grid-3">
        <Reveal className="panel panel-white" style={{ minHeight: 180, display: "grid", placeItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <img src={wordmarkUrl} alt="Numena on white" height={40} style={{ height: 40 }} />
            <p className="caption" style={{ marginTop: "var(--space-lg)" }}>On white</p>
          </div>
        </Reveal>

        <Reveal className="panel" style={{ minHeight: 180, display: "grid", placeItems: "center", background: "var(--pale-lavender)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <img src={wordmarkUrl} alt="Numena on pale lavender" height={40} style={{ height: 40 }} />
            <p className="caption" style={{ marginTop: "var(--space-lg)" }}>On pale lavender</p>
          </div>
        </Reveal>

        <Reveal className="panel" style={{ minHeight: 180, display: "grid", placeItems: "center", background: "var(--deep-purple)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <img src={wordmarkWhiteUrl} alt="Numena on deep purple" height={40} style={{ height: 40 }} />
            <p className="caption" style={{ marginTop: "var(--space-lg)", color: "rgba(255,255,255,0.72)" }}>On deep purple</p>
          </div>
        </Reveal>
      </div>

      <h3 className="logo-group-title">Clear space</h3>
      <Reveal className="panel panel-white">
        <img src={clearSpaceUrl} alt="Numena logo clear-space diagram" style={{ height: 180, display: "block" }} />
        <p className="caption" style={{ marginTop: "var(--space-lg)" }}>
          Clear-space diagram, as supplied
        </p>
      </Reveal>

      <h3 className="logo-group-title">Minimum sizes</h3>
      <div className="grid-2">
        <PendingTray title="Digital minimum size" />
        <PendingTray title="Print minimum size" />
        <PendingTray title="Small-format usage" />
      </div>

      <h3 className="logo-group-title">When to use what</h3>
      <div className="grid-2">
        <PendingTray title="Use the full lockup vs. the symbol" />
        <PendingTray title="Placement, alignment &amp; surrounding content" />
        <PendingTray title="Logo on photography" />
        <PendingTray title="Logo on gradients" />
      </div>

      <h3 className="logo-group-title">Partnership &amp; lockups</h3>
      <div className="grid-2">
        <PendingTray title="Co-branding / partner logos" />
        <PendingTray title="Logo lockups" />
      </div>

      <h3 className="logo-group-title">Incorrect logo usage</h3>
      <Reveal className="rule-list">
        {[
          "Do not stretch the logo",
          "Do not distort the artwork",
          "Do not rotate the logo",
          "Do not recolor the logo",
          "Do not add effects",
          "Do not add shadows",
          "Do not modify proportions",
          "Do not rearrange elements",
          "Do not alter the wordmark",
          "Do not place on low-contrast backgrounds",
          "Do not add unapproved containers or shapes",
        ].map((rule) => (
          <div key={rule} className="rule-item">
            <Icon name="xmark" size={16} />
            <span>{rule}</span>
          </div>
        ))}
      </Reveal>

      <h3 className="logo-group-title">Responsive &amp; product presence</h3>
      <div className="grid-2">
        <PendingTray title="Responsive logo behavior" />
        <PendingTray title="Favicon / browser icon" />
        <PendingTray title="App / product icon" />
        <PendingTray title="Social media avatar" />
      </div>

      <h3 className="logo-group-title">Files &amp; formats</h3>
      <Reveal className="panel panel-white">
        <p className="body" style={{ marginTop: 0 }}>
          <strong>Supplied masters</strong> — assets/logo: logo.svg (mark), logo-text.svg
          (wordmark), logo-bw.svg &amp; logo-text-bw.svg (monochrome), logo-text-white.svg
          (reversed), plus logo.png and logo-clear-space.png. All works are used unmodified.
        </p>
      </Reveal>
      <div className="grid-2" style={{ marginTop: "var(--space-lg)" }}>
        <PendingTray
          title="Export formats"
          note="SVG + PNG supplied to date; other deliveries pending"
        />
        <PendingTray title="File naming conventions" />
        <PendingTray title="Master logo files" note="Originals are archived in assets/logo; canonical master set pending" />
        <PendingTray title="Print-ready files" />
      </div>

      <h3 className="logo-group-title">Monochrome — on black</h3>
      <div className="grid-2">
        <Reveal className="panel" style={{ minHeight: 200, display: "grid", placeItems: "center", background: "#000000" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <img src={wordmarkBwUrl} alt="Numena wordmark, white on black" height={40} style={{ height: 40 }} />
            <p className="caption" style={{ marginTop: "var(--space-lg)", color: "rgba(255,255,255,0.72)" }}>
              White wordmark — on black
            </p>
          </div>
        </Reveal>

        <Reveal className="panel" style={{ minHeight: 200, display: "grid", placeItems: "center", background: "#000000" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <img src={markBwUrl} alt="Numena symbol, white on black" height={88} style={{ height: 88 }} />
            <p className="caption" style={{ marginTop: "var(--space-lg)", color: "rgba(255,255,255,0.72)" }}>
              White symbol — on black
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal className="measure" style={{ marginTop: "var(--space-3xl)" }}>
        <p className="caption" style={{ paddingTop: "var(--space-lg)", borderTop: "1px solid var(--color-rule)" }}>
          Shown exactly as supplied in assets/logo — no recoloring. Clear-space, minimum-size, and
          misuse rules listed above follow this presentation; pending trays are not yet documented
          in the brand system. The mark's own hex values predate the current palette and are
          pending a reconciliation decision.
        </p>
      </Reveal>
    </Section>
  );
}
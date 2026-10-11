import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { avoidWords, voiceExamples, voicePairs, voicePrinciples, voiceTest, weAreNot } from "../data/content";

/** 09 — Voice */
export function Voice() {
  return (
    <Section id="voice" numeral="11" title="Voice">
      <div className="split">
        <Reveal as="h2" className="h2" style={{ maxWidth: "14ch" }}>
          Thoughtful, clear, grounded.
        </Reveal>

        <Reveal className="measure">
          <p className="body-large">
            We take complex human work seriously without sounding complicated to prove it. Not a
            medical institution, not an AI company, not a productivity tool. We sound human.
          </p>
        </Reveal>
      </div>

      {/* Four principles */}
      <div className="grid-2" style={{ marginTop: "var(--space-3xl)", gap: "var(--space-xl)" }}>
        {voicePrinciples.map((p) => (
          <Reveal key={p.title} className="panel panel-white">
            <p className="h4" style={{ fontWeight: 500 }}>
              {p.title}
            </p>
            <p style={{ marginTop: "var(--space-sm)", color: "var(--color-text-soft)" }}>{p.body}</p>
          </Reveal>
        ))}
      </div>

      {/* Prefer over */}
      <Reveal style={{ marginTop: "var(--space-3xl)" }}>
        <p className="label">Prefer this over that</p>
        <div style={{ display: "grid", gap: "var(--space-lg)", marginTop: "var(--space-md)" }}>
          {voicePairs.map((pair) => (
            <div
              key={pair.avoid}
              className="panel panel-white voice-pair"
            >
              <div>
                <p className="caption">Not this</p>
                <p style={{ marginTop: "var(--space-xxs)", color: "var(--color-text-soft)" }}>“{pair.avoid}”</p>
              </div>
              <div>
                <p className="caption" style={{ color: "var(--color-primary)" }}>This</p>
                <p style={{ marginTop: "var(--space-xxs)" }}>“{pair.prefer}”</p>
              </div>
              <p className="caption voice-pair-why">{pair.why}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* How we sound */}
      <Reveal style={{ marginTop: "var(--space-3xl)" }}>
        <p className="label">How we sound</p>
        <ul className="sound-grid" style={{ marginTop: "var(--space-md)" }}>
          {weAreNot.map(([are, arent]) => (
            <li key={are} className="panel panel-white sound-item">
              <span className="caption" style={{ color: "var(--color-primary)" }}>We are</span>
              <p className="label" style={{ marginTop: 2 }}>
                {are}
              </p>
              <span className="caption" style={{ display: "block", marginTop: "var(--space-xs)" }}>
                We aren’t {arent.toLowerCase()}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Avoid words */}
      <Reveal style={{ marginTop: "var(--space-3xl)" }}>
        <p className="label">Corporate phrases we avoid</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-xs)", marginTop: "var(--space-md)" }}>
          {avoidWords.map((w) => (
            <span key={w} className="chip">
              {w}
            </span>
          ))}
        </div>
      </Reveal>

      {/* Example copy */}
      <Reveal style={{ marginTop: "var(--space-3xl)" }}>
        <p className="label">Sentences in the voice</p>
        <div className="grid-2" style={{ marginTop: "var(--space-md)", gap: "var(--space-lg)" }}>
          {voiceExamples.map((quote) => (
            <blockquote
              key={quote}
              style={{
                margin: 0,
                paddingLeft: "var(--space-lg)",
                borderLeft: "2px solid var(--bright-lilac)",
              }}
            >
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-h4)", lineHeight: "var(--text-h4-line)" }}>
                {quote}
              </p>
            </blockquote>
          ))}
        </div>
      </Reveal>

      {/* Simple test */}
      <Reveal style={{ marginTop: "var(--space-3xl)" }}>
        <p className="label">A simple test, before publishing</p>
        <ul className="checked-list" style={{ marginTop: "var(--space-md)", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {voiceTest.map(([q, a]) => (
            <li key={q} className="panel panel-white" style={{ display: "block", padding: "var(--space-md)" }}>
              <p className="label">{q}</p>
              <p className="caption" style={{ marginTop: "var(--space-xxs)" }}>{a}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
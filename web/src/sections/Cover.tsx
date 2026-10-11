/** 01 — Cover */
export function Cover() {
  return (
    <section id="cover" className="cover" aria-label="Numena — brand presentation">
      <div className="shell">
        <h1 className="display" style={{ marginTop: "0", maxWidth: "16ch" }}>
          A thoughtful space for better clinical reasoning.
        </h1>

        <p
          className="body-large measure"
          style={{ marginTop: "var(--space-xl)", color: "var(--color-text-soft)" }}
        >
          Numena helps psychologists reason about their cases with more care — and keeps that
          reasoning visible over time. From observation through to decision, nothing has to be
          reconstructed from memory.
        </p>
      </div>
    </section>
  );
}
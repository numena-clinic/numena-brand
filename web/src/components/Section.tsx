import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  numeral: string;
  title: string;
  children: ReactNode;
};

/** Numbered section with kicked rule and title. */
export function Section({ id, numeral, title, children }: SectionProps) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="shell">
        <p className="section-kicker" id={`${id}-title`}>
          <span className="section-numeral">
            {numeral} — {title}
          </span>
        </p>
        {children}
      </div>
    </section>
  );
}
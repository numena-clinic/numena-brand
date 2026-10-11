import type { ComponentType, ReactNode } from "react";
import { Icon } from "./Icon";

export type Page = { id: string; label: string; Component: ComponentType };

type PageNavProps = {
  pages: Page[];
  current: string;
};

/**
 * Previous / next pager shown at the foot of every page. Links are hash
 * routes (#/<id>) so the multi-page deck stays dependency-free and deep-linkable.
 */
export function PageNav({ pages, current }: PageNavProps) {
  const index = pages.findIndex((p) => p.id === current);
  const prev = index > 0 ? pages[index - 1] : null;
  const next = index >= 0 && index < pages.length - 1 ? pages[index + 1] : null;

  const link = (page: Page, dir: "prev" | "next", children: ReactNode) => (
    <a className="page-nav-link" href={`#/${page.id}`} data-dir={dir}>
      <span className="page-nav-hint">{dir === "prev" ? "Previous" : "Next"}</span>
      <span className="page-nav-label">{children}</span>
    </a>
  );

  return (
    <nav className="page-nav" aria-label="Deck navigation">
      <div className="shell">
        {prev && link(prev, "prev", <Icon name="arrow-left" size={20} />)}
        {next && link(next, "next", <Icon name="arrow-right" size={20} />)}
      </div>
    </nav>
  );
}
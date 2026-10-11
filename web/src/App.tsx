import { useEffect, useState } from "react";

import "./styles/global.css";
import "./styles/components.css";

import { Header } from "./components/Header";
import { PageNav, type Page } from "./components/PageNav";
import { nav } from "./data/content";

import { Cover } from "./sections/Cover";
import { BrandIdea } from "./sections/BrandIdea";
import { PurposeAudience } from "./sections/PurposeAudience";
import { Positioning } from "./sections/Positioning";
import { Principles } from "./sections/Principles";
import { LogoSection } from "./sections/LogoSection";
import { Typography } from "./sections/Typography";
import { Color } from "./sections/Color";
import { VisualLanguage } from "./sections/VisualLanguage";
import { Product } from "./sections/Product";
import { Voice } from "./sections/Voice";
import { Closing } from "./sections/Closing";

const navLabels = Object.fromEntries(nav.map((n) => [n.id, n.label]));

export const pages: Page[] = [
  { id: "cover", label: "Cover", Component: Cover },
  { id: "brand-idea", label: navLabels["brand-idea"], Component: BrandIdea },
  { id: "purpose-audience", label: navLabels["purpose-audience"], Component: PurposeAudience },
  { id: "positioning", label: navLabels["positioning"], Component: Positioning },
  { id: "principles", label: navLabels["principles"], Component: Principles },
  { id: "logo", label: navLabels["logo"], Component: LogoSection },
  { id: "typography", label: navLabels["typography"], Component: Typography },
  { id: "color", label: navLabels["color"], Component: Color },
  { id: "visual", label: navLabels["visual"], Component: VisualLanguage },
  { id: "product", label: navLabels["product"], Component: Product },
  { id: "voice", label: navLabels["voice"], Component: Voice },
  { id: "closing", label: "Closing", Component: Closing },
];

const pageIds = new Set(pages.map((p) => p.id));

/** Route is a hash like #/cover. Bare hashes (#main, #some-anchor) are ignored. */
function routeFromHash(hash: string): string {
  const match = /^#\/([a-zA-Z0-9-]+)$/.exec(hash);
  return match && pageIds.has(match[1]) ? match[1] : "cover";
}

export default function App() {
  const [pageId, setPageId] = useState(() => routeFromHash(window.location.hash));
  const page = pages.find((p) => p.id === pageId) ?? pages[0];

  useEffect(() => {
    const onHashChange = () => setPageId(routeFromHash(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    document.title = `Numena — ${page.label}`;
    window.scrollTo(0, 0);
  }, [page.label]);

  const Component = page.Component;

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header current={pageId} />

      <main id="main">
        <Component />
        {pageId !== "cover" && <PageNav pages={pages} current={pageId} />}
      </main>

      <footer className="site-footer">
        <div className="shell" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "var(--space-md)" }}>
          <p className="caption">
            Numena — brand presentation. Built from the brand documents in brand/ and summarized in BRAND.md.
          </p>
          <p className="caption">
            Tiempos Text © Klim Type Foundry, licensed — excluded from the repo. Albert Sans ©
            Jonas Hecksher, SIL OFL 1.1. Icons © Iconoir, MIT.
          </p>
        </div>
      </footer>
    </>
  );
}
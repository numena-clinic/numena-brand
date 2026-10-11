import { nav } from "../data/content";
import { Logo } from "./Logo";

type HeaderProps = {
  current: string;
};

/**
 * Sticky header: wordmark, desktop anchor links, and a native <select>
 * jump-menu on small screens. Links are hash routes (#/<id>) — each section
 * is its own page, so the select keeps navigation available and keyboard
 * accessible when the link row doesn't fit.
 */
export function Header({ current }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="shell site-header-inner">
        <a href="#/cover" className="brand-link" aria-label="Numena — back to cover">
          <Logo variant="wordmark" height={28} alt="" />
        </a>

        <nav className="site-nav" aria-label="Sections">
          <ul className="site-nav-list">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  className={`site-header-link${current === item.id ? " is-active" : ""}`}
                  href={`#/${item.id}`}
                  aria-current={current === item.id ? "page" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <select
            id="jump"
            aria-label="Jump to section"
            className="jump-select"
            value={nav.some((n) => n.id === current) ? current : ""}
            onChange={(e) => {
              if (e.target.value) window.location.hash = `#/${e.target.value}`;
            }}
          >
            <option value="" disabled>
              Sections
            </option>
            {nav.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </nav>
      </div>
    </header>
  );
}
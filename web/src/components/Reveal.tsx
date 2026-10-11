import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
};

/**
 * Subtle entrance reveal. Adds .is-visible when the element scrolls into view.
 * Respects prefers-reduced-motion (element starts visible, no transition).
 */
export function Reveal({ children, as = "div", className = "", id, style }: RevealProps) {
  const Tag = as as "div";
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} id={id} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
}
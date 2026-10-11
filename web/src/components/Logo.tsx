import markUrl from "../../../assets/logo/logo.svg";
import wordmarkUrl from "../../../assets/logo/logo-text.svg";

type LogoProps = {
  variant?: "mark" | "wordmark";
  alt?: string;
  height?: number;
  className?: string;
};

/** The Numena mark / wordmark, used exactly as provided in assets/logo. */
export function Logo({ variant = "mark", alt, height, className = "" }: LogoProps) {
  const src = variant === "mark" ? markUrl : wordmarkUrl;
  const h = height ?? (variant === "mark" ? 48 : 24);
  return (
    <img
      src={src}
      alt={alt ?? (variant === "mark" ? "Numena mark" : "Numena")}
      height={h}
      style={{ height: h }}
      className={className}
    />
  );
}
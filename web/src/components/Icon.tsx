import type { ComponentPropsWithoutRef } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChatBubble,
  ClockRotateRight,
  Compass,
  Eye,
  Label,
  Link,
  Plus,
  Quote,
  TriangleFlag,
  Xmark,
} from "iconoir-react";

const icons = {
  eye: Eye,
  label: Label,
  compass: Compass,
  quote: Quote,
  "triangle-flag": TriangleFlag,
  link: Link,
  calendar: Calendar,
  chat: ChatBubble,
  clock: ClockRotateRight,
  plus: Plus,
  "arrow-down": ArrowDown,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  xmark: Xmark,
} as const;

type IconProps = {
  name: keyof typeof icons;
  size?: 16 | 20 | 24 | 32;
  title?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"svg">, "name">;

/**
 * Iconoir regular icons (pinned 7.11.0), imported per icon so only used icons
 * ship. Sizes are restricted to the system's four: 16 / 20 / 24 / 32.
 * Two core-set icons (tag, flag) do not exist under those names in 7.11.0;
 * nearest matches (Label, TriangleFlag) are the recorded swap.
 */
export function Icon({ name, size = 20, title, className = "", ...rest }: IconProps) {
  const Component = icons[name];
  return (
    <Component
      width={size}
      height={size}
      strokeWidth={size <= 16 ? 1.75 : 1.5}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      className={className}
      {...rest}
    />
  );
}
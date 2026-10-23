import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  eyebrowClassName?: string;
  className?: string;
};

/** No wrapper: preserves existing section grids and heading spacing. */
export function SectionHeading({ eyebrow, children, as: Heading = "h2", eyebrowClassName = "event-eyebrow", className }: SectionHeadingProps) {
  return <>{eyebrow && <span className={eyebrowClassName}>{eyebrow}</span>}<Heading className={className}>{children}</Heading></>;
}

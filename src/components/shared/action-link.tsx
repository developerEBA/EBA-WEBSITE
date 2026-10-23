import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type ActionLinkProps = Omit<ComponentProps<typeof Link>, "children"> & {
  children: ReactNode;
  variant?: "yellow" | "green" | "outline-light";
  showArrow?: boolean;
  arrowSize?: number;
};

/** Shared pill CTA with the site's existing hover, pressed and focus styles. */
export function ActionLink({ children, variant = "green", showArrow = true, arrowSize = 16, className = "", ...props }: ActionLinkProps) {
  return <Link {...props} className={`pill ${variant} ${className}`.trim()}>{children}{showArrow && <ArrowUpRight size={arrowSize} aria-hidden="true"/>}</Link>;
}

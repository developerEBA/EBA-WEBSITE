import Link from "next/link";
import type { ComponentProps } from "react";

type BrandLogoProps = Omit<ComponentProps<typeof Link>, "href" | "children">;

export function BrandLogo({ className = "", ...props }: BrandLogoProps) {
  return <Link {...props} href="/" className={`logo ${className}`.trim()} aria-label="EBA home">eba<span>.</span></Link>;
}

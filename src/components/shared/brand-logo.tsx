"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type BrandLogoProps = Omit<ComponentProps<typeof Link>, "href" | "children">;

let clickSound: HTMLAudioElement | undefined;

export function BrandLogo({ className = "", onClick, ...props }: BrandLogoProps) {
  return <Link {...props} href="/#site-top" scroll className={`logo ${className}`.trim()} aria-label="EBA home" onClick={event => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    clickSound ??= new Audio("/audio/eba-click.wav");
    clickSound.volume = 0.45;
    clickSound.currentTime = 0;
    void clickSound.play().catch(() => {});
  }}>eba<span>.</span></Link>;
}

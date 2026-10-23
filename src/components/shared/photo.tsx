import Image from "next/image";
import type { CSSProperties } from "react";

type PhotoProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  position?: CSSProperties["objectPosition"];
};

/** The containing class controls aspect ratio; the image fills it without layout shift. */
export function Photo({ src, alt, className = "event-photo", sizes = "(max-width: 700px) 100vw, 60vw", position }: PhotoProps) {
  return <div className={className}><Image src={src} alt={alt} fill sizes={sizes} style={{ objectFit: "cover", objectPosition: position }}/></div>;
}

import { Entrance } from "@/components/shared/motion";
import { Photo } from "@/components/shared/photo";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function ServiceCaseStudy({ eyebrow, title, description, image, alt, href, dark = false }: { eyebrow: string; title: string; description: string; image: string; alt: string; href: string; dark?: boolean }) {
  return <section className={`service-case ${dark ? "service-case-dark" : "service-case-light"}`}><div className="services-shell service-case-grid">
    <Entrance direction={dark ? "left" : "right"} className="service-case-image"><Photo src={image} alt={alt} className="service-photo"/></Entrance>
    <Entrance direction={dark ? "right" : "left"} className="service-case-copy"><span className="services-eyebrow">{eyebrow}</span><h2>{title}</h2><p>{description}</p><Link className="services-text-link" href={href}>View Case Study <ArrowUpRight size={16}/></Link></Entrance>
  </div></section>;
}

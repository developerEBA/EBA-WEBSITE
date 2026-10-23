import { ActionLink } from "@/components/shared/action-link";
import Image from "next/image";
import { getSourceImage, teamPortraits } from "@/lib/site-images";
import Link from "next/link";
import { ArrowUpRight, UserRound } from "lucide-react";
import { Entrance } from "@/components/shared/motion";

export function AtlasImage({ source, x, y, w, h, label, className = "" }: { source: "about" | "founder"; x: number; y: number; w: number; h: number; label: string; className?: string }) {
  const asset = getSourceImage(source, x, y);
  return <div className={`atlas-image ${className}`} style={{ position: "relative", aspectRatio: `${w}/${h}`, overflow: "hidden" }}><Image src={asset.src} alt={label} fill sizes="(max-width: 760px) 100vw, 50vw" style={{ objectFit: "cover" }}/></div>;
}
// Kept as a compatibility export: the shared footer now renders the unified contact section once.
export function PageNewsletter() { return null; }
export function ContactButton({ children = "Book a Consultation", yellow = false, href = "/consultation" }: { children?: React.ReactNode; yellow?: boolean; href?: string }) { return <ActionLink variant={yellow ? "yellow" : "green"} href={href} arrowSize={15}>{children}</ActionLink>; }
export function TeamPlaceholder({ name, role, lead = false }: { name: string; role: string; lead?: boolean }) { return <Entrance className={lead ? "team-card team-lead" : "team-card"} delay={lead ? 0 : 0.12}><div className="team-placeholder" role="img" aria-label={teamPortraits[name] ? `${name}, ${role}` : `${name}: portrait placeholder`}>{teamPortraits[name] ? <Image src={teamPortraits[name]} alt={`${name}, ${role}`} fill sizes="(max-width: 760px) 50vw, 30vw" style={{ objectFit: "cover", objectPosition: name === "Gbotemi" ? "50% 12%" : "50% 50%" }}/> : <><UserRound strokeWidth={.7}/><span>PORTRAIT COMING SOON</span></>}</div><h3>{name}</h3><p>{role}</p>{lead && <Link href="/about/meet-the-founder">View Profile <ArrowUpRight size={12}/></Link>}</Entrance>; }






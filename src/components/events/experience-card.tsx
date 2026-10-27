import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PresentedEvent } from "@/lib/event-presentation";
export function ExperienceCard({ event }: { event: PresentedEvent }) {
  return <article className="experience-card"><Link href={`/events/${event.id}`} className="experience-card-image" aria-label={`Explore ${event.title}`}><div className={event.isPhotograph ? "experience-card-picture" : "experience-card-picture is-artwork"}>{event.cover && <Image src={event.cover} alt={event.coverAlt} fill sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw" style={{ objectFit: event.isPhotograph ? "cover" : "contain", objectPosition: event.isPhotograph ? "50% 35%" : "center" }}/>}</div><span className="experience-card-category">{event.group}{event.partnership ? " / Partnership" : ""}</span></Link><div className="experience-card-copy"><span className="experience-card-date">{event.date}</span><h3><Link href={`/events/${event.id}`}>{event.displayTitle}</Link></h3><div className="experience-card-bottom"><span>{event.location}</span><Link href={`/events/${event.id}`} aria-label={`View ${event.title}`}><ArrowUpRight size={20}/></Link></div></div></article>;
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, MapPin, CalendarDays } from "lucide-react";
import type { EventStory } from "@/lib/event-content";
import { Photo } from "@/components/shared/photo";
function EventCover({ event }: { event: EventStory }) {
  return <div className={`event-cover event-cover-${event.poster}`}>
    {event.image ? <Image src={event.image} alt={event.title} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" style={{ objectFit: "cover" }}/> : <div className="event-cover-placeholder" role="img" aria-label={`Cover placeholder for ${event.title}`}><span>EBA / EXPERIENCES</span><strong>{event.poster === "golf" ? "Purpose in play." : event.poster === "culture" ? "Culture. Community." : event.poster === "connection" ? "Sip. Share. Connect." : "Moments that matter."}</strong><span className="event-cover-note">EVENT IMAGE COMING SOON</span></div>}
  </div>;
}


export function EventCard({ event, index = 0, variant = "collection" }: { event: EventStory; index?: number; variant?: "collection" | "related" }) {
 const reduce = useReducedMotion();
 if (variant === "related") return <Link href={`/events/${event.id}`} className="event-related-link">{event.image && <Photo src={event.image} alt={event.title} className="event-related-image" sizes="(max-width: 700px) 100vw, 33vw" position="center 25%"/>}<span>{event.category}</span><h3>{event.title}</h3><span className="event-text-link">Explore Event <ArrowUpRight size={16}/></span></Link>;
 return (<motion.article className="event-card" initial="hidden" animate={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: false, amount: .15 }} variants={{ hidden: { opacity: 0, y: reduce ? 0 : 45, scale: reduce ? 1 : .96 }, visible: { opacity: 1, y: 0, scale: 1 } }} transition={{ duration: reduce ? 0 : .65, delay: reduce ? 0 : index * .12, ease: [.22, 1, .36, 1] }} whileHover={reduce ? undefined : { y: -7 }}>
              <Link href={`/events/${event.id}`} className="event-card-anchor" aria-label={`Explore Event: ${event.title}`}><EventCover event={event}/>
              <div className="event-card-content"><span className="event-card-location"><MapPin size={15}/>{event.location}</span><h3>{event.title}</h3>
                <div className="event-card-meta">{event.placeholder ? <span className="event-coming-soon">Coming soon</span> : <><span><CalendarDays size={13}/>{event.date}</span></>}</div>
                <span className="event-card-link">Explore Event<ArrowUpRight size={18}/></span>
              </div></Link>
            </motion.article>);
}

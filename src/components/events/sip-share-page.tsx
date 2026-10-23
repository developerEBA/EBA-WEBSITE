import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, MapPin } from "lucide-react";
import { Entrance } from "@/components/shared/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { ActionLink } from "@/components/shared/action-link";
import { PageNewsletter } from "@/components/about-shared";
import type { EventStory } from "@/lib/event-content";

export function SipSharePage({ event }: { event: EventStory }) {
  return <main className="events-page sip-event-page">
    <section className="sip-hero">
      {event.image && <Image src={event.image} alt="Sip and Share event artwork with raised glasses" fill sizes="100vw" preload style={{ objectFit: "cover", objectPosition: "center 43%" }}/>}
      <div className="sip-hero-shade"/>
      <div className="event-container sip-hero-content"><Link href="/events/all#event-stories" className="event-back"><ArrowLeft size={16}/> All Events</Link><Entrance direction="left"><SectionHeading as="h1" eyebrow="THE ENIIVY EXPERIENCE · CONVERSATIONS & CONNECTION">A little sip.<br/>A lot to <em>share.</em></SectionHeading><p>The Eniivy Experience<br/><strong>Sip &amp; Share Edition</strong></p><span className="sip-hero-note">Good company. Real conversation.</span></Entrance></div>
    </section>
    <section className="sip-event-facts event-container" aria-label="Event information"><div><CalendarDays size={21}/><span>DATE<strong>November 18–19, 2025</strong></span></div><div><MapPin size={21}/><span>VENUE<strong>Lagos, Nigeria</strong></span></div><div><Clock3 size={21}/><span>TIME<strong>8:00 AM – 5:00 PM</strong><small>Africa/Lagos</small></span></div></section>
    <section className="sip-story event-container"><Entrance direction="left"><span className="event-eyebrow">SIP & SHARE EDITION</span><h2>The Eniivy Experience.<br/>Connection starts<br/>with a conversation.</h2><p>{event.summary}</p><p>A moment to pause, enjoy good company and make room for meaningful exchanges.</p><ActionLink href="/events/all" variant="green">Explore More Events</ActionLink></Entrance><Entrance direction="right" delay={.12}><div className="sip-poster">{event.image && <Image src={event.image} alt="The Eniivy Experience Sip and Share Edition official poster" width={1080} height={1350} sizes="(max-width: 700px) 90vw, 35vw" style={{ width: "100%", height: "auto" }}/>}</div></Entrance></section>
    <section className="sip-next event-container"><Entrance><SectionHeading eyebrow="YOUR NEXT EXPERIENCE">Bring people together.<br/>Make the moment matter.</SectionHeading></Entrance><Entrance direction="right"><p>Let’s shape a brand experience around the people, purpose and conversations that matter to you.</p><ActionLink href="mailto:admin@enibrand.com?subject=Planning%20an%20experience%20with%20EBA" variant="yellow">Plan an Experience</ActionLink></Entrance></section>
    <PageNewsletter/>
  </main>;
}

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, MapPin } from "lucide-react";
import { ActionLink } from "@/components/shared/action-link";
import { SectionHeading } from "@/components/shared/section-heading";
import { Entrance } from "@/components/shared/motion";
import { PageNewsletter } from "@/components/about-shared";
import type { EventStory } from "@/lib/event-content";

const moments = [
  "Golfers sharing a moment on the course at Play With Stephen",
  "A golfer in the Play With Stephen tournament colours",
  "Guests connecting at the tournament welcome area",
  "The tournament community gathered on the green",
  "A player enjoying a moment during the golf tournament",
  "Golfers walking the course together",
  "The Swing for Autism community posing together at the event",
];

export function SwingForAutismPage({ event }: { event: EventStory }) {
  return <main className="events-page swing-event-page">
    <section className="swing-hero"><div className="event-container">
      <Link href="/events/all#event-stories" className="event-back"><ArrowLeft size={16}/> All Events</Link>
      <div className="swing-hero-grid">
        <Entrance direction="left"><SectionHeading as="h1" eyebrow="EBA EVENTS · 7TH EDITION">Play With Stephen<br/><em>Swing for Autism.</em></SectionHeading><p>The 7th edition of the Play With Stephen Golf Tournament, bringing purpose, community and the game of golf together in support of autism awareness.</p><div className="swing-tags"><span>AUGUST 2026</span><span>LAGOS, NIGERIA</span><span>GOLF FOR AUTISM</span></div><ActionLink href="https://pwsgolftournament.com" target="_blank" rel="noopener noreferrer" variant="yellow">Explore Play With Stephen</ActionLink></Entrance>
        <Entrance direction="right" delay={.12}><div className="swing-poster">{event.image && <Image src={event.image} alt="Official Play With Stephen Swing for Autism 2026 tournament poster" width={819} height={1024} sizes="(max-width: 700px) 90vw, 38vw" preload style={{ width: "100%", height: "auto" }}/>}</div></Entrance>
      </div>
    </div></section>
    <section className="swing-facts event-container" aria-label="Event information"><div><CalendarDays size={20}/><span>DATE<strong>August 21–23, 2026</strong></span></div><div><Clock3 size={20}/><span>TIME<strong>From 8:00 AM</strong></span></div><div><MapPin size={20}/><span>VENUE<strong>Lakowe Lakes &amp; Country Estate, Lagos</strong></span></div></section>
    <section className="swing-story event-container"><Entrance><SectionHeading eyebrow="THE EVENT">Swinging for<br/>something bigger.</SectionHeading></Entrance><Entrance direction="right"><p>Play With Stephen – Swing For Autism returned for its seventh edition in Lagos, bringing the tournament’s community together around golf and a shared commitment to autism awareness.</p><p>The 2026 edition was hosted at Lakowe Lakes &amp; Country Estate, creating a memorable setting for sport, connection and purpose.</p></Entrance></section>
    <section className="swing-gallery event-container" aria-labelledby="swing-gallery-title"><div className="swing-gallery-heading"><Entrance><span className="event-eyebrow">EVENT MOMENTS</span><h2 id="swing-gallery-title">On the green.</h2></Entrance><Entrance direction="right"><p>A look at the people, energy and moments that define the Play With Stephen experience.</p></Entrance></div><div className="swing-gallery-grid">{moments.map((alt, index) => <Entrance key={alt} className={`swing-moment swing-moment-${index + 1}`} delay={(index % 3) * .08}><Image src={`/images/events/swing-for-autism/moment-${index + 1}.jpg`} alt={alt} fill sizes={index === 6 ? "(max-width: 700px) 90vw, 85vw" : "(max-width: 700px) 90vw, 45vw"} style={{ objectFit: "cover" }}/></Entrance>)}</div></section>
    <PageNewsletter/>
  </main>;
}

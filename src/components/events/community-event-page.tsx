import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, MapPin } from "lucide-react";
import { Entrance } from "@/components/shared/motion";
import { ActionLink } from "@/components/shared/action-link";
import { SectionHeading } from "@/components/shared/section-heading";
import { PageNewsletter } from "@/components/about-shared";
import type { EventStory } from "@/lib/event-content";

type CommunityEventPageProps = {
  event: EventStory;
  title: string;
  edition: string;
  description: string;
  schedule: string;
  scheduleNote?: string;
  photos?: { src: string; alt: string }[];
  storyTitle?: string;
};

/** Shared poster, event information and photo-story layout for community experiences. */
export function CommunityEventPage({ event, title, edition, description, schedule, scheduleNote, photos = [], storyTitle }: CommunityEventPageProps) {
  return <main className="events-page community-event-page">
    <section className="community-event-intro"><div className="event-container"><Link href="/events/all#event-stories" className="event-back"><ArrowLeft size={16}/> All Events</Link><Entrance><SectionHeading as="h1" eyebrow="THE ENIIVY EXPERIENCE">{title}<br/><em>{edition}</em></SectionHeading><p>{description}</p></Entrance></div></section>
    <div className="event-container community-event-grid"><div>
      <Entrance><div className="community-event-poster">{event.image && <Image src={event.image} alt={`${event.title} official event poster`} width={640} height={800} sizes="(max-width: 800px) 90vw, 58vw" preload style={{ width: "100%", height: "auto" }}/>}</div></Entrance>
      <section className="community-event-gallery" aria-label="About the experience"><Entrance><SectionHeading eyebrow="THE EXPERIENCE">{storyTitle ?? <>Good stories.<br/>Even better company.</>}</SectionHeading><p>{event.summary}</p></Entrance>{photos.length > 0 && <div className="community-event-photos">{photos.map((photo, index) => <Entrance key={photo.src} className="community-event-photo" delay={index * .08}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 800px) 90vw, 58vw" style={{ objectFit: "cover" }}/></Entrance>)}</div>}</section>
    </div><aside className="community-event-aside" aria-label="Event information"><Entrance direction="right"><div className="community-event-info"><span className="event-eyebrow">AT A GLANCE</span><h2>A shared experience.</h2><dl><div><dt><CalendarDays size={18}/>Date</dt><dd>{event.date}</dd></div><div><dt><Clock3 size={18}/>Time</dt><dd>{schedule}<small>Africa/Lagos</small></dd></div><div><dt><MapPin size={18}/>Venue</dt><dd>{event.location}</dd></div></dl>{scheduleNote && <p className="community-schedule-note">{scheduleNote}</p>}</div><div className="community-event-ended"><span>PAST EVENT</span><h2>The moment lives on.</h2><p>This event has ended. Explore more experiences, or talk to us about bringing your community together.</p><ActionLink href="/events/all" variant="yellow">Explore All Events</ActionLink></div></Entrance></aside></div>
    <section className="community-event-contact event-container"><Entrance><SectionHeading eyebrow="YOUR NEXT EXPERIENCE">Bring people together.<br/>Give them a story to share.</SectionHeading></Entrance><Entrance direction="right"><p>From a close-knit community gathering to a wider brand experience, let’s make the connections count.</p><ActionLink href="mailto:admin@enibrand.com?subject=Planning%20a%20community%20experience" variant="yellow">Plan an Experience</ActionLink></Entrance></section><PageNewsletter/>
  </main>;
}

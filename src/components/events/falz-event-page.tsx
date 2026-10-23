import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, MapPin } from "lucide-react";
import { Entrance } from "@/components/shared/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { ActionLink } from "@/components/shared/action-link";
import { PageNewsletter } from "@/components/about-shared";
import type { EventStory } from "@/lib/event-content";

const photos = [
  "Falz and a guest posing at the Owambe Edition photo backdrop",
  "Guests arriving in colourful outfits for the community hangout",
  "Falz greeting a guest at the event photo backdrop",
  "Falz posing with a guest in a turquoise outfit",
  "EBA and Bahd Gang Community Hangout event branding",
  "Falz performing with a microphone at the community hangout",
];

export function FalzEventPage({ event }: { event: EventStory }) {
  return <main className="events-page falz-event-page">
    <section className="falz-intro"><div className="event-container"><Link href="/events/all#event-stories" className="event-back"><ArrowLeft size={16}/> All Events</Link><Entrance><SectionHeading as="h1" eyebrow="EBA EVENTS · CULTURE & COMMUNITY">Falz Community Hangout<br/><em>Owambe Edition.</em></SectionHeading><p>Culture, colour and community in the same room. A look back at the Falz Community Hangout, Owambe style.</p></Entrance></div></section>
    <div className="event-container falz-content-grid"><div className="falz-main">
      <Entrance><div className="falz-main-poster">{event.image && <Image src={event.image} alt="Falz Community Hangout Owambe Edition official event poster" width={640} height={832} sizes="(max-width: 800px) 90vw, 58vw" preload style={{ width: "100%", height: "auto" }}/>}</div></Entrance>
      <section className="falz-gallery" aria-labelledby="falz-gallery-title"><Entrance><SectionHeading eyebrow="EVENT MOMENTS">The people. The energy.</SectionHeading><p id="falz-gallery-title">A few moments from the Owambe Edition.</p></Entrance><div className="falz-gallery-grid">{photos.map((alt, index) => <Entrance key={alt} className={`falz-photo falz-photo-${index + 1}`} delay={(index % 3) * .08}><Image src={`/images/events/falz/moment-${index + 1}.webp`} alt={alt} fill sizes={index === 5 ? "(max-width: 800px) 90vw, 58vw" : "(max-width: 800px) 45vw, 20vw"} style={{ objectFit: "cover" }}/></Entrance>)}</div></section>
    </div><aside className="falz-sidebar" aria-label="Event details and tickets"><Entrance direction="right"><div className="falz-info-card"><span className="event-eyebrow">THE DETAILS</span><h2>One community.<br/>A shared experience.</h2><dl><div><dt><CalendarDays size={17}/>Date</dt><dd>May 2–3, 2026</dd></div><div><dt><Clock3 size={17}/>Schedule</dt><dd>8:00 AM – 5:00 PM<br/><small>Africa/Lagos</small></dd></div><div><dt><MapPin size={17}/>Venue</dt><dd>Lagos, Nigeria</dd></div></dl><p className="falz-time-note">The event poster announces a 4:00 PM start.</p></div><div className="falz-ticket-card"><span className="falz-status">PAST EVENT</span><h2>Tickets</h2><p>This event has ended. Ticket sales are closed.</p><button type="button" disabled className="falz-tickets-closed">Ticket sales closed</button><p>Planning your own experience?</p><ActionLink href="mailto:admin@enibrand.com?subject=Planning%20a%20community%20experience" variant="yellow">Talk to EBA</ActionLink></div></Entrance></aside></div>
    <section className="falz-closing event-container"><Entrance><SectionHeading eyebrow="BEYOND THE MOMENT">More than a gathering.<br/>Something to remember.</SectionHeading></Entrance><Entrance direction="right"><p>Explore more of the experiences that bring people, culture and purpose together.</p><ActionLink href="/events/all">Explore All Events</ActionLink></Entrance></section>
    <PageNewsletter/>
  </main>;
}

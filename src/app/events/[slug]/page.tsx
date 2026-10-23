import type { Metadata } from "next";
import { ActionLink } from "@/components/shared/action-link";
import { SectionHeading } from "@/components/shared/section-heading";
import { EventCard } from "@/components/events/event-card";
import { SwingForAutismPage } from "@/components/events/swing-for-autism-page";
import { FalzEventPage } from "@/components/events/falz-event-page";
import { SipSharePage } from "@/components/events/sip-share-page";
import { AchimotaEventPage } from "@/components/events/achimota-event-page";
import { CommunityEventPage } from "@/components/events/community-event-page";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { eventStories } from "@/lib/event-content";
import { Entrance } from "@/components/shared/motion";
import { PageNewsletter } from "@/components/about-shared";
import "../../about/about-pages.css";
import "../events.css";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return eventStories.map(event => ({ slug: event.id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = eventStories.find(item => item.id === slug);
  return { title: event ? `${event.title} | EBA Events` : "Event Not Found | EBA", description: event?.summary };
}
export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = eventStories.find(item => item.id === slug);
  if (!event) notFound();
  if (event.id === "swing-for-autism") return <SwingForAutismPage event={event}/>;
  if (event.id === "falz-community-hangout") return <FalzEventPage event={event}/>;
  if (event.id === "sip-and-share") return <SipSharePage event={event}/>;
  if (event.id === "swing-for-autism-ghana") return <AchimotaEventPage event={event}/>;
  if (event.id === "independence-edition") return <CommunityEventPage event={event} title="It Can Only Be Naija." edition="The Eniivy Experience." description="An evening of fun, movies, and conversations with the CommuniTEE. Familiar stories, shared laughter, and those unmistakable moments that could only happen in Naija." schedule="4:00 PM · poster start time" scheduleNote="Event listing: October 15–17, 2024. The original Independence Edition poster announces October 27 at 4 PM." storyTitle="Our stories. Our humour. Our Naija."/>;
  if (event.id === "movies-and-conversations") return <CommunityEventPage event={event} title="Movies & Conversations." edition="An evening with the CommuniTEE." description="A shared screen. Fresh perspectives. An evening of fun, movies and conversations, with room for food, games, networking and new connections." schedule="8:00 AM – 5:00 PM" scheduleNote="The listing shows July 20–21; the event poster announces July 27, 2025 at 3 PM, with doors closing at 5 PM." photos={[
    { src: "/images/events/movies/moment-1.webp", alt: "Three guests posing together at Movies and Conversations" },
    { src: "/images/events/movies/moment-2.webp", alt: "Guests sharing a relaxed conversation at The Eniivy Experience" },
    { src: "/images/events/movies/moment-3.webp", alt: "Two guests smiling together at the community event" },
  ]}/>;
  const related = eventStories.filter(item => item.id !== slug).slice(0, 3);
  return <main className="events-page event-detail-page">
    <section className="event-detail-intro"><div className="event-container">
      <Link href="/events/all#event-stories" className="event-back"><ArrowLeft size={16}/> All Events</Link>
      <div className="event-detail-grid">
        <Entrance direction="left"><SectionHeading eyebrow={event.category} as="h1">{event.title}</SectionHeading><div className="event-detail-facts"><span><MapPin size={19}/>{event.location}</span><span><CalendarDays size={19}/>{event.date}</span></div><p>{event.summary}</p><ActionLink href={`mailto:admin@enibrand.com?subject=${encodeURIComponent(`Enquiry: ${event.title}`)}`} variant="yellow">Enquire About This Event</ActionLink></Entrance>
        <Entrance direction="right" delay={.12}><div className="event-full-poster">{event.image && <Image src={event.image} alt={`Official artwork for ${event.title}`} width={1080} height={1350} sizes="(max-width: 700px) 100vw, 45vw" preload style={{ width: "100%", height: "auto" }}/>}</div></Entrance>
      </div>
    </div></section>
    <section className="event-detail-story"><div className="event-container"><Entrance><SectionHeading eyebrow="THE EXPERIENCE">People. Purpose.<br/>A reason to connect.</SectionHeading></Entrance><Entrance direction="right"><p>{event.summary}</p><p>For the event recap, attendance enquiries or information about collaborating on a similar experience, get in touch with EBA.</p><a href="mailto:admin@enibrand.com" className="event-text-link">Talk to the EBA team <ArrowUpRight size={16}/></a></Entrance></div></section>
    <section className="event-related"><div className="event-container"><Entrance><SectionHeading eyebrow="KEEP EXPLORING">More shared experiences.</SectionHeading></Entrance><div className="event-related-grid">{related.map(item => <EventCard key={item.id} event={item} variant="related"/>)}</div></div></section>
    <PageNewsletter/>
  </main>;
}

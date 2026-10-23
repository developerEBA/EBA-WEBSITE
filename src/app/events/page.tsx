import type { Metadata } from "next";
import { Photo as EventPhoto } from "@/components/shared/photo";
import { ActionLink } from "@/components/shared/action-link";
import { SectionHeading } from "@/components/shared/section-heading";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import EventHero from "@/components/event-hero";
import EventListing from "@/components/event-listing";
import { Entrance } from "@/components/shared/motion";
import { PageNewsletter } from "@/components/about-shared";
import "../about/about-pages.css";
import "./events.css";

export const metadata: Metadata = { title: "Events & Experiences | Eni Brand Architect", description: "Experiences that live beyond the moment. EBA brings strategy, storytelling and execution together to create meaningful brand experiences." };

export default function EventsPage() {
  return <main className="events-page" id="events-top"><EventHero/>
    <section className="event-introduction"><div className="event-container event-intro-grid"><Entrance direction="left"><SectionHeading eyebrow="WHAT WE CREATE">More Than<br/>An Event.<br/>An <em>Experience.</em></SectionHeading></Entrance><Entrance direction="right" delay={.12}><p>An event should reflect what the brand represents, strengthen its connection with people and create something worth remembering. EBA brings strategy, production, communication and amplification together to build experiences that make sense before, during and after the event.</p><p>We create physical experiences that extend the brand rather than simply gathering people in a room.</p><Link href="/about/meet-the-founder" className="event-text-link">Discover Our Approach <ArrowUpRight size={15}/></Link></Entrance></div></section>
    <section className="event-gallery-section"><div className="event-container"><Entrance><SectionHeading eyebrow="People. Purpose. Presence." eyebrowClassName="eyebrow">A feeling you take with you.</SectionHeading></Entrance><div className="event-editorial-gallery"><div className="event-gallery-main"><Entrance direction="left"><figure><EventPhoto src="/images/events/conversations.webp" alt="Guests sharing conversation and connection at The Eniiy Experience"/><figcaption>The Eniiy Experience / Conversations, connection and shared moments</figcaption></figure></Entrance><div className="event-gallery-bottom"><Entrance delay={.1}><figure><EventPhoto src="/images/events/together-in-the-room.png" alt="A group gathered together at The Eniiy Experience"/><figcaption>The Eniiy Experience / Together in the room</figcaption></figure></Entrance><Entrance direction="right" delay={.2}><h3>Every detail serves the<br/>bigger story.</h3></Entrance></div></div><div className="event-gallery-side"><Entrance direction="right" delay={.15}><figure><EventPhoto src="/images/events/people-and-connection.webp" alt="Guests connecting and celebrating together"/><figcaption>People, purpose and a shared experience</figcaption></figure></Entrance><Entrance direction="right" delay={.2}><figure><EventPhoto src="/images/events/conference-experience.png" alt="Guests seated at a conference and brand gathering"/><figcaption>A room full of ideas and possibilities</figcaption></figure></Entrance></div></div></div></section>
    <EventListing/>
    <section className="event-manifesto"><div className="event-container"><span className="event-eyebrow">BEFORE. DURING. LONG AFTER.</span><div className="event-manifesto-grid"><Entrance><h2>The best experiences<br/>don’t end when<br/><span>the room empties.</span></h2></Entrance><Entrance direction="right" delay={.18}><p>Experience, strategy, communications and amplification should work together. We connect what happens in the room with the story that lives beyond it.</p></Entrance></div></div></section>
    <section className="event-contact" id="plan-an-event"><div className="event-container event-contact-grid"><Entrance direction="left"><SectionHeading eyebrow="YOUR NEXT EXPERIENCE">Let’s Create Something<br/>Worth Remembering.</SectionHeading><p>From intimate brand conversations to large-scale experiences, we bring the right ideas, people and execution together.</p><ActionLink href="mailto:admin@enibrand.com?subject=Planning%20an%20experience%20with%20EBA" variant="yellow">Plan an Experience</ActionLink></Entrance><Entrance direction="right"><figure><EventPhoto src="/images/events/conversations.webp" alt="A shared moment at The Eniiy Experience"/><figcaption>The Eniiy Experience / A shared moment</figcaption></figure></Entrance></div></section>
    <PageNewsletter/>
  </main>;
}

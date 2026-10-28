import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import EventHero from "@/components/event-hero";
import { ExperienceCollection } from "@/components/events/experience-collection";
import { ExperienceGallery } from "@/components/events/experience-gallery";
import { Entrance } from "@/components/shared/motion";
import "./events.css";
import "./events-refresh.css";
export const metadata: Metadata = { title: "Events & Experiences | Eni Brand Architect", description: "Explore EBA events, community gatherings and purpose-led experiences. Strategy, production and communications that bring people together." };
export default function EventsPage() {
  return <main className="events-page events-refresh" id="events-top"><EventHero/><section className="experience-intro experience-shell"><Entrance><span className="experience-eyebrow">A room is just the beginning.</span><h2>We bring people together.<br/><em>We make it mean something.</em></h2></Entrance><Entrance delay={.1}><p>From the first invitation to the last conversation, we think about the whole experience. The idea, the people, the production and the story that carries on afterwards.</p></Entrance></section><section className="experience-feature experience-shell"><div className="experience-feature-photo"><Image src="/images/events/swing-for-autism/moment-2.webp" alt="Golfers at Play With Stephen Swing for Autism in Lagos" fill sizes="(max-width: 760px) 90vw, 55vw" style={{objectFit:"cover",objectPosition:"50% 30%"}}/><span className="experience-feature-tag">Sport. Community. Purpose.</span></div><div className="experience-feature-copy"><span className="experience-eyebrow">A recent experience / August 2026</span><h2>More than<br/><em>a round of golf.</em></h2><p>Play With Stephen brings golfers together around autism awareness. Discover the seventh edition of Swing for Autism at Lakowe Lakes.</p><span className="experience-feature-place">Lakowe Lakes, Lagos · 21–23 August 2026</span><Link href="/events/swing-for-autism">Inside the experience <ArrowRight size={18}/></Link></div></section><ExperienceCollection/><ExperienceGallery/><section className="experience-invitation experience-shell"><div><span className="experience-eyebrow">Your next experience</span><h2>Let’s make it worth<br/><em>showing up for.</em></h2><p>A launch, a conversation or a community gathering.<br/>Tell us what you want to bring together.</p></div><Link className="pill yellow" href="/consultation?service=experiences-and-activations">Plan an experience <ArrowUpRight size={17}/></Link></section></main>;
}

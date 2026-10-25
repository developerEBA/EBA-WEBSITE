import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ExperienceCollection } from "@/components/events/experience-collection";
import "../events.css";
import "../events-refresh.css";
export const metadata: Metadata = { title: "All Events | Eni Brand Architect", description: "Explore the complete collection of EBA events, community experiences, culture and purpose-led gatherings." };
export default function AllEventsPage(){return <main className="events-page events-refresh events-archive"><header className="experience-shell experience-archive-heading"><Link href="/events"><ArrowLeft size={16}/> Events & experiences</Link><h1>Every room.<br/><em>Every story.</em></h1><p>Explore our collection of community gatherings, cultural moments and purpose-led experiences.</p></header><ExperienceCollection all/></main>;}

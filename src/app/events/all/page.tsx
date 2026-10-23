import type { Metadata } from "next";
import EventHero from "@/components/event-hero";
import EventListing from "@/components/event-listing";
import { PageNewsletter } from "@/components/about-shared";
import "../../about/about-pages.css";
import "../events.css";
export const metadata: Metadata = { title: "All Events | Eni Brand Architect", description: "Explore EBA events, community experiences and conversations." };
export default function AllEventsPage() { return <main className="events-page" id="events-top"><EventHero/><EventListing pageSize={6} allEvents/><PageNewsletter/></main>; }

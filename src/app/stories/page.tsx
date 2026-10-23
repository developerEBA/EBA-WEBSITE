import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { storySummaries } from "@/lib/stories";
import { StoryCard } from "@/components/stories/story-card";
import { StoriesExplorer } from "@/components/stories/stories-explorer";
import { Entrance } from "@/components/shared/motion";
import "./stories.css";
export const metadata: Metadata = { title: "Stories & Insights | Eni Brand Architect", description: "Ideas, perspectives and news from EBA on branding, PR, communication, marketing, media and growth." };
export default function StoriesPage() {
  const recent = storySummaries.toSorted((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
  const lead = recent[0];
  const picks = recent.slice(1, 3);
  return <main className="journal-page journal-home"><section className="stories-opening journal-shell"><Entrance className="stories-opening-title"><div><span className="journal-eyebrow">From Eni Brand Architect</span><h1>Stories<span>.</span></h1></div><p>The people, ideas and conversations<br/>shaping how brands show up.</p></Entrance><Entrance delay={.12}><article className="stories-cover"><Link className="stories-cover-image" href={`/stories/${lead.slug}`} aria-label={`Read ${lead.title}`}>{lead.image && <Image src={lead.image} alt={lead.imageAlt} fill preload sizes="(max-width: 760px) 90vw, 60vw" style={{ objectFit: "cover", objectPosition: "50% 40%" }}/>}</Link><div className="stories-cover-copy"><span className="stories-cover-label">The latest story</span><div><h2><Link href={`/stories/${lead.slug}`}>{lead.title}</Link></h2><p>{lead.excerpt}</p></div><Link className="stories-cover-read" href={`/stories/${lead.slug}`}><span>Read the story <small>{lead.readingMinutes} min read</small></span><ArrowUpRight size={24}/></Link></div></article></Entrance></section><section className="stories-picks journal-shell"><div className="stories-picks-heading"><h2>Fresh from<br/><em>the journal.</em></h2><span>The most recent news and perspectives from EBA.</span></div><div className="stories-picks-grid">{picks.map(story => <StoryCard key={story.id} story={story} featured/>)}</div></section><StoriesExplorer stories={storySummaries}/></main>;
}




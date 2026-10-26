import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { storiesByType } from "@/lib/stories";
import { storyDate, storyUrl } from "@/lib/story-format";
import { SubmissionInvitation } from "@/components/stories/submission-invitation";
import { JournalNavigation } from "@/components/stories/journal-navigation";
import { StoryCard } from "@/components/stories/story-card";
import "./stories.css";

export const metadata: Metadata = { title: "Stories | The EBA Journal", description: "Press releases, articles and insights, and original story series from Eni Brand Architect." };
export default function StoriesPage() {
  const releases = storiesByType("press-release");
  const articles = storiesByType("article");
  const lead = articles[0];
  return <main className="journal-page journal-home journal-editorial-redesign">
    <header className="journal-shell journal-new-masthead">
      <div className="journal-new-title"><div><span className="journal-eyebrow">The EBA Journal</span><h1>A world of<br/><em>stories.</em></h1></div><p>Ideas that shape brands.<br/>News that moves the conversation.<br/>Stories from EBA and beyond.</p></div>
      <JournalNavigation />
    </header>
    <section className="journal-shell journal-front-page" aria-label="Latest from the journal">
      <div className="journal-editorial-lead"><div className="journal-section-line"><span>IN FOCUS / ARTICLES & INSIGHTS</span><Link href="/stories/articles">View all <ArrowUpRight size={15}/></Link></div>
        {lead && <article><Link className="journal-lead-visual" href={storyUrl(lead)} aria-label={`Read ${lead.title}`}>{lead.image && <Image src={lead.image} alt={lead.imageAlt} fill preload sizes="(max-width: 850px) 90vw, 55vw" style={{objectFit:"cover",objectPosition:"50% 35%"}}/>}<span>{lead.publication || "THE EBA PERSPECTIVE"}</span></Link><div className="journal-lead-story"><div className="journal-meta"><span>{lead.mediaCoverage ? "MEDIA COVERAGE" : "ARTICLE"}</span><time dateTime={lead.date}>{storyDate(lead.date)}</time><span>{lead.readingMinutes} MIN READ</span></div><h2><Link href={storyUrl(lead)}>{lead.title}</Link></h2><p>{lead.excerpt}</p><Link className="journal-text-link" href={storyUrl(lead)}>Read the story <ArrowUpRight size={18}/></Link></div></article>}
      </div>
      <aside className="journal-news-desk"><div className="journal-section-line"><span>THE NEWSROOM</span><span>01—04</span></div><h2>Press <em>Releases.</em></h2><p className="journal-desk-intro">Official news from EBA and the brands we work with.</p><div className="journal-compact-releases">{releases.slice(0,4).map(story=><StoryCard key={story.id} story={story}/>)}</div><Link className="journal-text-link" href="/stories/press-releases">All press releases <ArrowUpRight size={18}/></Link></aside>
    </section>
    <section className="journal-shell journal-more-perspectives"><div className="journal-section-line"><span>ARTICLES & INSIGHTS</span><Link href="/stories/articles">Explore the editorial <ArrowUpRight size={15}/></Link></div><div className="journal-perspectives-heading"><h2>A little perspective.<br/><em>A bigger conversation.</em></h2><p>Branding, PR, marketing and the ideas shaping business and culture.</p></div><div className="journal-editorial-grid">{articles.slice(1,4).map(story=><StoryCard key={story.id} story={story} featured/>)}</div></section>
    <section className="journal-shell journal-series-invitation"><div className="journal-series-symbol" aria-hidden="true"><BookOpen size={58} strokeWidth={1}/></div><div><span className="journal-eyebrow">Story Series / The reading room</span><h2>Every chapter<br/><em>opens a new world.</em></h2><p>Original storytelling, episode by episode.</p></div><Link className="pill yellow" href="/stories/series">Explore Story Series <ArrowUpRight size={17}/></Link></section>
    <div className="journal-shell journal-contribute"><SubmissionInvitation /></div>
  </main>;
}

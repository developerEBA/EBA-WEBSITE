import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { storiesByType, type Story } from "@/lib/stories";
import { storyDate, storyHeadingId, storyTypeLabel } from "@/lib/story-format";
import { StoryBody } from "./story-body";
import { StoryCard } from "./story-card";
import { ReadingProgress, ShareStory } from "./article-interactions";

export function JournalEntry({ story }: { story: Story }) {
  const press = story.contentType === "press-release";
  const channel = press ? "/stories/press-releases" : "/stories/articles";
  const headings = story.blocks.map((block, index) => ({ block, index })).filter(({ block }) => block.type === "h2");
  const related = storiesByType(story.contentType).filter(item => item.slug !== story.slug).slice(0, 3);
  return <main className={`journal-page journal-article-page ${press ? "press-release-page" : "insight-article-page"}`}>
    {!press && <ReadingProgress />}
    <article>
      <header className="journal-article-header journal-shell">
        <Link className="journal-back" href={channel}><ArrowLeft size={16} /> {press ? "Press Releases" : "Articles & Insights"}</Link>
        {press && <div className="press-masthead"><span className="press-wordmark">eba<span>.</span></span><div><strong>EBA NEWSROOM</strong><span>Official announcements & media statements</span></div></div>}
        <div className="journal-meta"><span className={`journal-type-badge type-${story.contentType}`}>{story.mediaCoverage ? "MEDIA COVERAGE" : storyTypeLabel(story.contentType)}</span><time dateTime={story.date}>{press ? "Release date: " : ""}{storyDate(story.date)}</time>{!press && <span>{story.readingMinutes} min read</span>}</div>
        <h1>{story.title}</h1>
        {press ? <div className="press-publication-line"><span>{story.organisation || "Published in the EBA newsroom"}</span><ShareStory label={press ? "Copy release link" : "Copy article link"} /></div> : <div className="journal-byline"><span className="journal-author-mark" aria-hidden="true">{story.mediaCoverage ? <ArrowUpRight size={23}/> : <>eba<span>.</span></>}</span><div><strong>{story.mediaCoverage ? story.originalAuthor || story.publication : story.author || "Eni Brand Architect"}</strong><span>{story.publication || "Articles & Insights"}</span></div><ShareStory label={press ? "Copy release link" : "Copy article link"} /></div>}
      </header>
      {story.image && <div className="journal-article-cover journal-shell"><Image src={story.image} alt={story.imageAlt} fill preload sizes="90vw" style={{ objectFit: "contain" }} /></div>}
      <div className="journal-reading-layout journal-shell"><aside className="journal-reading-aside">{headings.length > 0 && <details className="journal-contents"><summary>{press ? "In this release" : "In this article"}</summary><nav aria-label="Article contents">{headings.map(({ block, index }) => <a href={`#${storyHeadingId(index)}`} key={index}>{block.segments.map(segment => segment.text).join("")}</a>)}</nav></details>}</aside><div className="journal-prose">{story.mediaCoverage && <aside className="journal-coverage-source"><span className="journal-eyebrow">Published by {story.publication}</span><p>A brief summary of external media coverage.</p><a href={story.sourceUrl} target="_blank" rel="noopener noreferrer">Read the full article on {story.publication} <ArrowUpRight size={17}/></a></aside>}<StoryBody blocks={story.blocks} />
        {press && <aside className="press-contact"><span className="journal-eyebrow">{story.mediaContact ? "Media contact" : "Enquiries about this release"}</span>{story.mediaContact ? <p>{story.mediaContact}</p> : <p>Contact Eni Brand Architect at <a href="mailto:hello@enibrand.com">hello@enibrand.com</a>.</p>}</aside>}
        <footer className="journal-article-end"><ShareStory label={press ? "Copy release link" : "Copy article link"} /><Link href={channel}>{press ? "Back to Press Releases" : "Back to Articles & Insights"} <ArrowUpRight size={16} /></Link></footer>
      </div></div>
    </article>
    <section className="journal-related journal-shell"><h2>{press ? "Related announcements." : "More Articles & Insights."}</h2><div className="journal-card-grid">{related.map(item => <StoryCard key={item.id} story={item} />)}</div></section>
  </main>;
}

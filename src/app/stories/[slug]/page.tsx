import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { stories, storySummaries, storyDate, storyHeadingId, type StorySegment } from "@/lib/stories";
import { StoryCard } from "@/components/stories/story-card";
import { ReadingProgress, ShareStory } from "@/components/stories/article-interactions";
import "../stories.css";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return stories.map(story => ({ slug: story.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const story = stories.find(item => item.slug === slug); return { title: story ? `${story.title} | EBA Stories` : "Story not found | EBA", description: story?.excerpt }; }
function Inline({ segments }: { segments: StorySegment[] }) { return <>{segments.map((segment,i) => segment.type === "strong" ? <strong key={i}>{segment.text}</strong> : segment.type === "em" ? <em key={i}>{segment.text}</em> : segment.type === "link" && segment.href ? <Link href={segment.href} key={i}>{segment.text}</Link> : <span key={i}>{segment.text}</span>)}</>; }
export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = stories.find(item => item.slug === slug);
  if (!story) notFound();
  const headings = story.blocks.map((block,index) => ({ block,index })).filter(({ block }) => block.type === "h2");
  const related = storySummaries.filter(item => item.slug !== slug).toSorted((a,b) => Number(b.category === story.category)-Number(a.category === story.category)).slice(0,3);
  return <main className="journal-page journal-article-page"><ReadingProgress/><article><header className="journal-article-header journal-shell"><Link className="journal-back" href="/stories"><ArrowLeft size={16}/> All stories</Link><div className="journal-meta"><span>{story.category}</span><time dateTime={story.date}>{storyDate(story.date)}</time><span>{story.readingMinutes} min read</span></div><h1>{story.title}</h1><div className="journal-byline"><span className="journal-author-mark" aria-hidden="true">eba<span>.</span></span><div><strong>Eni Brand Architect</strong><span>EBA Stories</span></div><ShareStory/></div></header>{story.image && <div className="journal-article-cover journal-shell"><Image src={story.image} alt={story.imageAlt} fill preload sizes="90vw" style={{ objectFit: "contain" }}/></div>}<div className="journal-reading-layout journal-shell"><aside className="journal-reading-aside">{headings.length ? <details className="journal-contents"><summary>In this story</summary><nav aria-label="Article contents">{headings.map(({ block,index }) => <a href={`#${storyHeadingId(index)}`} key={index}>{block.segments.map(item=>item.text).join("")}</a>)}</nav></details> : null}</aside><div className="journal-prose">{story.blocks.map((block,index) => block.type === "h2" ? <h2 id={storyHeadingId(index)} key={index}><Inline segments={block.segments}/></h2> : block.type === "h3" ? <h3 id={storyHeadingId(index)} key={index}><Inline segments={block.segments}/></h3> : block.type === "li" ? <ul key={index}><li><Inline segments={block.segments}/></li></ul> : block.type === "blockquote" ? <blockquote key={index}><Inline segments={block.segments}/></blockquote> : <p key={index}><Inline segments={block.segments}/></p>)}<footer className="journal-article-end"><span>Words from the EBA journal.</span><ShareStory/><Link href="/stories">Back to all stories <ArrowUpRight size={16}/></Link></footer></div></div></article><section className="journal-related journal-shell"><span className="journal-eyebrow">Keep the ideas coming</span><h2>Another perspective.</h2><div className="journal-card-grid">{related.map(item => <StoryCard key={item.id} story={item}/>)}</div></section></main>;
}



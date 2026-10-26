import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { publicSeries, publishedEpisodes, episodeNavigation } from "@/lib/story-series";
import { storyDate } from "@/lib/story-format";
import { StoryBody } from "@/components/stories/story-body";
import { EpisodeReading } from "@/components/stories/series-reading";
import "../../../stories.css";

type Props = { params: Promise<{ seriesSlug: string; episodeSlug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return publicSeries().flatMap(series => publishedEpisodes(series).map(episode => ({ seriesSlug: series.slug, episodeSlug: episode.slug }))); }
export async function generateMetadata({ params }: Props) { const { seriesSlug, episodeSlug } = await params; const series = publicSeries().find(item => item.slug === seriesSlug); const episode = series && episodeNavigation(series, episodeSlug).current; return { title: episode ? `${episode.title} | ${series!.title} | EBA` : "Episode not found | EBA" }; }
export default async function EpisodePage({ params }: Props) {
  const { seriesSlug, episodeSlug } = await params; const series = publicSeries().find(item => item.slug === seriesSlug); if (!series) notFound(); const { current, previous, next } = episodeNavigation(series, episodeSlug); if (!current) notFound();
  return <main className="journal-page series-reader-page"><EpisodeReading seriesSlug={seriesSlug} episodeSlug={episodeSlug} /><article className="series-reader-shell"><header><Link className="journal-back" href={`/stories/series/${seriesSlug}`}><ArrowLeft size={15} /> Back to Series</Link><span className="journal-eyebrow">{series.title} / Episode {String(current.number).padStart(2, "0")}</span><h1>{current.title}</h1><div className="journal-meta"><span>{series.author}</span>{current.publishedAt && <time dateTime={current.publishedAt}>{storyDate(current.publishedAt)}</time>}<span>{current.readingMinutes} min read</span></div></header>{current.image && <Image className="series-episode-image" src={current.image} alt={current.imageAlt || current.title} width={1000} height={650} />}<div className="journal-prose series-episode-prose" id="episode-body"><StoryBody blocks={current.blocks} /></div><footer className="series-episode-end"><span className="journal-eyebrow">{series.title}</span>{next ? <><h2>The story continues.</h2><Link className="pill green" href={`/stories/series/${seriesSlug}/${next.slug}`}>Read Next Episode <ArrowRight size={16} /></Link><p>Episode {String(next.number).padStart(2, "0")} · {next.title}</p></> : <><h2>{series.seriesStatus === "Completed" ? "You’ve reached the end." : "You’re up to date."}</h2><p>{series.seriesStatus === "Completed" ? "You’ve read every published episode in this series." : "You’ve reached the latest published episode. New chapters will appear here when published."}</p></>}</footer><nav className="series-episode-navigation" aria-label="Episode navigation">{previous ? <Link href={`/stories/series/${seriesSlug}/${previous.slug}`}>← Previous Episode</Link> : <span>First episode</span>}<Link href={`/stories/series/${seriesSlug}`}>All Episodes</Link>{next && <Link href={`/stories/series/${seriesSlug}/${next.slug}`}>Next Episode →</Link>}</nav></article></main>;
}

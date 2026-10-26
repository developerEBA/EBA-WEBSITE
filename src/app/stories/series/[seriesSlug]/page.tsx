import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { publicSeries, episodeSummaries } from "@/lib/story-series";
import { storyDate } from "@/lib/story-format";
import { ContinueSeries } from "@/components/stories/series-reading";
import "../../stories.css";

type Props = { params: Promise<{ seriesSlug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return publicSeries().map(series => ({ seriesSlug: series.slug })); }
export async function generateMetadata({ params }: Props) { const { seriesSlug } = await params; const series = publicSeries().find(item => item.slug === seriesSlug); return { title: `${series?.title || "Series not found"} | EBA Story Series`, description: series?.description }; }
export default async function SeriesDetailPage({ params }: Props) {
  const { seriesSlug } = await params; const series = publicSeries().find(item => item.slug === seriesSlug); if (!series) notFound(); const episodes = episodeSummaries(series);
  return <main className="journal-page journal-series-page"><section className="series-detail-opening journal-shell"><Link className="journal-back" href="/stories/series"><ArrowLeft size={15} /> Story Series</Link><div className="series-detail-grid"><div><span className="journal-type-badge type-series">STORY SERIES</span><h1>{series.title}</h1><p>{series.description}</p><div className="series-facts"><span>By {series.author}</span><span>{series.seriesStatus}</span><span>{episodes.length} available {episodes.length === 1 ? "episode" : "episodes"}</span>{series.genre && <span>{series.genre}</span>}</div><div className="series-start-actions">{episodes[0] && <Link className="pill green" href={`/stories/series/${seriesSlug}/${episodes[0].slug}`}>Start Reading <ArrowRight size={16} /></Link>}<ContinueSeries seriesSlug={seriesSlug} episodeSlugs={episodes.map(episode => episode.slug)} /></div><small>Continue Reading uses this browser’s saved progress. No account is required.</small></div>{series.cover && <div className="series-detail-cover"><Image src={series.cover} alt={series.coverAlt || series.title} fill preload sizes="(max-width:760px) 90vw, 40vw" /></div>}</div></section><section className="series-episode-list journal-shell"><span className="journal-eyebrow">Available chapters</span><h2>Every episode, in order.</h2>{episodes.length ? <ol>{episodes.map(episode => <li key={episode.slug}><Link href={`/stories/series/${seriesSlug}/${episode.slug}`}><span className="series-episode-number">{String(episode.number).padStart(2, "0")}</span><div><h3>{episode.title}</h3><p>{episode.publishedAt && storyDate(episode.publishedAt)} · {episode.readingMinutes} min read</p></div><ArrowRight size={20} aria-hidden="true" /></Link></li>)}</ol> : <p>No episodes are available to read yet.</p>}</section></main>;
}

import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { publishedEpisodes, type StorySeries } from "@/lib/story-series";

export function SeriesCard({ series }: { series: StorySeries }) {
  const count = publishedEpisodes(series).length;
  return <article className="journal-series-card"><Link className="journal-series-cover" href={`/stories/series/${series.slug}`} aria-label={`Explore ${series.title}`}>{series.cover ? <Image src={series.cover} alt={series.coverAlt || series.title} fill sizes="(max-width:700px) 90vw, 40vw" /> : <BookOpen size={65} strokeWidth={1} aria-hidden="true" />}<span className="journal-type-badge type-series">STORY SERIES</span></Link><div><span className="journal-eyebrow">{series.seriesStatus} · {count} available {count === 1 ? "episode" : "episodes"}</span><h2><Link href={`/stories/series/${series.slug}`}>{series.title}</Link></h2><p>{series.description}</p><small>{series.author}{series.genre ? ` · ${series.genre}` : ""}</small></div></article>;
}

import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { publicSeries } from "@/lib/story-series";
import { JournalNavigation } from "@/components/stories/journal-navigation";
import { SeriesCard } from "@/components/stories/series-card";
import "../stories.css";

export const metadata = { title: "Story Series | The EBA Journal", description: "Original episodic storytelling from EBA. Follow each chapter or read all published episodes consecutively." };
export default function SeriesPage() {
  const series = publicSeries();
  return <main className="journal-page journal-series-page"><header className="journal-channel-opening journal-shell"><Link href="/stories" className="journal-back"><ArrowLeft size={15} /> All Stories</Link><span className="journal-eyebrow">Original episodic stories</span><h1>One story.<br /><em>Chapter by chapter.</em></h1><p>Follow a story episode by episode, or settle in and read all available chapters consecutively.</p><JournalNavigation active="series" /></header><section className="series-library journal-shell"><div className="series-library-heading"><span className="journal-type-badge type-series">STORY SERIES</span><h2>The reading room.</h2></div>{series.length > 0 ? <div className="journal-series-grid">{series.map(item => <SeriesCard key={item.slug} series={item} />)}</div> : <div className="series-empty"><BookOpen size={50} strokeWidth={1.1} aria-hidden="true" /><h2>The first chapter<br /><em>starts here.</em></h2><p>No story series has been published yet. Approved series and their available episodes will appear in this reading room.</p><Link href="/stories/articles" className="pill green">Explore Articles & Insights →</Link></div>}</section></main>;
}

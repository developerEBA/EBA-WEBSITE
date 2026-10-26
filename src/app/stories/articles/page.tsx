import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { storiesByType } from "@/lib/stories";
import { JournalNavigation } from "@/components/stories/journal-navigation";
import { StoriesExplorer } from "@/components/stories/stories-explorer";
import "../stories.css";

export const metadata = { title: "Articles & Insights | The EBA Journal", description: "Articles, perspectives and insights on branding, PR, marketing, business and culture from the EBA journal." };
export default function ArticlesPage() {
  return <main className="journal-page journal-channel-page"><header className="journal-channel-opening journal-shell"><Link href="/stories" className="journal-back"><ArrowLeft size={15} /> All Stories</Link><span className="journal-eyebrow">The EBA Journal / Editorial</span><h1>Articles <em>& Insights.</em></h1><p>Perspectives on branding, PR, marketing and culture, alongside coverage from leading publications.</p><JournalNavigation active="articles" /></header><StoriesExplorer stories={storiesByType("article")} showFilters={false} title="Articles & Insights" /></main>;
}

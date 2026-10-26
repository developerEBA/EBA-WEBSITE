import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { storiesByType } from "@/lib/stories";
import { JournalNavigation } from "@/components/stories/journal-navigation";
import { StoriesExplorer } from "@/components/stories/stories-explorer";
import "../stories.css";

export const metadata = { title: "Press Releases | EBA Newsroom", description: "Official announcements, media statements and publicity information from EBA and its clients." };
export default function PressReleasesPage() {
  return <main className="journal-page journal-channel-page journal-newsroom"><header className="journal-channel-opening journal-shell"><Link href="/stories" className="journal-back"><ArrowLeft size={15} /> All Stories</Link><span className="journal-eyebrow">EBA Newsroom / Official communications</span><h1>Press <em>Releases.</em></h1><p>Official announcements, media statements and news from EBA and the organisations we work with.</p><JournalNavigation active="press-releases" /></header><StoriesExplorer stories={storiesByType("press-release")} showFilters={false} title="All Press Releases" /></main>;
}

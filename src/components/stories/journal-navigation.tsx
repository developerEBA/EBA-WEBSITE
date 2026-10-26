import Link from "next/link";
import { ArrowUpRight, BookOpen, FileText, Newspaper } from "lucide-react";
import { storiesByType } from "@/lib/stories";
import { publicSeries } from "@/lib/story-series";

export function JournalNavigation({ active }: { active?: "press-releases" | "articles" | "series" }) {
  const sections = [
    { slug: "press-releases", title: "Press Releases", description: "Official announcements, media statements and company news.", count: storiesByType("press-release").length, icon: Newspaper },
    { slug: "articles", title: "Articles & Insights", description: "Perspectives on brands, PR, business and the conversations shaping our industry.", count: storiesByType("article").length, icon: FileText },
    { slug: "series", title: "Story Series", description: "Original stories to follow episode by episode, or read in one sitting.", count: publicSeries().length, icon: BookOpen },
  ];
  return <nav className="journal-type-navigation" aria-label="Explore Stories by content type">{sections.map(({ slug, title, description, count, icon: Icon }) => <Link key={slug} href={`/stories/${slug}`} aria-current={active === slug ? "page" : undefined}><div><Icon size={23} strokeWidth={1.4} aria-hidden="true" /><span>{String(count).padStart(2, "0")}</span></div><h2>{title} <ArrowUpRight size={18} aria-hidden="true" /></h2><p>{description}</p></Link>)}</nav>;
}

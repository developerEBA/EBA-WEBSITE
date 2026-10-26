import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { StorySummary } from "@/lib/stories";
import { storyDate, storyTypeLabel, storyUrl } from "@/lib/story-format";
export function StoryCard({ story, featured = false }: { story: StorySummary; featured?: boolean }) {
  return <article className={`journal-card journal-card-${story.contentType} ${featured ? "journal-featured" : ""}`}><Link className="journal-image-link" href={storyUrl(story)} aria-label={`Read ${story.title}`}><div className="journal-image">{story.image && <Image src={story.image} alt={story.imageAlt} fill sizes={story.contentType === "press-release" ? "120px" : featured ? "(max-width: 760px) 90vw, 45vw" : "(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw"} style={{ objectFit: "cover", objectPosition: "50% 35%" }}/>}</div></Link><div className="journal-card-copy"><div className="journal-meta"><span className={`journal-type-badge type-${story.contentType}`}>{story.mediaCoverage ? "MEDIA COVERAGE" : storyTypeLabel(story.contentType)}</span>{story.publication && <span>{story.publication}</span>}<time dateTime={story.date}>{storyDate(story.date)}</time></div><h3><Link href={storyUrl(story)}>{story.title}<ArrowUpRight size={20} aria-hidden="true"/></Link></h3>{featured && <p>{story.excerpt}</p>}</div></article>;
}

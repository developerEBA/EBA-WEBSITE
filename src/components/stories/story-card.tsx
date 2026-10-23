import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { storyDate, type StorySummary } from "@/lib/stories";
export function StoryCard({ story, featured = false }: { story: StorySummary; featured?: boolean }) {
  return <article className={`journal-card ${featured ? "journal-featured" : ""}`}><Link className="journal-image-link" href={`/stories/${story.slug}`} aria-label={`Read ${story.title}`}><div className="journal-image">{story.image && <Image src={story.image} alt={story.imageAlt} fill sizes={featured ? "(max-width: 760px) 90vw, 45vw" : "(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw"} style={{ objectFit: "cover", objectPosition: "50% 35%" }}/>}</div></Link><div className="journal-card-copy"><div className="journal-meta"><span>{story.category}</span><time dateTime={story.date}>{storyDate(story.date)}</time></div><h3><Link href={`/stories/${story.slug}`}>{story.title}<ArrowUpRight size={20} aria-hidden="true"/></Link></h3>{featured && <p>{story.excerpt}</p>}</div></article>;
}

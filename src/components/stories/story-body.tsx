import Link from "next/link";
import { storyHeadingId } from "@/lib/story-format";
import type { StoryBlock, StorySegment } from "@/lib/stories";

function safeLink(href: string) {
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  if (href.startsWith("#")) return href;
  try { const url = new URL(href); return ["https:", "http:", "mailto:"].includes(url.protocol) ? href : null; } catch { return null; }
}
function Inline({ segments }: { segments: StorySegment[] }) {
  return <>{segments.map((segment, index) => {
    if (segment.type === "strong") return <strong key={index}>{segment.text}</strong>;
    if (segment.type === "em") return <em key={index}>{segment.text}</em>;
    const href = segment.href && safeLink(segment.href);
    return segment.type === "link" && href ? <Link href={href} key={index}>{segment.text}</Link> : <span key={index}>{segment.text}</span>;
  })}</>;
}
export function StoryBody({ blocks }: { blocks: StoryBlock[] }) {
  return <>{blocks.map((block, index) => block.type === "h2" ? <h2 id={storyHeadingId(index)} key={index}><Inline segments={block.segments} /></h2> : block.type === "h3" ? <h3 id={storyHeadingId(index)} key={index}><Inline segments={block.segments} /></h3> : block.type === "li" ? <ul key={index}><li><Inline segments={block.segments} /></li></ul> : block.type === "blockquote" ? <blockquote key={index}><Inline segments={block.segments} /></blockquote> : <p key={index}><Inline segments={block.segments} /></p>)}</>;
}

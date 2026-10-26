import { notFound } from "next/navigation";
import { stories } from "@/lib/stories";
import { storyUrl } from "@/lib/story-format";
import { JournalEntry } from "@/components/stories/journal-entry";
import "../../stories.css";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return stories.filter(story => story.contentType === "press-release").map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) { const { slug } = await params; const story = stories.find(story => story.slug === slug && story.contentType === "press-release"); return { title: `${story?.title || "Release not found"} | EBA Newsroom`, description: story?.excerpt, alternates: story ? { canonical: `https://enibrand.com${storyUrl(story)}` } : undefined }; }
export default async function PressReleasePage({ params }: Props) { const { slug } = await params; const story = stories.find(story => story.slug === slug && story.contentType === "press-release"); if (!story) notFound(); return <JournalEntry story={story} />; }

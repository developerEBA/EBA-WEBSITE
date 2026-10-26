import { notFound, permanentRedirect } from "next/navigation";
import { stories } from "@/lib/stories";
import { storyUrl } from "@/lib/story-format";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return stories.map(({slug})=>({slug})); }
export default async function LegacyStoryPage({params}:Props) {const {slug}=await params;const story=stories.find(item=>item.slug===slug);if(!story)notFound();permanentRedirect(storyUrl(story));}

import importedPosts from "@/lib/stories/posts.json";
export type StorySegment = { type: string; text: string; href?: string };
export type StoryBlock = { type: string; segments: StorySegment[] };
export type Story = { id: number; slug: string; title: string; date: string; category: string; excerpt: string; image: string | null; imageAlt: string; readingMinutes: number; sourceUrl: string; blocks: StoryBlock[] };
export type StorySummary = Omit<Story, "blocks">;
export const stories: Story[] = importedPosts;
export const storySummaries: StorySummary[] = stories.map(story => ({ id: story.id, slug: story.slug, title: story.title, date: story.date, category: story.category, excerpt: story.excerpt, image: story.image, imageAlt: story.imageAlt, readingMinutes: story.readingMinutes, sourceUrl: story.sourceUrl }));
export function storyDate(date: string) { return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Lagos" }).format(new Date(`${date}T12:00:00+01:00`)); }
export const storyHeadingId = (index: number) => `section-${index}`;


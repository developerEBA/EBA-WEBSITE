import mediaCoverage from "@/lib/stories/media-coverage.json";
import importedPosts from "@/lib/stories/posts.json";
import { contentTypeFromCategory, type JournalContentType } from "@/lib/story-format";
export type StorySegment = { type: string; text: string; href?: string };
export type StoryBlock = { type: string; segments: StorySegment[] };
export type StoryBase = { id: number; slug: string; title: string; date: string; category: string; excerpt: string; image: string | null; imageAlt: string; readingMinutes: number; sourceUrl: string; publication?: string; originalAuthor?: string | null; mediaCoverage?: boolean; blocks: StoryBlock[] };
export type ArticleStory = StoryBase & { contentType: "article"; author?: string };
export type PressReleaseStory = StoryBase & { contentType: "press-release"; organisation?: string; mediaContact?: string };
export type Story = ArticleStory | PressReleaseStory;
export type StorySummary = Omit<StoryBase, "blocks"> & { contentType: JournalContentType };
export const stories: Story[] = [...importedPosts, ...mediaCoverage].map(story => {
  const contentType = contentTypeFromCategory(story.category);
  if (!contentType) throw new Error(`Unreviewed story category: ${story.category}`);
  return contentType === "article" ? { ...story, contentType } : { ...story, contentType };
});
export const storySummaries: StorySummary[] = stories.map(({ blocks: _blocks, ...story }) => {
  void _blocks;
  return story;
});
export function storiesByType(type: JournalContentType) { return storySummaries.filter(story => story.contentType === type).toSorted((a, b) => b.date.localeCompare(a.date) || b.id - a.id); }
export { storyDate, storyHeadingId, storyUrl } from "@/lib/story-format";


import { z } from "zod";
import records from "@/lib/stories/series.json";

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const publication = { status: z.enum(["draft", "in-review", "scheduled", "published", "archived"]), publishedAt: z.iso.datetime({ offset: true }).optional() };
const segment = z.object({ type: z.enum(["text", "strong", "em", "link"]), text: z.string(), href: z.string().optional() });
const block = z.object({ type: z.enum(["p", "h2", "h3", "li", "blockquote"]), segments: z.array(segment) });
export const episodeSchema = z.object({ ...publication, slug, number: z.number().int().positive(), title: z.string().min(1), blocks: z.array(block).min(1), readingMinutes: z.number().int().positive(), image: z.string().startsWith("/images/").optional(), imageAlt: z.string().optional() });
export const seriesSchema = z.object({
  ...publication, slug, title: z.string().min(1), description: z.string().min(1), author: z.string().min(1),
  cover: z.string().startsWith("/images/").optional(), coverAlt: z.string().optional(), genre: z.string().optional(),
  seriesStatus: z.enum(["Ongoing", "Completed", "Coming Soon", "On Hiatus"]), episodes: z.array(episodeSchema),
}).refine(series => new Set(series.episodes.map(episode => episode.number)).size === series.episodes.length, "Episode numbers must be unique.")
  .refine(series => new Set(series.episodes.map(episode => episode.slug)).size === series.episodes.length, "Episode slugs must be unique.");
export type StorySeries = z.infer<typeof seriesSchema>;
export type StoryEpisode = z.infer<typeof episodeSchema>;
export type EpisodeSummary = Pick<StoryEpisode, "slug" | "number" | "title" | "publishedAt" | "readingMinutes">;
export const seriesRecords: StorySeries[] = z.array(seriesSchema).parse(records);
export function isPublished(record: { status: string; publishedAt?: string }, now = Date.now()) {
  return (record.status === "published" || record.status === "scheduled") && Boolean(record.publishedAt) && Date.parse(record.publishedAt!) <= now;
}
export function publicSeries(now = Date.now()) { return seriesRecords.filter(series => isPublished(series, now)); }
export function publishedEpisodes(series: StorySeries, now = Date.now()) {
  if (!isPublished(series, now)) return [];
  return series.episodes.filter(episode => isPublished(episode, now)).toSorted((a, b) => a.number - b.number);
}
export function episodeNavigation(series: StorySeries, episodeSlug: string, now = Date.now()) {
  const episodes = publishedEpisodes(series, now);
  const index = episodes.findIndex(episode => episode.slug === episodeSlug);
  return { current: episodes[index], previous: index > 0 ? episodes[index - 1] : undefined, next: index >= 0 ? episodes[index + 1] : undefined };
}
export function episodeSummaries(series: StorySeries): EpisodeSummary[] { return publishedEpisodes(series).map(({ slug, number, title, publishedAt, readingMinutes }) => ({ slug, number, title, publishedAt, readingMinutes })); }

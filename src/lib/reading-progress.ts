export type SavedReading = { episodeSlug: string; position: number; updatedAt: number };
export const readingKey = (seriesSlug: string) => `eba-series-reading:v1:${seriesSlug}`;
export function parseReadingProgress(raw: string | null, publishedSlugs: string[]): SavedReading | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw);
    if (!value || typeof value.episodeSlug !== "string" || !publishedSlugs.includes(value.episodeSlug) || typeof value.position !== "number" || !Number.isFinite(value.position) || value.position < 0 || value.position > 1 || typeof value.updatedAt !== "number" || !Number.isFinite(value.updatedAt)) return null;
    return { episodeSlug: value.episodeSlug, position: value.position, updatedAt: value.updatedAt };
  } catch { return null; }
}

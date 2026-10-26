export type JournalContentType = "article" | "press-release";
export function contentTypeFromCategory(category: string): JournalContentType | null {
  if (category === "Article") return "article";
  if (category === "Press release") return "press-release";
  return null;
}
export function storyUrl(story: { slug: string; contentType: JournalContentType }) {
  return `/stories/${story.contentType === "press-release" ? "press-releases" : "articles"}/${story.slug}`;
}
export function storyTypeLabel(type: JournalContentType) { return type === "press-release" ? "PRESS RELEASE" : "ARTICLE"; }
export function storyDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Lagos" }).format(new Date(`${date.slice(0, 10)}T12:00:00+01:00`));
}
export const storyHeadingId = (index: number) => `section-${index}`;

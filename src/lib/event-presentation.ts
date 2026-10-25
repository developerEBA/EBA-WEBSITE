import { eventStories, type EventStory } from "@/lib/event-content";

// Presentation uses photographs only where a dedicated event gallery exists.
// Older listings retain their supplied artwork and original date labels.
const presentation: Record<string, { title: string; group: string; photo?: string; alt?: string; startDate?: string }> = {
  "swing-for-autism": { title: "Swing for Autism. A purpose in play.", group: "Golf & purpose", photo: "/images/events/swing-for-autism/moment-1.jpg", alt: "Golfers at the Play With Stephen Swing for Autism tournament", startDate: "2026-08-21" },
  "falz-community-hangout": { title: "Falz Community Hangout. Owambe edition.", group: "Culture", photo: "/images/events/falz/moment-1.webp", alt: "A moment from the Falz Community Hangout", startDate: "2026-05-02" },
  "sip-and-share": { title: "The Eniivy Experience. Sip & Share.", group: "Community", startDate: "2025-11-18" },
  "swing-for-autism-ghana": { title: "Let’s Swing for Autism. Ghana.", group: "Golf & purpose", startDate: "2025-08-24" },
  "movies-and-conversations": { title: "The Eniivy Experience. Movies & Conversations.", group: "Community", photo: "/images/events/movies/moment-1.webp", alt: "Guests at The Eniivy Experience Movies and Conversations", startDate: "2025-07-20" },
  "independence-edition": { title: "It Can Only Be Naija. The Eniivy Experience.", group: "Culture", startDate: "2024-10-15" },
  "community-return": { title: "The CommuniTEE is back.", group: "Community" },
};
export type PresentedEvent = EventStory & { displayTitle: string; group: string; cover: string | null; coverAlt: string; isPhotograph: boolean; startDate: string | null };
export const presentedEvents: PresentedEvent[] = eventStories.map(event => {
  const view = presentation[event.id];
  return { ...event, displayTitle: view?.title ?? event.title, group: view?.group ?? "Community", cover: view?.photo ?? event.image, coverAlt: view?.alt ?? `Original event artwork for ${event.title}`, isPhotograph: Boolean(view?.photo), startDate: view?.startDate ?? null };
}).toSorted((a,b) => (b.startDate ?? "").localeCompare(a.startDate ?? ""));

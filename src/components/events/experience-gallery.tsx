import { RedRoomCarousel } from "@/components/stories/red-room-carousel";
import { eventHeroPhotos } from "@/lib/event-content";
export function ExperienceGallery() {
  return <section className="experience-gallery"><RedRoomCarousel photos={eventHeroPhotos} title="The moments in between." eyebrow="From the room" className="experience-shell" label="event gallery" /></section>;
}

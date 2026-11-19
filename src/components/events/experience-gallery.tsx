import { RedRoomCarousel } from "@/components/stories/red-room-carousel";
import { eventGalleryPhotos } from "@/lib/event-content";
export function ExperienceGallery() {
  return <section className="experience-gallery"><RedRoomCarousel photos={eventGalleryPhotos} title="The moments in between." eyebrow="From the room" className="experience-shell" label="event gallery" effect="slide" /></section>;
}

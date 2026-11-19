export const redRoomPhotos = [
  { src: "/images/red-room/welcome.webp", alt: "Guests meeting in The Red Room chill zone", caption: "Conversations in The Red Room." },
  { src: "/images/red-room/guests.webp", alt: "Three guests standing together in front of The Red Room backdrop", caption: "Faces from the room.", position: "center 22%" },
  { src: "/images/red-room/chill-zone.webp", alt: "Guests seated together in The Red Room lounge", caption: "A moment in the chill zone." },
  { src: "/images/red-room/production.webp", alt: "Production crew wearing headphones and monitoring screens at the event", caption: "Behind the scenes with the production team." },
  { src: "/images/red-room/conversations.webp", alt: "Delegates in conversation at the National Advertising Conference", caption: "Connections beyond the stage." },
  { src: "/images/red-room/panel.webp", alt: "Panellists on stage at the 2026 National Advertising Conference", caption: "On stage at NAC 2026." },
  { src: "/images/red-room/audience.webp", alt: "Conference audience watching a panel discussion at NAC 2026", caption: "The wider conversation at NAC 2026." },
];

export function isRedRoomStory(story: { title: string; excerpt: string; blocks: { segments: { text: string }[] }[] }) {
  return /\bred[\s-]*room\b/i.test([story.title, story.excerpt, ...story.blocks.flatMap(block => block.segments.map(segment => segment.text))].join(" "));
}

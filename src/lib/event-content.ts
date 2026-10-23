export const eventHeroPhotos = [
  { src: "/images/events/conversations.webp", alt: "Guests sharing ideas and conversation at an EBA experience", position: "center 54%" },
  { src: "/images/events/community-circle.webp", alt: "A community gathered for an intimate conversation", position: "center 48%" },
  { src: "/images/events/shared-perspectives.webp", alt: "A guest sharing his perspective with a microphone", position: "center 42%" },
  { src: "/images/events/in-the-room.webp", alt: "An event host bringing people together in conversation", position: "center 45%" },
  { src: "/images/events/people-and-connection.webp", alt: "Friends sharing a joyful moment at an experience", position: "center 42%" },
  { src: "/images/events/lasting-moments.webp", alt: "Two guests celebrating a memorable event moment", position: "center 43%" },
];

export type EventStory = {
  id: string;
  title: string;
  category: string;
  location?: string;
  date?: string;
  summary: string;
  image: string | null;
  placeholder?: boolean;
  poster: "golf" | "culture" | "connection" | "community" | "brand" | "industry";
};

// Event artwork is independent of the shared hero slideshow. Replace image paths here anytime.
export const eventStories: EventStory[] = [
  {
    "id": "community-return",
    "title": "The Eniivy Experience (The CommuniTEE Is Back)",
    "category": "Community / Connection",
    "location": "Lagos",
    "date": "February 23",
    "image": "/images/events/past-events-2-img.webp",
    "poster": "community",
    "summary": "A community gathering built around honest conversations about love and heartbreak, sing-alongs and an after-party. The CommuniTEE returns with space to reconnect and share the room."
  },
  {
    "id": "independence-edition",
    "title": "The Eniivy Experience (It Can Only Be Naija)",
    "category": "Culture / Conversations",
    "location": "Victoria Island, Lagos",
    "date": "October 15–17, 2024",
    "image": "/images/events/past-events-1-img.webp",
    "poster": "community",
    "summary": "The Eniivy Experience brings the CommuniTEE together in Lagos for an evening of fun, movies and conversation. The Independence Edition poster adds games, networking and a town-hall question: what is the ‘it can only be in Naija’ moment you have had? It’s a chance to share the familiar, funny and unexpected stories that connect us."
  },
  {
    "id": "movies-and-conversations",
    "title": "The Eniivy Experience (Movies & Conversations)",
    "category": "Movies / Community",
    "location": "Lagos",
    "date": "July 20–21, 2025",
    "image": "/images/events/upcoming-events-3-img.webp",
    "poster": "culture",
    "summary": "An evening of movies and conversation with the CommuniTEE, alongside food, games, networking, popcorn and cocktails. A shared screen becomes a starting point for new connections."
  },
  {
    "id": "swing-for-autism-ghana",
    "title": "Let’s Swing for Autism",
    "category": "Golf / Purpose & Community",
    "location": "Achimota Golf Club, Ghana",
    "date": "August 24–25, 2025",
    "image": "/images/events/upcoming-events-4-img.webp",
    "poster": "golf",
    "summary": "Play With Stephen brings golf and purpose together at Achimota Golf Club in Ghana. The Swing for Autism tournament creates a setting for sport, community and autism awareness."
  },
  {
    "id": "sip-and-share",
    "title": "The Eniivy Experience (Sip & Share Edition)",
    "category": "Conversations / Connection",
    "location": "Lagos",
    "date": "November 18, 2025",
    "image": "/images/events/anticipate-sip-and-paint.webp",
    "poster": "connection",
    "summary": "The Sip & Share Edition of The Eniivy Experience invites people to slow down, connect and share conversation. An experience shaped around the people in the room and the connections they take away."
  },
  {
    "id": "falz-community-hangout",
    "title": "Falz Community Hangout (Owambe Edition)",
    "category": "Culture / Community",
    "location": "Lagos",
    "date": "May 2, 2026",
    "image": "/images/events/Falz.webp",
    "poster": "culture",
    "summary": "Falz Community Hangout brings an Owambe Edition to the community. The event artwork announces a gathering on May 2, 2026 at 4pm, with attendance strictly by registration."
  },
  {
    "id": "swing-for-autism",
    "title": "Play With Stephen — Swing For Autism (7th Edition)",
    "category": "Golf / Purpose & Community",
    "location": "Lakowe Lakes and Country Estate, Lagos",
    "date": "August 21–23, 2026",
    "image": "/images/events/swing-for-autism-2026.png",
    "poster": "golf",
    "summary": "The 2026 Play With Stephen Golf Tournament takes place at Lakowe Lakes and Country Estate from August 21 to 23. Swing for Autism brings the golf community together around sport and a shared purpose."
  }
];

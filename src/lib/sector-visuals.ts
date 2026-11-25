// Local photographs keep the collection and detail pages in the same visual world.
export const sectorVisuals = {
  "impact-and-development": {
    hero: "/images/events/swing-for-autism/moment-1.webp",
    heroAlt: "Golfers together at Play With Stephen’s Swing for Autism tournament",
    position: "50% 20%",
    caption: "People. Purpose. Possibility.",
    detail: "/images/events/swing-for-autism/moment-4.webp",
    detailAlt: "The Play With Stephen community gathered on the golf course",
  },
  "media-and-entertainment": {
    hero: "/images/stories/choir-guilty-as-charged.webp",
    heroAlt: "Loud Urban Choir performing at Bovi’s Guilty as Charged show in Lagos",
    position: "50% 45%",
    caption: "Talent. Platforms. Conversation.",
    detail: "/images/case-studies/bovi-lagos.jpg",
    detailAlt: "Bovi beside the branding for his Guilty as Charged production",
  },
  "corporate-and-professional": {
    hero: "/images/story-strategy-meeting.webp",
    heroAlt: "A team discussing brand strategy in a professional meeting",
    position: "50% 45%",
    caption: "Clarity. Credibility. Connection.",
    detail: "/images/sector-corporate.png",
    detailAlt: "Colleagues exchanging ideas around a meeting table",
  },
  "culture-and-creative-industries": {
    hero: "/images/story-hero.webp",
    heroAlt: "A creative team filming a live brand experience",
    position: "50% 40%",
    caption: "Ideas. Identity. Lasting relevance.",
    detail: "/images/story-contact-event.webp",
    detailAlt: "Content creators and production equipment at a cultural gathering",
  },
} as const;

// Homepage collection photography can change independently of sector detail pages.
export const homeSectorVisuals = {
  ...sectorVisuals,
  "impact-and-development": { ...sectorVisuals["impact-and-development"], hero: "/images/clients/omodaadaa-foundation-community.webp", heroAlt: "An older woman at an Omodaadaa Foundation community event, holding up a paper", position: "50% 44%" },
  "corporate-and-professional": { ...sectorVisuals["corporate-and-professional"], hero: "/images/red-room/panel.webp", heroAlt: "Panel session at the National Advertising Conference 2026", position: "50% 48%" },
  "culture-and-creative-industries": { ...sectorVisuals["culture-and-creative-industries"], hero: "/images/events/lounge/conversation.webp", heroAlt: "Guests exchanging ideas at a Lounge Network gathering", position: "50% 55%" },
};

export type SectorSlug = keyof typeof sectorVisuals;

export type SectorEditorial = {
  slug: string; title: string; number: string; headline: string; emphasis: string; intro: string;
  image: string; alt: string; signature: string; storyTitle: string; story: string;
  serviceTitle: string; services: [string, string][]; steps: [string, string][];
  permissionPending?: boolean;
  work: { title: string; description: string; category: string; image?: string; alt?: string; href?: string; forthcoming?: boolean }[];
};

export const sectorEditorials: SectorEditorial[] = [
  {
    slug: "impact-and-development", title: "Impact & Development", number: "01",
    headline: "Stories that move", emphasis: "purpose into action.",
    intro: "Foundations, nonprofits, CSR teams and advocacy groups do work that matters. We make sure the people who need to hear about it actually do.",
    image: "/images/impact/women-together.jpg", alt: "Women standing together in solidarity; illustrative sector photography", signature: "People. Purpose. Progress.",
    storyTitle: "Good intentions don’t speak for themselves.",
    story: "Impact organisations often have the work, the results and the people, but not the narrative that earns trust, funding and partnership. At EBA, we treat your mission the way a good editor treats a story: find the human centre, shape it with clarity, and put it in front of the right audience at the right moment.",
    serviceTitle: "Meaningful work. Meaningful connection.",
    services: [
      ["Foundation & Nonprofit Communications", "Positioning, messaging and launch communications that tell people who you are and why you exist."],
      ["CSR & Sustainability Storytelling", "Turning corporate giving and community programmes into credible, human stories rather than box-ticking reports."],
      ["Advocacy & Awareness Campaigns", "Campaigns built to shift conversation and drive participation."],
      ["Press & Media Relations", "Press releases, announcements and media outreach that put your work in the public eye."],
      ["Leadership & Board Communications", "Profile building and announcements for founders, trustees and appointees."],
      ["Events & Stakeholder Engagement", "Launches, community activations and donor and partner moments."],
    ],
    steps: [["Listen", "We start with your mission, your community and what success looks like."], ["Find the story", "We identify the people, outcomes and moments worth telling."], ["Shape the message", "One clear narrative, adapted for press, social, partners and funders."], ["Amplify", "We place and distribute it where your audiences actually pay attention."]],
    permissionPending: true,
    work: [
      { title: "Omodaadaa Foundation", description: "International Women’s Day", category: "Foundation communications", image: "/images/impact/women-together.jpg", alt: "Women in solidarity; illustrative photography, not Omodaadaa campaign coverage" },
      { title: "Play With Stephen 2026", description: "Autism Hero Spotlight", category: "Advocacy & awareness", image: "/images/events/swing-for-autism/moment-1.webp", alt: "Play With Stephen golfers at an existing event" },
    ],
  },
  {
    slug: "media-and-entertainment", title: "Media & Entertainment", number: "02",
    headline: "Visibility where culture", emphasis: "and conversation happen.",
    intro: "Talent, platforms and entertainment brands live and die by attention. We build the presence, the press and the moments that keep you in the conversation.",
    image: "/images/sectors/media-studio.jpg", alt: "A musician recording vocals in a professional studio; illustrative sector photography", signature: "Made for the conversation.",
    storyTitle: "Culture moves fast. Make your presence count.",
    story: "Culture moves fast, and attention is quick to be lost. But whether you’re a performer, a media company or a platform, your image is part of your product. EBA helps media and entertainment clients shape that image deliberately, with sharp positioning, strong storytelling and campaigns that land where audiences already are.",
    serviceTitle: "Build the presence. Own the moment.",
    services: [
      ["Talent & Personal Brand Strategy", "Positioning and content for creators, performers and public figures."],
      ["PR & Press Conferences", "Press kits, media invitations, announcements and on-the-day coordination."],
      ["Show, Tour & Release Campaigns", "Pre-launch buzz through to post-event momentum."],
      ["LinkedIn & Social Content", "Thought-leadership and audience-building content for executives and personalities."],
      ["Sponsor & Partnership Coordination", "Aligning brands, sponsors and platforms around shared moments."],
      ["Event & Stage Production Support", "Run-of-show, talking-head promos and speaker announcements."],
    ],
    steps: [["Position", "Define what makes you worth watching."], ["Package", "Build the assets: press kit, scripts, visuals, content calendar."], ["Launch", "Roll out across press, social and live moments."], ["Sustain", "Keep the momentum going after the spotlight moves."]],
    work: [
      { title: "Bovi: “Guilty As Charged”", description: "Press conference", category: "PR & press", image: "/images/case-studies/bovi-lagos.jpg", alt: "Bovi in the Lagos show gallery, rather than press-conference coverage", href: "/case-studies/bovi-guilty-as-charged" },
      { title: "Falz The Bhad Guy", description: "Community Hangout", category: "Music & community", image: "/images/events/falz/moment-6.webp", alt: "Falz performing at the Community Hangout", href: "/events/falz-community-hangout" },
      { title: "Talentville & Loud Urban Choir", description: "Q4 press release campaign", category: "Release campaign", forthcoming: true },
    ],
  },
  {
    slug: "corporate-and-professional", title: "Corporate & Professional", number: "03",
    headline: "A clear voice for", emphasis: "business and credibility.",
    intro: "Companies, institutions and leaders are judged by how clearly they communicate. We help you say what matters, in a voice people trust.",
    image: "/images/sectors/corporate-meeting.jpg", alt: "Business colleagues exchanging ideas during a meeting; illustrative sector photography", signature: "Clarity is a working asset.",
    storyTitle: "Reputation is a working asset.",
    story: "In business, reputation is a working asset. It shapes who hires you, who partners with you and who takes your call. But most corporate communication is either silent or forgettable. EBA brings an editorial eye to corporate voice: sharper positioning, leadership visibility that feels human, and communications that hold up under scrutiny.",
    serviceTitle: "Say what matters. Be understood.",
    services: [
      ["Corporate Positioning & Messaging", "A clear articulation of who you are, what you stand for and why it matters."],
      ["Executive & Leadership Visibility", "LinkedIn strategy and thought-leadership content for founders, MDs and senior leaders."],
      ["Personal Brand for Professionals", "Building credible public profiles for executives, consultants and entrepreneurs."],
      ["PR & Media Relations", "Announcements, press releases, awards entries and reputation management."],
      ["Internal & Stakeholder Communications", "Newsletters, reports and updates that keep teams, clients and partners aligned."],
      ["Corporate Events & Sponsor Coordination", "Business events, launches and partnership activations."],
    ],
    steps: [["Audit", "We review how you currently show up, internally and externally."], ["Define", "We agree the positioning, tone and priority audiences."], ["Produce", "Content, press materials, reports and executive voice, built to a consistent standard."], ["Maintain", "A steady rhythm of publishing and reporting that compounds credibility over time."]],
    permissionPending: true,
    work: [
      { title: "Omoniyi Dada, JCDecaux Nigeria", description: "Executive LinkedIn presence", category: "Executive visibility" },
      { title: "Amarachi Nwagba", description: "LinkedIn content on entrepreneurship and project management", category: "Thought leadership" },
      { title: "Margaret Abbah", description: "LinkedIn personal brand report", category: "Personal brand" },
      { title: "MediaReach OMD", description: "Leadership content for its MD", category: "Leadership communications" },
    ],
  },
  {
    slug: "culture-and-creative-industries", title: "Culture & Creative Industries", number: "04",
    headline: "Turning distinctive thinking", emphasis: "into lasting relevance.",
    intro: "Creative businesses and cultural voices need more than exposure. They need a story with staying power.",
    image: "/images/sectors/culture-gallery.jpg", alt: "Visitors viewing a painting through an arched gallery doorway; illustrative sector photography", signature: "A point of view. A lasting impression.",
    storyTitle: "Distinctive work deserves a distinctive voice.",
    story: "Creative work is personal, and so is the way it needs to be told. Artists, galleries, hospitality brands and cultural platforms often have a strong point of view but no consistent way of sharing it. EBA works like an editorial partner: we find what is distinctive about your work, give it a clear shape, and build a body of content that lasts beyond a single post or event.",
    serviceTitle: "Find the voice. Build the body of work.",
    services: [
      ["Creative Brand Positioning", "Defining the point of view that sets your work apart."],
      ["Editorial & Content Series", "Long-form features, interviews and recurring series that build a loyal audience."],
      ["Pitch & Portfolio Content", "Briefs, decks and narratives for galleries, exhibitions and partnerships."],
      ["Lifestyle & Hospitality Branding", "Content and campaigns for restaurants, venues and experience brands."],
      ["Social & Community Content", "Platform-ready content that grows an engaged audience."],
      ["Cultural Events & Activations", "Concept support, coordination and storytelling around live moments."],
    ],
    steps: [["Understand the craft", "We learn what you make, why, and for whom."], ["Find the voice", "We shape a point of view that is unmistakably yours."], ["Build the body of work", "Series, campaigns and assets that connect."], ["Grow the audience", "Consistent publishing that turns attention into community."]],
    permissionPending: true,
    work: [
      { title: "Falz", description: "LinkedIn content strategy", category: "Creative voice" },
      { title: "Omotoni Dada", description: "Gallery pitch content briefs", category: "Art & exhibitions" },
      { title: "Kitchen 86 & Maison 86", description: "Lifestyle and hospitality brand content", category: "Lifestyle & hospitality" },
      { title: "Stage Sweat", description: "Editorial series", category: "Editorial storytelling" },
    ],
  },
];

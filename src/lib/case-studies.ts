export const caseCategories = ["All Work", "Agency", "Event", "Public Relations", "Amplification", "Marketing"];
export type CaseStudy = { slug: string; title: string; category: string; tags: string[]; image: string; alt: string; imageFit?: "contain"; imageCredit?: string; line: string; description: string; approach: string; event: string; eventLabel: string; source: string };
export const caseStudies: CaseStudy[] = [
  {
    slug: "mediareach", title: "mediaReach OMD", category: "AGENCY", tags: ["Agency"],
    image: "/images/case-studies/mediareach.png", alt: "mediaReach OMD logo", imageFit: "contain",
    line: "Communications for a media agency with a clear point of view.",
    description: "EBA’s agency work includes mediaReach OMD. This partnership sits at the intersection of media, brand reputation and strategic communications.",
    approach: "The focus: agency communications. Bring the organisation’s expertise and perspective into a clear narrative for the audiences that matter to its business.",
    event: "/services/pr-and-strategic-communications", eventLabel: "Explore Strategic Communications", source: "https://enibrand.com/eba-celebrates-two-years-of-building-brands-2/",
  },
  {
    slug: "play-with-stephen", title: "Play With Stephen", category: "EVENT", tags: ["Event"],
    image: "/images/events/swing-for-autism/moment-6.jpg", alt: "Play With Stephen golfers on the course",
    line: "Turning a golf gathering into a platform for purpose.",
    description: "Play With Stephen brings golf, community and autism awareness together. EBA supported the initiative through positioning, communications, campaign execution and its digital presence.",
    approach: "The focus: the event experience. Connect the reason for gathering with the invitation, the story and the audience engagement, keeping autism awareness at the centre.",
    event: "/events/swing-for-autism", eventLabel: "Explore the Event", source: "https://enibrand.com/eba-service/",
  },
  {
    slug: "talentville-africa", title: "Talentville Africa", category: "PR", tags: ["Public Relations"],
    image: "/images/case-studies/talentville.png", alt: "Talentville Africa logo", imageFit: "contain",
    line: "Connecting entertainment stories with the media.",
    description: "Public relations is at the heart of EBA’s work with Talentville Africa. The partnership brings entertainment projects into the public conversation through media engagement and storytelling.",
    approach: "The focus: PR. For Bovi’s Guilty As Charged press conference, EBA captured the conversations and anticipation ahead of the show, as shared by Talentville Africa and EBA.",
    event: "/services/pr-and-strategic-communications", eventLabel: "Explore Our PR Expertise", source: "https://ng.linkedin.com/company/ebabrand",
  },
  {
    slug: "bovi-guilty-as-charged", title: "Bovi: Guilty As Charged", category: "AMPLIFICATION", tags: ["Amplification"],
    image: "/images/case-studies/bovi-lagos.jpg", alt: "Bovi beside Guilty As Charged branding in the Lagos event gallery", imageCredit: "Photo: Ncourage / Junior Prefect event gallery",
    line: "Taking the conversation beyond the stage.",
    description: "Bovi’s Guilty As Charged Lagos show brought live comedy to the Eko Convention Centre. EBA’s involvement included capturing the press-conference moments and conversations leading into the event.",
    approach: "The focus: event amplification. Carry the story around the show through content and media conversations, connecting the anticipation before the performance with the wider audience.",
    event: "/services/marketing-and-amplification", eventLabel: "Explore Amplification", source: "https://ng.linkedin.com/company/ebabrand",
  },
  {
    slug: "the-eniivy-experience", title: "The Eniivy Experience (TEE)", category: "MARKETING / EVENT", tags: ["Marketing", "Event"],
    image: "/images/events/community-circle.webp", alt: "The Eniivy Experience community gathered together",
    line: "Building a community through marketing and shared experiences.",
    description: "TEE is a culture-led community platform built around storytelling, connection and shared moments. EBA shapes its experience, communications and audience engagement.",
    approach: "The focus: marketing and events. Connect the invitation, the content and the gathering so the community can engage before, during and after each experience.",
    event: "/events/all", eventLabel: "Explore the Experiences", source: "https://enibrand.com/eba-service/",
  },
];

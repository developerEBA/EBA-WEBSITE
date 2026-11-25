import Image from "next/image";
import { homeSectorVisuals as sectorVisuals, type SectorSlug } from "@/lib/sector-visuals";
import { ShopInvitation } from "@/components/shop/shop-invitation";
import { SectionHeading } from "@/components/shared/section-heading";
import { ActionLink } from "@/components/shared/action-link";
import Link from "next/link";
import { serviceDetails } from "@/lib/services";
import { PortfolioMap } from "@/components/portfolio-map";
import { AboutVideo } from "@/components/about-video";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Entrance, SectorHeading, SectorCard, HeroVideo, TypedHeadline, Counters, Reveal } from "@/components/home-interactions";

const sectors = [
  { slug: "impact-and-development", title: "Impact & Development", text: "Foundations, nonprofits, CSR & advocacy. Stories that connect purpose with action.", x: 23, y: 774, w: 141, h: 53 },
  { slug: "media-and-entertainment", title: "Media & Entertainment", text: "Talent, platforms & entertainment. Building visibility where culture and conversation happen.", x: 184, y: 774, w: 140, h: 53 },
  { slug: "corporate-and-professional", title: "Corporate & Professional", text: "Companies, institutions, leaders & executives. A clear voice for business and credibility.", x: 23, y: 869, w: 141, h: 54 },
  { slug: "culture-and-creative-industries", title: "Culture & Creative Industries", text: "Creative businesses & cultural voices. Turning distinctive thinking into lasting relevance.", x: 184, y: 869, w: 140, h: 54 },
];
function HomeSectorArtwork({ slug }: { slug: SectorSlug }) {
  if (slug === "media-and-entertainment") return <div className="reference-image home-sector-art sector-event-collage" aria-label="A photo collage featuring Bovi’s Guilty As Charged event and the Falz Community Hangout">
    <div className="event-collage-photo event-collage-bovi"><Image src="/images/case-studies/bovi-lagos.jpg" alt="Bovi at Guilty As Charged in Lagos" fill sizes="(max-width: 700px) 85vw, 43vw"/></div>
    <div className="event-collage-photo event-collage-falz"><Image src="/images/events/falz/moment-2.webp" alt="Guests arriving at the Falz Community Hangout" fill sizes="(max-width: 700px) 85vw, 43vw"/></div>
    <span className="event-collage-caption"><strong>Live culture</strong><span>Bovi · Falz · Lagos</span></span>
  </div>;

  if (slug === "culture-and-creative-industries") return <div className="reference-image home-sector-art culture-press-collage" role="img" aria-label="A newspaper-style collage using EBA sector headlines and copy">
    <div className="press-sheet press-sheet-back"><span className="press-masthead">SECTOR NOTES / 04</span><strong>Ideas shape<br/>the world.</strong><span className="press-lines"/><span className="press-smallprint">ART · DESIGN · PEOPLE · PLACE</span></div>
    <div className="press-sheet press-sheet-mid"><span className="press-masthead">CULTURE & CREATIVITY</span><strong>Distinctive work deserves a distinctive voice.</strong><span className="press-lines"/><span className="press-smallprint">STORIES WITH A POINT OF VIEW</span></div>
    <div className="press-sheet press-sheet-front"><span className="press-masthead">EBA / THE CREATIVE PAGE</span><span className="press-kicker">IDEAS · PEOPLE · PLACE</span><strong>Make it<br/>matter.</strong><span className="press-lines"/><span className="press-smallprint">VOICE · VISION · RELEVANCE</span></div>
  </div>;

  const visual = sectorVisuals[slug];
  return <div className={`reference-image home-sector-art sector-photo-${slug}`}><Image src={visual.hero} alt={visual.heroAlt} fill sizes="(max-width: 700px) 85vw, 43vw" style={{ objectFit: "cover", objectPosition: visual.position }}/></div>;
}
export default function Home() {
  return <main id="home">
    <section className="hero"><HeroVideo src="/videos/the-bouncer-6.mp4"/><div className="hero-shade"/><div className="hero-content"><h1>Great Brands<br/>Don’t Just Exist.<br/><TypedHeadline/></h1><p>We turn ambitious ideas into compelling stories, meaningful connections, and unforgettable brand experiences. Through strategic PR, communications, and marketing, we help brands stand out, build influence, and stay relevant.</p><div className="hero-buttons"><ActionLink variant="yellow" href="/consultation" arrowSize={16}>Book a Consultation</ActionLink><ActionLink variant="outline-light" href="/case-studies" showArrow={false}>Explore Our Work</ActionLink></div><Counters/></div><span className="hero-signature">Visibility<br/>Credibility<br/>Impact</span></section>
    <Reveal className="about section-shell" ><div className="about-copy" id="about"><SectionHeading eyebrow="About EBA" eyebrowClassName="eyebrow">Visibility. Influence.<br/><span>Ecosystem Building.</span></SectionHeading><p className="handwritten">Visibility opens doors. Influence shapes possibilities.</p><p>At EBA, we believe great brands deserve more than just attention. Through strategic PR, compelling storytelling, creative marketing, and meaningful experiences, we help them build credibility, connect with the right audiences, strengthen their influence, and turn visibility into lasting impact and measurable growth.</p><ActionLink href="/about/our-story" variant="yellow" arrowSize={16}>Learn More About EBA</ActionLink></div><Entrance className="about-film-wrap" direction="right"><AboutVideo /></Entrance></Reveal>
    <section className="home-services" id="services"><div className="section-shell"><Reveal><SectionHeading eyebrow="What we do" eyebrowClassName="eyebrow">One partner. Six ways forward.</SectionHeading><p>Connected expertise. A clear direction for your brand.</p></Reveal><div className="home-service-grid">{serviceDetails.map((service,i)=><Entrance key={service.slug} delay={(i%3)*.06}><Link href={`/services/${service.slug}`}><span>0{i+1}</span><h3>{service.title}</h3><ArrowUpRight size={21}/></Link></Entrance>)}</div></div></section>
    <section className="sectors section-shell" id="sectors"><div className="section-intro"><SectorHeading/><div><p>From institutions shaping progress to creatives shaping culture, we build communications around the world your brand lives in.</p></div></div><div className="sector-panel"><span className="tiny-label">SECTOR COLLECTION</span><div className="sector-title"><h3>Four sectors, one editorial approach.</h3><span className="sector-badge">4 SECTORS</span></div><p>Stories that connect purpose, business and culture with the audiences that matter.</p><div className="sector-grid">{sectors.map((s, index) => <SectorCard key={s.title} index={index}><div><h4>{s.title}</h4><Link href={`/about/sectors/${s.slug}`} aria-label={`Explore ${s.title}`}>EXPLORE <ArrowUpRight size={11}/></Link></div><p>{s.text}</p><HomeSectorArtwork slug={s.slug as SectorSlug}/></SectorCard>)}</div></div></section>
    <PortfolioMap/>
    <Reveal className="approach section-shell" ><div className="section-intro" id="approach"><div><SectionHeading eyebrow="How we do" eyebrowClassName="eyebrow">Clarity first. Then<br/>momentum.</SectionHeading></div><ActionLink href="/get-in-touch" variant="yellow" arrowSize={15}>Let’s find your direction</ActionLink></div><div className="approach-grid">{[["DISCOVER", "Find.", "We get close to your brand, your challenge and your audience. Before we make noise, we ask the right questions.", "INSIGHT. CLARITY. CONTEXT."], ["DESIGN", "Create.", "We turn insight into a clear strategy, distinctive ideas and communications with a reason to exist.", "STRATEGY. STORY. COMMUNICATION."], ["DELIVER", "Execute.", "We bring the plan to life across channels, platforms and experiences — keeping every moving part aligned.", "CAMPAIGNS. CONTENT. EXPERIENCES."]].map(([label, title, text, end], i) => <Entrance as="article" key={title} delay={i * 0.18} tilt={i === 1 ? -3 : 3}><div className="step-label">0{i + 1} / {label}<ArrowRight size={16}/></div><h3>{title}</h3><p>{text}</p><span>{end}</span></Entrance>)}</div></Reveal>
    <ShopInvitation/>
  </main>;
}











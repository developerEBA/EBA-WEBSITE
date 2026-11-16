import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ActionLink } from "@/components/shared/action-link";
import { sectorDetails } from "@/lib/about-content";
import "@/app/about/impact-development.css";
import "@/app/about/media-entertainment.css";

const services = [
  ["Talent & Personal Brand Strategy", "Positioning and content for creators, performers and public figures."],
  ["PR & Press Conferences", "Press kits, media invitations, announcements and on-the-day coordination."],
  ["Show, Tour & Release Campaigns", "Pre-launch buzz through to post-event momentum."],
  ["LinkedIn & Social Content", "Thought-leadership and audience-building content for executives and personalities."],
  ["Sponsor & Partnership Coordination", "Aligning brands, sponsors and platforms around shared moments."],
  ["Event & Stage Production Support", "Run-of-show, talking-head promos and speaker announcements."],
];

const steps = [
  ["Position", "Define what makes you worth watching."],
  ["Package", "Build the assets: press kit, scripts, visuals, content calendar."],
  ["Launch", "Roll out across press, social and live moments."],
  ["Sustain", "Keep the momentum going after the spotlight moves."],
];

export function MediaEntertainment() {
  return <main className="impact-page media-sector-page" id="top">
    <section className="impact-hero">
      <div className="section-shell">
        <div className="impact-masthead"><Link href="/about/our-story" className="impact-back"><ArrowLeft size={14} aria-hidden="true"/> About EBA</Link><span className="impact-eyebrow">Sector 02 / Media &amp; Entertainment</span></div>
        <div className="impact-hero-grid">
          <div className="impact-hero-copy">
            <h1>Visibility where<br/><em>culture</em> and<br/>conversation<br/>happen<span>.</span></h1>
            <div className="impact-hero-bottom"><span className="impact-vertical-label" aria-hidden="true">Talent. Culture. Conversation.</span><div>
              <p>Talent, platforms and entertainment brands live and die by attention. We build the presence, the press and the moments that keep you in the conversation.</p>
              <ActionLink href="/get-in-touch" variant="green">Start a conversation</ActionLink>
            </div></div>
          </div>
          <figure className="impact-hero-photo">
            <div><Image src="/images/events/falz/moment-6.webp" alt="Falz performing among guests at the Community Hangout" fill preload sizes="(max-width: 700px) 90vw, 45vw"/></div>
            <figcaption><span>In the room. In the conversation.</span><span>Falz Community Hangout <ArrowUpRight size={14} aria-hidden="true"/></span></figcaption>
          </figure>
        </div>
        <div className="impact-hero-index"><span>Communications at the speed of culture</span><a href="#media-story-title">Explore our approach <span aria-hidden="true">↓</span></a></div>
      </div>
    </section>
    <nav className="about-detail-nav" aria-label="Our sectors"><div className="section-shell">{sectorDetails.map(sector => <Link key={sector.slug} href={`/about/sectors/${sector.slug}`} aria-current={sector.slug === "media-and-entertainment" ? "page" : undefined}>{sector.title}<ArrowUpRight size={14} aria-hidden="true"/></Link>)}</div></nav>
    <section className="section-shell impact-story" aria-labelledby="media-story-title">
      <div><span className="impact-eyebrow">01 — The Story</span><h2 id="media-story-title">Culture moves fast.<br/><em>Make your<br/>presence count.</em></h2></div>
      <div><p>Culture moves fast, and attention is quick to be lost. But whether you’re a performer, a media company or a platform, your image is part of your product.</p><p>EBA helps media and entertainment clients shape that image deliberately, with sharp positioning, strong storytelling and campaigns that land where audiences already are.</p></div>
    </section>
    <section className="impact-services" aria-labelledby="media-services-title"><div className="section-shell">
      <div className="impact-section-heading"><div><span className="impact-eyebrow">02 — What We Do</span><h2 id="media-services-title">Build the presence.<br/><em>Own the moment.</em></h2></div><span className="impact-section-aside">From the first announcement<br/>to the next conversation.</span></div>
      <div className="impact-service-grid">{services.map(([title, text], index) => <article key={title}><span className="impact-number">0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight className="impact-service-arrow" size={21} aria-hidden="true"/></article>)}</div>
    </div></section>
    <section className="section-shell impact-process" aria-labelledby="media-process-title">
      <div className="impact-section-heading"><span className="impact-eyebrow">03 — How We Work</span><h2 id="media-process-title">Before the spotlight.<br/><em>Beyond the moment.</em></h2></div>
      <ol>{steps.map(([title, text], index) => <li key={title}><span className="impact-step">0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
    </section>
    <section className="impact-work" aria-labelledby="media-work-title"><div className="section-shell">
      <div className="impact-section-heading"><div><span className="impact-eyebrow">04 — Selected Work</span><h2 id="media-work-title">Culture, in<br/><em>the spotlight.</em></h2></div><span className="impact-section-aside">On stage. In the press.<br/>Part of the conversation.</span></div>
      <div className="impact-work-grid media-work-grid">
        <article><div className="impact-work-photo"><Image src="/images/case-studies/bovi-lagos.jpg" alt="Bovi beside Guilty As Charged branding in the Lagos show gallery" fill sizes="(max-width: 700px) 90vw, 45vw"/></div><div className="impact-work-meta"><span>PR / Press conference</span><span>Lagos show imagery</span></div><h3>Bovi: “Guilty As Charged”</h3><p>Press conference</p><Link className="media-work-link" href="/case-studies/bovi-guilty-as-charged">Explore the work <ArrowUpRight size={14} aria-hidden="true"/></Link></article>
        <article><div className="impact-work-photo"><Image src="/images/events/falz/moment-6.webp" alt="Falz The Bhad Guy performing at the Community Hangout" fill sizes="(max-width: 700px) 90vw, 45vw"/></div><div className="impact-work-meta"><span>Music / Community</span><span>Live experience</span></div><h3>Falz The Bhad Guy</h3><p>Community Hangout</p><Link className="media-work-link" href="/events/falz-community-hangout">Explore the experience <ArrowUpRight size={14} aria-hidden="true"/></Link></article>
        <article className="media-release-card"><div className="media-release-art"><span className="impact-eyebrow">Q4 / Press release campaign</span><div><span>Talentville</span><span aria-hidden="true">×</span><span>Loud Urban<br/><em>Choir.</em></span></div><span className="media-release-status">Forthcoming <ArrowUpRight size={22} aria-hidden="true"/></span></div><div className="impact-work-meta"><span>PR / Release campaign</span><span>Forthcoming</span></div><h3>Talentville &amp; Loud Urban Choir</h3><p>Q4 press release campaign</p></article>
      </div>
    </div></section>
  </main>;
}

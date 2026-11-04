import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ActionLink } from "@/components/shared/action-link";
import { sectorDetails } from "@/lib/about-content";
import "@/app/about/impact-development.css";

const services = [
  ["Foundation & Nonprofit Communications", "Positioning, messaging and launch communications that tell people who you are and why you exist."],
  ["CSR & Sustainability Storytelling", "Turning corporate giving and community programmes into credible, human stories rather than box-ticking reports."],
  ["Advocacy & Awareness Campaigns", "Campaigns built to shift conversation and drive participation."],
  ["Press & Media Relations", "Press releases, announcements and media outreach that put your work in the public eye."],
  ["Leadership & Board Communications", "Profile building and announcements for founders, trustees and appointees."],
  ["Events & Stakeholder Engagement", "Launches, community activations and donor and partner moments."],
];
const steps = [
  ["Listen", "We start with your mission, your community and what success looks like."],
  ["Find the story", "We identify the people, outcomes and moments worth telling."],
  ["Shape the message", "One clear narrative, adapted for press, social, partners and funders."],
  ["Amplify", "We place and distribute it where your audiences actually pay attention."],
];

export function ImpactDevelopment() {
  return <main className="impact-page" id="top">
    <section className="impact-hero">
      <div className="section-shell impact-hero-grid">
        <div className="impact-hero-copy">
          <Link href="/about/our-story" className="impact-back"><ArrowLeft size={16} aria-hidden="true"/> About EBA</Link>
          <span className="impact-eyebrow">Our sectors / Impact &amp; Development</span>
          <h1>Stories that move <em>purpose into action.</em></h1>
          <p>Foundations, nonprofits, CSR teams and advocacy groups do work that matters. We make sure the people who need to hear about it actually do.</p>
          <ActionLink href="/get-in-touch" variant="yellow">Start a conversation</ActionLink>
        </div>
        <figure className="impact-hero-photo">
          <div><Image src="/images/impact/community-volunteer.jpg" alt="A volunteer and her team taking action to clean a community forest" fill preload sizes="(max-width: 760px) 90vw, 45vw"/></div>
          <figcaption>People at the centre. Purpose in motion.</figcaption>
        </figure>
      </div>
    </section>
    <nav className="about-detail-nav" aria-label="Our sectors"><div className="section-shell">{sectorDetails.map(sector => <Link key={sector.slug} href={`/about/sectors/${sector.slug}`} aria-current={sector.slug === "impact-and-development" ? "page" : undefined}>{sector.title}<ArrowUpRight size={14} aria-hidden="true"/></Link>)}</div></nav>
    <section className="section-shell impact-story" aria-labelledby="impact-story-title">
      <div><span className="impact-eyebrow">The Story</span><h2 id="impact-story-title">Good intentions don’t speak for themselves.</h2></div>
      <div><p>Impact organisations often have the work, the results and the people, but not the narrative that earns trust, funding and partnership.</p><p>At EBA, we treat your mission the way a good editor treats a story: find the human centre, shape it with clarity, and put it in front of the right audience at the right moment.</p></div>
    </section>
    <section className="impact-services" aria-labelledby="impact-services-title"><div className="section-shell">
      <div className="impact-section-heading"><span className="impact-eyebrow">What We Do</span><h2 id="impact-services-title">Your mission.<br/>A story that reaches further.</h2></div>
      <div className="impact-service-grid">{services.map(([title, text], index) => <article key={title}><span className="impact-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div></section>
    <section className="section-shell impact-process" aria-labelledby="impact-process-title">
      <div className="impact-section-heading"><span className="impact-eyebrow">How We Work</span><h2 id="impact-process-title">From listening<br/>to being heard.</h2></div>
      <ol>{steps.map(([title, text], index) => <li key={title}><span className="impact-step">0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
    </section>
    <section className="impact-work" aria-labelledby="impact-work-title"><div className="section-shell">
      <div className="impact-section-heading"><span className="impact-eyebrow">Selected Work</span><h2 id="impact-work-title">Purpose, in the spotlight.</h2></div>
      <p className="impact-work-note">Project features are awaiting client permission. Photography below illustrates the themes of the work.</p>
      <div className="impact-work-grid">
        <article><div className="impact-work-photo"><Image src="/images/impact/women-together.jpg" alt="Women standing together in solidarity; illustrative stock photography" fill sizes="(max-width: 760px) 90vw, 45vw"/></div><div className="impact-work-meta"><span>Foundation / Women’s voices</span><span>Feature forthcoming</span></div><h3>Omodaadaa Foundation</h3><p>International Women’s Day</p></article>
        <article><div className="impact-work-photo"><Image src="/images/events/swing-for-autism/moment-1.webp" alt="Golfers at a Play With Stephen event; existing event imagery, not the Autism Hero Spotlight feature" fill sizes="(max-width: 760px) 90vw, 45vw"/></div><div className="impact-work-meta"><span>Advocacy / Autism awareness</span><span>Feature forthcoming</span></div><h3>Play With Stephen 2026</h3><p>Autism Hero Spotlight</p></article>
      </div>
      <p className="impact-credits">Illustrative photography: <a href="https://unsplash.com/photos/QhYYE7-VI2k" target="_blank" rel="noreferrer">Vitaly Gariev / Unsplash</a> · <a href="https://www.pexels.com/photo/group-of-women-standing-close-to-each-other-7951918/" target="_blank" rel="noreferrer">Pexels</a>. Play With Stephen: existing event photography.</p>
    </div></section>
    <section className="impact-cta"><div className="section-shell"><span className="impact-eyebrow">Let’s move purpose into action</span><h2>Doing work that deserves to be heard?<br/><em>Let’s tell it properly.</em></h2><ActionLink href="/get-in-touch" variant="yellow">Start a conversation</ActionLink></div></section>
  </main>;
}

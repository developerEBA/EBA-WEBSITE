import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ActionLink } from "@/components/shared/action-link";
import { sectorDetails } from "@/lib/about-content";

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
  return (
    <main className="about-detail-page impact-page">
      <section className="impact-hero">
        <div className="section-shell">
          <Link href="/about/our-story" className="about-detail-back"><ArrowLeft size={16} aria-hidden="true" /> About EBA</Link>
          <div className="impact-hero-grid">
            <div className="impact-hero-copy">
              <span className="eyebrow">OUR SECTORS / IMPACT & DEVELOPMENT</span>
              <h1>Stories that move purpose into action.</h1>
              <p>Foundations, nonprofits, CSR teams and advocacy groups do work that matters. We make sure the people who need to hear about it actually do.</p>
              <ActionLink href="/get-in-touch" variant="yellow">Start a conversation</ActionLink>
            </div>
            <figure className="impact-hero-photo">
              <div><Image src="/images/impact/community-volunteers.jpg" alt="Volunteers working together to sort clothing donations" fill preload sizes="(max-width: 760px) 90vw, 45vw" /></div>
              <figcaption>People at the heart of purpose. <span>Illustrative photography · Julia M Cameron / Pexels</span></figcaption>
            </figure>
          </div>
        </div>
      </section>

      <nav className="about-detail-nav" aria-label="Our sectors"><div className="section-shell">{sectorDetails.map(sector => (
        <Link key={sector.slug} href={`/about/sectors/${sector.slug}`} aria-current={sector.slug === "impact-and-development" ? "page" : undefined}>{sector.title}<ArrowUpRight size={14} aria-hidden="true" /></Link>
      ))}</div></nav>

      <section className="impact-story section-shell" aria-labelledby="impact-story-title">
        <div><span className="eyebrow">THE STORY</span><h2 id="impact-story-title">Good intentions don’t speak for themselves.</h2></div>
        <div><p>Impact organisations often have the work, the results and the people, but not the narrative that earns trust, funding and partnership.</p><p>At EBA, we treat your mission the way a good editor treats a story: find the human centre, shape it with clarity, and put it in front of the right audience at the right moment.</p></div>
      </section>

      <section className="impact-services section-shell" aria-labelledby="impact-services-title">
        <div className="impact-section-heading"><span className="eyebrow">PURPOSE, MADE UNDERSTOOD</span><h2 id="impact-services-title">What We Do</h2></div>
        <div className="impact-services-grid">{services.map(([title, description], index) => (
          <article key={title}><span className="impact-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>
        ))}</div>
      </section>

      <section className="impact-process" aria-labelledby="impact-process-title"><div className="section-shell">
        <div className="impact-section-heading"><span className="eyebrow">FROM MISSION TO MESSAGE</span><h2 id="impact-process-title">How We Work</h2></div>
        <ol>{steps.map(([title, description], index) => <li key={title}><span className="impact-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
      </div></section>

      <section className="impact-work section-shell" aria-labelledby="impact-work-title">
        <div className="impact-section-heading"><span className="eyebrow">STORIES WITH PURPOSE</span><h2 id="impact-work-title">Selected Work</h2></div>
        {/* Client permission must be confirmed before this local draft is published.
            Stock photography is explicitly illustrative, never presented as event coverage. */}
        <div className="impact-work-grid">
          <article><figure><div className="impact-work-image"><Image src="/images/impact/volunteer-portrait.jpg" alt="A volunteer wearing gloves and an identification badge outdoors" fill sizes="(max-width: 760px) 90vw, 45vw" /></div><figcaption>Illustrative photography · Ron Lach / Pexels</figcaption></figure><div className="impact-work-copy"><span className="eyebrow">FOUNDATION COMMUNICATIONS</span><h3>Omodaadaa Foundation</h3><p>International Women’s Day</p></div></article>
          <article><figure><div className="impact-work-image"><Image src="/images/events/swing-for-autism/moment-1.webp" alt="A moment from the Play With Stephen golf initiative" fill sizes="(max-width: 760px) 90vw, 45vw" /></div><figcaption>Play With Stephen · From the EBA event archive</figcaption></figure><div className="impact-work-copy"><span className="eyebrow">ADVOCACY & AWARENESS</span><h3>Play With Stephen 2026</h3><p>Autism Hero Spotlight</p></div></article>
        </div>
      </section>

      <section className="impact-cta section-shell"><span className="eyebrow">LET’S MAKE IT HEARD</span><h2>Doing work that deserves to be heard?</h2><p>Let’s tell it properly.</p><ActionLink href="/get-in-touch" variant="yellow">Start a conversation</ActionLink></section>
    </main>
  );
}

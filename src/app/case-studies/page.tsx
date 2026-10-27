import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ClientPortfolio } from "@/components/client-portfolio";
import { CaseStudyCollection } from "@/components/case-study-collection";
import { ActionLink } from "@/components/shared/action-link";
import { Reveal, Entrance } from "@/components/shared/motion";
import "./case-studies.css";

export const metadata: Metadata = { title: "Case Studies | Eni Brand Architect", description: "Selected EBA work: purposeful experiences, considered strategy and stories that connect." };
export default function CaseStudiesPage() {
  return <main className="case-page case-index">
    <section className="case-hero"><div className="section-shell case-hero-inner">
      <Reveal className="case-hero-copy"><span className="case-eyebrow"><span className="case-status-dot"/> EBA / CASE STUDIES</span><h1>Visibility.<br/>Credibility.<br/><em>Impact.</em></h1><p>See how EBA brings brand strategy, PR, communications, marketing, media and events together to help companies, organisations and personal brands build visibility, strengthen credibility and create meaningful impact.</p><ActionLink href="#selected-work" variant="yellow">Discover the Work</ActionLink></Reveal>
      <Entrance className="case-hero-art" direction="right"><div className="case-hero-photo"><Image src="/images/case-studies/brand-visibility.jpg" alt="Large illuminated advertising billboards in Times Square" fill priority style={{objectPosition:"center 62%"}} sizes="(max-width: 760px) 90vw, 50vw"/><div className="case-hero-photo-label"><span>BRANDS IN THE SPOTLIGHT</span><ArrowUpRight size={20}/></div></div><div className="case-hero-inset"><Image src="/images/events/lasting-moments.webp" alt="Guests smiling at communiTEEbyeba" fill sizes="(max-width: 760px) 35vw, 20vw"/></div><span className="case-hero-note">Good stories.<br/>Lasting connections.</span></Entrance>
    </div></section>
    <CaseStudyCollection/>
    <ClientPortfolio/>
    <section className="case-perspective"><Reveal className="section-shell"><span className="case-eyebrow">THE THREAD THROUGH EVERY PROJECT</span><h2>We don’t just put brands<br/>in front of people.<br/><em>We give people a reason to care.</em></h2><div className="case-principles">{[["01", "Understand deeply.", "The audience. The context. The opportunity. Every good story starts with listening."],["02", "Connect the thinking.", "Strategy, communications and experiences working towards the same purpose."],["03", "Make it matter.", "Work that feels relevant in the moment and meaningful beyond it."]].map(([n,title,copy])=><div key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></Reveal></section>
    <Reveal className="case-reputation section-shell"><div className="case-reputation-photo"><Image src="/images/events/lasting-moments.webp" alt="Guests celebrating a communiTEEbyeba experience" fill sizes="(max-width: 760px) 90vw, 50vw"/><span>IN THE ROOM. BEYOND THE MOMENT.</span></div><div><span className="case-eyebrow">ATTENTION IS EARNED. REPUTATION IS BUILT.</span><h2>Strategy.<br/><em>Execution.<br/>Impact.</em></h2><p>We connect strategy, PR, marketing and experiences to help brands build visibility, strengthen credibility and reach the audiences that matter.</p><ActionLink href="/services" variant="green">Explore Our Expertise</ActionLink></div></Reveal>
  </main>;
}

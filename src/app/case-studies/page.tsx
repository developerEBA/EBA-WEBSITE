import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CaseStudyCollection } from "@/components/case-study-collection";
import { ActionLink } from "@/components/shared/action-link";
import { Reveal, Entrance } from "@/components/shared/motion";
import "./case-studies.css";

export const metadata: Metadata = { title: "Case Studies | Eni Brand Architect", description: "Selected EBA work: purposeful experiences, considered strategy and stories that connect." };
export default function CaseStudiesPage() {
  return <main className="case-page case-index">
    <section className="case-hero"><div className="section-shell case-hero-inner">
      <Reveal className="case-hero-copy"><span className="case-eyebrow"><span className="case-status-dot"/> EBA / SELECTED WORK</span><h1>Ideas made<br/>visible.<br/><em>Impossible<br/>to ignore.</em></h1><p>Strategy gives it direction. Creativity gives it life. Explore the stories we bring into the world.</p><ActionLink href="#selected-work" variant="yellow">Discover the Work</ActionLink></Reveal>
      <Entrance className="case-hero-art" direction="right"><div className="case-hero-photo"><Image src="/images/events/swing-for-autism/moment-6.jpg" alt="Play With Stephen golfers at a purpose-driven tournament" fill priority sizes="(max-width: 760px) 90vw, 50vw"/><div className="case-hero-photo-label"><span>01 / PLAY WITH STEPHEN</span><ArrowUpRight size={20}/></div></div><div className="case-hero-inset"><Image src="/images/events/conversations.webp" alt="Guests in conversation at The Eniivy Experience" fill sizes="(max-width: 760px) 35vw, 20vw"/></div><span className="case-hero-note">Good stories.<br/>Lasting connections.</span></Entrance>
    </div></section>
    <CaseStudyCollection/>
    <section className="case-perspective"><Reveal className="section-shell"><span className="case-eyebrow">THE THREAD THROUGH EVERY PROJECT</span><h2>We don’t just put brands<br/>in front of people.<br/><em>We give people a reason to care.</em></h2><div className="case-principles">{[["01", "Understand deeply.", "The audience. The context. The opportunity. Every good story starts with listening."],["02", "Connect the thinking.", "Strategy, communications and experiences working towards the same purpose."],["03", "Make it matter.", "Work that feels relevant in the moment and meaningful beyond it."]].map(([n,title,copy])=><div key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></Reveal></section>
    <Reveal className="case-reputation section-shell"><div className="case-reputation-photo"><Image src="/images/work-event-amplification.png" alt="Delegates connecting at an industry conference" fill sizes="(max-width: 760px) 90vw, 50vw"/><span>IN THE ROOM. BEYOND THE MOMENT.</span></div><div><span className="case-eyebrow">ATTENTION IS EARNED. REPUTATION IS BUILT.</span><h2>Seen today.<br/><em>Remembered<br/>tomorrow.</em></h2><p>From a first conversation to a room full of possibilities, we bring clarity to what your brand stands for — and creativity to how the world experiences it.</p><ActionLink href="/services" variant="green">Explore Our Expertise</ActionLink></div></Reveal>
  </main>;
}

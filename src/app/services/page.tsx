import type { Metadata } from "next";
import Image from "next/image";
import { Entrance } from "@/components/shared/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { ActionLink } from "@/components/shared/action-link";
import { ServiceConstellation, MovingTestimonials, ServiceApproach } from "@/components/services/services-interactions";
import { CaseStudyStack } from "@/components/services/case-study-stack";
import "./services.css";

export const metadata: Metadata = { title: "Services | Eni Brand Architect", description: "One objective. The right mix of expertise. Explore EBA’s integrated brand strategy, PR, marketing, content, events and digital services." };




export default function ServicesPage() {
  return <main className="services-page" id="top">
    <section className="services-hero"><div className="services-shell services-hero-grid">
      <div className="services-hero-heading"><Entrance className="services-hero-copy"><h1>One Objective.<br/>The right mix of <em>expertise.</em></h1><div className="services-hero-note"><p>A launch. A reputation to build. A room full of people to bring together. Tell us what needs to happen. We will put the right people around it.</p><ActionLink href="/consultation" variant="green">Book a Consultation</ActionLink></div></Entrance><Entrance delay={.15} direction="right" className="services-hero-visual"><div className="services-hero-photo"><Image src="/images/work-brand-strategy.png" alt="A team discussing brand positioning and campaign strategy around a table" fill preload sizes="(max-width: 760px) 90vw, 42vw" style={{ objectFit: "cover" }}/></div></Entrance></div>
    </div></section>
    <section className="services-expertise" id="expertise"><div className="services-shell">
      <div className="services-intro merged-expertise"><Entrance><SectionHeading eyebrow="Our expertise / What we do" eyebrowClassName="services-eyebrow">Different needs.<br/>One connected approach.</SectionHeading></Entrance><Entrance delay={.12}><p>From strategy to visibility, communication, creative and experiences, our services work together or independently around what your brand needs.</p></Entrance></div>
      <ServiceConstellation/>
      <Entrance className="services-custom"><p>Looking for a custom solution?</p><ActionLink href="/get-in-touch" variant="yellow">Get in Touch</ActionLink></Entrance>
    </div></section>
    <ServiceApproach/>
    <section className="services-work-intro services-shell"><Entrance><SectionHeading eyebrow="Selected work / case studies" eyebrowClassName="services-eyebrow">The thinking.<br/>Then the work.</SectionHeading><p>We turn strategy into campaigns, content and experiences people can see, engage with and remember.</p></Entrance></section>
    <CaseStudyStack/>
    <MovingTestimonials/>
  </main>;
}











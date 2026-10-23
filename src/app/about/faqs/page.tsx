import { SectionHeading } from "@/components/shared/section-heading";
import type { Metadata } from "next";
import FaqExplorer from "@/components/faq-explorer";
import { Entrance } from "@/components/shared/motion";
import { ContactButton, PageNewsletter } from "@/components/about-shared";
import "../about-pages.css";
export const metadata: Metadata = { title: "FAQs | Eni Brand Architect", description: "Answers to your questions about EBA, brand strategy, PR, marketing, content, production and website services." };
export default function FaqPage() {
 return <main className="about-page faq-page" id="top"><FaqExplorer/><section className="faq-container faq-bottom-cta"><Entrance><SectionHeading eyebrow="Still curious?" eyebrowClassName="eyebrow yellow-text">Let’s Talk About<br/>What You’re Building.</SectionHeading></Entrance><Entrance direction="right"><p>Have a question that isn’t answered here? Our team would love to hear about your ideas and discuss how EBA can help.</p><ContactButton yellow href="/get-in-touch">Get in Touch</ContactButton></Entrance></section><PageNewsletter/></main>;
}


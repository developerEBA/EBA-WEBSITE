import type { Metadata } from "next";
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { ContactForms } from "@/components/contact-forms";
import "../consultation/consultation.css";
import "./get-in-touch.css";

export const metadata: Metadata = { title: "Get in Touch | Eni Brand Architect", description: "Work with EBA or introduce yourself to our team. Tell us about your brand, project or experience." };
export default function GetInTouchPage() {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Lagos", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return <main className="contact-page"><div className="contact-page-shell"><section className="contact-page-hero" aria-labelledby="contact-title"><span className="contact-eyebrow">Get in touch</span><h1 id="contact-title">Let’s start a<br/><em>conversation.</em></h1><p>Whether you want to work with EBA or become part of our team, tell us a little about yourself and what you have in mind.</p><span className="contact-hero-line" aria-hidden="true"/></section><div className="contact-details-strip"><a href="mailto:admin@enibrand.com"><Mail size={17}/><div><span>Email</span><strong>admin@enibrand.com</strong></div><ArrowUpRight size={14}/></a><a href="tel:+2349033801241"><Phone size={17}/><div><span>Phone</span><strong>0903 380 1241</strong></div><ArrowUpRight size={14}/></a><div><MapPin size={17}/><div><span>Location</span><strong>Lagos, Nigeria</strong></div></div><div><Clock3 size={17}/><div><span>Office hours</span><strong>Mon–Fri · 9am–6pm WAT</strong></div></div></div><section className="contact-form-section" aria-labelledby="contact-help"><header><span className="contact-eyebrow">A place for your next step</span><h2 id="contact-help">How can we help?</h2><p>Choose what brings you here. We’ll take it from there.</p></header><ContactForms today={today}/><p className="contact-closing">Good work starts with a conversation.</p></section></div></main>;
}

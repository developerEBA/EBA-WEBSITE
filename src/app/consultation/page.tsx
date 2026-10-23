import type { Metadata } from "next";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { ConsultationForm } from "@/components/consultation-form";
import "./consultation.css";

export const metadata: Metadata = { title: "Book a Consultation | EBA", description: "Tell Eni Brand Architect what you are building and request a consultation with our team." };
export default async function ConsultationPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Lagos", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return <main className="consultation-page"><section className="consultation-shell" aria-labelledby="consultation-title"><aside className="consultation-intro"><div><span className="consultation-eyebrow">Book a consultation</span><h1 id="consultation-title">Let’s talk about<br/>{" "}what you’re<br/>{" "}<em>building.</em></h1><p>Tell us where you are, what you want to achieve and where you need support. We’ll review your request and agree on the next step with you.</p></div><ol className="consultation-steps">{[["Tell us what you need", "A little about your brand, challenge or goal."], ["Choose your preferred time", "Pick a date and time that work for you."], ["We’ll confirm the consultation", "Our team will follow up to confirm availability."]].map(([title, text], i) => <li key={title}><span>0{i + 1}</span><div><h2>{title}</h2><p>{text}</p></div></li>)}</ol><div className="consultation-contacts"><a href="mailto:admin@enibrand.com"><Mail size={16}/><span><small>Email</small>admin@enibrand.com</span><ArrowUpRight size={14}/></a><a href="tel:+2349033801241"><Phone size={16}/><span><small>Phone</small>0903 380 1241</span><ArrowUpRight size={14}/></a></div></aside><div className="consultation-form-panel"><span className="consultation-form-kicker">A good place to start</span><h2>Book your consultation</h2><p>Share a few details. We’ll take it from there.</p><ConsultationForm key={service ?? "general"} initialService={service} today={today}/></div></section></main>;
}


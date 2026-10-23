import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/case-studies";
import { ActionLink } from "@/components/shared/action-link";
import { Reveal } from "@/components/shared/motion";
import "../case-studies.css";
export function generateStaticParams() { return caseStudies.map(({slug}) => ({slug})); }
export async function generateMetadata({params}: {params: Promise<{slug:string}>}): Promise<Metadata> { const {slug}=await params; const study=caseStudies.find(item=>item.slug===slug); return {title: `${study?.title ?? "Case Study"} | EBA`}; }
export default async function CaseStudyPage({params}: {params: Promise<{slug:string}>}) {
  const {slug}=await params; const study=caseStudies.find(item=>item.slug===slug); if(!study) notFound();
  return <main className="case-page"><section className="case-hero"><div className="section-shell case-hero-inner"><Reveal><span className="case-eyebrow">{study.category}</span><h1>{study.title}</h1><p>{study.line}</p><ActionLink href="/case-studies" variant="yellow">All Case Studies</ActionLink></Reveal><div className="case-hero-photo"><Image src={study.image} alt={study.alt} fill priority sizes="(max-width:760px) 90vw, 40vw"/></div></div></section><Reveal className="case-detail section-shell"><span className="case-eyebrow">THE CONTEXT</span><h2>A story with a reason to exist.</h2><p>{study.description}</p><div className="case-detail-approach"><h2>The thinking behind the work.</h2><p>{study.approach}</p></div><ActionLink href={study.event} variant="green">Explore the Experience</ActionLink></Reveal></main>;
}

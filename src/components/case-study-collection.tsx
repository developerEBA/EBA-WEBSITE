"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseCategories, caseStudies } from "@/lib/case-studies";
import { ActionLink } from "@/components/shared/action-link";
import { Reveal } from "@/components/shared/motion";

export function CaseStudyCollection() {
  const [category, setCategory] = useState("All Work");
  const visible = caseStudies.filter(study => category === "All Work" || study.tags.includes(category));
  return <section id="selected-work" className="case-collection">
    <div className="section-shell case-collection-heading"><div><span className="case-eyebrow">STRATEGY, MADE TANGIBLE</span><h2>The work.<br/><em>The world it moves.</em></h2></div><p>Different briefs. Distinct perspectives.<br/>One belief: every brand has a story worth getting right.</p></div>
    <div className="case-filters section-shell" role="group" aria-label="Filter case studies">{caseCategories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item === "All Work" ? "↗ " : ""}{item}</button>)}</div>
    <p className="case-result-count section-shell" aria-live="polite">{visible.length} selected {visible.length === 1 ? "story" : "stories"}{category !== "All Work" ? ` · ${category}` : ""}</p>
    {visible.map(study => <article key={study.slug} className={`case-feature case-feature-${study.slug}`}><Reveal className="section-shell case-feature-inner"><Link href={`/case-studies/${study.slug}`} className="case-feature-photo" aria-label={`View ${study.title} case study`}><Image src={study.image} alt={study.alt} fill sizes="(max-width: 760px) 90vw, 65vw" /><span className="case-project-index">0{caseStudies.indexOf(study)+1} / SELECTED WORK</span><span className="case-project-open"><ArrowUpRight size={24}/></span></Link><div className="case-feature-copy"><span className="case-eyebrow">{study.category}</span><h2>{study.title}</h2><p className="case-deck">{study.line}</p><p>{study.description}</p><ActionLink href={`/case-studies/${study.slug}`} variant="green">Explore Case Study</ActionLink></div></Reveal></article>)}
  </section>;
}

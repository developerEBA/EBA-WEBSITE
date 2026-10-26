"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseCategories, caseStudies } from "@/lib/case-studies";
import { Reveal } from "@/components/shared/motion";

export function CaseStudyCollection() {
  const [category, setCategory] = useState("All Work");
  const visible = caseStudies.filter(study => category === "All Work" || study.tags.includes(category));
  return <section id="selected-work" className="case-collection">
    <div className="section-shell case-collection-heading"><div><span className="case-eyebrow">STRATEGY, MADE TANGIBLE</span><h2>Selected work.<br/><em>Purpose in practice.</em></h2></div><p>Agency partnerships, events, PR, amplification and marketing. Explore each project through its main focus.</p></div>
    <div className="case-filters section-shell" role="group" aria-label="Filter case studies">{caseCategories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item === "All Work" ? "↗ " : ""}{item}</button>)}</div>
    <p className="case-result-count section-shell" aria-live="polite">{visible.length} selected {visible.length === 1 ? "story" : "stories"}{category !== "All Work" ? ` · ${category}` : ""}</p>
    <div className="section-shell case-project-grid">
      {visible.map(study => <Reveal key={study.slug} className={`case-project-card${study.slug === "mediareach" ? " case-project-featured" : ""}${study.imageFit === "contain" ? " case-project-brand" : ""}`}>
        <article>
          <Link href={`/case-studies/${study.slug}`} className="case-card-visual" aria-label={`View ${study.title} case study`}>
            <Image src={study.image} alt={study.alt} fill style={{ objectFit: study.imageFit || "cover" }} sizes={study.slug === "mediareach" ? "(max-width:760px) 90vw, 55vw" : "(max-width:760px) 90vw, 45vw"}/>
            <span className="case-card-number">{String(caseStudies.indexOf(study)+1).padStart(2,"0")} / EBA SELECTED WORK</span>
            <span className="case-card-arrow" aria-hidden="true"><ArrowUpRight size={25}/></span>
          </Link>
          <div className="case-card-body"><div className="case-card-category"><span/>{study.category}</div><h3><Link href={`/case-studies/${study.slug}`}>{study.title}</Link></h3><p className="case-card-line">{study.line}</p><p className="case-card-description">{study.description}</p><Link className="case-card-link" href={`/case-studies/${study.slug}`}>Explore the case study <ArrowUpRight size={17}/></Link></div>
        </article>
      </Reveal>)}
    </div>
  </section>;
}

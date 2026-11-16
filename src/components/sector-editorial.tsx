import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUpRight } from "lucide-react";
import { sectorEditorials, type SectorEditorial as SectorContent } from "@/lib/sector-editorials";
import "@/app/about/sector-editorial.css";

export function SectorEditorial({ sector }: { sector: SectorContent }) {
  return <main className={`sector-editorial sector-${sector.slug}`} id="top">
    <section className="se-hero">
      <div className="section-shell">
        <div className="se-masthead"><Link href="/about/our-story"><ArrowLeft size={14} aria-hidden="true"/> About EBA</Link><span>Our worlds / {sector.number}</span></div>
        <div className="se-title-row"><span className="se-script">{sector.title}</span><span className="se-label">Strategy. Story. Relevance.</span></div>
        <h1>{sector.headline}<br/><em>{sector.emphasis}</em></h1>
        <div className="se-hero-bottom"><p>{sector.intro}</p><Link className="se-round-link" href="#sector-story" aria-label="Explore the story"><ArrowDown size={22}/></Link></div>
        <figure className="se-hero-image"><Image src={sector.image} alt={sector.alt} fill preload sizes="90vw"/><figcaption><span>{sector.number} / {sector.title}</span><span>{sector.signature}</span></figcaption></figure>
      </div>
    </section>
    <nav className="se-sector-nav" aria-label="Our sectors"><div className="section-shell">{sectorEditorials.map(item=><Link key={item.slug} href={`/about/sectors/${item.slug}`} aria-current={item.slug===sector.slug?"page":undefined}><span>{item.number}</span>{item.title}<ArrowUpRight size={14} aria-hidden="true"/></Link>)}</div></nav>
    <section className="se-story section-shell" id="sector-story" aria-labelledby="se-story-heading"><div><span className="se-label">01 / The Story</span><h2 id="se-story-heading">{sector.storyTitle}</h2></div><div><span className="se-script">The thinking behind the work.</span><p>{sector.story}</p><Link className="se-text-link" href="/get-in-touch">Start a conversation <ArrowUpRight size={16} aria-hidden="true"/></Link></div></section>
    <section className="se-services" aria-labelledby="se-services-heading"><div className="section-shell"><div className="se-section-heading"><div><span className="se-label">02 / What We Do</span><h2 id="se-services-heading">{sector.serviceTitle}</h2></div><span className="se-script">Connected expertise.<br/>One clear direction.</span></div><div className="se-service-grid">{sector.services.map(([title,text],i)=><article key={title}><span className="se-item-number">0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
    <section className="se-process section-shell" aria-labelledby="se-process-heading"><div className="se-section-heading"><div><span className="se-label">03 / How We Work</span><h2 id="se-process-heading">Good thinking.<br/><em>Deliberate action.</em></h2></div><span className="se-script">From the first conversation<br/>to what comes next.</span></div><ol>{sector.steps.map(([title,text],i)=><li key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>
    <section className="se-work" aria-labelledby="se-work-heading"><div className="section-shell"><div className="se-section-heading"><div><span className="se-label">04 / Selected Work</span><h2 id="se-work-heading">Stories with<br/><em>something to say.</em></h2></div><span className="se-script">A closer look.</span></div>{sector.permissionPending&&<p className="se-permission">Client features are awaiting permission. Sector photography is illustrative.</p>}<div className="se-work-grid">{sector.work.map((work,i)=><article key={work.title} className={work.image?"se-project":"se-project se-project-typographic"}>{work.image?<div className="se-project-image"><Image src={work.image} alt={work.alt??work.title} fill sizes="(max-width:700px) 90vw, 45vw"/></div>:<div className={`se-project-cover se-cover-${i%4}`}><span className="se-label">{work.category}</span><span className="se-cover-title">{work.title}</span><span className="se-cover-foot">{work.forthcoming?"Forthcoming":"EBA / Selected work"}<span aria-hidden="true">0{i+1}</span></span></div>}<div className="se-project-meta"><span>{work.category}</span>{work.forthcoming&&<span>Forthcoming</span>}</div><h3>{work.title}</h3><p>{work.description}</p>{work.href&&<Link href={work.href} className="se-text-link">Explore the work <ArrowUpRight size={14} aria-hidden="true"/></Link>}</article>)}</div></div></section>
  </main>;
}

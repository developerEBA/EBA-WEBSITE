"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { portfolioCategories, portfolioClients } from "@/lib/client-portfolio";

export function ClientPortfolio() {
  const [category, setCategory] = useState<typeof portfolioCategories[number]>("All");
  const visible = portfolioClients.filter(client => category === "All" || client.category === category);
  return <section className="client-portfolio section-shell" id="client-portfolio" aria-labelledby="portfolio-title">
    <div className="client-portfolio-heading"><div><span className="case-eyebrow">The people & brands behind the work</span><h2 id="portfolio-title">Companies. Communities.<br/><em>Personal brands, too.</em></h2></div><p>From business reputations to individual voices, our portfolio brings together organisations, founders, talent and platforms we have worked with.</p></div>
    <div className="portfolio-filters" role="group" aria-label="Filter client portfolio">{portfolioCategories.map(item=><button key={item} type="button" aria-pressed={category===item} onClick={()=>setCategory(item)}>{item}</button>)}</div>
    <p className="portfolio-result-count" role="status">{visible.length} {category === "All" ? "portfolio entries" : category.toLowerCase()}</p>
    <div className="client-logo-grid">{visible.map(client=><article key={`${client.category}:${client.name}`} className={`client-logo-tile${client.dark ? " client-logo-dark" : ""}${client.category === "Personal Brands" ? " client-person-tile" : ""}${client.background === "black" ? " client-logo-black" : ""}`}>
      <div className="client-logo-art">{client.logo ? <Image src={client.logo} alt={`${client.name} logo`} fill sizes="(max-width:600px) 40vw, 220px" style={{objectFit:"contain"}}/> : client.portrait ? <Image src={client.portrait} alt={client.name} width={78} height={78} className="client-portrait"/> : <span className="client-name-display">{client.name}</span>}</div>
      <div className="client-logo-caption"><h3>{client.name}</h3><span>{client.category}</span></div>
    </article>)}</div>
    <div className="personal-brand-invitation"><div><span className="case-eyebrow">PR for people with something to say</span><h3>Your name is a brand.<br/><em>Give it a clear voice.</em></h3><p>We support founders, executives, creatives and talent with positioning, personal brand storytelling, media relations and strategic communications.</p></div><Link href="/consultation?service=pr-and-strategic-communications" className="pill green">Build your personal brand <ArrowUpRight size={16}/></Link></div>
  </section>;
}

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ActionLink } from "@/components/shared/action-link";
import { sectorDetails } from "@/lib/about-content";
import { sectorVisuals, type SectorSlug } from "@/lib/sector-visuals";

type Sector = (typeof sectorDetails)[number];

export function SectorDetail({ sector }: { sector: Sector }) {
  const index = sectorDetails.findIndex(item => item.slug === sector.slug);
  const visual = sectorVisuals[sector.slug as SectorSlug];
  const next = sectorDetails[(index + 1) % sectorDetails.length];
  const nextVisual = sectorVisuals[next.slug as SectorSlug];
  const selectedWork = sector.selectedWork.filter(project => project.permissionConfirmed);
  const words = sector.line.trim().split(" ");
  const lastWord = words.pop();

  return <main className="sector-detail-page">
    <section className="sector-detail-hero sector-shell" aria-labelledby="sector-title">
      <div className="sector-hero-copy">
        <Link href="/#sectors" className="sector-home-link"><ArrowLeft size={16} aria-hidden="true" />Back to Home</Link>
        <div className="sector-hero-heading">
          <p className="sector-name">{sector.title}</p>
          <h1 id="sector-title">{words.join(" ")} <em>{lastWord}</em></h1>
          <p className="sector-hero-intro">{sector.intro}</p>
          <ActionLink href="/get-in-touch" variant="green">Start a Conversation</ActionLink>
        </div>
        <span className="sector-edition" aria-hidden="true">0{index + 1}</span>
      </div>
      <figure className="sector-hero-figure">
        <div className="sector-hero-image"><Image src={visual.hero} alt={visual.heroAlt} fill preload sizes="(max-width: 760px) 92vw, 55vw" style={{ objectFit: "cover", objectPosition: visual.position }} /></div>
        <figcaption>{visual.caption}</figcaption>
      </figure>
    </section>

    <nav className="sector-switcher sector-shell" aria-label="Sector collection">
      {sectorDetails.map(item => <Link key={item.slug} href={`/about/sectors/${item.slug}`} aria-current={item.slug === sector.slug ? "page" : undefined}>{item.title}<ArrowUpRight size={15} aria-hidden="true" /></Link>)}
    </nav>

    <section className="sector-overview sector-shell" aria-labelledby="sector-overview-title">
      <div><h2 id="sector-overview-title">The Story</h2></div>
      <p className="sector-overview-body">{sector.body}</p>
    </section>

    <section className="sector-focus-band" aria-labelledby="sector-focus-title">
      <div className="sector-focus-layout sector-shell">
        <div className="sector-focus-image"><div className="sector-focus-image-frame"><Image src={visual.detail} alt={visual.detailAlt} fill sizes="(max-width: 760px) 92vw, 35vw" style={{ objectFit: "cover" }} /></div></div>
        <div className="sector-focus-content">
          <h2 id="sector-focus-title">What We Do</h2>
          <ol className="sector-focus-list">{sector.focus.map(([heading, description], i) => <li key={heading}><span aria-hidden="true">0{i + 1}</span><h3>{heading}</h3><p>{description}</p></li>)}</ol>
        </div>
      </div>
    </section>

    <section className="sector-process sector-shell" aria-labelledby="sector-process-title">
      <h2 id="sector-process-title">How We Work</h2>
      <ol>{sector.workflow.map(([heading, description], i) => <li key={heading}><span aria-hidden="true">0{i + 1}</span><h3>{heading}</h3><p>{description}</p></li>)}</ol>
    </section>

    {selectedWork.length > 0 && <section className="sector-selected-work sector-shell" aria-labelledby="sector-work-title">
      <h2 id="sector-work-title">Selected Work</h2>
      <div className="sector-project-list">{selectedWork.map((project, i) => <article key={project.client} className={project.images.length ? "sector-project" : "sector-project sector-project-text"}>
        {project.images.length > 0 && <div className={`sector-project-media ${project.images.every(image => image.fit === "contain") ? "sector-project-logos" : ""}`}>{project.images.map(image => <div key={image.src}><Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 90vw, 40vw" style={{ objectFit: image.fit === "contain" ? "contain" : "cover", objectPosition: "50% 35%" }} /></div>)}</div>}
        <div className="sector-project-copy"><span className="sector-project-number" aria-hidden="true">0{i + 1}</span><h3>{project.client}</h3><p>{project.work}</p>{project.href && <Link className="sector-text-link" href={project.href}>View related work<ArrowUpRight size={18} aria-hidden="true" /></Link>}</div>
      </article>)}</div>
    </section>}

    <section className="sector-next sector-shell" aria-label="Explore another sector">
      <Link href={`/about/sectors/${next.slug}`} className="sector-next-image" aria-label={`Explore ${next.title}`}><Image src={nextVisual.detail} alt={nextVisual.detailAlt} fill sizes="(max-width: 760px) 92vw, 45vw" style={{ objectFit: "cover", objectPosition: "50% 35%" }} /></Link>
      <div className="sector-next-copy"><h2><Link href={`/about/sectors/${next.slug}`}>{next.title}</Link></h2><Link className="sector-text-link" href={`/about/sectors/${next.slug}`}>Explore next sector<ArrowRight size={22} aria-hidden="true" /></Link></div>
    </section>

    <section className="sector-closing" aria-labelledby="sector-closing-title"><div className="sector-shell"><h2 id="sector-closing-title">Let’s give your work<br />the story it <em>deserves.</em></h2><div className="sector-closing-actions"><ActionLink href={`/services/${sector.service}`} variant="yellow">Explore the Service</ActionLink><Link className="pill outline-light" href="/"><ArrowLeft size={16} aria-hidden="true" />Back to Home</Link></div></div></section>
  </main>;
}

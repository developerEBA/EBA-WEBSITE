"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Globe2, Plus, Minus, RotateCcw } from "lucide-react";
import world from "@/lib/world-map.json";
import { globalFootprint } from "@/lib/global-footprint";
import { testimonials } from "@/lib/testimonials";
import "./portfolio-map.css";

export function PortfolioMap() {
  const [active, setActive] = useState("nigeria");
  const [voice, setVoice] = useState(0);
  const [zoom, setZoom] = useState(1);
  const testimonial = testimonials[voice];
  const location = globalFootprint.find(item => item.id === active)!;
  const mapWidth = 720 / zoom, mapHeight = 300 / zoom;
  const mapX = zoom === 1 ? 0 : Math.max(0, Math.min(720 - mapWidth, (location.coordinates[0] + 180) * 2 - mapWidth / 2));
  const mapY = zoom === 1 ? 0 : Math.max(0, Math.min(300 - mapHeight, (85 - location.coordinates[1]) * 2 - mapHeight / 2));
  return <section className="portfolio-footprint global-footprint section-shell" id="footprint">
    <div className="portfolio-copy"><span className="eyebrow">African-born. Globally connected.</span><h2>Great connections.<br/><em>Across borders.</em></h2><p>Companies, communities and personal brands. Explore the people and places connected to our work.</p><Link href="/case-studies#client-portfolio" className="pill yellow">Meet our clients <ArrowUpRight size={16}/></Link>
      <div className="footprint-testimonials" aria-label="Client testimonials"><span className="tiny-label">WHAT OUR CLIENTS SAY</span><div className="footprint-voices" role="group" aria-label="Choose a client testimonial">{testimonials.map((person, index) => <button type="button" key={person.name} aria-pressed={voice === index} aria-label={`Read ${person.name}’s testimonial`} onClick={() => setVoice(index)}><Image src={person.portrait} alt="" width={40} height={40}/></button>)}</div><div className="footprint-quote" aria-live="polite"><blockquote>“{testimonial.text}”</blockquote><Link href={`/services#client-${testimonial.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}><strong>{testimonial.name}</strong><span>{testimonial.role}</span></Link></div></div>
    </div>
    <div className="global-footprint-layout">
      <div className="global-map-panel"><span className="global-map-label"><Globe2 size={15} aria-hidden="true"/> THE EBA FOOTPRINT</span>
        <div className="global-map-controls" role="group" aria-label="Map zoom controls"><button type="button" aria-label="Zoom out map" disabled={zoom === 1} onClick={() => setZoom(value => Math.max(1, value - 1))}><Minus size={14}/></button><output aria-live="polite">{zoom}×</output><button type="button" aria-label="Zoom in map" disabled={zoom === 4} onClick={() => setZoom(value => Math.min(4, value + 1))}><Plus size={14}/></button><button type="button" aria-label="Reset map zoom" disabled={zoom === 1} onClick={() => setZoom(1)}><RotateCcw size={13}/></button></div>
        <svg viewBox={`${mapX} ${mapY} ${mapWidth} ${mapHeight}`} role="group" aria-label="World map of EBA client locations">
          <g aria-hidden="true">{world.map(feature => <path key={feature.name} d={feature.path} className={feature.name === location.country ? "global-country is-active" : globalFootprint.some(item => item.country === feature.name) ? "global-country has-clients" : "global-country"}/>)}</g>
          {globalFootprint.map(item => { const [longitude, latitude] = item.coordinates; const x = (longitude + 180) * 2, y = (85 - latitude) * 2; return <g key={item.id} className="global-map-marker" role="button" tabIndex={0} aria-label={`Show clients in ${item.label}`} aria-pressed={active === item.id} onClick={() => setActive(item.id)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActive(item.id); } }}><title>{item.label}</title><circle cx={x} cy={y} r={(active === item.id ? 8 : 5) / zoom} className="global-marker-halo"/><circle cx={x} cy={y} r={3 / zoom} className="global-marker-dot"/></g>; })}
        </svg>
        <p className="global-map-hint">Choose a location. Use + to magnify that area of the map.</p>
        <div className="portfolio-country-buttons global-location-buttons" role="group" aria-label="Explore client locations">{globalFootprint.map(item => <button type="button" key={item.id} aria-pressed={active === item.id} aria-controls="global-location-clients" onClick={() => setActive(item.id)}>{item.label}<ArrowUpRight size={13} aria-hidden="true"/></button>)}</div>
      </div>
      <div className="global-clients-panel" id="global-location-clients" aria-live="polite" aria-atomic="true"><span className="tiny-label">CLIENTS & CONNECTIONS</span><h3>{location.label}</h3><p className="global-client-count">{location.clients.length} {location.clients.length === 1 ? "connection" : "connections"}</p><div className="global-client-grid">{location.clients.map(person => <Link key={person.name} href="/case-studies#client-portfolio" className="global-client"><div className={`global-client-art${person.dark ? " is-dark" : ""}`}>{person.logo ? <Image src={person.logo} alt={`${person.name} logo`} width={110} height={65} style={{ objectFit: "contain" }}/> : person.portrait ? <Image src={person.portrait} alt={person.name} width={65} height={65} className="global-client-portrait"/> : <span className="global-client-name-art">{person.name}</span>}</div><strong>{person.name}</strong><span>{person.category}</span></Link>)}</div></div>
    </div>
  </section>;
}

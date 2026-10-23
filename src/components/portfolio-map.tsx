"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import africa from "@/lib/africa.json";
import { testimonials } from "@/lib/testimonials";
type Polygon = number[][][];
function pathFor(type: string, coordinates: unknown): string {
  const polygons = type === "Polygon" ? [coordinates as Polygon] : coordinates as Polygon[];
  return polygons.map(polygon => polygon.map(ring => ring.map(([lon, lat], i) => `${i ? "L" : "M"}${((lon + 20) * 5.25).toFixed(1)},${((39 - lat) * 5.25).toFixed(1)}`).join(" ") + "Z").join(" ")).join(" ");
}

export function PortfolioMap() {
 const [country,setCountry]=useState<string|null>(null);
 const reduce=useReducedMotion();
 return <section className="portfolio-footprint section-shell" id="footprint"><div className="portfolio-copy"><span className="eyebrow">Rooted here. Relevant everywhere.</span><h2>African-born.<br/>Built to travel.</h2><p>Local understanding. Lasting connections. Explore the map to meet the people behind the work.</p><Link href="/services" className="pill yellow">Discover Our Services <ArrowUpRight size={16}/></Link></div><div className="portfolio-map-panel"><div className="portfolio-client-panel" aria-live="polite"><span className="tiny-label">{country ? country+' / CLIENT VOICES' : 'SELECT NIGERIA TO MEET OUR CLIENTS'}</span>{country==='Nigeria' ? <motion.div key="nigeria" initial={reduce?false:{opacity:0,y:15}} animate={{opacity:1,y:0}} className="portfolio-client-grid">{testimonials.map(person=><Link key={person.name} href={`/services#client-${person.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`} className="portfolio-client" aria-label={`Read ${person.name}’s testimonial on our Services page`}><Image src={person.portrait} alt={person.name} width={72} height={72}/><strong>{person.name}</strong><span>“{person.text}”</span></Link>)}</motion.div> : <p>{country ? 'Client stories for this country will be added as they are confirmed.' : 'Click a country on the map. Select a client portrait to read their testimonial on our Services page.'}</p>}</div><div className="portfolio-map-layout"><svg viewBox="0 0 415 405" role="group" aria-label="Select a country to explore client testimonials">{africa.map(feature=><path key={feature.properties.name} d={pathFor(feature.geometry.type,feature.geometry.coordinates)} fill={feature.properties.name===country?'#FFC107':'#6d8058'} stroke="#123f30" strokeWidth="1.3" role="button" tabIndex={0} aria-label={feature.properties.name} aria-pressed={feature.properties.name===country} onClick={()=>setCountry(feature.properties.name)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setCountry(feature.properties.name);}}}><title>{feature.properties.name}</title></path>)}</svg><div className="portfolio-country-buttons">{['Nigeria','Ghana','Kenya','South Africa','Benin'].map(name=><button type="button" key={name} aria-pressed={country===name} onClick={()=>setCountry(name)}>{name}<ArrowUpRight size={13}/></button>)}</div></div></div></section>;
}

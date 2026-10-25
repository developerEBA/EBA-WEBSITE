"use client";
import { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { eventHeroPhotos } from "@/lib/event-content";
export function ExperienceGallery() {
  const track=useRef<HTMLDivElement>(null);
  const reduce=useReducedMotion();
  function move(direction:number){const node=track.current;if(node)node.scrollBy({left:direction*(node.clientWidth*.65),behavior:reduce?"instant":"smooth"});}
  return <section className="experience-gallery"><div className="experience-shell experience-gallery-heading"><div><span className="experience-eyebrow">From the room</span><h2>The moments in between.</h2></div><div className="experience-gallery-controls"><button aria-label="Previous gallery photos" onClick={()=>move(-1)}><ArrowLeft size={19}/></button><button aria-label="Next gallery photos" onClick={()=>move(1)}><ArrowRight size={19}/></button></div></div><div className="experience-gallery-track" ref={track} tabIndex={0} role="region" aria-label="Photographs from EBA experiences">{eventHeroPhotos.map((photo,i)=><figure key={photo.src} className={`experience-gallery-frame frame-${i%3}`}><div><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 75vw, 30vw" style={{objectFit:"cover",objectPosition:photo.position}}/></div><figcaption>{["A conversation worth having.","A space to belong.","A different perspective.","Good company.","A shared moment.","Something to remember."][i]}</figcaption></figure>)}</div></section>;
}

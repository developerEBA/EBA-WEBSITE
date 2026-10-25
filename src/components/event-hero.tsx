"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { eventHeroPhotos } from "@/lib/event-content";

export default function EventHero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (paused || reduce) return;
    const timer = setInterval(() => { if (!document.hidden) setIndex(value => (value+1)%eventHeroPhotos.length); }, 6500);
    return () => clearInterval(timer);
  }, [paused, reduce]);
  const photo = eventHeroPhotos[index];
  return <section className="experience-opening experience-shell"><div className="experience-opening-header"><span>Events & experiences</span></div><div className="experience-hero" aria-label="EBA event highlights" aria-roledescription="carousel"><div className="experience-hero-photo"><AnimatePresence initial={false}>{<motion.div key={photo.src} initial={reduce ? false : { opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ opacity: { duration: .7 }, scale: { duration: 6.5, ease: "linear" } }}><Image src={photo.src} alt={photo.alt} fill sizes="95vw" preload={index === 0} style={{ objectFit: "cover", objectPosition: photo.position }}/></motion.div>}</AnimatePresence></div><div className="experience-hero-shade"/><div className="experience-hero-copy"><motion.h1 initial={reduce ? false : { opacity:0, y:20 }} animate={{opacity:1,y:0}} transition={{duration:.7}}>You had to<br/><em>be there.</em></motion.h1><p>People, purpose and a room full of possibility.<br/>Experiences brought to life by EBA.</p><Link className="experience-hero-link" href="#event-stories">Explore the experiences <ArrowUpRight size={18}/></Link></div><div className="experience-hero-controls"><span aria-live="off">{String(index+1).padStart(2,"0")} <small>/ {String(eventHeroPhotos.length).padStart(2,"0")}</small></span><button aria-label="Previous event photo" onClick={() => setIndex((index-1+eventHeroPhotos.length)%eventHeroPhotos.length)}><ChevronLeft size={18}/></button><button aria-label={paused || reduce ? "Play event slideshow" : "Pause event slideshow"} disabled={Boolean(reduce)} onClick={() => setPaused(value=>!value)}>{paused || reduce ? <Play size={14}/> : <Pause size={14}/>}</button><button aria-label="Next event photo" onClick={() => setIndex((index+1)%eventHeroPhotos.length)}><ChevronRight size={18}/></button></div><span className="experience-hero-caption">Community. Conversation. Connection.</span></div></section>;
}

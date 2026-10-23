"use client";

import Image from "next/image";
import Link from "next/link";
import { ActionLink } from "@/components/shared/action-link";
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
    const timer = setInterval(() => {
      if (!document.hidden) setIndex(current => (current + 1) % eventHeroPhotos.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused, reduce, index]);
  const move = (step: number) => setIndex(current => (current + step + eventHeroPhotos.length) % eventHeroPhotos.length);
  const photo = eventHeroPhotos[index];
  return <section className="event-hero" aria-label="Event highlights" aria-roledescription="carousel">
    <div className="event-hero-images" aria-live="off">
      <div className="event-hero-slide" style={{ visibility: "hidden" }} aria-hidden="true"><Image src={eventHeroPhotos[(index + 1) % eventHeroPhotos.length].src} alt="" fill loading="eager" sizes="100vw" style={{ objectFit: "cover" }}/></div>
      <AnimatePresence initial={false}>
        <motion.div key={photo.src} className="event-hero-slide" initial={reduce ? false : { opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ opacity: { duration: .9 }, scale: { duration: 6, ease: "linear" } }}>
          <Image src={photo.src} alt={photo.alt} fill preload={index === 0} sizes="100vw" style={{ objectFit: "cover", objectPosition: photo.position }}/>
        </motion.div>
      </AnimatePresence>
    </div>
    <div className="event-hero-overlay"/>
    <div className="event-container event-hero-content">
      <motion.div initial={reduce ? false : { opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .1 }}>
        <h1>Experiences That<br/>Live Beyond<br/>the Moment.</h1>
        <p>We bring strategy, storytelling and execution together to create brand experiences that connect people, build relationships and leave a lasting impression.</p>
        <div className="event-hero-actions"><ActionLink href="/events/all" variant="yellow">Explore Our Events</ActionLink><Link href="/#sectors" className="event-text-link">View Case Studies <ArrowUpRight size={15}/></Link></div>
      </motion.div>
      <span className="event-hero-signature">Beyond the moment.</span>
    </div>
    <div className="event-container event-hero-controls">
      <div className="event-slide-dots" aria-label="Choose a hero photograph">{eventHeroPhotos.map((item, i) => <button key={item.src} onClick={() => setIndex(i)} aria-label={`Show event photo ${i + 1}`} aria-current={i === index ? "true" : undefined} className={i === index ? "active" : ""}/>)}</div>
      <div className="event-slide-buttons"><span aria-live="off">0{index + 1} <span>/ 0{eventHeroPhotos.length}</span></span><button onClick={() => move(-1)} aria-label="Previous event photo"><ChevronLeft size={18}/></button><button onClick={() => { setPaused(current => !current); }} aria-label={paused || reduce ? "Play event slideshow" : "Pause event slideshow"} disabled={Boolean(reduce)}>{paused || reduce ? <Play size={15}/> : <Pause size={15}/>}</button><button onClick={() => move(1)} aria-label="Next event photo"><ChevronRight size={18}/></button></div>
    </div>
  </section>;
}

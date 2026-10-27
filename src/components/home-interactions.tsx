"use client";
import Image from "next/image";
import { testimonials } from "@/lib/testimonials";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import africa from "@/lib/africa.json";
import { getSourceImage } from "@/lib/site-images";

export { Entrance, Reveal } from "@/components/shared/motion";
export function SectorHeading() {
  const reduce = useReducedMotion();
  return <motion.h2 className="sector-animated-heading" initial={reduce ? false : "hidden"} animate={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: false, amount: 0.5 }} transition={{ staggerChildren: 0.22 }}>
    {["Different worlds.", "Real relevance."].map(line => <span className="sector-heading-line" key={line}><motion.span variants={{ hidden: { y: "110%", opacity: 0 }, visible: { y: "0%", opacity: 1 } }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}>{line}</motion.span></span>)}
  </motion.h2>;
}

export function SectorCard({ children, index }: { children: ReactNode; index: number }) {
  const reduce = useReducedMotion();
  return <motion.article className="sector-card" initial={reduce ? false : { opacity: 0, y: 65, scale: 0.96 }} animate={reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 65, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: false, amount: 0.18 }} transition={{ duration: 0.8, delay: (index % 2) * 0.18, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.article>;
}
export function ReferenceImage({ x, y, w, h, label, className = "" }: { x: number; y: number; w: number; h: number; label: string; className?: string }) {
  const asset = getSourceImage("home", x, y);
  return <div className={`reference-image ${className}`} style={{ aspectRatio: `${w}/${h}` }}><Image src={asset.src} alt={label} fill sizes={w < 30 ? "90px" : "(max-width: 760px) 100vw, 50vw"} style={{ objectFit: "cover" }}/></div>;
}

export function TypedHeadline() {
  const phrases = ["They make Impact !!!", "They shape the Future.", "They move the World."];
  const reduce = useReducedMotion();
  const [text, setText] = useState(phrases[0]);
  useEffect(() => {
    if (reduce) return;
    let index = 0, length = phrases[0].length, deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const phrase = phrases[index];
      if (!deleting && length === phrase.length) { deleting = true; timer = setTimeout(tick, 2600); return; }
      if (deleting && length === 0) { deleting = false; index = (index + 1) % phrases.length; }
      length += deleting ? -1 : 1;
      setText(phrases[index].slice(0, length));
      timer = setTimeout(tick, deleting ? 42 : 85);
    };
    timer = setTimeout(tick, 2600);
    return () => clearTimeout(timer);
  // The phrase list is intentionally fixed for the lifetime of this component.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);
  return <span className="typed-line"><span aria-hidden="true">{text}<span className="typing-cursor">|</span></span><span className="sr-only">They make impact. They shape the future. They move the world.</span></span>;
}

function Counter({ target, label, suffix }: { target: number; label: string; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (!entry.isIntersecting) { setValue(0); return; }
      const start = performance.now();
      const update = (time: number) => {
        const progress = reduce ? 1 : Math.min((time - start) / 4200, 1);
        setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(update);
      };
      frame = requestAnimationFrame(update);
    }, { threshold: 0.45 });
    if (ref.current) observer.observe(ref.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [target, reduce]);
  return <div ref={ref} className="stat"><strong aria-hidden="true">{value}{suffix}</strong><span className="sr-only">{target}{suffix}</span><span>{label}</span></div>;
}
export function Counters() { return <div className="stats"><Counter target={50} suffix="+" label="Successful Projects"/><Counter target={10} suffix="+" label="Industries Served"/><Counter target={10} suffix="+" label="Years in Africa and beyond"/><Counter target={5} suffix="+" label="Global Brand Markets"/></div>; }

export function HeroVideo({ src = "/videos/hero.mp4" }: { src?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  const reduce = useReducedMotion();
  useEffect(() => { if (reduce) ref.current?.pause(); else void ref.current?.play().catch(() => {}); }, [reduce]);
  return <><video ref={ref} src={src} className="hero-video" autoPlay muted loop playsInline preload="metadata" onPlay={() => setPaused(false)} onPause={() => setPaused(true)} aria-label="EBA brand film"/><button className="video-control" aria-label={paused ? "Play background video" : "Pause background video"} onClick={() => { const video = ref.current; if (!video) return; if (video.paused) { void video.play(); setPaused(false); } else { video.pause(); setPaused(true); } }}>{paused ? <Play size={15}/> : <Pause size={15}/>}</button></>;
}

type Polygon = number[][][];
function pathFor(type: string, coordinates: unknown): string {
  const polygons = type === "Polygon" ? [coordinates as Polygon] : coordinates as Polygon[];
  return polygons.map(polygon => polygon.map(ring => ring.map(([lon, lat], i) => `${i ? "L" : "M"}${((lon + 20) * 5.25).toFixed(1)},${((39 - lat) * 5.25).toFixed(1)}`).join(" ") + "Z").join(" ")).join(" ");
}
export function AfricaMap() {
  const [active, setActive] = useState("Nigeria");
  return <div className="map-wrap"><span className="map-badge">Original footprint</span><svg viewBox="0 0 415 405" role="group" aria-label="Interactive map of Africa. Focus a country to see its name.">{africa.map((feature, i) => <path key={feature.properties.name} d={pathFor(feature.geometry.type, feature.geometry.coordinates)} fill={feature.properties.name === active ? "#FFC107" : ["#666343", "#7d6b43", "#8b7449", "#4e5740", "#a18a55", "#5d6549"][i % 6]} stroke="#30382e" strokeWidth="1.3" tabIndex={0} role="button" aria-label={feature.properties.name} onMouseEnter={() => setActive(feature.properties.name)} onFocus={() => setActive(feature.properties.name)} onClick={() => setActive(feature.properties.name)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(feature.properties.name); } }}><title>{feature.properties.name}</title></path>)}</svg><output className="map-tooltip" aria-live="polite">{active}</output><p className="map-caption">A continent of possibility.<br/><em>Across the continent.</em></p></div>;
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => { if (paused || reduce) return; const timer = setInterval(() => setIndex(i => (i + 1) % testimonials.length), 10000); return () => clearInterval(timer); }, [paused, reduce]);
  return <section className="testimonials section-shell" aria-label="Client testimonials" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}><div className="testimonial-heading"><button aria-label="Previous testimonial" onClick={() => setIndex(i => (i + testimonials.length - 1) % testimonials.length)}><ChevronLeft/></button><h2>What Our Clients Say About Us</h2><button aria-label="Next testimonial" onClick={() => setIndex(i => (i + 1) % testimonials.length)}><ChevronRight/></button></div><div className="carousel-dots">{testimonials.map((_, i) => <button key={i} className={i === index ? "active" : ""} aria-label={`Show testimonial ${i + 1}`} aria-current={i === index ? "true" : undefined} onClick={() => setIndex(i)}/>)}</div><AnimatePresence mode="wait" initial={false}><motion.div key={index} className="testimonial-cards" initial={reduce ? false : { opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? undefined : { opacity: 0, x: -100 }} transition={{ duration: 0.4 }}>{[-1, 0, 1].map((offset) => { const item = testimonials[(index + offset + testimonials.length) % testimonials.length]; return <motion.article key={`${index}-${offset}`} initial={reduce ? false : { opacity: 0, y: 95, rotate: (offset || 1) * 10, scale: 0.72 }} animate={reduce ? { opacity: 1, y: 0, rotate: 0, scale: 1 } : { opacity: 0, y: 95, rotate: (offset || 1) * 10, scale: 0.72 }} whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }} viewport={{ once: false, amount: 0.15 }} transition={{ type: "spring", stiffness: 85, damping: 15, delay: (offset + 1) * 0.17 }} className={`testimonial-card card-position-${offset + 1}`}><div className="testimonial-inner"><div className="avatar"><Image src={item.portrait} alt={item.name} fill sizes="90px" style={{ objectFit: "cover", objectPosition: "center 25%" }}/></div><h3>{item.name}</h3><span>{item.role}</span><span className="quote-mark" aria-hidden="true">“</span><p>{item.text}</p></div></motion.article>; })}</motion.div></AnimatePresence></section>;
}

export { Newsletter } from "@/components/newsletter";

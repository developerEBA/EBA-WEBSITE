"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { eventGalleryPhotos } from "@/lib/event-content";
import "./experience-gallery.css";

export function ExperienceGallery() {
  const track = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);

  const move = useCallback((direction: number) => {
    const node = track.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const figures = Array.from(node.children) as HTMLElement[];
    const first = figures[0]?.offsetLeft ?? 0;
    const offsets = figures.map(figure => figure.offsetLeft - first);
    const atEnd = node.scrollLeft >= node.scrollWidth - node.clientWidth - 2;
    let left: number;
    if (direction > 0) left = atEnd ? 0 : offsets.find(offset => offset > node.scrollLeft + 2) ?? 0;
    else left = offsets.filter(offset => offset < node.scrollLeft - 2).at(-1) ?? 0;
    node.scrollTo({ left, behavior: reduced || (direction > 0 && atEnd) ? "instant" : "smooth" });
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;
    function syncPlayback() {
      clearInterval(timer);
      if (paused || interacting || preference.matches) return;
      timer = setInterval(() => { if (!document.hidden) move(1); }, 2500);
    }
    syncPlayback();
    preference.addEventListener("change", syncPlayback);
    return () => { clearInterval(timer); preference.removeEventListener("change", syncPlayback); };
  }, [paused, interacting, move]);

  return <section className="experience-gallery experience-gallery-spread">
    <div className="experience-shell experience-gallery-heading"><div><span className="experience-eyebrow">From the room</span><h2>The moments in between.</h2></div><div className="experience-gallery-controls"><button type="button" aria-label="Previous gallery photos" aria-controls="experience-photo-strip" onClick={() => move(-1)}><ArrowLeft size={19} aria-hidden="true" /></button><button type="button" aria-label="Next gallery photos" aria-controls="experience-photo-strip" onClick={() => move(1)}><ArrowRight size={19} aria-hidden="true" /></button></div></div>
    <div className="experience-photo-strip" id="experience-photo-strip" ref={track} tabIndex={0} role="region" aria-label="Photographs from EBA experiences — scroll horizontally to see all photos"
      onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}
      onKeyDown={event => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }}>
      {eventGalleryPhotos.map(photo => <figure key={photo.src}><Image src={photo.src} alt={photo.alt} width={1200} height={800} sizes="(max-width: 600px) 85vw, 450px" style={{ width: "auto", height: "var(--gallery-photo-height)", maxWidth: "none", objectFit: "contain" }} /><figcaption>{photo.caption}</figcaption></figure>)}
    </div>
    <div className="experience-shell experience-strip-footer"><span>Explore the moments. Scroll to see more.</span><button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? "Play gallery" : "Pause gallery"}</button></div>
  </section>;
}

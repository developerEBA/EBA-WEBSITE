"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { redRoomPhotos } from "@/lib/red-room";
import "./red-room-carousel.css";

type Photo = { src: string; alt: string; caption: string; position?: string };

export function RedRoomCarousel({ photos = redRoomPhotos, title = "The Red Room, in pictures.", eyebrow = "Inside the experience", className = "journal-shell", label = "Red Room", effect = "fade", interval = 5000, imageFit = "cover" }: { photos?: Photo[]; title?: string; eyebrow?: string; className?: string; label?: string; effect?: "fade" | "slide"; interval?: number; imageFit?: "cover" | "contain" }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [resetting, setResetting] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const id = useId();
  const current = active % photos.length;
  const photo = photos[current];
  const slides = effect === "slide" ? [...photos, photos[0]] : photos;
  useEffect(() => {
    if (!resetting) return;
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setResetting(false));
    });
    return () => { cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame); };
  }, [resetting]);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;
    function syncPlayback() {
      clearInterval(timer);
      if (paused || hovered || focused || preference.matches || photos.length < 2) return;
      timer = setInterval(() => {
        if (!document.hidden) setActive(index => effect === "slide" ? index % photos.length + 1 : (index + 1) % photos.length);
      }, interval);
    }
    syncPlayback();
    preference.addEventListener("change", syncPlayback);
    return () => { clearInterval(timer); preference.removeEventListener("change", syncPlayback); };
  }, [paused, hovered, focused, photos.length, effect, interval]);
  function move(direction: number) {
    setActive(index => effect === "slide" && direction === 1 ? index % photos.length + 1 : (index + direction + photos.length) % photos.length);
  }

  return <section className={`red-room-carousel ${effect === "slide" ? "is-sliding" : ""} ${className}`} role="region" aria-roledescription="carousel" aria-labelledby={`${id}-title`}
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    onKeyDown={event => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        move(event.key === "ArrowLeft" ? -1 : 1);
      }
    }}>
    <div className="red-room-gallery-heading"><div><span className="journal-eyebrow">{eyebrow}</span><h2 id={`${id}-title`}>{title}</h2></div><div className="red-room-gallery-controls"><button type="button" aria-label={`Previous ${label} photo`} aria-controls={`${id}-slide`} onClick={() => move(-1)}><ArrowLeft size={20} aria-hidden="true" /></button><button type="button" aria-label={`Next ${label} photo`} aria-controls={`${id}-slide`} onClick={() => move(1)}><ArrowRight size={20} aria-hidden="true" /></button></div></div>
    <figure className="red-room-gallery-figure">
      <div className="red-room-gallery-stage" id={`${id}-slide`} tabIndex={0} aria-label={`${label} slideshow — use left and right arrows to change photos`}
        onPointerDown={event => { pointerStart.current = event.isPrimary && event.pointerType !== "mouse" ? event.clientX : null; }}
        onPointerCancel={() => { pointerStart.current = null; }}
        onPointerUp={event => {
          const start = pointerStart.current;
          pointerStart.current = null;
          if (start !== null && Math.abs(start - event.clientX) > 45) move(start > event.clientX ? 1 : -1);
        }}>
        <div className={`red-room-gallery-track${resetting ? " is-resetting" : ""}`} style={effect === "slide" ? { transform: `translate3d(-${active * 100}%,0,0)` } : undefined} onTransitionEnd={event => {
          if (event.target === event.currentTarget && effect === "slide" && active === photos.length) {
            setResetting(true);
            setActive(0);
          }
        }}>{slides.map((item, index) => <div key={`${item.src}-${index}`} className={`red-room-gallery-slide${index === current ? " is-active" : ""}`} role="group" aria-roledescription="slide" aria-label={`${index % photos.length + 1} of ${photos.length}`} aria-hidden={index !== current}>
          <Image src={item.src} alt={item.alt} fill loading={index === current || index === (current + 1) % photos.length ? "eager" : "lazy"} sizes="(max-width: 760px) 92vw, 1280px" style={{ objectFit: imageFit, objectPosition: imageFit === "contain" ? "center" : item.position || "center 38%" }} />
        </div>)}</div>
      </div>
      <figcaption aria-live={paused || focused ? "polite" : "off"} aria-atomic="true"><span>{photo.caption}</span><span>{current + 1} / {photos.length}</span></figcaption>
    </figure>
    <div className="red-room-gallery-playback"><div className="red-room-gallery-dots" role="group" aria-label={`Choose a ${label} photo`}>{photos.map((item, index) => <button type="button" key={item.src} aria-label={`Show ${label} photo ${index + 1}`} aria-pressed={index === current} aria-controls={`${id}-slide`} onClick={() => setActive(index)}><span /></button>)}</div><button type="button" className="red-room-gallery-pause" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? "Play slideshow" : "Pause slideshow"}</button></div>
  </section>;
}

"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { parseReadingProgress, readingKey } from "@/lib/reading-progress";

const progressEvent = "eba-series-progress";
const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback); window.addEventListener(progressEvent, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(progressEvent, callback); };
};
const serverSnapshot = () => "";

export function ContinueSeries({ seriesSlug, episodeSlugs }: { seriesSlug: string; episodeSlugs: string[] }) {
  const raw = useSyncExternalStore(subscribe, () => { try { return localStorage.getItem(readingKey(seriesSlug)) ?? ""; } catch { return ""; } }, serverSnapshot);
  const saved = parseReadingProgress(raw, episodeSlugs);
  return saved ? <Link href={`/stories/series/${seriesSlug}/${saved.episodeSlug}#continue`} className="pill series-continue">Continue Reading →</Link> : null;
}

export function EpisodeReading({ seriesSlug, episodeSlug }: { seriesSlug: string; episodeSlug: string }) {
  const [position, setPosition] = useState(0);
  useEffect(() => {
    const body = document.getElementById("episode-body");
    if (!body) return;
    let frame = 0; let lastSaved = 0;
    const range = () => Math.max(1, body.scrollHeight - window.innerHeight * .65);
    const top = () => body.getBoundingClientRect().top + window.scrollY;
    const calculate = () => Math.max(0, Math.min(1, (window.scrollY - top() + 100) / range()));
    const save = (value: number) => {
      try { localStorage.setItem(readingKey(seriesSlug), JSON.stringify({ episodeSlug, position: value, updatedAt: Date.now() })); window.dispatchEvent(new Event(progressEvent)); } catch { /* Reading does not depend on browser storage. */ }
    };
    const update = () => {
      frame = 0; const value = calculate(); setPosition(value);
      if (Date.now() - lastSaved > 500) { save(value); lastSaved = Date.now(); }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    let saved = null;
    try { saved = parseReadingProgress(localStorage.getItem(readingKey(seriesSlug)), [episodeSlug]); } catch { /* Storage may be unavailable. */ }
    if (window.location.hash === "#continue" && saved) window.scrollTo({ top: Math.max(0, top() + saved.position * range() - 100), behavior: "auto" });
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); save(calculate()); };
  }, [seriesSlug, episodeSlug]);
  return <div className="series-reading-progress"><progress max={1} value={position} aria-label="Episode reading progress" /><span>{Math.round(position * 100)}% read</span></div>;
}

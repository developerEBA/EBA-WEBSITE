"use client";

import { useEffect, useRef } from "react";

export function AboutVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let inView = false;
    const syncPlayback = () => {
      if (inView && !document.hidden) {
        void video.play().catch(() => {
          // A browser may temporarily block playback while media is loading.
        });
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      syncPlayback();
    }, { threshold: [0, 0.25] });

    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, []);

  return (
    <figure className="about-film">
      <div className="about-film-player">
        <video ref={videoRef} muted loop playsInline preload="metadata" aria-label="EBA anniversary film">
          <source src="/videos/eba-anniversary.mp4" type="video/mp4" />
          Your browser does not support video playback.
        </video>
      </div>
      <figcaption>
        <span className="about-film-label"><span aria-hidden="true" /> THE EBA STORY</span>
        <span className="about-film-caption">People. Purpose. Possibilities.</span>
      </figcaption>
    </figure>
  );
}

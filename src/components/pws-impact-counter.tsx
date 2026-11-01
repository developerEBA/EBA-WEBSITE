"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

export function PwsImpactCounter({ value, suffix = "", label, index }: { value: number; suffix?: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (reduceMotion) {
        setCount(value);
        return;
      }
      const start = performance.now();
      const duration = 1800;
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.round(value * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.35 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduceMotion, value]);

  return <div ref={ref} className="pws-impact-item"><span>0{index + 1}</span><strong aria-hidden="true">{count.toLocaleString()}{suffix}</strong><span className="sr-only">{value.toLocaleString()}{suffix}</span><p>{label}</p></div>;
}

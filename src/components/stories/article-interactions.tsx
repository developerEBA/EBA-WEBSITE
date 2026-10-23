"use client";
import { useState } from "react";
import { motion, useScroll, useReducedMotion } from "motion/react";
import { Check, Link2 } from "lucide-react";
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  return reduce ? null : <motion.div className="journal-reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true"/>;
}
export function ShareStory() {
  const [status,setStatus] = useState("");
  return <div className="journal-share"><button onClick={async () => { try { await navigator.clipboard.writeText(window.location.href); setStatus("Link copied"); } catch { setStatus("Copy the page address from your browser to share this story."); } }}>{status === "Link copied" ? <Check size={16}/> : <Link2 size={16}/>} Copy article link</button><span role="status">{status}</span></div>;
}

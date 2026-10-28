"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/shared/photo";

const work = [
  { name: "Play With Stephen", title: "Golf with a purpose.", text: "Positioning, communications and campaign execution for an autism-awareness golf initiative.", image: "/images/events/swing-for-autism/moment-1.webp", alt: "Golfers at Play With Stephen", href: "/events/swing-for-autism", tags: "Brand positioning / Communications / Digital" },
  { name: "The Eniivy Experience", title: "A reason to come together.", text: "An experience built around storytelling and connection, with EBA shaping the programme, communications and audience engagement.", image: "/images/events/people-and-connection.webp", alt: "Guests connecting at The Eniivy Experience", href: "/events", tags: "Experience strategy / Community / Production" },
];

export function CaseStudyStack() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 120px", "end end"] });
  const scale = useTransform(scrollYProgress, [0, .2, .8, 1], [1, 1, .92, .92]);
  const opacity = useTransform(scrollYProgress, [0, .2, .8, 1], [1, 1, .4, .4]);
  const backY = useTransform(scrollYProgress, [0, .2, .8, 1], [0, 0, -28, -28]);
  const frontY = useTransform(scrollYProgress, [0, .15, .8, 1], [105, 105, 4, 4]);
  const frontPosition = useTransform(frontY, value => `${value}%`);
  return <div ref={ref} className={`work-deck services-shell ${reduce ? "work-deck-static" : ""}`}><div className="work-deck-stage">{work.map((item, i) => <motion.article key={item.name} className={`work-deck-card deck-card-${i + 1}`} style={reduce ? undefined : i === 0 ? { scale, opacity, y: backY } : { y: frontPosition }}><div className="deck-card-header"><span>{item.name}</span><span>0{i + 1} / 02</span></div><div className="deck-card-content"><Photo src={item.image} alt={item.alt} className="deck-photo"/><div className="deck-copy"><span className="services-eyebrow">{item.tags}</span><h2>{item.title}</h2><p>{item.text}</p><Link href={item.href}>Explore the project <ArrowUpRight size={17}/></Link></div></div></motion.article>)}</div></div>;
}

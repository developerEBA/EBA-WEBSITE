"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Photo } from "@/components/shared/photo";
import { testimonials } from "@/lib/testimonials";
import { serviceOfferings } from "@/lib/service-offerings";

export function ServiceConstellation() {
  const reduce = useReducedMotion();
  const visuals = [
    { image: "/images/work-brand-strategy.png", alt: "A team developing brand strategy together", category: "Foundation", title: "Brand Strategy & Reputation", link: "Explore Brand Strategy", text: "We help brands define who they are, what they stand for and how they are perceived, creating strong foundations for meaningful visibility." },
    { image: "/images/work-event-amplification.png", alt: "Media interviewing a spokesperson at a press conference", category: "Communication", title: "Public Relations & Strategic Communications", link: "Explore Communications", text: "We connect strategic communication with brand positioning, helping organisations tell meaningful stories and build stronger relationships." },
    { image: "/images/story-strategy-meeting.webp", alt: "Campaign planning and strategy in progress", category: "Growth", title: "Marketing & Amplification", link: "Explore Marketing", text: "We develop integrated campaigns across traditional, digital and experiential channels that help brands reach, engage and inspire the right audiences." },
    { image: "/images/events/conversations.webp", alt: "Community members sharing ideas and conversation", category: "Engagement", title: "Social Media & Community", link: "Explore Social Media", text: "We build platforms and communities that spark relevant conversations, strengthen engagement and grow brand loyalty." },
    { image: "/images/story-production-detail.png", alt: "Cameras and production equipment ready for a creative shoot", category: "Creative", title: "Content & Creative", link: "Explore Creative", text: "We turn ideas into compelling content, visual storytelling and creative assets that bring brands to life across every touchpoint." },
    { image: "/images/events/community-circle.webp", alt: "An audience gathered for a shared brand experience", category: "Experience", title: "Events & Experiences", link: "Explore Experiences", text: "We design and produce memorable brand experiences that connect people, create meaningful moments and extend the brand beyond the event itself." },
  ];
  return <div className="expertise-timeline"><span className="expertise-timeline-axis" aria-hidden="true"/>{serviceOfferings.map((service, i) => {
    const visual = visuals[i];
    return <motion.article key={service.slug} className={`expertise-timeline-entry ${i % 2 === 0 ? "entry-right" : "entry-left"}`} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .5 }}>
      <span className="expertise-timeline-dot" aria-hidden="true"/><span className="expertise-timeline-connector" aria-hidden="true"/>
      <Link href={`/services/${service.slug}`} className="expertise-glass-card"><Photo src={visual.image} alt={visual.alt} className="expertise-timeline-photo" sizes="(max-width: 600px) 80vw, (max-width: 1000px) 35vw, 20vw"/><div className="expertise-timeline-copy"><span className="expertise-timeline-kicker">0{i + 1} / {visual.category}</span><h3>{visual.title}</h3><p>{visual.text}</p><span className="expertise-timeline-link">{visual.link}<ArrowUpRight size={17}/></span></div></Link>
    </motion.article>;
  })}</div>;
}

export function MovingTestimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (paused || reduce) return;
    const timer = setInterval(() => setIndex(value => (value + 1) % testimonials.length), 6500);
    return () => clearInterval(timer);
  }, [paused, reduce]);
  const quote = testimonials[index];
  return <section className="premium-testimonials services-shell" aria-label="Client testimonials" aria-roledescription="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}>
    <div className="testimonial-editorial"><span className="services-eyebrow">In their words</span><h2>Good work.<br/>Long relationships.</h2><p>The people on the other side of the brief.</p><div className="testimonial-controls"><button aria-label="Previous testimonial" onClick={() => setIndex((index - 1 + testimonials.length) % testimonials.length)}><ArrowLeft size={19}/></button><span>{String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span><button aria-label="Next testimonial" onClick={() => setIndex((index + 1) % testimonials.length)}><ArrowRight size={19}/></button><button className="testimonial-pause" aria-label={paused ? "Play testimonials" : "Pause testimonials"} onClick={() => setPaused(value => !value)}>{paused ? "Play" : "Pause"}</button></div></div>
    <div className="testimonial-stage" aria-live={paused ? "polite" : "off"}><AnimatePresence mode="wait"><motion.figure key={quote.name} className="premium-quote" initial={reduce ? false : { opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduce ? 0 : -30 }} transition={{ duration: reduce ? 0 : .4 }}><span className="premium-quote-mark" aria-hidden="true">“</span><blockquote>{quote.text}</blockquote><figcaption><Photo src={quote.portrait} alt={quote.name} className="premium-avatar" sizes="72px"/><div><strong>{quote.name}</strong><span>{quote.role}</span></div></figcaption></motion.figure></AnimatePresence><div className="testimonial-progress" aria-hidden="true">{testimonials.map((item, i) => <span key={item.name} className={i === index ? "active" : ""}/>)}</div></div>
  </section>;
}


const approachSteps = [
  { name: "Find", question: "What needs to change?", text: "We listen, ask questions and look at the context. Before recommending a service, we agree on the challenge, the audience and what a useful result looks like.", output: "A clear brief. A shared objective." },
  { name: "Create", question: "What will move it forward?", text: "We bring the right disciplines around the brief. Strategy, messaging and creative direction become one plan, with a clear role for every channel and every idea.", output: "The strategy. The story. The plan." },
  { name: "Execute", question: "How does it come to life?", text: "We produce, coordinate and deliver the work, then review what happened. Your campaign, content or experience stays connected to the objective we started with.", output: "Work in the world. Results to learn from." },
];

export function ServiceApproach() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const step = approachSteps[active];
  return <section className="approach-studio"><div className="services-shell approach-studio-grid"><div><span className="services-eyebrow">Our approach</span><h2>First, the right<br/>questions.</h2><div className="approach-selectors" role="tablist" aria-label="Our approach">{approachSteps.map((item, i) => <button key={item.name} id={`approach-tab-${i}`} role="tab" aria-selected={active === i} aria-controls="approach-panel" tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={e => { if (["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(e.key)) { e.preventDefault(); const next = e.key === "Home" ? 0 : e.key === "End" ? 2 : (active + (e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : 2)) % 3; setActive(next); document.getElementById(`approach-tab-${next}`)?.focus(); } }}><span>0{i + 1}</span>{item.name}<ArrowUpRight size={20}/></button>)}</div></div><div className="approach-panel" id="approach-panel" role="tabpanel" aria-labelledby={`approach-tab-${active}`}><AnimatePresence mode="wait"><motion.div key={active} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .25 }}><span className="approach-big-number" aria-hidden="true">0{active + 1}</span><h3>{step.question}</h3><p>{step.text}</p><span className="approach-output">{step.output}</span></motion.div></AnimatePresence></div></div></section>;
}


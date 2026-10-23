"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, Minus, Plus, Search, X } from "lucide-react";
import { faqTopics } from "@/lib/faq-data";
import { normalizeFaqSearch, searchFaqs } from "@/lib/faq-search";

export default function FaqExplorer() {
 const [query, setQuery] = useState("");
 const [open, setOpen] = useState<Set<string>>(new Set(["general-0"]));
 const [active, setActive] = useState("general");
 const reduce = useReducedMotion();
 const [searchCollapsed, setSearchCollapsed] = useState<Set<string>>(new Set());
 const searching = normalizeFaqSearch(query).length > 0;
 const filtered = useMemo(() => searchFaqs(query), [query]);
 const resultCount = filtered.reduce((count, topic) => count + topic.matches.length, 0);
 const updateSearch = (value: string) => { setQuery(value); setSearchCollapsed(new Set()); };
 const viewResults = () => {
  const results = document.getElementById("faq-results");
  results?.focus({ preventScroll: true });
  results?.scrollIntoView({ behavior: reduce ? "instant" : "smooth", block: "start" });
 };
 useEffect(() => {
  const observer = new IntersectionObserver(entries => {
   const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
   if (visible[0]) setActive(visible[0].target.id);
  }, { rootMargin: "-130px 0px -55% 0px", threshold: 0 });
  document.querySelectorAll(".faq-topic-section").forEach(element => observer.observe(element));
  return () => observer.disconnect();
 }, [filtered]);
 const toggle = (id: string) => (searching ? setSearchCollapsed : setOpen)(previous => { const next = new Set(previous); if (next.has(id)) next.delete(id); else next.add(id); return next; });
 return <><section className="faq-hero"><div className="faq-container"><span className="tiny-label">YOUR QUESTIONS, ANSWERED</span><div className="faq-hero-grid"><motion.div initial={reduce ? false : { opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }}><h1>Good Questions.<br/>Great Answers.</h1><p>Everything you need to know about EBA, our services, how we work and how we help brands grow.</p><form role="search" aria-label="Search FAQs" onSubmit={e => { e.preventDefault(); if (resultCount) viewResults(); }}><div className="faq-search"><Search size={18}/><label className="sr-only" htmlFor="faq-search-input">Search questions and answers</label><input id="faq-search-input" value={query} onChange={e => updateSearch(e.target.value)} onKeyDown={e => { if (e.key === "Escape") updateSearch(""); }} placeholder="Search for answers..." type="search" autoComplete="off" spellCheck={false} aria-controls="faq-results" aria-describedby="faq-search-feedback"/>{query && <button type="button" aria-label="Clear FAQ search" onClick={() => { updateSearch(""); document.getElementById("faq-search-input")?.focus(); }}><X size={17}/></button>}</div><div id="faq-search-feedback" className="faq-search-feedback"><span role="status" aria-live="polite" aria-atomic="true">{searching ? `${resultCount} matching ${resultCount === 1 ? "answer" : "answers"}` : "Search by question, service or topic."}</span>{searching && resultCount > 0 && <button type="submit">View answers <ArrowDown size={13}/></button>}</div></form></motion.div><motion.p className="faq-handwriting" initial={reduce ? false : { opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .9, delay: .2 }}>Let’s make it<br/>clear.<span/></motion.p></div></div></section>
 <section className="faq-topics"><div className="faq-container"><div className="faq-topic-heading"><h2>Explore by Topic</h2><span>A little direction, before we dive in.</span></div><div className="faq-topic-grid">{faqTopics.map((topic, i) => <motion.a key={topic.id} href={`#${topic.id}`} onClick={e => { e.preventDefault(); setQuery(""); setActive(topic.id); requestAnimationFrame(() => document.getElementById(topic.id)?.scrollIntoView({ behavior: reduce ? "instant" : "smooth", block: "start" })); }} initial={reduce ? false : { opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .1 }} transition={{ duration: .6, delay: i * .05 }}><span>0{i + 1}</span><ArrowUpRight size={18}/><strong>{topic.title}</strong></motion.a>)}</div></div></section>
 <div className="faq-container faq-content"><aside className="faq-sidebar" aria-label="FAQ topics"><span className="tiny-label">FIND YOUR ANSWERS</span><nav>{faqTopics.map((topic, i) => <a key={topic.id} className={active === topic.id ? "is-active" : ""} aria-current={active === topic.id ? "location" : undefined} href={`#${topic.id}`} onClick={e => { e.preventDefault(); setQuery(""); setActive(topic.id); requestAnimationFrame(() => document.getElementById(topic.id)?.scrollIntoView({ behavior: reduce ? "instant" : "smooth", block: "start" })); }}><span>0{i + 1}</span>{topic.title}</a>)}</nav><div className="faq-sidebar-contact"><p>Prefer a conversation?</p><a href="/get-in-touch">Get in Touch <ArrowUpRight size={12}/></a></div></aside><div className="faq-answers" id="faq-results" tabIndex={-1}>{searching && <p className="faq-search-count" role="status">{filtered.reduce((count, topic) => count + topic.matches.length, 0)} answers found for “{query}”</p>}{filtered.map(topic => <section key={topic.id} className="faq-topic-section" id={topic.id}><motion.h2 initial={reduce ? false : { opacity: 0, x: 25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: .6 }}>{topic.title}</motion.h2>{topic.matches.map(({ question, answer, index }) => { const id = `${topic.id}-${index}`; const expanded = searching ? !searchCollapsed.has(id) : open.has(id); return <div key={id} className={expanded ? "faq-item expanded" : "faq-item"}><h3><button id={`question-${id}`} aria-expanded={expanded} aria-controls={`answer-${id}`} onClick={() => toggle(id)}>{question}{expanded ? <Minus size={18}/> : <Plus size={18}/>}</button></h3><AnimatePresence initial={false}>{expanded && <motion.div id={`answer-${id}`} role="region" aria-labelledby={`question-${id}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduce ? 0 : .28 }} className="faq-answer"><p>{answer}</p></motion.div>}</AnimatePresence></div>; })}</section>)}{!filtered.length && <div className="faq-empty"><h2>Let’s try another question.</h2><p>No answers match that search. Try a shorter phrase or get in touch with the team.</p><button className="pill yellow" onClick={() => updateSearch("")}>Clear Search</button></div>}</div></div></>;
}






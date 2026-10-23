"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EventCard } from "@/components/events/event-card";
import { Pagination } from "@/components/shared/pagination";
import { ActionLink } from "@/components/shared/action-link";
import { eventStories } from "@/lib/event-content";

export default function EventListing({ pageSize = 3, allEvents = false }: { pageSize?: 3 | 6; allEvents?: boolean }) {
  const [page, setPage] = useState(1);
  const section = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const totalPages = Math.ceil(eventStories.length / pageSize);
  const visibleEvents = eventStories.slice((page - 1) * pageSize, page * pageSize);
  function changePage(next: number) {
    if (next < 1 || next > totalPages || next === page) return;
    setPage(next);
    title.current?.focus({ preventScroll: true });
    section.current?.scrollIntoView({ behavior: reduce ? "instant" : "smooth", block: "start" });
  }
  return <section id="event-stories" className="event-stories" ref={section}>
    <div className="event-container">
      <span className="event-eyebrow">EXPERIENCE IN ACTION</span>
      <motion.h2 ref={title} tabIndex={-1} className="event-list-title" initial={reduce ? false : { opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: .8 }}>{allEvents ? "All Events" : <>Events We’ve Helped<br/>Bring to Life.</>}</motion.h2>
      {!allEvents && <ActionLink href="/events/all" className="event-all-link">All Events</ActionLink>}
      <p className="sr-only" role="status" aria-live="polite">Showing page {page} of {totalPages}, {visibleEvents.length} event stories.</p>
      <div className="event-grid-frame">
        <AnimatePresence mode="wait">
          <motion.div key={page} className="event-card-grid" initial="hidden" animate="visible" exit={{ opacity: 0, y: -18 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: reduce ? 0 : .12 } } }} transition={{ duration: reduce ? 0 : .25 }}>
            {visibleEvents.map((event, index) => <EventCard key={event.id} event={event} index={index}/>)}
          </motion.div>
        </AnimatePresence>
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={changePage}/>
    </div>

  </section>;
}



"use client";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
export function NavDropdown({ label, id, items, open, active, pathname, onToggle, onClose, href }: { label: string; id: string; items: { label: string; href: string }[]; open: boolean; active: boolean; pathname: string; onToggle: () => void; onClose: () => void; href?: string }) {
  const reduce = useReducedMotion();
  return <div className="about-menu services-nav-menu" onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) onClose(); }}>
    <div className="nav-dropdown-trigger">{href && <Link href={href} onClick={onClose} aria-current={pathname === href ? "page" : undefined}>{label}</Link>}<button aria-label={href ? `Browse ${label.toLowerCase()}` : undefined} aria-expanded={open} aria-controls={id} className={active ? "current-page" : ""} onClick={onToggle}>{!href && label}<ChevronDown size={15} className={open ? "about-chevron is-open" : "about-chevron"}/></button></div>
    <AnimatePresence>{open && <motion.div id={id} className="about-dropdown service-nav-dropdown" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: .18 }}>{items.map(item => <Link key={item.href} href={item.href} onClick={onClose} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}</motion.div>}</AnimatePresence>
  </div>;
}


"use client";

import Link from "next/link";
import { NavDropdown } from "@/components/shared/nav-dropdown";
import { serviceOfferings } from "@/lib/service-offerings";
import { BrandLogo } from "@/components/shared/brand-logo";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

export default function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hash, setHash] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => { window.removeEventListener("hashchange", syncHash); window.removeEventListener("popstate", syncHash); };
  }, []);
  useEffect(() => {
    const outside = (event: PointerEvent) => { if (!headerRef.current?.contains(event.target as Node)) { setAboutOpen(false); setServicesOpen(false); setOpen(false); } };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setAboutOpen(false); setServicesOpen(false); setOpen(false); } };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, []);
  const activeItem = aboutOpen || pathname === "/about" || pathname.startsWith("/about/") ? "About Us"
    : pathname === "/services" || pathname.startsWith("/services/") ? "Services"
    : pathname === "/stories" || pathname.startsWith("/stories/") ? "Stories"
    : pathname === "/events" || pathname.startsWith("/events/") ? "Event"
    : pathname === "/case-studies" || pathname.startsWith("/case-studies/") ? "Case Studies"
    : pathname === "/" ? ({ "#services": "Services", "#sectors": "Case Studies", "#founder": "Stories" }[hash] ?? "Home")
    : undefined;
  const close = () => { setOpen(false); setAboutOpen(false); setServicesOpen(false); };
  return <header ref={headerRef} className="site-header"><BrandLogo onClick={close}/><nav aria-label="Main navigation" className={open ? "nav open" : "nav"}><Link href="/" onClick={() => { setHash(""); close(); }} aria-current={activeItem === "Home" ? "page" : undefined}>Home</Link><div className="about-menu" onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setAboutOpen(false); }}><button aria-expanded={aboutOpen} aria-controls="about-dropdown" className={activeItem === "About Us" ? "current-page" : ""} onClick={() => { setServicesOpen(false); setAboutOpen(!aboutOpen); }}>About Us <ChevronDown size={15} strokeWidth={1.6} aria-hidden="true" className={aboutOpen ? "about-chevron is-open" : "about-chevron"}/></button><AnimatePresence>{aboutOpen && <motion.div key="about-menu" className="about-dropdown" id="about-dropdown" initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: reduce ? 0 : 0.16 }}>{[["Our Story", "/about/our-story"], ["Meet the Founder", "/about/meet-the-founder"], ["FAQs", "/about/faqs"]].map(([name, href]) => <Link key={href} href={href} onClick={close} aria-current={pathname === href ? "page" : undefined}>{name}</Link>)}</motion.div>}</AnimatePresence></div><NavDropdown label="Our Services" href="/services" id="services-dropdown" open={servicesOpen} active={activeItem === "Services"} pathname={pathname} onToggle={() => { setAboutOpen(false); setServicesOpen(!servicesOpen); }} onClose={close} items={serviceOfferings.map(service => ({ label: service.title, href: `/services/${service.slug}` }))}/>{[["Event", "/events"], ["Case Studies", "/case-studies"], ["Stories", "/stories"]].map(([name, href]) => <Link key={name} href={href} onClick={() => { setHash(href.includes("#") ? `#${href.split("#")[1]}` : ""); close(); }} aria-current={activeItem === name ? "page" : undefined}>{name}</Link>)}</nav><Link href="/get-in-touch" className="nav-contact" onClick={close}>Get in Touch <ArrowUpRight size={13}/></Link><button className="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></header>;
}






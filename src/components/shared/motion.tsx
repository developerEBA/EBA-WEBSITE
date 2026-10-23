"use client";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 36 }} animate={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.12 }} transition={{ duration: 0.65, ease: "easeOut" }}>{children}</motion.div>;
}

export function Entrance({ children, className = "", delay = 0, direction = "up", tilt = 0, as = "div" }: { children: ReactNode; className?: string; delay?: number; direction?: "up" | "left" | "right"; tilt?: number; as?: "div" | "article" }) {
  const reduce = useReducedMotion();
  const Tag = as === "article" ? motion.article : motion.div;
  const visible = { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 };
  const hidden = { opacity: 0, x: direction === "left" ? -85 : direction === "right" ? 85 : 0, y: direction === "up" ? 75 : 25, rotate: tilt, scale: 0.94 };
  return <Tag className={className} initial={reduce ? false : hidden} animate={reduce ? visible : hidden} whileInView={visible} viewport={{ once: false, amount: 0.16 }} transition={{ duration: reduce ? 0 : .65, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}>{children}</Tag>;
}

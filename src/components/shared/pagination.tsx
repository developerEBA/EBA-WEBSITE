"use client";

import { ArrowRight, ChevronLeft } from "lucide-react";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  label?: string;
};

export function Pagination({ page, totalPages, onPageChange, label = "Event" }: PaginationProps) {
  if (totalPages < 2) return null;
  return <nav className="event-pagination" aria-label={`${label} pagination`}>
    {page > 1 && <button type="button" className="event-page-direction" onClick={() => onPageChange(page - 1)}><ChevronLeft size={14} aria-hidden="true"/>Previous</button>}
    {Array.from({ length: totalPages }, (_, index) => <button type="button" key={index} aria-label={`${label} page ${index + 1}`} aria-current={page === index + 1 ? "page" : undefined} onClick={() => onPageChange(index + 1)}>{index + 1}</button>)}
    <button type="button" className="event-page-direction" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>Next <ArrowRight size={14} aria-hidden="true"/></button>
  </nav>;
}

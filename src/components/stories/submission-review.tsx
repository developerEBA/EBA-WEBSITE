"use client";

import { useState, type FormEvent } from "react";
type ReviewRecord = { reference: string; kind: string; status: string; receivedAt: string; payload: Record<string, string | boolean> };

export function SubmissionReview() {
  const [key, setKey] = useState(""); const [records, setRecords] = useState<ReviewRecord[] | null>(null);
  const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setBusy(true);
    try { const response = await fetch("/api/editorial/submissions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key }) }); const result = await response.json(); if (!response.ok) { setError(result.error || "Access unavailable."); return; } setRecords(result.submissions); setKey(""); }
    catch { setError("The review area could not be reached. Please try again."); }
    finally { setBusy(false); }
  }
  if (records === null) return <form className="entry-form" onSubmit={unlock}><h2>Private editorial review</h2><p>For authorised EBA reviewers only. Enter the access key supplied by the website administrator.</p><div className="entry-field"><label htmlFor="review-key">Review access key</label><input id="review-key" type="password" autoComplete="current-password" required value={key} onChange={event => setKey(event.target.value)} maxLength={1024} /></div><button className="pill green" type="submit" disabled={busy}>{busy ? "Opening…" : "Open private submissions"}</button>{error && <p className="entry-field-error" role="alert">{error}</p>}</form>;
  return <section className="entry-review"><div className="entry-review-heading"><p>{records.length} recent submissions awaiting review</p><button type="button" className="pill green" onClick={() => setRecords(null)}>Close private review</button></div>{records.length ? records.map(record => <details className="entry-review-record" key={record.reference}><summary><span>{record.kind === "article" ? "Article" : "Campaign Entry"}</span><strong>{String(record.payload.title)}</strong><small>{new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Lagos" }).format(new Date(record.receivedAt))} WAT</small></summary><p className="entry-review-reference">{record.reference}</p><dl>{Object.entries(record.payload).filter(([name]) => !["website", "kind"].includes(name)).map(([name, value]) => <div key={name}><dt>{name.replace(/([A-Z])/g, " $1")}</dt><dd>{typeof value === "boolean" ? value ? "Confirmed" : "Not confirmed" : value || "Not provided"}</dd></div>)}</dl></details>) : <p>No submissions have been received yet.</p>}<p className="entry-preparing">Private records are displayed only for this open page. Close the review area when you finish. Nothing is published by opening an entry.</p></section>;
}

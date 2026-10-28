"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, FileText, LoaderCircle, Megaphone } from "lucide-react";
import { submissionSchema } from "@/lib/submission-schema";

function playCompletionSound() {
  const audio = new Audio("/audio/eba-click.wav");
  audio.volume = 0.45;
  void audio.play().catch(() => {});
}

type Kind = "article" | "campaign";
type Errors = Record<string, string[] | undefined>;
type Field = { name: string; label: string; max: number; rows?: number; optional?: boolean; type?: string; placeholder?: string; autoComplete?: string; wide?: boolean };
const commonFields: Field[] = [
  { name: "name", label: "Full name", max: 120, autoComplete: "name" },
  { name: "email", label: "Email address", max: 254, type: "email", autoComplete: "email", placeholder: "you@example.com" },
  { name: "organisation", label: "Organisation", max: 180, optional: true, wide: true, autoComplete: "organization" },
];
const articleFields: Field[] = [
  { name: "title", label: "Article title", max: 200 }, { name: "category", label: "Article topic / category", max: 100, placeholder: "e.g. Branding, culture, communications" },
  { name: "summary", label: "Short summary", max: 2000, rows: 4, placeholder: "Introduce your article (at least 30 characters)." },
  { name: "content", label: "Article content", max: 50000, rows: 12, placeholder: "Paste your full article here (at least 100 characters)." },
  { name: "biography", label: "Author biography", max: 2000, rows: 3, optional: true },
];
const campaignFields: Field[] = [
  { name: "campaignName", label: "Campaign / opportunity name", max: 200, wide: true, placeholder: "Which campaign are you entering?" },
  { name: "title", label: "Entry title", max: 200 }, { name: "category", label: "Campaign category", max: 100 },
  { name: "description", label: "Entry description", max: 12000, rows: 9, placeholder: "Describe your entry and how it responds to the campaign brief (at least 30 characters)." },
];
const supportingField: Field = { name: "supportingLinks", label: "Supporting links", rows: 3, optional: true, max: 4000, placeholder: "https://… (one link per line)" };
const choices = [{ kind: "article" as const, title: "Submit an Article", copy: "Ideas, opinions and original perspectives.", icon: FileText }, { kind: "campaign" as const, title: "Submit a Campaign Entry", copy: "Your entry for a campaign or call for submissions.", icon: Megaphone }];

function EntryForm({ kind, token, tokenError, refresh }: { kind: Kind; token: string; tokenError: string; refresh: () => void }) {
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState("");
  const successRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (reference) successRef.current?.focus(); }, [reference]);
  const prefix = `entry-${kind}-`;
  const error = (name: string) => errors[name]?.[0] && <span id={`${prefix}${name}-error`} className="entry-field-error" role="alert">{errors[name]?.[0]}</span>;
  const fieldProps = (name: string) => ({ id: `${prefix}${name}`, name, "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `${prefix}${name}-error` : undefined });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy) return;
    setMessage(""); setErrors({});
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const payload = { ...values, kind, consent: values.consent === "on", ...(kind === "article" ? { originalWork: values.originalWork === "on" } : { termsAccepted: values.termsAccepted === "on" }) };
    const parsed = submissionSchema.safeParse(payload);
    if (!parsed.success) {
      const fields = parsed.error.flatten().fieldErrors as Errors;
      setErrors(fields); setMessage("Please check the highlighted fields.");
      requestAnimationFrame(() => document.getElementById(`${prefix}${Object.keys(fields)[0]}`)?.focus()); return;
    }
    if (!token) { setMessage(tokenError || "Your form is still preparing. Please wait a moment."); return; }
    setBusy(true);
    try {
      const response = await fetch("/api/submissions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ payload: parsed.data, token }) });
      const result = await response.json();
      if (!response.ok) { setErrors(result.fields ?? {}); setMessage(result.error || "Your submission could not be saved. Please try again."); return; }
      if (typeof result.reference !== "string") throw new Error("Missing confirmation");
      setReference(result.reference);
      playCompletionSound();
    } catch { setMessage("We couldn’t confirm your submission. Check your connection and try again. For help, contact hello@enibrand.com."); }
    finally { setBusy(false); }
  }
  if (reference) return <div className="entry-success" tabIndex={-1} ref={successRef}><CheckCircle2 size={42} strokeWidth={1.4} aria-hidden="true" /><span className="journal-eyebrow">Received for review</span><h2>Thank you for sharing.</h2><p>Your {kind === "article" ? "article" : "campaign entry"} has been saved privately for EBA to review. Submission does not mean automatic approval or publication.</p><div className="entry-reference"><span>Your reference</span><strong>{reference}</strong></div><p>Keep this reference if you contact us about your entry.</p><div className="entry-success-actions"><Link className="pill green" href="/stories">Back to Stories <ArrowRight size={16} /></Link><button type="button" onClick={() => { setReference(""); setMessage(""); setErrors({}); refresh(); }}>Submit another entry</button></div></div>;

  const fields = [...commonFields, ...(kind === "article" ? articleFields : campaignFields), supportingField];
  return <form className="entry-form" noValidate onSubmit={submit}>
    <div className="entry-form-heading"><span className="journal-eyebrow">{kind === "article" ? "Editorial consideration" : "Campaign review"}</span><h2>{kind === "article" ? "Tell us about your article." : "Tell us about your entry."}</h2><p>Fields marked * are required. Your information is used to review and respond to your submission.</p></div>
    <fieldset disabled={busy} className="entry-fields"><legend className="sr-only">Submission details</legend>
      {fields.map(field => <div className={`entry-field ${field.wide || field.rows ? "entry-wide" : ""}`} key={field.name}><label htmlFor={`${prefix}${field.name}`}>{field.label} {field.optional ? <small>Optional</small> : <span>*</span>}</label>{field.rows ? <textarea {...fieldProps(field.name)} required={!field.optional} maxLength={field.max} rows={field.rows} placeholder={field.placeholder} /> : <input {...fieldProps(field.name)} required={!field.optional} maxLength={field.max} type={field.type ?? "text"} autoComplete={field.autoComplete} placeholder={field.placeholder} />}{field.name === "supportingLinks" && <small>Use shareable HTTPS links for documents, images or other supporting work. Please allow EBA to view them.</small>}{error(field.name)}</div>)}
      <div className="entry-honeypot" aria-hidden="true"><label htmlFor={`${prefix}website`}>Leave this field empty</label><input id={`${prefix}website`} name="website" tabIndex={-1} autoComplete="off" /></div>
      <div className="entry-consents entry-wide"><label><input {...fieldProps(kind === "article" ? "originalWork" : "termsAccepted")} type="checkbox" required /><span>{kind === "article" ? "I confirm that this is original work and I have the rights to submit it." : "I have checked the relevant campaign’s eligibility, deadline and terms."} <b>*</b></span>{error(kind === "article" ? "originalWork" : "termsAccepted")}</label><label><input {...fieldProps("consent")} type="checkbox" required /><span>I consent to EBA storing these details to review and respond to my submission. Nothing will be published automatically. <b>*</b></span>{error("consent")}</label></div>
      <div className="entry-submit-row entry-wide"><button className="pill green" type="submit" disabled={busy || !token}>{busy ? <><LoaderCircle size={16} className="entry-spinner" /> Submitting…</> : <>Submit {kind === "article" ? "Article" : "Campaign Entry"} for Review <ArrowRight size={16} /></>}</button><p>Your submission will go to EBA for review.</p></div>
    </fieldset>
    {(message || tokenError) && <div className="entry-message" role="alert"><p>{message || tokenError}</p><button type="button" onClick={refresh}>Refresh form session</button></div>}
    {!token && !tokenError && <p className="entry-preparing" role="status">Preparing your secure form…</p>}
  </form>;
}

export function SubmissionPortal() {
  const [active, setActive] = useState<Kind>("article");
  const [token, setToken] = useState(""); const [tokenError, setTokenError] = useState(""); const [version, setVersion] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/submissions", { cache: "no-store", signal: controller.signal }).then(async response => {
      const result = await response.json();
      if (!response.ok || typeof result.token !== "string") throw new Error("Form unavailable");
      setToken(result.token); setTokenError("");
    }).catch(error => { if (error.name !== "AbortError") setTokenError("We couldn’t prepare online submissions. Refresh the form or contact hello@enibrand.com."); });
    return () => controller.abort();
  }, [version]);
  const refresh = () => { setToken(""); setTokenError(""); setVersion(value => value + 1); };
  function select(kind: Kind) { setActive(kind); document.getElementById(`entry-tab-${kind}`)?.focus(); }
  return <div className="submission-portal"><div className="entry-tabs" role="tablist" aria-label="Choose your submission type">{choices.map(({ kind, title, copy, icon: Icon }) => <button key={kind} id={`entry-tab-${kind}`} role="tab" aria-selected={active === kind} aria-controls={`entry-panel-${kind}`} tabIndex={active === kind ? 0 : -1} onClick={() => setActive(kind)} onKeyDown={event => { if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) { event.preventDefault(); select(event.key === "Home" ? "article" : event.key === "End" ? "campaign" : active === "article" ? "campaign" : "article"); } }}><Icon size={25} strokeWidth={1.4} aria-hidden="true" /><strong>{title}</strong><span>{copy}</span><i aria-hidden="true">{active === kind ? "Selected ↓" : "Choose →"}</i></button>)}</div>{choices.map(({ kind }) => <section key={kind} id={`entry-panel-${kind}`} role="tabpanel" aria-labelledby={`entry-tab-${kind}`} hidden={active !== kind}><EntryForm kind={kind} token={token} tokenError={tokenError} refresh={refresh} /></section>)}</div>;
}

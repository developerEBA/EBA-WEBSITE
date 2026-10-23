"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ConsultationForm } from "@/components/consultation-form";

const teamSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address.").max(254),
  phone: z.string().trim().min(7, "Please enter a phone number.").max(30).regex(/^[+\d\s().-]+$/, "Please enter a valid phone number."),
  area: z.string().min(1, "Please choose your area of interest."),
  portfolio: z.string().trim().max(500).refine(value => { if (!value) return true; try { const url = new URL(value); return url.protocol === "https:" || url.protocol === "http:"; } catch { return false; } }, "Please enter a full link, starting with https://."),
  cv: z.string().trim().max(500).refine(value => { if (!value) return true; try { const url = new URL(value); return url.protocol === "https:" || url.protocol === "http:"; } catch { return false; } }, "Please enter a full link, starting with https://."),
  message: z.string().trim().min(20, "Tell us a little more about yourself (at least 20 characters).").max(3000),
});
type TeamFields = z.infer<typeof teamSchema>;
const areas = ["Brand strategy", "PR & communications", "Marketing", "Social media & community", "Content & creative", "Events & production", "Research", "Operations", "Internship", "Other"];
function JoinTeamForm() {
  const [request, setRequest] = useState<TeamFields | null>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (request) reviewRef.current?.focus(); }, [request]);
  const { register, handleSubmit, setError, formState: { errors } } = useForm<TeamFields>({ resolver: zodResolver(teamSchema), defaultValues: { portfolio: "", cv: "", area: "" } });
  const fieldProps = (name: keyof TeamFields) => ({ id: `team-${name}`, "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `team-${name}-error` : undefined, ...register(name) });
  const error = (name: keyof TeamFields) => errors[name] && <span className="consultation-error" role="alert" id={`team-${name}-error`}>{errors[name]?.message}</span>;
  const body = request ? `Name: ${request.name}\nEmail: ${request.email}\nPhone: ${request.phone}\nArea of interest: ${request.area}\nPortfolio / LinkedIn: ${request.portfolio || "Not provided"}\nCV link: ${request.cv || "Not provided"}\n\nAbout me:\n${request.message}` : "";
  if (request) return <div className="consultation-review" ref={reviewRef} tabIndex={-1}><span className="consultation-review-label">Your introduction, ready to send</span><h3>Nice to meet you, {request.name.split(" ")[0]}.</h3><p>Send your introduction to EBA by email. The team can then follow up with you about a suitable opportunity.</p><dl><div><dt>Name</dt><dd>{request.name}</dd></div><div><dt>Email</dt><dd>{request.email}</dd></div><div><dt>Area of interest</dt><dd>{request.area}</dd></div><div><dt>About you</dt><dd>{request.message}</dd></div></dl><a className="pill green" href={`mailto:admin@enibrand.com?subject=${encodeURIComponent(`Team introduction — ${request.area} — ${request.name}`)}&body=${encodeURIComponent(body)}`}><Mail size={16}/> Send your introduction</a><button className="consultation-edit" type="button" onClick={() => setRequest(null)}><ArrowLeft size={14}/> Edit details</button><small>Your email app opens with the details filled in. You can attach a CV there before sending.</small></div>;
  return <form className="consultation-form" noValidate onSubmit={event => { void handleSubmit(values => { if (!areas.includes(values.area)) { setError("area", { message: "Please select an area from the list." }); return; } setRequest(values); })(event); }}><div className="consultation-fields">
    <div className="consultation-field"><label htmlFor="team-name">Name <span>*</span></label><input {...fieldProps("name")} required autoComplete="name" placeholder="Your full name"/>{error("name")}</div><div className="consultation-field"><label htmlFor="team-email">Email <span>*</span></label><input {...fieldProps("email")} type="email" required autoComplete="email" placeholder="you@example.com"/>{error("email")}</div>
    <div className="consultation-field"><label htmlFor="team-phone">Phone number <span>*</span></label><input {...fieldProps("phone")} type="tel" required autoComplete="tel" placeholder="Your phone number"/>{error("phone")}</div><div className="consultation-field"><label htmlFor="team-area">Area of interest <span>*</span></label><select {...fieldProps("area")} required><option value="">Choose your area</option>{areas.map(area => <option key={area}>{area}</option>)}</select>{error("area")}</div>
    <div className="consultation-field"><label htmlFor="team-portfolio">Portfolio / LinkedIn <small>Optional</small></label><input {...fieldProps("portfolio")} type="url" placeholder="https://" autoCapitalize="none"/>{error("portfolio")}</div><div className="consultation-field"><label htmlFor="team-cv">Link to your CV <small>Optional</small></label><input {...fieldProps("cv")} type="url" placeholder="https://" autoCapitalize="none"/><small className="consultation-timezone">A shareable link, or attach your CV when sending your email.</small>{error("cv")}</div>
    <div className="consultation-field consultation-goal"><label htmlFor="team-message">Tell us about yourself <span>*</span></label><textarea {...fieldProps("message")} rows={5} required placeholder="Your experience, the work you enjoy and what you would bring to EBA."/>{error("message")}</div>
  </div><div className="consultation-submit"><button className="pill green" type="submit">Review your introduction <ArrowRight size={16}/></button><p>We’ll prepare your introduction to send by email. This is an expression of interest, rather than an application for an advertised vacancy.</p></div></form>;
}
export function ContactForms({ today }: { today: string }) {
  const [active, setActive] = useState<"work" | "team">("work");
  const selectTab = (value: "work" | "team") => { setActive(value); document.getElementById(`contact-tab-${value}`)?.focus(); };
  return <div className="contact-forms"><div className="contact-tabs" role="tablist" aria-label="Reason for getting in touch">{[["work", "Work With Us"], ["team", "Join Our Team"]].map(([id, label]) => <button key={id} id={`contact-tab-${id}`} role="tab" aria-selected={active === id} aria-controls={`contact-panel-${id}`} tabIndex={active === id ? 0 : -1} onClick={() => setActive(id as "work" | "team")} onKeyDown={event => { if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) { event.preventDefault(); selectTab(event.key === "Home" ? "work" : event.key === "End" ? "team" : active === "work" ? "team" : "work"); } }}>{label}</button>)}</div>
    <div className="contact-form-card" id="contact-panel-work" role="tabpanel" aria-labelledby="contact-tab-work" hidden={active !== "work"}><div className="contact-form-heading"><span>01</span><div><h3>Work With Us</h3><p>Tell us about your brand, project, challenge or goal. We’ll review the details and follow up on the next step.</p></div></div><ConsultationForm today={today}/></div>
    <div className="contact-form-card" id="contact-panel-team" role="tabpanel" aria-labelledby="contact-tab-team" hidden={active !== "team"}><div className="contact-form-heading"><span>02</span><div><h3>Join Our Team</h3><p>Strategists, communicators, creatives and people who make things happen. Introduce yourself and show us the work you care about.</p></div></div><JoinTeamForm/></div>
  </div>;
}

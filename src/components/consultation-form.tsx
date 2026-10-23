"use client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, ArrowLeft, Mail } from "lucide-react";
import { allServiceOfferings } from "@/lib/service-offerings";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address.").max(254),
  phone: z.string().trim().min(7, "Please enter a valid phone number.").max(30).regex(/^[+\d\s().-]+$/, "Use a valid phone number."),
  company: z.string().trim().min(2, "Please enter your company or brand name.").max(150),
  service: z.string().min(1, "Please choose a service."),
  website: z.string().trim().max(300),
  goal: z.string().trim().min(10, "Please share a little more about your goal (at least 10 characters).").max(3000),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a date."),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Please choose a time."),
});
type Fields = z.infer<typeof schema>;

export function ConsultationForm({ initialService, today }: { initialService?: string; today: string }) {
  const [request, setRequest] = useState<Fields | null>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (request) reviewRef.current?.focus(); }, [request]);
  const { register, handleSubmit, setError, formState: { errors } } = useForm<Fields>({ resolver: zodResolver(schema), defaultValues: { service: allServiceOfferings.some(item => item.slug === initialService) ? initialService : "", website: "" } });
  const fieldProps = (name: keyof Fields) => ({ id: `consult-${name}`, "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `consult-${name}-error` : undefined, ...register(name) });
  const error = (name: keyof Fields) => errors[name] && <span className="consultation-error" role="alert" id={`consult-${name}-error`}>{errors[name]?.message}</span>;
  const serviceName = request?.service === "not-sure" ? "Help me choose the right support" : allServiceOfferings.find(item => item.slug === request?.service)?.title;
  const dateLabel = request ? new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "Africa/Lagos" }).format(new Date(`${request.date}T12:00:00+01:00`)) : "";
  const body = request ? `Name: ${request.name}\nEmail: ${request.email}\nPhone: ${request.phone}\nCompany / brand: ${request.company}\nService: ${serviceName}\nWebsite / Instagram: ${request.website || "Not provided"}\n\nWhat I would like to achieve:\n${request.goal}\n\nPreferred date: ${dateLabel}\nPreferred time: ${request.time} WAT (Lagos)\n\nPlease confirm availability for my consultation.` : "";
  if (request) return <div className="consultation-review" ref={reviewRef} tabIndex={-1}><span className="consultation-review-label">Your request, ready to send</span><h3>One last look.</h3><p>Send these details to EBA by email. Your consultation is confirmed when our team replies.</p><dl><div><dt>Name</dt><dd>{request.name}</dd></div><div><dt>Company / brand</dt><dd>{request.company}</dd></div><div><dt>Service</dt><dd>{serviceName}</dd></div><div><dt>Preferred time</dt><dd>{dateLabel}, {request.time} WAT</dd></div><div><dt>Your goal</dt><dd>{request.goal}</dd></div></dl><a className="pill green" href={`mailto:admin@enibrand.com?subject=${encodeURIComponent(`Consultation request — ${request.company}`)}&body=${encodeURIComponent(body)}`}><Mail size={16}/> Send consultation request</a><button type="button" className="consultation-edit" onClick={() => setRequest(null)}><ArrowLeft size={14}/> Edit details</button><small>Your email app opens with the details filled in. Send the email there to complete your request.</small></div>;
  return <form className="consultation-form" noValidate onSubmit={event => { void handleSubmit(values => {
    const currentDate = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Lagos", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
    if (values.date < currentDate || new Date(`${values.date}T${values.time}:00+01:00`).getTime() <= Date.now()) { setError("date", { message: "Please choose a future date and time." }); return; }
    if (values.service !== "not-sure" && !allServiceOfferings.some(item => item.slug === values.service)) { setError("service", { message: "Please choose one of the services listed." }); return; }
    setRequest(values);

  })(event); }}>
    <div className="consultation-fields"><div className="consultation-field"><label htmlFor="consult-name">Name <span>*</span></label><input {...fieldProps("name")} autoComplete="name" placeholder="Your full name" required/>{error("name")}</div><div className="consultation-field"><label htmlFor="consult-email">Email <span>*</span></label><input {...fieldProps("email")} type="email" autoComplete="email" placeholder="you@company.com" required/>{error("email")}</div>
    <div className="consultation-field"><label htmlFor="consult-phone">Phone number <span>*</span></label><input {...fieldProps("phone")} type="tel" autoComplete="tel" placeholder="e.g. +234 903 380 1241" required/>{error("phone")}</div><div className="consultation-field"><label htmlFor="consult-company">Company / brand name <span>*</span></label><input {...fieldProps("company")} autoComplete="organization" placeholder="Your company or brand" required/>{error("company")}</div>
    <div className="consultation-field"><label htmlFor="consult-service">What do you need help with? <span>*</span></label><select {...fieldProps("service")} required><option value="">Select a service</option>{allServiceOfferings.map(item => <option key={item.slug} value={item.slug}>{item.title}</option>)}<option value="not-sure">I’m not sure yet</option></select>{error("service")}</div><div className="consultation-field"><label htmlFor="consult-website">Website / Instagram <small>Optional</small></label><input {...fieldProps("website")} placeholder="Website or @handle" autoCapitalize="none" autoCorrect="off"/>{error("website")}</div>
    <div className="consultation-field consultation-goal"><label htmlFor="consult-goal">What would you like to achieve? <span>*</span></label><textarea {...fieldProps("goal")} rows={4} placeholder="Tell us about the challenge, idea or opportunity." required/>{error("goal")}</div>
    <div className="consultation-field"><label htmlFor="consult-date">Preferred consultation date <span>*</span></label><input {...fieldProps("date")} type="date" min={today} required/>{error("date")}</div><div className="consultation-field"><label htmlFor="consult-time">Preferred time <span>*</span></label><input {...fieldProps("time")} type="time" required/><small className="consultation-timezone">West Africa Time · Lagos (UTC+1)</small>{error("time")}</div></div>
    <div className="consultation-submit"><button type="submit" className="pill green">Review your request <ArrowRight size={16}/></button><p>We’ll prepare your details to send by email. Your preferred time is subject to confirmation.</p></div>
  </form>;
}


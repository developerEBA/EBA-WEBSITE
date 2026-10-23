"use client";
import { useState } from "react";
import { ActionLink } from "@/components/shared/action-link";
import { ArrowUpRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const newsletterSchema = z.object({
  firstName: z.string().trim().min(2, "Please enter your first name.").max(80, "Please use no more than 80 characters."),
  email: z.email("Please enter a valid email address.").max(254),
});
type NewsletterFields = z.infer<typeof newsletterSchema>;

export function Newsletter() {
  const [status, setStatus] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<NewsletterFields>({ resolver: zodResolver(newsletterSchema) });
  return <section className="unified-contact" id="contact"><div className="unified-contact-shell"><div className="unified-contact-copy"><span className="eyebrow">STAY AHEAD OF THE CONVERSATION</span><h2>Your next chapter<br/>deserves to be seen.</h2><p>Tell us what you’re building, or join our newsletter for ideas on brands, communications and experiences.</p><ActionLink href="mailto:admin@enibrand.com" variant="yellow">Start a Conversation</ActionLink></div><div className="unified-contact-form"><h3>Keep the ideas coming.</h3><p>Practical thinking from EBA, delivered to your inbox.</p><form noValidate onSubmit={handleSubmit(() => setStatus("Newsletter signup will be available when our email service is connected."))}><label htmlFor="newsletter-name">FIRST NAME</label><input id="newsletter-name" {...register("firstName")} placeholder="Your first name" required autoComplete="given-name" aria-invalid={Boolean(errors.firstName)} aria-describedby={errors.firstName ? "name-error" : undefined}/>{errors.firstName && <span className="field-error" id="name-error" role="alert">{errors.firstName.message}</span>}<label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" {...register("email")} type="email" placeholder="Your email address" required autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined}/>{errors.email && <span className="field-error" id="email-error" role="alert">{errors.email.message}</span>}<button className="pill yellow" type="submit">Join The Newsletter <ArrowUpRight size={14}/></button>{status && <p role="status">{status}</p>}</form></div></div></section>;
}

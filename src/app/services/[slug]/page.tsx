import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { serviceOfferings, allServiceOfferings } from "@/lib/service-offerings";
import { Entrance } from "@/components/shared/motion";
import { ActionLink } from "@/components/shared/action-link";
import "../services.css";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return allServiceOfferings.map(service => ({ slug: service.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = allServiceOfferings.find(item => item.slug === slug);
  return { title: `${service?.title ?? "Service not found"} | EBA`, description: service?.description };
}
export default async function ServiceDetail({ params }: Props) {
  const { slug } = await params;
  const service = allServiceOfferings.find(item => item.slug === slug);
  if (!service) notFound();
  const index = allServiceOfferings.indexOf(service);
  return <main className="services-page service-detail-page"><section className={`service-detail-hero hero-${service.slug}`}><div className="services-shell"><Link href="/services" className="service-back"><ArrowLeft size={16}/> Our services</Link><Entrance><span className="services-eyebrow">EBA expertise / 0{index + 1}</span><h1>{service.title}</h1><p>{service.intro}</p><ActionLink variant="green" href={`/consultation?service=${service.slug}`}>Discuss your brief</ActionLink></Entrance></div></section><section className="services-shell service-detail-content"><Entrance><span className="services-eyebrow">The work</span><h2>{service.description}</h2></Entrance><Entrance><h3>What we can help with</h3><ul>{service.items.map(([title, description], i) => <li key={title}><span>0{i + 1}</span><div><strong>{title}</strong><p>{description}</p></div></li>)}</ul></Entrance><Entrance className="service-detail-approach"><span className="services-eyebrow">How we approach it</span><p>{service.approach}</p><p className="service-outcome">{service.outcome}</p></Entrance></section><section className="service-detail-related services-shell"><h2>Explore the other services</h2><div>{serviceOfferings.filter(item => item.slug !== slug).map(item => <Link key={item.slug} href={`/services/${item.slug}`}>{item.short}<ArrowUpRight size={17}/></Link>)}</div></section></main>;
}





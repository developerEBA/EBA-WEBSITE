import { ArrowUpRight, ChevronDown, type LucideIcon } from "lucide-react";
import { Entrance } from "@/components/shared/motion";
import Link from "next/link";

const servicePages: Record<string, string> = {
  brand: "brand-and-reputation",
  pr: "pr-and-strategic-communications",
  marketing: "marketing-and-amplification",
  events: "experiences-and-activations",
  research: "research-and-insights",
  content: "content-and-creative",
};

export type Service = { title: string; description: string; tags: string[]; detail: string; icon: LucideIcon; id: string };

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return <Entrance delay={(index % 3) * .08} className={`expertise-card-wrap ${index < 2 ? "expertise-wide" : ""}`}>
    <article className="expertise-card" id={service.id}>
      <div className="expertise-card-top"><span>0{index + 1}</span></div>
      <h3>{service.title}</h3><div className="expertise-card-body"><p>{service.description}</p>
      <ul className="expertise-tags">{service.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      {servicePages[service.id] && <Link href={`/services/${servicePages[service.id]}`} className="service-page-link">Explore This Service <ArrowUpRight size={15}/></Link>}
      <details className="expertise-detail"><summary>What’s included <ArrowUpRight className="detail-arrow" size={15}/><ChevronDown className="detail-chevron" size={15}/></summary><div><p>{service.detail}</p><a href={`mailto:admin@enibrand.com?subject=${encodeURIComponent(`Let's talk: ${service.title}`)}`}>Talk to us about {service.title.toLowerCase()} <ArrowUpRight size={14}/></a></div></details></div>
    </article>
  </Entrance>;
}

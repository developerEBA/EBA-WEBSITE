import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Entrance } from "@/components/shared/motion";
import { ActionLink } from "@/components/shared/action-link";

type AboutDetailProps = {
  title: string;
  line: string;
  intro: string;
  body: string;
  eyebrow: string;
  service: string;
  image?: string;
  focus?: string[][];
  images?: string[][];
  navigation: { title: string; href: string; current: boolean }[];
};

export function AboutDetail({ title, line, intro, body, eyebrow, service, image, focus, images, navigation }: AboutDetailProps) {
  return <main className="about-detail-page"><section className="about-detail-hero"><div className="section-shell"><Link href="/about/our-story" className="about-detail-back"><ArrowLeft size={16}/> About EBA</Link><div className="about-detail-heading"><Entrance direction="left"><span className="eyebrow">{eyebrow} / {title}</span><h1>{line}</h1></Entrance><Entrance direction="right"><p>{intro}</p><ActionLink href={`/#contact`} variant="yellow">Start a Conversation</ActionLink></Entrance></div></div></section><nav className="about-detail-nav" aria-label={images ? "Work galleries" : "Our sectors"}><div className="section-shell">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={item.current ? "page" : undefined}>{item.title}<ArrowUpRight size={14}/></Link>)}</div></nav><section className="about-detail-intro section-shell"><Entrance><span className="eyebrow">{images ? "BEYOND THE WORK" : "UNDERSTANDING YOUR WORLD"}</span><h2>{title}</h2></Entrance><Entrance direction="right"><p>{body}</p></Entrance></section>{image && <Entrance className="about-detail-banner section-shell"><Image src={image} alt={`${title} sector imagery`} width={1100} height={430} sizes="90vw" style={{ width: "100%", height: "auto" }}/></Entrance>}{focus && <section className="about-detail-focus section-shell" aria-label="Our focus">{focus.map(([heading, text], index) => <Entrance key={heading} delay={index * .08}><article><span>0{index + 1}</span><h3>{heading}</h3><p>{text}</p></article></Entrance>)}</section>}{images && <section className="about-detail-gallery section-shell" aria-label={`${title} gallery`}>{images.map(([src, caption], index) => <Entrance key={src} delay={index * .08}><figure><div><Image src={src} alt={caption} fill sizes={index === 0 ? "90vw" : "(max-width: 700px) 90vw, 45vw"} style={{ objectFit: "cover" }}/></div><figcaption>{caption}</figcaption></figure></Entrance>)}</section>}<section className="about-detail-next section-shell"><Entrance><span className="eyebrow">CONNECTED EXPERTISE</span><h2>The thinking behind<br/>the work.</h2></Entrance><Entrance direction="right"><p>Explore the service approach, or return to our story to discover the people and purpose behind EBA.</p><div><ActionLink href={`/services/${service}`} variant="yellow">Explore the Service</ActionLink><ActionLink href="/about/our-story" variant="outline-light">Back to Our Story</ActionLink></div></Entrance></section></main>;
}

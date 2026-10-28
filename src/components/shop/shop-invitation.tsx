import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import "./shop-invitation.css";

export function ShopInvitation() {
  return <section className="home-shop-invitation section-shell"><div className="home-shop-photo"><Image src="/images/shop/collection-preview.webp" alt="EBA bottle, cup, shirt and tote bag collection mockup" fill sizes="(max-width:700px) 90vw, 45vw" /></div><div className="home-shop-copy"><span>EBA SHOP / COLLECTION PREVIEW</span><h2>A little EBA.<br /><em>For your everyday.</em></h2><p>Water bottles, cups, signature tees and more. Take a first look at the EBA merchandise collection.</p><Link href="/shop" className="pill green">Explore EBA Shop <ArrowUpRight size={16} /></Link></div></section>;
}

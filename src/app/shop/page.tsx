import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Package, Palette, ShoppingBag } from "lucide-react";
import { ShopBagLink, ShopCatalogue } from "@/components/shop/shop-catalogue";

export const metadata: Metadata = { title: "EBA Shop | Everyday Essentials", description: "Explore EBA merchandise concepts: hoodies, Stanley cups, Adire fabric, signature T-shirts and tote bags." };

export default function ShopPage() {
  return <main className="shop-home">
    <div className="shop-topline shop-shell"><ShopBagLink /></div>
    <section className="shop-hero shop-shell"><div className="shop-hero-copy"><h1>Take a little<br /><em>EBA</em> with you<span>.</span></h1><p>For your morning coffee, your next big idea and everything in between. Meet the everyday essentials, with an EBA touch.</p><Link className="pill green" href="#collection">Explore the collection <ArrowDown size={16} /></Link><span className="shop-hero-footnote">A first look at what’s taking shape.</span></div><div className="shop-hero-visual"><Image src="/images/shop/collection-preview.png" alt="EBA merchandise concept collection: a green water bottle, cream cup, green shirt and canvas tote" fill preload sizes="(max-width:800px) 90vw, 58vw" /><span className="shop-hero-stamp">eba<span>.</span><small>THE EVERYDAY<br />COLLECTION</small></span><span className="shop-hero-caption">Collection concept / Illustrative mockup</span></div></section>
    <div className="shop-brand-strip" aria-hidden="true"><span>THE EVERYDAY COLLECTION</span><b>✳</b><span>DRINK. WEAR. CARRY.</span><b>✳</b><span>A LITTLE EBA, EVERY DAY.</span><b>✳</b><span>THE EVERYDAY COLLECTION</span></div>
    <ShopCatalogue />
    <section className="shop-editorial shop-shell"><div className="shop-editorial-mark">eba<span>.</span><small>Made part of your day.</small></div><div><span className="shop-eyebrow">More than a logo</span><h2>Familiar things.<br /><em>Our own little touch.</em></h2><p>A favourite cup. A go-to tee. The bag you reach for on your way out. We’re bringing the EBA identity into the everyday, one considered piece at a time.</p><Link href="/about/our-story" className="shop-text-link">Meet the brand behind the pieces <ArrowUpRight size={15} /></Link></div></section>
    <section className="shop-details-strip shop-shell">{[[Palette,"An EBA point of view","Green, pink, black, white, beige and mustard yellow."],[ShoppingBag,"Build your enquiry bag","Save your favourites and ask the team about them."],[Package,"A collection in the making","Final products, pricing and delivery are being confirmed."]].map(([Icon,title,copy])=>{const Symbol=Icon as typeof Palette;return <div key={String(title)}><Symbol size={23} strokeWidth={1.4} aria-hidden="true" /><h3>{String(title)}</h3><p>{String(copy)}</p></div>;})}</section>
    <section className="shop-gifting shop-shell"><div><span className="shop-eyebrow">For teams & thoughtful gifting</span><h2>A little EBA.<br />For the whole crew.</h2><p>Interested in merchandise for a team, event or gift? Tell us what you have in mind.</p></div><a href="mailto:hello@enibrand.com?subject=EBA%20merchandise%20%26%20gifting%20enquiry" className="pill yellow">Talk to the team <ArrowUpRight size={16} /></a></section>
  </main>;
}

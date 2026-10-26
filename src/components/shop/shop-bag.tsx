"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { maxBagQuantity, merchandiseEmail, shopProducts, type BagLine } from "@/lib/shop";
import { saveBag, useBag } from "./bag-store";

export function ShopBag() {
  const lines = useBag();
  const [error, setError] = useState("");
  function update(line: BagLine, quantity: number) {
    const next = lines.flatMap(item => item.slug === line.slug && item.option === line.option && item.colour === line.colour ? quantity > 0 ? [{ ...item, quantity }] : [] : [item]);
    if (!saveBag(next)) setError("Your browser could not update the bag. Please allow browser storage or contact EBA directly.");
  }
  if (!lines.length) return <div className="shop-empty-bag"><ShoppingBag size={48} strokeWidth={1} aria-hidden="true" /><h2>Room for something good.</h2><p>Your bag is empty. Explore the collection and save the pieces you’d like to ask us about.</p><Link href="/shop#collection" className="pill green">Explore the collection <ArrowUpRight size={16} /></Link></div>;
  return (
    <div className="shop-bag-grid"><div className="shop-bag-items">{lines.map(line => {
      const product = shopProducts.find(product => product.slug === line.slug)!;
      return <article className="shop-bag-item" key={`${line.slug}:${line.colour}:${line.option}`}><Link href={`/shop/${product.slug}`} className="shop-bag-photo"><Image src={product.colours.find(colour=>colour.name===line.colour)?.image??product.image} alt={`${product.name} mockup`} fill sizes="140px" /></Link><div><span className="shop-eyebrow">{product.category}</span><h2><Link href={`/shop/${product.slug}`}>{product.name}</Link></h2><p>{line.colour}{line.option !== "Standard" ? ` / ${line.option}` : ""} · Collection preview</p><div className="shop-quantity" role="group" aria-label={`${product.name} quantity`}><button aria-label={`Decrease ${product.name} quantity`} disabled={line.quantity <= 1} onClick={() => update(line, line.quantity - 1)}><Minus size={14} /></button><output aria-live="polite">{line.quantity}</output><button aria-label={`Increase ${product.name} quantity`} disabled={line.quantity >= maxBagQuantity} onClick={() => update(line, line.quantity + 1)}><Plus size={14} /></button></div></div><button className="shop-remove" aria-label={`Remove ${product.name}, ${line.colour}, ${line.option}`} onClick={() => update(line, 0)}><Trash2 size={17} /></button></article>;
    })}<p className="shop-small" role="alert">{error}</p></div><aside className="shop-bag-summary"><span className="shop-eyebrow">Your selection</span><h2>Good choices.</h2><div className="shop-summary-line"><span>Pieces</span><span>{lines.reduce((sum, line) => sum + line.quantity, 0)}</span></div><div className="shop-summary-line"><span>Pricing & delivery</span><span>To be confirmed</span></div><p>Ask the EBA team about availability, final prices and delivery for the pieces in your bag.</p><a className="pill green" href={merchandiseEmail(lines)}>Enquire about these items <ArrowUpRight size={16} /></a><span className="shop-small">Opens an email template. Send it in your email app to contact EBA.</span><Link href="/shop/checkout" className="shop-text-link">About online checkout →</Link><p className="shop-small">Your bag is saved on this browser. No order or payment has been placed.</p></aside></div>
  );
}

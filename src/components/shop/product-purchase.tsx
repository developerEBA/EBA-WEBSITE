"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { maxBagQuantity, type ShopProduct } from "@/lib/shop";
import { readBag, saveBag } from "./bag-store";

export function ProductPurchase({ product, colour, onColourChange }: { product: ShopProduct; colour: string; onColourChange: (value: string) => void }) {
  const [option, setOption] = useState(product.options[0]);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [added, setAdded] = useState(false);
  function add() {
    const lines = readBag();
    const existing = lines.find(line => line.slug === product.slug && line.option === option && line.colour === colour);
    if (existing) existing.quantity = Math.min(maxBagQuantity, existing.quantity + quantity);
    else lines.push({ slug: product.slug, colour, option, quantity });
    if (saveBag(lines)) { setAdded(true); setMessage("Saved to your bag for an availability enquiry."); }
    else { setAdded(false); setMessage("Your browser could not save the bag. Email hello@enibrand.com to enquire about this piece."); }
  }
  return (
    <div className="shop-purchase">
      <fieldset className="shop-options shop-colour-options"><legend>Colour: <strong>{colour}</strong></legend><div>{product.colours.map(item=><label key={item.name} title={item.name}><input type="radio" name={`colour-${product.slug}`} value={item.name} aria-label={item.name} checked={colour===item.name} onChange={()=>{onColourChange(item.name);setAdded(false);}}/><span><i style={{background:item.hex}} aria-hidden="true"/>{item.name}</span></label>)}</div></fieldset>
      {product.category === "Apparel" && <fieldset className="shop-options"><legend>Preferred size</legend><div>{product.options.map(item=><label key={item}><input type="radio" name={`option-${product.slug}`} value={item} checked={item===option} onChange={()=>{setOption(item);setAdded(false);}}/><span>{item}</span></label>)}</div></fieldset>}
      {product.category === "Apparel" && <p className="shop-small">Size preferences are requests; available sizes and fit are yet to be confirmed.</p>}
      <div className="shop-purchase-row"><div className="shop-quantity" role="group" aria-label="Quantity"><button aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => { setQuantity(quantity - 1); setAdded(false); }}><Minus size={15} /></button><output aria-live="polite">{quantity}</output><button aria-label="Increase quantity" disabled={quantity >= maxBagQuantity} onClick={() => { setQuantity(quantity + 1); setAdded(false); }}><Plus size={15} /></button></div><button className="pill green" onClick={add}>{added ? <Check size={17} /> : <ShoppingBag size={17} />} {added ? "Added to bag" : "Add to enquiry bag"}</button></div>
      <p className="shop-small" role="status">{message}</p>
      <Link className="shop-text-link" href="/shop/cart">View your bag →</Link>
      <p className="shop-small">No payment is collected. Adding an item saves your preference in this browser; it does not reserve stock.</p>
    </div>
  );
}

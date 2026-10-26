"use client";

import Image from "next/image";
import { useState } from "react";
import { shopPrice, type ShopProduct } from "@/lib/shop";
import { ProductPurchase } from "./product-purchase";

export function ProductDetail({ product }: { product: ShopProduct }) {
  const [colour, setColour] = useState(product.colours[0].name);
  const selected = product.colours.find(item => item.name === colour)!;
  return <div className="shop-detail-grid"><div className={`shop-detail-image shop-tone-${product.tone}`}><Image src={selected.image} alt={`${product.name} in ${colour} — illustrative concept mockup`} fill preload sizes="(max-width:800px) 90vw, 48vw" /><span className="shop-preview-badge">Collection preview</span></div><div className="shop-detail-copy"><span className="shop-eyebrow">EBA Essentials / {product.category}</span><h1>{product.name}</h1><p className="shop-detail-description">{product.description}</p><p className="shop-price-label">{shopPrice(product.priceNGN)}</p><ProductPurchase product={product} colour={colour} onColourChange={setColour} /><details className="shop-product-details" open><summary>About this piece</summary><ul>{product.details.map(detail => <li key={detail}>{detail}</li>)}</ul></details><details className="shop-product-details"><summary>Availability & delivery</summary><p>These are collection concepts. Contact EBA to confirm final colours, specifications, availability and delivery options before ordering.</p></details></div></div>;
}

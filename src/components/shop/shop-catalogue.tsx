"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { shopProducts } from "@/lib/shop";
import { ProductCard } from "./product-card";
import { useBag } from "./bag-store";

const categories = ["All pieces", "Drinkware", "Apparel", "Accessories", "Fabrics"];
export function ShopBagLink() {
  const lines = useBag();
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  return <Link href="/shop/cart" className="shop-bag-link"><ShoppingBag size={17} aria-hidden="true" /> Your bag <span>{count}</span></Link>;
}
export function ShopCatalogue() {
  const [category, setCategory] = useState("All pieces");
  const products = shopProducts.filter(product => category === "All pieces" || product.category === category);
  return (
    <section id="collection" className="shop-collection shop-shell">
      <div className="shop-section-heading"><div><span className="shop-eyebrow">The collection</span><h2>A little EBA.<br /><em>A lot of everyday.</em></h2></div><p>Hoodies, tees, cups, Adire and two ways to carry EBA.<br />Choose your favourites and enquire with the team.</p></div>
      <div className="shop-catalogue-toolbar"><div className="shop-filters" role="group" aria-label="Filter merchandise">{categories.map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><span role="status">{products.length} {products.length === 1 ? "piece" : "pieces"}</span></div>
      <div className="shop-product-grid">{products.map(product => <ProductCard key={product.slug} product={product} />)}</div>
    </section>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ShopBag } from "@/components/shop/shop-bag";

export const metadata = { title: "Your Bag | EBA Shop", robots: { index: false, follow: false } };
export default function BagPage() {
  return <main className="shop-cart shop-shell"><Link className="shop-text-link" href="/shop"><ArrowLeft size={15} /> Back to the shop</Link><header className="shop-cart-heading"><span className="shop-eyebrow">EBA Shop / Your selection</span><h1>Your bag<span>.</span></h1><p>A few things to take a closer look at.</p></header><ShopBag /></main>;
}

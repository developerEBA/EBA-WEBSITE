import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export const metadata = { title: "Checkout Availability | EBA Shop", robots: { index: false, follow: false } };
export default function CheckoutPage() {
  return <main className="shop-checkout shop-shell"><Link href="/shop/cart" className="shop-text-link"><ArrowLeft size={15} /> Back to your bag</Link><section className="shop-checkout-card"><ShoppingBag size={40} strokeWidth={1.2} /><span className="shop-eyebrow">EBA Shop</span><h1>A little more<br /><em>in the making.</em></h1><p>Online checkout is not yet open. The EBA team will confirm product availability, prices and delivery before any order is placed.</p><Link href="/shop/cart" className="pill green">Return to your enquiry bag</Link><a href="mailto:hello@enibrand.com" className="shop-text-link">Contact hello@enibrand.com</a></section></main>;
}

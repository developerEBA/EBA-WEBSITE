import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { shopProducts } from "@/lib/shop";
import { ShopBagLink } from "@/components/shop/shop-catalogue";
import { ProductDetail } from "@/components/shop/product-detail";
import { ProductCard } from "@/components/shop/product-card";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return shopProducts.map(product => ({ slug: product.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = shopProducts.find(product => product.slug === slug);
  return { title: `${product?.name ?? "Product not found"} | EBA Shop`, description: product?.description };
}
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = shopProducts.find(product => product.slug === slug);
  if (!product) notFound();
  return <main className="shop-detail shop-shell"><div className="shop-topline"><Link href="/shop#collection" className="shop-text-link"><ArrowLeft size={15} /> Back to the collection</Link><ShopBagLink /></div><ProductDetail product={product} /><section className="shop-related"><div className="shop-section-heading"><div><span className="shop-eyebrow">Keep exploring</span><h2>Good company.</h2></div></div><div className="shop-product-grid shop-related-grid">{shopProducts.filter(item => item.slug !== slug).map(item => <ProductCard key={item.slug} product={item} />)}</div></section></main>;
}

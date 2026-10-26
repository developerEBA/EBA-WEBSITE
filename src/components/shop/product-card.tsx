import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { shopPrice, type ShopProduct } from "@/lib/shop";

export function ProductCard({ product }: { product: ShopProduct }) {
  return (
    <article className="shop-product-card">
      <Link href={`/shop/${product.slug}`} className={`shop-product-image shop-tone-${product.tone}`} aria-label={`Explore ${product.name}`}>
        <Image src={product.image} alt={`${product.name} — illustrative EBA merchandise mockup`} fill sizes="(max-width:600px) 90vw, (max-width:1000px) 45vw, 23vw" />
        <span className="shop-preview-badge">Collection preview</span>
        <span className="shop-product-arrow"><ArrowUpRight size={19} aria-hidden="true" /></span>
      </Link>
      <div className="shop-product-meta"><span>{product.category}</span><span>eba essentials</span></div>
      <h3><Link href={`/shop/${product.slug}`}>{product.name}</Link></h3>
      <p>{shopPrice(product.priceNGN)}</p><div className="shop-card-colours" aria-label="Colour concepts">{product.colours.map(colour=><span key={colour.name} title={colour.name} style={{background:colour.hex}} role="img" aria-label={colour.name}/>)}<small>{product.colours.length} colours</small></div>
    </article>
  );
}

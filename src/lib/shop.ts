export type ShopCategory = "Drinkware" | "Apparel" | "Accessories";
export type ShopProduct = {
  slug: string;
  name: string;
  category: ShopCategory;
  description: string;
  image: string;
  tone: string;
  colours: { name: string; hex: string; image: string }[];
  details: string[];
  options: string[];
  priceNGN: number | null;
  status: "preview";
};

// Concept catalogue only. Replace with approved photos, specifications, prices and
// inventory before connecting a commerce backend or accepting payments.
export const shopProducts: ShopProduct[] = [
  {
    slug: "everyday-bottle", name: "The Everyday Bottle", category: "Drinkware",
    description: "A little EBA for wherever the day takes you. A considered bottle concept with a clean, understated finish.",
    image: "/images/shop/bottle-preview.png", tone: "sage",
    details: ["Forest-green design with the EBA wordmark", "Reusable bottle concept", "Final material, capacity and care details to be confirmed"],
    colours: [{name:"Forest green",hex:"#063c2d",image:"/images/shop/bottle-preview.png"},{name:"Black",hex:"#222522",image:"/images/shop/bottle-black-preview.png"}],
    options: ["Standard"], priceNGN: null, status: "preview",
  },
  {
    slug: "studio-cup", name: "The Studio Cup", category: "Drinkware",
    description: "For your first coffee, a quiet pause or the next big idea. A warm-cream cup concept with a simple EBA signature.",
    image: "/images/shop/cup-preview.png", tone: "sand",
    details: ["Warm-cream design with the EBA wordmark", "Everyday cup concept", "Final material, capacity and care details to be confirmed"],
    colours: [{name:"Warm cream",hex:"#e9dfc8",image:"/images/shop/cup-preview.png"},{name:"Forest green",hex:"#063c2d",image:"/images/shop/cup-green-preview.png"}],
    options: ["Standard"], priceNGN: null, status: "preview",
  },
  {
    slug: "signature-shirt", name: "The Signature Tee", category: "Apparel",
    description: "Easy to wear. Easy to make your own. An EBA T-shirt concept for days in the studio and beyond.",
    image: "/images/shop/shirt-preview.png", tone: "cream",
    details: ["Forest-green design with a small EBA chest wordmark", "Short-sleeve, crew-neck concept", "Fit, fabric and available sizes to be confirmed"],
    colours: [{name:"Forest green",hex:"#063c2d",image:"/images/shop/shirt-preview.png"},{name:"Warm cream",hex:"#e9dfc8",image:"/images/shop/shirt-cream-preview.png"}],
    options: ["Size to discuss", "S", "M", "L", "XL", "XXL"], priceNGN: null, status: "preview",
  },
  {
    slug: "everyday-tote", name: "The Everyday Tote", category: "Accessories",
    description: "Room for your daily essentials and a few good ideas. An EBA tote concept with a considered, minimal finish.",
    image: "/images/shop/tote-preview.png", tone: "olive",
    details: ["Cream design with the EBA wordmark", "Carry-everywhere tote concept", "Final material, dimensions and care details to be confirmed"],
    colours: [{name:"Natural cream",hex:"#e9dfc8",image:"/images/shop/tote-preview.png"},{name:"Black",hex:"#222522",image:"/images/shop/tote-black-preview.png"}],
    options: ["Standard"], priceNGN: null, status: "preview",
  },
];

export type BagLine = { slug: string; colour: string; option: string; quantity: number };
export function shopPrice(price: number | null) { return price === null ? "Price to be confirmed" : new Intl.NumberFormat("en-NG", {style:"currency",currency:"NGN",maximumFractionDigits:0}).format(price); }
export const bagKey = "eba-shop-bag:v1";
export const maxBagQuantity = 10;
export function parseBag(raw: string): BagLine[] {
  try {
    const input: unknown = JSON.parse(raw);
    if (!Array.isArray(input)) return [];
    const result: BagLine[] = [];
    for (const item of input.slice(0, 40)) {
      if (!item || typeof item !== "object") continue;
      const product = shopProducts.find(product => product.slug === item.slug);
      if (!product) continue;
      const colour = typeof item.colour === "string" ? item.colour : product.colours[0].name;
      const option = product.category !== "Apparel" && product.colours.some(value=>value.name===item.option) ? "Standard" : item.option;
      if (!product.colours.some(value=>value.name===colour) || !product.options.includes(option) || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > maxBagQuantity) continue;
      const existing = result.find(line => line.slug === item.slug && line.option === option && line.colour === colour);
      if (existing) existing.quantity = Math.min(maxBagQuantity, existing.quantity + item.quantity);
      else result.push({ slug: item.slug, colour, option, quantity: item.quantity });
    }
    return result;
  } catch { return []; }
}
export function merchandiseEmail(lines: BagLine[]) {
  const items = lines.map(line => `${shopProducts.find(product => product.slug === line.slug)?.name ?? line.slug} — ${line.colour}${line.option === "Standard" ? "" : ` / ${line.option}`} — quantity ${line.quantity}`).join("\n");
  return `mailto:hello@enibrand.com?subject=${encodeURIComponent("EBA merchandise enquiry")}&body=${encodeURIComponent(`Hello EBA,\n\nI’m interested in the following merchandise:\n\n${items}\n\nPlease confirm availability, final specifications, pricing and delivery options.\n\nName:\nDelivery city:\nPhone (optional):\n`)}`;
}

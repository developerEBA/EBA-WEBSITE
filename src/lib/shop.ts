export type ShopCategory = "Drinkware" | "Apparel" | "Accessories" | "Fabrics";
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
    details: ["Six colour concepts with the EBA wordmark", "Reusable bottle concept", "Final material, capacity and care details to be confirmed"],
    colours: [{"name":"Forest green","hex":"#063c2d","image":"/images/shop/bottle-preview.png"},{"name":"Pink","hex":"#df9cad","image":"/images/shop/bottle-pink-photo.png"},{"name":"Black","hex":"#222522","image":"/images/shop/bottle-black-preview.png"},{"name":"White","hex":"#fafafa","image":"/images/shop/bottle-white-photo.png"},{"name":"Beige","hex":"#d9c5a4","image":"/images/shop/bottle-beige-photo.png"},{"name":"Mustard yellow","hex":"#c79b27","image":"/images/shop/bottle-mustard-photo.png"}],
    options: ["Standard"], priceNGN: null, status: "preview",
  },
  {
    slug: "studio-cup", name: "The Studio Cup", category: "Drinkware",
    description: "For your first coffee, a quiet pause or the next big idea. A cup concept in our merchandise colours with a simple EBA signature.",
    image: "/images/shop/cup-preview.png", tone: "sand",
    details: ["Six merchandise colours plus the original warm cream","Everyday cup concept","Final material, capacity and care details to be confirmed"],
    colours: [{"name":"Warm cream","hex":"#e9dfc8","image":"/images/shop/cup-preview.png"},{"name":"Forest green","hex":"#063c2d","image":"/images/shop/cup-green-preview.png"},{"name":"Pink","hex":"#df9cad","image":"/images/shop/cup-pink-photo.png"},{"name":"Black","hex":"#222522","image":"/images/shop/cup-black-photo.png"},{"name":"White","hex":"#fafafa","image":"/images/shop/cup-white-photo.png"},{"name":"Beige","hex":"#d9c5a4","image":"/images/shop/cup-beige-photo.png"},{"name":"Mustard yellow","hex":"#c79b27","image":"/images/shop/cup-mustard-photo.png"}],
    options: ["Standard"], priceNGN: null, status: "preview",
  },
  {
    slug: "signature-shirt", name: "The Signature Tee", category: "Apparel",
    description: "Easy to wear. Easy to make your own. An EBA T-shirt concept for days in the studio and beyond.",
    image: "/images/shop/shirt-green-photo.png", tone: "cream",
    details: ["EBA wordmark in green, pink, black, white, beige or mustard yellow", "Short-sleeve, crew-neck concept", "Fit, fabric and available sizes to be confirmed"],
    colours: [{"name": "Forest green", "hex": "#063c2d", "image": "/images/shop/shirt-green-photo.png"}, {"name": "Pink", "hex": "#df9cad", "image": "/images/shop/shirt-pink-photo.png"}, {"name": "Black", "hex": "#222522", "image": "/images/shop/shirt-black-photo.png"}, {"name": "White", "hex": "#fafafa", "image": "/images/shop/shirt-white-photo.png"}, {"name": "Beige", "hex": "#d9c5a4", "image": "/images/shop/shirt-beige-photo.png"}, {"name": "Mustard yellow", "hex": "#c79b27", "image": "/images/shop/shirt-mustard-photo.png"}],
    options: ["Size to discuss", "S", "M", "L", "XL", "XXL"], priceNGN: null, status: "preview",
  },
  {
    slug: "everyday-tote", name: "The Everyday Tote", category: "Accessories",
    description: "Room for your daily essentials and a few good ideas. An EBA tote concept with a considered, minimal finish.",
    image: "/images/shop/tote-preview.png", tone: "olive",
    details: ["Carry-everywhere tote concept","Final material, dimensions and care details to be confirmed","Six merchandise colours plus the original natural cream"],
    colours: [{"name":"Mustard yellow","hex":"#c79b27","image":"/images/shop/tote-mustard-photo.png"},{"name":"Natural cream","hex":"#e9dfc8","image":"/images/shop/tote-preview.png"},{"name":"Forest green","hex":"#063c2d","image":"/images/shop/tote-green-photo.png"},{"name":"Pink","hex":"#df9cad","image":"/images/shop/tote-pink-photo.png"},{"name":"Black","hex":"#222522","image":"/images/shop/tote-black-preview.png"},{"name":"White","hex":"#fafafa","image":"/images/shop/tote-white-photo.png"},{"name":"Beige","hex":"#d9c5a4","image":"/images/shop/tote-beige-photo.png"}],
    options: ["Standard"], priceNGN: null, status: "preview",
  },{"slug": "signature-hoodie", "name": "The EBA Hoodie", "category": "Apparel", "description": "An EBA layer for everyday comfort, in our six merchandise colours.", "image": "/images/shop/hoodie-green-photo.png", "tone": "sage", "details": ["EBA-branded hoodie concept", "Fabric, fit and final specifications to be confirmed"], "colours": [{"name": "Forest green", "hex": "#063c2d", "image": "/images/shop/hoodie-green-photo.png"}, {"name": "Pink", "hex": "#df9cad", "image": "/images/shop/hoodie-pink-photo.png"}, {"name": "Black", "hex": "#222522", "image": "/images/shop/hoodie-black-photo.png"}, {"name": "White", "hex": "#fafafa", "image": "/images/shop/hoodie-white-photo.png"}, {"name": "Beige", "hex": "#d9c5a4", "image": "/images/shop/hoodie-beige-photo.png"}, {"name": "Mustard yellow", "hex": "#c79b27", "image": "/images/shop/hoodie-mustard-photo.png"}], "options": ["Size to discuss", "S", "M", "L", "XL", "XXL"], "priceNGN": null, "status": "preview"},
{"slug": "stanley-cup", "name": "The Stanley Cup", "category": "Drinkware", "description": "A handled cup with a straw for your everyday routine. Ask EBA about the final model and available colours.", "image": "/images/shop/stanley-green-photo.png", "tone": "sand", "details": ["Handled-tumbler concept; final Stanley model and branding to be confirmed", "Capacity, care instructions and colour availability to be confirmed"], "colours": [{"name": "Forest green", "hex": "#063c2d", "image": "/images/shop/stanley-green-photo.png"}, {"name": "Pink", "hex": "#df9cad", "image": "/images/shop/stanley-pink-photo.png"}, {"name": "Black", "hex": "#222522", "image": "/images/shop/stanley-black-photo.png"}, {"name": "White", "hex": "#fafafa", "image": "/images/shop/stanley-white-photo.png"}, {"name": "Beige", "hex": "#d9c5a4", "image": "/images/shop/stanley-beige-photo.png"}, {"name": "Mustard yellow", "hex": "#c79b27", "image": "/images/shop/stanley-mustard-photo.png"}], "options": ["Standard"], "priceNGN": null, "status": "preview"},
{"slug": "adire-fabric", "name": "EBA Adire Fabric", "category": "Fabrics", "description": "Buy the fabric and sew it your way. Make your own outfit with Adire from the EBA collection.", "image": "/images/shop/adire-green-photo.png", "tone": "cream", "details": ["Fabric for you to buy and sew; not a finished garment", "Adire pattern concept; final Adire designs to be confirmed", "Tell the team your required length in your enquiry; price per yard or metre to be confirmed"], "colours": [{"name": "Forest green", "hex": "#063c2d", "image": "/images/shop/adire-green-photo.png"}, {"name": "Pink", "hex": "#df9cad", "image": "/images/shop/adire-pink-photo.png"}, {"name": "Black", "hex": "#222522", "image": "/images/shop/adire-black-photo.png"}, {"name": "White", "hex": "#fafafa", "image": "/images/shop/adire-white-photo.png"}, {"name": "Beige", "hex": "#d9c5a4", "image": "/images/shop/adire-beige-photo.png"}, {"name": "Mustard yellow", "hex": "#c79b27", "image": "/images/shop/adire-mustard-photo.png"}], "options": ["Standard"], "priceNGN": null, "status": "preview"},
{"slug": "signature-gym-tote", "name": "The EBA Signature Bag", "category": "Accessories", "description": "Our signature tote has a gym-bag style. A roomy carryall for workouts, weekends and everyday essentials.", "image": "/images/shop/signature-bag-photo.png", "tone": "olive", "details": ["Photorealistic concept preview; final EBA design to be confirmed", "Gym-style signature tote, alongside the alternative Everyday Tote", "Final colours, material and dimensions to be confirmed"], "colours": [{"name":"Forest green","hex":"#063c2d","image":"/images/shop/signature-bag-photo.png"},{"name":"Pink","hex":"#df9cad","image":"/images/shop/gym-pink-photo.png"},{"name":"Black","hex":"#222522","image":"/images/shop/gym-black-photo.png"},{"name":"White","hex":"#fafafa","image":"/images/shop/gym-white-photo.png"},{"name":"Beige","hex":"#d9c5a4","image":"/images/shop/gym-beige-photo.png"},{"name":"Mustard yellow","hex":"#c79b27","image":"/images/shop/gym-mustard-photo.png"}], "options": ["Standard"], "priceNGN": null, "status": "preview"},

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

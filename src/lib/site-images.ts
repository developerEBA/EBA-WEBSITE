import images from "./image-manifest.json";

// Change an asset's src in image-manifest.json to replace its photo everywhere it appears.
// The presentation frame stays the same, even when the replacement has different dimensions.
export function getSourceImage(source: "home" | "about" | "founder", x: number, y: number) {
  const asset = images.find(image => image.source === source && image.x === x && image.y === y);
  if (!asset) throw new Error(`No image is configured for ${source}:${x},${y}`);
  return asset;
}

// Leave a value null to keep the requested placeholder. Set it to /images/your-photo.jpg later.
export const teamPortraits: Record<string, string | null> = {
  Eniola: "/images/founder-portrait.png",
  Gbotemi: null,
  Oluwatosin: "/images/team/tosin.png",
  Damian: null,
  Perfect: null,
};

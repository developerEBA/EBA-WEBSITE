// Lossless extraction of the photos already supplied in the design references.
// Run only to restore the initial assets: this intentionally never overwrites replacements.
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sources = {
 home: { file: "design-reference.png", width: 351 },
 about: { file: "about-reference.png", width: 484 },
 founder: { file: "founder-reference.png", width: 458 },
};
const crops = [
 ["home-about-collage", "home", 175, 255, 161, 124],
 ["sector-impact", "home", 23, 774, 141, 53],
 ["sector-media", "home", 184, 774, 140, 53],
 ["sector-corporate", "home", 23, 869, 141, 54],
 ["sector-culture", "home", 184, 869, 140, 54],
 ["home-founder", "home", 26, 1386, 113, 176],
 ["testimonial-portrait-1", "home", 171.1, 1677.7, 25, 25],
 ["testimonial-portrait-2", "home", 279.7, 1682.8, 18.6, 18.6],
 ["testimonial-portrait-3", "home", 73.2, 1684.5, 18.6, 18.6],
 ["story-hero", "about", 239, 49, 208, 235],
 ["story-origin-collage", "about", 28, 326, 220, 194],
 ["work-event-amplification", "about", 28, 1270, 134, 114],
 ["work-media-relations", "about", 168, 1242, 81, 142],
 ["work-brand-strategy", "about", 254, 1290, 94, 94],
 ["work-content-production", "about", 353, 1317, 67, 67],
 ["work-pr", "about", 426, 1270, 40, 114],
 ["story-contact-event", "about", 255, 1608, 188, 175],
 ["founder-hero", "founder", 243, 50, 173, 241],
 ["founder-portrait", "founder", 31, 364, 140, 217],
 // Save the additional individual photos too, while keeping the requested team placeholders.
 ["about-brand-sign", "home", 176, 267, 79, 86],
 ["about-event-notebook", "home", 257, 299, 78, 78],
 ["story-strategy-meeting", "about", 28, 326, 187, 194],
 ["story-production-detail", "about", 162, 408, 85, 65],
 ["team-reference-founder", "about", 28, 683, 128, 237],
 ["team-reference-gbotemi", "about", 175, 692, 129, 90],
 ["team-reference-oluwatosin", "about", 330, 692, 128, 90],
 ["team-reference-damian", "about", 175, 833, 129, 90],
 ["team-reference-perfect", "about", 330, 833, 128, 90],
];
async function main() {
 const metadata = {};
 for (const [key, source] of Object.entries(sources)) metadata[key] = await sharp(path.join(root, "public/images", source.file)).metadata();
 const manifest = [];
 for (const [name, source, x, y, w, h] of crops) {
  const info = metadata[source];
  const left = Math.round(x / sources[source].width * info.width);
  const top = Math.round(y / 2048 * info.height);
  const width = Math.min(Math.round(w / sources[source].width * info.width), info.width - left);
  const height = Math.min(Math.round(h / 2048 * info.height), info.height - top);
  const destination = path.join(root, "public/images", `${name}.png`);
  try { await fs.access(destination); }
  catch { await sharp(path.join(root, "public/images", sources[source].file)).extract({ left, top, width, height }).png().toFile(destination); }
  manifest.push({ name, source, x, y, src: `/images/${name}.png`, width, height });
 }
 await fs.writeFile(path.join(root, "src/lib/image-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
 console.log(`Saved ${manifest.length} individually replaceable image assets.`);
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });


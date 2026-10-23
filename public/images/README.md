# Website images

The photos from the supplied reference designs are saved here as 28 individual PNG files. The original full-page references are kept too. The extracted photos retain the detail available in the screenshots; original camera files can replace them later.

## Replace a photo

1. Put a new photo in this folder, for example `story-hero-v2.jpg`.
2. In `src/lib/image-manifest.json`, find the relevant `name` and change its `src` to `/images/story-hero-v2.jpg`.
3. Keep the existing name, source, x and y values. These identify the image slot. The replacement fits into the same layout automatically.

A new filename avoids stale browser/image-optimizer caches. No page layout code needs to change.

## Main image slots

| Area | Image name |
| --- | --- |
| Home About | `home-about-collage` |
| Sectors | `sector-impact`, `sector-media`, `sector-corporate`, `sector-culture` |
| Home founder | `home-founder` |
| Testimonials | `testimonial-portrait-1` through `testimonial-portrait-3` |
| Our Story hero | `story-hero` |
| Our Story collage | `story-origin-collage` |
| Work gallery | `work-event-amplification`, `work-media-relations`, `work-brand-strategy`, `work-content-production`, `work-pr` |
| Our Story contact | `story-contact-event` |
| Founder page | `founder-hero`, `founder-portrait` |

Additional collage photos and team reference portraits are also saved here. Team cards intentionally remain placeholders. To add team photos, change the null values in `teamPortraits` in `src/lib/site-images.ts` to `/images/your-photo.jpg`.

The hero video remains at `public/videos/hero.mp4`. The extraction script is a restoration utility for the initial assets, not the normal replacement workflow.

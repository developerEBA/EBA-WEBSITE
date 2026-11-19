# Africa map boundaries

Country outlines are derived from https://github.com/johan/world.geo.json/blob/master/countries.geo.json. The homepage uses an Africa-only subset rendered as interactive SVG paths.

# Image assets

## The Red Room / NAC 2026

Seven photographs supplied by the user on November 19, 2026 are resized without cropping (maximum 1920px) and saved as WebP in `public/images/red-room/`:

| Supplied file | Website asset |
| --- | --- |
| IMG_0182.JPG | welcome.webp |
| IMG_9733.jpg | guests.webp |
| IMG_9725.jpg | chill-zone.webp |
| IMG_0151.JPG | production.webp |
| IMG_0270.JPG | conversations.webp |
| IMG_0651.JPG | panel.webp |
| IMG_0655.JPG | audience.webp |

The shared journal entry displays these as a carousel for stories mentioning Red Room, Redroom or Red-Room. Photos fill the display frame using cover crops and crossfade automatically. All seven also appear in the Events “From the room / The moments in between” slideshow; the Events hero opens with the Red Room welcome photograph. Captions distinguish the Red Room lounge from the wider NAC stage and audience. Originals on the Desktop are unchanged.

## Impact & Development

- `public/images/impact/community-volunteers.jpg`: Julia M Cameron, Pexels, https://www.pexels.com/photo/young-men-and-women-having-fun-while-volunteering-with-sorting-clothing-6995090/
- `public/images/impact/volunteer-portrait.jpg`: Ron Lach, Pexels, https://www.pexels.com/photo/a-cheerful-volunteer-9543744/
- Downloaded November 4, 2026 from images.pexels.com under the Pexels free-use license. These are illustrative stock photographs, not documentation of either named client campaign; the page captions make that distinction explicit.
- The Play With Stephen card uses the existing EBA event archive asset at `public/images/events/swing-for-autism/moment-1.webp`; it is captioned as archive imagery, not as an Autism Hero Spotlight portrait.
- Publication review: confirm client permissions for Omodaadaa Foundation / International Women’s Day and Play With Stephen 2026 / Autism Hero Spotlight before publishing this draft. Replace the illustrative Women’s Day photograph with approved event photos/video when supplied. No video or campaign results have been invented.

The user-supplied design-reference.png, about-reference.png and founder-reference.png are retained as source references. The 28 individual photo assets extracted from them are saved in public/images and loaded with Next.js Image. File paths are configured in image-manifest.json. See public/images/README.md for replacement instructions.

Team cards remain intentional placeholders until teamPortraits in site-images.ts is populated. Testimonial copy is the sample copy from the reference. FAQ answers in faq-data.ts are draft copy for review.

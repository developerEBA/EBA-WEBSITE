# Africa map boundaries

Country outlines are derived from https://github.com/johan/world.geo.json/blob/master/countries.geo.json. The homepage uses an Africa-only subset rendered as interactive SVG paths.

# Image assets

## Lounge Network and EBA team — supplied 19 November 2026

Five Lounge Network / Business Shower photographs and one EBA team photograph supplied by the user are optimized under `public/images/events/lounge/`: conversation, speaker, portrait, guests, backdrop and eba-team (all WebP). Source files, respectively: `222f6a589f5c0ab14c6b7c83fb30fde7-large.jpg`, `bdd20b4b8d5ae682d4e46c2559c432df-large.jpg`, `87c91e9330eef7c90d03ac96fdb758ea-large.jpg`, `2bfafde8bbbf4a561038a36ba16dd8c4-large.jpg`, `72f93ddb25642bf1500d93dff17614d5-cover.jpg` and `IMG_9840.jpg`. The supplied `IMG_9840 (1).jpg` depicts the same team photograph and is not duplicated in the gallery.

All six appear in the automatic Events gallery. Homepage sector overrides in `homeSectorVisuals` use the EBA team for Corporate & Professional, the lounge discussion for Culture & Creative Industries, and the existing illustrative community-cleanup photograph for Impact & Development. Sector detail-page photography is controlled separately.

## Removed Falz photographs

At the user’s request, Falz gallery moment-1, moment-3, moment-4 and moment-6 were removed because they feature the turquoise patterned outfits shown in the supplied reference. Their assets and placements in the event gallery, slideshows, sector pages and case-study cards were removed or replaced with the remaining arrival photograph. The event poster and the two unrelated gallery images remain.

## Play With Stephen — supplied photographs, 19 November 2026

Eight user-supplied Downloads images are optimized as WebP under `public/images/events/play-with-stephen/`, with originals preserved:

| Supplied file | Website asset |
| --- | --- |
| PWS-25-29-iNDq0F0t-1.jpeg | tee-shot.webp |
| IMG_9022-scaled.jpg | practice.webp |
| IMG_8545-scaled.jpg | eba-team.webp |
| PWS-25-321-Cs3Qb3FU-1.jpeg | on-course.webp |
| PWS-25-36-CagJFcom-1.jpeg | golf-swing.webp |
| IMG_8562-B-30evfm-scaled.jpg | community.webp |
| IMG_8416-scaled.jpg | conversations.webp |
| IMG_8910-scaled.jpg | indoor-swing.webp |

Shared photo data is in `play-with-stephen-photos.ts`. These refresh the Swing for Autism event gallery, selected case-study visuals, listing cards and the Events feature. All eight also appear in the Events “From the room / The moments in between” slideshow, which now slides horizontally one picture at a time and loops automatically. The Red Room story retains its crossfade style. Captions describe the supplied scenes without assigning an unverified year or identifying a photographed participant as the campaign champion.

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

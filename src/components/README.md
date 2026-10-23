# Reusable website components

Import components directly from their files. Keep event text and artwork in `src/lib/event-content.ts`; do not duplicate event records inside pages.

## Shared UI

- `shared/action-link.tsx`: `ActionLink` renders the existing pill CTA. Supports `href`, `variant="green" | "yellow" | "outline-light"`, `showArrow`, `arrowSize`, and normal Next Link props. Used on the homepage, About and Event pages, and footer. Use it for navigation; use a real button for actions and form submissions.
- `shared/brand-logo.tsx`: `BrandLogo` renders the same accessible home link in the header and footer; supports normal Link props such as the header's menu-close callback.
- `shared/section-heading.tsx`: `SectionHeading` renders an optional eyebrow and an `h1`, `h2` (default), or `h3` without adding a layout wrapper. Pass `eyebrowClassName` when a page uses a different existing eyebrow style.
- `shared/photo.tsx`: `Photo` fills a positioned image frame. Its class controls the aspect ratio; pass `sizes` for the actual column width and meaningful `alt` text.
- `shared/pagination.tsx`: controlled `Pagination` accepts `page`, `totalPages`, `onPageChange`, and a descriptive `label`. The parent owns the collection, current page, announcements, and focus/scroll behavior.
- `shared/motion.tsx`: lightweight `Entrance` and `Reveal` animations. Import these directly on non-home pages to avoid pulling in homepage-specific map and testimonial code.

```tsx
<ActionLink href="/events/all" variant="yellow">All Events</ActionLink>
<SectionHeading eyebrow="OUR WORK">Ideas brought to life.</SectionHeading>
<Pagination page={page} totalPages={3} onPageChange={setPage}/>
```

## Events

- `events/event-card.tsx`: `EventCard` accepts an `EventStory`, animation `index`, and `variant="collection" | "related"`. The entire card links to its event page.
- `event-listing.tsx`: composes cards and pagination, showing three or six records per page.
- `event-hero.tsx`: shared photographic slideshow for the Event and All Events pages.

## Existing shared sections

- `portfolio-map.tsx`: selecting Nigeria reveals the four supplied client portraits and quotes. Portrait links open the corresponding testimonial on `/services`. Other countries show a message until client mappings are confirmed.
- `newsletter.tsx`: now renders the unified contact/newsletter section once from `footer.tsx`, with conversation and signup actions. `PageNewsletter` is retained as a no-output compatibility export so existing page templates do not duplicate it.
- `src/lib/services.ts`: six dedicated service-page records used by the compact homepage grid and `/services/[slug]` template. Update the record to change a service's content across both surfaces.

- `site-header.tsx` and `footer.tsx`: global navigation and footer, rendered once by the root layout.
- `about-shared.tsx`: `PageNewsletter`, `ContactButton`, `AtlasImage`, and `TeamPlaceholder` for the About pages and other page templates.
- `newsletter.tsx`: reusable validated newsletter form, independent of homepage interactions.
- `home-interactions.tsx`: homepage counters, testimonials, video, and map. Keeps compatibility exports for the shared animations and newsletter.
- `ui/`: existing shadcn primitives for forms, dialogs, accordions, and other controls.

Presentational shared components work from server pages and client components. Only components using state, browser events, or Motion need a client boundary. Reuse the existing CSS classes so typography, spacing, animations, hover and focus states remain consistent.

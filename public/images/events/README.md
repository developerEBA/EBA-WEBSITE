# Event page media

The six supplied WebP photos are saved here with stable descriptive filenames. The hero carousel uses `eventHeroPhotos` in `src/lib/event-content.ts`. Change its `src`, `alt` or `position` values to replace or reframe any photo; adding entries adds slides automatically.

The two PNG gallery photos were extracted from the supplied Event page reference. They can be replaced with higher-resolution originals later. The original reference is retained as `design-reference.png`.

## Event cards

The supplied WebP photos are for the hero carousel. They have not been presented as the dedicated covers of individual event projects.

Event cards are configured in `eventStories` in `src/lib/event-content.ts`. Set each record's `image` to `/images/events/event-cover.jpg` when its picture is supplied. The first three titles and dates follow the supplied design reference. The remaining six records are clearly marked coming-soon placeholders for pagination, not claims of completed work.

Add or remove records as needed; page numbers and the final page update automatically. Each page displays three cards.

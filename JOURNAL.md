# EBA Journal

One Stories section has three channels: `/stories/press-releases`, `/stories/articles`, and `/stories/series`. Existing `/stories/[slug]` URLs redirect to their matching channel. Existing post text and photographs remain in `src/lib/stories/posts.json` with their original categories.

Articles and releases use distinct presentation templates. Verified article authors, issuing organisations and release media contacts can be added to the corresponding typed records; no client attribution is invented.

Approved episodic content belongs in `src/lib/stories/series.json`. It is intentionally empty until EBA supplies approved series. The validated structure in `src/lib/story-series.ts` supports series metadata, publication status/date, unique episode slugs/numbers, authors, covers and episode body blocks. Draft, in-review, archived and future content is excluded from public navigation. A published parent is required for public episodes.

Series pages provide ordered episodes, start/continue links and previous/next episode navigation. Progress is saved only in the visitor's browser; it does not sync between devices. Reader logic and publication rules are tested with private test fixtures, not example public stories.

Content is currently managed in source files, not a connected CMS. Publication filtering happens during the static build. Scheduled publication requires a rebuild at the release time (or a future CMS integration with revalidation). Adding newly published series or episodes also requires rebuilding. The model can map to one CMS with separate article, press-release, series and episode collections later.

Run `node --loader ./scripts/typescript-loader.mjs --test scripts/journal-check.mjs` for content, publication and navigation checks.

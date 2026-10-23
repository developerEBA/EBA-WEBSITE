# EBA Stories

Imported 16 published posts from https://enibrand.com/blog/ and its public WordPress API. Article wording, publication dates and source categories are retained. Featured images are stored locally as optimised WebP assets. Inline article links are preserved; migrated story links point to local pages.

The two anniversary posts are separate entries on the source site and have both been retained.

Import script: scripts/import-stories.mjs. It reads source-posts.json fetched from https://enibrand.com/wp-json/wp/v2/posts?per_page=100&_embed=1. Only structured paragraph, heading, list and inline text/link data is emitted; source HTML is never executed.

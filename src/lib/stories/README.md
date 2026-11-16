# EBA Stories

Imported 16 published posts from https://enibrand.com/blog/ and its public WordPress API. Article wording, publication dates and source categories are retained. Featured images are stored locally as optimised WebP assets. Inline article links are preserved; migrated story links point to local pages.

The two anniversary posts are separate entries on the source site and have both been retained.

Import script: scripts/import-stories.mjs. It reads source-posts.json fetched from https://enibrand.com/wp-json/wp/v2/posts?per_page=100&_embed=1. Only structured paragraph, heading, list and inline text/link data is emitted; source HTML is never executed.

## Editorial additions — 16 November 2026

`newsroom-additions.json` adds eighteen source-attributed press summaries. The two supplied LinkedIn posts and their journal images were removed at the client’s request on 16 November 2026.

`editorial-updates.json` applies reviewed category, publication date, client and source-link metadata to matching existing stories without changing the original imported bodies. The repeated BusinessDay tournament row is represented once. Original imported anniversary entries remain available. Articles moved to Press Releases redirect from their previous article URLs.

Verified date differences: Wedding Police — 5 October 2026; Lounge Network breakfast show — 22 July 2026; Eniola creative-industry profile — 8 November 2026; Seven Editions — 6 November 2026. ATQ News supplies the missing date, 24 August 2026. The Innovation Summit story uses Tribune’s 4 October date rather than the later migration date.

New online photography is stored as local WebP assets. Sources: `eniola-creative-structure.webp` — THISDAY’s linked profile (Screenshot_20261108-202258.jpg); `pws-seven-editions.webp` — THISDAY’s linked retrospective (c7cc96e7-d42c-42ba-8484-2f1751f2ee6f.jpg); `pws-masterclass.webp` — THISDAY’s linked masterclass announcement (Screenshot_20260219-093853.jpg); `choir-guilty-as-charged.webp` — The Nation’s linked performance report (Bovis-‘Guilty-as-Charged.jpeg). Existing relevant Bovi photography is reused for the comedy-tour reports.

## Extended press tracker — 16 November 2026

Nine additional releases were verified against their publishers and added with short attributed summaries, source links, and locally optimized publisher cover images. `press-register.json` reconciles all 30 unique links in the updated tracker; the repeated BusinessDay tournament link is included once. Existing matching releases are reused. The three Bovi reports previously labelled Talentville now identify Bovi as the tracker client.

Every House Remembers uses the publisher’s 12 November 2026 publication date rather than the tracker’s 16 November. Ann Obaseki’s NAC report is dated 16 November and appears first. PUNCH’s finale metadata is 30 October at 23:09 UTC, equivalent to its displayed publication date of 31 October in Nigeria. Vanguard’s choir-identity and LAIF dates likewise follow their displayed Nigerian dates. No EBA authorship role is assigned to the three tracker rows where that field was empty.

The nine new covers use their respective article’s `og:image`; filenames: bovi-behind-punchlines, bovi-world-tour-finale, lagos-golfers-swagc, bovi-comedy-therapy, loud-choir-making, loud-choir-identity, laif-creative-industry, every-house-remembers, ann-obaseki-nac (all WebP under public/images/stories).

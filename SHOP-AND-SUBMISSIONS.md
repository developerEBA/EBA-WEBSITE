# EBA shop and editorial submissions

The shop is available at `/shop`, with a direct highlighted **Shop** link in the main navigation, a homepage feature and a footer link. Product detail pages offer colour previews; shirt size preferences and colours remain separate in the browser-local enquiry bag. Prices are `null` in `src/lib/shop.ts` and display “Price to be confirmed”. Replace each `priceNGN` with an approved NGN amount when supplied. Payment checkout remains closed; no stock, order or payment is confirmed by using the bag. The bag can prepare an email enquiry to `hello@enibrand.com`.

## Submissions and review

`/stories/submit` now has **Submit an Article** and **Submit a Campaign Entry** buttons at the top. Each switches the form beneath it, preserving the other form’s entered fields. The website validates entries on both client and server, then writes a private JSON record and returns a random reference only after the write succeeds. All records remain `in-review`; nothing is automatically published.

Private review is available at `/editorial/submissions`. It requires a server-only review key on every data request; no private records are embedded in public page HTML. The review API rejects unauthenticated requests. The review page displays the latest 100 entries for reading only; it does not approve or publish them. Access exists only while that page remains open; closing it clears the displayed records. Reviewers must keep the key private and use HTTPS outside localhost.

A strong local access key was generated without printing it. It is stored in `.eba-private/review-access-key.txt` and configured in the ignored `.env.local` as `EBA_EDITORIAL_REVIEW_KEY`. Open that local key file only for authorised EBA reviewers. No secret is included in tracked source. On a new environment, `node scripts/setup-editorial-review.mjs` provisions a new local key if none exists. Do not publish or email the key, and do not reuse this preview key for a public deployment.

### Hosting configuration

- `EBA_EDITORIAL_REVIEW_KEY`: server-only, random access key of at least 24 characters. Set independently on the production host and share only with authorised reviewers through a secure channel.
- `EBA_SUBMISSIONS_DIR`: optional dedicated private writable directory. Default: `.eba-private/submissions` under the Node app working directory. The default is appropriate for local preview and a single Node server with persistent disk; it is **not** durable storage on a stateless/serverless host. Configure a persistent private directory and backups before public launch. Paths in `public/`, `src/`, `.next/`, dependency or Git/configuration directories are rejected.

The form uses signed, expiring form tokens, an empty honeypot field, bounded request sizes, per-email limits and a process-wide quota. Rate limits are per Node process and reset on restart; use a shared limiter and stronger bot controls if deploying across workers/instances or at higher public traffic. The current review key grants read-only editorial access, not individual user accounts or audited roles; use an identity provider for a larger editorial team.

Files are created outside public assets with restrictive POSIX modes where supported. On Windows, private folders inherit the operating account’s ACLs; restrict the directory to the app account and authorised administrators. Do not include `.eba-private/` in deploy/source archives or expose it through a web-server alias. Configure retention, backups, disk monitoring and team review procedures before launch. A write failure produces an error rather than a false submission confirmation.

Supporting materials are accepted as HTTPS links. Direct file uploads are intentionally not accepted, avoiding an unscanned public upload surface. No external emails are automatically sent; the team reviews entries in the private review area.

No EBA Workspace/Hub repository, database or authentication system was accessed. No database, payment provider, hosting migration or production deployment was introduced.

## Checks

- `node scripts/shop-check.mjs` — bag parsing, malformed input, bounded quantities, separate size/colour choices, enquiry addressing and absent prices/stock.
- `node --loader ./scripts/typescript-loader.mjs scripts/submission-check.mjs` — both entry schemas, unsafe inputs, signed token checks, private durable writes, API rejection cases, successful receipt, review access restrictions and invalid storage configuration. Uses disposable private test records and removes only those test records afterward.
- `npm run lint`, `npx tsc --noEmit`, `npm run build`.

## Generated concept assets

Generated using the built-in image-generation tool, not external stock photos. All project assets are copied into `public/images/shop/` and labelled as collection previews. Existing approved website photos are unchanged.

Files: `collection-preview.png`, `bottle-preview.png`, `bottle-black-preview.png`, `cup-preview.png`, `cup-green-preview.png`, `shirt-preview.png`, `shirt-cream-preview.png`, `tote-preview.png`, `tote-black-preview.png`.

Prompt set: premium EBA ecommerce product mockups with exact lowercase `eba.` wordmarks and yellow dots, forest green/cream identity, tactile materials, neutral studio backgrounds and soft sunlight; no prices, slogans, people or watermarks. The collection hero combines a bottle, cup, folded shirt and tote. Individual product prompts isolate each piece from the hero design reference. Colour variant prompts preserve product shape, composition, lighting, neutral background and wordmark placement, changing only: bottle body to matte black, cup to forest green, shirt to warm cream, tote to black, with contrasting EBA wordmarks. These are illustrative design concepts; final production specifications, colours, inventory and prices need EBA approval.

## Verification completed

- Production build and TypeScript: passed, 67 generated pages; no filesystem tracing warnings after runtime-only storage exclusions were added.
- Lint: checked the new and modified components, API routes, schemas and scripts.
- Automated checks: 19 passing (11 merchandise/bag/price/asset checks and 8 submission/storage/review checks).
- Browser: direct navbar Shop navigation; Article/Campaign tab switching with preserved input; successful private article and campaign receipts; colour image switching; shirt colour/size retained in bag; quantity adjustment and removal.
- Live API/storage: both browser test entries were found through authorised review; incorrect keys returned 401, public GET review returned 405, and direct private-file requests returned 404. Disposable browser test records were removed afterward.
- Deployment tracing: checked 28 server trace files; private files and `.env` files were absent. The local review access key was absent from compiled server JavaScript.
- Production publishing has not been performed. Configure production private storage, review credentials, backups and retention on the actual hosting plan before enabling submissions publicly. Prices and payment checkout remain pending EBA input.

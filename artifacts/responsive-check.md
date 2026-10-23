# Responsive verification — 23 October 2026

Browser: Chromium preview at localhost:3000.

Tested widths: 320, 390, 768, 1024 and 1440 CSS pixels.

- At 320px: checked Case Studies, Our Story, Founder, FAQ, Services, Events, All Events, Consultation, Get in Touch, Stories and a case-study detail. Fixed the shared navbar menu position and FAQ animation overflow.
- At 390px: checked the homepage, all seven event-detail layouts, a service detail, a sector detail and a work gallery. The document width matches the available viewport width.
- At 768px: checked Home, Case Studies, Our Story, FAQ, Services and Events; visually reviewed the Case Studies hero and filter layout.
- At 1024px: checked Home, Case Studies, Founder, FAQ, Services, Events, Consultation, Get in Touch and Stories. Shared header contents fit its width.
- At 1440px: checked Home, Case Studies, Our Story, FAQ, Services, Events, Consultation, Get in Touch and Stories. Document widths match the available viewport width.
- Small-phone navigation opens and closes; the About dropdown exposes its links.
- FAQ mobile topic anchors account for the sticky topic selector. Newsletter fields use 16px text on phones to avoid focus zoom in iOS browsers.
- TypeScript check: `npx tsc --noEmit` passed.

These are browser viewport checks, not a physical-device or Safari compatibility certification. Form email delivery is outside the scope of this responsive pass.

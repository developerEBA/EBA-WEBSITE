# Client portfolio

The EBA-supplied list is managed in `src/lib/client-portfolio.ts`. Relationships are supplied by EBA; the external sites were used only to identify authentic logo assets. Personal names were explicitly confirmed in the chat. No campaigns, results, biographies or client quotations have been invented for this list.

Portfolio categories: Companies, Events, Foundations, Personal Brands and Podcasts. PWS appears in both Companies and Events because it was supplied under both headings. Missing logos are presented as plain client names, not invented brand marks. Add verified files to the `logo` field when supplied.

Logo sources checked 27 October 2026:

- Afriex: https://www.afriex.com/ — https://cdn.prod.website-files.com/62ce94ab2b9c3a3597a7acd4/62d519fe1b69726dbb0866e4_Afriex%20Logo.svg
- Dinku Transnational: https://www.dinku.me/ — https://www.dinku.me/wp-content/uploads/2023/02/Dinku-Transnational-Logo.png
- Hoardings Africa: https://hoardingsafrica.com/ — https://hoardingsafrica.com/images/HOADINS_REDHOOK.svg
- Official Loud Urban Choir: https://loudurbanchoir.com/ — https://loudurbanchoir.com/assets/img/logo-white.png
- MacMannie Group: https://www.macmannie.com/ — header logo https://static.wixstatic.com/media/9dda8b_bacb7ed7b0de4dad9aab0acbb6ff2e4a~mv2.png
- Hostessng: EBA media library https://enibrand.com/wp-content/uploads/2026/09/05-hostessng-black.png
- PWS: EBA media library https://enibrand.com/wp-content/uploads/2026/09/08-play-with-stephen-black.png
- Kitchen 86: EBA media library https://enibrand.com/wp-content/uploads/2026/09/Copy-of-Kitchen86.jpg
- mediaReach OMD: previously sourced EBA artwork; see `CASE-STUDY-SOURCES.md`.

Still shown by name pending an identifiable, suitable logo: Popcentral Television, Wedding TV Channel, Play Central, Maison86, Lounge Network, Ojavendor, Signal, communiTEEbyeba, Omodaadaa Foundation, EBA Foundation and It’s a Wrap. No Lounge FM logo has been substituted for the wider Lounge Network. Ambiguous generic names have not been assigned an unrelated online logo.

Event filters use subject categories (Community, Culture, Sport) alongside a separate partnership flag. Partnerships is a view of collaborations, not an ownership claim or a subject category. Supported PWS events and the Falz collaboration appear there as well as their subject filters. The communiTEEbyeba Independence Edition returns to Culture.

Validation: `node --loader ./scripts/typescript-loader.mjs scripts/portfolio-check.mjs`.

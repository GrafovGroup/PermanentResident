# PermanentResident.ca

Bilingual immigration information and professional-referral enquiry platform, published privately with OpenAI Sites.

## Operation

- `/en` and `/fr` serve 162 topic, province, city, policy and tool pages.
- `/admin` is restricted server-side to the authenticated ChatGPT email configured in the secret `OWNER_EMAIL`.
- Enquiries and consent audit history persist in the Site's own D1 database.
- Owner review, qualification, partner verification, manual assignment, actual acceptance tracking, consent withdrawal and personal-data deletion are available.
- Assignment is a record only: it does not send emails or transmit details to a partner. No billing is configured.
- Professional profiles are empty until the owner creates verified, active records. Public resources link to official regulators; no practitioners are invented.

## Content

Sources reviewed 2026-09-19. Program and local source URLs live beside content in `lib/content.ts`, `lib/site.ts`, `lib/places.ts` and `lib/cities.ts`. Québec PEQ temporary reopening is documented with current MIFI sources. Recheck changing program intake before editing.

Nine original AI-generated editorial photographs depict illustrative Canadian arrival, skilled work, family reunification, PR travel planning, citizenship, consultation and daily life; they are not actual clients or staff. Images are optimized into 600px and 1200px WebP variants, with bilingual alt text and lazy loading below the fold. Relevant guides and social previews share the matching editorial image. The red-and-white visual identity uses a public-domain Canadian flag SVG from https://commons.wikimedia.org/wiki/File:Flag_of_Canada.svg and a decorative maple leaf derived from its geometry.

## Tools

The Pathway Finder is an exploratory rules-based routing aid, not an eligibility decision. It does not calculate CRS or assess inadmissibility. Optional inclusion of answers in a lead requires explicit selection.

The PR Residency Calculator counts physical presence only, excluding the assessment date and full days abroad. Leap years and a rolling five-calendar-year window are accounted for. The first-five-year projection and February 29 convention are disclosed. It does not calculate overseas credit or citizenship eligibility.

Checklist progress is device-local. Calculator inputs are tab-local. Lead data is server-backed.

## Development

Use Node >=22.13 and the Sites build workflow. `npm run dev`, `npm run build`, `npm run db:generate`. See `.openai/hosting.json` for the single Site ID and logical DB binding. Never reuse another project's Site ID or database.

Local test owner uses the bundled portable sign-in simulation (`seedy@sites.test`) through ignored `.env`; production OWNER_EMAIL is configured separately in Sites. Never publish local auth settings.

## City coverage

25 bilingual city guides cover all 13 provinces and territories. Each includes a local primary source, a local planning paragraph, a three-item checklist, provincial context and related PR tools. `lib/cities.ts` contains the source-backed resource summaries and original planning suggestions. `components/site/city-guide.tsx` renders the directory and guides. Do not imply municipal PR programs, local offices or partnerships from city coverage. Every province links to its city guides; city breadcrumbs and related links lead back to the directory and province.

## Search and sharing metadata

`lib/seo.ts` is the shared public-route inventory and source for search titles, descriptions, language alternates, breadcrumbs and JSON-LD. Guides identify the platform as their publisher, link official sources, and expose section navigation and relevant tools. Do not add invented expert credentials, ratings or local offices to structured data. Review dates describe actual editorial review, not the current deployment date.

Run `python3 scripts/check-seo.py` against the local development server, or pass a local server origin as the first argument. It checks all 162 pages, internal links, server-rendered language, metadata, schema, query canonicals, 404 responses and admin noindex.

When the custom domain is connected, change `origin` in `lib/site.ts` to the verified production origin and redirect the old host where supported. Then verify the domain in Google Search Console, submit `/sitemap.xml`, inspect representative English and French URLs, and monitor indexing and Core Web Vitals. The current private audience prevents public crawling. Search Console verification and public access have not been configured.

## Publication state

Published Site audience remains owner-private. The custom domain requires ownership/DNS setup and a deliberate audience choice before public acquisition. No DNS records have been created. Validated client and professional-interest enquiries are saved to D1, then forwarded server-side to https://formspree.io/f/xdekakne. Formspree controls notification recipients and delivery settings. The React form retains its existing AJAX submission flow so consent, abuse protection, reference receipts and owner review are preserved. No additional client SDK is needed. Delivery has a 10-second timeout and is recorded as formspree_sent or formspree_failed in the enquiry audit. A failure preserves the enquiry and shows a saved-but-notification-unconfirmed notice. Duplicate request IDs do not resend notifications. There are no automatic retries: owners must monitor the dashboard and follow up on failed or absent delivery audit entries, especially after outages. Formspree acceptance does not prove inbox delivery. Privacy deletion must also cover Formspree records and notification mailboxes.

Privacy requests and the 24-month closed-record retention review are manual owner workflows. Do not activate or assign professionals until their current authorization, scope, location/language coverage and commercial terms have been checked.

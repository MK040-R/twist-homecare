# Before launch: placeholders, draft copy and open questions

Everything here must be filled in, approved or answered before the site goes live, and **the first section before any ad runs**. Each item says where it lives, so whoever edits it can find it.

## 1. Required before any ad runs

| Item | Page | File | Status |
|---|---|---|---|
| **Privacy policy text** | /privacy | `src/pages/privacy.astro` | Shows "[Privacy policy text to be supplied]". **Required**: the site collects email addresses. India's DPDP Act 2023 expects a clear notice of what you collect and why. Each signup stores: email, which product(s), answers to the popup question, first and latest page visited, ad tags (UTM), Facebook click ID, referring website, browser type, and time. The rate limit also keeps a scrambled (hashed) form of the visitor's IP address for up to an hour. |
| **Terms text** | /terms | `src/pages/terms.astro` | Shows "[Terms text to be supplied]". |
| **Real domain** | All pages | `astro.config.mjs` (`SITE_URL`), `public/robots.txt` | Set to `https://twist-homecare.example`. Share links, the sitemap and Google all use this, so change both lines once the domain is bought. |

## 2. Placeholders visible on the site

| Placeholder | Where it shows | File |
|---|---|---|
| **[Name]™** (technology name) | Homepage hero text; "How it works" on all three product pages | `src/pages/index.astro`, `src/components/product/ProductPage.astro` |
| **Candid photo of Murali and Farzyn** (dashed box) | Homepage About section; About page top | `src/pages/index.astro`, `src/pages/about.astro` |
| **[Paragraph 1], [Paragraph 2], [Paragraph 3]** | About page, "Why we started Twist." | `src/pages/about.astro` |
| **[Registered address], Hyderabad** | About page, "Say hello." | `src/pages/about.astro` |
| **Last updated 5 Oct** | Homepage, "Where are we now?" (desktop) | `src/pages/index.astro`. Needs updating by hand each time a stage changes. |
| **Launch date: Dec 2026** | Homepage Launch stage and FAQ; "Launching Dec 2026" on product pages; product FAQs; homepage description | One place: `LAUNCH` in `src/data/site.ts` |
| **Blog post date: 28 Sept 2026** | Blog post page | `src/content/blog/made-for-the-water-you-actually-wash-in.md` (`date:`). This is the build date, not a real publish date. |

## 3. Draft copy written by me (not in the designs), for approval

| Copy | Where | File |
|---|---|---|
| Popup: "Email address", "you@example.com", "Adding you…", close-button label | Popup | `src/data/site.ts` (`POPUP`) |
| Popup error messages (empty, invalid, too many tries, no connection, server error) | Popup | `src/data/site.ts` (`POPUP.errors`) |
| Footer disclaimer: "Product benefits describe what Twist products are formulated to do, confirmed by independent lab testing before launch." | Every page | `src/data/site.ts` (`FOOTER`) |
| Page titles and descriptions (browser tab, Google, link previews) | Every page | The `title` and `description` at the top of each file in `src/pages/`, and `meta` in `src/data/products.ts` |
| Share-image description: "The three Twist washes, Everyday Wash, Quikwash and Undergarment Wash, on a dark blue background" | Link previews | `src/layouts/Base.astro` |
| Blog post page: "All posts", "Diagram coming soon:", "More from the blog" | Blog post | `src/pages/blog/[slug].astro`, `src/data/blog.ts` |
| 404: "This page went missing in the wash." and the lines under it | Any wrong address | `src/pages/404.astro` |
| Privacy and Terms page headings: "Privacy policy", "Terms of use" | /privacy, /terms | `src/pages/privacy.astro`, `src/pages/terms.astro` |
| Screen-reader labels: "Skip to content", "Twist, home", "Show Quikwash" (carousel dots), "Show step 2 of 3: …", "Six laundry myths" | Hidden | `src/components/`, `src/pages/` |
| Blog post reading time: "3 min read" | Blog | `src/content/blog/…md` |

## 4. Open items from the locked content file

| # | Item | Status |
|---|---|---|
| 1 | **[Name]™**: the technology name has to come from the formulator. Check the trademark before using ™. | Open |
| 2 | **Hero body copy** states results as facts ("provides advanced cleaning, precisely targets your stains and protects your fabric"). ASCI: back each claim with tests or change it to "is designed to". | You chose to keep it. Still an ASCI risk. |
| 3 | **pH promise**: "We will print the number on the pack" | You removed that sentence. Done. |
| 4 | **Problem 05 source** was not a citation | Resolved by removing all sources. |
| 5 | **Hard-water testing** "Every formula is tested at 200 to 300 mg/L and 10 to 40°C" is written as already done. The blog post says "We test our formulas at 200 to 300 mg/L" too. | Open. Keep only once the test protocol is actually running. |
| 6 | **Placeholders**: [MONTH YEAR], [DATE], [contact email], ₹[X], founder photo, About lines | Month and year, date, email and price are filled. Photo and About lines are still open (section 2). |
| 7 | **Learn more links** go to each product page | Done |
| 8 | **Privacy and Terms pages** needed before collecting emails | Pages exist; the **text is still needed** (section 1). |
| 9 | **Stock photos** (Unsplash, "Where are we now?") to be replaced with your own lab and home-trial photos | Open. The credit "Photos: Unsplash" is shown. |

## 5. Questions still open in the copy

These come from the copy review. You didn't answer them, so the site uses my default for now.

| # | Question | Default used |
|---|---|---|
| a | Homepage FAQ says skin safety is "one of the things we are testing"; the Everyday Wash page says "Safe for baby clothes" as fact. One has to change. | Both as written. **Contradiction still live.** |
| b | The popup asks "At ₹250 for 1 litre, would you buy {Product} at launch?" for all three products, but Undergarment Wash is a 350 ml pump bottle on its own pack. | As written. |
| c | The brief said no prices on the site, and the FAQs say prices go to the list before launch. The popup shows ₹250 straight after signup. | As written. Your call. |
| d | "Laundry liquids typically wash at pH 9 or higher": many liquids sit between 7 and 9. Needs a source or softer wording. | As written. |
| e | Undergarment stain table: have the formulator confirm which stain has which chemistry. | As designed. |
| f | Undergarment Wash "reduces odour-causing bacteria and fungi" is an antimicrobial claim, which gets extra regulatory attention in India. | As written. |
| g | Why Twist, "Nothing hidden": "The full ingredient list goes on every pack **and on this site**". There's no ingredients page yet. | As written. |
| h | Blog post: confirm with the formulator that the final formulas include a mineral-binding agent (builder or chelator), since "How we're designing for it" depends on it. | As written. |
| i | Other claims written as fact (ASCI): "Removes odour-causing bacteria", "Safe for baby clothes", "Skin-tested on washed fabric", "Rinses out with no detectable residue", "Free from phosphates…", "Three IFRA-certified scents", "No re-stink, even after 50 washes". The footer disclaimer is now on every page. | Kept, as you asked. |
| j | Contact email is murali@startupmills.com (a Startup Mills address, published on every page). | As given. |
| k | Undergarment Wash is the only product page without "How much will it cost?". Its FAQ "Can I use it in the washing machine?" doesn't say yes or no. | As written. |
| l | The blog post's cover image is the same tap photo used on the Everyday Wash page. | As written. |
| m | Why Twist, myth 2 calls optical brighteners "dyes" (technically they are fluorescent whitening agents). | As written. |
| n | Everyday Wash card says "All fabric types", but its formula includes protease, which breaks down protein fibres such as wool and silk. Enzyme detergents usually say "not for wool or silk". | "All fabric types", at your request. Confirm with the formulator before ads run. |

## 6. Things to know before launch (not copy)

- **Supabase free plan pausing:** free projects pause after about a week without activity, and signups then fail until someone presses "Restore" in the Supabase dashboard. Check the project is awake before each ad run, or move to the paid plan (about US$25 a month). See the README.
- **Image sharpness:** the source images are 900px on their longest side. On high-resolution laptop screens the large desktop hero bottles are slightly soft. Supply higher-resolution originals and they are used automatically.
- **Tracking:** Meta Pixel, Conversions API and GA4 are not installed yet. The slot is ready in `src/scripts/track.ts`. Adding them changes what is collected from visitors, so it also needs a privacy policy update and, under DPDP, likely a consent step.

# Build the Twist pre-launch website

## Context

Twist is a laundry care brand from Sherali Consumer Private Limited, Hyderabad. It has three products: Everyday Wash, Quikwash and Undergarment Wash. None of them is on sale yet. This website exists for one job: turn Instagram ad traffic into "Notify me" email signups, and learn which product each person wants. There are no payments, no cart and no prices.

Almost every visitor will arrive on a phone, inside the Instagram in-app browser, on mobile data. Design, build and test for that first, and treat desktop as the secondary layout.

The design is finished and approved. Your job is to build it faithfully, not to redesign it.

## What's in this folder

Everything is in `design-handoff/`. Read all of it before you plan anything.

- `screenshots/` has full-page renders of every page at 390px (mobile) and 1440px (desktop). This is the visual truth.
- `reference/` has the same pages as static HTML with the exact CSS, spacing, copy, image references and alt text. Use it as the source of truth for copy and styles. The root element has a fixed width (390 or 1440) because these were artboards. The real site must be fluid.
- `source/` has the original design files. They use a small template format: `<helmet>` holds the head (fonts, CSS variables, classes), `{{name}}` is filled from the object that `renderVals()` returns, `<sc-for>` repeats, `<sc-if>` shows conditionally, and `setState` drives interactions. Read these for interaction behaviour and default states (which accordion item is open first, what a tap does). Links to `#notify` mean "open the Notify me popup".
- `assets/` has every image used, as named WebP files (900px on the long side). The three `bottle-*.webp` files have transparent backgrounds.
- `content/Twist_Homepage_Locked_Content.md` is the homepage copy and design notes, including a list of open items to finish before ads go live. Read it for intent. Where it disagrees with `reference/`, `reference/` wins.
- `content/blog/` has the first blog post as Markdown.

## Pages and routes

| Route | Design files | Notes |
|---|---|---|
| `/` | home | "See our products" scrolls to the Pick your wash section |
| `/everyday-wash` | everyday-wash | |
| `/quikwash` | quikwash | |
| `/undergarment-wash` | undergarment-wash | |
| `/why-twist` | why-twist | |
| `/blog` | blog | See the blog rules below |
| `/blog/[slug]` | not designed | Build it in the same system (see below) |
| `/about` | about | Ship as designed, placeholders included |
| `/privacy`, `/terms` | not designed | Simple text pages in the same system, with the heading and "[Privacy policy text to be supplied]" / "[Terms text to be supplied]". Do not write legal text. |
| 404 | not designed | Short, on-brand, links home and to the three product pages |

The nav on every page is: wordmark (links home), Why Twist?, Blogs, About Us, and a Notify me button. On mobile, the wordmark and Notify me sit on the first row and the three links sit underneath. The current page's link is underlined. Every "Learn more" goes to its product page.

## Non-negotiables

1. **Match the designs.** At 390px and 1440px the build should be indistinguishable from `screenshots/`. Between and beyond those widths, the layout should scale sensibly (write mobile-first CSS; switch to the desktop layout at a breakpoint you choose, around 900 to 1024px, and cap content width on very wide screens). Do not add, remove, reorder or restyle sections.
2. **Use the copy exactly as written.** Don't rewrite, shorten, "improve" or fix grammar. Keep every `[placeholder]` visible as it is. Never introduce em dashes. Never mention wash-cycle length or minutes. The brand is Twist; never write "Quikwash by Twist". Product names are Everyday Wash, Quikwash and Undergarment Wash.
3. **Fast on a mid-range Android phone on 4G.** Target LCP under 2.5s, CLS under 0.1, and as little client-side JavaScript as possible. Ship interactions as small islands rather than a client-rendered app.
4. **Works in the Instagram in-app browser.** Nothing may depend on hover. Use `svh`/`dvh` rather than `100vh`. The popup must stay usable when the keyboard opens. Don't rely on third-party cookies.
5. **Accessible.**
   - Tap targets are at least 44px.
   - Focus states are visible.
   - Accordions are real buttons with `aria-expanded`.
   - Carousels can be scrolled by keyboard and have labelled dots.
   - Alt text comes from the designs.
   - `prefers-reduced-motion` is respected.

## Design system

The CSS variables are in each `<helmet>`. For reference:

- **Colours:**
  - `--ink` #2D3370 (primary)
  - `--surface` #F5F5F1 (chalk background)
  - `--surface-alt` #D5D8E7 (periwinkle alternate sections)
  - `--ink-muted` #4A4F75
  - `--ink-subtle` #565B80
  - `--accent` #F4D35E (small labels on ink only)
  - `--on-ink` #F5F5F1
  - Pack colours: Everyday #F6E4A0, Quikwash #F5CACA, Undergarment #CFE3F6
- **Type:** Eczar (500 to 800) for headings, Mukta (200 to 700) for everything else. Self-host or use your framework's font optimisation, subset to Latin, `font-display: swap`, and preload the two weights used above the fold. No italics anywhere.

## Interactions

Check each one against `source/` for default state and behaviour.

- **Homepage, Pick your wash:** on mobile, a horizontal scroll-snap carousel with the next card peeking in, plus three dots that follow the scroll and can be tapped. On desktop, three cards in a row.
- **Homepage, What most detergents get wrong:** on mobile, an accordion where one item is open at a time and tapping the open one closes it. On desktop, a list on the left selects the panel on the right, and one is always selected.
- **Product pages, How it works:** on mobile, a carousel with dots.
- **Why Twist, the myth cards:** on mobile, a carousel with "Swipe for all six".
- **FAQ accordions on every page:** one item open at a time, with the first open by default as in the designs.

## The Notify me popup

This is the most important component on the site, and it has not been designed in this style yet. Build it in the same design system and keep it simple.

**Opening it**

- It opens from every Notify me button and CTA.
- It also opens on page load when the URL has `#notify`, so ads can link straight to it (for example `/quikwash#notify`).
- On mobile it is a bottom sheet. On desktop it is a centred modal.
- It closes on the close button, on Esc, and on a tap outside it. Trap focus while it is open.

**It knows which product it was opened for**

- On a product page, or from a product card, it is that product.
- Everywhere else, it is "any".

**Step 1: the form**

- Title: "Get notified when Twist launches". For a product, use "Get notified when {Product} launches".
- One email field.
- A button: "Notify me".
- A small line underneath: "No spam. Unsubscribe in one click."
- Add a hidden honeypot field.

**Step 2: after a successful signup**

- "You're in. Thank you."
- An optional one-tap question:
  - If opened for a product: "At ₹[X] for [pack size], would you buy {Product} at launch?" Answers: Yes, Maybe, Not at that price, Skip.
  - If opened for "any": "Which wash would you try first?" Answers: the three product names, then Skip.

**Step 3: after an answer**

- "That helps a lot." and a Close button.

Treat all popup copy as a draft and list it in `PLACEHOLDERS.md` for my approval. Show errors inline and in plain language. If someone signs up twice, show the same success state and never an error.

## Signups: Supabase

- **Table:** create a `signups` table with a migration committed to the repo. Columns:
  - `id`
  - `email`, unique and case-insensitive
  - `products` (a text array of every product they signed up for)
  - `answers` (jsonb)
  - `first_page`, `last_page`
  - `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
  - `fbclid`
  - `referrer`
  - `user_agent`
  - `created_at`, `updated_at`
- **Writes and security:** write only through a server endpoint that uses the service role key from environment variables. Enable row-level security with no public policies, so the browser can never read or write the table directly.
- **Repeat signups:** a repeat email updates the row and adds the product to `products`; it never creates a duplicate.
- **Server-side protection:** validate the email on the server, reject the honeypot, and apply a basic per-IP rate limit.
- **Attribution:** on the first page view, capture the UTM parameters, `fbclid` and the referrer. Keep them first-touch in first-party storage for 30 days and attach them to the signup.
- **Emails:** don't send any confirmation emails for now.
- **Keys:** include `.env.example`. Ask me for keys when you need them, and never hardcode them.

## Tracking: later, but leave the slot

Don't add Meta Pixel, Conversions API or GA4 yet. Create one `track(event, params)` function that does nothing for now, and call it on:

- popup open
- signup success, with the product and a generated `event_id` for later deduplication
- answer submitted

Put a short comment at the top of that function saying where Pixel, CAPI and GA4 will plug in.

## Blog

- Posts are Markdown files in a content folder, with frontmatter for title, category, date, reading time, summary and cover image.
- Seed it with `design-handoff/content/blog/`. Remove the "draft" line under the title. Render `*[Diagram: ...]*` lines as a visible dashed placeholder box.
- `/blog` follows the design. The newest post is the featured card, and "More posts" lists the rest. The four placeholder cards in the design only show the card layout, so don't ship them. Hide "More posts" while there is only one post.
- The post page isn't designed. Use:
  - the same header, footer and closing CTA band;
  - an Eczar title;
  - Mukta body text at 17 to 18px with a readable line length (about 680px maximum);
  - the cover image;
  - "More from the blog" at the end once there are other posts.

## SEO and sharing

- Give every page a `<title>` and meta description, drafted from its H1 and subhead. List them in `PLACEHOLDERS.md` for approval.
- Set `lang="en-IN"`.
- Add Open Graph and Twitter tags, with a 1200×630 share image: the three bottles on ink, made from `assets/`.
- Add a favicon and app icon, the "twist" wordmark in Eczar on ink.
- Add `sitemap.xml` and `robots.txt`.

## Images

- Generate responsive sizes (AVIF/WebP) from `assets/`, with width and height set so nothing shifts on load.
- Load the hero images eagerly with high priority and lazy-load everything else.
- Keep the dashed photo placeholders (founder photos and so on) exactly as designed.

## Stack

Your choice. The requirements:

- statically rendered pages
- one server endpoint for signups
- free-tier hosting with a custom domain and HTTPS
- redeploying is simple enough for a non-developer

State the stack and a one-line reason in your plan.

## How to work

1. Read everything in `design-handoff/`, then write a plan and wait for my OK before coding. The plan covers:
   - stack
   - routes
   - shared components
   - data model
   - how you'll handle each interaction
   - anything in the designs you think is contradictory or unclear
2. Build the shared pieces first: tokens, fonts, header, footer, CTA band, product cards, accordion, carousel and popup.
3. Build pages in this order: homepage, Quikwash, Everyday Wash, Undergarment Wash, Why Twist?, Blogs, About Us, then the rest. For each page, build and check mobile first, then desktop.
4. Check every page against the designs. Take full-page Playwright screenshots of every route at 390×844 and 1440×900 and put each one side by side with the matching file in `screenshots/`. Fix every visible difference in spacing, type size, weight, colour, image crop or copy. Save the final side-by-side images in `qa/`.
5. Test the full signup:
   - new email
   - repeat email
   - invalid email
   - honeypot
   - `#notify` deep link
   - UTM capture, confirmed in the table
6. Run Lighthouse in mobile mode on the homepage and one product page, and report the scores.
7. Ask me before doing anything that adds cost, sends email, or changes what is collected from visitors.

## Deliverables

- The working site, running locally.
- A `README.md` for someone who isn't a developer. It covers how to run the site locally, every environment variable, how to set up Supabase step by step (create the project, run the migration, find the keys, export signups as CSV), and how to deploy and connect a domain.
- `PLACEHOLDERS.md`, listing every `[placeholder]` and every piece of draft copy on the site with its page and file, so I can fill them before launch. Include the open items from the locked content file, and note that the Privacy and Terms text is required before any ad runs because the site collects email addresses.
- The `qa/` folder with the side-by-side comparisons and Lighthouse results.

## Don't

- Don't add sections, testimonials, ratings, prices, a cart, chat widgets, cookie banners, pop-ups other than Notify me, or animations that aren't in the designs.
- Don't replace or "enhance" any image, and don't add stock or AI images.
- Don't change `design-handoff/`. It is read-only reference.

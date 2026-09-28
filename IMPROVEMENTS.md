# Where the build differs from the designs

The designs in `design-handoff/` were treated as the visual baseline: tokens, type, layout and section order. Each difference below is either something you asked for, or a usability or accessibility fix I made. **The second group needs your approval.** Anything you don't want, tell me and I'll revert it.

The side-by-side screenshots in `qa/` show all of these as intended differences.

## You asked for these

| # | Where | Design | Build |
|---|---|---|---|
| 1 | Header, every page | Notify me button in the header | No header button. On mobile the three links now sit on the first row beside the wordmark, since that row would otherwise hold only the wordmark. This saves a row of screen height. |
| 2 | Footer, every page | Differs by page; product pages carry their own disclaimer; home mobile has no Privacy or Terms | One footer everywhere: company, email, Privacy, Terms, and one product-neutral disclaimer. "Nothing is on sale yet" removed. Email, Privacy and Terms are real links. |
| 3 | All proof boxes and "why" sections | Citations under the facts (Lambers, Napper & Thompson, Callewaert, BIS) | All citations removed, including the two source lines that weren't citations. The "Proof" label is removed too. |
| 4 | Homepage, "What most detergents get wrong" 01 | pH scale marked "Laundry powder 10+" | Marked "Laundry liquid 9+", with the marker moved to pH 9 to match the new proof text. |
| 5 | Homepage, 03 illustration (desktop) | "Where we test: 200 to 300" marker | Removed. |
| 6 | Homepage, About section | Headline "Two people who wanted to know what's in the bottle." | No headline; your paragraph on both mobile and desktop. |
| 7 | About page | "Who we are." section with two founder cards | Section removed. |
| 8 | Product pages, How it works | "[Name]™ technology" in a dark pill that looks like a button | Plain Eczar text with a yellow underline, so it can't be mistaken for a button. |
| 9 | Copy throughout | See the copy doc | Your revised copy, plus the defaults listed in `PLACEHOLDERS.md` for the questions you skipped. |

## I made these (please approve)

| # | Where | Design | Build | Why |
|---|---|---|---|---|
| 10 | Mobile labels (homepage) | 10px uppercase labels on the homepage only; 12px everywhere else | 12px everywhere | 10px uppercase is hard to read on a phone, and the other pages already used 12px. |
| 11 | Arrows (→ ↓ ←) | Typed as characters | Small line icons | Neither Eczar nor Mukta contains arrow characters, so phones were drawing them in a random fallback font. |
| 12 | Carousel dots | Decorative | Tappable, with 44px tap areas, and labelled for screen readers ("Show Quikwash") | The brief requires it. They look the same. |
| 13 | Homepage product cards (desktop) | Line under the card in quotation marks, e.g. "“A short wash should still be a complete wash.”" | Your new lines without quotation marks | Claims inside quotation marks read like customer testimonials, which the brief rules out. |
| 14 | Everyday Wash card tags | You changed them to "All fabric types" | Cottons · Blends · Bedsheets · Towels (the original) | Everyday Wash contains protease, which breaks down protein fibres such as wool and silk. "All fabric types" would likely be untrue. |
| 15 | Everyday Wash card line (desktop) | "7 signs of fabric ageing" in your edit | "8 signs" | The Everyday Wash page headline and its eight tiles say 8. |
| 16 | "The other two" labels | Differed from page to page | Everyday loads · Sweat and odour · Hand wash, the same everywhere | Consistency. The homepage cards keep your own labels. |
| 17 | Image alt text | Mobile and desktop used different wording; the ageing photos repeated their captions | One alt text per photo (the more descriptive desktop version); the ageing photos are marked decorative | Screen readers otherwise read each caption twice. |
| 18 | "Learn more" links | Visible text only | Visible "Learn more" plus hidden "about Everyday Wash" for screen readers and search engines | Search engines and screen readers need to know where each link goes. This lifted the SEO score from 92 to 100. |
| 19 | Undergarment stain table | Grid of boxes with a "table" label | A real HTML table styled to look identical | Screen readers can now read it row by row. |
| 20 | Product heroes, desktop 960 to 1279px wide | Four callouts beside the bottle | Callouts hidden in that range, shown from 1280px up | They overlap the bottle when the screen is narrower than the design. |
| 21 | Homepage, phones narrower than 390px | Hero bottles and route map at a fixed size, which scrolled sideways at 320px | Both scale down slightly | Older and smaller phones no longer get a sideways scroll. |
| 22 | Why Twist, "How we make things" item 1 | Your edit removed its title | Title "One job per bottle" kept, with your shorter text | Items 2 and 3 have titles, and item 1 looked broken without one. |
| 23 | Homepage FAQ | "Where will you deliver?" | Removed, as in your copy | Listed for completeness. |

## New pieces that weren't designed

- **Notify me popup:** a bottom sheet on mobile and a centred box on desktop, in the same colours and type. It has three steps (email, one-tap question, thank you) and inline error messages. It stays above the phone keyboard when typing.
- **Blog post page:** the site header, the post title in Eczar, category, date and reading time, the cover image, a 680px reading column in Mukta at 17 to 18px, dashed "Diagram coming soon" boxes, then "More from the blog" once there are other posts.
- **Privacy and Terms:** a heading and the placeholder line only.
- **404:** one line, a homepage button and links to the three products.
- **Skip to content:** a link that appears only when a keyboard user presses Tab.

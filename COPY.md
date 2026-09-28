# Twist website copy (final, as built)

This is the copy the site shows, as of 28 September 2026. It is your revised copy with the decisions from our review applied. Open questions are in `PLACEHOLDERS.md` and design differences in `IMPROVEMENTS.md`.

The site reads its copy from the code files named in each section, not from this file. To change copy later, edit those files, or change it here and ask me to apply it.

.m / .d = mobile / desktop wording where they differ.

---

## 1. Global (`src/data/site.ts`, `src/components/`)

### Header
- **nav.wordmark**: twist (link label for screen readers: "Twist, home")
- **nav.links**: Why Twist? · Blogs · About Us (current page underlined)
- **nav.skip**: Skip to content (keyboard users only)
- No Notify me button in the header.

### Footer (same on every page)
- **footer.company**: Sherali Consumer Private Limited · Hyderabad · murali@startupmills.com
- **footer.links**: Privacy · Terms
- **footer.disclaimer**: Product benefits describe what Twist products are formulated to do, confirmed by independent lab testing before launch.

### Closing CTA band (every page except the homepage)
- **cta.twist**: Be the first to try Twist. (Why Twist, Blog, blog posts, About)
- **cta.ew**: Be the first to try Everyday Wash.
- **cta.qw**: Be the first to try Quikwash.
- **cta.uw**: Be the first to try Undergarment Wash.
- **cta.button**: Notify me

### Bottle alt text (one set everywhere)
- Twist Everyday Wash bottle, prototype pack design
- Twist Quikwash bottle, prototype pack design
- Twist Undergarment Wash bottle, prototype pack design
- Twist Undergarment Wash pump bottle, prototype pack design (homepage)

---

## 2. Notify me popup (`src/data/site.ts`)

**Step 1**
- **title.any**: Get notified when Twist launches
- **title.product**: Get notified when {Product} launches
- **email.label**: Email address
- **email.placeholder**: you@example.com
- **button**: Notify me (while sending: Adding you…)
- **smallprint**: No spam. Unsubscribe in one click.
- **close label**: Close

**Errors**
- **empty**: Please enter your email address.
- **invalid**: That doesn't look like an email address. Check for typos and try again.
- **ratelimit**: Too many tries from this connection. Please wait a few minutes and try again.
- **network**: We couldn't reach our server. Check your connection and try again.
- **server**: Something went wrong on our side. Please try again in a moment.

**Step 2**
- **title**: You're in. Thank you.
- **q.product**: At ₹250 for 1 litre, would you buy {Product} at launch?
- **answers.product**: Yes · Maybe · Not at that price
- **q.any**: Which wash would you try first?
- **answers.any**: Everyday Wash · Quikwash · Undergarment Wash
- **skip**: Skip (closes the popup)

**Step 3**
- **title**: That helps a lot. Thank you!
- **button**: Close

---

## 3. Homepage `/` (`src/pages/index.astro`)

### Hero
- **h1**: A brand that cares for your clothes
- **body**: We tackle dirty laundry with clean science. Our [Name]™ technology provides advanced cleaning, precisely targets your stains and protects your fabric.
- **button**: See our products

### Our products
- **h2**: Our products
- **intro.m**: Three solutions, each built for one kind of load.
- **intro.d**: One bottle can't do every job well, so we're making three, each built for one kind of load.

| | Everyday Wash | Quikwash | Undergarment Wash |
|---|---|---|---|
| label | Everyday loads | Quick cycle | Hand wash |
| line | For the daily pile. | For sweaty synthetics or lightly worn clothes. | For intimate stains, washed by hand. |
| tags | All fabric types | Gym wear · Athleisure · Cotton | Innerwear · Period stains · Lingerie |
| line under tags (desktop) | Gentle on fabric. Protects against 8 signs of fabric ageing. | No re-stink, even after 50 washes. | Removes 6 types of intimate stains. |
| buttons | Notify me · Learn more | Notify me · Learn more | Notify me · Learn more |

### What most detergents get wrong
- **h2**: What most detergents get wrong.
- **sub**: And why we're making our own.
- **instr.m**: Tap a problem to see why it happens.
- **instr.d**: Pick a problem to see why it happens and the evidence behind it.
- **box label**: What we're doing (the "Proof" label is removed)

**01 Too harsh**
- **expl.m**: Detergents are often made strongly alkaline because a high pH breaks down grease fast. The same alkalinity can dry out skin and wear fibres down.
- **expl.d**: Detergents are often made strongly alkaline, because a high pH breaks down grease and stains fast. The same alkalinity can leave skin dry and irritated, and wears fibres down wash after wash.
- **proof**: Laundry liquids typically wash at pH 9 or higher. Healthy skin sits below pH 5.
- **ours**: Each formula is being built to clean at the gentlest pH that does the job.
- **illustration**: Skin < 5 · Liquid 9+ (mobile); Healthy skin · below 5 · Laundry liquid · 9+ · Acidic · Neutral · Alkaline (desktop). All illustration labels are in sentence case; no uppercase anywhere on the site.

**02 Doesn't protect fabric**
- **expl.m**: Detergents are sold on how clean clothes look after one wash, not on what fifty washes do to colour, stretch and strength.
- **expl.d**: Detergents are sold on how clean clothes look after one wash. Very few are tested on what fifty washes do to colour, stretch and strength.
- **proof**: A single 6 kg wash of acrylic clothes can shed over 700,000 fibres.
- **ours**: Everyday Wash is being tested for fibre strength, fading and pilling across repeated washes.

**03 Not made for Indian conditions**
- **expl.m**: Minerals in hard water tie up cleaning agents, so you add more and still get stiff, dull clothes. Much of our laundry is also washed cold.
- **expl.d**: Minerals in hard water latch onto cleaning agents before they reach the dirt, so you add more and still get stiff, dull clothes. Much of our laundry is also washed cold, straight from the tap.
- **proof.m**: India's standard allows hardness up to 600 mg/L. Above 180 is very hard.
- **proof.d**: India's drinking-water standard allows hardness up to 600 mg/L. Anything above 180 counts as very hard.
- **ours.m**: Every formula is tested at 200 to 300 mg/L and 10 to 40°C.
- **ours.d**: Every formula is tested at 200 to 300 mg/L hardness and 10 to 40°C water.

**04 Lets the smell come back**
- **expl.m**: Polyester holds on to skin oil, and bacteria feeding on it cause the smell. A short wash rarely reaches that oil.
- **expl.d**: Polyester holds on to skin oil, and the bacteria that feed on it produce the smell. A short wash rarely reaches that oil, so the odour returns the moment you sweat again.
- **proof.m**: After a workout, polyester shirts smelled significantly worse than cotton.
- **proof.d**: After a workout, polyester shirts smelled significantly worse than cotton, with odour bacteria thriving on the polyester.
- **ours.m**: Quikwash is being tested for re-odour over repeated washes.
- **ours.d**: Quikwash is being built for synthetics and tested for re-odour over repeated washes.

**05 Leaves stains behind**
- **expl.m**: Blood, sweat and intimate stains are proteins. They need enzymes to break down, which bar soap does not have.
- **expl.d**: Blood, sweat and other intimate stains are proteins. They need enzymes to break down, and heat can set them, which is why a cold hand wash with bar soap so often leaves a mark.
- **proof.m**: Protein stains need enzymes. Plain soap has none, so it relies on scrubbing alone.
- **proof.d**: Protein stains need enzymes to break down. Plain soap has none, so it relies on scrubbing alone.
- **ours**: Undergarment Wash is being tested on six intimate stains in a cold hand wash.

**06 Cuts corners to cut the price**
- **expl.m**: Some powders are bulked out with ingredients that add weight but do no cleaning.
- **expl.d**: Some powders are bulked out with ingredients that add weight but do no cleaning, so the pack looks like more for the money.
- **proof.m**: Many powders use sodium sulphate as filler. It adds weight, not cleaning.
- **proof.d**: Many detergent powders use sodium sulphate as a filler. It adds weight to the pack but does no cleaning.
- **ours.m**: Concentrated liquids with a full ingredient list.
- **ours.d**: Concentrated liquids with a full ingredient list on every pack.

### Where are we now?
- **h2**: Where are we now?
- **updated.d**: Last updated 5 Oct
- **credit**: Photos: Unsplash

| Label (mobile / desktop) | Title | Line | Alt text |
|---|---|---|---|
| Now · you are here / Now | Formulation | Getting each formula right. | Laboratory glassware with liquid |
| Next | Internal testing | Our own washes, real clothes. | Front-load washing machine at home |
| Then | Independent labs | Third-party tests. | Lab technician placing a sample under a microscope |
| Then | Home trials | Real homes, before launch. | Laundry basket of clothes at home |
| Target | Launch | Dec 2026 | Cardboard delivery box |

### About (homepage section)
- **photo**: dashed box, "Candid photo, daylight"
- **caption**: Murali & Farzyn · Hyderabad
- **body**: We spend a lot of thought on the clothes we buy and very little on what we wash them in. We're Farzyn and Murali, a wife and husband team. We started Twist because we couldn't find laundry products that were made for Indian water, Indian weather and the way we actually wash clothes. Twist lets you choose the right product for each load and takes care of your clothes, so you don't have to worry about them.

### FAQs: Fair questions.
1. **Is Twist on sale yet?** Not yet. All three washes are still being developed and tested. Leave your email and we'll write the day they are ready.
2. **When will it launch?** We're aiming for Dec 2026. If testing takes longer, we'll say so here rather than rush it.
3. **Are your claims tested yet?** Not all of them. The formulas are still being developed and tested. But rest assured, the products will go live only if they pass all the tests.
4. **How much will it cost?** We'll share prices with everyone on the list before launch.
5. **Is it safe for sensitive skin and baby clothes?** That is one of the things we are testing, with a skin irritation test on washed fabric. We'll publish the result.
6. **Will you spam me?** No. One email when we launch, and the occasional update if a test result is worth sharing. Unsubscribe in one click.

---

## 4. Quikwash `/quikwash` (`src/data/products.ts`, `src/components/product/WhyQuikwash.astro`)

- **wordmark**: Quikwash
- **callouts.d**: Keeps · colour and stretch / Removes · odour-causing bacteria / Dissolves · under 2 minutes / For · gym wear and lightly worn clothes
- **h1**: No re-stink, even after 50 washes.
- **body**: The wash for clothes that smell more than they're dirty: gym wear, office shirts, anything you've worn once.
- **ticks.m**: Removes odour-causing bacteria / Keeps colour and stretch / Dissolves in under 2 minutes
- **button**: Notify me when it's ready
- **launch**: Launching Dec 2026

**Why clothes smell again after a wash.**
- **hook**: It smells fine out of the machine, then sour the moment you start sweating again.
- **body**: Fresh sweat barely smells. The smell comes from bacteria feeding on the skin oil that sweat leaves in your clothes. Synthetic fabrics hold on to that oil, and an ordinary wash cleans the surface but leaves the oil behind.
- **Step 1** After you sweat: Sweat and skin oil soak into the fabric.
- **Step 2** After an ordinary wash: It looks clean, but the oil is still trapped inside.
- **Step 3** The next time you wear it: Bacteria feed on that oil, and the smell is back.
- **note**: In a 2014 study, polyester shirts smelled significantly worse than cotton after a workout.

**How Quikwash works.**
- **body**: Most detergents are built to lift the dirt you can see. Quikwash is built for the body oil you can't see, because that's what the smell feeds on.
- **tech**: [Name]™ technology · Three things happen in every wash.
- **01 Lipase breaks down body oil**: Lipase is an enzyme that cuts skin oil into smaller pieces that dissolve in the wash water, so the oil rinses out from between the fibres instead of staying trapped inside them.
- **02 Odour bacteria go out with it**: With the oil gone, odour-causing bacteria lose what they feed on, and they're rinsed away in the same wash. That's why the smell doesn't come back when you sweat again.
- **03 A concentrated formula that starts fast**: It dissolves in under 2 minutes, even in cold, hard tap water, so the enzymes get to work from the very start of the wash.

**What else you get.**
- Keeps colour and stretch: Kind to activewear and stretch fabrics, wash after wash.
- Works in any Indian water: Hard or soft, cold or warm, straight from the tap.
- Gentle on sweaty skin: Skin-safe for the clothes you work out in.
- 40 washes a litre: Concentrated, so 25 ml does a full load.
- **In the bottle**: Naturally derived cleaning agents / Free from phosphates, parabens, bleach and optical brighteners / Three IFRA-certified scents, or fragrance-free

**Fair questions.**
1. **Can I use Quikwash for everyday clothes?** Yes, for anything that's more sweaty than dirty: office shirts, T-shirts, kids' school clothes. For heavily soiled loads, bedsheets and towels, use Everyday Wash.
2. **How is it different from my regular detergent?** Regular detergents are built to lift the dirt you can see. Quikwash is built to break down the skin oil that sweat leaves deep in the fabric, which is what brings the smell back.
3. **Does it work in cold water?** Yes. It works in tap water from 10 to 40°C, hard or soft.
4. **Will my clothes smell of fragrance?** Lightly, if you pick one of the three scents. There's also a fragrance-free version.
5. **How much will it cost?** We'll share the price with everyone on the list before launch.
6. **When can I buy it?** We're aiming for Dec 2026. Leave your email and you'll hear the day it's ready.

**The other two.** Everyday loads · Everyday Wash · For the daily pile, in any machine. / Hand wash · Undergarment Wash · For intimate stains, washed by hand. (Learn more)

---

## 5. Everyday Wash `/everyday-wash` (`src/data/products.ts`, `src/components/product/WhyEveryday.astro`)

- **wordmark**: Everyday Wash
- **callouts.d**: Keeps · colours bright / Removes · all kinds of Indian stains / Gentle · on cottons and blends / For · every machine
- **h1**: Protects against 8 signs of fabric ageing.
- **body**: The everyday wash that gets clothes clean without wearing them out. For cottons, blends, bedsheets and towels, in any machine.
- **ticks.m**: Removes sweat, oil, tea, turmeric and everyday dirt / Keeps colours bright and whites from greying / Works in front-load, top-load and HE machines
- **button**: Notify me when it's ready · **launch**: Launching Dec 2026

**Why clothes look old before they are.**
- **hook**: Your favourite T-shirt didn't wear out. It was washed out.
- **body**: Most detergents are judged on how clean clothes look after one wash, not on what fifty washes do to them. Harsh formulas and hard water slowly strip dye, raise fuzz and break fibres, so clothes fade, grey, pill and thin long before you're done with them.
- **label**: The 8 ways clothes age in the wash
- Fading: Colours go dull and patchy. / Greying: Whites turn dingy. / Pilling: Fuzz balls up on the surface. / Shrinkage: Clothes get shorter and tighter. / Stiffness: Towels turn rigid and crusty. / Harsh feel: Fabric feels rough on skin. / Lost stretch: Waistbands and leggings sag. / Weak fibres: Fabric thins until it tears.
- **note**: A single 6 kg wash of acrylic clothes can shed over 700,000 fibres.

**How Everyday Wash works.**
- **body**: Most detergents clean hard and leave the fabric to fend for itself. Everyday Wash is built to clean just as well while looking after the fibres it's cleaning.
- **tech**: [Name]™ technology · Three things happen in every wash.
- **01 Enzymes matched to Indian stains**: Protease, amylase and lipase each break down a different kind of stain, from sweat and food to oil and turmeric, so clothes come clean without harsh chemistry or hard scrubbing.
- **02 Care built into the clean**: Cellulase smooths away the fuzz that turns into pills and keeps colours looking fresh, balanced so it never costs the fabric its strength.
- **03 Made for Indian water**: It cleans in hard water and at tap temperature, 10 to 40°C, so you don't need hot washes or an extra scoop of detergent.

**What else you get.**
- Removes all kinds of Indian stains: Sweat and blood, oil and grease, tea, coffee and turmeric, and everyday dirt.
- One formula for every machine: Front-load, top-load and HE.
- Safe for baby clothes: And for pet bedding too.
- 40 washes a litre: Concentrated.
- **In the bottle**: Naturally derived cleaning agents / Free from phosphates, parabens, bleach and optical brighteners / Three IFRA-certified scents, or fragrance-free

**Fair questions.**
1. **Can I wash whites and colours together?** Yes. Everyday Wash is made to stop whites greying and colours fading, so you can wash them the same way.
2. **Will it get out tough stains like turmeric?** It's made for all kinds of stains Indian laundry gets: sweat and blood, oil and grease, tea, coffee and turmeric, and everyday dirt.
3. **Does it work in a top-load machine?** Yes. It works in front-load, top-load and HE machines.
4. **Can I use it for gym clothes?** Yes. But if the smell keeps coming back after a wash, Quikwash is made for exactly that.
5. **How much will it cost?** We'll share the price with everyone on the list before launch.
6. **When can I buy it?** We're aiming for Dec 2026. Leave your email and you'll hear the day it's ready.

**The other two.** Sweat and odour · Quikwash · For clothes that smell more than they're dirty. / Hand wash · Undergarment Wash · For intimate stains, washed by hand.

---

## 6. Undergarment Wash `/undergarment-wash` (`src/data/products.ts`, `src/components/product/WhyUndergarment.astro`)

- **wordmark**: Undergarment Wash (with the line drawing above it)
- **callouts.d**: Tap water · by hand / Rinses · with no residue / pH · matched to intimate skin / Fragrance-free
- **h1**: Removes 6 intimate stains in a cold hand wash.
- **body**: For the stains bar soap leaves behind: discharge, period blood, sweat, body oil, urine and faecal traces. Works on heavy-flow days.
- **ticks.m**: Cold water, by hand, no scrubbing / Rinses out with no detectable residue / pH matched to intimate skin
- **button**: Notify me when it's ready · **launch**: Launching Dec 2026

**Why bar soap isn't enough.**
- **hook**: It looks clean when you hang it up. The next morning, the mark is still there.
- **body**: Most intimate stains are proteins or body oil. Proteins need enzymes to break down, and bar soap has none, so it relies on scrubbing, which roughs up delicate fabric without lifting the stain. Hot water isn't the answer either, because heat sets protein stains into the fibre.
- **photo alt**: The gusset of white cotton briefs with a faint mark left after washing
- **label**: What the six stains are made of
- **intro**: Six stains, three kinds of chemistry. Undergarment Wash is made to lift all of them in cold water.

| Stain | Protein | Oil & fat | Salts & urea |
|---|---|---|---|
| Discharge | ● | | |
| Period blood (Also iron) | ● | | |
| Sweat | ● | | ● |
| Body oil | | ● | |
| Urine | | | ● |
| Faecal traces (Also fibre) | ● | ● | |

**How Undergarment Wash works.**
- **body**: Bar soap is made to clean skin. Undergarment Wash is made for what ends up on the fabric, and for the skin that fabric sits against.
- **tech**: [Name]™ technology · Three things happen in every wash.
- **01 Protease for protein stains**: Protease is an enzyme that breaks the proteins in discharge, blood and sweat into small pieces that rinse away in cold water, with no scrubbing and no hot water.
- **02 Rinses out completely**: Low foam, so it rinses clean in seconds and leaves no detectable residue on the fabric that sits against your skin.
- **03 Gentle on intimate skin**: The pH is matched to intimate skin, and it reduces odour-causing bacteria and fungi before rinsing away.

**What else you get.**
- One pump per garment: Easy to dose, nothing to measure.
- Fragrance-free: Nothing extra against sensitive skin.
- Gentle on delicates: Cotton, modal, elastane and lace, wash after wash.
- Safe for daily use: Skin-tested on washed fabric.
- **In the bottle**: Naturally derived cleaning agents / Free from phosphates, parabens, bleach and optical brighteners

**Fair questions.**
1. **Does it work on period stains?** Yes, including heavy-flow days. Wash in cold water, because heat sets blood stains.
2. **Can I use it in the washing machine?** It's made for hand washing: one pump per garment, rub gently, rinse.
3. **Is it safe to use every day?** Yes. It's gentle enough for daily use on intimate skin, and rinses out with no detectable residue.
4. **Why is there no fragrance?** Fragrance is one more thing sitting against sensitive skin, so we left it out.
5. **Can I use it on bras and lingerie?** Yes. It's gentle on cotton, modal, elastane and lace.
6. **When can I buy it?** We're aiming for Dec 2026. Leave your email and you'll hear the day it's ready.

**The other two.** Everyday loads · Everyday Wash · For the daily pile, in any machine. / Sweat and odour · Quikwash · For clothes that smell more than they're dirty.

---

## 7. Why Twist? `/why-twist` (`src/pages/why-twist.astro`)

- **h1**: We did the homework on laundry, so you don't have to.
- **body**: People spend ₹2,000 on a dress and check the fabric, the fit and the reviews, then wash it in whatever detergent happens to be at home. Twist exists to close that gap, with laundry care from people who have done the thinking for you.

**What laundry ads taught us, and what's actually true.** (labels: What we were told / What's true; mobile: Swipe for all six)

| What we were told | What's true |
|---|---|
| More foam means a better clean. | Foam is a side effect of some cleaning agents. It says nothing about how clean your clothes get. |
| Brighter whites are cleaner whites. | Optical brighteners are dyes that make fabric reflect blue light. Clothes look brighter without being any cleaner. |
| A longer wash is a better wash. | Clothes that are more sweaty than dirty come clean in a short cycle, if the detergent is made for it. |
| If it smells strong, it's clean. | Fragrance makes laundry pleasant. It doesn't remove dirt, and it can cover a smell that's still there. |
| Natural is always better. | A short, natural-sounding ingredient list doesn't make a better formula. What matters is what each ingredient does in the wash. |
| One detergent works for everything. | Towels, gym wear and underwear get dirty in different ways, so they need different chemistry. |

**How we make things.**
1. **One job per bottle**: Every Twist product is built around one problem it exists to solve.
2. **Made for how India does laundry**: Hard water, tap-temperature washes, front-load, top-load and the bucket. Our formulas are designed for all of it.
3. **Nothing hidden**: The full ingredient list goes on every pack and on this site, with what each ingredient is there to do.

**What we leave out.** Phosphates · Parabens · Bleach · Optical brighteners. What goes in instead: naturally derived cleaning agents, enzymes matched to the stain, and IFRA-certified fragrances, or none at all.

**Three washes, one for each job.** Everyday Wash: For the daily pile, in any machine. / Quikwash: For clothes that smell more than they're dirty. / Undergarment Wash: For intimate stains, washed by hand. (Learn more)

---

## 8. Blog `/blog` (`src/pages/blog.astro`)

- **h1**: Notes on laundry.
- **intro**: What's in your detergent, what it does to your clothes, and what the ads never told you.
- **featured label**: Latest · {Category} · **link**: Read
- **More posts** (shown once there are two or more posts); cards show {Category} · {X} min read

## 9. About Us `/about` (`src/pages/about.astro`)

- **photo**: dashed box, "Candid photo of Murali and Farzyn, daylight"
- **caption**: Murali & Farzyn · Hyderabad
- **h1**: Two people who wanted to know what's in the bottle.
- **Why we started Twist.** [Paragraph 1: the moment you noticed the problem. For example, the shirt, the stain or the label that started it.] / [Paragraph 2: what you found when you looked into how detergents are made and sold.] / [Paragraph 3: what you decided to do about it, and what you won't compromise on.]
- **Say hello.** We read every message. Write to us at murali@startupmills.com. / Sherali Consumer Private Limited · [Registered address], Hyderabad
- ("Who we are." removed.)

## 10. Blog post (`src/content/blog/made-for-the-water-you-actually-wash-in.md`)

- **title**: Made for the water you actually wash in · **category**: Hard water · **date**: 28 Sept 2026 · **reading time**: 3 min read
- **summary**: Why hard water makes you use more detergent and still leaves clothes stiff and dull, and what a formula needs to do about it.
- **cover**: tap photo, alt "A tap with hard-water scale running into a bucket"
- **page labels**: All posts · Diagram coming soon: · More from the blog
- **body**: as in the post file (draft line removed; sources and the editorial note not shown, as requested).

## 11. Other pages

- **Privacy** (`/privacy`): Privacy policy / [Privacy policy text to be supplied]
- **Terms** (`/terms`): Terms of use / [Terms text to be supplied]
- **404**: This page went missing in the wash. / The link may be old, or the address may have a typo. / Go to the homepage / Or see our washes: Everyday Wash · Quikwash · Undergarment Wash

## 12. Page titles and descriptions

| Page | Title | Description |
|---|---|---|
| Home | Twist: laundry care that cares for your clothes | Three washes, each built for one kind of load. Everyday Wash, Quikwash and Undergarment Wash, launching Dec 2026. Get notified. |
| Quikwash | Quikwash: no re-stink, even after 50 washes · Twist | The wash for clothes that smell more than they're dirty: gym wear, office shirts, anything you've worn once. |
| Everyday Wash | Everyday Wash: protects against 8 signs of fabric ageing · Twist | The everyday wash that gets clothes clean without wearing them out. For cottons, blends, bedsheets and towels, in any machine. |
| Undergarment Wash | Undergarment Wash: 6 intimate stains, cold hand wash · Twist | For the stains bar soap leaves behind: discharge, period blood, sweat, body oil, urine and faecal traces. |
| Why Twist | Why Twist? We did the homework on laundry | People check the fabric, the fit and the reviews, then wash it in whatever detergent is at home. Twist exists to close that gap. |
| Blog | Notes on laundry · Twist blog | What's in your detergent, what it does to your clothes, and what the ads never told you. |
| Blog post | Made for the water you actually wash in · Twist | (the post summary) |
| About | About Twist: two people who wanted to know what's in the bottle | Murali and Farzyn, Hyderabad. Why we started Twist and how to reach us. |
| Privacy | Privacy policy · Twist | How Twist handles the information you share with us. |
| Terms | Terms of use · Twist | The terms for using the Twist website. |
| 404 | Page not found · Twist | (not indexed) |

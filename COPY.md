# Twist website: every word on the site

This file holds all the copy on the site: visible text, button labels, image alt text, screen-reader labels, the popup, error messages, page titles and the blog post. Edit it and hand it back, and the build will use exactly what is here.

## How to edit

- Change the text after the colon. **Don't change the IDs** (the `bold.code.names`); they are how I map your edits back to the site.
- To remove a line, replace its text with `DELETE`.
- To leave me a note or question, add a line starting with `>>` under the item.
- `[Square brackets]` are placeholders. Fill them, or leave them for launch.
- **`.m` / `.d`** in an ID means mobile-only / desktop-only wording. If you want one wording for both, write it once and `DELETE` the other.
- Items marked **DRAFT** were written by me (they are not in the designs). Items marked **CHECK** carry a note from me: a claim that needs evidence, a rule conflict, or an inconsistency across pages.

Legend for the product names: Everyday Wash, Quikwash, Undergarment Wash. The brand is Twist.

---

## 0. Things to decide before editing

These are cross-cutting issues I found while pulling the copy out. Answer them here or fix them in place below.

1. **CHECK: "Dissolves in under 2 minutes"** appears three times on Quikwash (`qw.hero.tick3`, `qw.hero.callout3.d`, `qw.how.3.body`). The brief says never mention minutes. Keep, reword or delete?
2. **CHECK: Quikwash is described two ways.** On the homepage it is "Machine · quick cycle / For sweaty synthetics on a short cycle." On the other product pages and Why Twist it is "Machine · sweat and odour / For clothes that smell more than they're dirty." Pick one, or confirm the difference is intended.
3. **CHECK: Claims written as fact** (ASCI risk, like open item 2 in the locked content). Examples: "Removes odour-causing bacteria", "Safe for baby clothes", "Skin-tested on washed fabric", "Rinses out with no detectable residue", "Free from phosphates…", "Three IFRA-certified scents", "Every formula is tested at 200 to 300 mg/L". The product-page footer disclaimer covers some of this; the homepage and Why Twist have no disclaimer.
4. **CHECK: The homepage hero headline and body** make results claims: "provides advanced cleaning, precisely targets your stains and protects your fabric" (open item 2).
5. **Popup:** the brief and the locked content file have two different versions. Both are in section 2 for you to pick.

---

## 1. Global (appears on every page)

### 1.1 Header

- **nav.wordmark**: twist
- **nav.link.why**: Why Twist?
- **nav.link.blog**: Blogs
- **nav.link.about**: About Us
- **nav.notify**: Notify me
- **nav.aria**: Main  *(screen-reader name for the menu)*
- **nav.skip** DRAFT: Skip to content  *(hidden link for keyboard users, appears on Tab)*

### 1.2 Footer

- **footer.company.m**: Sherali Consumer Private Limited · Hyderabad
- **footer.company.d**: Sherali Consumer Private Limited · Hyderabad · [contact email]
- **footer.status**: Nothing is on sale yet
- **footer.privacy**: Privacy
- **footer.terms**: Terms
>> CHECK: the homepage mobile footer in the design shows only "Sherali Consumer Private Limited · Hyderabad / Nothing is on sale yet", with no Privacy or Terms links. I recommend showing them on every page, since you collect emails.
>> CHECK: mobile footers leave out [contact email]; desktop shows it. Show it on mobile too?

**Product-page footer disclaimer** (product pages only):

- **footer.disclaimer.ew**: Product benefits describe what Everyday Wash is formulated to do, confirmed by independent lab testing before launch.
- **footer.disclaimer.qw**: Product benefits describe what Quikwash is formulated to do, confirmed by independent lab testing before launch.
- **footer.disclaimer.uw**: Product benefits describe what Undergarment Wash is formulated to do, confirmed by independent lab testing before launch.

### 1.3 Closing CTA band (ink panel at the bottom of every page except the homepage)

- **cta.twist**: Be the first to try Twist.  *(Why Twist, Blog, blog posts, About)*
- **cta.ew**: Be the first to try Everyday Wash.
- **cta.qw**: Be the first to try Quikwash.
- **cta.uw**: Be the first to try Undergarment Wash.
- **cta.button**: Notify me

### 1.4 Shared bottle alt text

- **alt.bottle.ew**: Twist Everyday Wash bottle, prototype pack design
- **alt.bottle.qw**: Twist Quikwash bottle, prototype pack design
- **alt.bottle.uw**: Twist Undergarment Wash bottle, prototype pack design
- **alt.bottle.uw.pump**: Twist Undergarment Wash pump bottle, prototype pack design  *(homepage version)*
>> CHECK: the homepage mobile cards use shorter versions ("Twist Everyday Wash bottle", "Twist Quikwash bottle", "Twist Undergarment Wash pump bottle"). I suggest one set everywhere.

---

## 2. Notify me popup

### 2.1 Version A: from PROMPT.md (my default)

**Step 1: sign-up**

- **popup.s1.title.any**: Get notified when Twist launches
- **popup.s1.title.product**: Get notified when {Product} launches
- **popup.s1.email.label** DRAFT: Email address
- **popup.s1.email.placeholder** DRAFT: you@example.com
- **popup.s1.button**: Notify me
- **popup.s1.button.loading** DRAFT: Adding you…
- **popup.s1.smallprint**: No spam. Unsubscribe in one click.
- **popup.close.aria** DRAFT: Close

**Step 1: errors** (DRAFT, shown under the email field)

- **popup.err.empty**: Please enter your email address.
- **popup.err.invalid**: That doesn't look like an email address. Check for typos and try again.
- **popup.err.ratelimit**: Too many tries from this connection. Please wait a few minutes and try again.
- **popup.err.network**: We couldn't reach our server. Check your connection and try again.
- **popup.err.server**: Something went wrong on our side. Please try again in a moment.

**Step 2: after signing up**

- **popup.s2.title**: You're in. Thank you.
- **popup.s2.q.product**: At ₹[X] for {pack size}, would you buy {Product} at launch?
- **popup.s2.packsize.ew** DRAFT: a litre (about 40 washes)
- **popup.s2.packsize.qw** DRAFT: a litre (about 40 washes)
- **popup.s2.packsize.uw** DRAFT: a 350 ml pump bottle
- **popup.s2.a.yes**: Yes
- **popup.s2.a.maybe**: Maybe
- **popup.s2.a.no**: Not at that price
- **popup.s2.q.any**: Which wash would you try first?
- **popup.s2.a.any**: Everyday Wash · Quikwash · Undergarment Wash
- **popup.s2.skip**: Skip

**Step 3: after answering**

- **popup.s3.title**: That helps a lot.
- **popup.s3.button**: Close

### 2.2 Version B: from the locked content file (alternative)

- **popupB.s1.label**: [Product] · launch alert
- **popupB.s1.title**: Tell me when [Product] is ready
- **popupB.s1.body**: One email, the day it launches. That's all.
- **popupB.s1.button**: Notify me
- **popupB.s1.smallprint**: No spam, no payment. Unsubscribe in one click.
- **popupB.s2.title**: You're in. Thank you.
- **popupB.s2.q**: At ₹[X] for a litre (about 40 washes), would you buy it at launch?
- **popupB.s2.answers**: Yes, I'd buy it · Maybe, after the lab results · Not at that price
- **popupB.s2.skip**: Skip
- **popupB.s3.title**: That helps a lot.
- **popupB.s3.body**: We'll write when [Product] launches. Test results go up on its page as they come in.

>> Pick A, B, or mix. My view: B's answers ("Maybe, after the lab results") give you more useful data than a bare "Maybe", and B's step 3 body tells people what happens next. A's title is clearer for "any" mode, where there's no product to name.

---

## 3. Homepage `/`

### 3.1 Hero

- **home.hero.h1**: A brand that cares for your clothes
- **home.hero.body**: We tackle dirty laundry with clean science. Our [Name]™ technology provides advanced cleaning, precisely targets your stains and protects your fabric.
- **home.hero.button**: See our products

### 3.2 Pick your wash

- **home.washes.h2**: Pick your wash.
- **home.washes.intro.m**: Three washes, each built for one kind of load.
- **home.washes.intro.d**: One bottle can't do every job well, so we're making three, each built for one kind of load.
- **home.washes.carousel.aria**: Our three washes
- **home.washes.dot.aria** DRAFT: Show {Product}

**Everyday Wash card**

- **home.card.ew.label.m**: Machine · everyday
- **home.card.ew.label.d**: Machine · everyday loads
- **home.card.ew.name**: Everyday Wash
- **home.card.ew.line**: For the daily pile, in any machine.
- **home.card.ew.tags**: Cottons · Blends · Bedsheets · Towels
- **home.card.ew.quote.d**: "Clothes should wear out because you loved them, not because you washed them."
- **home.card.ew.notify**: Notify me
- **home.card.ew.learn**: Learn more
- **home.card.ew.learn.aria**: Learn more about Everyday Wash

**Quikwash card**

- **home.card.qw.label**: Machine · quick cycle
- **home.card.qw.name**: Quikwash
- **home.card.qw.line**: For sweaty synthetics on a short cycle.
- **home.card.qw.tags**: Gym wear · Athleisure · Polyester shirts
- **home.card.qw.quote.d**: "A short wash should still be a complete wash."
- **home.card.qw.notify**: Notify me
- **home.card.qw.learn**: Learn more
- **home.card.qw.learn.aria**: Learn more about Quikwash
>> CHECK: see decision 2 above.

**Undergarment Wash card**

- **home.card.uw.label.m**: Hand wash · cold
- **home.card.uw.label.d**: Hand wash · cold water
- **home.card.uw.name**: Undergarment Wash
- **home.card.uw.line**: For intimate stains, washed by hand.
- **home.card.uw.tags**: Innerwear · Period stains · Lingerie
- **home.card.uw.quote.d**: "Your most intimate laundry deserves more than a bar of soap."
- **home.card.uw.notify**: Notify me
- **home.card.uw.learn**: Learn more
- **home.card.uw.learn.aria**: Learn more about Undergarment Wash

### 3.3 What most detergents get wrong

- **home.why.h2**: What most detergents get wrong.
- **home.why.sub**: Why we're making our own.
- **home.why.instr.m**: Tap a problem to see why it happens.
- **home.why.instr.d**: Pick a problem to see why it happens and the evidence behind it.
- **home.why.proof.label**: Proof
- **home.why.ours.label**: What we're doing

**01 Too harsh**

- **home.p1.title**: Too harsh
- **home.p1.expl.m**: Detergents are often made strongly alkaline because a high pH breaks down grease fast. The same alkalinity can dry out skin and wear fibres down.
- **home.p1.expl.d**: Detergents are often made strongly alkaline, because a high pH breaks down grease and stains fast. The same alkalinity can leave skin dry and irritated, and wears fibres down wash after wash.
- **home.p1.proof**: Laundry powders typically wash at pH 10 or higher. Healthy skin sits below pH 5.
- **home.p1.src.m**: Skin pH: Lambers et al., 2006
- **home.p1.src.d**: Skin pH: Lambers et al., Int. J. Cosmetic Science, 2006
- **home.p1.ours.m**: Each formula is being built to clean at the gentlest pH that does the job.
- **home.p1.ours.d**: Each formula is being built to clean at the gentlest pH that does the job. We will print the number on the pack.
>> CHECK: open item 3, the pH promise needs the formulator's target and a pack commitment.
- **home.p1.illus.labels.m**: SKIN < 5 · POWDER 10+ · 0 · 7 · 14
- **home.p1.illus.labels.d**: HEALTHY SKIN · BELOW 5 · LAUNDRY POWDER · 10+ · 0 · 7 · 14 · ACIDIC · NEUTRAL · ALKALINE
- **home.p1.illus.aria.m**: pH scale with healthy skin below 5 and laundry powder at 10 or higher
- **home.p1.illus.aria.d**: pH scale from 0 to 14 with healthy skin below 5 and laundry powder at 10 or higher

**02 Doesn't protect fabric**

- **home.p2.title**: Doesn't protect fabric
- **home.p2.expl.m**: Detergents are sold on how clean clothes look after one wash, not on what fifty washes do to colour, stretch and strength.
- **home.p2.expl.d**: Detergents are sold on how clean clothes look after one wash. Very few are tested on what fifty washes do to colour, stretch and strength.
- **home.p2.proof**: A single 6 kg wash of acrylic clothes can shed over 700,000 fibres.
- **home.p2.src.m**: Napper & Thompson, 2016
- **home.p2.src.d**: Napper & Thompson, Marine Pollution Bulletin, 2016
- **home.p2.ours**: Everyday Wash is being tested for fibre strength, fading and pilling across repeated washes.
- **home.p2.illus.labels.m**: 700,000+ FIBRES PER WASH
- **home.p2.illus.labels.d**: ONE 6 KG ACRYLIC WASH · 700,000+ FIBRES SHED
- **home.p2.illus.aria.m**: A yarn shedding fibres
- **home.p2.illus.aria.d**: A yarn fraying and shedding loose fibres

**03 Not made for Indian conditions**

- **home.p3.title**: Not made for Indian conditions
- **home.p3.expl.m**: Minerals in hard water tie up cleaning agents, so you add more and still get stiff, dull clothes. Much of our laundry is also washed cold.
- **home.p3.expl.d**: Minerals in hard water latch onto cleaning agents before they reach the dirt, so you add more and still get stiff, dull clothes. Much of our laundry is also washed cold, straight from the tap.
- **home.p3.proof.m**: India's standard allows hardness up to 600 mg/L. Above 180 is very hard.
- **home.p3.proof.d**: India's drinking-water standard allows hardness up to 600 mg/L. Anything above 180 counts as very hard.
- **home.p3.src.m**: BIS IS 10500:2012
- **home.p3.src.d**: BIS IS 10500:2012 · USGS hardness classes
- **home.p3.ours.m**: Every formula is tested at 200 to 300 mg/L and 10 to 40°C.
- **home.p3.ours.d**: Every formula is tested at 200 to 300 mg/L hardness and 10 to 40°C water.
>> CHECK: open item 5, this is written as already done.
- **home.p3.illus.labels.m**: 200 BIS OK · 600 MAX · VERY HARD · 0 · 180 · MG/L
- **home.p3.illus.labels.d**: SOFT · MOD. · HARD · VERY HARD · 0 · 180 · 600 MG/L · 200 · BIS ACCEPTABLE · 600 · BIS IF NO OTHER SOURCE · ← WHERE WE TEST: 200 TO 300
- **home.p3.illus.aria.m**: Hardness scale with India's limits at 200 and 600
- **home.p3.illus.aria.d**: Water hardness scale from 0 to 600 milligrams per litre with India's limits at 200 and 600

**04 Lets the smell come back**

- **home.p4.title**: Lets the smell come back
- **home.p4.expl.m**: Polyester holds on to skin oil, and bacteria feeding on it cause the smell. A short wash rarely reaches that oil.
- **home.p4.expl.d**: Polyester holds on to skin oil, and the bacteria that feed on it produce the smell. A short wash rarely reaches that oil, so the odour returns the moment you sweat again.
- **home.p4.proof.m**: After a workout, polyester shirts smelled significantly worse than cotton.
- **home.p4.proof.d**: After a workout, polyester shirts smelled significantly worse than cotton, with odour bacteria thriving on the polyester.
- **home.p4.src.m**: Callewaert et al., 2014
- **home.p4.src.d**: Callewaert et al., Applied and Environmental Microbiology, 2014
- **home.p4.ours.m**: Quikwash is being tested for re-odour over repeated washes.
- **home.p4.ours.d**: Quikwash is being built for synthetics and tested for re-odour over repeated washes.
- **home.p4.illus.labels.m**: POLYESTER · COTTON
- **home.p4.illus.labels.d**: POLYESTER · STRONGER ODOUR · COTTON · WEAKER
- **home.p4.illus.aria.m**: Polyester shirt with strong odour next to cotton shirt with weaker odour
- **home.p4.illus.aria.d**: A polyester shirt giving off strong odour next to a cotton shirt giving off much less

**05 Leaves stains behind**

- **home.p5.title**: Leaves stains behind
- **home.p5.expl.m**: Blood, sweat and intimate stains are proteins. They need enzymes to break down, which bar soap does not have.
- **home.p5.expl.d**: Blood, sweat and other intimate stains are proteins. They need enzymes to break down, and heat can set them, which is why a cold hand wash with bar soap so often leaves a mark.
- **home.p5.proof.m**: Protein stains need enzymes. Plain soap has none, so it relies on scrubbing alone.
- **home.p5.proof.d**: Protein stains need enzymes to break down. Plain soap has none, so it relies on scrubbing alone.
- **home.p5.src**: How protein stains are removed
>> CHECK: open item 4, this is not a citation.
- **home.p5.ours**: Undergarment Wash is being tested on six intimate stains in a cold hand wash.
- **home.p5.illus.labels.m**: PROTEIN STAIN · ENZYME · CUT UP
- **home.p5.illus.labels.d**: BAR SOAP · NO ENZYMES · PROTEIN STAIN · CUT UP BY AN ENZYME
- **home.p5.illus.aria.m**: Protein stain chain cut up by an enzyme
- **home.p5.illus.aria.d**: A protein stain chain being cut into small pieces by an enzyme, next to a bar of soap with no enzymes

**06 Cuts corners to cut the price**

- **home.p6.title**: Cuts corners to cut the price
- **home.p6.expl.m**: Some powders are bulked out with ingredients that add weight but do no cleaning.
- **home.p6.expl.d**: Some powders are bulked out with ingredients that add weight but do no cleaning, so the pack looks like more for the money.
- **home.p6.proof.m**: Many powders use sodium sulphate as filler. It adds weight, not cleaning.
- **home.p6.proof.d**: Many detergent powders use sodium sulphate as a filler. It adds weight to the pack but does no cleaning.
- **home.p6.src**: Check the ingredient list on your pack
- **home.p6.ours.m**: Concentrated liquids at 25 ml a load, with a full ingredient list.
- **home.p6.ours.d**: Concentrated liquids at 25 ml a load, with a full ingredient list on every pack.
- **home.p6.illus.labels.m**: CLEANING · FILLER · NOT TO SCALE
- **home.p6.illus.labels.d**: CLEANING INGREDIENTS · FILLER · ADDS WEIGHT · ILLUSTRATIVE, NOT TO SCALE
- **home.p6.illus.aria.m**: Detergent pack split into cleaning ingredients and filler, illustrative
- **home.p6.illus.aria.d**: Cross-section of a detergent pack split into filler and cleaning ingredients, illustrative only

### 3.4 Where are we now?

- **home.where.h2**: Where are we now?
- **home.where.updated.d**: Last updated [DATE]
- **home.where.list.aria.m**: Our route to launch
- **home.where.credit**: Photos: Unsplash

| ID | Label | Title | Line | Alt text (mobile) | Alt text (desktop) |
|---|---|---|---|---|---|
| **home.stage1** | Now · you are here (mobile) / Now (desktop) | Formulation | Getting each formula right. | Laboratory glassware | Laboratory glassware with liquid |
| **home.stage2** | Next | Internal testing | Our own washes, real clothes. | Washing machine at home | Front-load washing machine at home |
| **home.stage3** | Then | Independent labs | Third-party tests. | Lab sample under a microscope | Lab technician placing a sample under a microscope |
| **home.stage4** | Then | Home trials | Real homes, before launch. | Laundry basket at home | Laundry basket of clothes at home |
| **home.stage5** | Target | Launch | [MONTH YEAR] | Delivery box | Cardboard delivery box |

>> Edit inside the table cells. I suggest one alt text per photo (the desktop ones are more descriptive).

### 3.5 About us (homepage section)

- **home.about.photo**: [Candid photo of Murali and Farzyn, daylight]  *(dashed placeholder box; label reads "CANDID PHOTO, DAYLIGHT")*
- **home.about.caption**: Murali & Farzyn · Hyderabad
- **home.about.h2**: Two people who wanted to know what's in the bottle.
- **home.about.body.m**: [Two lines in your own words.]
- **home.about.body.d**: [Two or three lines in your own words: why laundry, why now, and how to reach you directly.]

### 3.6 FAQs

- **home.faq.h2**: Fair questions.
- **home.faq.1.q**: Is Twist on sale yet?
- **home.faq.1.a**: Not yet. All three washes are still being developed and tested. Leave your email and we will write the day they are ready.
- **home.faq.2.q**: When will it launch?
- **home.faq.2.a**: We are aiming for [MONTH YEAR]. If testing takes longer, we will say so here rather than rush it.
- **home.faq.3.q**: Are your claims tested yet?
- **home.faq.3.a**: Not all of them. The formulas are still being developed and tested. Nothing is final, and every claim on this site is a target until the tests back it up.
- **home.faq.4.q**: How much will it cost?
- **home.faq.4.a**: We will share prices with everyone on the list before launch.
- **home.faq.5.q**: Where will you deliver?
- **home.faq.5.a**: We will sell online first. Delivery areas go out to everyone on the list before launch.
- **home.faq.6.q**: Is it safe for sensitive skin and baby clothes?
- **home.faq.6.a**: That is one of the things we are testing, with a skin irritation test on washed fabric. We will publish the result.
- **home.faq.7.q**: Will you spam me?
- **home.faq.7.a**: No. One email when we launch, and the occasional update if a test result is worth sharing. Unsubscribe in one click.
>> CHECK: home.faq.6.a says skin safety is still being tested, but the Everyday Wash page states "Safe for baby clothes" as fact. One of them has to change.
>> Note: the homepage FAQ uses "We will"; the product-page FAQs use "We'll". Harmless, but say if you want one style.

---

## 4. Quikwash `/quikwash`

### 4.1 Hero

- **qw.hero.wordmark**: Quikwash  *(large decorative word behind the bottle)*
- **qw.hero.callout1.d**: Keeps · colour and stretch
- **qw.hero.callout2.d**: Removes · odour-causing bacteria
- **qw.hero.callout3.d**: Dissolves · under 2 minutes
- **qw.hero.callout4.d**: For · gym wear and once-worn clothes
- **qw.hero.h1**: No re-stink, even after 50 washes.
- **qw.hero.body**: The wash for clothes that smell more than they're dirty: gym wear, office shirts, anything you've worn once.
- **qw.hero.tick1.m**: Removes odour-causing bacteria
- **qw.hero.tick2.m**: Keeps colour and stretch
- **qw.hero.tick3.m**: Dissolves in under 2 minutes
- **qw.hero.button**: Notify me when it's ready
- **qw.hero.launch**: Launching [MONTH YEAR]
>> CHECK: "No re-stink, even after 50 washes" is a tested-result claim.

### 4.2 Why clothes smell again

- **qw.why.h2**: Why clothes smell again after a wash.
- **qw.why.hook**: It smells fine out of the machine, then sour the moment you start sweating again.
- **qw.why.body**: Fresh sweat barely smells. The smell comes from bacteria feeding on the skin oil that sweat leaves in your clothes. Synthetic fabrics hold on to that oil, and an ordinary wash cleans the surface but leaves the oil behind.
- **qw.why.step1.label**: Step 1
- **qw.why.step1.title**: After you sweat
- **qw.why.step1.body**: Sweat and skin oil soak into the fabric.
- **qw.why.step2.label**: Step 2
- **qw.why.step2.title**: After an ordinary wash
- **qw.why.step2.body**: It looks clean, but the oil is still trapped inside.
- **qw.why.step3.label**: Step 3
- **qw.why.step3.title**: The next time you wear it
- **qw.why.step3.body**: Bacteria feed on that oil, and the smell is back.
- **qw.why.source**: In a 2014 study, polyester shirts smelled significantly worse than cotton after a workout. Callewaert et al., Applied and Environmental Microbiology.
- **qw.why.img.alt**: *(empty in the design: treated as decorative)*

### 4.3 How Quikwash works

- **qw.how.h2**: How Quikwash works.
- **qw.how.body**: Most detergents are built to lift the dirt you can see. Quikwash is built for the body oil you can't see, because that's what the smell feeds on.
- **qw.how.pill**: [Name]™ technology
- **qw.how.pillnote**: Three things happen in every wash.
- **qw.how.carousel.aria**: How Quikwash works
- **qw.how.1.title**: Lipase breaks down body oil
- **qw.how.1.body**: Lipase is an enzyme that cuts skin oil into smaller pieces that dissolve in the wash water, so the oil rinses out from between the fibres instead of staying trapped inside them.
- **qw.how.2.title**: Odour bacteria go out with it
- **qw.how.2.body**: With the oil gone, odour-causing bacteria lose what they feed on, and they're rinsed away in the same wash. That's why the smell doesn't come back when you sweat again.
- **qw.how.3.title**: A concentrated formula that starts fast
- **qw.how.3.body**: 25 ml is a full dose. It dissolves in under 2 minutes, even in cold, hard tap water, so the enzymes get to work from the very start of the wash.
- **qw.how.img.alt**: *(empty in the design: treated as decorative)*

### 4.4 What else you get

- **qw.else.h2**: What else you get.
- **qw.else.1.title**: Keeps colour and stretch
- **qw.else.1.body**: Kind to activewear and stretch fabrics, wash after wash.
- **qw.else.2.title**: Works in any Indian water
- **qw.else.2.body**: Hard or soft, cold or warm, straight from the tap.
- **qw.else.3.title**: Gentle on sweaty skin
- **qw.else.3.body**: Skin-safe for the clothes you work out in.
- **qw.else.4.title**: 40 washes a litre
- **qw.else.4.body**: Concentrated, so 25 ml does a full load.
- **qw.bottle.label**: In the bottle
- **qw.bottle.1**: Naturally derived cleaning agents
- **qw.bottle.2**: Free from phosphates, parabens, bleach and optical brighteners
- **qw.bottle.3**: Three IFRA-certified scents, or fragrance-free

### 4.5 FAQs

- **qw.faq.h2**: Fair questions.
- **qw.faq.1.q**: Can I use Quikwash for everyday clothes?
- **qw.faq.1.a**: Yes, for anything that's more sweaty than dirty: office shirts, T-shirts, kids' school clothes. For heavily soiled loads, bedsheets and towels, use Everyday Wash.
- **qw.faq.2.q**: How is it different from my regular detergent?
- **qw.faq.2.a**: Regular detergents are built to lift the dirt you can see. Quikwash is built to break down the skin oil that sweat leaves deep in the fabric, which is what brings the smell back.
- **qw.faq.3.q**: Does it work in cold water?
- **qw.faq.3.a**: Yes. It works in tap water from 10 to 40°C, hard or soft.
- **qw.faq.4.q**: Will my clothes smell of fragrance?
- **qw.faq.4.a**: Lightly, if you pick one of the three scents. There's also a fragrance-free version.
- **qw.faq.5.q**: How much will it cost?
- **qw.faq.5.a**: We'll share the price with everyone on the list before launch.
- **qw.faq.6.q**: When can I buy it?
- **qw.faq.6.a**: We're aiming for [MONTH YEAR]. Leave your email and you'll hear the day it's ready.

### 4.6 The other two

- **qw.other.h2**: The other two.
- **qw.other.ew.label.m**: Machine · everyday
- **qw.other.ew.label.d**: Machine · everyday loads
- **qw.other.ew.name**: Everyday Wash
- **qw.other.ew.line**: For the daily pile, in any machine.
- **qw.other.ew.link**: Learn more
- **qw.other.uw.label.m**: Hand wash · cold
- **qw.other.uw.label.d**: Hand wash · cold water
- **qw.other.uw.name**: Undergarment Wash
- **qw.other.uw.line**: For intimate stains, washed by hand.
- **qw.other.uw.link**: Learn more

---

## 5. Everyday Wash `/everyday-wash`

### 5.1 Hero

- **ew.hero.wordmark**: Everyday Wash
- **ew.hero.callout1.d**: Keeps · colours bright
- **ew.hero.callout2.d**: Removes · 4 kinds of Indian stains
- **ew.hero.callout3.d**: Gentle · on cottons and blends
- **ew.hero.callout4.d**: For · every machine
- **ew.hero.h1**: Protects against 8 signs of fabric ageing.
- **ew.hero.body**: The everyday wash that gets clothes clean without wearing them out. For cottons, blends, bedsheets and towels, in any machine.
- **ew.hero.tick1.m**: Removes sweat, oil, tea, turmeric and everyday dirt
- **ew.hero.tick2.m**: Keeps colours bright and whites from greying
- **ew.hero.tick3.m**: Works in front-load, top-load and HE machines
- **ew.hero.button**: Notify me when it's ready
- **ew.hero.launch**: Launching [MONTH YEAR]

### 5.2 Why clothes look old

- **ew.why.h2**: Why clothes look old before they are.
- **ew.why.hook**: Your favourite T-shirt didn't wear out. It was washed out.
- **ew.why.body**: Most detergents are judged on how clean clothes look after one wash, not on what fifty washes do to them. Harsh formulas and hard water slowly strip dye, raise fuzz and break fibres, so clothes fade, grey, pill and thin long before you're done with them.
- **ew.ageing.label**: The 8 ways clothes age in the wash

| ID | Title (also the image alt text) | Line |
|---|---|---|
| **ew.ageing.1** | Fading | Colours go dull and patchy. |
| **ew.ageing.2** | Greying | Whites turn dingy. |
| **ew.ageing.3** | Pilling | Fuzz balls up on the surface. |
| **ew.ageing.4** | Shrinkage | Clothes get shorter and tighter. |
| **ew.ageing.5** | Stiffness | Towels turn rigid and crusty. |
| **ew.ageing.6** | Harsh feel | Fabric feels rough on skin. |
| **ew.ageing.7** | Lost stretch | Waistbands and leggings sag. |
| **ew.ageing.8** | Weak fibres | Fabric thins until it tears. |

>> Note: the image alt text repeats the title, so screen readers read every word twice. I'll make these images decorative (empty alt) unless you object.

- **ew.why.source**: A single 6 kg wash of acrylic clothes can shed over 700,000 fibres. Napper & Thompson, Marine Pollution Bulletin, 2016.

### 5.3 How Everyday Wash works

- **ew.how.h2**: How Everyday Wash works.
- **ew.how.body**: Most detergents clean hard and leave the fabric to fend for itself. Everyday Wash is built to clean just as well while looking after the fibres it's cleaning.
- **ew.how.pill**: [Name]™ technology
- **ew.how.pillnote**: Three things happen in every wash.
- **ew.how.carousel.aria**: How Everyday Wash works
- **ew.how.1.title**: Enzymes matched to Indian stains
- **ew.how.1.body**: Protease, amylase and lipase each break down a different kind of stain, from sweat and food to oil and turmeric, so clothes come clean without harsh chemistry or hard scrubbing.
- **ew.how.2.title**: Care built into the clean
- **ew.how.2.body**: Cellulase smooths away the fuzz that turns into pills and keeps colours looking fresh, balanced so it never costs the fabric its strength.
- **ew.how.3.title**: Made for Indian water
- **ew.how.3.body**: It cleans in hard water and at tap temperature, 10 to 40°C, so you don't need hot washes or an extra scoop of detergent.

### 5.4 What else you get

- **ew.else.h2**: What else you get.
- **ew.else.1.title**: Removes 4 kinds of Indian stains
- **ew.else.1.body**: Sweat and blood, oil and grease, tea, coffee and turmeric, and everyday dirt.
- **ew.else.2.title**: One formula for every machine
- **ew.else.2.body**: Front-load, top-load and HE.
- **ew.else.3.title**: Safe for baby clothes
- **ew.else.3.body**: And for pet bedding too.
- **ew.else.4.title**: 40 washes a litre
- **ew.else.4.body**: Concentrated, so 25 ml does a full load.
- **ew.bottle.label**: In the bottle
- **ew.bottle.1**: Naturally derived cleaning agents
- **ew.bottle.2**: Free from phosphates, parabens, bleach and optical brighteners
- **ew.bottle.3**: Three IFRA-certified scents, or fragrance-free

### 5.5 FAQs

- **ew.faq.h2**: Fair questions.
- **ew.faq.1.q**: Can I wash whites and colours together?
- **ew.faq.1.a**: Yes. Everyday Wash is made to stop whites greying and colours fading, so you can wash them the same way.
- **ew.faq.2.q**: Will it get out tough stains like turmeric?
- **ew.faq.2.a**: It's made for the four kinds of stains Indian laundry gets: sweat and blood, oil and grease, tea, coffee and turmeric, and everyday dirt.
- **ew.faq.3.q**: Does it work in a top-load machine?
- **ew.faq.3.a**: Yes. It works in front-load, top-load and HE machines.
- **ew.faq.4.q**: Can I use it for gym clothes?
- **ew.faq.4.a**: Yes. But if the smell keeps coming back after a wash, Quikwash is made for exactly that.
- **ew.faq.5.q**: How much will it cost?
- **ew.faq.5.a**: We'll share the price with everyone on the list before launch.
- **ew.faq.6.q**: When can I buy it?
- **ew.faq.6.a**: We're aiming for [MONTH YEAR]. Leave your email and you'll hear the day it's ready.

### 5.6 The other two

- **ew.other.h2**: The other two.
- **ew.other.qw.label**: Machine · sweat and odour
- **ew.other.qw.name**: Quikwash
- **ew.other.qw.line**: For clothes that smell more than they're dirty.
- **ew.other.qw.link**: Learn more
- **ew.other.uw.label.m**: Hand wash · cold
- **ew.other.uw.label.d**: Hand wash · cold water
- **ew.other.uw.name**: Undergarment Wash
- **ew.other.uw.line**: For intimate stains, washed by hand.
- **ew.other.uw.link**: Learn more

---

## 6. Undergarment Wash `/undergarment-wash`

### 6.1 Hero

- **uw.hero.wordmark**: Undergarment Wash
- **uw.hero.callout1.d**: Cold water · by hand
- **uw.hero.callout2.d**: Rinses · with no residue
- **uw.hero.callout3.d**: pH · matched to intimate skin
- **uw.hero.callout4.d**: Fragrance-free
- **uw.hero.h1**: Removes 6 intimate stains in a cold hand wash.
- **uw.hero.body**: For the stains bar soap leaves behind: discharge, period blood, sweat, body oil, urine and faecal traces. Works on heavy-flow days.
- **uw.hero.tick1.m**: Cold water, by hand, no scrubbing
- **uw.hero.tick2.m**: Rinses out with no detectable residue
- **uw.hero.tick3.m**: pH matched to intimate skin
- **uw.hero.button**: Notify me when it's ready
- **uw.hero.launch**: Launching [MONTH YEAR]

### 6.2 Why bar soap isn't enough

- **uw.why.h2**: Why bar soap isn't enough.
- **uw.why.hook**: It looks clean when you hang it up. The next morning, the mark is still there.
- **uw.why.body**: Most intimate stains are proteins or body oil. Proteins need enzymes to break down, and bar soap has none, so it relies on scrubbing, which roughs up delicate fabric without lifting the stain. Hot water isn't the answer either, because heat sets protein stains into the fibre.
- **uw.why.img.alt**: The gusset of white cotton briefs with a faint mark left after washing
- **uw.table.label**: What the six stains are made of
- **uw.table.intro**: Six stains, three kinds of chemistry. Undergarment Wash is made to lift all of them in cold water.
- **uw.table.aria**: What each intimate stain is made of
- **uw.table.columns**: Protein · Oil & fat · Salts & urea

| ID | Stain | Note | Protein | Oil & fat | Salts & urea |
|---|---|---|---|---|---|
| **uw.table.1** | Discharge | | ● | | |
| **uw.table.2** | Period blood | Also iron | ● | | |
| **uw.table.3** | Sweat | | ● | | ● |
| **uw.table.4** | Body oil | | | ● | |
| **uw.table.5** | Urine | | | | ● |
| **uw.table.6** | Faecal traces | Also fibre | ● | ● | |

>> CHECK: please have the formulator confirm the dots. They are factual claims.

### 6.3 How Undergarment Wash works

- **uw.how.h2**: How Undergarment Wash works.
- **uw.how.body**: Bar soap is made to clean skin. Undergarment Wash is made for what ends up on the fabric, and for the skin that fabric sits against.
- **uw.how.pill**: [Name]™ technology
- **uw.how.pillnote**: Three things happen in every wash.
- **uw.how.carousel.aria**: How Undergarment Wash works
- **uw.how.1.title**: Protease for protein stains
- **uw.how.1.body**: Protease is an enzyme that breaks the proteins in discharge, blood and sweat into small pieces that rinse away in cold water, with no scrubbing and no hot water.
- **uw.how.2.title**: Rinses out completely
- **uw.how.2.body**: Low foam, so it rinses clean in seconds and leaves no detectable residue on the fabric that sits against your skin.
- **uw.how.3.title**: Gentle on intimate skin
- **uw.how.3.body**: The pH is matched to intimate skin, and it reduces odour-causing bacteria and fungi before rinsing away.
>> CHECK: "reduces odour-causing bacteria and fungi" is an antimicrobial claim, which draws extra regulatory scrutiny in India. Worth running past someone before ads.

### 6.4 What else you get

- **uw.else.h2**: What else you get.
- **uw.else.1.title**: One pump per garment
- **uw.else.1.body**: Easy to dose, nothing to measure.
- **uw.else.2.title**: Fragrance-free
- **uw.else.2.body**: Nothing extra against sensitive skin.
- **uw.else.3.title**: Gentle on delicates
- **uw.else.3.body**: Cotton, modal, elastane and lace, wash after wash.
- **uw.else.4.title**: Safe for daily use
- **uw.else.4.body**: Skin-tested on washed fabric.
- **uw.bottle.label**: In the bottle
- **uw.bottle.1**: Naturally derived cleaning agents
- **uw.bottle.2**: Free from phosphates, parabens, bleach and optical brighteners
- **uw.bottle.3**: A 350 ml pump bottle that sits neatly in the bathroom

### 6.5 FAQs

- **uw.faq.h2**: Fair questions.
- **uw.faq.1.q**: Does it work on period stains?
- **uw.faq.1.a**: Yes, including heavy-flow days. Wash in cold water, because heat sets blood stains.
- **uw.faq.2.q**: Can I use it in the washing machine?
- **uw.faq.2.a**: It's made for hand washing: one pump per garment, rub gently, rinse.
- **uw.faq.3.q**: Is it safe to use every day?
- **uw.faq.3.a**: Yes. It's gentle enough for daily use on intimate skin, and rinses out with no detectable residue.
- **uw.faq.4.q**: Why is there no fragrance?
- **uw.faq.4.a**: Fragrance is one more thing sitting against sensitive skin, so we left it out.
- **uw.faq.5.q**: Can I use it on bras and lingerie?
- **uw.faq.5.a**: Yes. It's gentle on cotton, modal, elastane and lace.
- **uw.faq.6.q**: When can I buy it?
- **uw.faq.6.a**: We're aiming for [MONTH YEAR]. Leave your email and you'll hear the day it's ready.
>> Note: this is the only product page without "How much will it cost?". Intended?
>> Note: uw.faq.2.a doesn't actually answer yes or no. Suggest starting with "No." or "It's best by hand."

### 6.6 The other two

- **uw.other.h2**: The other two.
- **uw.other.ew.label.m**: Machine · everyday
- **uw.other.ew.label.d**: Machine · everyday loads
- **uw.other.ew.name**: Everyday Wash
- **uw.other.ew.line**: For the daily pile, in any machine.
- **uw.other.ew.link**: Learn more
- **uw.other.qw.label**: Machine · sweat and odour
- **uw.other.qw.name**: Quikwash
- **uw.other.qw.line**: For clothes that smell more than they're dirty.
- **uw.other.qw.link**: Learn more

---

## 7. Why Twist? `/why-twist`

### 7.1 Hero

- **why.hero.h1**: We did the homework on laundry, so you don't have to.
- **why.hero.body**: People spend ₹2,000 on a dress and check the fabric, the fit and the reviews, then wash it in whatever detergent happens to be at home. Twist exists to close that gap, with laundry care from people who have done the thinking for you.

### 7.2 Myths

- **why.myths.h2**: What laundry ads taught us, and what's actually true.
- **why.myths.told.label**: What we were told
- **why.myths.true.label**: What's true
- **why.myths.swipe.m**: Swipe for all six →
- **why.myths.carousel.aria** DRAFT: Six laundry myths

| ID | What we were told | What's true |
|---|---|---|
| **why.myth.1** | More foam means a better clean. | Foam is a side effect of some cleaning agents. It says nothing about how clean your clothes get. |
| **why.myth.2** | Brighter whites are cleaner whites. | Optical brighteners are dyes that make fabric reflect blue light. Clothes look brighter without being any cleaner. |
| **why.myth.3** | A longer wash is a better wash. | Clothes that are more sweaty than dirty come clean in a short cycle, if the detergent is made for it. |
| **why.myth.4** | If it smells strong, it's clean. | Fragrance makes laundry pleasant. It doesn't remove dirt, and it can cover a smell that's still there. |
| **why.myth.5** | Natural is always better. | A short, natural-sounding ingredient list doesn't make a better formula. What each ingredient does in the wash does. |
| **why.myth.6** | One detergent works for everything. | Towels, gym wear and underwear get dirty in different ways, so they need different chemistry. |

>> Note: myth 5's last sentence ("What each ingredient does in the wash does.") reads awkwardly. Suggest: "What matters is what each ingredient does in the wash."
>> CHECK: myth 3 talks about wash-cycle length (see decision 1).
>> Note: myth 2 says optical brighteners are "dyes". Technically they're fluorescent whitening agents. Fine for a general audience, but a chemist may object.

### 7.3 How we make things

- **why.make.h2**: How we make things.
- **why.make.1.title**: One job per bottle
- **why.make.1.body**: Every Twist product is built around one problem it exists to solve. We won't invent new bottles just to sell more of them.
- **why.make.2.title**: Made for how India does laundry
- **why.make.2.body**: Hard water, tap-temperature washes, front-load, top-load and the bucket. Our formulas are designed for all of it.
- **why.make.3.title**: Nothing hidden
- **why.make.3.body**: The full ingredient list goes on every pack and on this site, with what each ingredient is there to do.
>> CHECK: "and on this site": there's no ingredients page yet. Keep as a promise for launch, or say "will go"?

### 7.4 What we leave out

- **why.out.h2**: What we leave out.
- **why.out.items**: Phosphates · Parabens · Bleach · Optical brighteners
- **why.out.body**: What goes in instead: naturally derived cleaning agents, enzymes matched to the stain, and IFRA-certified fragrances, or none at all.

### 7.5 Three washes

- **why.washes.h2**: Three washes, one for each job.
- **why.washes.ew.name**: Everyday Wash
- **why.washes.ew.line**: For the daily pile, in any machine.
- **why.washes.qw.name**: Quikwash
- **why.washes.qw.line**: For clothes that smell more than they're dirty.
- **why.washes.uw.name**: Undergarment Wash
- **why.washes.uw.line**: For intimate stains, washed by hand.
- **why.washes.link**: Learn more →

---

## 8. Blog `/blog`

- **blog.h1**: Notes on laundry.
- **blog.intro**: What's in your detergent, what it does to your clothes, and what the ads never told you.
- **blog.featured.label**: Latest · {Category}  *(renders as "Latest · Hard water")*
- **blog.featured.read**: Read →
- **blog.more.h2**: More posts  *(hidden while there is only one post)*
- **blog.card.meta**: {Category} · {X} min read

The featured card's title, summary and image come from the post itself (section 10).

---

## 9. About Us `/about`

- **about.photo**: [Candid photo of Murali and Farzyn, daylight]  *(dashed placeholder box)*
- **about.caption**: Murali & Farzyn · Hyderabad
- **about.h1**: Two people who wanted to know what's in the bottle.
- **about.story.h2**: Why we started Twist.
- **about.story.p1**: [Paragraph 1: the moment you noticed the problem. For example, the shirt, the stain or the label that started it.]
- **about.story.p2**: [Paragraph 2: what you found when you looked into how detergents are made and sold.]
- **about.story.p3**: [Paragraph 3: what you decided to do about it, and what you won't compromise on.]
- **about.team.h2**: Who we are.
- **about.team.1.photo**: [Photo]
- **about.team.1.name**: Murali
- **about.team.1.role**: [Role]
- **about.team.1.bio**: [One line about you: what you did before Twist, and what you look after now.]
- **about.team.2.photo**: [Photo]
- **about.team.2.name**: Farzyn
- **about.team.2.role**: [Role]
- **about.team.2.bio**: [One line about you: what you did before Twist, and what you look after now.]
- **about.hello.h2**: Say hello.
- **about.hello.body**: We read every message. Write to us at [contact email].
- **about.hello.address.m**: Sherali Consumer Private Limited / [Registered address], Hyderabad  *(two lines)*
- **about.hello.address.d**: Sherali Consumer Private Limited · [Registered address], Hyderabad
>> Note: About repeats the homepage headline word for word (home.about.h2 = about.h1). Fine if deliberate.

---

## 10. Blog post `/blog/made-for-the-water-you-actually-wash-in`

### 10.1 Post details (frontmatter)

- **post1.title**: Made for the water you actually wash in
- **post1.category**: Hard water
- **post1.date**: [Publish date]
- **post1.readingtime** DRAFT: 3 min read  *(483 words)*
- **post1.summary**: Why hard water makes you use more detergent and still leaves clothes stiff and dull, and what a formula needs to do about it.
- **post1.cover**: the tap image (`everyday-how-3-tap.webp`), also used on Everyday Wash
- **post1.cover.alt**: A tap with hard-water scale running into a bucket
>> CHECK: the cover repeats an Everyday Wash product image. OK, or do you want a separate image later?

### 10.2 Post page labels (DRAFT, the page isn't designed)

- **post.back** DRAFT: ← All posts
- **post.meta** DRAFT: {Category} · {Date} · {X} min read
- **post.sources.h2** DRAFT: Sources
- **post.more.h2**: More from the blog  *(hidden while there is only one post)*
- **post.diagram.prefix** DRAFT: Diagram coming soon:  *(shown inside each dashed diagram box, before the description)*

### 10.3 Post body

*(The "Twist blog · draft · first post in the series" line is removed, as the brief asks.)*

- **post1.p1**: Laundry in India happens in hard water, at tap temperature, in heat that makes us sweat through two shirts a day. Most detergents are built for gentler conditions, and that gap shows up in ways you've probably noticed without ever connecting them: clothes that dry stiff, whites that turn dull, and a habit of adding "just a little more" detergent to every load.
- **post1.h2.1**: How hard is hard water?
- **post1.p2**: Water hardness is measured in milligrams of calcium carbonate per litre (mg/L). The common classification treats anything under 60 as soft, 60 to 120 as moderately hard, 120 to 180 as hard, and anything above 180 as very hard.
- **post1.p3**: India's own drinking water standard, BIS IS 10500, accepts hardness up to 200 mg/L and allows up to 600 mg/L where there's no other source. In other words, the standard itself acknowledges that a great deal of Indian water sits in the "very hard" band. We test our formulas at 200 to 300 mg/L for exactly this reason.
>> CHECK: "We test" is written as already happening (open item 5). Also, "the standard acknowledges a great deal of Indian water is very hard" is an inference, not something the standard says.
- **post1.h2.2**: How detergent is meant to work
- **post1.p4**: Every cleaning agent in a detergent has two ends. One end, the tail, grabs oil and grime. The other end, the head, holds on to water. When enough of them surround a speck of oil, they wrap it into a tiny ball called a micelle, with the tails pointing in and the heads facing out, and the rinse carries that ball away from the fabric.
- **post1.diagram1**: Micelle forming around an oil droplet and lifting it off the fabric
- **post1.h2.3**: What hard water does to it
- **post1.p5**: The heads of most cleaning agents carry a negative charge. Calcium and magnesium, the minerals that make water hard, carry a positive one. So in hard water the minerals latch onto the heads before the cleaning agents ever reach the dirt. Instead of wrapping oil, the agents clump together into scum. The oil stays on the fabric, and the clumps settle into it.
- **post1.diagram2**: Ca and Mg binding cleaning agents into clumps, oil left on the fabric
- **post1.p6**: That's why hard water shows up as:
- **post1.list**: needing more detergent for the same result, / clothes that dry stiff and scratchy, / whites and colours that turn dull, / oily smells that come back after a wash.
- **post1.h2.4**: How we're designing for it
- **post1.p7**: Our formulas are being built to hold calcium and magnesium out of the way first, so the cleaning agents stay free to do their job. We're also designing them to work at tap temperature (10 to 40°C), because much of our laundry never sees hot water, and so a formula can't rely on heat to do the work.
- **post1.diagram3**: Minerals locked away, cleaning agents free to form micelles
- **post1.p8**: We'll publish our hard-water test results here once the independent lab work is done, including anything that falls short.
- **post1.sources**: BIS IS 10500:2012, Drinking Water Specification (acceptable limit 200 mg/L, permissible limit 600 mg/L total hardness as CaCO3) / Hardness classes (soft, moderately hard, hard, very hard) as commonly used by the USGS
>> CHECK: the post's "Before publishing" note (not shown on the site): confirm with the formulator that the final formulas include a mineral-binding agent (builder or chelator), since "How we're designing for it" depends on it.

---

## 11. Pages that aren't designed (all DRAFT)

### 11.1 Privacy `/privacy`

- **privacy.h1**: Privacy policy
- **privacy.body**: [Privacy policy text to be supplied]

### 11.2 Terms `/terms`

- **terms.h1**: Terms of use
- **terms.body**: [Terms text to be supplied]

>> Required before any ad runs: the site collects email addresses. India's DPDP Act 2023 expects a clear notice of what you collect and why. Note that the site also stores the ad source (UTM tags), referrer and browser type with each signup.

### 11.3 Page not found (404)

- **404.h1**: This page went missing in the wash.
- **404.body**: The link may be old, or the address may have a typo.
- **404.home**: Go to the homepage
- **404.products.label**: Or see our washes:
- **404.products**: Everyday Wash · Quikwash · Undergarment Wash

---

## 12. Page titles and descriptions (DRAFT)

What shows in the browser tab, Google results and link previews. Titles aim for under 60 characters and descriptions for under 155.

| ID | Title | Description |
|---|---|---|
| **meta.home** | Twist: laundry care that cares for your clothes | Three washes, each built for one kind of load. Everyday Wash, Quikwash and Undergarment Wash, launching [MONTH YEAR]. Get notified. |
| **meta.qw** | Quikwash: no re-stink, even after 50 washes · Twist | The wash for clothes that smell more than they're dirty: gym wear, office shirts, anything you've worn once. |
| **meta.ew** | Everyday Wash: protects against 8 signs of fabric ageing · Twist | The everyday wash that gets clothes clean without wearing them out. For cottons, blends, bedsheets and towels, in any machine. |
| **meta.uw** | Undergarment Wash: 6 intimate stains, cold hand wash · Twist | For the stains bar soap leaves behind: discharge, period blood, sweat, body oil, urine and faecal traces. |
| **meta.why** | Why Twist? We did the homework on laundry | People check the fabric, the fit and the reviews, then wash it in whatever detergent is at home. Twist exists to close that gap. |
| **meta.blog** | Notes on laundry · Twist blog | What's in your detergent, what it does to your clothes, and what the ads never told you. |
| **meta.post1** | Made for the water you actually wash in · Twist | Why hard water makes you use more detergent and still leaves clothes stiff and dull, and what a formula needs to do about it. |
| **meta.about** | About Twist: two people who wanted to know what's in the bottle | Murali and Farzyn, Hyderabad. Why we started Twist and how to reach us. |
| **meta.privacy** | Privacy policy · Twist | How Twist handles the information you share with us. |
| **meta.terms** | Terms of use · Twist | The terms for using the Twist website. |
| **meta.404** | Page not found · Twist | (not indexed) |

- **meta.share.alt** DRAFT: The three Twist washes, Everyday Wash, Quikwash and Undergarment Wash, on a dark blue background  *(alt text for the link-preview image)*

---

## 13. Screen-reader and accessibility labels (DRAFT unless noted)

These are never seen on screen, but a screen reader reads them aloud.

- **a11y.carousel.dot**: Go to card {n} of {total}  *(used where a card has no product name)*
- **a11y.carousel.region**: Uses the section's aria label above (for example "Our three washes").
- **a11y.faq.expanded**: *(handled by the browser: announces "expanded" / "collapsed")*
- **a11y.popup.dialog**: Get notified  *(name of the popup for screen readers)*
- **a11y.popup.success.announce**: You're in. Thank you.  *(read aloud when step 2 appears)*
- **a11y.newtab**: *(not used: no links open in new tabs)*
- **a11y.wordmark**: Twist, home  *(label for the "twist" logo link)*

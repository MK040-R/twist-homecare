# Twist pre-launch website

The Twist website: eight pages plus a blog, with one job, which is turning Instagram ad visitors into "Notify me" email signups. There is no shop, cart or payment.

- **Pages** are plain web pages built ahead of time, so they load fast on phones.
- **Signups** go to a small program (a "Cloudflare Worker") that saves them in your **Supabase** database.
- **Hosting** is on **Cloudflare**'s free plan, with your own domain and HTTPS.

Menu names below are correct as of September 2026. If a button has moved, look for the nearest equivalent.

---

## 1. What you need (one-time)

1. **Node.js 22**: download the "LTS" installer from [nodejs.org](https://nodejs.org) and install it.
2. **The code** on your Mac. In the Terminal app:
   ```bash
   git clone https://github.com/mk040-r/twist-homecare.git
   cd twist-homecare
   npm install
   ```
   `npm install` downloads everything the site needs (it takes a minute or two).
3. Accounts (all free to start): **GitHub** (you have it), **Supabase**, **Cloudflare**.

---

## 2. Set up Supabase (the signup database)

1. Go to [supabase.com](https://supabase.com), sign in, and click **New project**.
   - Name: `twist`. Choose a strong database password and save it somewhere safe.
   - Region: **Mumbai (ap-south-1)**, closest to your visitors.
2. When the project is ready, open **SQL Editor** in the left menu and click **New query**.
3. Open the file `supabase/migrations/20260928000000_signups.sql` from this project, copy **all** of it, paste it into the editor and click **Run**. You should see "Success". Running it twice is safe.
   This creates the `signups` table. It is locked so that only the website's server can read or write it; the public internet cannot.
4. Find your two keys:
   - **Project URL**: **Project Settings → Data API**. It looks like `https://abcdxyz.supabase.co`.
   - **Secret key**: **Project Settings → API Keys**. Use the **secret** key (starts with `sb_secret_`) or, on older projects, the `service_role` key.
     **Never paste this key into a web page, an email or a chat.** It can read and change every signup.

### See and export your signups

- **Table Editor → signups** shows every signup, newest at the bottom.
- To download a spreadsheet: in the Table Editor with `signups` open, use **Export → Export table as CSV**. Or run this in the SQL Editor and click **Download CSV**:
  ```sql
  select email, products, answers, utm_source, utm_campaign, first_page, created_at
  from signups order by created_at desc;
  ```

### Important: free projects pause

On the free plan, Supabase pauses a project after about a week with no activity. While paused, **signups fail**. If ads have been off for a while, open the Supabase dashboard before switching them back on, and press **Restore** if it's paused. The paid plan (about US$25 a month) doesn't pause.

---

## 3. Run the site on your computer

1. Make your local settings file. In the Terminal, in the project folder:
   ```bash
   cp .env.example .dev.vars
   ```
   Open `.dev.vars` in any text editor and fill in the four values (section 5 explains each).
2. Start it:
   ```bash
   npm run dev
   ```
3. Open **http://localhost:4321** in your browser. Pages update as you edit files. The Notify me popup saves real signups to your Supabase table, so use test emails and delete them afterwards.
4. Press `Ctrl + C` in the Terminal to stop.

To see exactly what will go live (a full build, as on Cloudflare), run `npm run preview` and open **http://localhost:8787**.

---

## 4. Put it live on Cloudflare, with your domain

### First time

1. Sign in at [dash.cloudflare.com](https://dash.cloudflare.com).
2. Go to **Workers & Pages → Create → Import a repository**. Connect your GitHub account and pick `twist-homecare`.
3. Build settings:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
4. Deploy. You'll get an address like `twist-website.<your-name>.workers.dev`.
5. Add your secrets: open the project → **Settings → Variables and Secrets** → add each of the four settings from section 5 as type **Secret**. Then redeploy (**Deployments → Retry** or push any change).
6. Open the `workers.dev` address and sign up once with a test email to check it lands in Supabase.

### Connect your domain

1. Buy the domain in Cloudflare (**Domain Registration → Register**), or add a domain you already own to Cloudflare and change its nameservers at your registrar as Cloudflare instructs.
2. In the Worker: **Settings → Domains & Routes → Add → Custom domain** and type your domain (for example `twist.in`, and add `www.twist.in` too if you want it). HTTPS is set up automatically within minutes.
3. In this project, change `https://twist-homecare.example` to your real domain in **two** places, `astro.config.mjs` and `public/robots.txt`, and push. Share links and Google use this.

### Every update after that

Change a file and push it to GitHub (or edit it directly on github.com and click **Commit changes**). Cloudflare rebuilds and publishes the site in about a minute. Nothing else to do.

---

## 5. Settings (environment variables)

| Name | What it is | Where to get it |
|---|---|---|
| `SUPABASE_URL` | Your Supabase project address | Supabase → Project Settings → Data API |
| `SUPABASE_SERVICE_ROLE_KEY` | The **secret** server key; lets the website save signups | Supabase → Project Settings → API Keys |
| `SIGNING_SECRET` | Any long random text. Proves a popup answer belongs to the person who just signed up. | Run `openssl rand -hex 32` in the Terminal |
| `IP_HASH_SALT` | Another long random text, different from the one above. Scrambles visitor IP addresses for the rate limit so raw IPs are never stored. | Run `openssl rand -hex 16` |

Locally they go in `.dev.vars` (never shared or uploaded; git ignores it). On Cloudflare they go in the Worker's **Variables and Secrets**.

---

## 6. Editing content

| To change | Edit |
|---|---|
| Header links, footer, popup text, launch date, contact email | `src/data/site.ts` |
| Product page text (all three) | `src/data/products.ts`; the "why" sections are in `src/components/product/` |
| Homepage text | `src/pages/index.astro` (the lists at the top of the file) |
| Why Twist, About, Blog, Privacy, Terms, 404 | `src/pages/<page>.astro` |
| Images | Replace the file in `src/assets/` with one of the **same name**. Sizes and formats are generated automatically. |

### Add a blog post

Create a new file in `src/content/blog/`, for example `why-foam-doesnt-matter.md`. The file name becomes the address (`/blog/why-foam-doesnt-matter`). Start it like this:

```markdown
---
title: Why foam doesn't matter
category: Myths
date: 2026-11-02
readingTime: 4 min read
summary: One sentence that appears on the blog page.
cover: ../../assets/your-image.webp
coverAlt: What the image shows, for people who can't see it
---

Your text here. Use ## for section headings.

*[Diagram: what the diagram should show]*
```

- Put the cover image in `src/assets/`.
- A line like `*[Diagram: ...]*` shows as a dashed "Diagram coming soon" box.
- The newest post becomes the big featured card on /blog. "More posts" appears automatically once there are two or more.
- Add `draft: true` to hide a post.

---

## 7. Checks (optional)

| Command | What it does |
|---|---|
| `npm run qa:screens` | Screenshots every page at phone and desktop size, next to the designs, into `qa/` (run `npm run build` first) |
| `npm run test:signup` | Tests the whole signup flow against `npm run preview`: new, repeat, invalid, honeypot, `#notify` link, ad tags. Writes test rows to the database in `.dev.vars`. |
| `npm run test:ui` | Tests accordions, tabs, carousels, tap sizes and keyboard use |

Results from the build are in `qa/` (screenshots) and `qa/lighthouse/` (speed and accessibility reports).

---

## 8. Good to know

- **Ads can open the popup directly:** link to any page with `#notify` on the end, e.g. `https://yourdomain/quikwash#notify`. On a product page it signs people up for that product.
- **Ad tracking tags** (`utm_source`, `utm_campaign` and so on, plus Facebook's `fbclid`) are remembered from a visitor's first visit for 30 days and saved with their signup.
- **Tracking pixels** (Meta Pixel, Conversions API, Google Analytics) are not installed. There is a ready slot in `src/scripts/track.ts`. Adding them needs a privacy policy update first.
- **Before launch**, go through `PLACEHOLDERS.md`. Design changes made during the build, and the ones awaiting approval, are listed in `IMPROVEMENTS.md`.

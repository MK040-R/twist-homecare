// End-to-end signup test against a running site (default http://localhost:8787, i.e. `npm run preview`).
// Drives a real browser through the popup, then checks the database through the server key.
//
// Usage: BASE_URL=http://localhost:8787 node scripts/test-signup.mjs
// Needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (read from .dev.vars) to verify rows.
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:8787';
const vars = Object.fromEntries(
  readFileSync(new URL('../.dev.vars', import.meta.url), 'utf8')
    .split('\n').filter((l) => l.includes('=')).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1)]),
);
const DB = vars.SUPABASE_URL.replace(/\/$/, '') + '/rest/v1';
const KEY = vars.SUPABASE_SERVICE_ROLE_KEY;
const dbHeaders = { apikey: KEY, ...(KEY.startsWith('eyJ') ? { authorization: `Bearer ${KEY}` } : {}) };

const stamp = Date.now();
const email = `qa.${stamp}@example.com`;
let failures = 0;
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`);
  if (!ok) failures++;
};
const rows = async (addr) => (await fetch(`${DB}/signups?email=eq.${encodeURIComponent(addr)}`, { headers: dbHeaders })).json();
const post = (body, headers = {}) =>
  fetch(`${BASE}/api/signup`, { method: 'POST', headers: { 'content-type': 'application/json', origin: BASE, ...headers }, body: JSON.stringify(body) });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();

// 1. New email, arriving from an ad with UTM tags, then signing up on a product page.
await page.goto(`${BASE}/?utm_source=instagram&utm_medium=paid_social&utm_campaign=prelaunch&utm_content=reel1&fbclid=QA${stamp}`);
await page.goto(`${BASE}/quikwash`);
await page.getByRole('button', { name: "Notify me when it's ready" }).click();
const dialog = page.getByRole('dialog');
check('popup opens from the hero button', await dialog.isVisible());
check('title names the product', (await dialog.locator('#notify-title').textContent()) === 'Get notified when Quikwash launches');
await dialog.getByLabel('Email address').fill(email.toUpperCase());
await dialog.getByRole('button', { name: 'Notify me' }).click();
await dialog.getByText("You're in. Thank you.").waitFor();
check('new email: success state', true);
check('price question names the product', await dialog.getByText('At ₹250 for 1 litre, would you buy Quikwash at launch?').isVisible());
await dialog.getByRole('button', { name: 'Maybe' }).click();
await dialog.getByText('That helps a lot. Thank you!').waitFor();
check('answer: thank-you state', true);
await page.waitForTimeout(500);
let r = await rows(email);
check('one row, email stored lower-case', r.length === 1 && r[0].email === email, JSON.stringify(r[0]?.email));
check('products = [quikwash]', JSON.stringify(r[0]?.products) === '["quikwash"]', JSON.stringify(r[0]?.products));
check('UTM first touch captured', r[0]?.utm_source === 'instagram' && r[0]?.utm_medium === 'paid_social' && r[0]?.utm_campaign === 'prelaunch' && r[0]?.utm_content === 'reel1');
check('fbclid captured', r[0]?.fbclid === `QA${stamp}`);
check('first_page = / and last_page = /quikwash', r[0]?.first_page === '/' && r[0]?.last_page === '/quikwash', `${r[0]?.first_page} ${r[0]?.last_page}`);
check('answer stored', r[0]?.answers?.price_quikwash === 'maybe', JSON.stringify(r[0]?.answers));
check('user agent stored', typeof r[0]?.user_agent === 'string' && r[0].user_agent.length > 10);
await dialog.getByRole('button', { name: 'Close' }).last().click();
check('Close button closes the popup', !(await dialog.isVisible()));

// 2. Same email again, for a different product, from a homepage card: same success, no duplicate.
await page.goto(`${BASE}/?utm_source=google`);
await page.getByRole('button', { name: 'Notify me when Everyday Wash launches' }).click();
check('card button opens popup for that product', (await dialog.locator('#notify-title').textContent()) === 'Get notified when Everyday Wash launches');
await dialog.getByLabel('Email address').fill(email);
await dialog.getByRole('button', { name: 'Notify me' }).click();
await dialog.getByText("You're in. Thank you.").waitFor();
check('repeat email: same success state, no error', !(await dialog.locator('#notify-error').isVisible()));
r = await rows(email);
check('still one row', r.length === 1);
check('products merged', JSON.stringify(r[0]?.products) === '["everyday-wash","quikwash"]', JSON.stringify(r[0]?.products));
check('first-touch UTM kept (not overwritten by google)', r[0]?.utm_source === 'instagram');
await page.keyboard.press('Escape');
check('Esc closes the popup', !(await dialog.isVisible()));

// 3. Invalid email: plain-language inline error, nothing sent.
await page.goto(`${BASE}/why-twist`);
await page.getByRole('button', { name: 'Notify me' }).first().click();
check('non-product page popup says "Twist"', (await dialog.locator('#notify-title').textContent()) === 'Get notified when Twist launches');
await dialog.getByLabel('Email address').fill('name@gmail');
await dialog.getByRole('button', { name: 'Notify me' }).click();
const err = dialog.locator('#notify-error');
check('invalid email: inline error shown', await err.isVisible(), await err.textContent());
check('input marked invalid', (await dialog.getByLabel('Email address').getAttribute('aria-invalid')) === 'true');
await dialog.getByLabel('Email address').fill('');
await dialog.getByRole('button', { name: 'Notify me' }).click();
check('empty email: asks for an address', (await err.textContent()) === 'Please enter your email address.');
// Tap outside (on the backdrop) closes it.
await page.mouse.click(195, 40);
check('tap outside closes the popup', !(await dialog.isVisible()));

// 4. #notify deep link, and "any" signup answering the first-choice question.
await page.goto(`${BASE}/undergarment-wash#notify`);
check('#notify opens the popup on load', await dialog.isVisible());
check('#notify uses the page product', (await dialog.locator('#notify-title').textContent()) === 'Get notified when Undergarment Wash launches');
await page.keyboard.press('Escape');
const hashGone = await page.waitForFunction(() => location.hash === '', null, { timeout: 2000 }).then(() => true, () => false);
check('closing removes #notify from the URL', hashGone, page.url());
const anyEmail = `qa.any.${stamp}@example.com`;
await page.goto(`${BASE}/about#notify`);
await dialog.getByLabel('Email address').fill(anyEmail);
await dialog.getByRole('button', { name: 'Notify me' }).click();
await dialog.getByText('Which wash would you try first?').waitFor();
await dialog.getByRole('button', { name: 'Undergarment Wash' }).click();
await dialog.getByText('That helps a lot. Thank you!').waitFor();
await page.waitForTimeout(500);
r = await rows(anyEmail);
check('"any" signup stored with first_choice answer', JSON.stringify(r[0]?.products) === '["any"]' && r[0]?.answers?.first_choice === 'undergarment-wash', JSON.stringify(r[0]));

// 5. Server-side checks (bypassing the browser).
const hp = `qa.bot.${stamp}@example.com`;
let res = await post({ email: hp, product: 'any', page: '/', website: 'https://spam.example' });
check('honeypot: looks like success to the bot', res.status === 200);
check('honeypot: nothing stored', (await rows(hp)).length === 0);
res = await post({ email: 'not-an-email', product: 'any', page: '/' });
check('server rejects invalid email', res.status === 400);
res = await post({ email: `qa.x.${stamp}@example.com`, product: 'any' }, { origin: 'https://evil.example' });
check('server rejects other origins', res.status === 403);
res = await post({ token: 'forged.token', question: 'first_choice', answer: 'quikwash' });
check('server rejects a forged answer token', res.status === 401);

// 6. Rate limit: 5 attempts per 10 minutes per IP.
const ip = `203.0.113.${stamp % 250}`;
const statuses = [];
for (let i = 0; i < 7; i++) {
  const x = await post({ email: `qa.rl.${stamp}.${i}@example.com`, product: 'any', page: '/' }, { 'cf-connecting-ip': ip });
  statuses.push(x.status);
}
check('rate limit kicks in after 5 attempts', statuses.slice(0, 5).every((s) => s === 200) && statuses.slice(5).every((s) => s === 429), statuses.join(','));

await browser.close();
console.log(failures ? `\n${failures} check(s) failed` : '\nAll checks passed');
process.exit(failures ? 1 : 0);

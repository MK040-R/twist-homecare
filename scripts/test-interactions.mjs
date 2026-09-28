// Checks the interactive pieces against the brief: accordions, tabs, carousels, tap targets, reduced motion.
// Usage: BASE_URL=http://localhost:8787 node scripts/test-interactions.mjs
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:8787';
let failures = 0;
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`);
  if (!ok) failures++;
};
const browser = await chromium.launch();

// ---- Mobile ----
const m = await (await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })).newPage();
await m.goto(`${BASE}/`);

// Problems accordion: first open by default, one at a time, tapping the open one closes it.
const probs = m.locator('.acc .ptab');
const expanded = async (loc) => (await loc.evaluateAll((els) => els.map((e) => e.getAttribute('aria-expanded')))).join('');
check('problems: first open by default', (await expanded(probs)) === 'truefalsefalsefalsefalsefalse');
await probs.nth(2).click();
check('problems: tapping another opens it and closes the first', (await expanded(probs)) === 'falsefalsetruefalsefalsefalse');
await probs.nth(2).click();
check('problems: tapping the open one closes it', !(await expanded(probs)).includes('true'));
check('problems: panel hidden when closed', await m.locator('#prob-m-2').isHidden());

// FAQ accordion
const faqs = m.locator('.faq-q');
check('FAQ: first open by default', (await faqs.first().getAttribute('aria-expanded')) === 'true');
await faqs.nth(3).click();
check('FAQ: one open at a time', (await expanded(faqs)) === 'falsefalsefalsetruefalsefalse');

// Carousel dots follow the scroll and can be tapped.
const car = m.locator('.cards .car');
const dots = m.locator('.cards .dot');
await dots.nth(2).click();
await m.waitForTimeout(700);
check('carousel: tapping a dot scrolls to that card', (await car.evaluate((el) => el.scrollLeft)) > 400);
check('carousel: tapped dot becomes current', (await dots.nth(2).getAttribute('aria-current')) === 'true');
await car.evaluate((el) => el.scrollTo({ left: 0 }));
await m.waitForTimeout(400);
check('carousel: dots follow the scroll', (await dots.nth(0).getAttribute('aria-current')) === 'true');
check('carousel: dots are labelled', (await dots.nth(1).getAttribute('aria-label')) === 'Show Quikwash');
await car.focus();
await m.keyboard.press('ArrowRight');
await m.waitForTimeout(400);
check('carousel: scrolls with the keyboard', (await car.evaluate((el) => el.scrollLeft)) > 0);

// Tap targets: every button and link that is visible is at least 44px tall (inline text links excepted).
const small = await m.evaluate(() => {
  const out = [];
  for (const el of document.querySelectorAll('button, a')) {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height || getComputedStyle(el).visibility === 'hidden') continue;
    if (el.closest('.prose, .body, p')) continue; // links inside running text
    if (el.classList.contains('skip')) continue;
    if (r.height < 43.5) out.push(`${el.tagName} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30)}" ${Math.round(r.height)}px`);
  }
  return out;
});
check('tap targets >= 44px on the homepage', small.length === 0, small.join('; '));

// No 100vh anywhere in the shipped CSS.
const cssText = await m.evaluate(async () => {
  let t = '';
  for (const s of document.styleSheets) { try { for (const r of s.cssRules) t += r.cssText; } catch {} }
  return t;
});
check('no 100vh in CSS', !/100vh/.test(cssText));

// No horizontal page scroll at 320px (smallest common phone width).
const narrow = await (await browser.newContext({ viewport: { width: 320, height: 700 } })).newPage();
for (const path of ['/', '/quikwash', '/everyday-wash', '/undergarment-wash', '/why-twist', '/blog', '/about']) {
  await narrow.goto(`${BASE}${path}`);
  const overflow = await narrow.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check(`no sideways scroll at 320px: ${path}`, overflow <= 0, `${overflow}px`);
}

// ---- Desktop ----
const d = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await d.goto(`${BASE}/`);
const tabs = d.locator('[role="tab"]');
const selected = async () => (await tabs.evaluateAll((els) => els.map((e) => e.getAttribute('aria-selected')))).indexOf('true');
check('tabs: first selected by default', (await selected()) === 0);
await tabs.nth(3).click();
check('tabs: click selects', (await selected()) === 3 && (await d.locator('#prob-d-3').isVisible()));
await tabs.nth(3).click();
check('tabs: one is always selected', (await selected()) === 3);
await d.keyboard.press('ArrowDown');
check('tabs: arrow keys move the selection', (await selected()) === 4);
await d.keyboard.press('Home');
check('tabs: Home goes to the first', (await selected()) === 0);
check('desktop: cards shown as a row of three', (await d.locator('.cards .car').evaluate((el) => getComputedStyle(el).display)) === 'grid');

// Focus is visible.
await d.keyboard.press('Tab');
const outline = await d.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
check('focus ring is visible', outline !== 'none', outline);

// Popup: focus is trapped and returns to the button that opened it.
await d.goto(`${BASE}/quikwash`);
const opener = d.getByRole('button', { name: "Notify me when it's ready" });
await opener.click();
for (let i = 0; i < 6; i++) await d.keyboard.press('Tab');
check('popup: focus stays inside', await d.evaluate(() => !!document.activeElement.closest('dialog')));
await d.keyboard.press('Escape');
check('popup: focus returns to the opener', await opener.evaluate((el) => el === document.activeElement));

// Reduced motion: smooth scrolling is switched off.
const rm = await (await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })).newPage();
await rm.goto(`${BASE}/`);
check('reduced motion: no smooth scrolling', (await rm.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)) === 'auto');

await browser.close();
console.log(failures ? `\n${failures} check(s) failed` : '\nAll checks passed');
process.exit(failures ? 1 : 0);

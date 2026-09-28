// Full-page screenshots of every route at 390 x 844 and 1440 x 900, placed side by side
// with the matching design screenshot. Output: qa/<page>-<mobile|desktop>.png
//
// Usage: npm run build && npm run qa:screens [-- page1 page2 ...]
import http from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const designDir = path.join(root, 'design-handoff', 'screenshots');
const outDir = path.join(root, 'qa');

const PAGES = [
  { name: 'home', route: '/' },
  { name: 'quikwash', route: '/quikwash' },
  { name: 'everyday-wash', route: '/everyday-wash' },
  { name: 'undergarment-wash', route: '/undergarment-wash' },
  { name: 'why-twist', route: '/why-twist' },
  { name: 'blog', route: '/blog' },
  { name: 'about', route: '/about' },
  { name: 'blog-post', route: '/blog/made-for-the-water-you-actually-wash-in', noDesign: true },
  { name: 'privacy', route: '/privacy', noDesign: true },
  { name: 'terms', route: '/terms', noDesign: true },
  { name: '404', route: '/this-page-does-not-exist', noDesign: true },
];
const VIEWPORTS = [
  { key: 'mobile', width: 390, height: 844 },
  { key: 'desktop', width: 1440, height: 900 },
];

const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.avif': 'image/avif', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };

async function resolveFile(urlPath) {
  const p = decodeURIComponent(urlPath.split('?')[0]);
  const candidates = p === '/' ? ['index.html'] : [p.slice(1), `${p.slice(1)}.html`, path.join(p.slice(1), 'index.html')];
  for (const c of candidates) {
    const f = path.join(dist, c);
    if (existsSync(f) && (await stat(f)).isFile()) return f;
  }
  return null;
}

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/api/')) {
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end('{"ok":true,"token":"qa"}');
  }
  const file = await resolveFile(req.url);
  if (!file) {
    res.writeHead(404, { 'content-type': 'text/html' });
    return res.end(await readFile(path.join(dist, '404.html')).catch(() => 'Not found'));
  }
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
  res.end(await readFile(file));
});
await new Promise((r) => server.listen(4399, r));

const only = process.argv.slice(2);
const pages = only.length ? PAGES.filter((p) => only.includes(p.name)) : PAGES;
await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });

for (const page of pages) {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
    const tab = await ctx.newPage();
    await tab.goto(`http://localhost:4399${page.route}`, { waitUntil: 'networkidle' });
    await tab.evaluate(async () => {
      // Scroll through the page so lazy images load, then return to the top.
      for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); }
      // Wait for visible images only (hidden mobile/desktop variants never load), at most 5 s.
      const visible = [...document.images].filter((img) => img.offsetParent !== null && !img.complete);
      await Promise.race([
        Promise.all(visible.map((img) => new Promise((r) => { img.onload = img.onerror = r; }))),
        new Promise((r) => setTimeout(r, 5000)),
      ]);
      window.scrollTo(0, 0);
      await document.fonts.ready;
    });
    await tab.waitForLoadState('networkidle');
    const shot = await tab.screenshot({ fullPage: true });
    await ctx.close();

    const out = path.join(outDir, `${page.name}-${vp.key}.png`);
    const design = path.join(designDir, `${page.name}-${vp.key}.png`);
    if (page.noDesign || !existsSync(design)) {
      await sharp(shot).toFile(out);
    } else {
      const a = await sharp(design).metadata();
      const b = await sharp(shot).metadata();
      const gap = 24;
      const label = (text, w) => Buffer.from(`<svg width="${w}" height="40"><text x="0" y="28" font-family="sans-serif" font-size="22" fill="#2D3370">${text}</text></svg>`);
      const height = Math.max(a.height, b.height) + 40;
      await sharp({ create: { width: a.width + b.width + gap, height, channels: 3, background: '#ffffff' } })
        .composite([
          { input: label('Design', a.width), left: 0, top: 0 },
          { input: label('Build', b.width), left: a.width + gap, top: 0 },
          { input: design, left: 0, top: 40 },
          { input: shot, left: a.width + gap, top: 40 },
        ])
        .png()
        .toFile(out);
    }
    console.log('wrote', path.relative(root, out));
  }
}
await browser.close();
server.close();

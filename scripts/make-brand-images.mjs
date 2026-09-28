// Builds the PNG icons and the 1200 x 630 share image from files already in the repo.
// Run after scripts/make-icons.py: node scripts/make-brand-images.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const r = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url));
const INK = '#2D3370';

await sharp(r('scripts/icon-t.svg')).resize(32, 32).png().toFile(r('public/favicon-32.png'));
await sharp(r('scripts/icon-full.svg')).resize(180, 180).png().toFile(r('public/apple-touch-icon.png'));

// Share image: the three bottles on ink, standing on one floor line, Everyday Wash in the centre and largest.
const W = 1200, H = 630, floor = 560;
const bottles = [
  { file: 'src/assets/bottle-quikwash.webp', h: 380, cx: 420 },
  { file: 'src/assets/bottle-undergarment.webp', h: 310, cx: 790 },
  { file: 'src/assets/bottle-everyday.webp', h: 480, cx: 600 },
];
const layers = [];
for (const b of bottles) {
  const img = sharp(r(b.file)).resize({ height: b.h });
  const { width } = await img.clone().metadata().then(async () => (await img.clone().toBuffer({ resolveWithObject: true })).info);
  const left = Math.round(b.cx - width / 2), top = floor - b.h;
  // Soft shadow under each bottle.
  const shadow = Buffer.from(`<svg width="${W}" height="${H}"><defs><filter id="f" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter></defs><ellipse cx="${b.cx}" cy="${floor + 6}" rx="${width * 0.55}" ry="14" fill="rgba(0,0,0,.45)" filter="url(#f)"/></svg>`);
  layers.push({ input: shadow, left: 0, top: 0 }, { input: await img.toBuffer(), left, top });
}
await sharp({ create: { width: W, height: H, channels: 4, background: INK } })
  .composite(layers)
  .png({ compressionLevel: 9, palette: false })
  .toFile(r('public/og.png'));
console.log('wrote public/favicon-32.png, public/apple-touch-icon.png, public/og.png');

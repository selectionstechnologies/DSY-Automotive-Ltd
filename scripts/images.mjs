// Image step: turns the masters in src/assets/photos/ into responsive AVIF + WebP files in public/photos/,
// and draws og-image.jpg (1200x630) and apple-touch-icon.png. Run with `npm run images` after adding a photo.
// Masters are never upscaled, so a width larger than the source is skipped.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { images } from '../src/data/images.js';

const WIDTHS = [640, 1024, 1600, 2400];
const srcDir = path.resolve('src/assets/photos');
const outDir = path.resolve('public/photos');
const pub = path.resolve('public');

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const img of images) {
  const input = path.join(srcDir, img.file);
  const { width } = await sharp(input).metadata();
  const sizes = [...WIDTHS.filter((w) => w < width), width];
  for (const w of sizes) {
    const base = sharp(input).resize({ width: w });
    await base.clone().avif({ quality: 52 }).toFile(path.join(outDir, `${img.id}-${w}.avif`));
    await base.clone().webp({ quality: 72 }).toFile(path.join(outDir, `${img.id}-${w}.webp`));
  }
  console.log(`  ${img.id}: ${sizes.join(', ')}w`);
}

// Open Graph image: the og photo cropped on the signage, with a yellow brand bar along the bottom
const og = images.find((i) => i.usage.includes('og'));
if (og) {
  const bar = Buffer.from(
    `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect y="600" width="1200" height="30" fill="#F8D71A"/></svg>`
  );
  await sharp(path.join(srcDir, og.file))
    .extract(og.ogCrop)
    .resize(1200, 630)
    .composite([{ input: bar }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(pub, 'og-image.jpg'));
  console.log('  og-image.jpg');
}

await sharp(path.join(pub, 'favicon.svg')).resize(180, 180).png().toFile(path.join(pub, 'apple-touch-icon.png'));
console.log('  apple-touch-icon.png');

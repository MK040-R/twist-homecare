// Copy for the three product pages. Shared layout: src/components/product/*.
import type { ProductId } from './site';
import { LAUNCH } from './site';

import bottleEveryday from '../assets/bottle-everyday.webp';
import bottleQuikwash from '../assets/bottle-quikwash.webp';
import bottleUndergarment from '../assets/bottle-undergarment.webp';
import qwHow1 from '../assets/quikwash-how-1.webp';
import qwHow2 from '../assets/quikwash-how-2.webp';
import qwHow3 from '../assets/quikwash-how-3.webp';
import ewHow1 from '../assets/everyday-how-1.webp';
import ewHow2 from '../assets/everyday-how-2.webp';
import ewHow3 from '../assets/everyday-how-3-tap.webp';
import uwHow1 from '../assets/undergarment-how-1.webp';
import uwHow2 from '../assets/undergarment-how-2.webp';
import uwHow3 from '../assets/undergarment-how-3.webp';

export const BOTTLES: Record<ProductId, ImageMetadata> = {
  'everyday-wash': bottleEveryday,
  quikwash: bottleQuikwash,
  'undergarment-wash': bottleUndergarment,
};

// "The other two" cards: label, line, bottle height (mobile / desktop).
export const OTHER_CARD: Record<ProductId, { label: string; line: string; hM: number; hD: number }> = {
  'everyday-wash': { label: 'Everyday loads', line: 'For the daily pile, in any machine.', hM: 112, hD: 210 },
  quikwash: { label: 'Sweat and odour', line: "For clothes that smell more than they're dirty.", hM: 112, hD: 210 },
  'undergarment-wash': { label: 'Hand wash', line: 'For intimate stains, washed by hand.', hM: 96, hD: 180 },
};

type Icon = 'shirt' | 'drop' | 'leaf' | 'glass' | 'sparkle' | 'list' | 'bell';

export interface ProductPageData {
  id: ProductId;
  meta: { title: string; description: string };
  hero: {
    wordmark: string;
    wmM: { size: number; top: number };
    wmD: { size: number; top: number };
    bottleM: number;
    bottleD: number;
    brief?: boolean; // the line drawing above the Undergarment Wash wordmark
    callouts: { text: string; side: 'l' | 'r'; top: number }[];
    h1: string;
    body: string;
    ticks: string[];
  };
  how: {
    body: string;
    cards: { img: ImageMetadata; title: string; body: string }[];
  };
  extras: { icon: Icon; title: string; body: string }[];
  inBottle: { icon: Icon; text: string }[];
  faqs: [string, string][];
}

const EXTRA_ICONS: Icon[] = ['shirt', 'drop', 'leaf', 'glass'];
const extras = (items: [string, string][]) => items.map(([title, body], i) => ({ icon: EXTRA_ICONS[i], title, body }));
const BOTTLE_ICONS: Icon[] = ['sparkle', 'list', 'bell'];
const inBottle = (items: string[]) => items.map((text, i) => ({ icon: BOTTLE_ICONS[i], text }));
const whenFaq: [string, string] = ['When can I buy it?', `We're aiming for ${LAUNCH}. Leave your email and you'll hear the day it's ready.`];
const priceFaq: [string, string] = ['How much will it cost?', "We'll share the price with everyone on the list before launch."];

export const QUIKWASH: ProductPageData = {
  id: 'quikwash',
  meta: {
    title: 'Quikwash: no re-stink, even after 50 washes · Twist',
    description: "The wash for clothes that smell more than they're dirty: gym wear, office shirts, anything you've worn once.",
  },
  hero: {
    wordmark: 'Quikwash',
    wmM: { size: 82, top: 28 },
    wmD: { size: 230, top: 40 },
    bottleM: 200,
    bottleD: 350,
    callouts: [
      { text: 'Keeps · colour and stretch', side: 'l', top: 330 },
      { text: 'Removes · odour-causing bacteria', side: 'l', top: 450 },
      { text: 'Dissolves · under 2 minutes', side: 'r', top: 360 },
      { text: 'For · gym wear and lightly worn clothes', side: 'r', top: 470 },
    ],
    h1: 'No re-stink, even after 50 washes.',
    body: "The wash for clothes that smell more than they're dirty: gym wear, office shirts, anything you've worn once.",
    ticks: ['Removes odour-causing bacteria', 'Keeps colour and stretch', 'Dissolves in under 2 minutes'],
  },
  how: {
    body: "Most detergents are built to lift the dirt you can see. Quikwash is built for the body oil you can't see, because that's what the smell feeds on.",
    cards: [
      { img: qwHow1, title: 'Lipase breaks down body oil', body: 'Lipase is an enzyme that cuts skin oil into smaller pieces that dissolve in the wash water, so the oil rinses out from between the fibres instead of staying trapped inside them.' },
      { img: qwHow2, title: 'Odour bacteria go out with it', body: "With the oil gone, odour-causing bacteria lose what they feed on, and they're rinsed away in the same wash. That's why the smell doesn't come back when you sweat again." },
      { img: qwHow3, title: 'A concentrated formula that starts fast', body: 'It dissolves in under 2 minutes, even in cold, hard tap water, so the enzymes get to work from the very start of the wash.' },
    ],
  },
  extras: extras([
    ['Keeps colour and stretch', 'Kind to activewear and stretch fabrics, wash after wash.'],
    ['Works in any Indian water', 'Hard or soft, cold or warm, straight from the tap.'],
    ['Gentle on sweaty skin', 'Skin-safe for the clothes you work out in.'],
    ['40 washes a litre', 'Concentrated, so 25 ml does a full load.'],
  ]),
  inBottle: inBottle([
    'Naturally derived cleaning agents',
    'Free from phosphates, parabens, bleach and optical brighteners',
    'Three IFRA-certified scents, or fragrance-free',
  ]),
  faqs: [
    ['Can I use Quikwash for everyday clothes?', "Yes, for anything that's more sweaty than dirty: office shirts, T-shirts, kids' school clothes. For heavily soiled loads, bedsheets and towels, use Everyday Wash."],
    ['How is it different from my regular detergent?', 'Regular detergents are built to lift the dirt you can see. Quikwash is built to break down the skin oil that sweat leaves deep in the fabric, which is what brings the smell back.'],
    ['Does it work in cold water?', 'Yes. It works in tap water from 10 to 40°C, hard or soft.'],
    ['Will my clothes smell of fragrance?', "Lightly, if you pick one of the three scents. There's also a fragrance-free version."],
    priceFaq,
    whenFaq,
  ],
};

export const EVERYDAY: ProductPageData = {
  id: 'everyday-wash',
  meta: {
    title: 'Everyday Wash: protects against 8 signs of fabric ageing · Twist',
    description: 'The everyday wash that gets clothes clean without wearing them out. For cottons, blends, bedsheets and towels, in any machine.',
  },
  hero: {
    wordmark: 'Everyday Wash',
    wmM: { size: 52, top: 40 },
    wmD: { size: 170, top: 64 },
    bottleM: 196,
    bottleD: 330,
    callouts: [
      { text: 'Keeps · colours bright', side: 'l', top: 330 },
      { text: 'Removes · all kinds of Indian stains', side: 'l', top: 450 },
      { text: 'Gentle · on cottons and blends', side: 'r', top: 360 },
      { text: 'For · every machine', side: 'r', top: 470 },
    ],
    h1: 'Protects against 8 signs of fabric ageing.',
    body: 'The everyday wash that gets clothes clean without wearing them out. For cottons, blends, bedsheets and towels, in any machine.',
    ticks: ['Removes sweat, oil, tea, turmeric and everyday dirt', 'Keeps colours bright and whites from greying', 'Works in front-load, top-load and HE machines'],
  },
  how: {
    body: "Most detergents clean hard and leave the fabric to fend for itself. Everyday Wash is built to clean just as well while looking after the fibres it's cleaning.",
    cards: [
      { img: ewHow1, title: 'Enzymes matched to Indian stains', body: 'Protease, amylase and lipase each break down a different kind of stain, from sweat and food to oil and turmeric, so clothes come clean without harsh chemistry or hard scrubbing.' },
      { img: ewHow2, title: 'Care built into the clean', body: 'Cellulase smooths away the fuzz that turns into pills and keeps colours looking fresh, balanced so it never costs the fabric its strength.' },
      { img: ewHow3, title: 'Made for Indian water', body: "It cleans in hard water and at tap temperature, 10 to 40°C, so you don't need hot washes or an extra scoop of detergent." },
    ],
  },
  extras: extras([
    ['Removes all kinds of Indian stains', 'Sweat and blood, oil and grease, tea, coffee and turmeric, and everyday dirt.'],
    ['One formula for every machine', 'Front-load, top-load and HE.'],
    ['Safe for baby clothes', 'And for pet bedding too.'],
    ['40 washes a litre', 'Concentrated.'],
  ]),
  inBottle: inBottle([
    'Naturally derived cleaning agents',
    'Free from phosphates, parabens, bleach and optical brighteners',
    'Three IFRA-certified scents, or fragrance-free',
  ]),
  faqs: [
    ['Can I wash whites and colours together?', 'Yes. Everyday Wash is made to stop whites greying and colours fading, so you can wash them the same way.'],
    ['Will it get out tough stains like turmeric?', "It's made for all kinds of stains Indian laundry gets: sweat and blood, oil and grease, tea, coffee and turmeric, and everyday dirt."],
    ['Does it work in a top-load machine?', 'Yes. It works in front-load, top-load and HE machines.'],
    ['Can I use it for gym clothes?', 'Yes. But if the smell keeps coming back after a wash, Quikwash is made for exactly that.'],
    priceFaq,
    whenFaq,
  ],
};

export const UNDERGARMENT: ProductPageData = {
  id: 'undergarment-wash',
  meta: {
    title: 'Undergarment Wash: 6 intimate stains, cold hand wash · Twist',
    description: 'For the stains bar soap leaves behind: discharge, period blood, sweat, body oil, urine and faecal traces.',
  },
  hero: {
    wordmark: 'Undergarment Wash',
    wmM: { size: 40, top: 84 },
    wmD: { size: 116, top: 144 },
    bottleM: 160,
    bottleD: 270,
    brief: true,
    callouts: [
      { text: 'Tap water · by hand', side: 'l', top: 360 },
      { text: 'Rinses · with no residue', side: 'l', top: 470 },
      { text: 'pH · matched to intimate skin', side: 'r', top: 380 },
      { text: 'Fragrance-free', side: 'r', top: 480 },
    ],
    h1: 'Removes 6 intimate stains in a cold hand wash.',
    body: 'For the stains bar soap leaves behind: discharge, period blood, sweat, body oil, urine and faecal traces. Works on heavy-flow days.',
    ticks: ['Cold water, by hand, no scrubbing', 'Rinses out with no detectable residue', 'pH matched to intimate skin'],
  },
  how: {
    body: 'Bar soap is made to clean skin. Undergarment Wash is made for what ends up on the fabric, and for the skin that fabric sits against.',
    cards: [
      { img: uwHow1, title: 'Protease for protein stains', body: 'Protease is an enzyme that breaks the proteins in discharge, blood and sweat into small pieces that rinse away in cold water, with no scrubbing and no hot water.' },
      { img: uwHow2, title: 'Rinses out completely', body: 'Low foam, so it rinses clean in seconds and leaves no detectable residue on the fabric that sits against your skin.' },
      { img: uwHow3, title: 'Gentle on intimate skin', body: 'The pH is matched to intimate skin, and it reduces odour-causing bacteria and fungi before rinsing away.' },
    ],
  },
  extras: extras([
    ['One pump per garment', 'Easy to dose, nothing to measure.'],
    ['Fragrance-free', 'Nothing extra against sensitive skin.'],
    ['Gentle on delicates', 'Cotton, modal, elastane and lace, wash after wash.'],
    ['Safe for daily use', 'Skin-tested on washed fabric.'],
  ]),
  inBottle: inBottle([
    'Naturally derived cleaning agents',
    'Free from phosphates, parabens, bleach and optical brighteners',
  ]),
  faqs: [
    ['Does it work on period stains?', 'Yes, including heavy-flow days. Wash in cold water, because heat sets blood stains.'],
    ['Can I use it in the washing machine?', "It's made for hand washing: one pump per garment, rub gently, rinse."],
    ['Is it safe to use every day?', "Yes. It's gentle enough for daily use on intimate skin, and rinses out with no detectable residue."],
    ['Why is there no fragrance?', 'Fragrance is one more thing sitting against sensitive skin, so we left it out.'],
    ['Can I use it on bras and lingerie?', "Yes. It's gentle on cotton, modal, elastane and lace."],
    whenFaq,
  ],
};

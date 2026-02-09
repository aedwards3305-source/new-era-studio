import type { Product, ProductImage, ProductVariant, Collection } from '@/lib/types';

// ---------------------------------------------------------------------------
// Placeholder image helper -- generates luxury-toned gradient SVG data URLs
// ---------------------------------------------------------------------------

function placeholderImage(id: string, label: string, colorIndex: number): ProductImage {
  const colors: [string, string][] = [
    ['#3d302b', '#5c4038'], // warm rose-brown
    ['#4a3530', '#6b4e45'], // peach-toned brown
    ['#2d2926', '#4a3a35'], // soft espresso
    ['#3a2d2a', '#5a403a'], // dusty mauve-brown
  ];
  const [c1, c2] = colors[colorIndex % colors.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${c1}"/><stop offset="100%" style="stop-color:${c2}"/></linearGradient></defs><rect width="800" height="800" fill="url(#g)"/><text x="400" y="420" text-anchor="middle" fill="#f5c6aa" font-family="Georgia" font-size="28">${label}</text></svg>`;
  return {
    id,
    url: `data:image/svg+xml,${encodeURIComponent(svg)}`,
    altText: label,
    width: 800,
    height: 800,
  };
}

// ---------------------------------------------------------------------------
// Variant helpers
// ---------------------------------------------------------------------------

type LengthPrice = [string, number];

function makeVariants(
  productIndex: number,
  typeCode: string,
  textureCode: string,
  lengths: LengthPrice[],
  compareAtExtra: number = 20,
): ProductVariant[] {
  return lengths.map(([length, price], i) => ({
    id: `variant-${productIndex}-${i + 1}`,
    title: length,
    price: price.toFixed(2),
    compareAtPrice: (price + compareAtExtra).toFixed(2),
    available: true,
    selectedOptions: [{ name: 'Length', value: length }],
    sku: `NES-${typeCode}-${textureCode}-${length.replace('"', '')}`,
  }));
}

function priceRange(variants: ProductVariant[]) {
  const prices = variants.map((v) => parseFloat(v.price));
  return {
    minVariantPrice: { amount: Math.min(...prices).toFixed(2), currencyCode: 'USD' },
    maxVariantPrice: { amount: Math.max(...prices).toFixed(2), currencyCode: 'USD' },
  };
}

// ---------------------------------------------------------------------------
// Staggered dates (across the last ~3 months from a recent reference date)
// ---------------------------------------------------------------------------

function staggeredDate(index: number): string {
  const base = new Date('2026-02-09T12:00:00Z');
  const offsetDays = Math.floor((index / 17) * 90); // spread across ~90 days
  const d = new Date(base.getTime() - offsetDays * 86_400_000);
  return d.toISOString();
}

// ---------------------------------------------------------------------------
// Standard bundle lengths & base prices
// ---------------------------------------------------------------------------

const bundleLengths: string[] = [
  '12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"',
];
const baseBundlePrices: number[] = [65, 75, 85, 95, 105, 115, 125, 135, 145, 165];

function bundleLengthPrices(offset: number): LengthPrice[] {
  return bundleLengths.map((l, i) => [l, baseBundlePrices[i] + offset]);
}

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

const p1Images = [
  placeholderImage('img-1-1', 'Brazilian Straight Bundles - Front', 0),
  placeholderImage('img-1-2', 'Brazilian Straight Bundles - Side', 1),
  placeholderImage('img-1-3', 'Brazilian Straight Bundles - Close-Up', 2),
  placeholderImage('img-1-4', 'Brazilian Straight Bundles - Styled', 3),
];

const p1Variants = makeVariants(1, 'BND', 'STR', bundleLengthPrices(0));

const product1: Product = {
  id: 'product-1',
  handle: 'brazilian-straight-bundles',
  title: 'Brazilian Straight Bundles',
  description:
    'Indulge in our premium Brazilian Straight Bundles, crafted from 100% virgin human hair. Silky smooth from root to tip, these bundles offer a sleek, polished finish that drapes beautifully and blends seamlessly with all textures. Minimal shedding, no tangling, and lasting luster through countless washes.',
  descriptionHtml:
    '<p>Indulge in our premium <strong>Brazilian Straight Bundles</strong>, crafted from 100% virgin human hair. Silky smooth from root to tip, these bundles offer a sleek, polished finish that drapes beautifully and blends seamlessly with all textures.</p><ul><li>100% unprocessed virgin hair</li><li>True-to-length bundles</li><li>Minimal shedding &amp; tangle-free</li><li>Can be colored, bleached &amp; heat-styled</li></ul>',
  vendor: 'New Era Studio',
  productType: 'Bundles',
  tags: ['Straight', 'Bundles', 'Best Seller'],
  images: p1Images,
  variants: p1Variants,
  options: [{ name: 'Length', values: bundleLengths }],
  priceRange: priceRange(p1Variants),
  featuredImage: p1Images[0],
  availableForSale: true,
  createdAt: staggeredDate(0),
};

// --- Product 2: Body Wave Bundles ---

const p2Images = [
  placeholderImage('img-2-1', 'Body Wave Bundles - Front', 1),
  placeholderImage('img-2-2', 'Body Wave Bundles - Side', 2),
  placeholderImage('img-2-3', 'Body Wave Bundles - Close-Up', 3),
];

const p2Variants = makeVariants(2, 'BND', 'BDW', bundleLengthPrices(5));

const product2: Product = {
  id: 'product-2',
  handle: 'body-wave-bundles',
  title: 'Body Wave Bundles',
  description:
    'Achieve effortless, red-carpet volume with our Body Wave Bundles. Each weft is hand-selected from ethically sourced virgin hair, delivering an S-shaped wave pattern that holds its bounce day after day. Perfect for those who crave dimension without the maintenance.',
  descriptionHtml:
    '<p>Achieve effortless, red-carpet volume with our <strong>Body Wave Bundles</strong>. Each weft is hand-selected from ethically sourced virgin hair, delivering an S-shaped wave pattern that holds its bounce day after day.</p><ul><li>Luxurious S-wave pattern</li><li>Double-weft for fullness</li><li>No synthetic blends</li><li>Heat-safe up to 400 &deg;F</li></ul>',
  vendor: 'New Era Studio',
  productType: 'Bundles',
  tags: ['Body Wave', 'Bundles', 'Best Seller'],
  images: p2Images,
  variants: p2Variants,
  options: [{ name: 'Length', values: bundleLengths }],
  priceRange: priceRange(p2Variants),
  featuredImage: p2Images[0],
  availableForSale: true,
  createdAt: staggeredDate(1),
};

// --- Product 3: Deep Wave Bundles ---

const p3Images = [
  placeholderImage('img-3-1', 'Deep Wave Bundles - Front', 2),
  placeholderImage('img-3-2', 'Deep Wave Bundles - Side', 3),
  placeholderImage('img-3-3', 'Deep Wave Bundles - Close-Up', 0),
  placeholderImage('img-3-4', 'Deep Wave Bundles - Styled', 1),
];

const p3Variants = makeVariants(3, 'BND', 'DPW', bundleLengthPrices(10));

const product3: Product = {
  id: 'product-3',
  handle: 'deep-wave-bundles',
  title: 'Deep Wave Bundles',
  description:
    'Our Deep Wave Bundles deliver head-turning texture with a tight, defined wave pattern that exudes confidence. Made from 100% raw virgin hair, each bundle maintains its curl definition through washes and restyling. A show-stopping look for every occasion.',
  descriptionHtml:
    '<p>Our <strong>Deep Wave Bundles</strong> deliver head-turning texture with a tight, defined wave pattern that exudes confidence. Made from 100% raw virgin hair, each bundle maintains its curl definition through washes and restyling.</p><ul><li>Tight, defined deep-wave curl</li><li>Raw virgin hair &mdash; fully unprocessed</li><li>Weft reinforced to prevent shedding</li><li>Lasts 12+ months with proper care</li></ul>',
  vendor: 'New Era Studio',
  productType: 'Bundles',
  tags: ['Deep Wave', 'Bundles'],
  images: p3Images,
  variants: p3Variants,
  options: [{ name: 'Length', values: bundleLengths }],
  priceRange: priceRange(p3Variants),
  featuredImage: p3Images[0],
  availableForSale: true,
  createdAt: staggeredDate(2),
};

// --- Product 4: Loose Wave Bundles ---

const p4Images = [
  placeholderImage('img-4-1', 'Loose Wave Bundles - Front', 3),
  placeholderImage('img-4-2', 'Loose Wave Bundles - Side', 0),
  placeholderImage('img-4-3', 'Loose Wave Bundles - Close-Up', 1),
];

const p4Variants = makeVariants(4, 'BND', 'LSW', bundleLengthPrices(5));

const product4: Product = {
  id: 'product-4',
  handle: 'loose-wave-bundles',
  title: 'Loose Wave Bundles',
  description:
    'Embrace relaxed glamour with our Loose Wave Bundles. A gentle, cascading wave lends an air of effortless sophistication to any install. Lightweight, breathable wefts ensure all-day comfort while the virgin hair cuticles remain aligned for superior shine.',
  descriptionHtml:
    '<p>Embrace relaxed glamour with our <strong>Loose Wave Bundles</strong>. A gentle, cascading wave lends an air of effortless sophistication to any install. Lightweight, breathable wefts ensure all-day comfort while the virgin hair cuticles remain aligned for superior shine.</p><ul><li>Relaxed, flowing wave pattern</li><li>Cuticle-aligned virgin hair</li><li>Lightweight machine weft</li><li>Colors &amp; bleaches beautifully</li></ul>',
  vendor: 'New Era Studio',
  productType: 'Bundles',
  tags: ['Loose Wave', 'Bundles'],
  images: p4Images,
  variants: p4Variants,
  options: [{ name: 'Length', values: bundleLengths }],
  priceRange: priceRange(p4Variants),
  featuredImage: p4Images[0],
  availableForSale: true,
  createdAt: staggeredDate(3),
};

// --- Product 5: Water Wave Bundles ---

const p5Images = [
  placeholderImage('img-5-1', 'Water Wave Bundles - Front', 0),
  placeholderImage('img-5-2', 'Water Wave Bundles - Side', 2),
  placeholderImage('img-5-3', 'Water Wave Bundles - Close-Up', 3),
  placeholderImage('img-5-4', 'Water Wave Bundles - Styled', 1),
];

const p5Variants = makeVariants(5, 'BND', 'WTW', bundleLengthPrices(10));

const product5: Product = {
  id: 'product-5',
  handle: 'water-wave-bundles',
  title: 'Water Wave Bundles',
  description:
    'Make a splash with our Water Wave Bundles. This crimped wave texture mirrors the look of freshly wet curls, giving you a natural, voluminous style that turns heads. Premium virgin hair ensures tangle-free wear and easy maintenance from first install to last.',
  descriptionHtml:
    '<p>Make a splash with our <strong>Water Wave Bundles</strong>. This crimped wave texture mirrors the look of freshly wet curls, giving you a natural, voluminous style that turns heads.</p><ul><li>Crimped wet-look wave pattern</li><li>100% virgin human hair</li><li>Pre-plucked natural hairline</li><li>Easy to maintain &amp; restyle</li></ul>',
  vendor: 'New Era Studio',
  productType: 'Bundles',
  tags: ['Water Wave', 'Bundles', 'New Arrival'],
  images: p5Images,
  variants: p5Variants,
  options: [{ name: 'Length', values: bundleLengths }],
  priceRange: priceRange(p5Variants),
  featuredImage: p5Images[0],
  availableForSale: true,
  createdAt: staggeredDate(4),
};

// --- Product 6: Kinky Curly Bundles ---

const p6Images = [
  placeholderImage('img-6-1', 'Kinky Curly Bundles - Front', 1),
  placeholderImage('img-6-2', 'Kinky Curly Bundles - Side', 3),
  placeholderImage('img-6-3', 'Kinky Curly Bundles - Close-Up', 0),
];

const p6Variants = makeVariants(6, 'BND', 'KNC', bundleLengthPrices(15));

const product6: Product = {
  id: 'product-6',
  handle: 'kinky-curly-bundles',
  title: 'Kinky Curly Bundles',
  description:
    'Celebrate your natural texture with our Kinky Curly Bundles. This tight coil pattern mirrors 3C-4A curl types for the most authentic blend. Each bundle is densely packed for maximum volume, giving you a full, lush crown that commands attention.',
  descriptionHtml:
    '<p>Celebrate your natural texture with our <strong>Kinky Curly Bundles</strong>. This tight coil pattern mirrors 3C-4A curl types for the most authentic blend.</p><ul><li>Natural 3C-4A coil pattern</li><li>Dense weft for maximum volume</li><li>Ethically sourced virgin hair</li><li>Blends with natural hair seamlessly</li></ul>',
  vendor: 'New Era Studio',
  productType: 'Bundles',
  tags: ['Kinky Curly', 'Bundles'],
  images: p6Images,
  variants: p6Variants,
  options: [{ name: 'Length', values: bundleLengths }],
  priceRange: priceRange(p6Variants),
  featuredImage: p6Images[0],
  availableForSale: true,
  createdAt: staggeredDate(5),
};

// --- Product 7: 4x4 HD Lace Closure - Straight ---

const closureLengths: string[] = ['12"', '14"', '16"', '18"', '20"'];

const p7Images = [
  placeholderImage('img-7-1', '4x4 HD Lace Closure Straight - Front', 2),
  placeholderImage('img-7-2', '4x4 HD Lace Closure Straight - Top', 0),
  placeholderImage('img-7-3', '4x4 HD Lace Closure Straight - Close-Up', 1),
];

const p7Variants = makeVariants(
  7,
  'CLS',
  'STR',
  [['12"', 85], ['14"', 95], ['16"', 105], ['18"', 115], ['20"', 125]],
);

const product7: Product = {
  id: 'product-7',
  handle: '4x4-hd-lace-closure-straight',
  title: '4x4 HD Lace Closure - Straight',
  description:
    'Complete your install with our 4x4 HD Lace Closure in a sleek straight texture. The ultra-thin HD lace melts invisibly into any skin tone, creating the illusion of hair growing directly from your scalp. Free-part design allows versatile styling.',
  descriptionHtml:
    '<p>Complete your install with our <strong>4x4 HD Lace Closure</strong> in a sleek straight texture. The ultra-thin HD lace melts invisibly into any skin tone, creating the illusion of hair growing directly from your scalp.</p><ul><li>Invisible HD Swiss lace</li><li>Free-part versatility</li><li>Pre-plucked with baby hairs</li><li>Bleached knots included</li></ul>',
  vendor: 'New Era Studio',
  productType: 'Closures',
  tags: ['Straight', '4x4 Closure', 'Closures', 'HD Lace'],
  images: p7Images,
  variants: p7Variants,
  options: [{ name: 'Length', values: closureLengths }],
  priceRange: priceRange(p7Variants),
  featuredImage: p7Images[0],
  availableForSale: true,
  createdAt: staggeredDate(6),
};

// --- Product 8: 5x5 HD Lace Closure - Body Wave ---

const p8Images = [
  placeholderImage('img-8-1', '5x5 HD Lace Closure Body Wave - Front', 3),
  placeholderImage('img-8-2', '5x5 HD Lace Closure Body Wave - Top', 1),
  placeholderImage('img-8-3', '5x5 HD Lace Closure Body Wave - Close-Up', 2),
];

const p8Variants = makeVariants(
  8,
  'CLS',
  'BDW',
  [['12"', 95], ['14"', 105], ['16"', 115], ['18"', 125], ['20"', 135]],
);

const product8: Product = {
  id: 'product-8',
  handle: '5x5-hd-lace-closure-body-wave',
  title: '5x5 HD Lace Closure - Body Wave',
  description:
    'Elevate your body wave install with our 5x5 HD Lace Closure. The expanded parting space offers even more styling freedom, while the HD lace vanishes against the skin for a truly undetectable finish. Pre-plucked hairline with natural baby hairs included.',
  descriptionHtml:
    '<p>Elevate your body wave install with our <strong>5x5 HD Lace Closure</strong>. The expanded parting space offers even more styling freedom, while the HD lace vanishes against the skin for a truly undetectable finish.</p><ul><li>Wider 5x5 parting space</li><li>Body wave texture with lasting bounce</li><li>HD lace for all skin tones</li><li>Natural hairline &amp; baby hairs</li></ul>',
  vendor: 'New Era Studio',
  productType: 'Closures',
  tags: ['Body Wave', '5x5 Closure', 'Closures', 'HD Lace'],
  images: p8Images,
  variants: p8Variants,
  options: [{ name: 'Length', values: closureLengths }],
  priceRange: priceRange(p8Variants),
  featuredImage: p8Images[0],
  availableForSale: true,
  createdAt: staggeredDate(7),
};

// --- Product 9: 13x4 HD Lace Frontal - Straight ---

const frontalLengths: string[] = ['12"', '14"', '16"', '18"', '20"'];

const p9Images = [
  placeholderImage('img-9-1', '13x4 HD Lace Frontal Straight - Front', 0),
  placeholderImage('img-9-2', '13x4 HD Lace Frontal Straight - Side', 2),
  placeholderImage('img-9-3', '13x4 HD Lace Frontal Straight - Close-Up', 3),
  placeholderImage('img-9-4', '13x4 HD Lace Frontal Straight - Installed', 1),
];

const p9Variants = makeVariants(
  9,
  'FRT',
  'STR',
  [['12"', 125], ['14"', 140], ['16"', 155], ['18"', 170], ['20"', 185]],
);

const product9: Product = {
  id: 'product-9',
  handle: '13x4-hd-lace-frontal-straight',
  title: '13x4 HD Lace Frontal - Straight',
  description:
    'Our best-selling 13x4 HD Lace Frontal in straight texture delivers ear-to-ear coverage with an undetectable lace base. Style it swept back, side-parted, or center-parted -- the possibilities are limitless. This frontal is the foundation of a flawless sew-in.',
  descriptionHtml:
    '<p>Our best-selling <strong>13x4 HD Lace Frontal</strong> in straight texture delivers ear-to-ear coverage with an undetectable lace base. Style it swept back, side-parted, or center-parted &mdash; the possibilities are limitless.</p><ul><li>Ear-to-ear 13x4 coverage</li><li>HD Swiss lace melts on all skin tones</li><li>Pre-plucked &amp; bleached knots</li><li>100% virgin straight hair</li></ul>',
  vendor: 'New Era Studio',
  productType: 'Frontals',
  tags: ['Straight', '13x4 Frontal', 'Frontals', 'HD Lace', 'Best Seller'],
  images: p9Images,
  variants: p9Variants,
  options: [{ name: 'Length', values: frontalLengths }],
  priceRange: priceRange(p9Variants),
  featuredImage: p9Images[0],
  availableForSale: true,
  createdAt: staggeredDate(8),
};

// --- Product 10: 13x6 HD Lace Frontal - Body Wave ---

const p10Images = [
  placeholderImage('img-10-1', '13x6 HD Lace Frontal Body Wave - Front', 1),
  placeholderImage('img-10-2', '13x6 HD Lace Frontal Body Wave - Side', 3),
  placeholderImage('img-10-3', '13x6 HD Lace Frontal Body Wave - Close-Up', 0),
];

const p10Variants = makeVariants(
  10,
  'FRT',
  'BDW',
  [['12"', 145], ['14"', 160], ['16"', 175], ['18"', 190], ['20"', 205]],
);

const product10: Product = {
  id: 'product-10',
  handle: '13x6-hd-lace-frontal-body-wave',
  title: '13x6 HD Lace Frontal - Body Wave',
  description:
    'Take your body wave install to the next level with our 13x6 HD Lace Frontal. The deep 6-inch parting space gives you the freedom to part deeply and sweep hair behind the ears for the most natural-looking results. Luxury-grade HD lace for an invisible melt.',
  descriptionHtml:
    '<p>Take your body wave install to the next level with our <strong>13x6 HD Lace Frontal</strong>. The deep 6-inch parting space gives you the freedom to part deeply and sweep hair behind the ears for the most natural-looking results.</p><ul><li>Deep 6-inch parting space</li><li>Body wave with natural movement</li><li>Transparent HD lace</li><li>Pre-plucked with baby hairs</li></ul>',
  vendor: 'New Era Studio',
  productType: 'Frontals',
  tags: ['Body Wave', '13x6 Frontal', 'Frontals', 'HD Lace'],
  images: p10Images,
  variants: p10Variants,
  options: [{ name: 'Length', values: frontalLengths }],
  priceRange: priceRange(p10Variants),
  featuredImage: p10Images[0],
  availableForSale: true,
  createdAt: staggeredDate(9),
};

// --- Product 11: HD Lace Front Wig - Straight ---

const wigLengths7: string[] = ['14"', '16"', '18"', '20"', '22"', '24"', '26"'];

const p11Images = [
  placeholderImage('img-11-1', 'HD Lace Front Wig Straight - Front', 0),
  placeholderImage('img-11-2', 'HD Lace Front Wig Straight - Side', 1),
  placeholderImage('img-11-3', 'HD Lace Front Wig Straight - Back', 2),
  placeholderImage('img-11-4', 'HD Lace Front Wig Straight - Styled', 3),
];

const p11Variants = makeVariants(
  11,
  'WIG',
  'STR',
  [['14"', 195], ['16"', 215], ['18"', 235], ['20"', 255], ['22"', 275], ['24"', 295], ['26"', 315]],
);

const product11: Product = {
  id: 'product-11',
  handle: 'hd-lace-front-wig-straight',
  title: 'HD Lace Front Wig - Straight',
  description:
    'Step into luxury with our HD Lace Front Wig in a sleek straight texture. Pre-styled on a 13x4 frontal cap, this wig is ready to wear straight out of the box. The HD lace front disappears into the skin for a seamless, natural hairline that fools everyone.',
  descriptionHtml:
    '<p>Step into luxury with our <strong>HD Lace Front Wig</strong> in a sleek straight texture. Pre-styled on a 13x4 frontal cap, this wig is ready to wear straight out of the box.</p><ul><li>13x4 HD lace front construction</li><li>Pre-plucked &amp; pre-styled</li><li>Adjustable straps &amp; combs for secure fit</li><li>150% density for natural fullness</li></ul>',
  vendor: 'New Era Studio',
  productType: 'Wigs',
  tags: ['Straight', 'HD Lace', 'Wigs', '13x4 Frontal', 'Best Seller'],
  images: p11Images,
  variants: p11Variants,
  options: [{ name: 'Length', values: wigLengths7 }],
  priceRange: priceRange(p11Variants),
  featuredImage: p11Images[0],
  availableForSale: true,
  createdAt: staggeredDate(10),
};

// --- Product 12: Glueless HD Lace Wig - Body Wave ---

const p12Images = [
  placeholderImage('img-12-1', 'Glueless HD Lace Wig Body Wave - Front', 2),
  placeholderImage('img-12-2', 'Glueless HD Lace Wig Body Wave - Side', 3),
  placeholderImage('img-12-3', 'Glueless HD Lace Wig Body Wave - Back', 0),
  placeholderImage('img-12-4', 'Glueless HD Lace Wig Body Wave - Styled', 1),
];

const p12Variants = makeVariants(
  12,
  'WIG',
  'BDW',
  [['14"', 215], ['16"', 235], ['18"', 255], ['20"', 275], ['22"', 295], ['24"', 315], ['26"', 335]],
);

const product12: Product = {
  id: 'product-12',
  handle: 'glueless-hd-lace-wig-body-wave',
  title: 'Glueless HD Lace Wig - Body Wave',
  description:
    'Our newest innovation: a truly glueless HD lace wig in body wave texture. Features an upgraded elastic band and secure combs so you can skip the adhesive entirely. Beginner-friendly installation with a salon-quality finish -- just put it on and go.',
  descriptionHtml:
    '<p>Our newest innovation: a truly <strong>Glueless HD Lace Wig</strong> in body wave texture. Features an upgraded elastic band and secure combs so you can skip the adhesive entirely.</p><ul><li>Glueless design &mdash; no adhesive needed</li><li>Body wave with natural bounce</li><li>Upgraded elastic band &amp; combs</li><li>Beginner-friendly installation</li></ul>',
  vendor: 'New Era Studio',
  productType: 'Wigs',
  tags: ['Body Wave', 'Glueless', 'Wigs', 'HD Lace', 'New Arrival'],
  images: p12Images,
  variants: p12Variants,
  options: [{ name: 'Length', values: wigLengths7 }],
  priceRange: priceRange(p12Variants),
  featuredImage: p12Images[0],
  availableForSale: true,
  createdAt: staggeredDate(11),
};

// --- Product 13: Glueless HD Lace Wig - Deep Wave ---

const p13Images = [
  placeholderImage('img-13-1', 'Glueless HD Lace Wig Deep Wave - Front', 3),
  placeholderImage('img-13-2', 'Glueless HD Lace Wig Deep Wave - Side', 0),
  placeholderImage('img-13-3', 'Glueless HD Lace Wig Deep Wave - Back', 1),
  placeholderImage('img-13-4', 'Glueless HD Lace Wig Deep Wave - Styled', 2),
];

const p13Variants = makeVariants(
  13,
  'WIG',
  'DPW',
  [['14"', 215], ['16"', 235], ['18"', 255], ['20"', 275], ['22"', 295], ['24"', 315], ['26"', 335]],
);

const product13: Product = {
  id: 'product-13',
  handle: 'glueless-hd-lace-wig-deep-wave',
  title: 'Glueless HD Lace Wig - Deep Wave',
  description:
    'All the convenience of our glueless design meets the drama of deep wave texture. This wig delivers voluminous, defined curls without any of the hassle. Just secure, adjust, and slay. Perfect for protective styling that does not compromise on glamour.',
  descriptionHtml:
    '<p>All the convenience of our glueless design meets the drama of <strong>deep wave texture</strong>. This wig delivers voluminous, defined curls without any of the hassle.</p><ul><li>Glueless cap with secure fit system</li><li>Deep wave curl definition</li><li>HD lace for invisible melt</li><li>150% density for dramatic volume</li></ul>',
  vendor: 'New Era Studio',
  productType: 'Wigs',
  tags: ['Deep Wave', 'Glueless', 'Wigs', 'HD Lace'],
  images: p13Images,
  variants: p13Variants,
  options: [{ name: 'Length', values: wigLengths7 }],
  priceRange: priceRange(p13Variants),
  featuredImage: p13Images[0],
  availableForSale: true,
  createdAt: staggeredDate(12),
};

// --- Product 14: HD Lace Front Wig - Kinky Curly ---

const wigLengths5: string[] = ['14"', '16"', '18"', '20"', '22"'];

const p14Images = [
  placeholderImage('img-14-1', 'HD Lace Front Wig Kinky Curly - Front', 1),
  placeholderImage('img-14-2', 'HD Lace Front Wig Kinky Curly - Side', 2),
  placeholderImage('img-14-3', 'HD Lace Front Wig Kinky Curly - Close-Up', 3),
];

const p14Variants = makeVariants(
  14,
  'WIG',
  'KNC',
  [['14"', 225], ['16"', 245], ['18"', 265], ['20"', 285], ['22"', 305]],
);

const product14: Product = {
  id: 'product-14',
  handle: 'hd-lace-front-wig-kinky-curly',
  title: 'HD Lace Front Wig - Kinky Curly',
  description:
    'Celebrate your crown with our HD Lace Front Wig in kinky curly texture. Crafted to mimic natural 3C-4A curl patterns, this wig delivers authentic volume and texture. The HD lace front ensures a seamless, undetectable hairline that lets your beauty shine.',
  descriptionHtml:
    '<p>Celebrate your crown with our <strong>HD Lace Front Wig</strong> in kinky curly texture. Crafted to mimic natural 3C-4A curl patterns, this wig delivers authentic volume and texture.</p><ul><li>Natural kinky curly pattern</li><li>13x4 HD lace front</li><li>Pre-plucked natural hairline</li><li>180% density for full, lush curls</li></ul>',
  vendor: 'New Era Studio',
  productType: 'Wigs',
  tags: ['Kinky Curly', 'HD Lace', 'Wigs'],
  images: p14Images,
  variants: p14Variants,
  options: [{ name: 'Length', values: wigLengths5 }],
  priceRange: priceRange(p14Variants),
  featuredImage: p14Images[0],
  availableForSale: true,
  createdAt: staggeredDate(13),
};

// --- Product 15: Lace Edge Band ---

const p15Images = [
  placeholderImage('img-15-1', 'Lace Edge Band - Front', 0),
  placeholderImage('img-15-2', 'Lace Edge Band - Worn', 1),
  placeholderImage('img-15-3', 'Lace Edge Band - Detail', 2),
];

const p15Variants: ProductVariant[] = [
  {
    id: 'variant-15-1',
    title: 'One Size',
    price: '12.00',
    compareAtPrice: '18.00',
    available: true,
    selectedOptions: [{ name: 'Length', value: 'One Size' }],
    sku: 'NES-ACC-EBD-OS',
  },
];

const product15: Product = {
  id: 'product-15',
  handle: 'lace-edge-band',
  title: 'Lace Edge Band',
  description:
    'Secure your lace and lay your edges to perfection with our Lace Edge Band. This elastic melt band applies even pressure around the hairline, helping your lace adhesive set flawlessly. A must-have accessory for every wig install.',
  descriptionHtml:
    '<p>Secure your lace and lay your edges to perfection with our <strong>Lace Edge Band</strong>. This elastic melt band applies even pressure around the hairline, helping your lace adhesive set flawlessly.</p><ul><li>Adjustable elastic band</li><li>Even pressure distribution</li><li>Works with all lace types</li><li>Reusable &amp; washable</li></ul>',
  vendor: 'New Era Studio',
  productType: 'Accessories',
  tags: ['Accessories', 'Edges'],
  images: p15Images,
  variants: p15Variants,
  options: [{ name: 'Length', values: ['One Size'] }],
  priceRange: priceRange(p15Variants),
  featuredImage: p15Images[0],
  availableForSale: true,
  createdAt: staggeredDate(14),
};

// --- Product 16: Silk Bonnet ---

const p16Images = [
  placeholderImage('img-16-1', 'Silk Bonnet - Front', 3),
  placeholderImage('img-16-2', 'Silk Bonnet - Worn', 0),
  placeholderImage('img-16-3', 'Silk Bonnet - Detail', 1),
];

const p16Variants: ProductVariant[] = [
  {
    id: 'variant-16-1',
    title: 'One Size',
    price: '18.00',
    compareAtPrice: '25.00',
    available: true,
    selectedOptions: [{ name: 'Length', value: 'One Size' }],
    sku: 'NES-ACC-BNT-OS',
  },
];

const product16: Product = {
  id: 'product-16',
  handle: 'silk-bonnet',
  title: 'Silk Bonnet',
  description:
    'Protect your investment while you sleep with our premium Silk Bonnet. The luxurious silk interior reduces friction, prevents frizz, and preserves your style overnight. Wide elastic band ensures a comfortable, stay-put fit all night long.',
  descriptionHtml:
    '<p>Protect your investment while you sleep with our premium <strong>Silk Bonnet</strong>. The luxurious silk interior reduces friction, prevents frizz, and preserves your style overnight.</p><ul><li>100% mulberry silk interior</li><li>Wide elastic band &mdash; stays put all night</li><li>Oversized to fit all hair lengths</li><li>Extends the life of your install</li></ul>',
  vendor: 'New Era Studio',
  productType: 'Accessories',
  tags: ['Accessories', 'Bonnet', 'Best Seller'],
  images: p16Images,
  variants: p16Variants,
  options: [{ name: 'Length', values: ['One Size'] }],
  priceRange: priceRange(p16Variants),
  featuredImage: p16Images[0],
  availableForSale: true,
  createdAt: staggeredDate(15),
};

// --- Product 17: Lace Adhesive Kit ---

const p17Images = [
  placeholderImage('img-17-1', 'Lace Adhesive Kit - Full Kit', 2),
  placeholderImage('img-17-2', 'Lace Adhesive Kit - Contents', 3),
  placeholderImage('img-17-3', 'Lace Adhesive Kit - Application', 0),
];

const p17Variants: ProductVariant[] = [
  {
    id: 'variant-17-1',
    title: 'One Size',
    price: '22.00',
    compareAtPrice: '30.00',
    available: true,
    selectedOptions: [{ name: 'Length', value: 'One Size' }],
    sku: 'NES-ACC-ADH-OS',
  },
];

const product17: Product = {
  id: 'product-17',
  handle: 'lace-adhesive-kit',
  title: 'Lace Adhesive Kit',
  description:
    'Everything you need for a secure, long-lasting lace install in one convenient kit. Includes our waterproof lace glue, scalp protector, and precision applicator. Formulated for sensitive skin with a hold that lasts up to two weeks.',
  descriptionHtml:
    '<p>Everything you need for a secure, long-lasting lace install in one convenient kit. Includes our waterproof lace glue, scalp protector, and precision applicator.</p><ul><li>Waterproof lace adhesive</li><li>Scalp protector spray</li><li>Precision applicator tip</li><li>Up to 2-week hold</li></ul>',
  vendor: 'New Era Studio',
  productType: 'Accessories',
  tags: ['Accessories', 'Adhesive'],
  images: p17Images,
  variants: p17Variants,
  options: [{ name: 'Length', values: ['One Size'] }],
  priceRange: priceRange(p17Variants),
  featuredImage: p17Images[0],
  availableForSale: true,
  createdAt: staggeredDate(16),
};

// ---------------------------------------------------------------------------
// Exported product array
// ---------------------------------------------------------------------------

export const mockProducts: Product[] = [
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
  product7,
  product8,
  product9,
  product10,
  product11,
  product12,
  product13,
  product14,
  product15,
  product16,
  product17,
];

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------

const bundleProducts = mockProducts.filter((p) => p.productType === 'Bundles');
const closureAndFrontalProducts = mockProducts.filter(
  (p) => p.productType === 'Closures' || p.productType === 'Frontals',
);
const wigProducts = mockProducts.filter((p) => p.productType === 'Wigs');
const bestSellerProducts = mockProducts.filter((p) => p.tags.includes('Best Seller'));
const newArrivalProducts = mockProducts.filter((p) => p.tags.includes('New Arrival'));

export const mockCollections: Collection[] = [
  {
    id: 'collection-all',
    handle: 'all',
    title: 'All',
    description: 'Browse our complete collection of luxury virgin hair extensions, wigs, and accessories.',
    products: mockProducts,
  },
  {
    id: 'collection-bundles',
    handle: 'bundles',
    title: 'Bundles',
    description:
      'Premium virgin hair bundles in every texture -- straight, body wave, deep wave, loose wave, water wave, and kinky curly.',
    image: placeholderImage('col-bundles', 'Bundles Collection', 1),
    products: bundleProducts,
  },
  {
    id: 'collection-closures-frontals',
    handle: 'closures-frontals',
    title: 'Closures & Frontals',
    description:
      'HD lace closures and frontals for an undetectable finish. Available in 4x4, 5x5, 13x4, and 13x6 options.',
    image: placeholderImage('col-closures-frontals', 'Closures & Frontals', 2),
    products: closureAndFrontalProducts,
  },
  {
    id: 'collection-wigs',
    handle: 'wigs',
    title: 'Wigs',
    description:
      'Ready-to-wear HD lace front wigs and glueless wigs. Pre-styled, pre-plucked, and designed for effortless beauty.',
    image: placeholderImage('col-wigs', 'Wigs Collection', 0),
    products: wigProducts,
  },
  {
    id: 'collection-best-sellers',
    handle: 'best-sellers',
    title: 'Best Sellers',
    description:
      'Our most-loved products, chosen by the New Era Studio community. These are the pieces our clients come back for again and again.',
    image: placeholderImage('col-best-sellers', 'Best Sellers', 3),
    products: bestSellerProducts,
  },
  {
    id: 'collection-new-arrivals',
    handle: 'new-arrivals',
    title: 'New Arrivals',
    description:
      'The latest additions to the New Era Studio lineup. Be the first to experience our newest textures and innovations.',
    image: placeholderImage('col-new-arrivals', 'New Arrivals', 1),
    products: newArrivalProducts,
  },
];

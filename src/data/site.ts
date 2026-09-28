// Copy and settings shared by every page. Page-specific copy lives next to each page.

export const CONTACT_EMAIL = 'murali@startupmills.com';
export const COMPANY = 'Sherali Consumer Private Limited';
export const LAUNCH = 'Dec 2026';

export type ProductId = 'everyday-wash' | 'quikwash' | 'undergarment-wash';
export type PopupProduct = ProductId | 'any';

export const PRODUCTS: Record<ProductId, { name: string; href: string }> = {
  'everyday-wash': { name: 'Everyday Wash', href: '/everyday-wash' },
  quikwash: { name: 'Quikwash', href: '/quikwash' },
  'undergarment-wash': { name: 'Undergarment Wash', href: '/undergarment-wash' },
};

export const PRODUCT_ORDER: ProductId[] = ['everyday-wash', 'quikwash', 'undergarment-wash'];

export const NAV = [
  { href: '/why-twist', label: 'Why Twist?' },
  { href: '/blog', label: 'Blogs' },
  { href: '/about', label: 'About Us' },
];

export const FOOTER = {
  company: `${COMPANY} · Hyderabad`,
  disclaimer:
    'Product benefits describe what Twist products are formulated to do, confirmed by independent lab testing before launch.',
};

export const ALT = {
  bottle: {
    'everyday-wash': 'Twist Everyday Wash bottle, prototype pack design',
    quikwash: 'Twist Quikwash bottle, prototype pack design',
    'undergarment-wash': 'Twist Undergarment Wash bottle, prototype pack design',
  } as Record<ProductId, string>,
  bottlePump: 'Twist Undergarment Wash pump bottle, prototype pack design',
};

// Notify me popup. {Product} is replaced with the product name.
export const POPUP = {
  titleAny: 'Get notified when Twist launches',
  titleProduct: 'Get notified when {Product} launches',
  emailLabel: 'Email address',
  emailPlaceholder: 'you@example.com',
  button: 'Notify me',
  buttonLoading: 'Adding you…',
  smallprint: 'No spam. Unsubscribe in one click.',
  close: 'Close',
  dialogName: 'Get notified',
  errors: {
    empty: 'Please enter your email address.',
    invalid: "That doesn't look like an email address. Check for typos and try again.",
    ratelimit: 'Too many tries from this connection. Please wait a few minutes and try again.',
    network: "We couldn't reach our server. Check your connection and try again.",
    server: 'Something went wrong on our side. Please try again in a moment.',
  },
  s2Title: "You're in. Thank you.",
  s2QuestionProduct: 'At ₹250 for 1 litre, would you buy {Product} at launch?',
  s2AnswersProduct: [
    { value: 'yes', label: 'Yes' },
    { value: 'maybe', label: 'Maybe' },
    { value: 'no', label: 'Not at that price' },
  ],
  s2QuestionAny: 'Which wash would you try first?',
  skip: 'Skip',
  s3Title: 'That helps a lot. Thank you!',
  s3Button: 'Close',
};

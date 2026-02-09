# New Era Studio — QA Checklist

## Reference Site Behavioral Matching

### Header & Navigation
- [ ] Sticky header on scroll with subtle background transition
- [ ] Logo centered (mobile) / centered-ish with nav on both sides (desktop)
- [ ] Hamburger menu on mobile → slide-in drawer from left
- [ ] Cart icon in header with item count badge
- [ ] "Book Install" CTA visible in header (desktop) and mobile menu
- [ ] Search icon links to shop page
- [ ] Navigation links: Shop All, Bundles, Closures & Frontals, Wigs, About, FAQ
- [ ] Announcement bar with free shipping message and dismiss button

### Home Page
- [ ] Full-viewport hero section with two CTAs ("Shop Hair" + "Book Install")
- [ ] Featured Collections grid (3 category cards with hover effect)
- [ ] Best Sellers product grid (4 columns desktop, 2 mobile)
- [ ] Value propositions bar (4 icons: Free Shipping, Virgin Hair, Returns, Expert Install)
- [ ] "Buy Hair. Book Install." banner section
- [ ] Testimonials grid (4 cards with star ratings)
- [ ] Newsletter signup in footer area
- [ ] Premium luxury aesthetic: black/white/gold color palette

### Shop / All Products Page
- [ ] Page title and product count
- [ ] Sort dropdown (Featured, Best Selling, Newest, Price Low-High, Price High-Low)
- [ ] Filter sidebar on desktop (left side)
- [ ] Mobile filter drawer (slide-in from left)
- [ ] Filters: Product Type, Texture, Lace Type
- [ ] Active filter chips with remove buttons
- [ ] "Clear all" link when filters active
- [ ] Product grid: 3-4 columns desktop, 2 columns mobile
- [ ] Product cards show: image, title, price range, option count
- [ ] Product badges: "Best Seller", "New", discount percentage
- [ ] Hover effect on product images (subtle scale)
- [ ] "Quick View" overlay on hover (desktop)
- [ ] URL query params for type filtering (e.g., ?type=bundles)
- [ ] Empty state with "Clear Filters" button

### Product Detail Page
- [ ] Breadcrumb navigation (Home > Shop > Product)
- [ ] Product gallery with main image + thumbnail strip
- [ ] Thumbnail selection changes main image
- [ ] Product title, badges, star rating placeholder
- [ ] Price display with compare-at price and discount percentage
- [ ] Product description text
- [ ] Variant selector (Length options as buttons)
- [ ] Selected variant highlighted
- [ ] Price updates when variant changes
- [ ] Quantity selector with +/- buttons
- [ ] "Add to Cart" button (full-width)
- [ ] "Book Install" button directly below ATC
- [ ] Trust badges row
- [ ] "Book Install" banner CTA
- [ ] Accordion sections: Product Details, Shipping, Returns, Hair Care
- [ ] "How to Order + Install" 3-step section
- [ ] Related products grid (4 cards)
- [ ] Sticky ATC bar on mobile (appears after scrolling past main ATC)
- [ ] "Book Install" modal with order number input

### Cart
- [ ] Cart drawer slides in from right on add-to-cart
- [ ] Cart drawer: item list with image, title, variant, price, quantity controls
- [ ] Cart drawer: free shipping progress bar
- [ ] Cart drawer: subtotal, "View Cart", and "Book Install" buttons
- [ ] Cart page: full cart table with product, price, qty, total columns
- [ ] Cart page: free shipping progress banner
- [ ] Cart page: quantity controls and remove button per item
- [ ] Cart page: "Continue Shopping" link
- [ ] Cart page: upsell section ("Complete Your Look") with accessories
- [ ] Cart page: order summary sidebar with subtotal, shipping, total
- [ ] Cart page: "Checkout" and "Book Install" buttons
- [ ] Cart page: trust badges
- [ ] Empty cart state with "Start Shopping" CTA

### Checkout Success / Thank You Page
- [ ] Order confirmation icon
- [ ] "Thank You" heading with order number
- [ ] Order number displayed prominently
- [ ] Large "Book Your Install" CTA section (dark background, gold button)
- [ ] "What Happens Next" 4-step guide
- [ ] "Continue Shopping" button
- [ ] Order number saved to localStorage for booking modal

### Informational Pages
- [ ] About page: story section, mission, "Why Choose Us" list, CTA
- [ ] FAQ page: accordion-style questions grouped by category
- [ ] FAQ page: anchor link support (#how-to-book)
- [ ] Shipping & Returns page: shipping table, return policy, exchange info
- [ ] Contact page: contact info cards, contact form with subject dropdown
- [ ] Privacy Policy page: complete privacy policy text
- [ ] Terms of Service page: complete terms text
- [ ] All pages: proper heading hierarchy, consistent spacing

### GlossGenius Integration
- [ ] "Book Install" in header navigation (desktop + mobile)
- [ ] "Book Install" in home hero CTAs
- [ ] "Book Install" banner on home page
- [ ] "Book Install" button on product detail page (near ATC)
- [ ] "Book Install" CTA banner on product detail page
- [ ] "Book Install" in cart drawer
- [ ] "Book Install" on cart page (order summary)
- [ ] "Book Install" on checkout success page (prominent)
- [ ] "Book Install" modal: accepts order number, saves to localStorage
- [ ] "Book Install" modal: "How It Works" 4-step guide
- [ ] All booking links open GlossGenius in new tab
- [ ] "Have your order number ready" note appears where applicable

### Footer
- [ ] Newsletter signup with email input and subscribe button
- [ ] Success message after newsletter submission
- [ ] Brand column with logo, description, social icons
- [ ] Shop links column
- [ ] Help links column (includes Book Install)
- [ ] Company links column
- [ ] Bottom bar: copyright, payment method icons
- [ ] Social links: Instagram, TikTok, Facebook

### Mobile Responsiveness
- [ ] All pages tested at 375px (iPhone SE)
- [ ] All pages tested at 390px (iPhone 14)
- [ ] All pages tested at 768px (iPad)
- [ ] Hamburger menu works correctly
- [ ] Filter drawer works correctly on mobile
- [ ] Sticky ATC bar appears on mobile PDP after scroll
- [ ] Cart drawer is usable on mobile
- [ ] Touch targets are at least 44x44px
- [ ] No horizontal overflow on any page
- [ ] Font sizes are legible on mobile

### Accessibility
- [ ] All images have alt text
- [ ] Form inputs have labels (visible or sr-only)
- [ ] Buttons have accessible names (aria-label where needed)
- [ ] Focus states are visible on interactive elements
- [ ] Keyboard navigation works through all interactive elements
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Semantic HTML: proper heading hierarchy, landmarks, lists
- [ ] Cart count announced to screen readers
- [ ] Dialogs trap focus when open

### Performance
- [ ] Images lazy-loaded
- [ ] CSS/JS properly bundled by Next.js
- [ ] No layout shift on page load
- [ ] Lighthouse Performance score > 90
- [ ] Lighthouse Accessibility score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Total Blocking Time < 200ms

### SEO
- [ ] Unique meta title and description on each page
- [ ] Open Graph tags configured
- [ ] Twitter card tags configured
- [ ] Semantic HTML structure
- [ ] Proper heading hierarchy (single h1 per page)
- [ ] Product pages have structured data (can add JSON-LD)
- [ ] Clean URL structure (/shop, /products/[handle], /about, etc.)

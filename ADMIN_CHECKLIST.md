# New Era Studios — Admin Configuration Checklist

## Pre-Launch Checklist

### Store Setup
- [ ] Create Shopify store
- [ ] Choose and activate plan
- [ ] Set store name to "New Era Studios"
- [ ] Upload logo and favicon
- [ ] Set store currency to USD
- [ ] Configure timezone

### Storefront API
- [ ] Create private app with Storefront API access
- [ ] Copy Storefront access token
- [ ] Add to environment variables
- [ ] Set `NEXT_PUBLIC_USE_SHOPIFY=true`
- [ ] Verify API connection works

### Products
- [ ] Create all 6 Bundle products (Straight, Body Wave, Deep Wave, Loose Wave, Water Wave, Kinky Curly)
- [ ] Create 2 Closure products (4x4 Straight, 5x5 Body Wave)
- [ ] Create 2 Frontal products (13x4 Straight, 13x6 Body Wave)
- [ ] Create 4 Wig products (HD Lace Straight, Glueless Body Wave, Glueless Deep Wave, Kinky Curly)
- [ ] Create 3 Accessory products (Edge Band, Bonnet, Adhesive Kit)
- [ ] Add variants with correct pricing for each product
- [ ] Upload 3-4 high-quality product images per product
- [ ] Set compare-at prices for sale display
- [ ] Add product descriptions (use copy deck)
- [ ] Assign product types (Bundles, Closures, Frontals, Wigs, Accessories)
- [ ] Add tags: texture name, lace type, "Best Seller", "New Arrival"
- [ ] Set SKUs following NES-[TYPE]-[TEXTURE]-[LENGTH] convention
- [ ] Set inventory tracking (optional)

### Collections
- [ ] Create "All Products" collection (automated: all products)
- [ ] Create "Bundles" collection (automated: type = Bundles)
- [ ] Create "Closures & Frontals" collection (automated: type = Closures OR Frontals)
- [ ] Create "Wigs" collection (automated: type = Wigs)
- [ ] Create "Best Sellers" collection (automated: tag = "Best Seller")
- [ ] Create "New Arrivals" collection (automated: tag = "New Arrival")

### Navigation
- [ ] Set up main navigation menu
- [ ] Set up footer navigation menus

### Payments
- [ ] Enable Shopify Payments
- [ ] Enable PayPal
- [ ] Enable Shop Pay, Apple Pay, Google Pay
- [ ] Test with Shopify's test gateway in development mode

### Shipping
- [ ] Create Standard shipping rate ($9.99, 3-5 days)
- [ ] Create Express shipping rate ($19.99, 1-2 days)
- [ ] Create Overnight shipping rate ($29.99, next day)
- [ ] Create Free shipping rate (orders ≥ $150)
- [ ] Set shipping zones (US only initially)

### Tax
- [ ] Enable automatic tax calculation
- [ ] Configure for your business state/jurisdiction

### Email & Notifications
- [ ] Customize order confirmation email (add "Book Install" CTA)
- [ ] Customize shipping confirmation email
- [ ] Set up abandoned cart recovery emails (1-hour delay)
- [ ] Add "Book Install" CTA to abandoned cart email
- [ ] Add order status page script (Book Install prompt)

### GlossGenius Integration
- [ ] Verify booking URL works: https://newerastudios.glossgenius.com/booking-flow
- [ ] Test "Book Install" button from header
- [ ] Test "Book Install" from product page
- [ ] Test "Book Install" from cart page
- [ ] Test "Book Install" from checkout success page
- [ ] Test "Book Install" modal with order number

### Domain & DNS
- [ ] Purchase domain (e.g., newerastudio.com)
- [ ] Connect domain in Vercel
- [ ] Update DNS records
- [ ] Verify SSL certificate is active
- [ ] Update NEXT_PUBLIC_SITE_URL

### SEO
- [ ] Verify meta titles on all pages
- [ ] Verify meta descriptions on all pages
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Open Graph tags with Facebook Sharing Debugger
- [ ] Set up Google Analytics (or Vercel Analytics)

### Deployment
- [ ] Push code to GitHub
- [ ] Connect to Vercel
- [ ] Set all environment variables in Vercel
- [ ] Deploy and verify production build
- [ ] Test all pages on mobile and desktop
- [ ] Test complete purchase flow
- [ ] Test abandoned cart flow

### Optional Enhancements
- [ ] Install review app (Judge.me, Loox, or Stamped.io)
- [ ] Set up Klaviyo for email marketing
- [ ] Connect Instagram Shopping
- [ ] Set up Google Merchant Center
- [ ] Configure Facebook Pixel / Meta Pixel
- [ ] Add Hotjar or Microsoft Clarity for heatmaps

---

## Post-Launch Monitoring
- [ ] Monitor checkout conversion rate
- [ ] Monitor abandoned cart recovery rate
- [ ] Track GlossGenius booking referrals
- [ ] Monitor page load performance (Core Web Vitals)
- [ ] Review customer feedback and product reviews
- [ ] A/B test homepage hero and product page CTAs

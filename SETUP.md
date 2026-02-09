# New Era Studios — Setup Guide

## Architecture Decision

**Stack: Next.js 14 (App Router) + Tailwind CSS + Shopify Storefront API**

Why this approach:
- **Immediate deployability**: Works out of the box with mock data; no Shopify store required to preview
- **Full UI control**: Pixel-perfect luxury aesthetic matching reference site patterns
- **Shopify backend**: When connected, handles products, checkout, payments, inventory, and abandoned cart recovery
- **Vercel deployment**: One-click deploy with automatic HTTPS, CDN, and preview deployments
- **GlossGenius integration**: Deep-linked booking flow at every touchpoint
- **Modern DX**: TypeScript, hot reload, component-based architecture

---

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+ (https://nodejs.org)
- npm or yarn

### Steps

```bash
# 1. Navigate to project directory
cd "New Era Studioss"

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

The site runs immediately with mock product data. No Shopify account needed for development.

---

## Connecting Shopify (Production)

### 1. Create Shopify Store

1. Go to https://www.shopify.com and create a store
2. Choose any plan (Basic is fine to start)
3. Note your store domain: `your-store.myshopify.com`

### 2. Create Storefront API Access

1. In Shopify Admin, go to **Settings > Apps and sales channels > Develop apps**
2. Click **Create an app** → Name it "New Era Studios Storefront"
3. Under **Configuration**, enable:
   - Storefront API access scopes:
     - `unauthenticated_read_product_listings`
     - `unauthenticated_read_product_inventory`
     - `unauthenticated_read_product_tags`
     - `unauthenticated_write_checkouts`
     - `unauthenticated_read_checkouts`
     - `unauthenticated_read_content`
4. Click **Install app**
5. Copy the **Storefront access token**

### 3. Configure Environment Variables

Update `.env.local`:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token-here
NEXT_PUBLIC_USE_SHOPIFY=true
NEXT_PUBLIC_GLOSSGENIUS_BOOKING_URL=https://newerastudios.glossgenius.com/booking-flow
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 4. Add Products in Shopify Admin

Create products matching the data model. For each product:

**Required fields:**
- Title (e.g., "Brazilian Straight Bundles")
- Description (use copy deck below)
- Product type: Bundles / Closures / Frontals / Wigs / Accessories
- Vendor: "New Era Studios"
- Tags: texture name, lace type, "Best Seller" or "New Arrival" as applicable
- Variants: Create an option called "Length" with values (12", 14", etc.)
- Set prices and compare-at prices for each variant
- Upload product images (minimum 3 per product)
- Set SKUs: `NES-[TYPE]-[TEXTURE]-[LENGTH]`

**Product types and counts:**
| Type | Products | Variant option |
|------|----------|---------------|
| Bundles | 6 (one per texture) | Length: 12"-30" |
| Closures | 2 (4x4, 5x5) | Length: 12"-20" |
| Frontals | 2 (13x4, 13x6) | Length: 12"-20" |
| Wigs | 4 (HD Lace, Glueless) | Length: 14"-26" |
| Accessories | 3 (Edge Band, Bonnet, Adhesive) | One Size |

### 5. Create Collections in Shopify

1. **All** — Automated, condition: all products
2. **Bundles** — Automated, condition: Product type = Bundles
3. **Closures & Frontals** — Automated, condition: Product type = Closures OR Frontals
4. **Wigs** — Automated, condition: Product type = Wigs
5. **Best Sellers** — Automated, condition: Tag = "Best Seller"
6. **New Arrivals** — Automated, condition: Tag = "New Arrival"

### 6. Configure Navigation

In Shopify Admin > Online Store > Navigation:

**Main menu:**
- Shop All → /shop
- Bundles → /shop?type=bundles
- Closures & Frontals → /shop?type=closures-frontals
- Wigs → /shop?type=wigs
- About → /about
- FAQ → /faq

### 7. Configure Payments

In Shopify Admin > Settings > Payments:
- Enable Shopify Payments (credit cards)
- Enable PayPal
- Enable Shop Pay, Apple Pay, Google Pay

### 8. Configure Shipping

In Shopify Admin > Settings > Shipping and delivery:
- **Standard shipping**: $9.99, 3-5 business days
- **Express shipping**: $19.99, 1-2 business days
- **Overnight shipping**: $29.99, next business day
- **Free shipping rate**: $0.00, condition: order subtotal ≥ $150

### 9. Configure Tax

In Shopify Admin > Settings > Taxes and duties:
- Enable automatic tax calculation
- Set up for your business state

---

## Deploy to Vercel

### Steps

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit: New Era Studios eCommerce site"
git remote add origin https://github.com/YOUR_USERNAME/new-era-studio.git
git push -u origin main

# 2. Deploy
# Go to https://vercel.com/new
# Import your GitHub repository
# Add environment variables in Vercel dashboard:
#   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
#   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
#   NEXT_PUBLIC_USE_SHOPIFY=true
#   NEXT_PUBLIC_GLOSSGENIUS_BOOKING_URL
#   NEXT_PUBLIC_SITE_URL

# 3. Deploy!
# Vercel will build and deploy automatically
```

### Custom Domain

1. In Vercel dashboard, go to your project > Settings > Domains
2. Add your domain (e.g., newerastudio.com)
3. Update DNS records as instructed by Vercel
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

---

## Email Templates (Shopify)

### Order Confirmation Email

In Shopify Admin > Settings > Notifications > Order confirmation:

Add this block after the order details section:

```html
<div style="background-color: #2d2926; color: #ffffff; padding: 40px 30px; text-align: center; margin-top: 30px;">
  <h2 style="font-family: Georgia, serif; font-size: 24px; font-weight: 300; margin-bottom: 10px;">
    Complete Your Look
  </h2>
  <p style="font-family: system-ui, sans-serif; font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 20px;">
    Book a professional install with our experienced stylists. Have your order number ready!
  </p>
  <a href="https://newerastudios.glossgenius.com/booking-flow"
     style="display: inline-block; background-color: #b07a4e; color: #2d2926; padding: 12px 30px;
            font-family: system-ui, sans-serif; font-size: 12px; font-weight: 600;
            letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;">
    Book Your Install
  </a>
</div>
```

### Abandoned Cart Email

In Shopify Admin > Settings > Notifications > Abandoned checkout:

Customize the email to include:
- Subject: "Your New Era Studios cart is waiting"
- Add "Book Install" link alongside "Complete your order" CTA

---

## Post-Purchase Page (Shopify Plus)

If on Shopify Plus, create a post-purchase extension that shows the "Book Install" CTA. For standard Shopify, the order status page messaging and email template handle this.

### Order Status Page (Additional Scripts)

In Shopify Admin > Settings > Checkout > Order status page > Additional scripts:

```html
<script>
  Shopify.Checkout.OrderStatus.addContentBox(
    '<div style="text-align:center;padding:20px;">' +
    '<h3 style="font-family:Georgia,serif;font-size:20px;margin-bottom:8px;">Book Your Install</h3>' +
    '<p style="font-size:13px;color:#666;margin-bottom:15px;">Complete your transformation with a professional install.</p>' +
    '<a href="https://newerastudios.glossgenius.com/booking-flow" target="_blank" ' +
    'style="display:inline-block;background:#b07a4e;color:#2d2926;padding:10px 25px;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;">' +
    'Book Install Now</a></div>'
  );
</script>
```

---

## Abandoned Cart Strategy

Shopify handles abandoned cart recovery automatically:

1. **Enable in Shopify Admin** > Settings > Checkout > Abandoned checkouts
2. Set to send automatically after **1 hour** (or 10 hours for less aggressive)
3. Customize email template (see above)
4. Monitor recovery rate in Analytics

For additional abandoned cart tools, consider:
- **Klaviyo** (email + SMS sequences)
- **Omnisend** (multi-channel automation)
- Both integrate natively with Shopify

---

## Review App Integration

The product pages include a placeholder reviews section. To enable real reviews:

1. Install a Shopify reviews app:
   - **Judge.me** (free tier available, recommended)
   - **Loox** (photo reviews)
   - **Stamped.io** (feature-rich)

2. The review app will inject its widget using Shopify's app blocks or script tags.

3. For the headless approach, most review apps provide a JavaScript SDK or API that can be integrated into the Next.js frontend.

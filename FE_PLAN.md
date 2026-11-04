# Eco Friendly Jewellery — Frontend Plan

Stack: **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4** → deployed on Vercel.
Backend lives in `../be` (see `../be/BE_PLAN.md`). The FE never calculates final prices, it asks the BE.

---

## 0. Open decisions (confirm with client before Phase 2)

| #   | Question                                                                                          | Current assumption                                                                           |
| --- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 1   | Shopify (as in brief) or custom build?                                                            | Custom Next.js + own backend                                                                 |
| 2   | Main nav categories: draft mockup (Rings / Chains / Earrings / Bracelets) vs brief (8 categories) | Not decided — keep nav items in `lib/constants.ts` so they are easy to change                |
| 5   | Final design / mockup                                                                             | **Not final.** `Home page (2).pdf` is an early draft only; final design still to come        |
| 3   | Product photos & names: the supplied catalogue (Vincent van Hees) belongs to another brand        | Used only as a data-structure reference until the client supplies their own photos and names |
| 4   | Pricing rules (gold rate/gram, labour, stone price/carat)                                         | Placeholder rules in seed data                                                               |

---

## 1. Design system

> **Provisional.** `Home page (2).pdf` is an early draft, not the final design. The values below are
> starting placeholders taken from that draft. Build everything on design tokens so the final
> colours, fonts and layout can be swapped in one place (`app/globals.css`) without touching components.
> Layout and section order may also change when the final mockup arrives.

Starting values (from the draft mockup):

| Token             | Value                      | Use                                        |
| ----------------- | -------------------------- | ------------------------------------------ |
| `--color-primary` | `#3a6447` (deep green)     | Top bar, buttons, headings                 |
| `--color-bg`      | `#f8f5f0` (cream)          | Page background                            |
| `--color-surface` | `#efe6d8` / `#e8e1d6`      | Image placeholders, cards                  |
| `--color-gold`    | `#a8875a`                  | Eyebrow text, accents                      |
| `--color-text`    | `#1f1f1f`                  | Body text                                  |
| Heading font      | Cormorant Garamond (serif) | H1–H3                                      |
| Body font         | Montserrat / Inter (light) | Body, nav (uppercase, wide letter-spacing) |

- Define tokens with Tailwind 4 `@theme` in `app/globals.css`; load fonts with `next/font/google`.
- Migrate `components/Home.css` into Tailwind classes, then delete it.
- Mobile-first; breakpoints: 640 / 768 / 1024 / 1280.

---

## 2. Folder structure

```
fe/
├── app/
│   ├── layout.tsx                 # <html>, fonts, Providers, default metadata
│   ├── (site)/                    # storefront route group
│   │   ├── layout.tsx             # AnnouncementBar, Header, Footer, WhatsAppButton
│   │   ├── page.tsx               # Home
│   │   ├── shop/page.tsx
│   │   ├── shop/[category]/page.tsx  # rings, engagement-rings, wedding-bands, chains, earrings…
│   │   ├── product/[slug]/page.tsx
│   │   ├── custom-jewelry/page.tsx
│   │   ├── portfolio/page.tsx
│   │   ├── education/page.tsx · ring-size/page.tsx
│   │   ├── blog/page.tsx · blog/[slug]/page.tsx
│   │   ├── about/page.tsx · contact/page.tsx · faq/page.tsx
│   │   ├── policies/[slug]/page.tsx   # shipping, returns, privacy, terms
│   │   ├── cart/page.tsx · checkout/page.tsx
│   │   └── account/…              # login, orders, addresses, CAD approvals
│   ├── (admin)/…                  # Phase 6, own layout
│   ├── not-found.tsx · sitemap.ts · robots.ts
│   └── not-found.tsx
├── components/
│   ├── layout/   Header, Nav, MobileMenu, Footer, AnnouncementBar, WhatsAppButton, CurrencySwitcher
│   ├── home/     HeroSlider, CategoryGrid, ShapeFinder, CustomBanner, ReviewStrip, TrustBadges
│   ├── shop/     FilterSidebar, ProductCard, ProductGrid, SortSelect, Pagination
│   ├── product/  Gallery, Video360, MetalSelector, StoneSelector, CaratSelector, RingSizeSelector, PriceBox, Specs
│   ├── forms/    CustomInquiryForm, ContactForm, ImageUpload, OtpInput
│   └── ui/       Button, Input, Select, Accordion, Modal, Badge, Stars, Price
├── lib/
│   ├── api.ts          # typed fetch wrapper for BE
│   ├── currency.ts     # formatting, rate conversion
│   ├── constants.ts    # phone, email, WhatsApp link, metals, shapes, ring sizes
│   └── mock/           # mock JSON used until BE is ready
├── types/              # Product, Variant config, Order, Review…
├── proxy.ts            # Geo-IP currency cookie (Next 16 replaces middleware.ts)
└── public/             # logo.svg, icons, static images
```

---

## 3. Pages & content

| Page                       | Contents                                                                                                                                                                                                                    | Source in brief |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| **Home**                   | Announcement bar → header → Hero slider (2 slides) → Shop by category → Shape finder → Custom sub-banner → Featured/best sellers → Reviews → Trust badges → footer                                                          | §9, §13, mockup |
| **Shop**                   | All jewellery; filters: category, stone (Lab diamond / Moissanite), shape, metal, carat, price; sort; filters synced to URL query                                                                                           | §13             |
| **Engagement Rings**       | Tabs by shape (Oval, Emerald…) and style (Solitaire, Halo, Vintage)                                                                                                                                                         | §13             |
| **Wedding Bands**          | Men's / Women's; eternity, contoured, stacking                                                                                                                                                                              | §13             |
| **Product**                | Gallery + 360° video, title, live price, selectors (metal, stone, carat, ring size US 3–14 in ¼ steps), certificate info, specs/dimensions, shipping time (7–10 days craft + 4–7 days delivery), reviews, "Ask on WhatsApp" | §4, §11         |
| **Custom Jewelry**         | Form: name, email, phone, jewellery type, metal, stone, budget, notes, up to 5 reference images                                                                                                                             | §10, §13        |
| **Portfolio**              | Cards: sketch → CAD → final ring; "Request Similar Design Quote" button pre-fills custom form                                                                                                                               | §10             |
| **Education / Ring Size**  | Diamond guide (4Cs, lab vs mined, moissanite), printable ring-size chart                                                                                                                                                    | §6, §13         |
| **Blog**                   | 4 articles from brief (start as MDX or BE content)                                                                                                                                                                          | §6              |
| **About & Sustainability** | History, mission, vision, USPs, team (4 groups), India & Germany offices                                                                                                                                                    | §1, §2, §5      |
| **Contact**                | Form, email `jewelleryecofriendly@gmail.com`, phone/WhatsApp `+91 8487008481`, offices                                                                                                                                      | §3              |
| **FAQ**                    | 4 FAQs (accordion)                                                                                                                                                                                                          | §11             |
| **Policies**               | Shipping, 30-day returns, privacy, terms                                                                                                                                                                                    | §13             |
| **Cart / Checkout**        | Line items show configuration; address, shipping, payment (Razorpay for INR, Stripe for others)                                                                                                                             | §15             |
| **Account**                | OTP / email login, orders, tracking, CAD approve / request changes                                                                                                                                                          | §15             |

Global rules:

- **No social media icons or links anywhere** (§12).
- **Floating WhatsApp button** on every page → `https://wa.me/918487008481` (§15).

---

## 4. Key behaviours

**Currency**

- `proxy.ts` reads the country header (e.g. `x-vercel-ip-country`) on the first visit and sets the `currency` cookie: IN → INR, EU countries → EUR, GB → GBP, others → USD.
- User can override it with the header switcher (writes the same cookie).
- Rates come from BE `/currency/rates` (cached and revalidated hourly). Prices from the BE are in INR; the FE only formats and converts them for display.

**Product configurator**

- Selection state lives in URL search params (`?metal=18K_YELLOW&stone=lab&carat=0.5&size=6.5`), so the page is shareable and SEO-safe.
- On change, call BE `POST /pricing/quote` (debounced) and show the price; if the call fails, show "Price on request" with a WhatsApp CTA.
- "Add to cart" sends `{ productId, config }`. The BE recalculates the price.

**Data fetching**

- Server Components fetch catalogue and content (good SEO, cached with revalidation).
- Client Components only for interactive parts: selectors, filters, cart, forms.
- Cart: server-side cart id in a cookie; small client store (React context) for the badge count.

**SEO**

- `generateMetadata` per page, Open Graph images, `Product` + `Review` JSON-LD on product pages, `sitemap.ts`, `robots.ts`.
- `next/image` for all images (Cloudinary/S3 loader).

---

## 5. Phases

| Phase                          | Work                                                                                                                                                                                             | Needs BE?            |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| **1. Foundation**              | Theme tokens, fonts, layout (announcement bar, header, nav, footer, WhatsApp button), Home page from mockup, static pages (About, Contact, FAQ, Policies, Education, Ring Size, Blog), mock JSON | No                   |
| **2. Catalogue**               | Shop + filters, category pages, product page UI with mock data, then switch to BE API                                                                                                            | Yes (catalogue API)  |
| **3. Configurator & currency** | Live pricing, `proxy.ts`, currency switcher                                                                                                                                                      | Yes (pricing, rates) |
| **4. Commerce**                | Login (OTP), cart, checkout, payment redirect/return, order pages                                                                                                                                | Yes                  |
| **5. Custom & CAD**            | Custom inquiry with uploads, portfolio, CAD approval in account, reviews with photos                                                                                                             | Yes                  |
| **6. Admin & launch**          | Admin panel (products, rates, orders, CAD, reviews, content), SEO, Lighthouse ≥ 90, accessibility pass, Vercel deploy                                                                            | Yes                  |

---

## 6. Conventions

- TypeScript everywhere (`.tsx`); convert `components/HomePage.jsx`.
- One component per file, PascalCase; server components by default, `"use client"` only where needed.
- Env vars: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL`.
- ESLint + Prettier; branch per feature, PR into `main`.
- Check `node_modules/next/dist/docs/` before using Next APIs (Next 16 has breaking changes, e.g. `proxy.ts`).

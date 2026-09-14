# Artisan Hub Dummy Data Documentation

This document records the hardcoded/demo data currently used by the Artisan Hub frontend. It is intended as a handoff reference before replacing the demo data with API and SQL-backed records.

## Data Status

- The frontend currently owns the demo catalog and page content.
- `Backend/src/` contains folders for controllers, middleware, modules, routes, and `confiq`, but no implemented seed records or API data were found.
- The Vuex store is initialized but has no application state, mutations, or actions.
- Product, artwork, creator, team, dashboard, and category data are defined directly inside Vue components.
- Product and artwork images are mostly local files under `Frontend/images/`; some profile, hero, login, register, and team images are external URLs.

## Product Catalog

### Handcrafted Products

Source: `Frontend/src/Handcraft.vue`

| Product | Maker | Type | Material | Price | Badge |
|---|---|---|---|---:|---|
| Hand-turned African Vessel Set | Nesta Nala, KwaZulu-Natal | KITCHENWARE | Hand-turned clay, 3-piece set | R 148 | HANDCRAFTED |
| Handwoven Basket Set | Beauty Ngxongo, KwaZulu-Natal | RECYCLED CRAFTS | Indigenous fibre, 3-piece set | R 420 | NEW |
| Wood & Woven Coaster Set | Design Afrika Weavers, Cape Town | KITCHENWARE | Wood and woven fibre, 6-piece set | R 950 | SALE; old price R 680 |
| Handcrafted Wooden Desk Organiser | Carrol Boyes Studio, Cape Town | KITCHENWARE | Solid wood, phone/watch/key holder | R 1,350 | KITCHENWARE |
| African Market Tableware Collection | Umtha Craftswomen, Cape Town | KITCHENWARE | Hand-painted ceramic, mixed set | R 1,200 | POPULAR |
| Colourful Storyteller Serving Dish | Zizipho Poswa, Cape Town | KITCHENWARE | Glazed ceramic, hand-painted | R 425 | NEW |
| Carved Wooden Tumbler Set | Imbali Woodcraft Collective, Mpumalanga | KITCHENWARE | Carved wood, 6-piece set | R 396 | NEW |
| Heart-shaped Succulent Planters | Rialheim Studio, Robertson | RECYCLED CRAFTS | Handmade clay, 9-piece set | R 899 | HANDCRAFTED |
| Leather & Wax-print Pouch | Ditiro Mashigo, Johannesburg | RECYCLED CRAFTS | Leather and printed textile, zip pouch | R 420 | LIMITED |
| South African Beaded Mug | Umtha Craftswomen, Cape Town | KITCHENWARE | Glass beads and ceramic, single mug | R 175 | RECYCLED |
| Beaded Market Craft Display | Umtha Craftswomen, Cape Town | RECYCLED CRAFTS | Glass beads and wire, hand-assembled | R 1,750 | POPULAR |

Each handcrafted product also has a descriptive `note` and a local image path from `Frontend/images/Handcrafted/`.

### Handmade Products

Source: `Frontend/src/Handmade.vue`

| Product | Maker | Type | Group | Price | Material |
|---|---|---|---|---:|---|
| Beaded Heritage Necklace | Nandi Mokoena, Johannesburg | NECKLACE | JEWELLERY | R 399.99 | Glass beads, hand-strung |
| Woven Fabric Statement Necklace | Thandiwe Khumalo, Soweto | NECKLACE | JEWELLERY | R 86 | Hand-dyed fabric, recycled beads |
| Carved Wooden Cup | Sipho Mthembu, Durban | CUP | JEWELLERY | R 94 | Indigenous wood, hand-carved |
| Beaded Drop Earrings | Zinhle Maseko, Cape Town | EARRINGS | JEWELLERY | R 72 | Glass beads, brass findings |
| Hand-thrown Terracotta Vase | Naledi Ndlovu, Mabopane | VASE | ORNAMENTS | R 115 | Terracotta clay, wheel-thrown |
| Jute Rope Woven Vase | Ayanda Maseko, Gqeberha | VASE | ORNAMENTS | R 162 | Jute rope, recycled fibre form |
| Hand-carved Story Sculpture | Lethabo Dlamini, Pretoria | SCULPTURE | ORNAMENTS | R 94 | Carved wood, hand-finished |
| Botanical Pressed Wall Art | Bontle Radebe, Bloemfontein | WALL ART | ORNAMENTS | R 78 | Pressed botanicals, natural paper |

Each record also has a descriptive `note`, a local image path from `Frontend/images/Handmade/`, and optional badges such as `BESTSELLER`, `NEW`, `SALE`, or `LIMITED`.

### Artwork

Source: `Frontend/src/Artwork.vue`

All artwork records are currently credited to **Luvo Khwela**, with location `CAPE TOWN, ZA`.

| Title | Medium | Dimensions | Category | Edition | Price |
|---|---|---|---|---|---:|
| Flux Study No. 4 | Oil on linen | 90 x 120 cm | ABSTRACT | Original | R 6,000 |
| Terrain I | Acrylic and sand on board | 60 x 80 cm | ABSTRACT | 1 of 1 | R 6,799 |
| Solvent & Grace | Encaustic wax on panel | 50 x 70 cm | ABSTRACT | Original | R 3,350 |
| Primary Field II | Acrylic on canvas | 100 x 100 cm | ABSTRACT | Original | R 2,999 |
| Form Without Function | Archival inkjet print | 50 x 70 cm | PHOTOGRAPHY | Edition of 20 | R 1,750 |
| Still Interior | C-print, museum glass | 60 x 80 cm | PHOTOGRAPHY | Edition of 10 | R 2,499 |
| Botanical Series III | Pigment prints | Set of 3, 40 x 60 cm | PHOTOGRAPHY | Edition of 15 | R 8,999 |
| Burden Study | Cast bronze | 22 x 14 x 10 cm | SCULPTURE | Edition of 8 | R 2,500 |

Artwork images are mapped from these local files in `Frontend/images/Artwork/`:

- `abstractimages.jpeg`
- `aspire.jpeg`
- `banana.jpeg`
- `birthmom.jpeg`
- `construction.jpeg`
- `empowering.jpeg`
- `gogo.jpeg`
- `women.jpeg`

Each artwork also has a badge and a descriptive text field.

## Creator Records

Source: `Frontend/src/Creators.vue`

The source contains 27 creator records. The page exposes only records that have a name, a South African `, ZA` location, and a name in the `productMakers` allow-list. The source also contains one blank-name/blank-location profile-only record that is filtered out.

### Eligible Creator Names and Roles

| Creator | Role | Location |
|---|---|---|
| Zizipho Poswa | Ceramic Sculptor | Cape Town, ZA |
| Beauty Ngxongo | Basket Weaver | KwaZulu-Natal, ZA |
| Design Afrika Weavers | Basketry Collective | Cape Town, ZA |
| Carrol Boyes Studio | Sculptural Designer | Cape Town, ZA |
| Umtha Craftswomen | Beaded Craft Collective | Cape Town, ZA |
| Imbali Woodcraft Collective | Woodworkers | Mpumalanga, ZA |
| Rialheim Studio | Ceramic Studio | Robertson, ZA |
| Ditiro Mashigo | Textile Artist | Johannesburg, ZA |
| Nandi Mokoena | Beadwork Artist | Johannesburg, ZA |
| Thandiwe Khumalo | Textile Jewellery Artist | Soweto, ZA |
| Sipho Mthembu | Woodworker | Durban, ZA |
| Zinhle Maseko | Beadwork Artist | Cape Town, ZA |
| Naledi Ndlovu | Ceramicist | Mabopane, ZA |
| Ayanda Maseko | Fibre Artist | Gqeberha, ZA |
| Lethabo Dlamini | Woodcarver | Pretoria, ZA |
| Bontle Radebe | Botanical Artist | Bloemfontein, ZA |
| Nesta Nala | Ceramic Artist | KwaZulu-Natal, ZA |
| Luvo Khwela | Painter | Cape Town, ZA |

The source also defines profile records for Amahle Ndlovu, Thabo Mokoena, Lerato Dlamini, Sipho Khumalo, Naledi van der Merwe, Zanele Mthembu, Andile Dyalvane, Dylan Evans, and a blank-name ceramicist/candle-maker record. These are not in the product-maker allow-list and therefore are not displayed by `eligibleCreators`.

Each creator record may contain:

- `name`
- `role`
- `location`
- `image`
- `avatar`
- `featured`
- `accepting`
- `years`
- `pieces`
- `rating`
- `reviews`
- `tags`
- `bio`
- `lead`
- `from`

The `artworkByCreator` map assigns local product images to displayed creator profiles. Luvo Khwela is mapped to `Frontend/images/Artwork/abstractimages.jpeg`; other creators map to relevant Handcrafted or Handmade images.

## Home Page Data

Source: `Frontend/src/views/HomeView.vue`

### Pillars

- **Creator Discovery**: discover verified artisans, stories, and portfolios.
- **Direct Purchasing**: add catalog products to a secure simulated cart.
- **Bespoke Requests**: submit custom briefs and negotiate creator estimates.

### Category Cards

- Artwork -> `Frontend/images/Artwork/abstractimages.jpeg`
- Hand-Crafted -> `Frontend/images/Handcrafted/antique-set.jpg`
- Hand-made -> `Frontend/images/Handmade/beadwork-necklace.jpg`

The Home page also contains static hero copy, workflow descriptions, CTA copy, footer labels, and an external hero image URL.

## About Us Data

Source: `Frontend/src/views/AboutView.vue`

Static team records:

| Team | Role | Responsibilities |
|---|---|---|
| Aviv & Busiswa | UI Designers & Full-Stack Integration Developers | UI/layout integration, onboarding, JWT authentication, and global database schemas |
| Khaalid & Phumzile | Product, Order & Database Developers | product listings, creator catalogs, cart operations, payment simulation, and checkout management |

The page also contains static mission, vision, South African craft, customer benefits, creator benefits, project scope, CTA, and external image/avatar content.

## Dashboard Dummy Data

Source: `Frontend/src/views/CustomerDashboard.vue`

### Summary Stats

- Total orders: `5`
- Pending orders: `2`
- Cart items: `3`

### Recent Orders

| Order | Items | Date | Status |
|---|---:|---|---|
| #1002 | 2 | 8 September 2026 | Pending |
| #1001 | 1 | 2 September 2026 | Completed |
| #1000 | 3 | 28 August 2026 | Completed |

Profile, order-history, and custom-request buttons are presentational controls without backend handlers.

## Authentication and Registration Demo Data

Sources: `Frontend/src/views/LoginView.vue`, `Frontend/src/views/RegisterView.vue`, `Frontend/src/cartStore.js`

### Login Defaults

- Role defaults to `buyer`.
- Email defaults to an empty string.
- Password defaults to an empty string.
- Login currently logs the submitted payload and sets a browser authentication flag. It does not validate against a database.

### Registration Defaults

- Role defaults to `buyer`, or `creator` when `?role=creator` is in the URL.
- `fullName`, `email`, `password`, `address`, `interest`, `studioName`, `craftCategory`, `location`, and `bio` default to empty strings.
- Registration currently logs the payload and sets the same browser authentication flag. It does not create a database user.

## Cart and Checkout Demo State

Source: `Frontend/src/cartStore.js`, `Frontend/src/LandingPage.vue`

- Cart localStorage key: `artisan-hub-cart`.
- Authentication localStorage key: `artisan-hub-authenticated`.
- Pending item sessionStorage key: `artisan-hub-pending-cart-item`.
- New carts default to an empty array.
- Added items are copies of catalog records with `quantity: 1`.
- Adding an existing item increments its quantity.
- Prices are parsed from display values using `getPrice()`.
- Unauthenticated Add to Cart saves one pending item, opens login, then restores it after login/signup.
- Checkout order IDs are generated as `AH-${Date.now()}`.
- Shipping and tax are currently `R 0.00`.
- Payment card fields are required in the UI but are not sent to a payment processor.
- Email confirmation is sent through EmailJS using environment variables, not a backend mail service.

## Routes

Source: `Frontend/src/router/index.js`

| Route | Component | Notes |
|---|---|---|
| `/` | `HomeView.vue` | Home page |
| `/landing` | `LandingPage.vue` | Landing/payment component |
| `/register` | `RegisterView.vue` | Demo registration |
| `/login` | `LoginView.vue` | Demo login |
| `/about` | `AboutView.vue` | About page |
| `/handcraft` | `Handcraft.vue` | Handcrafted catalog |
| `/marketplace` | `Handcraft.vue` | Alias for Handcrafted |
| `/handmade` | `Handmade.vue` | Handmade catalog |
| `/artwork` | `Artwork.vue` | Artwork catalog |
| `/creators` | `Creators.vue` | Creator directory |

## External and Local Assets

### Local Asset Folders

- `Frontend/images/Artwork/`
- `Frontend/images/Handcrafted/`
- `Frontend/images/Handmade/`
- `Frontend/src/assets/`

### External Sources in Code

- Home hero artwork URL in `HomeView.vue`.
- About hero image and team avatar URLs in `AboutView.vue`.
- Login visual URL in `LoginView.vue`.
- Registration visual URL in `RegisterView.vue`.
- Unsplash creator images and avatars in `Creators.vue`.
- Google Fonts imports in `Frontend/src/assets/globalStyle.css` and `Frontend/src/style.css`.

## Migration Checklist for SQL Backend

1. Create tables for users, creators, products, artwork, categories, carts, cart_items, orders, order_items, and email/notification logs.
2. Move the Handcraft, Handmade, Artwork, and Creator arrays into seed scripts.
3. Replace localStorage authentication with server sessions or JWTs.
4. Replace localStorage cart operations with authenticated `/api/cart` endpoints.
5. Store prices as numeric database values, not formatted strings such as `R 399.99`.
6. Store image paths/URLs as asset fields related to products and creators.
7. Calculate shipping, tax, totals, and order IDs on the backend.
8. Validate that creator names, product makers, locations, and artwork attribution use foreign-key relationships.
9. Replace dashboard totals and orders with authenticated database queries.
10. Replace static login/register logging with real validation and error responses.
11. Move EmailJS or email delivery behind a backend service if credentials or business rules need protection.
12. Add seed data tests to catch mismatched maker names, duplicate creators, missing images, invalid prices, and products without creators.

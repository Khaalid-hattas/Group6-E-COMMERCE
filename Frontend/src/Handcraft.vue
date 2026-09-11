<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import logo from "./assets/artisanhub-logo.png";
import Navbar from "./components/Navbar.vue";
import {
  addCartItem,
  savePendingCartItem,
  cartItems,
  changeCartQuantity,
  getItemName,
  getItemType,
  isAuthenticated,
  removeCartItem,
} from "./cartStore";

const activeCategory = ref("ALL");
const cartOpen = ref(false);
const router = useRouter();

const makers = [
  {
    name: "NESTA NALA",
    piece: "Hand-turned African Vessel Set",
    location: "KWAZULU-NATAL, ZA",
    detail: "Handbuilt ceramics · Contemporary African forms",
    image: new URL("../images/Handcrafted/antique-set.jpg", import.meta.url).href,
  },
  {
    name: "Zizipho Poswa",
    piece: "Hand-painted Ceramic Kitchen Set",
    location: "CAPE TOWN, ZA",
    detail: "Ceramics & sculpture · Imiso Ceramics",
    image: new URL("../images/Handcrafted/kitchenset.jpg", import.meta.url).href,
  },
  {
    name: "ZIZIPHO POSWA",
    piece: "Colourful Storyteller Serving Dish",
    location: " CAPE TOWN, ZA",
    detail: "Traditional basketry · Handwoven grass vessels",
    image: new URL("../images/Handcrafted/handcrafted-dish.webp", import.meta.url).href,
  },
  {
    name: "BEAUTY NGXONGO",
    piece: "Handwoven Basket Set",
    location: "KWAZULU-NATAL, ZA",
    detail: "Handmade jewellery · Augenta founder",
    image: new URL("../images/Handcrafted/basket.jpg", import.meta.url).href,
  },
];

const products = [
  {
    name: "Hand-turned African Vessel Set",
    maker: "NESTA NALA · KWAZULU-NATAL, ZA",
    type: "KITCHENWARE",
    material: "Hand-turned clay · 3-piece set",
    price: 148,
    note: "Three sculptural vessels with burnished surfaces and individual hand-finished marks.",
    badge: "HANDCRAFTED",
    image:
      new URL("../images/Handcrafted/antique-set.jpg", import.meta.url).href,
  },
  {
    name: "Handwoven Basket Set",
    maker: "BEAUTY NGXONGO · KWAZULU-NATAL, ZA",
    type: "RECYCLED CRAFTS",
    material: "Indigenous fibre · 3-piece set",
    price: 420,
    note: "Nested baskets woven by hand for storage, serving and everyday display.",
    badge: "NEW",
    image:
      new URL("../images/Handcrafted/basket.jpg", import.meta.url).href,
  },
  {
    name: "Wood & Woven Coaster Set",
    maker: "DESIGN AFRIKA WEAVERS · CAPE TOWN, ZA",
    type: "KITCHENWARE",
    material: "Wood & woven fibre · 6-piece set",
    price: 950,
    note: "Warm wooden coasters finished with woven centres and a hand-built holder.",
    badge: "SALE",
    oldPrice: 680,
    image:
      new URL("../images/Handcrafted/costerset.jpg", import.meta.url).href,
  },
  {
    name: "Handcrafted Wooden Desk Organiser",
    maker: "CARROL BOYES STUDIO · CAPE TOWN, ZA",
    type: "KITCHENWARE",
    material: "Solid wood · Phone, watch & key holder",
    price: 1350,
    note: "A practical entryway organiser with handmade compartments for daily essentials.",
    badge: "KITCHENWARE",
    image:
      new URL("../images/Handcrafted/Essential-holder.jpg", import.meta.url).href,
  },
  {
    name: "African Market Tableware Collection",
    maker: "UMTHA CRAFTSWOMEN · CAPE TOWN, ZA",
    type: "KITCHENWARE",
    material: "Hand-painted ceramic · Mixed set",
    price: 1200,
    note: "A colourful collection of handmade tableware inspired by South African craft markets.",
    badge: "POPULAR",
    image:
      new URL("../images/Handcrafted/Gemini_Generated_Image_nvg711nvg711nvg7.jpg", import.meta.url).href,
  },
  {
    name: "Colourful Storyteller Serving Dish",
    maker: "ZIZIPHO POSWA · CAPE TOWN, ZA",
    type: "KITCHENWARE",
    material: "Glazed ceramic · Hand-painted",
    price: 425,
    note: "A joyful serving dish shaped as a figurative storyteller and finished with bright colour.",
    badge: "NEW",
    image:
      new URL("../images/Handcrafted/handcrafted-dish.webp", import.meta.url).href,
  },
  {
    name: "Carved Wooden Tumbler Set",
    maker: "IMBALI WOODCRAFT COLLECTIVE · MPUMALANGA, ZA",
    type: "KITCHENWARE",
    material: "Carved wood · 6-piece set",
    price: 396,
    note: "Lightweight wooden tumblers with a smooth finish for everyday drinks and gatherings.",
    badge: "NEW",
    image:
      new URL("../images/Handcrafted/mugset.jpg", import.meta.url).href,
  },
  {
    name: "Heart-shaped Succulent Planters",
    maker: "RIALHEIM STUDIO · ROBERTSON, ZA",
    type: "RECYCLED CRAFTS",
    material: "Handmade clay · 9-piece set",
    price: 899,
    note: "Playful heart-shaped planters made for small succulents, herbs and sunny windowsills.",
    badge: "HANDCRAFTED",
    image:
      new URL("../images/Handcrafted/potplants.jpg", import.meta.url).href,
  },
  {
    name: "Leather & Wax-print Pouch",
    maker: "DITIRO MASHIGO · JOHANNESBURG, ZA",
    type: "RECYCLED CRAFTS",
    material: "Leather & printed textile · Zip pouch",
    price: 420,
    note: "A compact handmade pouch combining soft leather with a bold botanical wax-print panel.",
    badge: "LIMITED",
    image:
      new URL("../images/Handcrafted/purse.jpg", import.meta.url).href,
  },
  {
    name: "South African Beaded Mug",
    maker: "UMTHA CRAFTSWOMEN · CAPE TOWN, ZA",
    type: "KITCHENWARE",
    material: "Glass beads & ceramic · Single mug",
    price: 175,
    note: "A bold mug wrapped in hand-stitched beadwork inspired by South African colour and pattern.",
    badge: "RECYCLED",
    image:
      new URL("../images/Handcrafted/SA-rank.jpg", import.meta.url).href,
  },
  {
    name: "Beaded Market Craft Display",
    maker: "UMTHA CRAFTSWOMEN · CAPE TOWN, ZA",
    type: "RECYCLED CRAFTS",
    material: "Glass beads & wire · Hand-assembled",
    price: 1750,
    note: "A vibrant handmade display of beaded vessels and wire animals from a local craft market.",
    badge: "POPULAR",
    image:
      new URL("../images/Handcrafted/Gemini_Generated_Image_nvg711nvg711nvg7.jpg", import.meta.url).href,
  },
];

const filteredProducts = computed(() =>
  activeCategory.value === "ALL"
    ? products
    : products.filter((product) => product.type === activeCategory.value),
);
const cartCount = computed(() =>
  cartItems.value.reduce((total, item) => total + item.quantity, 0),
);
const cartTotal = computed(() =>
  cartItems.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  ),
);

function money(value) {
  return `R ${value.toLocaleString("en-ZA")}`;
}

function addToCart(product) {
  if (isAuthenticated.value) {
    addCartItem(product);
    cartOpen.value = true;
    return;
  }

  savePendingCartItem(product);
  router.push({ path: "/login", query: { redirect: "/handcraft" } });
}

function changeQuantity(item, amount) {
  changeCartQuantity(item, amount);
}

function removeItem(item) {
  removeCartItem(item);
}
</script>

<template>
  <Navbar />
  <div class="handcraft-page">
    <header class="site-header">
      <a class="logo" href="/">
        <img class="brand-logo" :src="logo" alt="Artisan Hub" />
      </a>
      <label class="search-box"
        ><span class="sr-only">Search handcrafts</span
        ><input
          type="search"
          placeholder="Search handcrafts, artwork..."
        /><span class="search-icon">⌕</span></label
      >
      <nav class="main-nav" aria-label="Main navigation">
        <a class="active" href="/handcraft">Handcrafted</a
        ><a href="/handmade">Handmade</a><a href="/artwork">Artwork</a>
        <a href="/creators">Creators</a><a href="/about">About Us</a>
      </nav>
      <button
        class="bag-button"
        type="button"
        aria-label="Open shopping bag"
        @click="cartOpen = true"
      >
        ♧<span v-if="cartCount" class="bag-count">{{ cartCount }}</span>
      </button>
    </header>

    <div v-if="cartOpen" class="bag-backdrop" @click="cartOpen = false"></div>
    <aside v-if="cartOpen" class="bag-drawer" aria-label="Shopping bag">
      <div class="bag-heading">
        <h2>Your Bag ({{ cartCount }})</h2>
        <button
          type="button"
          aria-label="Close shopping bag"
          @click="cartOpen = false"
        >
          ×
        </button>
      </div>
      <div v-if="cartItems.length" class="bag-list">
        <article v-for="item in cartItems" :key="getItemName(item)" class="bag-item">
          <img v-if="item.image" :src="item.image" :alt="getItemName(item)" />
          <div v-else class="bag-item-image-placeholder">ARTISAN</div>
          <div class="bag-item-info">
            <p>{{ getItemName(item) }}</p>
            <small>{{ item.maker || item.artist || getItemType(item) }} · Qty {{ item.quantity }}</small
            ><strong>{{ money(item.price * item.quantity) }}</strong>
            <div class="quantity-controls">
              <button
                type="button"
                aria-label="Decrease quantity"
                @click="changeQuantity(item, -1)"
              >
                −</button
              ><span>{{ item.quantity }}</span
              ><button
                type="button"
                aria-label="Increase quantity"
                @click="changeQuantity(item, 1)"
              >
                +
              </button>
            </div>
          </div>
          <button class="remove-button" type="button" @click="removeItem(item)">
            Remove
          </button>
        </article>
      </div>
      <div v-else class="empty-bag">
        <p>Your bag is empty.</p>
        <button type="button" @click="$router.push('/')">
          Continue shopping
        </button>
      </div>
      <div v-if="cartItems.length" class="bag-footer">
        <div>
          <span>Total</span><strong>{{ money(cartTotal) }}</strong>
        </div>
        <button type="button" @click="$router.push({ name: 'landing', hash: '#checkout' })">CHECKOUT</button
        ><button
          class="continue-button"
          type="button"
          @click="$router.push('/')"
        >
          Continue Shopping
        </button>
      </div>
    </aside>

    <main id="top">
      <section class="craft-hero">
        <div class="hero-copy">
          <p class="kicker">MADE BY HAND · SIGNED BY MAKER</p>
          <h1>Handcrafted<br /><em>for your home.</em></h1>
          <p>
            Wheel-thrown ceramics and carved woodwork for the kitchen, alongside
            goods made with recycled and sustainable materials — all from makers
            we've visited in person.
          </p>
          <ul>
            <li>Every piece signed</li>
            <li>Max 200 per batch</li>
            <li>80% to the maker</li>
            <li>Recyclable packaging</li>
          </ul>
        </div>
        <div class="hero-images">
          <div class="hero-image hero-image-pottery">
            <img
              src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=85"
              alt="Handcrafted pottery vessels"
            />
          </div>
          <div class="hero-image hero-image-goods">
            <img
              src="https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=900&q=85"
              alt="Handcrafted pottery and home goods"
            />
          </div>
        </div>
      </section>
      <section class="maker-section">
        <p class="kicker">THE PEOPLE BEHIND THE PIECES</p>
        <div class="maker-grid">
          <article v-for="maker in makers" :key="maker.name">
            <img :src="maker.image" :alt="maker.name" />
            <h2>{{ maker.piece }}</h2>
            <p>{{ maker.name }} · {{ maker.location }}</p>
            <small>{{ maker.detail }}</small>
          </article>
        </div>
      </section>
      <section id="products" class="product-section">
        <div class="section-heading">
          <div>
            <p class="kicker">BROWSE</p>
            <h2>All handcrafted goods</h2>
          </div>
          <div class="category-tabs">
            <button
              v-for="category in ['ALL', 'KITCHENWARE', 'RECYCLED CRAFTS']"
              :key="category"
              :class="{ selected: activeCategory === category }"
              @click="activeCategory = category"
            >
              {{ category }}
            </button>
          </div>
        </div>
        <div class="product-grid">
          <article
            v-for="product in filteredProducts"
            :key="product.name"
            class="product-card"
          >
            <div class="product-image">
              <img :src="product.image" :alt="product.name" /><span
                class="product-badge"
                >{{ product.badge }}</span
              ><button
                class="add-button"
                type="button"
                @click="addToCart(product)"
              >
                ADD TO CART
              </button>
            </div>
            <p class="maker-line">{{ product.maker }}</p>
            <h3>{{ product.name }}</h3>
            <p class="material">{{ product.material }}</p>
            <div class="price-line">
              <strong>{{ money(product.price) }}</strong
              ><del v-if="product.oldPrice">{{ money(product.oldPrice) }}</del>
            </div>
            <p class="description">{{ product.note }}</p>
          </article>
        </div>
      </section>
    </main>

    <footer id="about" class="site-footer">
      <div class="footer-brand">
        <span class="logo-mark">A</span><strong>ARTISAN HUB.</strong>
        <p>
          Connecting people with independent makers since 2021. Every piece
          signed. Every maker visited.
        </p>
      </div>
      <div>
        <p class="footer-title">SHOP</p>
        <a href="#products">Handcrafted</a><a href="#products">Artwork</a
        ><a href="#products">New Arrivals</a><a href="#products">Sale</a>
      </div>
      <div>
        <p class="footer-title">COMPANY</p>
        <a href="#about">About Us</a><a href="#creators">How It Works</a
        ><a href="#creators">For Makers</a><a href="#about">Press</a>
      </div>
      <div>
        <p class="footer-title">HELP</p>
        <a href="#about">Shipping &amp; Returns</a><a href="#about">FAQ</a
        ><a href="#about">Contact</a><a href="#about">Track Order</a>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.handcraft-page {
  --paper: #f3eee4;
  --ink: #200b07;
  --rust: #8f3f1c;
  --muted: #997b69;
  --line: #ded5c7;
  color: var(--ink);
  background: var(--paper);
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
}
.handcraft-page > .site-header {
  display: none;
}
.site-header {
  height: 84px;
  padding: 0 2.1%;
  display: flex;
  align-items: center;
  gap: 3.2%;
  border-bottom: 1px solid var(--line);
  background: var(--paper);
  position: sticky;
  top: 0;
  z-index: 10;
}
.logo {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 280px;
  color: var(--ink);
  text-decoration: none;
}
.brand-logo {
  width: 68px;
  height: 68px;
  display: block;
  object-fit: contain;
}
.logo-mark {
  display: inline-grid;
  place-items: center;
  width: 48px;
  height: 48px;
  color: #fff;
  background: #893b1d;
  font:
    22px Georgia,
    serif;
}
.logo strong {
  display: block;
  font:
    700 21px Georgia,
    serif;
  letter-spacing: -0.03em;
}
.logo small {
  display: block;
  margin-top: 4px;
  color: #99745f;
  letter-spacing: 0.16em;
  font-size: 12px;
}
.search-box {
  position: relative;
  width: min(32vw, 480px);
  margin-left: auto;
}
.search-box input {
  width: 100%;
  height: 44px;
  border: 1px solid #d9d0c4;
  padding: 0 45px 0 18px;
  color: var(--ink);
  background: #fff;
  font-size: 17px;
  outline: none;
}
.search-icon {
  position: absolute;
  right: 16px;
  top: 6px;
  color: #aa927f;
  font-size: 29px;
}
.main-nav {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-left: auto;
  white-space: nowrap;
}
.main-nav a {
  padding: 30px 0 11px;
  color: var(--ink);
  font-size: 16px;
  text-decoration: none;
}
.main-nav a.active {
  color: var(--rust);
  border-bottom: 1px solid var(--rust);
}
.bag-button {
  position: relative;
  border: 0;
  color: var(--ink);
  background: transparent;
  font-size: 29px;
  cursor: pointer;
}
.bag-count {
  position: absolute;
  top: -4px;
  right: -9px;
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  color: #fff;
  background: var(--rust);
  font-size: 11px;
}
.craft-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8%;
  align-items: center;
  width: 100%;
  max-width: 1500px;
  min-height: 620px;
  margin: auto;
  padding: 58px 11.5%;
}
.kicker {
  margin: 0 0 28px;
  color: #9e806e;
  letter-spacing: 0.28em;
  font-size: 13px;
}
.hero-copy h1 {
  margin: 0 0 27px;
  font:
    700 clamp(50px, 5vw, 70px) / 1.02 "Playfair Display",
    Georgia,
    serif;
  letter-spacing: -0.05em;
}
.hero-copy h1 em {
  color: var(--rust);
  font-weight: 600;
}
.hero-copy > p:not(.kicker) {
  max-width: 540px;
  color: var(--muted);
  font-size: 18px;
  line-height: 1.55;
}
.hero-copy ul {
  display: flex;
  flex-wrap: wrap;
  gap: 15px 24px;
  margin: 27px 0 0;
  padding: 0;
  color: var(--muted);
  list-style: none;
}
.hero-copy li::before {
  content: "•";
  margin-right: 8px;
  color: var(--rust);
  font-size: 20px;
}
.hero-images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.hero-image {
  position: relative;
  height: 464px;
  overflow: hidden;
  background-position: center;
  background-size: cover;
}
.hero-image::after {
  position: absolute;
  inset: 0;
  content: "";
  background: linear-gradient(180deg, rgba(243, 238, 228, 0.05), rgba(22, 10, 6, 0.16));
  pointer-events: none;
}
.hero-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  opacity: 0.92;
  animation: hero-image-fade 7s ease-in-out infinite alternate;
}
.hero-image-goods img {
  animation-delay: -3.5s;
}
@keyframes hero-image-fade {
  0%,
  100% {
    opacity: 0.68;
    transform: scale(1.02);
  }
  50% {
    opacity: 1;
    transform: scale(1.06);
  }
}
.maker-section {
  padding: 58px 11.5% 72px;
  background: #b8c4a8;
}
.maker-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.maker-grid img {
  width: 100%;
  height: 250px;
  display: block;
  object-fit: cover;
}
.maker-grid h2 {
  margin: 14px 0 5px;
  font:
    700 20px Georgia,
    serif;
}
.maker-grid p {
  margin: 0 0 7px;
  color: var(--muted);
  letter-spacing: 0.12em;
  font-size: 12px;
}
.maker-grid small {
  color: var(--muted);
  font-size: 14px;
}
.product-section {
  width: 100%;
  max-width: none;
  margin: auto;
  padding: 75px 2.3% 105px;
}
.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 25px;
  margin-bottom: 36px;
}
.section-heading h2 {
  margin: 0;
  font:
    700 clamp(35px, 4vw, 50px) / 1.1 "Playfair Display",
    Georgia,
    serif;
}
.category-tabs {
  display: flex;
}
.category-tabs button {
  border: 1px solid var(--line);
  border-right: 0;
  padding: 12px 22px;
  color: var(--muted);
  background: transparent;
  letter-spacing: 0.12em;
  font-weight: 700;
  cursor: pointer;
}
.category-tabs button:last-child {
  border-right: 1px solid var(--line);
}
.category-tabs button.selected {
  color: #fff;
  border-color: var(--ink);
  background: var(--ink);
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 42px 30px;
}
.product-image {
  position: relative;
  height: 430px;
  overflow: hidden;
  background: #ddd5c8;
}
.product-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.35s;
}
.product-card:hover img {
  transform: scale(1.03);
}
.product-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 6px 9px;
  color: #fff;
  background: var(--ink);
  letter-spacing: 0.08em;
  font-size: 11px;
  font-weight: 700;
}
.add-button {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  border: 0;
  padding: 16px;
  color: #fff;
  background: var(--ink);
  letter-spacing: 0.12em;
  font-weight: 700;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.2s;
}
.product-card:hover .add-button {
  opacity: 1;
}
.maker-line {
  margin: 16px 0 7px;
  color: #9e806e;
  letter-spacing: 0.1em;
  font-size: 11px;
}
.product-card h3 {
  margin: 0 0 7px;
  color: var(--rust);
  font:
    700 20px Georgia,
    serif;
}
.material,
.description {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.5;
}
.price-line {
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 9px 0;
}
.price-line strong {
  font:
    700 19px Georgia,
    serif;
}
.price-line del {
  color: var(--muted);
  font-size: 14px;
}
.site-footer {
  display: grid;
  grid-template-columns: 1.25fr 1fr 1fr 1fr;
  gap: 6%;
  padding: 75px 11.5% 88px;
  color: #fff;
  background: #200b07;
}
.footer-brand {
  max-width: 370px;
}
.footer-brand .logo-mark {
  width: 42px;
  height: 42px;
  vertical-align: middle;
  margin-right: 12px;
}
.footer-brand strong {
  font:
    700 21px Georgia,
    serif;
}
.footer-brand p,
.site-footer a {
  color: #b29686;
}
.footer-brand p {
  margin-top: 27px;
  line-height: 1.6;
}
.site-footer a {
  display: block;
  margin-bottom: 21px;
  text-decoration: none;
}
.footer-title {
  margin: 7px 0 35px;
  color: #9e806e;
  letter-spacing: 0.16em;
}
.bag-count {
  position: absolute;
}
.bag-backdrop {
  position: fixed;
  inset: 0;
  z-index: 19;
  background: rgba(22, 10, 6, 0.38);
}
.bag-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 21;
  width: min(430px, 100vw);
  display: flex;
  flex-direction: column;
  color: var(--ink);
  background: var(--paper);
  box-shadow: -12px 0 35px rgba(22, 10, 6, 0.18);
}
.bag-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 34px 28px 26px;
  border-bottom: 1px solid var(--line);
}
.bag-heading h2 {
  margin: 0;
  font:
    700 28px "Playfair Display",
    Georgia,
    serif;
}
.bag-heading button {
  border: 0;
  color: var(--rust);
  background: transparent;
  font-size: 32px;
  cursor: pointer;
}
.bag-list {
  overflow: auto;
  padding: 20px 28px;
}
.bag-item {
  display: grid;
  grid-template-columns: 82px 1fr;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid var(--line);
}
.bag-item img,
.bag-item-image-placeholder {
  width: 82px;
  height: 100px;
  object-fit: cover;
}
.bag-item-image-placeholder {
  display: grid;
  place-items: center;
  color: var(--muted);
  background: #e1d5c4;
  font-size: 11px;
  letter-spacing: 0.1em;
}
.bag-item p {
  margin: 3px 0 8px;
  color: var(--rust);
  font:
    700 18px Georgia,
    serif;
}
.bag-item small {
  display: block;
  margin-bottom: 12px;
  color: var(--muted);
  font-size: 11px;
}
.bag-item strong {
  display: block;
  font-size: 17px;
}
.quantity-controls {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 12px;
}
.quantity-controls button {
  width: 28px;
  height: 28px;
  border: 1px solid var(--line);
  color: var(--rust);
  background: transparent;
  font-size: 20px;
  cursor: pointer;
}
.quantity-controls span {
  min-width: 16px;
  text-align: center;
}
.remove-button {
  margin-top: 12px;
  border: 0;
  padding: 0;
  color: var(--muted);
  background: transparent;
  text-decoration: underline;
  cursor: pointer;
}
.empty-bag {
  margin: auto;
  color: var(--muted);
  font-size: 18px;
  text-align: center;
}
.empty-bag button {
  border: 1px solid var(--rust);
  padding: 12px 16px;
  color: #fff;
  background: var(--rust);
  cursor: pointer;
}
.bag-footer {
  margin-top: auto;
  border-top: 1px solid var(--line);
  padding: 22px 28px 28px;
}
.bag-footer > div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
  color: var(--muted);
}
.bag-footer strong {
  color: var(--ink);
  font:
    700 20px Georgia,
    serif;
}
.bag-footer > button {
  width: 100%;
  border: 0;
  padding: 15px;
  color: #fff;
  background: #200b07;
  letter-spacing: 0.12em;
  font-weight: 700;
  cursor: pointer;
}
.bag-footer .continue-button {
  margin-top: 12px;
  color: var(--rust);
  background: transparent;
}
@media (max-width: 1100px) {
  .main-nav {
    gap: 14px;
  }
  .main-nav a {
    font-size: 13px;
  }
  .logo {
    min-width: auto;
  }
  .craft-hero,
  .maker-section,
  .site-footer {
    padding-right: 4%;
    padding-left: 4%;
  }
  .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 700px) {
  .site-header {
    height: auto;
    min-height: 76px;
    flex-wrap: wrap;
    padding: 14px 18px;
    gap: 15px;
  }
  .logo {
    flex: 1;
  }
  .search-box {
    order: 3;
    width: 100%;
    margin: 0;
  }
  .main-nav {
    display: none;
  }
  .craft-hero {
    grid-template-columns: 1fr;
    min-height: auto;
    padding: 58px 24px;
  }
  .hero-images {
    order: -1;
  }
  .hero-image {
    height: 310px;
  }
  .maker-section {
    padding: 48px 24px;
  }
  .maker-grid {
    grid-template-columns: 1fr 1fr;
    gap: 28px 14px;
  }
  .maker-grid img {
    height: 190px;
  }
  .product-section {
    padding: 55px 2.3% 75px;
  }
  .section-heading {
    display: block;
  }
  .category-tabs {
    margin-top: 25px;
    overflow-x: auto;
  }
  .category-tabs button {
    flex: 1;
    white-space: nowrap;
    padding: 11px 13px;
  }
  .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 35px 14px;
  }
  .product-image {
    height: 280px;
  }
  .product-card h3 {
    font-size: 17px;
  }
  .product-details {
    font-size: 12px;
  }
  .site-footer {
    grid-template-columns: 1fr 1fr;
    padding: 60px 24px;
    gap: 35px;
  }
  .footer-brand {
    grid-column: 1/-1;
  }
}
@media (max-width: 430px) {
  .maker-grid,
  .product-grid {
    grid-template-columns: 1fr;
  }
  .hero-images {
    grid-template-columns: 1fr 1fr;
  }
  .hero-image {
    height: 290px;
  }
  .site-footer {
    grid-template-columns: 1fr;
  }
  .footer-brand {
    grid-column: auto;
  }
}
</style>

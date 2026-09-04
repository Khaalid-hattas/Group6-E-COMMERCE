<script setup>
import { computed, ref } from "vue";

const activeCategory = ref("ALL");
const cartOpen = ref(false);
const cartItems = ref([]);

const makers = [
  {
    name: "Elena Vasquez",
    location: "OAXACA, MX",
    detail: "Reduction-fired stoneware · 14 years",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Mika Tanaka",
    location: "KYOTO, JP",
    detail: "Ash-glaze ceramics · 3rd generation",
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Sofia Reyes",
    location: "BARCELONA, ES",
    detail: "Recycled fibre macramé · zero-dye",
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "James Okoro",
    location: "PORTLAND, OR",
    detail: "Hand-carved walnut · sustainably sourced",
    image:
      "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=800&q=85",
  },
];

const products = [
  {
    name: "Vessel Stoneware Bowl",
    maker: "ELENA VASQUEZ · OAXACA, MX",
    type: "KITCHENWARE",
    material: "Hand-thrown · Single piece",
    price: 148,
    note: "14 years at the wheel. No two bowls share the same finish.",
    badge: "HANDCRAFTED",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Wheel Series Serving Set",
    maker: "MIKA TANAKA · KYOTO, JP",
    type: "KITCHENWARE",
    material: "4-piece · Wheel-thrown",
    price: 420,
    note: "An ash-glaze tradition passed through three generations of the Tanaka family.",
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Walnut End-grain Board",
    maker: "JAMES OKORO · PORTLAND, OR",
    type: "KITCHENWARE",
    material: 'Hand-carved · 18" × 12"',
    price: 235,
    note: "Sustainably harvested Pacific Northwest walnut. Never sanded below 220 grit.",
    badge: "SALE",
    oldPrice: 280,
    image:
      "https://images.unsplash.com/photo-1593182440959-9d5165b29e16?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Grove Ceramic Dinnerware",
    maker: "LENA BAUER · BERLIN, DE",
    type: "KITCHENWARE",
    material: "4-setting · Slip-cast",
    price: 310,
    note: "Slip-cast in small batches in Lena's Berlin studio. Dishwasher safe.",
    badge: "KITCHENWARE",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Lavender Soy Candle",
    maker: "LENA BAUER · BERLIN, DE",
    type: "RECYCLED CRAFTS",
    material: "200g · 45hr burn",
    price: 120,
    note: "Poured into reclaimed glass jars. Refillable — send back, get 20% off.",
    badge: "POPULAR",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Macramé Plant Hanger",
    maker: "SOFIA REYES · BARCELONA, ES",
    type: "RECYCLED CRAFTS",
    material: "Natural rope · Set of 2",
    price: 185,
    note: "Holds pots up to 25cm. Each hanger knotted by hand.",
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=85",
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
  const existing = cartItems.value.find((item) => item.name === product.name);
  if (existing) existing.quantity += 1;
  else cartItems.value.push({ ...product, quantity: 1 });
  cartOpen.value = true;
}

function changeQuantity(item, amount) {
  item.quantity += amount;
  if (item.quantity <= 0) removeItem(item);
}

function removeItem(item) {
  cartItems.value = cartItems.value.filter(
    (cartItem) => cartItem.name !== item.name,
  );
}
</script>

<template>
  <div class="handcraft-page">
    <header class="site-header">
      <a class="logo" href="#handcraft"
        ><span class="logo-mark">A</span
        ><span
          ><strong>ARTISAN HUB.</strong><small>ARTISAN GOODS</small></span
        ></a
      >
      <label class="search-box"
        ><span class="sr-only">Search handcrafts</span
        ><input
          type="search"
          placeholder="Search handcrafts, artwork..."
        /><span class="search-icon">⌕</span></label
      >
      <nav class="main-nav" aria-label="Main navigation">
        <a class="active" href="#handcraft">Handcrafted</a
        ><a href="#handmade">Handmade</a><a href="#artwork">Artwork</a>
        <a href="#creators">Creators</a><a href="#about">About Us</a>
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
        <article v-for="item in cartItems" :key="item.name" class="bag-item">
          <div class="bag-item-info">
            <p>{{ item.name }}</p>
            <small>{{ item.maker }}</small
            ><strong>{{ money(item.price) }}</strong>
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
        <button type="button" @click="cartOpen = false">
          Continue shopping
        </button>
      </div>
      <div v-if="cartItems.length" class="bag-footer">
        <div>
          <span>Total</span><strong>{{ money(cartTotal) }}</strong>
        </div>
        <button type="button" @click="cartOpen = false">CHECKOUT</button
        ><button
          class="continue-button"
          type="button"
          @click="cartOpen = false"
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
          <div class="hero-image hero-image-pottery"></div>
          <div class="hero-image hero-image-macrame"></div>
        </div>
      </section>
      <section class="maker-section">
        <p class="kicker">THE PEOPLE BEHIND THE PIECES</p>
        <div class="maker-grid">
          <article v-for="maker in makers" :key="maker.name">
            <img :src="maker.image" :alt="maker.name" />
            <h2>{{ maker.name }}</h2>
            <p>{{ maker.location }}</p>
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
  --ink: #160a06;
  --rust: #8f3f1c;
  --muted: #997b69;
  --line: #ded5c7;
  color: var(--ink);
  background: var(--paper);
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
}
.site-header {
  height: 68px;
  padding: 0 11.5%;
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
.logo-mark {
  display: inline-grid;
  place-items: center;
  width: 40px;
  height: 40px;
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
  height: 35px;
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
  padding: 22px 0 8px;
  color: var(--ink);
  font-size: 15px;
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
  height: 464px;
  background-position: center;
  background-size: cover;
}
.hero-image-pottery {
  background-image: url("https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=700&q=85");
}
.hero-image-macrame {
  background-image: url("https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=700&q=85");
}
.maker-section {
  padding: 58px 11.5% 72px;
  background: #e9e1d4;
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
  max-width: 1500px;
  margin: auto;
  padding: 75px 11.5% 105px;
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
  grid-template-columns: repeat(4, 1fr);
  gap: 38px 22px;
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
  padding: 16px 0;
  border-bottom: 1px solid var(--line);
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
  .site-header {
    padding: 0 4%;
  }
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
  .product-section,
  .site-footer {
    padding-right: 4%;
    padding-left: 4%;
  }
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
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
    padding: 55px 18px 75px;
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

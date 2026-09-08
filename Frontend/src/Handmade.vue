<script setup>
import { computed, ref } from "vue";
import logo from "./assets/artisanhub-logo.png";
import {
  addCartItem,
  cartCount,
  cartItems,
  changeCartQuantity,
  getItemName,
  getItemType,
  removeCartItem,
} from "./cartStore";

const search = ref("");
const activeGroup = ref("ALL");
const activeType = ref("ALL");
const cartOpen = ref(false);

const products = [
  {
    name: "Beaded Heritage Necklace",
    maker: "NANDI MOKOENA · JOHANNESBURG, ZA",
    type: "NECKLACE",
    group: "JEWELLERY",
    image: new URL("../images/Handmade/beadwork-necklace.jpg", import.meta.url).href,
    price: "R 399.99",
    material: "Glass beads · Hand-strung",
    note: "A colourful statement necklace built bead by bead in Nandi's Johannesburg studio.",
    badge: "BESTSELLER",
  },
  {
    name: "Woven Fabric Statement Necklace",
    maker: "THANDIWE KHUMALO · SOWETO, ZA",
    type: "NECKLACE",
    group: "JEWELLERY",
    image: new URL("../images/Handmade/handmadefabric-necklace.jpg", import.meta.url).href,
    price: "R 86",
    material: "Hand-dyed fabric · Recycled beads",
    note: "Layered fabric and beadwork shaped into a bold, lightweight everyday necklace.",
  },
  {
    name: "Carved Wooden Cup",
    maker: "SIPHO MTHEMBU · DURBAN, ZA",
    type: "CUP",
    group: "JEWELLERY",
    image: new URL("../images/Handmade/wooden-cup.jpg", import.meta.url).href,
    price: "R 94",
    material: "Indigenous wood · Hand-carved",
    note: "A warm, tactile drinking cup carved from locally sourced wood and finished by hand.",
    badge: "NEW",
    badgeClass: "green",
  },
  {
    name: "Beaded Drop Earrings",
    maker: "ZINHLE MASEKO · CAPE TOWN, ZA",
    type: "EARRINGS",
    group: "JEWELLERY",
    image: new URL("../images/Handmade/earrings.jpg", import.meta.url).href,
    price: "R 72",
    material: "Glass beads · Brass findings",
    note: "Light-catching drop earrings assembled by hand in small batches.",
    badge: "SALE",
    badgeClass: "rust",
  },
  {
    name: "Hand-thrown Terracotta Vase",
    maker: "NALEDI NDLOVU · MABOPANE, ZA",
    type: "VASE",
    group: "ORNAMENTS",
    image: new URL("../images/Handmade/vase.jpg", import.meta.url).href,
    price: "R 115",
    material: "Terracotta clay · Wheel-thrown",
    note: "A softly shaped terracotta vase made slowly on the wheel and finished with a natural glaze.",
  },
  {
    name: "Jute Rope Woven Vase",
    maker: "AYANDA MASEKO · GQEBERHA, ZA",
    type: "VASE",
    group: "ORNAMENTS",
    image: new URL("../images/Handmade/juterope-wovenvase.jpg", import.meta.url).href,
    price: "R 162",
    material: "Jute rope · Recycled fibre form",
    note: "A sculptural woven vase built from natural jute rope for dried stems and grasses.",
    badge: "NEW",
    badgeClass: "green",
  },
  {
    name: "Hand-carved Story Sculpture",
    maker: "LETHABO DLAMINI · PRETORIA, ZA",
    type: "SCULPTURE",
    group: "ORNAMENTS",
    image: new URL("../images/Handmade/sculptures.jpg", import.meta.url).href,
    price: "R 94",
    material: "Carved wood · Hand-finished",
    note: "A characterful sculptural form carved by hand, with every mark left visible.",
  },
  {
    name: "Botanical Pressed Wall Art",
    maker: "BONTLE RADEBE · BLOEMFONTEIN, ZA",
    type: "WALL ART",
    group: "ORNAMENTS",
    image: new URL("../images/Handmade/botanical-wall-art.webp", import.meta.url).href,
    price: "R 78",
    material: "Pressed botanicals · Natural paper",
    note: "A delicate botanical composition arranged and pressed by hand for a quiet wall display.",
    badge: "LIMITED",
    badgeClass: "green",
  },
];
const types = [
  "ALL",
  "NECKLACE",
  "RING",
  "EARRINGS",
  "CUP",
  "VASE",
  "SCULPTURE",
  "WALL ART",
];
const filteredProducts = computed(() =>
  products.filter((product) => {
    const term = search.value.trim().toLowerCase();
    return (
      (!term ||
        `${product.name} ${product.maker} ${product.type}`
          .toLowerCase()
          .includes(term)) &&
      (activeGroup.value === "ALL" || product.group === activeGroup.value) &&
      (activeType.value === "ALL" || product.type === activeType.value)
    );
  }),
);
function addToCart(product) {
  addCartItem(product);
  cartOpen.value = true;
}

function increaseQuantity(product) {
  changeCartQuantity(product, 1);
}

function removeFromCart(product) {
  changeCartQuantity(product, -1);
}

function removeItem(product) {
  removeCartItem(product);
}

function itemTotal(item) {
  return itemPrice(item) * item.quantity;
}

function itemPrice(item) {
  return Number(String(item.price).replace(/[^0-9.]/g, ""));
}


const cartTotal = computed(() =>
  cartItems.value.reduce(
    (total, item) =>
      total + itemTotal(item),
    0,
  ),
);
</script>

<template>
  <div class="storefront handmade-page">
    <header class="site-header">
      <a class="logo" href="#top">
        <img class="brand-logo" :src="logo" alt="Artisan Hub" />
      </a>
      <label class="search-box"
        ><span class="sr-only">Search products</span
        ><input
          v-model="search"
          type="search"
          placeholder="Search handcrafts, artwork..."
        /><span class="search-icon">⌕</span></label
      >
      <nav class="main-nav" aria-label="Main navigation">
        <a href="#handcraft">Handcrafted</a
        ><a class="active" href="#handmade">Handmade</a
        ><a href="#artwork">Artwork</a> <a href="#creators">Creators</a
        ><a href="#about">About Us</a>
      </nav>
      <button
        class="bag-button"
        type="button"
        aria-label="Open shopping bag"
        @click="cartOpen = !cartOpen"
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
          <div>
            <p>{{ getItemName(item) }}</p>
            <small>{{ getItemType(item) }} · Qty {{ item.quantity }}</small
            ><strong>R {{ itemPrice(item) }} · R {{ itemTotal(item) }}</strong>
            <div class="quantity-controls">
              <button
                type="button"
                aria-label="Decrease quantity"
                @click="removeFromCart(item)"
              >
                −
              </button>
              <span>{{ item.quantity }}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                @click="increaseQuantity(item)"
              >
                +
              </button>
            </div>
            <button
              class="remove-button"
              type="button"
              @click="removeItem(item)"
            >
              REMOVE FROM CART
            </button>
          </div>
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
          <span>Subtotal</span><strong>R {{ cartTotal }}</strong>
        </div>
        <button type="button" @click="cartOpen = false">CHECKOUT</button>
      </div>
    </aside>
    <main id="top">
      <section id="handcrafted" class="hero">
        <div class="hero-copy">
          <p class="kicker">MADE BY HAND · ONE AT A TIME</p>
          <h1>HANDMADE<br /><em>Objects.</em></h1>
          <p class="intro">
            Hand-forged silver, raw gemstone settings, pinch-built ceramics, and
            woven decorative objects. Every piece made individually by an
            artisan we know by name.
          </p>
          <ul class="promise-list">
            <li>Every piece unique</li>
            <li>Hallmarked &amp; certified</li>
            <li>Ethically sourced materials</li>
            <li>Gift packaging included</li>
          </ul>
        </div>
        <div class="hero-collage" aria-label="Handmade jewellery and ornaments">
          <div class="hero-image hero-image-main"></div>
          <div class="hero-image hero-image-top"></div>
          <div class="hero-image hero-image-bottom"></div>
        </div>
      </section>
      <section class="feature-strip">
        <article>
          <i>◆</i>
          <h3>Hallmarked Silver</h3>
          <p>Every silver piece meets British and Indian hallmark standards.</p>
        </article>
        <article>
          <i>○</i>
          <h3>Raw Gemstones</h3>
          <p>Stones sourced direct from certified ethical mines.</p>
        </article>
        <article>
          <i>◆</i>
          <h3>Hand-pinched Ceramics</h3>
          <p>No mould production. Every ornament shaped by hand.</p>
        </article>
        <article>
          <i>○</i>
          <h3>Natural Fibres Only</h3>
          <p>Woven ornaments use only unbleached or plant-dyed fibres.</p>
        </article>
      </section>
      <section id="browse" class="browse-section">
        <div class="browse-heading">
          <div>
            <p class="kicker">BROWSE</p>
            <h2>
              {{
                activeGroup === "ALL"
                  ? "All pieces"
                  : activeGroup[0] + activeGroup.slice(1).toLowerCase()
              }}
              <span>({{ filteredProducts.length }})</span>
            </h2>
          </div>
          <div class="group-tabs">
            <button
              :class="{ selected: activeGroup === 'ALL' }"
              @click="
                activeGroup = 'ALL';
                activeType = 'ALL';
              "
            >
              ALL</button
            ><button
              :class="{ selected: activeGroup === 'JEWELLERY' }"
              @click="
                activeGroup = 'JEWELLERY';
                activeType = 'ALL';
              "
            >
              JEWELLERY</button
            ><button
              :class="{ selected: activeGroup === 'ORNAMENTS' }"
              @click="
                activeGroup = 'ORNAMENTS';
                activeType = 'ALL';
              "
            >
              ORNAMENTS
            </button>
          </div>
        </div>
        <div class="type-tabs">
          <button
            v-for="type in types"
            :key="type"
            :class="{ selected: activeType === type }"
            @click="activeType = type"
          >
            {{ type }}
          </button>
        </div>
        <div v-if="filteredProducts.length" class="product-grid">
          <article
            v-for="product in filteredProducts"
            :key="product.name"
            class="product-card"
          >
            <div class="product-image">
              <img v-if="product.image"
                :src="product.image"
                :alt="product.name"
                loading="lazy"
              /><span
                v-if="product.badge"
                :class="['badge', product.badgeClass]"
                >{{ product.badge }}</span
              ><span class="type-badge">{{ product.type }}</span
              ><button
                class="quick-add"
                type="button"
                @click="addToCart(product)"
              >
                ADD TO CART
              </button>
            </div>
            <p class="maker">{{ product.maker }}</p>
            <h3>{{ product.name }}</h3>
            <p class="material">{{ product.material }}</p>
            <p class="price">{{ product.price }}</p>
            <p class="description">{{ product.note }}</p>
          </article>
        </div>
        <p v-else class="empty-state">
          No pieces found. Try another search or category.
        </p>
      </section>
      <section id="makers" class="commission">
        <div>
          <p class="kicker">BESPOKE WORK</p>
          <h2>Want a piece made<br /><em>just for you?</em></h2>
          <p>
            All our jewellers and ornament makers accept custom commissions.
            Tell us what you're looking for and we'll match you with the right
            creator — or you can request directly from a creator's profile page.
          </p>
        </div>
        <div class="stats">
          <div><strong>3–16 wks</strong><span>TYPICAL LEAD TIME</span></div>
          <div><strong>R 42+</strong><span>COMMISSIONS FROM</span></div>
          <div>
            <strong>6</strong><span>JEWELLERY &amp; ORNAMENT MAKERS</span>
          </div>
          <div><strong>100%</strong><span>MAKER-DESIGNED</span></div>
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
        <a href="#browse">Handcrafted</a><a href="#browse">Artwork</a
        ><a href="#browse">New Arrivals</a><a href="#browse">Sale</a>
      </div>
      <div>
        <p class="footer-title">COMPANY</p>
        <a href="#about">About Us</a><a href="#about">How It Works</a
        ><a href="#makers">For Makers</a><a href="#about">Press</a>
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
  color: #160a06;
  background: #f3eee4;
  box-shadow: -12px 0 35px rgba(22, 10, 6, 0.18);
}
.bag-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 34px 28px 26px;
  border-bottom: 1px solid #ded5c7;
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
  color: #8f3f1c;
  background: transparent;
  font-size: 32px;
  line-height: 1;
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
  border-bottom: 1px solid #ded5c7;
}
.bag-item img {
  width: 82px;
  height: 100px;
  object-fit: cover;
}
.bag-item-image-placeholder {
  display: grid;
  width: 82px;
  height: 100px;
  place-items: center;
  color: #997b69;
  background: #e1d5c4;
  font-size: 11px;
  letter-spacing: 0.1em;
}
.bag-item p {
  margin: 3px 0 8px;
  color: #8f3f1c;
  font:
    700 18px Georgia,
    serif;
}
.bag-item small {
  display: block;
  margin-bottom: 12px;
  color: #997b69;
}
.bag-item strong {
  display: block;
  font-size: 17px;
}
.bag-item button {
  margin-top: 10px;
  padding: 0;
  border: 0;
  color: #997b69;
  background: transparent;
  text-decoration: underline;
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
  margin: 0;
  border: 1px solid #ded5c7;
  color: #8f3f1c;
  background: transparent;
  font-size: 20px;
  line-height: 1;
  text-decoration: none;
}
.quantity-controls span {
  min-width: 16px;
  color: #160a06;
  text-align: center;
}
.empty-bag {
  margin: auto;
  text-align: center;
  color: #997b69;
  font-size: 18px;
}
.empty-bag button {
  border: 1px solid #8f3f1c;
  padding: 12px 16px;
  color: #fff;
  background: #8f3f1c;
}
.bag-footer {
  margin-top: auto;
  padding: 22px 28px 28px;
  border-top: 1px solid #ded5c7;
}
.bag-footer div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
  color: #997b69;
}
.bag-footer strong {
  color: #160a06;
  font-size: 20px;
}
.bag-footer > button {
  width: 100%;
  padding: 15px;
  border: 0;
  color: #fff;
  background: #200b07;
  letter-spacing: 0.12em;
  font-weight: 700;
}
@media (max-width: 760px) {
  .bag-heading {
    padding-top: 24px;
  }
}
</style>

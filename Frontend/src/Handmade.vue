<script setup>
import { computed, ref } from "vue";

const search = ref("");
const activeGroup = ref("ALL");
const activeType = ref("ALL");
const cartCount = ref(0);
const cartOpen = ref(false);
const cartItems = ref([]);

const products = [
  {
    name: "Crescent Moon Pendant",
    maker: "PRIYA NAIR · JAIPUR, IN",
    type: "NECKLACE",
    group: "JEWELLERY",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85",
    price: "£128",
    material: "Sterling silver · Hand-forged",
    note: "A one-off pendant with an oxidised crescent and recycled silver chain.",
    badge: "BESTSELLER",
  },
  {
    name: "Onyx Stack Ring",
    maker: "TAHLIA MOORE · MELBOURNE, AU",
    type: "RING",
    group: "JEWELLERY",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
    price: "£86",
    material: "Sterling silver · Black onyx",
    note: "A softly squared ring designed to be worn and layered every day.",
  },
  {
    name: "Silversmith's Daily Ring",
    maker: "TAHLIA MOORE · MELBOURNE, AU",
    type: "RING",
    group: "JEWELLERY",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85",
    price: "£94",
    material: "Recycled silver · Hand-finished",
    note: "Quietly sculptural, with the marks of the maker left visible.",
    badge: "NEW",
    badgeClass: "green",
  },
  {
    name: "Jeweller's Bench Earrings",
    maker: "PRIYA NAIR · JAIPUR, IN",
    type: "EARRINGS",
    group: "JEWELLERY",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
    price: "£72",
    material: "Gold vermeil · Recycled brass",
    note: "Small statement hoops made slowly at Priya’s Jaipur bench.",
    badge: "SALE",
    badgeClass: "rust",
  },
  {
    name: "Sculptural Ceramic Vase",
    maker: "LENA BAUER · BERLIN, DE",
    type: "VASE",
    group: "ORNAMENTS",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85",
    price: "£115",
    material: "Stoneware · Hand-pinched",
    note: "Pinch-built over three sessions, each layer left to speak for itself.",
  },
  {
    name: "Ceramic Colour Vase Set",
    maker: "ELENA VASQUEZ · OAXACA, MX",
    type: "VASE",
    group: "ORNAMENTS",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=85",
    price: "£162",
    material: "Earthenware · Set of 4",
    note: "Four bud vases in complementary glazes, made to be mixed and matched.",
    badge: "NEW",
    badgeClass: "green",
  },
  {
    name: "Balance Totem",
    maker: "MIKA TANAKA · KYOTO, JP",
    type: "SCULPTURE",
    group: "ORNAMENTS",
    image:
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=900&q=85",
    price: "£94",
    material: "Stoneware · Sculptural",
    note: "A meditation on weight and form. The stack stays beautifully balanced.",
  },
  {
    name: "Woven Wall Ornament",
    maker: "SOFIA REYES · BARCELONA, ES",
    type: "WALL ART",
    group: "ORNAMENTS",
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=85",
    price: "£78",
    material: "Dyed cotton · 45cm diameter",
    note: "Woven on a hand-built loom from naturally dyed fibres.",
    badge: "LIMITED",
    badgeClass: "green",
  },
];
const types = [
  "ALL",
  "NECKLACE",
  "RING",
  "EARRINGS",
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
  cartCount.value += 1;
  const existing = cartItems.value.find((item) => item.name === product.name);
  if (existing) existing.quantity += 1;
  else cartItems.value.push({ ...product, quantity: 1 });
  cartOpen.value = true;
}

function increaseQuantity(product) {
  const existing = cartItems.value.find((item) => item.name === product.name);
  if (existing) {
    existing.quantity += 1;
    cartCount.value += 1;
  }
}

function removeFromCart(product) {
  const existing = cartItems.value.find((item) => item.name === product.name);
  if (!existing) return;
  cartCount.value -= 1;
  if (existing.quantity > 1) existing.quantity -= 1;
  else
    cartItems.value = cartItems.value.filter(
      (item) => item.name !== product.name,
    );
}

const cartTotal = computed(() =>
  cartItems.value.reduce(
    (total, item) =>
      total + Number(item.price.replace("£", "")) * item.quantity,
    0,
  ),
);
</script>

<template>
  <div class="storefront">
    <header class="site-header">
      <a class="logo" href="#top"
        ><span class="logo-mark">A</span
        ><span
          ><strong>ARTISAN HUB.</strong><small>ARTISAN GOODS</small></span
        ></a
      >
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
        <article v-for="item in cartItems" :key="item.name" class="bag-item">
          <img :src="item.image" :alt="item.name" />
          <div>
            <p>{{ item.name }}</p>
            <small>{{ item.type }} · Qty {{ item.quantity }}</small
            ><strong>{{ item.price }}</strong>
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
          <span>Subtotal</span><strong>£{{ cartTotal }}</strong>
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
              <img
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
                ADD TO CART</button
              ><button
                class="view-button"
                type="button"
                aria-label="Preview product"
              >
                ⌾
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
          <div><strong>£42+</strong><span>COMMISSIONS FROM</span></div>
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

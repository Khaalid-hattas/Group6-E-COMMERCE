<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getHandmade } from "./api";
import { resolveImageUrl } from "./imageAssets";
import logo from "./assets/artisanhub-logo.png";
import Navbar from "./components/Navbar.vue";
import {
  addCartItem,
  savePendingCartItem,
  cartCount,
  cartItems,
  changeCartQuantity,
  getItemName,
  getItemType,
  isAuthenticated,
  removeCartItem,
} from "./cartStore";

const search = ref("");
const activeGroup = ref("ALL");
const activeType = ref("ALL");
const cartOpen = ref(false);
const router = useRouter();

const products = ref([]);
const isLoading = ref(true);
const loadError = ref(false);

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

// Temporary stand-in until the backend joins categories and
// returns a real group. Maps each known product_type to the
// broader group used by the JEWELLERY / ORNAMENTS tabs.
const HANDMADE_GROUPS = {
  NECKLACE: "JEWELLERY",
  EARRINGS: "JEWELLERY",
  RING: "JEWELLERY",
  CUP: "ORNAMENTS",
  VASE: "ORNAMENTS",
  SCULPTURE: "ORNAMENTS",
  "WALL ART": "ORNAMENTS",
};

const filteredProducts = computed(() =>
  products.value.filter((product) => {
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

async function loadProducts() {
  isLoading.value = true;
  loadError.value = false;
  try {
    const items = await getHandmade();
    products.value = items.map((item) => {
      const type = item.product_type?.toUpperCase() || "HANDMADE";
      return {
        name: item.name,
        maker: `${item.creator_name} · ${item.creator_location}`,
        type,
        group: HANDMADE_GROUPS[type] || "ORNAMENTS",
        image: resolveImageUrl(item.image_url),
        price: `R ${item.price}`,
        material: item.material,
        note: item.description,
        badge: item.badge,
        badgeClass: item.badge_class,
      };
    });
  } catch (error) {
    console.error(error);
    loadError.value = true;
  } finally {
    isLoading.value = false;
  }
}

onMounted(loadProducts);

function addToCart(product) {
  if (isAuthenticated.value) {
    addCartItem(product);
    cartOpen.value = true;
    return;
  }

  savePendingCartItem(product);
  router.push({ path: "/login", query: { redirect: "/handmade" } });
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
  <Navbar />
  <div class="storefront handmade-page">
    <header class="site-header">
      <a class="logo" href="/">
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
        <a href="/handcraft">Handcrafted</a
        ><a class="active" href="/handmade">Handmade</a
        ><a href="/artwork">Artwork</a> <a href="/creators">Creators</a
        ><a href="/about">About Us</a>
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
        <button type="button" @click="$router.push('/')">
          Continue shopping
        </button>
      </div>
      <div v-if="cartItems.length" class="bag-footer">
        <div>
          <span>Subtotal</span><strong>R {{ cartTotal }}</strong>
        </div>
        <button type="button" @click="$router.push({ name: 'landing', hash: '#checkout' })">CHECKOUT</button>
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
        <div class="handmade-hero-images" aria-label="Handmade jewellery and ornaments">
          <div class="hero-image">
            <img
              src="https://earthafricacurio.com/images/stories/virtuemart/product/african-beaded-necklace-sibaya-gold-red-black5.jpg"
              alt="South African handmade jewellery"
            />
          </div>
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
        <p v-if="isLoading" class="loading-state">Loading pieces...</p>
        <div v-else-if="loadError" class="error-state">
          <p>Couldn't load pieces right now. Please try again later.</p>
          <button type="button" @click="loadProducts">Retry</button>
        </div>
        <div v-else-if="filteredProducts.length" class="product-grid">
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
        <img class="footer-logo" :src="logo" alt="Artisan Hub" />
        <p>
          Connecting people with independent makers. Every piece
          signed. Every maker visited.
        </p>
      </div>
        <div>
          <p class="footer-title">NAVIGATION</p>
          <router-link to="/">Home</router-link>
          <router-link to="/handcraft">Handcrafted</router-link>
        </div>

        <div>
          <p class="footer-title">EXPLORE</p>
          <router-link to="/handmade">Handmade</router-link>
          <router-link to="/artwork">Artwork</router-link>
        </div>

        <div>
          <p class="footer-title">COMMUNITY</p>
          <router-link to="/creators">Creators</router-link>
          <router-link to="/about">About Us</router-link>
        </div>
    </footer>
  </div>
</template>

<style scoped>
.handmade-page {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

.handmade-page > .site-header {
  display: none;
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
  color: #200b07;
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
.loading-state,
.error-state,
.empty-state {
  padding: 60px 0;
  text-align: center;
  color: #997b69;
}
.error-state button {
  margin-top: 14px;
  padding: 10px 18px;
  border: 1px solid #8f3f1c;
  color: #8f3f1c;
  background: transparent;
}
@media (max-width: 760px) {
  .bag-heading {
    padding-top: 24px;
  }
}
</style>

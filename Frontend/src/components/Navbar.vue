<template>
  <header class="site-header">
    <router-link class="logo" to="/">
      <img class="brand-logo" :src="logo" alt="Artisan Hub" />
    </router-link>
    <label class="search-box">
      <span class="sr-only">Search creators</span>
      <input
        v-model="creatorSearch"
        type="search"
        placeholder="Search creators..."
        aria-label="Search creators"
        @keyup.enter="searchCreators"
      />
      <span class="search-icon">⌕</span>
    </label>
    <nav id="main-navigation" class="main-nav" aria-label="Main navigation" :class="{ 'is-open': menuOpen }">
      <router-link :class="{ active: route.path === '/' }" to="/" @click="closeMenu">Home</router-link>
      <router-link :class="{ active: route.path === '/handcraft' || route.path === '/marketplace' }" to="/handcraft" @click="closeMenu">Handcrafted</router-link>
      <router-link :class="{ active: route.path === '/handmade' }" to="/handmade" @click="closeMenu">Handmade</router-link>
      <router-link :class="{ active: route.path === '/artwork' }" to="/artwork" @click="closeMenu">Artwork</router-link>
      <router-link :class="{ active: route.path === '/creators' }" to="/creators" @click="closeMenu">Creators</router-link>
      <router-link :class="{ active: route.path === '/about' }" to="/about" @click="closeMenu">About Us</router-link>
    </nav>
    <div class="nav-right">
      <template v-if="isAuthenticated">
        <span class="user-chip">Hi, {{ currentUser?.fullName || currentUser?.email?.split('@')[0] || 'User' }}</span>
        <button class="nav-auth-btn" type="button" @click="signOut">Logout</button>
      </template>
      <template v-else>
        <router-link class="nav-auth-btn" to="/login">Login</router-link>
      </template>
      <button
        class="bag-button"
        type="button"
        aria-label="Open shopping bag"
        @click="cartOpen = true"
      >
        ♧<span v-if="cartCount" class="bag-count">{{ cartCount }}</span>
      </button>
      <button
        class="menu-button"
        type="button"
        aria-label="Toggle navigation menu"
        aria-controls="main-navigation"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
  <div v-if="cartOpen" class="bag-backdrop" @click="cartOpen = false"></div>
  <aside v-if="cartOpen" class="bag-drawer" aria-label="Shopping bag">
    <div class="bag-heading">
      <h2>Your Bag ({{ cartCount }})</h2>
      <button type="button" aria-label="Close shopping bag" @click="cartOpen = false">
        ×
      </button>
    </div>
    <div v-if="cartItems.length" class="bag-list">
      <article v-for="item in cartItems" :key="getItemName(item)" class="bag-item">
        <img v-if="item.image" :src="item.image" :alt="getItemName(item)" />
        <div v-else class="bag-item-image-placeholder">ARTISAN</div>
        <div class="bag-item-info">
          <p>{{ getItemName(item) }}</p>
          <small>{{ item.maker || item.artist || getItemType(item) }}</small>
          <strong>{{ money(getPrice(item) * item.quantity) }}</strong>
          <div class="quantity-controls">
            <button type="button" aria-label="Decrease quantity" @click="changeQuantity(item, -1)">−</button>
            <span>{{ item.quantity }}</span>
            <button type="button" aria-label="Increase quantity" @click="changeQuantity(item, 1)">+</button>
          </div>
        </div>
        <button class="remove-button" type="button" @click="removeItem(item)">Remove</button>
      </article>
    </div>
    <div v-else class="empty-bag">
      <p>Your bag is empty.</p>
      <button type="button" @click="$router.push('/')">Continue shopping</button>
    </div>
    <div v-if="cartItems.length" class="bag-footer">
      <div><span>Total</span><strong>{{ money(cartTotal) }}</strong></div>
      <button type="button" @click="goToCheckout">CHECKOUT</button>
      <button class="continue-button" type="button" @click="$router.push('/')">
        Continue Shopping
      </button>
    </div>
  </aside>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import logo from "../assets/artisanhub-logo.png";
import {
  cartCount,
  cartItems,
  cartTotal,
  changeCartQuantity,
  getItemName,
  getItemType,
  getPrice,
  removeCartItem,
  isAuthenticated,
  currentUser,
  signOut,
} from "../cartStore";

const cartOpen = ref(false);
const menuOpen = ref(false);
const route = useRoute();
const router = useRouter();
const creatorSearch = ref(String(route.query.search || ""));

watch(
  () => route.query.search,
  (search) => {
    creatorSearch.value = String(search || "");
  },
);

watch(
  () => route.path,
  () => closeMenu(),
);

function closeMenu() {
  menuOpen.value = false;
}

function handleEscape(event) {
  if (event.key === "Escape") closeMenu();
}

onMounted(() => window.addEventListener("keydown", handleEscape));
onUnmounted(() => window.removeEventListener("keydown", handleEscape));

function searchCreators() {
  const search = creatorSearch.value.trim();
  router.push({
    path: "/creators",
    query: search ? { search } : {},
  });
}

function changeQuantity(item, amount) {
  changeCartQuantity(item, amount);
}

function removeItem(item) {
  removeCartItem(item);
}

function goToCheckout() {
  cartOpen.value = false;
  if (!isAuthenticated.value) {
    router.push({ path: "/login", query: { redirect: "/landing#checkout" } });
    return;
  }
  router.push({ name: "landing", hash: "#checkout" });
}

function money(amount) {
  return `R ${Number(amount).toFixed(2)}`;
}
</script>

<style scoped>
.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
}

.menu-button {
  display: none;
  width: 42px;
  height: 42px;
  padding: 9px;
  border: 1px solid #d9d0c4;
  border-radius: 4px;
  background: transparent;
  color: var(--ink);
}

.menu-button span {
  display: block;
  height: 2px;
  margin: 4px 0;
  background: currentColor;
}

.user-chip {
  font-size: 13px;
  color: #5a4b41;
  font-weight: 500;
  max-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-auth-btn {
  font-size: 13px;
  font-weight: 600;
  color: #8f3f1c;
  text-decoration: none;
  background: transparent;
  border: 1px solid #8f3f1c;
  padding: 5px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-auth-btn:hover {
  background: #8f3f1c;
  color: #fff;
}

.bag-backdrop {
  position: fixed;
  inset: 0;
  z-index: 20;
  background: rgba(22, 10, 6, 0.35);
}

.bag-drawer {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 21;
  width: min(430px, 100vw);
  height: 100vh;
  overflow-y: auto;
  padding: 28px;
  color: #160a06;
  background: #f8f4ec;
  box-shadow: -16px 0 35px rgba(22, 10, 6, 0.18);
  text-align: left;
}

.bag-heading,
.bag-footer > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bag-heading {
  padding-bottom: 20px;
  border-bottom: 1px solid #ded5c7;
}

.bag-heading h2 {
  margin: 0;
  font: 700 25px Georgia, serif;
}

.bag-heading button {
  border: 0;
  color: #160a06;
  background: none;
  font-size: 28px;
}

.bag-list {
  display: grid;
  gap: 18px;
  padding: 22px 0;
}

.bag-item {
  display: grid;
  grid-template-columns: 64px 1fr auto;
  gap: 12px;
  align-items: start;
}

.bag-item img,
.bag-item-image-placeholder {
  width: 64px;
  height: 64px;
  object-fit: cover;
  background: #ded5c7;
}

.bag-item-image-placeholder {
  display: grid;
  place-items: center;
  color: #997b69;
  font-size: 10px;
}

.bag-item-info {
  display: grid;
  gap: 4px;
}

.bag-item-info p,
.bag-item-info small,
.bag-item-info strong {
  margin: 0;
}

.bag-item-info p {
  font-weight: 600;
}

.bag-item-info small {
  color: #997b69;
  font-size: 12px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-controls button,
.empty-bag button,
.bag-footer button {
  border: 1px solid #8f3f1c;
  padding: 7px 11px;
  color: #8f3f1c;
  background: transparent;
  cursor: pointer;
}

.remove-button {
  border: 0;
  padding: 0;
  color: #997b69;
  background: transparent;
  cursor: pointer;
  font-size: 12px;
}

.empty-bag {
  padding: 40px 0;
  text-align: center;
}

.bag-footer {
  display: grid;
  gap: 12px;
  border-top: 1px solid #ded5c7;
  padding-top: 20px;
}

.bag-footer > button:not(.continue-button) {
  color: #fff;
  background: #8f3f1c;
}

.bag-footer .continue-button {
  border: 0;
}

@media (max-width: 900px) {
  :global(.site-header) {
    height: 72px;
    padding: 0 16px;
    gap: 12px;
  }

  :global(.logo) {
    min-width: 0;
  }

  :global(.brand-logo) {
    width: 56px;
    height: 56px;
  }

  :global(.search-box) {
    display: none;
  }

  .menu-button {
    display: block;
  }

  :global(.main-nav) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    display: none;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    margin: 0;
    padding: 8px 16px 16px;
    border-bottom: 1px solid var(--line);
    background: var(--paper);
    box-shadow: 0 12px 24px rgba(32, 11, 7, 0.1);
  }

  :global(.main-nav.is-open) {
    display: flex;
  }

  :global(.main-nav a) {
    padding: 13px 8px;
    border-bottom: 1px solid rgba(222, 213, 199, 0.7);
  }

  :global(.main-nav a:last-child) {
    border-bottom: 0;
  }
}

@media (max-width: 520px) {
  .user-chip {
    display: none;
  }

  .nav-right {
    gap: 8px;
  }

  .nav-auth-btn {
    padding: 5px 9px;
  }
}
</style>

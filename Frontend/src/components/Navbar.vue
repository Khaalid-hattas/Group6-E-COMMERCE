<template>
  <header class="site-header">
    <router-link class="logo" to="/">
      <img class="brand-logo" :src="logo" alt="Artisan Hub" />
    </router-link>
    <label class="search-box">
      <span class="sr-only">Search handcrafts</span>
      <input type="search" placeholder="Search handcrafts, artwork..." />
      <span class="search-icon">⌕</span>
    </label>
    <nav class="main-nav" aria-label="Main navigation">
      <router-link :class="{ active: route.path === '/' }" to="/">Home</router-link>
      <router-link :class="{ active: route.path === '/handcraft' || route.path === '/marketplace' }" to="/handcraft">Handcrafted</router-link>
      <router-link :class="{ active: route.path === '/handmade' }" to="/handmade">Handmade</router-link>
      <router-link :class="{ active: route.path === '/artwork' }" to="/artwork">Artwork</router-link>
      <router-link :class="{ active: route.path === '/creators' }" to="/creators">Creators</router-link>
      <router-link :class="{ active: route.path === '/about' }" to="/about">About Us</router-link>
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
import { ref } from "vue";
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
} from "../cartStore";

const cartOpen = ref(false);
const route = useRoute();
const router = useRouter();

function changeQuantity(item, amount) {
  changeCartQuantity(item, amount);
}

function removeItem(item) {
  removeCartItem(item);
}

function goToCheckout() {
  cartOpen.value = false;
  router.push({ name: "landing", hash: "#checkout" });
}

function money(amount) {
  return `R ${Number(amount).toFixed(2)}`;
}
</script>

<style scoped>
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
</style>
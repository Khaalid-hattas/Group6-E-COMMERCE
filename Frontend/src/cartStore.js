import { computed, ref, watch } from "vue";

const storageKey = "artisan-hub-cart";
const pendingItemKey = "artisan-hub-pending-cart-item";
const tokenKey = "artisan-hub-jwt";
const userKey = "artisan-hub-user";

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem(userKey) || "null");
  } catch {
    return null;
  }
}

export const cartItems = ref(loadCart());
export const token = ref(localStorage.getItem(tokenKey) || null);
export const currentUser = ref(loadUser());
export const isAuthenticated = computed(() => Boolean(token.value));

/**
 * Creates a structured JWT token (header.payload.signature)
 */
export function createMockJwt(payload = {}) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(
    JSON.stringify({
      ...payload,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400,
    })
  );
  const signature = btoa("artisan-hub-signature");
  return `${header}.${body}.${signature}`;
}

export function signIn(jwtToken, userData = null) {
  const finalToken = jwtToken || createMockJwt(userData || { role: "buyer" });
  token.value = finalToken;
  localStorage.setItem(tokenKey, finalToken);

  if (userData) {
    currentUser.value = userData;
    localStorage.setItem(userKey, JSON.stringify(userData));
  }
}

export function signOut() {
  token.value = null;
  currentUser.value = null;
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
}

export function clearCart() {
  cartItems.value = [];
  localStorage.removeItem(storageKey);
}

export function getAuthHeaders() {
  return token.value ? { Authorization: `Bearer ${token.value}` } : {};
}

export const cartCount = computed(() =>
  cartItems.value.reduce((total, item) => total + item.quantity, 0),
);

export const cartTotal = computed(() =>
  cartItems.value.reduce(
    (total, item) => total + getPrice(item) * item.quantity,
    0,
  ),
);

export function getPrice(item) {
  return Number(String(item.price || "0").replace(/[^0-9.]/g, ""));
}

export function getItemName(item) {
  return item.name || item.title || "Artisan piece";
}

export function getItemType(item) {
  return item.type || item.category || "ARTISAN PIECE";
}

export function addCartItem(product) {
  const existing = cartItems.value.find((item) =>
    item.name ? item.name === product.name : item.title === product.title,
  );

  if (existing) {
    Object.assign(existing, product);
    existing.quantity += 1;
  } else {
    cartItems.value.push({ ...product, quantity: 1 });
  }
}

export function savePendingCartItem(product) {
  sessionStorage.setItem(pendingItemKey, JSON.stringify(product));
}

export function addPendingCartItem() {
  const pendingItem = sessionStorage.getItem(pendingItemKey);
  if (!pendingItem) return false;

  try {
    addCartItem(JSON.parse(pendingItem));
    sessionStorage.removeItem(pendingItemKey);
    return true;
  } catch {
    sessionStorage.removeItem(pendingItemKey);
    return false;
  }
}

export function changeCartQuantity(item, amount) {
  item.quantity += amount;
  if (item.quantity <= 0) removeCartItem(item);
}

export function removeCartItem(item) {
  cartItems.value = cartItems.value.filter((cartItem) =>
    getItemName(cartItem) !== getItemName(item),
  );
}

watch(
  cartItems,
  (items) => localStorage.setItem(storageKey, JSON.stringify(items)),
  { deep: true },
);

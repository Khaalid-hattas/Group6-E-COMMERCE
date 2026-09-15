import { computed, ref, watch } from "vue";
import { fetchMeRequest } from "./api/authApi";

const storageKey = "artisan-hub-cart";
const pendingItemKey = "artisan-hub-pending-cart-item";
const authKey = "artisan-hub-authenticated";
const tokenKey = "artisan-hub-token";
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
export const isAuthenticated = ref(localStorage.getItem(authKey) === "true");

// Real auth session data — populated once register/login actually
// return a JWT + user object from the backend, instead of the
// boolean-only signIn() below.
export const authToken = ref(localStorage.getItem(tokenKey) || null);
export const currentUser = ref(loadUser());

export async function restoreAuthSession() {
  if (!authToken.value) return null;

  try {
    const data = await fetchMeRequest(authToken.value);
    currentUser.value = data.user;
    localStorage.setItem(userKey, JSON.stringify(data.user));
    isAuthenticated.value = true;
    return data.user;
  } catch {
    signOut();
    return null;
  }
}

export function signIn() {
  localStorage.setItem(authKey, "true");
  isAuthenticated.value = true;
}

// Call this after a successful register/login API response.
// token: the JWT string. user: { id, full_name, email, role }.
export function setAuthSession(token, user) {
  localStorage.setItem(authKey, "true");
  localStorage.setItem(tokenKey, token);
  localStorage.setItem(userKey, JSON.stringify(user));
  isAuthenticated.value = true;
  authToken.value = token;
  currentUser.value = user;
}

// Phase 12/13 — Logout. Clears token + user state. Does NOT redirect
// itself (this file has no router access) — whichever component calls
// this should follow it with router.push("/login") or similar.
export function signOut() {
  localStorage.removeItem(authKey);
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
  isAuthenticated.value = false;
  authToken.value = null;
  currentUser.value = null;
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
  cartItems.value = cartItems.value.filter(
    (cartItem) => getItemName(cartItem) !== getItemName(item),
  );
}

watch(
  cartItems,
  (items) => localStorage.setItem(storageKey, JSON.stringify(items)),
  { deep: true },
);

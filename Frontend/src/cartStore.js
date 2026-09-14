import { computed, ref, watch } from "vue";

const storageKey = "artisan-hub-cart";
const pendingItemKey = "artisan-hub-pending-cart-item";
const authKey = "artisan-hub-authenticated";

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

export const cartItems = ref(loadCart());
export const isAuthenticated = ref(localStorage.getItem(authKey) === "true");

export function signIn() {
  localStorage.setItem(authKey, "true");
  isAuthenticated.value = true;
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

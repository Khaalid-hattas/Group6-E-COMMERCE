<script setup>
import emailjs from "@emailjs/browser";
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import logo from "./assets/artisanhub-logo.png";
import Artwork from "./Artwork.vue";
import Creators from "./Creators.vue";
import Handcraft from "./Handcraft.vue";
import Handmade from "./Handmade.vue";
import {
  cartItems,
  cartTotal,
  clearCart,
  currentUser,
  getItemName,
  getPrice,
  isAuthenticated,
} from "./cartStore";

const router = useRouter();
const currentPage = ref("handcraft");
const paymentComplete = ref(false);
const paymentError = ref("");
const emailSending = ref(false);
const checkoutOrderId = ref(`AH-${Date.now()}`);

const form = reactive({
  email: currentUser.value?.email || "",
  name_first: currentUser.value?.fullName
    ? currentUser.value.fullName.split(" ")[0]
    : "",
  name_last: currentUser.value?.fullName
    ? currentUser.value.fullName.split(" ").slice(1).join(" ")
    : "",
});

const payfastUrl = "https://sandbox.payfast.co.za/eng/process";
const pendingOrderKey = "artisan-hub-pending-order";
const sentOrderKey = "artisan-hub-sent-order";

const payfastData = computed(() => {
  const origin = window.location.origin;
  const itemCount = cartItems.value.length;
  return {
    merchant_id: "10000100",
    merchant_key: "46f0cd694581a",
    return_url: `${origin}/landing#order-success`,
    cancel_url: `${origin}/landing#checkout`,
    notify_url: `${origin}/api/payment/notify`,
    name_first: form.name_first.trim() || "Artisan",
    name_last: form.name_last.trim() || "Customer",
    email_address: form.email.trim() || "customer@example.com",
    m_payment_id: checkoutOrderId.value,
    amount: (cartTotal.value || 0).toFixed(2),
    item_name: `ArtisanHub Order (${itemCount} item${itemCount === 1 ? "" : "s"})`,
  };
});

function money(amount) {
  return `R ${Number(amount).toFixed(2)}`;
}

function buildOrderSnapshot() {
  return {
    orderId: checkoutOrderId.value,
    email: form.email.trim(),
    nameFirst: form.name_first.trim(),
    nameLast: form.name_last.trim(),
    total: money(cartTotal.value),
    items: cartItems.value.map((item) => ({
      name: getItemName(item),
      quantity: item.quantity,
      price: money(getPrice(item) * item.quantity),
    })),
  };
}

function preparePayfastCheckout() {
  sessionStorage.setItem(pendingOrderKey, JSON.stringify(buildOrderSnapshot()));
}

async function sendOrderConfirmation() {
  const pendingOrder = sessionStorage.getItem(pendingOrderKey);
  if (!pendingOrder) return;

  const order = JSON.parse(pendingOrder);
  if (sessionStorage.getItem(sentOrderKey) === order.orderId) {
    paymentComplete.value = true;
    return;
  }

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    paymentError.value = "Payment succeeded, but email confirmation is not configured.";
    paymentComplete.value = true;
    return;
  }

  emailSending.value = true;
  try {
    const itemNames = order.items.map((item) => item.name).join(", ");
    const quantities = order.items.map((item) => item.quantity).join(", ");
    const itemPrices = order.items.map((item) => item.price).join(", ");

    await emailjs.send(
      serviceId,
      templateId,
      {
        email: order.email,
        to_email: order.email,
        customer_email: order.email,
        customer_name: `${order.nameFirst} ${order.nameLast}`.trim(),
        order_id: order.orderId,
        order_items: order.items
          .map((item) => `${item.name} x ${item.quantity} — ${item.price}`)
          .join("\\n"),
        orders: order.items
          .map((item) => `${item.name} x ${item.quantity} — ${item.price}`)
          .join("\\n"),
        // Flat aliases used by the EmailJS order template.
        item: itemNames,
        quantity: quantities,
        units: quantities,
        price: itemPrices,
        shipping: "R 0.00",
        tax: "R 0.00",
        taxes: "R 0.00",
        total: order.total,
        order_total: order.total,
        cost: {
          shipping: "R 0.00",
          tax: "R 0.00",
          total: order.total,
        },
      },
      publicKey,
    );
    sessionStorage.setItem(sentOrderKey, order.orderId);
    sessionStorage.removeItem(pendingOrderKey);
    clearCart();
    paymentComplete.value = true;
  } catch (error) {
    console.error("EmailJS checkout confirmation failed:", error);
    paymentError.value = "Payment succeeded, but we could not send your confirmation email. Please try again.";
    paymentComplete.value = true;
  } finally {
    emailSending.value = false;
  }
}

function updatePage() {
  const hash = window.location.hash;

  if (hash === "#order-success") {
    currentPage.value = "checkout";
    paymentComplete.value = true;
    void sendOrderConfirmation();
    window.scrollTo(0, 0);
    return;
  }

  if (hash === "#checkout") {
    if (!isAuthenticated.value) {
      router.push({
        path: "/login",
        query: { redirect: "/landing#checkout" },
      });
      return;
    }
    currentPage.value = "checkout";
    paymentComplete.value = false;
    paymentError.value = "";
    window.scrollTo(0, 0);
    return;
  }

  paymentComplete.value = false;
  currentPage.value =
    hash === "#creators"
      ? "creators"
      : hash === "#artwork"
        ? "artwork"
        : hash === "#handmade"
          ? "handmade"
          : "handcraft";

  window.scrollTo(0, 0);
}

function handleCheckoutClick(event) {
  const target = event.target;

  if (
    !(target instanceof HTMLElement) ||
    target.textContent.trim() !== "CHECKOUT"
  ) {
    return;
  }

  if (!isAuthenticated.value) {
    event.preventDefault();
    event.stopPropagation();
    router.push({
      path: "/login",
      query: { redirect: "/landing#checkout" },
    });
    return;
  }

  paymentComplete.value = false;
  paymentError.value = "";
  window.location.hash = "checkout";
}

onMounted(() => {
  updatePage();
  window.addEventListener("hashchange", updatePage);
});

onBeforeUnmount(() => window.removeEventListener("hashchange", updatePage));
</script>

<template>
  <div class="landing-shell" @click.capture="handleCheckoutClick">
    <section v-if="currentPage === 'checkout'" class="payment-page">
      <header class="payment-header">
        <a class="payment-logo" href="/">
          <img class="payment-brand-logo" :src="logo" alt="Artisan Hub" />
        </a>
        <a class="back-link" href="/">← Continue shopping</a>
      </header>

      <main class="payment-main">
        <div class="payment-intro">
          <p class="payment-kicker">SECURE CHECKOUT</p>
          <h1>Complete your<br /><em>purchase.</em></h1>
          <p>
            Pay securely for your selected artisan pieces. Your order will be
            sent directly to the maker for careful preparation.
          </p>
          <div class="payment-trust">
            <span>✓ Secure payment</span>
            <span>✓ Recyclable packaging</span>
            <span>✓ Maker-supported</span>
          </div>
        </div>

        <div v-if="paymentComplete" class="payment-card">
          <div class="payment-success">
            <span>✓</span>
            <h2>Thank you for your order!</h2>
            <p>
              Your payment was received successfully via PayFast.
              {{ form.email ? 'A confirmation was sent to ' + form.email + '.' : '' }}
            </p>
            <p v-if="emailSending">Sending your confirmation email…</p>
            <p v-if="paymentError" class="payment-error">{{ paymentError }}</p>
            <div class="payment-trust" style="margin: 20px 0; justify-content: center;">
              <span>✓ Payment verified</span>
              <span>✓ Maker notified</span>
              <span>✓ Tracked delivery</span>
            </div>
            <a href="/">RETURN TO SHOP</a>
          </div>
        </div>

        <div v-else-if="cartItems.length === 0" class="payment-card">
          <div class="payment-card-heading">
            <h2>Your bag is empty</h2>
            <span>0 ITEMS</span>
          </div>
          <p style="color: var(--muted); margin-bottom: 24px;">
            You have no items in your shopping bag. Explore our collection of handcrafted artisan goods before checking out.
          </p>
          <a class="pay-button" href="/">DISCOVER HANDCRAFTS</a>
        </div>

        <form
          v-else
          class="payment-card"
          :action="payfastUrl"
          method="POST"
          @submit="preparePayfastCheckout"
        >
          <div class="payment-card-heading">
            <h2>Payment Details</h2>
            <span>PAYFAST · CARDS · INSTANT EFT</span>
          </div>

          <!-- Hidden PayFast Parameters -->
          <input type="hidden" name="merchant_id" :value="payfastData.merchant_id" />
          <input type="hidden" name="merchant_key" :value="payfastData.merchant_key" />
          <input type="hidden" name="return_url" :value="payfastData.return_url" />
          <input type="hidden" name="cancel_url" :value="payfastData.cancel_url" />
          <input type="hidden" name="notify_url" :value="payfastData.notify_url" />
          <input type="hidden" name="name_first" :value="payfastData.name_first" />
          <input type="hidden" name="name_last" :value="payfastData.name_last" />
          <input type="hidden" name="email_address" :value="payfastData.email_address" />
          <input type="hidden" name="m_payment_id" :value="payfastData.m_payment_id" />
          <input type="hidden" name="amount" :value="payfastData.amount" />
          <input type="hidden" name="item_name" :value="payfastData.item_name" />

          <!-- Buyer Contact Info -->
          <div class="payment-fields">
            <label>
              FIRST NAME
              <input
                v-model="form.name_first"
                required
                type="text"
                placeholder="First name"
              />
            </label>
            <label>
              LAST NAME
              <input
                v-model="form.name_last"
                required
                type="text"
                placeholder="Last name"
              />
            </label>
          </div>

          <label>
            EMAIL ADDRESS
            <input
              v-model="form.email"
              required
              type="email"
              placeholder="you@email.com"
            />
          </label>

          <div class="payment-total">
            <div class="checkout-items">
              <span v-for="item in cartItems" :key="getItemName(item)">
                {{ getItemName(item) }} · Qty {{ item.quantity }} · {{ money(getPrice(item) * item.quantity) }}
              </span>
            </div>
            <span>Order total</span>
            <strong>{{ money(cartTotal) }}</strong>
          </div>

          <button class="pay-button" type="submit">
            PAY WITH PAYFAST {{ money(cartTotal) }}
          </button>

          <p v-if="paymentError" class="payment-error">{{ paymentError }}</p>
          <p class="payment-note">
            🛡️ Secured by PayFast Sandbox. Supports Visa, Mastercard, Capitec Pay, and Instant EFT.
          </p>
        </form>
      </main>

      <footer class="payment-footer">
        ARTISAN HUB. · EVERY PIECE SIGNED · EVERY MAKER VISITED
      </footer>
    </section>

    <Creators v-else-if="currentPage == 'creators'" />
    <Artwork v-else-if="currentPage == 'artwork'" />
    <Handmade v-else-if="currentPage == 'handmade'" />
    <Handcraft v-else />
  </div>
</template>

<style scoped>
.payment-page {
  --paper: #f3eee4;
  --ink: #355b45;
  --rust: #8f3f1c;
  --muted: #997b69;
  --line: #ded5c7;
  min-height: 100vh;
  color: var(--ink);
  background: var(--paper);
}
.payment-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 84px;
  padding: 0 5.5%;
  border-bottom: 1px solid var(--line);
}
.payment-logo {
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--ink);
  text-decoration: none;
}
.payment-logo-mark {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  color: #fff;
  background: var(--rust);
  font: 22px Georgia, serif;
}
.payment-brand-logo {
  width: 68px;
  height: 68px;
  display: block;
  object-fit: contain;
}
.payment-logo strong,
.payment-logo small {
  display: block;
}
.payment-logo strong {
  font: 700 21px Georgia, serif;
}
.payment-logo small {
  margin-top: 4px;
  color: var(--muted);
  letter-spacing: 0.16em;
  font-size: 12px;
}
.back-link {
  color: var(--rust);
  text-decoration: none;
}
.payment-main {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 9%;
  align-items: center;
  max-width: 1240px;
  min-height: calc(100vh - 150px);
  margin: auto;
  padding: 75px 5.5%;
}
.payment-intro h1 {
  margin: 0 0 28px;
  font: 700 clamp(48px, 5vw, 76px) / 1 "Playfair Display", Georgia, serif;
  letter-spacing: -0.05em;
}
.payment-intro h1 em {
  color: var(--rust);
  font-weight: 600;
}
.payment-kicker {
  margin: 0 0 25px;
  color: #9e806e;
  letter-spacing: 0.28em;
  font-size: 13px;
}
.payment-intro > p:not(.payment-kicker) {
  max-width: 510px;
  color: var(--muted);
  font-size: 18px;
  line-height: 1.65;
}
.payment-trust {
  display: grid;
  gap: 12px;
  margin-top: 30px;
  color: var(--muted);
}
.payment-card {
  border: 1px solid var(--line);
  padding: 40px;
  background: #f8f4ec;
  box-shadow: 0 16px 35px #160a0610;
}
.payment-card-heading,
.payment-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.payment-card-heading {
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--line);
}
.payment-card-heading h2 {
  margin: 0;
  font: 700 28px Georgia, serif;
}
.payment-card-heading span {
  color: var(--muted);
  font-size: 12px;
  letter-spacing: 0.1em;
}
.payment-card label {
  display: block;
  margin-bottom: 18px;
  color: var(--muted);
  letter-spacing: 0.12em;
  font-size: 12px;
}
.payment-card input {
  display: block;
  width: 100%;
  margin-top: 8px;
  border: 1px solid #d9d0c4;
  padding: 14px 15px;
  color: var(--ink);
  background: #fff;
  font: inherit;
  letter-spacing: 0;
}
.payment-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.payment-total {
  flex-wrap: wrap;
  margin: 12px 0 20px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
  color: var(--muted);
}
.checkout-items {
  flex-basis: 100%;
  display: grid;
  gap: 5px;
  width: 100%;
  margin-bottom: 14px;
  font-size: 13px;
}
.payment-total strong {
  color: var(--ink);
  font: 700 23px Georgia, serif;
}
.pay-button,
.payment-success a {
  display: block;
  width: 100%;
  border: 0;
  padding: 17px;
  color: #fff;
  background: #200b07;
  text-align: center;
  letter-spacing: 0.12em;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
}
.payment-note {
  margin: 17px 0 0;
  color: var(--muted);
  font-size: 12px;
  text-align: center;
}
.payment-success {
  padding: 35px 0;
  text-align: center;
}
.payment-success > span {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  margin: 0 auto 20px;
  border-radius: 50%;
  color: #fff;
  background: #667759;
  font-size: 28px;
}
.payment-success h2 {
  margin: 0 0 12px;
  font: 700 28px Georgia, serif;
}
.payment-success p {
  margin: 0 0 25px;
  color: var(--muted);
  line-height: 1.55;
}
.payment-success-order {
  margin: 0 0 25px;
  padding: 15px;
  color: var(--muted);
  background: #f3eee4;
  text-align: left;
}
.payment-success-order p {
  margin: 0 0 6px;
}
.payment-success-order strong {
  display: block;
  margin-top: 12px;
  color: var(--ink);
}
.payment-error {
  margin: 12px 0 0;
  color: #9b2c20;
  font-size: 13px;
  text-align: center;
}
.payment-footer {
  padding: 25px 5.5%;
  color: var(--muted);
  border-top: 1px solid var(--line);
  letter-spacing: 0.16em;
  font-size: 11px;
  text-align: center;
}
@media (max-width: 760px) {
  .payment-header {
    padding: 14px 24px;
  }
  .payment-main {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 55px 24px 70px;
  }
  .payment-card {
    padding: 28px 20px;
  }
}
</style>

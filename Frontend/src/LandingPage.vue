<script setup>
import emailjs from "@emailjs/browser";
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import logo from "./assets/artisanhub-logo.png";
import Artwork from "./Artwork.vue";
import Creators from "./Creators.vue";
import Handcraft from "./Handcraft.vue";
import Handmade from "./Handmade.vue";
import { cartItems, cartTotal, getItemName, getPrice } from "./cartStore";

const currentPage = ref("handcraft");
const paymentComplete = ref(false);
const paymentError = ref("");
const form = reactive({ email: "" });

function money(amount) {
  return `R ${Number(amount).toFixed(2)}`;
}

function updatePage() {
  const hash = window.location.hash;

  currentPage.value =
    hash === "#checkout"
      ? "checkout"
      : hash === "#creators"
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

  paymentComplete.value = false;
  paymentError.value = "";
  window.location.hash = "checkout";
}

async function submitPayment() {
  paymentError.value = "";

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    paymentError.value = "Email confirmation is not configured yet.";
    return;
  }

  const orders = cartItems.value.map((item) => ({
    name: getItemName(item),
    units: item.quantity,
    price: money(getPrice(item) * item.quantity),
  }));
  const orderId = `AH-${Date.now()}`;

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        email: form.email,
        order_id: orderId,
        orders,
        cost: {
          shipping: "R 0.00",
          tax: "R 0.00",
          total: money(cartTotal.value),
        },
      },
      publicKey,
    );
    paymentComplete.value = true;
  } catch (error) {
    console.error("EmailJS checkout confirmation failed:", error);
    paymentError.value = "We could not send your confirmation. Please try again.";
  }
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

        <form class="payment-card" @submit.prevent="submitPayment">
          <div v-if="paymentComplete" class="payment-success">
            <span>✓</span>
            <h2>Thank you for your order.</h2>
            <p>
              Your payment was received. A confirmation was sent to
              {{ form.email }}.
            </p>
            <div class="payment-success-order">
              <p v-for="item in cartItems" :key="getItemName(item)">
                {{ getItemName(item) }} × {{ item.quantity }}
              </p>
              <strong>Total: {{ money(cartTotal) }}</strong>
            </div>
            <a href="/">RETURN TO SHOP</a>
          </div>

          <template v-else>
            <div class="payment-card-heading">
              <h2>Payment details</h2>
              <span>VISA · MC · EFT</span>
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
            <label>
              CARDHOLDER NAME
              <input required placeholder="Full name" />
            </label>
            <label>
              CARD NUMBER
              <input
                required
                inputmode="numeric"
                maxlength="19"
                placeholder="1234 5678 9012 3456"
              />
            </label>
            <div class="payment-fields">
              <label>
                EXPIRY DATE
                <input required placeholder="MM / YY" />
              </label>
              <label>
                CVV
                <input
                  required
                  inputmode="numeric"
                  maxlength="4"
                  placeholder="123"
                />
              </label>
            </div>
            <div class="payment-total">
              <div class="checkout-items">
                <span v-for="item in cartItems" :key="getItemName(item)">
                  {{ getItemName(item) }} · Qty {{ item.quantity }}
                </span>
              </div>
              <span>Order total</span>
              <strong>{{ money(cartTotal) }}</strong>
            </div>
            <button class="pay-button" type="submit">
              PAY {{ money(cartTotal) }}
            </button>
            <p v-if="paymentError" class="payment-error">{{ paymentError }}</p>
            <p class="payment-note">
              Your payment information is encrypted and never stored on this
              site.
            </p>
          </template>
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
  --ink: #200b07;
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
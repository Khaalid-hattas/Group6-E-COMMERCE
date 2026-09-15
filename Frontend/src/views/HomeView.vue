<template>
  <Navbar />
  <div class="page">
    <!-- 1. HERO -->
    <header class="hero">
      <div>
        <span class="eyebrow">Create · Connect · Thrive</span>
        <h1>Discover Unique Handmade Craftsmanship</h1>
        <p>
          Connect directly with independent local artists, crafters, and makers.
          Shop authentic, high-quality products or commission custom creations
          built just for you.
        </p>
        <div class="hero-actions">
          <router-link to="/marketplace" class="btn btn--primary"
            >Shop Marketplace</router-link
          >
          <router-link to="/register?role=creator" class="btn btn--secondary"
            >Become a Creator</router-link
          >
        </div>
      </div>
      <div class="hero-image">
        <img
          src="https://antonioartworks.co.za/assets/images/hero-artwork-left.jpg"
          alt="hero-image"
        />
      </div>
    </header>

    <!-- 2. THREE PILLAR FEATURE SECTION -->
    <section class="section section--alt">
      <div class="section-header">
        <h2>What Makes Us Different</h2>
        <p>
          Placing creator discovery and relationships at the center of your
          shopping experience.
        </p>
      </div>

      <div class="pillar-grid">
        <div
          v-for="(pillar, index) in pillars"
          :key="pillar.title"
          class="pillar-card motion-card"
          :style="{ '--card-delay': `${index * 120}ms` }"
          @pointermove="handleCardPointerMove"
          @pointerleave="resetCardPointer"
        >
          <h3>{{ pillar.title }}</h3>
          <p>{{ pillar.description }}</p>
        </div>
      </div>
    </section>

    <!-- 3. CURATED CATEGORY GRID -->
    <section class="section">
      <div class="category-header">
        <div>
          <h2>Browse Core Categories</h2>
          <p>
            Find uniquely designed local physical inventory across popular
            niches.
          </p>
        </div>
      </div>

      <div class="category-grid">
        <RouterLink
          v-for="(category, index) in categories"
          :key="category.name"
          class="category-card motion-card"
          :style="{ '--card-delay': `${index * 120}ms` }"
          to="/login"
          @pointermove="handleCardPointerMove"
          @pointerleave="resetCardPointer"
        >
          <img :src="category.image" :alt="category.name" />
          <span>{{ category.name }}</span>
        </RouterLink>
      </div>
    </section>

    <!-- 4. HOW IT WORKS STEPPER -->
    <section class="section section--alt">
      <div class="section-header">
        <h2>The Core Operational Flows</h2>
        <p>
          Review how the end-to-end full-stack portal serves both target user
          profiles.
        </p>
      </div>

      <div class="flow-grid">
        <div class="flow-card">
          <h3>The Customer Journey</h3>
          <ol>
            <li class="flow-step">
              <div class="flow-number">1</div>
              <div>
                <h4>Secure Authentication</h4>
                <p>
                  Register a new profile and log in via secure hashed
                  verification tokens.
                </p>
              </div>
            </li>
            <li class="flow-step">
              <div class="flow-number">2</div>
              <div>
                <h4>Browse & Customize</h4>
                <p>
                  Select dynamic catalogue products or drop structured custom
                  prompts on a creator's profile.
                </p>
              </div>
            </li>
            <li class="flow-step">
              <div class="flow-number">3</div>
              <div>
                <h4>Checkout Fulfillment</h4>
                <p>
                  Process the cart layout using automated mock gateway scripts
                  to save standard SQL order records.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div class="flow-card">
          <h3>The Creator Journey</h3>
          <ol>
            <li class="flow-step">
              <div class="flow-number">1</div>
              <div>
                <h4>Storefront Onboarding</h4>
                <p>
                  Access specific protected application roles to manage an
                  independent commercial portal.
                </p>
              </div>
            </li>
            <li class="flow-step">
              <div class="flow-number">2</div>
              <div>
                <h4>Manage Product CRUD</h4>
                <p>
                  Inject, update, edit or delete item entries instantly across
                  the global marketplace.
                </p>
              </div>
            </li>
            <li class="flow-step">
              <div class="flow-number">3</div>
              <div>
                <h4>Process Quotes & Orders</h4>
                <p>
                  Track incoming buyer requests, answer quotes, and oversee
                  dynamic historical sales logs.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- 5. BOTTOM CONVERSION FUNNEL -->
    <section class="section">
      <div class="cta-banner">
        <h2>Ready to Support Local South African Makers?</h2>
        <p>
          Create your account today to browse ready-made treasures, track
          historic purchases, and configure custom bespoke requests.
        </p>
        <div class="hero-actions" style="justify-content: center">
          <router-link to="/register" class="btn btn--secondary"
            >Get Started</router-link
          >
          <router-link to="/about" class="btn btn--primary"
            >Read Our Story</router-link
          >
        </div>
      </div>
    </section>

  </div>

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
        <a href="#products">Handcrafted</a><a href="#products">Artwork</a
        ><a href="#products">New Arrivals</a><a href="#products">Sale</a>
      </div>
      <div>
        <p class="footer-title">COMPANY</p>
        <a href="#about">About Us</a><a href="#about">How It Works</a
        ><a href="#creators">For Makers</a><a href="#about">Press</a>
      </div>
      <div>
        <p class="footer-title">HELP</p>
        <a href="#about">Shipping &amp; Returns</a><a href="#about">FAQ</a
        ><a href="#about">Contact</a><a href="#about">Track Order</a>
      </div>
  </footer>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import Navbar from "../components/Navbar.vue";

let cardObserver;

const pillars = [
  {
    title: "Creator Discovery",
    description:
      "Explore detailed storefronts, stories, and background portfolios of verified independent local artisans before you purchase.",
  },
  {
    title: "Direct Purchasing",
    description:
      "Safely add authentic products directly to a secure shopping cart with fully simulated secure payment processing workflows.",
  },
  {
    title: "Bespoke Requests",
    description:
      "Submit personalized digital briefs to independent makers, negotiate project estimates, and commission entirely custom-made items.",
  },
];

function handleCardPointerMove(event) {
  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -5;
  const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 5;

  card.style.setProperty("--rotate-x", `${rotateX}deg`);
  card.style.setProperty("--rotate-y", `${rotateY}deg`);
  card.style.setProperty("--glow-x", `${event.clientX - bounds.left}px`);
  card.style.setProperty("--glow-y", `${event.clientY - bounds.top}px`);
}

function resetCardPointer(event) {
  event.currentTarget.style.setProperty("--rotate-x", "0deg");
  event.currentTarget.style.setProperty("--rotate-y", "0deg");
}

const categories = ref([
  {
    name: "Artwork",
    image: new URL("../../images/Artwork/abstractimages.jpeg", import.meta.url).href,
  },
  {
    name: "Hand-Crafted",
    image: new URL("../../images/Handcrafted/antique-set.jpg", import.meta.url).href,
  },
  {
    name: "Hand-made",
    image: new URL("../../images/Handmade/beadwork-necklace.jpg", import.meta.url).href,
  },
]);

onMounted(() => {
  const cards = document.querySelectorAll(".motion-card");
  cards.forEach((card) => card.classList.add("motion-ready"));

  if (!("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("is-visible"));
    return;
  }

  cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  cards.forEach((card) => cardObserver.observe(card));
});

onUnmounted(() => cardObserver?.disconnect());
</script>

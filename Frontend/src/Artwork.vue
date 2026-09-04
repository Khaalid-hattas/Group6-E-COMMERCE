<script setup>
import { computed, ref } from "vue";

const activeCategory = ref("ALL");
const selectedArtwork = ref(null);
const email = ref("");
const subscribed = ref(false);
const bagOpen = ref(false);
const cartItems = ref([]);

// Add your own image path and rand price to each artwork object.
const artworks = [
  {
    title: "Flux Study No. 4",
    artist: "CAMILLE RENARD",
    location: "LYON, FR",
    medium: "Oil on linen",
    dimensions: "90 × 120 cm",
    category: "ABSTRACT",
    badge: "ORIGINAL",
    edition: "Original",
    image: "",
    price: "",
    description:
      "A study in tension — oil pulled across linen in a single unbroken session. No underdrawing.",
  },
  {
    title: "Terrain I",
    artist: "MARCUS WEBB",
    location: "LONDON, UK",
    medium: "Acrylic + sand on board",
    dimensions: "60 × 80 cm",
    category: "ABSTRACT",
    badge: "1 OF 1",
    edition: "1 of 1",
    image: "",
    price: "",
    description:
      "Built in layers of mineral pigment and sand, this work holds the quiet energy of a changing landscape.",
  },
  {
    title: "Solvent & Grace",
    artist: "IFEOMA OSSI",
    location: "ACCRA, GH",
    medium: "Encaustic wax on panel",
    dimensions: "50 × 70 cm",
    category: "ABSTRACT",
    badge: "ORIGINAL",
    edition: "Original",
    image: "",
    price: "",
    description:
      "Colour, texture, and light meet in a warm, tactile composition made in the artist's Accra studio.",
  },
  {
    title: "Primary Field II",
    artist: "YUKI SHIMIZU",
    location: "OSAKA, JP",
    medium: "Acrylic on canvas",
    dimensions: "100 × 100 cm",
    category: "ABSTRACT",
    badge: "FEATURED",
    edition: "Original",
    image: "",
    price: "",
    description:
      "A colour field broken only by the painter's hesitation. Exhibited in Osaka, 2025.",
  },
  {
    title: "Form Without Function",
    artist: "ANITA KRUGER",
    location: "BERLIN, DE",
    medium: "Archival inkjet print",
    dimensions: "50 × 70 cm",
    category: "PHOTOGRAPHY",
    badge: "",
    edition: "Ed. of 20",
    image: "",
    price: "",
    description:
      "An archival print exploring the relationship between shape, shadow, and the spaces objects leave behind.",
  },
  {
    title: "Still Interior",
    artist: "PAULO MEDINA",
    location: "SÃO PAULO, BR",
    medium: "C-print, museum glass",
    dimensions: "60 × 80 cm",
    category: "PHOTOGRAPHY",
    badge: "",
    edition: "Ed. of 10",
    image: "",
    price: "",
    description:
      "A quiet interior study made with a large-format camera and printed on museum-grade paper.",
  },
  {
    title: "Botanical Series III",
    artist: "MEI LIN",
    location: "TAIPEI, TW",
    medium: "Pigment prints",
    dimensions: "Set of 3, 40 × 60 cm",
    category: "PHOTOGRAPHY",
    badge: "",
    edition: "Ed. of 15",
    image: "",
    price: "",
    description:
      "Three pigment prints tracing the shape and rhythm of plants through soft, natural light.",
  },
  {
    title: "Burden Study",
    artist: "KWAME ASANTE",
    location: "KUMASI, GH",
    medium: "Cast bronze",
    dimensions: "22 × 14 × 10 cm",
    category: "SCULPTURE",
    badge: "",
    edition: "Ed. of 8",
    image: "",
    price: "",
    description:
      "A compact bronze sculpture considering weight, movement, and the human instinct to carry.",
  },
];

const categories = ["ALL", "ABSTRACT", "PHOTOGRAPHY", "SCULPTURE"];
const filteredArtworks = computed(() =>
  activeCategory.value === "ALL"
    ? artworks
    : artworks.filter((artwork) => artwork.category === activeCategory.value),
);

function subscribe() {
  if (email.value) subscribed.value = true;
}

function addToBag(artwork) {
  const existing = cartItems.value.find((item) => item.title === artwork.title);
  if (existing) existing.quantity += 1;
  else cartItems.value.push({ ...artwork, quantity: 1 });
  selectedArtwork.value = null;
  bagOpen.value = true;
}

function changeQuantity(item, amount) {
  item.quantity += amount;
  if (item.quantity <= 0)
    cartItems.value = cartItems.value.filter(
      (cartItem) => cartItem.title !== item.title,
    );
}
</script>

<template>
  <div class="artwork-page">
    <header class="site-header">
      <a class="logo" href="#top"
        ><span class="logo-mark">A</span
        ><span
          ><strong>ARTISAN HUB.</strong><small>ARTISAN GOODS</small></span
        ></a
      >
      <label class="search-box"
        ><span class="sr-only">Search artwork</span
        ><input
          type="search"
          placeholder="Search handcrafts, artwork..."
        /><span class="search-icon">⌕</span></label
      >
      <nav class="main-nav" aria-label="Main navigation">
        <a href="#handcraft">Handcrafted</a><a href="#handmade">Handmade</a
        ><a class="active" href="#artwork">Artwork</a
        ><a href="#creators">Creators</a>
        <a href="#about">About Us</a>
      </nav>
      <button
        class="bag-button"
        type="button"
        aria-label="Shopping bag"
        @click="bagOpen = true"
      >
        ♧
      </button>
    </header>

    <div v-if="bagOpen" class="bag-backdrop" @click="bagOpen = false"></div>
    <aside v-if="bagOpen" class="bag-drawer" aria-label="Shopping bag">
      <div class="bag-heading">
        <h2>
          Your Bag ({{
            cartItems.reduce((total, item) => total + item.quantity, 0)
          }})
        </h2>
        <button
          type="button"
          aria-label="Close shopping bag"
          @click="bagOpen = false"
        >
          ×
        </button>
      </div>
      <div v-if="cartItems.length" class="bag-list">
        <article v-for="item in cartItems" :key="item.title" class="bag-item">
          <div>
            <p>{{ item.title }}</p>
            <small>{{ item.artist }}</small>
            <strong>{{ item.price || "R —" }}</strong>
            <div class="quantity-controls">
              <button
                type="button"
                aria-label="Decrease quantity"
                @click="changeQuantity(item, -1)"
              >
                −
              </button>
              <span>{{ item.quantity }}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                @click="changeQuantity(item, 1)"
              >
                +
              </button>
            </div>
          </div>
        </article>
      </div>
      <div v-else class="empty-bag">
        <p>Your bag is empty.</p>
        <button type="button" @click="bagOpen = false">
          Continue shopping
        </button>
      </div>
    </aside>

    <section class="artwork-values">
      <article>
        <i>○</i>
        <h2>Direct from artists</h2>
        <p>
          80% of every sale goes to the artist. We take 20% to curate, ship, and
          support.
        </p>
      </article>
      <article>
        <i>◆</i>
        <h2>Studio-visit curated</h2>
        <p>
          We visit every artist before listing. Every work in the gallery has
          been seen in person.
        </p>
      </article>
      <article>
        <i>○</i>
        <h2>Living with art</h2>
        <p>
          Art belongs in the rooms you actually use — not stored in a gallery.
          We believe that.
        </p>
      </article>
    </section>

    <main id="top">
      <section class="gallery-section">
        <div class="gallery-heading">
          <div>
            <p class="kicker">THE GALLERY</p>
            <h1>Art for rooms worth living in.</h1>
          </div>
          <div class="category-tabs">
            <button
              v-for="category in categories"
              :key="category"
              :class="{ selected: activeCategory === category }"
              @click="activeCategory = category"
            >
              {{ category }}
            </button>
          </div>
        </div>
        <div class="artwork-grid">
          <article
            v-for="artwork in filteredArtworks"
            :key="artwork.title"
            class="artwork-card"
            @click="selectedArtwork = artwork"
          >
            <div class="artwork-image">
              <img
                v-if="artwork.image"
                :src="artwork.image"
                :alt="artwork.title"
              /><span v-else class="image-placeholder">ADD IMAGE</span
              ><span v-if="artwork.badge" class="artwork-badge">{{
                artwork.badge
              }}</span>
            </div>
            <p class="artist-line">
              {{ artwork.artist }} · {{ artwork.location }}
            </p>
            <h2>{{ artwork.title }}</h2>
            <p class="artwork-details">
              {{ artwork.medium }} · {{ artwork.dimensions }}
            </p>
            <div class="artwork-price">
              <strong>{{ artwork.price || "R —" }}</strong
              ><span>{{ artwork.edition }}</span>
            </div>
          </article>
        </div>
      </section>
      <section class="commission-banner">
        <p class="kicker">COMMISSION</p>
        <h2>Want something made<br /><em>for your space?</em></h2>
        <p>
          Describe your room, your budget, the feeling you're after. We match
          you with the right artist and manage the commission end to end.
        </p>
        <a href="#about">START A COMMISSION</a>
      </section>
      <section class="newsletter">
        <p class="kicker">GALLERY DISPATCHES</p>
        <h2>New works. Studio visits.<br /><em>First access.</em></h2>
        <p>Collectors on this list get 48-hour early access to new arrivals.</p>
        <form @submit.prevent="subscribe">
          <input
            v-model="email"
            type="email"
            required
            placeholder="your@email.com"
          /><button type="submit">{{ subscribed ? "JOINED" : "JOIN" }}</button>
        </form>
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
        <a href="#handmade">Handcrafted</a><a href="#top">Artwork</a
        ><a href="#top">New Arrivals</a><a href="#top">Sale</a>
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

    <div
      v-if="selectedArtwork"
      class="artwork-modal-backdrop"
      @click.self="selectedArtwork = null"
    >
      <article class="artwork-modal">
        <button
          class="close-button"
          type="button"
          aria-label="Close artwork details"
          @click="selectedArtwork = null"
        >
          ×
        </button>
        <div class="modal-image"><span>ADD IMAGE</span></div>
        <div class="modal-content">
          <p class="kicker">NOW SHOWING</p>
          <h2>{{ selectedArtwork.title }}</h2>
          <p class="modal-artist">{{ selectedArtwork.artist }}</p>
          <p>{{ selectedArtwork.location }}</p>
          <hr />
          <div class="modal-specs">
            <div>
              <small>MEDIUM</small><strong>{{ selectedArtwork.medium }}</strong>
            </div>
            <div>
              <small>DIMENSIONS</small
              ><strong>{{ selectedArtwork.dimensions }}</strong>
            </div>
            <div>
              <small>EDITION</small
              ><strong>{{ selectedArtwork.edition }}</strong>
            </div>
            <div>
              <small>CATEGORY</small
              ><strong>{{ selectedArtwork.category }}</strong>
            </div>
          </div>
          <blockquote>“{{ selectedArtwork.description }}”</blockquote>
          <strong class="modal-price">{{
            selectedArtwork.price || "R —"
          }}</strong
          ><button
            class="primary-button"
            type="button"
            @click="addToBag(selectedArtwork)"
          >
            ENQUIRE / PURCHASE</button
          ><button class="secondary-button" type="button">
            REQUEST STUDIO VISIT
          </button>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.artwork-page {
  --paper: #f3eee4;
  --ink: #160a06;
  --rust: #8f3f1c;
  --muted: #997b69;
  --line: #ded5c7;
  min-height: 100vh;
  color: var(--ink);
  background: var(--paper);
}
.site-header {
  height: 84px;
  padding: 0 2.1%;
  display: flex;
  align-items: center;
  gap: 3.2%;
  border-bottom: 1px solid var(--line);
  background: var(--paper);
  position: sticky;
  top: 0;
  z-index: 10;
}
.logo {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 280px;
  color: var(--ink);
  text-decoration: none;
}
.logo-mark {
  display: inline-grid;
  place-items: center;
  width: 48px;
  height: 48px;
  color: #fff;
  background: #893b1d;
  font:
    22px Georgia,
    serif;
}
.logo strong {
  display: block;
  font:
    700 21px Georgia,
    serif;
  letter-spacing: -0.03em;
}
.logo small {
  display: block;
  margin-top: 4px;
  color: #99745f;
  letter-spacing: 0.16em;
  font-size: 12px;
}
.search-box {
  position: relative;
  width: min(32vw, 480px);
  margin-left: auto;
}
.search-box input {
  width: 100%;
  height: 44px;
  border: 1px solid #d9d0c4;
  padding: 0 45px 0 18px;
  color: var(--ink);
  background: #fff;
  font-size: 17px;
  outline: none;
}
.search-icon {
  position: absolute;
  right: 16px;
  top: 6px;
  color: #aa927f;
  font-size: 29px;
}
.main-nav {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-left: auto;
  white-space: nowrap;
}
.main-nav a {
  padding: 30px 0 11px;
  color: var(--ink);
  font-size: 16px;
  text-decoration: none;
}
.main-nav a.active {
  color: var(--rust);
  border-bottom: 1px solid var(--rust);
}
.bag-button {
  border: 0;
  color: var(--ink);
  background: transparent;
  font-size: 29px;
  cursor: pointer;
}
.artwork-values {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8%;
  padding: 42px 11.5% 48px;
  border-bottom: 1px solid var(--line);
  background: #e9e1d4;
}
.artwork-values i {
  color: var(--rust);
  font-style: normal;
  font-size: 24px;
}
.artwork-values h2 {
  margin: 15px 0 8px;
  font:
    700 20px Georgia,
    serif;
}
.artwork-values p {
  max-width: 390px;
  margin: 0;
  color: var(--muted);
  line-height: 1.55;
}
.gallery-section {
  max-width: 1500px;
  margin: auto;
  padding: 58px 3.2% 100px;
}
.gallery-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 35px;
}
.kicker {
  margin: 0 0 18px;
  color: #9e806e;
  letter-spacing: 0.28em;
  font-size: 13px;
}
.gallery-heading h1 {
  margin: 0;
  font:
    700 clamp(35px, 4vw, 53px) / 1.05 "Playfair Display",
    Georgia,
    serif;
  letter-spacing: -0.04em;
}
.category-tabs {
  display: flex;
}
.category-tabs button {
  border: 1px solid var(--line);
  border-right: 0;
  padding: 11px 25px;
  color: var(--muted);
  background: transparent;
  letter-spacing: 0.12em;
  font-weight: 700;
  cursor: pointer;
}
.category-tabs button:last-child {
  border-right: 1px solid var(--line);
}
.category-tabs button.selected {
  color: #fff;
  border-color: var(--ink);
  background: var(--ink);
}
.artwork-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px 24px;
}
.artwork-card {
  min-width: 0;
  cursor: pointer;
}
.artwork-image {
  position: relative;
  height: 470px;
  overflow: hidden;
  background: #ded5c7;
}
.artwork-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.35s;
}
.artwork-card:hover .artwork-image img {
  transform: scale(1.03);
}
.image-placeholder {
  display: grid;
  place-items: center;
  height: 100%;
  color: #a17c68;
  letter-spacing: 0.18em;
  font-size: 13px;
}
.artwork-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 6px 10px;
  color: #fff;
  background: var(--ink);
  letter-spacing: 0.1em;
  font-size: 12px;
  font-weight: 700;
}
.artist-line {
  margin: 17px 0 7px;
  color: #9e806e;
  letter-spacing: 0.13em;
  font-size: 12px;
}
.artwork-card h2 {
  margin: 0 0 7px;
  color: var(--rust);
  font:
    italic 700 20px Georgia,
    serif;
}
.artwork-details {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
}
.artwork-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}
.artwork-price strong {
  font:
    700 19px Georgia,
    serif;
}
.artwork-price span {
  color: var(--muted);
  font-size: 13px;
}
.commission-banner {
  padding: 78px 24px;
  color: #fff;
  background: #200b07;
  text-align: center;
}
.commission-banner h2 {
  margin: 0 0 22px;
  font:
    700 clamp(40px, 5vw, 62px) / 1.05 "Playfair Display",
    Georgia,
    serif;
}
.commission-banner h2 em,
.newsletter h2 em {
  color: #d0a36b;
  font-weight: 600;
}
.commission-banner > p:not(.kicker) {
  max-width: 650px;
  margin: 0 auto 35px;
  color: #c2aba0;
  line-height: 1.6;
}
.commission-banner a {
  display: inline-block;
  border: 1px solid #8b6b60;
  padding: 16px 38px;
  color: #fff;
  text-decoration: none;
  letter-spacing: 0.12em;
  font-weight: 700;
}
.newsletter {
  padding: 72px 24px 80px;
  text-align: center;
}
.newsletter h2 {
  margin: 0 0 17px;
  font:
    700 31px/1.2 "Playfair Display",
    Georgia,
    serif;
}
.newsletter > p:not(.kicker) {
  color: var(--muted);
}
.newsletter form {
  display: flex;
  max-width: 460px;
  margin: 28px auto 0;
}
.newsletter input {
  flex: 1;
  border: 1px solid var(--line);
  padding: 14px 18px;
  font: inherit;
}
.newsletter button,
.primary-button {
  border: 0;
  padding: 0 26px;
  color: #fff;
  background: var(--rust);
  letter-spacing: 0.12em;
  font-weight: 700;
  cursor: pointer;
}
.site-footer {
  display: grid;
  grid-template-columns: 1.25fr 1fr 1fr 1fr;
  gap: 6%;
  padding: 72px 5.5% 85px;
  color: #fff;
  background: #200b07;
}
.footer-brand {
  max-width: 370px;
}
.footer-brand .logo-mark {
  width: 42px;
  height: 42px;
  vertical-align: middle;
  margin-right: 12px;
}
.footer-brand strong {
  font:
    700 21px Georgia,
    serif;
}
.footer-brand p,
.site-footer a {
  color: #b29686;
}
.footer-brand p {
  margin-top: 27px;
  line-height: 1.6;
}
.site-footer a {
  display: block;
  margin-bottom: 21px;
  text-decoration: none;
}
.footer-title {
  margin: 7px 0 35px;
  color: #9e806e;
  letter-spacing: 0.16em;
}
.bag-count {
  position: absolute;
  margin: -10px 0 0 -8px;
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  color: #fff;
  background: var(--rust);
  font-size: 11px;
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
  color: var(--ink);
  background: var(--paper);
  box-shadow: -12px 0 35px rgba(22, 10, 6, 0.18);
}
.bag-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 34px 28px 26px;
  border-bottom: 1px solid var(--line);
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
  color: var(--rust);
  background: transparent;
  font-size: 32px;
  cursor: pointer;
}
.bag-list {
  overflow: auto;
  padding: 20px 28px;
}
.bag-item {
  padding: 16px 0;
  border-bottom: 1px solid var(--line);
}
.bag-item p {
  margin: 3px 0 8px;
  color: var(--rust);
  font:
    700 18px Georgia,
    serif;
}
.bag-item small {
  display: block;
  margin-bottom: 12px;
  color: var(--muted);
}
.bag-item strong {
  display: block;
  font-size: 17px;
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
  border: 1px solid var(--line);
  color: var(--rust);
  background: transparent;
  font-size: 20px;
  cursor: pointer;
}
.quantity-controls span {
  min-width: 16px;
  text-align: center;
}
.empty-bag {
  margin: auto;
  color: var(--muted);
  font-size: 18px;
  text-align: center;
}
.empty-bag button {
  border: 1px solid var(--rust);
  padding: 12px 16px;
  color: #fff;
  background: var(--rust);
  cursor: pointer;
}
.artwork-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 25;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
  background: #160a066f;
}
.artwork-modal {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: min(1000px, 95vw);
  max-height: 92vh;
  overflow: auto;
  position: relative;
  background: var(--paper);
}
.close-button {
  position: absolute;
  top: 17px;
  right: 24px;
  z-index: 2;
  border: 0;
  color: #8b776b;
  background: transparent;
  font-size: 32px;
  cursor: pointer;
}
.modal-image {
  min-height: 650px;
  display: grid;
  place-items: center;
  color: #a17c68;
  background: #ded5c7;
  letter-spacing: 0.18em;
  font-size: 13px;
}
.modal-content {
  padding: 65px 42px 40px;
}
.modal-content h2 {
  margin: 0 0 10px;
  font:
    italic 700 35px Georgia,
    serif;
}
.modal-artist {
  margin: 0 0 5px;
  color: var(--rust);
  font-size: 18px;
}
.modal-content > p:not(.kicker) {
  color: var(--muted);
}
.modal-content hr {
  margin: 35px 0;
  border: 0;
  border-top: 1px solid var(--line);
}
.modal-specs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}
.modal-specs div {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.modal-specs small {
  color: var(--muted);
  letter-spacing: 0.12em;
}
.modal-specs strong {
  font-size: 16px;
}
.modal-content blockquote {
  margin: 34px 0;
  border-left: 2px solid var(--line);
  padding-left: 15px;
  color: var(--muted);
  font-style: italic;
  line-height: 1.6;
}
.modal-price {
  display: block;
  margin-bottom: 22px;
  font:
    700 29px Georgia,
    serif;
}
.primary-button,
.secondary-button {
  width: 100%;
  min-height: 48px;
}
.secondary-button {
  margin-top: 10px;
  border: 1px solid var(--line);
  color: var(--ink);
  background: transparent;
  letter-spacing: 0.1em;
  font-weight: 700;
  cursor: pointer;
}
@media (max-width: 1050px) {
  .main-nav {
    gap: 14px;
  }
  .main-nav a {
    font-size: 13px;
  }
  .logo {
    min-width: auto;
  }
  .artwork-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .artwork-image {
    height: 420px;
  }
}
@media (max-width: 700px) {
  .site-header {
    height: auto;
    min-height: 76px;
    flex-wrap: wrap;
    padding: 14px 18px;
    gap: 15px;
  }
  .logo {
    flex: 1;
  }
  .search-box {
    order: 3;
    width: 100%;
    margin: 0;
  }
  .main-nav {
    display: none;
  }
  .artwork-values {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 35px 24px;
  }
  .gallery-section {
    padding: 50px 18px 70px;
  }
  .gallery-heading {
    display: block;
  }
  .category-tabs {
    margin-top: 25px;
    overflow-x: auto;
  }
  .category-tabs button {
    flex: 1;
    white-space: nowrap;
    padding: 11px 14px;
  }
  .artwork-grid {
    grid-template-columns: 1fr 1fr;
    gap: 35px 14px;
  }
  .artwork-image {
    height: 290px;
  }
  .artist-line {
    font-size: 10px;
  }
  .artwork-card h2 {
    font-size: 17px;
  }
  .artwork-details {
    font-size: 12px;
  }
  .artwork-price strong {
    font-size: 16px;
  }
  .artwork-price span {
    font-size: 10px;
  }
  .artwork-modal {
    grid-template-columns: 1fr;
    max-height: 95vh;
  }
  .modal-image {
    min-height: 280px;
  }
  .modal-content {
    padding: 35px 24px;
  }
  .site-footer {
    grid-template-columns: 1fr 1fr;
    padding: 60px 24px;
    gap: 35px;
  }
  .footer-brand {
    grid-column: 1/-1;
  }
}
@media (max-width: 430px) {
  .artwork-grid {
    grid-template-columns: 1fr;
  }
  .artwork-image {
    height: 390px;
  }
  .newsletter form {
    display: grid;
    gap: 8px;
  }
  .newsletter button {
    min-height: 48px;
  }
  .site-footer {
    grid-template-columns: 1fr;
  }
  .footer-brand {
    grid-column: auto;
  }
}
</style>

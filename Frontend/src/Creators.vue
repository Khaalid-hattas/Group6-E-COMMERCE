<script setup>
import { computed, ref } from "vue";

const activeFilter = ref("ALL");
const selectedCreator = ref(null);
const requestCreator = ref(null);
const submitted = ref(false);
const bagOpen = ref(false);

const creators = [
  {
    name: "Elena Vasquez",
    role: "Ceramicist",
    location: "OAXACA, MX",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=85",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=85",
    featured: true,
    accepting: true,
    years: 14,
    pieces: 1840,
    rating: "4.9",
    reviews: 286,
    tags: ["KITCHENWARE", "ORNAMENTS", "SCULPTURAL VESSELS"],
    bio: "Elena learned to throw on a salvaged wheel in her grandmother's kitchen in Oaxaca. Fourteen years later her practice blends traditional forms with a quiet, modern sensibility.",
    lead: "3–5 weeks",
    from: "£85",
  },
  {
    name: "Mika Tanaka",
    role: "Ceramic Artist",
    location: "KYOTO, JP",
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1000&q=85",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=85",
    featured: true,
    accepting: true,
    years: 11,
    pieces: 960,
    rating: "4.8",
    reviews: 167,
    tags: ["ASH-GLAZE CERAMICS", "TEA WARE", "ORNAMENTAL TOTEMS"],
    bio: "Mika is the third generation of the Tanaka family to practice ash-glaze ceramics in Kyoto. Her work is rooted in patience, balance, and the beauty of everyday rituals.",
    lead: "4–6 weeks",
    from: "£95",
  },
  {
    name: "Sofia Reyes",
    role: "Fibre Artist",
    location: "BARCELONA, ES",
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1000&q=85",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=85",
    featured: true,
    accepting: true,
    years: 7,
    pieces: 620,
    rating: "4.8",
    reviews: 204,
    tags: ["MACRAMÉ", "WOVEN ORNAMENTS", "PLANT HANGERS"],
    bio: "Sofia came to macramé through a zero-waste fashion background. Every material she uses is either reclaimed, post-industrial offcut, or naturally dyed. She has developed her own knotting language — patterns she's never published — which gives her work an instantly recognisable texture.",
    lead: "4–5 weeks",
    from: "£65",
  },
  {
    name: "James Okoro",
    role: "Woodworker",
    location: "PORTLAND, OR",
    image:
      "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=1000&q=85",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=85",
    featured: false,
    accepting: true,
    years: 9,
    pieces: 430,
    rating: "4.9",
    reviews: 91,
    tags: ["KITCHENWARE", "CUTTING BOARDS", "SERVING VESSELS"],
    bio: "James sources every plank himself from certified sustainable forests in the Pacific Northwest. He refuses shortcuts, allowing the grain and character of each piece to lead the design.",
    lead: "3–4 weeks",
    from: "£70",
  },
  {
    name: "Priya Nair",
    role: "Silversmith",
    location: "JAIPUR, IN",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85",
    avatar:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=160&q=85",
    featured: true,
    accepting: true,
    years: 8,
    pieces: 1100,
    rating: "4.9",
    reviews: 175,
    tags: ["SILVER JEWELLERY", "GOLD VERMEIL", "BESPOKE COMMISSIONS"],
    bio: "Priya trained at the Jaipur School of Arts before spending two years in London studying hallmarking and alloy work. Her jewellery combines precise metalwork with the spirit of Rajasthan.",
    lead: "2–4 weeks",
    from: "£90",
  },
  {
    name: "Tahlia Moore",
    role: "Jeweller",
    location: "MELBOURNE, AU",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=85",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=85",
    featured: false,
    accepting: true,
    years: 10,
    pieces: 780,
    rating: "4.8",
    reviews: 139,
    tags: ["RINGS", "EARRINGS", "RAW STONE SETTINGS"],
    bio: "Tahlia's work is defined by restraint. A silversmith for ten years, she has reduced her vocabulary to a handful of forms that let each stone speak.",
    lead: "3–6 weeks",
    from: "£75",
  },
  {
    name: "Camille Renard",
    role: "Painter",
    location: "LYON, FR",
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1000&q=85",
    avatar: "",
    featured: true,
    accepting: true,
    years: 12,
    pieces: 290,
    rating: "5.0",
    reviews: 66,
    tags: ["ABSTRACT OIL", "LARGE FORMAT", "COMMISSIONED INTERIORS"],
    bio: "Camille paints in long, unbroken sessions — sometimes twelve hours without stopping. Her large-format work is physical, bright, and made to change the feeling of a room.",
    lead: "6–8 weeks",
    from: "£240",
  },
  {
    name: "Lena Bauer",
    role: "Ceramicist & Candle Maker",
    location: "BERLIN, DE",
    image:
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=1000&q=85",
    avatar:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=160&q=85",
    featured: false,
    accepting: false,
    years: 6,
    pieces: 2200,
    rating: "4.7",
    reviews: 318,
    tags: ["DINNERWARE", "CANDLES", "SUSTAINABLE HOMEWARE"],
    bio: "Lena runs two parallel practices from her Berlin studio: slip-cast ceramic tableware and soy candles poured into hand-finished vessels.",
    lead: "Currently closed",
    from: "£55",
  },
];

const filteredCreators = computed(() => {
  if (activeFilter.value === "FEATURED")
    return creators.filter((creator) => creator.featured);
  if (activeFilter.value === "OPEN")
    return creators.filter((creator) => creator.accepting);
  return creators;
});

function openRequest(creator) {
  requestCreator.value = creator;
  submitted.value = false;
}

function submitRequest() {
  submitted.value = true;
}
</script>

<template>
  <div class="creators-page">
    <header class="site-header">
      <a class="logo" href="#top"
        ><span class="logo-mark">A</span
        ><span
          ><strong>ARTISAN HUB.</strong><small>ARTISAN GOODS</small></span
        ></a
      >
      <label class="search-box"
        ><span class="sr-only">Search creators</span
        ><input
          type="search"
          placeholder="Search handcrafts, artwork..."
        /><span class="search-icon">⌕</span></label
      >
      <nav class="main-nav" aria-label="Main navigation">
        <a href="#handmade">Handcrafted</a>
        <a href="#handmade">Handmade</a><a href="#handmade">Artwork</a
        ><a class="active" href="#creators">Creators</a
        ><a href="#about">About Us</a>
      </nav>
      <button
        class="bag-button"
        type="button"
        aria-label="Open shopping bag"
        @click="bagOpen = true"
      >
        ♧
      </button>
    </header>

    <div v-if="bagOpen" class="bag-backdrop" @click="bagOpen = false"></div>
    <aside v-if="bagOpen" class="bag-drawer" aria-label="Shopping bag">
      <div class="bag-heading">
        <h2>Your Bag (0)</h2>
        <button
          type="button"
          aria-label="Close shopping bag"
          @click="bagOpen = false"
        >
          ×
        </button>
      </div>
      <div class="empty-bag">
        <p>Your bag is empty.</p>
        <button type="button" @click="bagOpen = false">
          Continue shopping
        </button>
      </div>
    </aside>

    <main id="top">
      <section class="creator-hero">
        <div class="hero-copy">
          <p class="kicker">THE PEOPLE BEHIND THE PIECES</p>
          <h1>Meet the<br /><em>Creators.</em></h1>
          <p>
            Every creator on Artisan Hub has been visited in person. These are
            their stories, their crafts, and their contact details — all in one
            place.
          </p>
        </div>
        <div class="hero-stats">
          <div><strong>8</strong><span>CREATORS</span></div>
          <div><strong>7</strong><span>ACCEPTING COMMISSIONS</span></div>
          <div><strong>14</strong><span>COUNTRIES</span></div>
        </div>
      </section>

      <section class="creator-list" id="browse">
        <div class="list-toolbar">
          <p>
            Showing <strong>{{ filteredCreators.length }}</strong> creators
          </p>
          <div class="filter-tabs">
            <button
              v-for="filter in [
                ['ALL', 'ALL'],
                ['FEATURED', 'FEATURED'],
                ['OPEN', 'COMMISSIONS OPEN'],
              ]"
              :key="filter[0]"
              :class="{ selected: activeFilter === filter[0] }"
              @click="activeFilter = filter[0]"
            >
              {{ filter[1] }}
            </button>
          </div>
        </div>
        <div class="creator-grid">
          <article
            v-for="creator in filteredCreators"
            :key="creator.name"
            class="creator-card"
          >
            <img
              class="creator-image"
              :src="creator.image"
              :alt="`${creator.name} working`"
            />
            <div class="creator-content">
              <div class="creator-heading">
                <img
                  v-if="creator.avatar"
                  class="creator-avatar"
                  :src="creator.avatar"
                  :alt="creator.name"
                />
                <div v-else class="creator-avatar avatar-placeholder">
                  {{
                    creator.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                  }}
                </div>
                <div>
                  <h2>
                    {{ creator.name }}
                    <span v-if="creator.featured" class="featured"
                      >FEATURED</span
                    >
                  </h2>
                  <p class="role">{{ creator.role }}</p>
                  <p class="location">{{ creator.location }}</p>
                </div>
              </div>
              <p class="bio">{{ creator.bio }}</p>
              <div class="creator-tags">
                <span v-for="tag in creator.tags" :key="tag">{{ tag }}</span>
              </div>
              <div class="creator-metrics">
                <div>
                  <strong>{{ creator.years }}</strong
                  ><span>YEARS</span>
                </div>
                <div>
                  <strong>{{ creator.pieces.toLocaleString() }}</strong
                  ><span>PIECES</span>
                </div>
                <div>
                  <strong>{{ creator.rating }}</strong
                  ><span>RATING</span>
                </div>
              </div>
              <div class="creator-actions">
                <span
                  :class="['commission-status', { closed: !creator.accepting }]"
                  >●
                  {{
                    creator.accepting
                      ? "ACCEPTS COMMISSIONS"
                      : "COMMISSIONS CLOSED"
                  }}</span
                ><button type="button" @click="selectedCreator = creator">
                  VIEW PROFILE →
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="match-section">
        <div>
          <p class="kicker">REQUEST CUSTOM WORK</p>
          <h2>
            Don’t know which<br />creator to choose?<br /><em
              >We’ll match you.</em
            >
          </h2>
          <p>
            Tell us what you're looking for — size, material, style, budget —
            and we'll connect you with the right creator within 2 working days.
          </p>
          <ol>
            <li>
              <b>You describe the brief</b
              ><span>Material, dimensions, budget, feeling.</span>
            </li>
            <li>
              <b>We match you</b
              ><span>We select 1–2 creators from our network.</span>
            </li>
            <li>
              <b>Creator responds</b
              ><span>They send a proposal within 5 days.</span>
            </li>
            <li>
              <b>Made for you</b
              ><span>Your piece is made, signed, and shipped directly.</span>
            </li>
          </ol>
        </div>
        <form class="brief-form" @submit.prevent="submitRequest">
          <h2>Submit a brief</h2>
          <div class="form-row">
            <label>YOUR NAME *<input required placeholder="Full name" /></label
            ><label
              >EMAIL *<input required type="email" placeholder="you@email.com"
            /></label>
          </div>
          <label
            >PREFERRED CREATOR (OPTIONAL)<select>
              <option>No preference — match me</option>
              <option v-for="creator in creators" :key="creator.name">
                {{ creator.name }} — {{ creator.role }}
              </option>
            </select></label
          ><label
            >DESCRIBE WHAT YOU'RE AFTER *<textarea
              required
              placeholder="Material, size, colour, style, budget, intended use..."
            ></textarea></label
          ><button type="submit">
            {{ submitted ? "BRIEF RECEIVED" : "SUBMIT BRIEF" }}
          </button>
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
        <a href="#browse">Handcrafted</a><a href="#browse">Artwork</a
        ><a href="#browse">New Arrivals</a><a href="#browse">Sale</a>
      </div>
      <div>
        <p class="footer-title">COMPANY</p>
        <a href="#about">About Us</a><a href="#about">How It Works</a
        ><a href="#top">For Makers</a><a href="#about">Press</a>
      </div>
      <div>
        <p class="footer-title">HELP</p>
        <a href="#about">Shipping &amp; Returns</a><a href="#about">FAQ</a
        ><a href="#about">Contact</a><a href="#about">Track Order</a>
      </div>
    </footer>

    <div
      v-if="selectedCreator"
      class="overlay"
      @click.self="selectedCreator = null"
    >
      <aside class="profile-panel">
        <button
          class="close-button"
          type="button"
          aria-label="Close profile"
          @click="selectedCreator = null"
        >
          ×</button
        ><img
          class="profile-cover"
          :src="selectedCreator.image"
          :alt="selectedCreator.name"
        />
        <div class="profile-body">
          <div class="profile-heading">
            <img
              class="profile-avatar"
              :src="selectedCreator.avatar || selectedCreator.image"
              :alt="selectedCreator.name"
            />
            <div>
              <p class="kicker">CREATOR PROFILE</p>
              <h2>
                {{ selectedCreator.name }}
                <span v-if="selectedCreator.featured" class="featured"
                  >FEATURED</span
                >
              </h2>
              <p class="role">{{ selectedCreator.role }}</p>
              <p class="location">
                {{ selectedCreator.location }} ·
                {{
                  selectedCreator.location.split(", ")[1] === "ES"
                    ? "SPAIN"
                    : selectedCreator.location.split(", ")[1]
                }}
              </p>
              <p class="rating">
                ★★★★<span>★</span> &nbsp; {{ selectedCreator.rating }} ·
                {{ selectedCreator.reviews }} reviews
              </p>
            </div>
          </div>
          <p class="profile-bio">{{ selectedCreator.bio }}</p>
          <div class="profile-metrics">
            <div>
              <strong>{{ selectedCreator.years }} yrs</strong
              ><span>ACTIVE</span>
            </div>
            <div>
              <strong>{{ selectedCreator.pieces.toLocaleString() }}</strong
              ><span>PIECES MADE</span>
            </div>
            <div>
              <strong>{{ selectedCreator.rating }}</strong
              ><span>RATING</span>
            </div>
            <div>
              <strong>{{ selectedCreator.reviews }}</strong
              ><span>REVIEWS</span>
            </div>
          </div>
          <p class="kicker">SPECIALITIES</p>
          <div class="creator-tags">
            <span v-for="tag in selectedCreator.tags" :key="tag">{{
              tag
            }}</span>
          </div>
          <div class="commission-box">
            <div>
              <p class="kicker">CUSTOM COMMISSIONS</p>
              <h3>
                {{
                  selectedCreator.accepting
                    ? "Currently accepting custom work"
                    : "Commissions currently closed"
                }}
              </h3>
              <p>
                <b>Lead time:</b> {{ selectedCreator.lead }} &nbsp;&nbsp;
                <b>Starting at:</b> {{ selectedCreator.from }}
              </p>
            </div>
            <button
              v-if="selectedCreator.accepting"
              type="button"
              @click="openRequest(selectedCreator)"
            >
              REQUEST WORK
            </button>
          </div>
        </div>
      </aside>
    </div>
    <div
      v-if="requestCreator"
      class="overlay modal-overlay"
      @click.self="requestCreator = null"
    >
      <form class="request-modal" @submit.prevent="submitRequest">
        <button
          class="close-button"
          type="button"
          aria-label="Close request form"
          @click="requestCreator = null"
        >
          ×
        </button>
        <p class="kicker">CUSTOM COMMISSION REQUEST</p>
        <h2>{{ requestCreator.name }}</h2>
        <p class="request-meta">
          Commissions from <b>{{ requestCreator.from }}</b> · Lead time
          <b>{{ requestCreator.lead }}</b>
        </p>
        <div class="form-row">
          <label>YOUR NAME *<input required placeholder="Full name" /></label
          ><label
            >EMAIL *<input required type="email" placeholder="you@email.com"
          /></label>
        </div>
        <label
          >TYPE OF PIECE *<select required>
            <option value="">Select...</option>
            <option v-for="tag in requestCreator.tags" :key="tag">
              {{ tag }}
            </option>
          </select></label
        >
        <div class="form-row">
          <label
            >BUDGET (£) *<input
              required
              type="number"
              :placeholder="`Min. ${requestCreator.from}`" /></label
          ><label>NEEDED BY<input type="date" /></label>
        </div>
        <label
          >DESCRIBE YOUR VISION *<textarea
            required
            placeholder="Dimensions, materials, colour, intended use, any references..."
          ></textarea></label
        ><button class="submit-button" type="submit">
          {{ submitted ? "REQUEST SENT" : "SEND COMMISSION REQUEST" }}
        </button>
        <p class="form-note">
          We'll share your brief with {{ requestCreator.name }} and follow up
          within 3 working days.
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.creators-page {
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
}
.creator-hero {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 6%;
  align-items: center;
  min-height: 560px;
  padding: 80px 3.2%;
  color: #fff;
  background: #200b07;
}
.hero-copy {
  max-width: 590px;
}
.kicker {
  margin: 0 0 28px;
  color: #a17c68;
  letter-spacing: 0.28em;
  font-size: 14px;
}
.creator-hero h1 {
  margin: 0 0 32px;
  font:
    700 clamp(55px, 6vw, 88px) / 0.98 "Playfair Display",
    Georgia,
    serif;
  letter-spacing: -0.06em;
}
.creator-hero h1 em,
.match-section h2 em {
  color: #d0a36b;
  font-weight: 600;
}
.hero-copy > p:last-child {
  max-width: 570px;
  color: #c2aba0;
  font-size: 21px;
  line-height: 1.6;
}
.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.hero-stats div {
  display: flex;
  min-height: 130px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #4a2a21;
  text-align: center;
}
.hero-stats strong {
  font:
    700 48px Georgia,
    serif;
}
.hero-stats span {
  margin-top: 10px;
  color: #a17c68;
  letter-spacing: 0.15em;
  font-size: 13px;
}
.creator-list {
  padding-bottom: 100px;
}
.list-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 3.2%;
  border-bottom: 1px solid var(--line);
}
.list-toolbar p {
  color: var(--muted);
  font-size: 18px;
}
.list-toolbar strong {
  color: var(--ink);
}
.filter-tabs {
  display: flex;
}
.filter-tabs button {
  border: 1px solid var(--line);
  border-right: 0;
  padding: 14px 27px;
  color: var(--muted);
  background: transparent;
  letter-spacing: 0.12em;
  font-weight: 700;
}
.filter-tabs button:last-child {
  border-right: 1px solid var(--line);
}
.filter-tabs button.selected {
  color: #fff;
  border-color: var(--ink);
  background: var(--ink);
}
.creator-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 36px;
  padding: 70px 1.85% 0;
}
.creator-card {
  min-width: 0;
  border: 1px solid var(--line);
  background: #f8f4ec;
}
.creator-image {
  display: block;
  width: 100%;
  height: 325px;
  object-fit: cover;
}
.creator-content {
  padding: 32px 30px 25px;
}
.creator-heading {
  display: flex;
  align-items: center;
  gap: 22px;
  min-height: 82px;
}
.creator-avatar {
  width: 80px;
  height: 80px;
  flex: 0 0 auto;
  border: 3px solid #fff;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 4px #0002;
}
.avatar-placeholder {
  display: grid;
  place-items: center;
  color: var(--rust);
  background: #e1d5c4;
  font:
    24px Georgia,
    serif;
}
.creator-heading h2 {
  margin: 0 0 8px;
  font:
    700 26px Georgia,
    serif;
}
.role {
  margin: 0 0 6px;
  color: var(--rust);
  font-size: 18px;
}
.location {
  margin: 0;
  color: var(--muted);
  letter-spacing: 0.14em;
  font-size: 14px;
}
.featured {
  display: inline-block;
  margin-left: 8px;
  padding: 7px 10px;
  color: #fff;
  background: var(--rust);
  vertical-align: middle;
  font:
    700 12px Arial,
    sans-serif;
  letter-spacing: 0.1em;
}
.bio {
  min-height: 68px;
  margin: 28px 0 18px;
  color: var(--muted);
  font-size: 18px;
  line-height: 1.55;
}
.creator-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}
.creator-tags span {
  border: 1px solid var(--line);
  padding: 7px 12px;
  color: var(--muted);
  letter-spacing: 0.1em;
  font-size: 13px;
}
.creator-metrics,
.profile-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 22px;
  border-top: 1px solid var(--line);
  padding-top: 25px;
}
.creator-metrics div,
.profile-metrics div {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid var(--line);
  text-align: center;
}
.creator-metrics div:last-child,
.profile-metrics div:last-child {
  border-right: 0;
}
.creator-metrics strong {
  font:
    700 28px Georgia,
    serif;
}
.creator-metrics span,
.profile-metrics span {
  margin-top: 8px;
  color: var(--muted);
  letter-spacing: 0.12em;
  font-size: 12px;
}
.creator-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
}
.commission-status {
  color: #667759;
  letter-spacing: 0.1em;
  font-size: 13px;
  font-weight: 700;
}
.commission-status.closed {
  color: var(--muted);
}
.creator-actions button,
.commission-box button {
  border: 0;
  color: var(--rust);
  background: transparent;
  letter-spacing: 0.1em;
  font-weight: 700;
  cursor: pointer;
}
.match-section {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 8%;
  padding: 105px 5.5%;
  background: #e9e1d4;
}
.match-section h2 {
  margin: 0 0 28px;
  font:
    700 clamp(38px, 4vw, 57px) / 1.08 "Playfair Display",
    Georgia,
    serif;
}
.match-section > div > p:not(.kicker) {
  max-width: 520px;
  color: var(--muted);
  font-size: 19px;
  line-height: 1.65;
}
.match-section ol {
  display: grid;
  gap: 18px;
  margin: 35px 0 0;
  padding: 0;
  list-style: none;
  counter-reset: steps;
}
.match-section li {
  display: grid;
  grid-template-columns: 55px 1fr;
  counter-increment: steps;
}
.match-section li::before {
  content: "0" counter(steps);
  color: var(--rust);
  font:
    700 18px Georgia,
    serif;
}
.match-section li b,
.match-section li span {
  grid-column: 2;
}
.match-section li b {
  margin-top: -23px;
  font-size: 18px;
}
.match-section li span {
  margin-top: 8px;
  color: var(--muted);
}
.brief-form,
.request-modal {
  border: 1px solid var(--line);
  padding: 45px;
  background: var(--paper);
}
.brief-form h2,
.request-modal h2 {
  margin: 0 0 28px;
  font:
    700 28px Georgia,
    serif;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}
.brief-form label,
.request-modal label {
  display: block;
  margin-bottom: 24px;
  color: var(--muted);
  letter-spacing: 0.12em;
  font-size: 13px;
}
.brief-form input,
.brief-form select,
.brief-form textarea,
.request-modal input,
.request-modal select,
.request-modal textarea {
  display: block;
  width: 100%;
  margin-top: 10px;
  border: 1px solid #d9d0c4;
  padding: 14px 16px;
  color: var(--ink);
  background: #fff;
  font: inherit;
  letter-spacing: 0;
}
.brief-form textarea,
.request-modal textarea {
  min-height: 150px;
  resize: vertical;
}
.brief-form > button,
.submit-button {
  width: 100%;
  border: 0;
  padding: 18px;
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
  padding: 82px 5.5% 92px;
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
  line-height: 1;
  cursor: pointer;
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
.overlay {
  position: fixed;
  inset: 0;
  z-index: 30;
  display: flex;
  justify-content: flex-end;
  background: #160a066f;
}
.profile-panel {
  width: min(890px, 94vw);
  height: 100%;
  overflow: auto;
  position: relative;
  background: var(--paper);
}
.close-button {
  position: absolute;
  top: 22px;
  right: 28px;
  z-index: 2;
  border: 0;
  color: #8b776b;
  background: transparent;
  font-size: 32px;
  cursor: pointer;
}
.profile-cover {
  width: 100%;
  height: 250px;
  object-fit: cover;
}
.profile-body {
  padding: 35px 44px 55px;
}
.profile-heading {
  display: flex;
  gap: 28px;
  align-items: center;
}
.profile-avatar {
  width: 108px;
  height: 108px;
  border: 4px solid #fff;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 3px 8px #0003;
}
.profile-heading .kicker {
  margin-bottom: 16px;
}
.profile-heading h2 {
  margin: 0 0 10px;
  font:
    700 34px Georgia,
    serif;
}
.rating {
  color: var(--rust);
}
.rating span {
  color: #cabfb3;
}
.profile-bio {
  margin: 38px 0;
  color: #604d42;
  font-size: 20px;
  line-height: 1.55;
}
.profile-metrics {
  grid-template-columns: repeat(4, 1fr);
  margin: 0 0 36px;
  border: 1px solid var(--line);
  padding: 25px 0;
}
.profile-metrics strong {
  font:
    700 27px Georgia,
    serif;
}
.commission-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 32px;
  border: 1px solid #7c8e70;
  padding: 28px;
}
.commission-box .kicker {
  margin-bottom: 13px;
}
.commission-box h3 {
  margin: 0 0 12px;
  font:
    700 22px Georgia,
    serif;
}
.commission-box p:last-child {
  margin: 0;
  color: var(--muted);
}
.commission-box button {
  padding: 15px 25px;
  color: #fff;
  background: var(--rust);
  white-space: nowrap;
}
.modal-overlay {
  align-items: center;
  justify-content: center;
}
.request-modal {
  width: min(700px, 92vw);
  position: relative;
  box-shadow: 0 18px 50px #0004;
}
.request-modal .kicker {
  margin-bottom: 12px;
}
.request-meta {
  margin: 0 0 25px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line);
  color: var(--muted);
  font-size: 17px;
}
.form-note {
  margin: 24px 0 0;
  color: var(--muted);
  text-align: center;
}
@media (max-width: 1100px) {
  .main-nav {
    gap: 14px;
  }
  .main-nav a {
    font-size: 13px;
  }
  .logo {
    min-width: auto;
  }
  .creator-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .creator-hero {
    grid-template-columns: 1fr;
  }
  .hero-stats {
    max-width: 700px;
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
  .creator-hero {
    padding: 65px 24px;
  }
  .hero-stats {
    gap: 8px;
  }
  .hero-stats div {
    min-height: 105px;
  }
  .hero-stats strong {
    font-size: 36px;
  }
  .hero-stats span {
    font-size: 10px;
  }
  .list-toolbar {
    display: block;
    padding: 18px 24px;
  }
  .filter-tabs {
    overflow-x: auto;
  }
  .filter-tabs button {
    flex: 1;
    padding: 12px 13px;
    white-space: nowrap;
  }
  .creator-grid {
    grid-template-columns: 1fr;
    padding: 42px 18px 0;
  }
  .creator-image {
    height: 280px;
  }
  .match-section {
    grid-template-columns: 1fr;
    gap: 45px;
    padding: 70px 24px;
  }
  .brief-form,
  .request-modal {
    padding: 28px 20px;
  }
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .site-footer {
    grid-template-columns: 1fr 1fr;
    padding: 60px 24px;
    gap: 35px;
  }
  .footer-brand {
    grid-column: 1/-1;
  }
  .profile-body {
    padding: 28px 22px 45px;
  }
  .profile-heading {
    align-items: flex-start;
    gap: 16px;
  }
  .profile-avatar {
    width: 76px;
    height: 76px;
  }
  .profile-heading h2 {
    font-size: 25px;
  }
  .profile-metrics {
    gap: 10px;
  }
  .profile-metrics strong {
    font-size: 20px;
  }
  .commission-box {
    align-items: flex-start;
    flex-direction: column;
  }
  .commission-box button {
    width: 100%;
  }
}
@media (max-width: 430px) {
  .hero-stats strong {
    font-size: 28px;
  }
  .hero-stats span {
    letter-spacing: 0.06em;
  }
  .creator-content {
    padding: 26px 18px 22px;
  }
  .creator-heading {
    gap: 12px;
  }
  .creator-avatar {
    width: 64px;
    height: 64px;
  }
  .creator-heading h2 {
    font-size: 21px;
  }
  .bio {
    font-size: 16px;
  }
  .site-footer {
    grid-template-columns: 1fr;
  }
  .footer-brand {
    grid-column: auto;
  }
}
</style>

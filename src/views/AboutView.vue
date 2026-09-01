<template>
  <div class="page">
    <!-- BACK TO HOME -->
    <router-link to="/" class="back-home">&larr; Back to Home</router-link>

    <!-- 1. VISION HEADER -->
    <header class="vision-header">
      <img src="../images/logo.png" alt="CraftSphere logo" />
      <span class="eyebrow">Our Mission & Vision</span>
      <h1>Bridging the Gap for Independent South African Creators</h1>
      <p>
        We are building a centralized digital marketplace designed to connect
        consumers seeking authentic, distinctive goods with the local artisans,
        crafters, and makers who create them.
      </p>
    </header>
    <!-- IMAGE + STORY SPLIT (mirrors homepage hero layout) -->
    <section class="about-hero">
      <img
        src="https://api.buildingsandmoreng.com/storage/4072/IMG-20220326-WA0000.jpg"
        alt="Local artisan at work"
      />
      <div class="about-hero-text">
        <h2>Rooted in South African Craft</h2>
        <p>
          Every creator on our platform brings a story — from ceramicists in
          Gauteng to woodworkers in the Western Cape. We built this space so
          their work reaches the people who value it most, without losing the
          personal connection that makes handmade goods special.
        </p>
      </div>
    </section>

    <!-- 2. CORE CHALLENGE BLOCK -->
    <section class="section section--tight">
      <div class="section-header" style="max-width: 760px">
        <h2>Why We Exist</h2>
        <p>
          Buying a handmade product is different from buying mass-produced
          retail items. Customers care about who made the item, how it was made,
          and whether it can be personalized.
        </p>
        <p style="margin-top: 16px">
          Currently, independent local creators often rely on informal
          social-media channels, messaging platforms, or physical pop-up markets
          to showcase their work. Our platform consolidates discovery, ordering,
          secure simulated payments, and tracking into a unified ecosystem.
        </p>
      </div>
    </section>

    <!-- 3. DUAL-BENEFIT GRID -->
    <section class="section section--alt">
      <div class="section-header">
        <h2>Empowering Our Community</h2>
        <p>
          A multi-vendor ecosystem delivering value to both sides of the
          creative marketplace.
        </p>
      </div>

      <div class="benefit-grid">
        <div class="benefit-card">
          <h3>For Customers</h3>
          <ul>
            <li>
              Centralized catalog access to explore authentic South African
              craftsmanship.
            </li>
            <li>
              Direct transparency to read artisan stories and view comprehensive
              design portfolios.
            </li>
            <li>
              A structured, secure digital workflow to submit personalized
              custom creation requests.
            </li>
            <li>
              Reliable order management, cart controls, and purchase tracking.
            </li>
          </ul>
        </div>

        <div class="benefit-card">
          <h3>For Independent Creators</h3>
          <ul>
            <li>
              A standalone digital storefront to showcase listings without heavy
              infrastructure costs.
            </li>
            <li>
              Direct exposure to a digitally active national e-commerce customer
              base.
            </li>
            <li>
              Simplified operational management for ready-made inventory and
              pricing parameters.
            </li>
            <li>
              A structured messaging flow to handle bespoke customer
              specifications and quote pricing.
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 4. DIFFERENTIATION STATEMENT -->
    <section class="section">
      <p class="pull-quote">
        "We do not treat makers as anonymous backend sellers behind a product
        catalog. By placing the artisan at the absolute center of the shopping
        experience, we help cultivate long-term relationships that extend beyond
        individual point-of-sale transactions."
      </p>
    </section>

    <!-- 5. TEAM -->
    <section class="section section--alt">
      <div class="section-header">
        <h2>Meet the Project Team</h2>
        <p>
          Developing a full-stack academic MVP for the multi-vendor project
          assessment.
        </p>
      </div>

      <div class="team-grid">
        <div v-for="member in teamMembers" :key="member.name" class="team-card">
          <div class="team-avatar">
            <img :src="member.avatar" :alt="member.name" />
          </div>
          <h3>{{ member.name }}</h3>
          <span class="role">{{ member.role }}</span>
          <p><strong>Tracks Managed:</strong> {{ member.responsibilities }}</p>
        </div>
      </div>
    </section>

    <!-- 6. BOTTOM CTA -->
    <section class="section">
      <div class="cta-banner">
        <h2>Explore the Project Scope</h2>
        <p>
          Ready to look at the marketplace catalog or test the account
          onboarding system?
        </p>
        <div class="hero-actions" style="justify-content: center">
          <router-link to="/marketplace" class="btn btn--secondary"
            >Explore Products</router-link
          >
          <router-link to="/register" class="btn btn--primary"
            >Create an Account</router-link
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import logo from "../images/logo.png";

const teamMembers = ref([
  {
    name: "Aviv & Busiswa",
    role: "UI Designers & Full-Stack Integration Developers",
    responsibilities:
      "UI & Layout Integration, User Account Onboarding, JWT Authentication, and Global Database Schemas.",
    avatar: "",
  },
  {
    name: "Khaalid & Phumzile",
    role: "Product, Order & Database Developers",
    responsibilities:
      "Core Product Listings, Creator Catalog Directories, Shopping Cart Operations, Payment Simulation API, and Checkout Management.",
    avatar: "",
  },
]);
</script>

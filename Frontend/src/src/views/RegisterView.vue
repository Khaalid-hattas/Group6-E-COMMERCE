<template>
  <div class="page">
    <router-link to="/" class="back-home">&larr; Back to Home</router-link>

    <div class="auth-page">
      <div class="auth-visual">
        <img
          src="https://m.media-amazon.com/images/I/81kPm8EAOmL._AC_UF894,1000_QL80_.jpg"
          alt="register image"
        />
        <div class="auth-visual-overlay">
          <p>"Every account here starts a story ,yours could be next."</p>
        </div>
      </div>

      <div class="auth-card">
        <h1>Create Your Account</h1>
        <p class="auth-subtitle">
          Join ArtisanHub as a buyer or start selling your craft.
        </p>

        <div class="role-toggle">
          <button
            type="button"
            class="role-btn"
            :class="{ active: role === 'buyer' }"
            @click="role = 'buyer'"
          >
            I'm a Buyer
          </button>
          <button
            type="button"
            class="role-btn role-btn--creator"
            :class="{ active: role === 'creator' }"
            @click="role = 'creator'"
          >
            I'm a Creator
          </button>
        </div>

        <form @submit.prevent="handleRegister">
          <!-- SHARED FIELDS -->
          <div class="form-group">
            <label>Full Name</label>
            <input
              v-model="form.fullName"
              type="text"
              placeholder="e.g. Busiswa Bala"
              required
            />
          </div>
          <div class="form-group">
            <label>Email Address</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="At least 8 characters"
              required
              minlength="8"
            />
          </div>

          <!-- BUYER-ONLY FIELDS -->
          <template v-if="role === 'buyer'">
            <div class="form-group">
              <label
                >Delivery Address
                <span class="hint"
                  >(optional — add later at checkout)</span
                ></label
              >
              <input
                v-model="form.address"
                type="text"
                placeholder="Street, suburb, city"
              />
            </div>
            <div class="form-group">
              <label
                >What are you shopping for?
                <span class="hint">(optional)</span></label
              >
              <select v-model="form.interest">
                <option value="">Select a category</option>
                <option>Artwork</option>
                <option>Hand-Crafted</option>
                <option>Hand-made</option>
                <option>All</option>
                <option>Custom Pieces</option>
              </select>
            </div>
          </template>

          <!-- CREATOR-ONLY FIELDS -->
          <template v-else>
            <div class="form-group">
              <label>Studio / Brand Name</label>
              <input
                v-model="form.studioName"
                type="text"
                placeholder="e.g. Mokoena Ceramics"
                required
              />
            </div>
            <div class="form-group">
              <label>Primary Craft Category</label>
              <select v-model="form.craftCategory" required>
                <option value="">Select your craft</option>
                <option>Ceramics & Pottery</option>
                <option>Woodwork</option>
                <option>Jewellery</option>
                <option>Artwork</option>
                <option>Painting & Visual Art</option>
                <option>Other</option>
              </select>
            </div>
            <div class="form-group">
              <label>Location <span class="hint">(city/province)</span></label>
              <input
                v-model="form.location"
                type="text"
                placeholder="e.g. Cape Town, Western Cape"
                required
              />
            </div>
            <div class="form-group">
              <label
                >Tell buyers about your craft
                <span class="hint">(short bio)</span></label
              >
              <textarea
                v-model="form.bio"
                placeholder="What do you make, and what makes it yours?"
              ></textarea>
            </div>
          </template>

          <button type="submit" class="btn btn--primary btn--block">
            {{
              role === "buyer"
                ? "Create Buyer Account"
                : "Create Creator Account"
            }}
          </button>
        </form>

        <p class="auth-footer-text">
          Already have an account? <router-link to="/login">Log in</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const role = ref(route.query.role === "creator" ? "creator" : "buyer");

const form = reactive({
  fullName: "",
  email: "",
  password: "",
  address: "",
  interest: "",
  studioName: "",
  craftCategory: "",
  location: "",
  bio: "",
});

// Clear role-specific fields when switching to avoid submitting stale data
watch(role, () => {
  form.address = "";
  form.interest = "";
  form.studioName = "";
  form.craftCategory = "";
  form.location = "";
  form.bio = "";
});

function handleRegister() {
  const payload = {
    role: role.value,
    fullName: form.fullName,
    email: form.email,
    password: form.password,
    ...(role.value === "buyer"
      ? { address: form.address, interest: form.interest }
      : {
          studioName: form.studioName,
          craftCategory: form.craftCategory,
          location: form.location,
          bio: form.bio,
        }),
  };
  console.log("Register payload:", payload);
  // TODO: POST to /api/auth/register once backend is wired up
}
</script>

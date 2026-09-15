<template>
  <div class="page">
    <router-link to="/" class="back-home">&larr; Back to Home</router-link>

    <div class="auth-page">
      <div class="auth-visual">
        <img
          src="https://www.contemporary-african-art.com/images/looping-shapes-bright-colours-xanthe-stirpad.jpeg"
          alt="Login Image"
        />
        <div class="auth-visual-overlay">
          <p>"Welcome back , your marketplace is waiting."</p>
        </div>
      </div>

      <div class="auth-card">
        <h1>Log In</h1>
        <p class="auth-subtitle">Access your ArtisanHub account.</p>

        <div class="role-toggle">
          <button
            type="button"
            class="role-btn"
            :class="{ active: role === 'buyer' }"
            @click="role = 'buyer'"
          >
            Buyer Login
          </button>
          <button
            type="button"
            class="role-btn role-btn--creator"
            :class="{ active: role === 'creator' }"
            @click="role = 'creator'"
          >
            Creator Login
          </button>
        </div>

        <form @submit.prevent="handleLogin">
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
              placeholder="Your password"
              required
            />
          </div>

          <p
            v-if="errorMessage"
            style="
              color: #b3261e;
              background: #fdecea;
              padding: 10px 14px;
              border-radius: 6px;
              font-size: 0.85rem;
              margin-bottom: 16px;
            "
          >
            {{ errorMessage }}
          </p>

          <button
            type="submit"
            class="btn btn--primary btn--block"
            :disabled="isSubmitting"
          >
            {{
              isSubmitting
                ? "Logging in…"
                : role === "buyer"
                  ? "Log In to Shop"
                  : "Log In to Dashboard"
            }}
          </button>
        </form>

        <div class="form-divider">or</div>

        <p class="auth-footer-text">
          Don't have an account?
          <router-link
            :to="{
              path: '/register',
              query: { role, redirect: route.query.redirect || '/landing' },
            }"
            >Create one</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { addPendingCartItem, setAuthSession } from "../cartStore";
import { loginRequest } from "@/api/authApi";

const role = ref("buyer"); // UI copy only — backend returns the real role
const form = reactive({ email: "", password: "" });
const route = useRoute();
const router = useRouter();
const isSubmitting = ref(false);
const errorMessage = ref("");

async function handleLogin() {
  errorMessage.value = "";
  isSubmitting.value = true;

  try {
    // Login doesn't send `role` — the backend looks the user up by
    // email and returns whatever role is actually on their account.
    const data = await loginRequest({
      email: form.email,
      password: form.password,
    });
    setAuthSession(data.token, data.user);
    addPendingCartItem();
    router.push(route.query.redirect || "/");
  } catch (err) {
    errorMessage.value = err.message;
  } finally {
    isSubmitting.value = false;
  }
}
</script>

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

          <button type="submit" class="btn btn--primary btn--block">
            {{ role === "buyer" ? "Log In to Shop" : "Log In to Dashboard" }}
          </button>
        </form>

        <div class="form-divider">or</div>

        <p class="auth-footer-text">
          Don't have an account?
          <router-link :to="`/register?role=${role}`">Create one</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const role = ref("buyer");
const form = reactive({ email: "", password: "" });

function handleLogin() {
  console.log("Login payload:", { role: role.value, ...form });
  // TODO: POST to /api/auth/login, redirect based on returned role
}
</script>

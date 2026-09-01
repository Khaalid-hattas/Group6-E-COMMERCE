<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/" class="logo-lockup">
        <img src="./images/logo.png" alt="CraftSphere logo" />
        <span>Craft<em>Sphere</em></span>
      </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

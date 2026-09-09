<template>
  <div class="app-shell">
    <main class="page-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
}
</style>
<script setup>
import LandingPage from "./LandingPage.vue";
</script>

<template>
  <LandingPage />
</template>

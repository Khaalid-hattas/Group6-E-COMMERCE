<script setup>
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="app-shell">
    <Navbar />
    <main class="page-content">
      <RouterView />
    </main>
    <Footer />
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

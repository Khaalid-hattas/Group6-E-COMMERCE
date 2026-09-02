<script setup>
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">

      <!-- Logo -->
      <RouterLink to="/" class="logo">
        [BRAND NAME]
      </RouterLink>

      <!-- Desktop Navigation -->
      <div class="nav-links">
        <RouterLink to="/marketplace">Marketplace</RouterLink>
        <RouterLink to="/creators">Creators</RouterLink>
        <RouterLink to="/custom-request">Custom Creations</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </div>

      <!-- Actions -->
      <div class="nav-actions">
        <RouterLink to="/marketplace">Search</RouterLink>
        <RouterLink to="/cart">Cart</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </div>

      <!-- Mobile menu button -->
      <button class="menu-button">
        ☰
      </button>

    </div>
  </nav>
</template>

<style scoped>

.navbar {
  width: 100%;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 20px;
  padding-left: 10px;
}

.nav-actions {
  display: flex;
  gap: 15px;
}

.menu-button {
  display: none;
}

@media (max-width: 768px) {

  .nav-links,
  .nav-actions {
    display: none;
  }

  .menu-button {
    display: block;
  }

}

</style>
<template>
  <nav class="navbar">
    <div class="navbar-container">

      <!-- Logo -->
      <router-link to="/" class="logo">
        Artisan Hub
      </router-link>

      <!-- Navigation -->
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/marketplace">Marketplace</router-link>
        <router-link to="/creators">Creators</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/customer-dashboard">Dashboard</router-link>
      </div>

      <!-- Account -->
      <div class="nav-actions">
        <router-link to="/login">Login</router-link>
        <router-link to="/register" class="register-btn">
          Register
        </router-link>
      </div>

    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: white;
  border-bottom: 1px solid #e5e5e5;
  padding: 16px 0;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #222;
  padding-right: 20px;
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-links a,
.nav-actions a {
  text-decoration: none;
  color: #333;
}

.nav-links a:hover,
.nav-actions a:hover {
  color: #777;
}

a[href="/about"] {
  padding-right: 20px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.register-btn {
  background: #222;
  color: white !important;
  padding: 9px 16px;
  border-radius: 6px;
}

.register-btn:hover {
  background: #444;
}
</style>
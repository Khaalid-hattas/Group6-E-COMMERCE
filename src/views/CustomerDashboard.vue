<template>
  <div class="dashboard">

    <h1>Welcome back!</h1>
    <p>Here's an overview of your account.</p>

    <div class="stats">
      <div class="card">
        <h3>Orders</h3>
        <p>5</p>
      </div>

      <div class="card">
        <h3>Pending Orders</h3>
        <p>2</p>
      </div>

      <div class="card">
        <h3>Cart</h3>
        <p>3 items</p>
      </div>
    </div>

    <div class="recent-orders">
      <h2>Recent Orders</h2>

      <div class="order">
        <span>Order #1001</span>
        <span>Completed</span>
      </div>

      <div class="order">
        <span>Order #1002</span>
        <span>Pending</span>
      </div>
    </div>

  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

.stats {
  display: flex;
  gap: 20px;
  margin: 30px 0;
}

.card {
  flex: 1;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.card h3 {
  margin-bottom: 10px;
}

.card p {
  font-size: 24px;
  font-weight: bold;
}

.recent-orders {
  margin-top: 30px;
}

.order {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

@media (max-width: 768px) {
  .stats {
    flex-direction: column;
  }
}
</style>
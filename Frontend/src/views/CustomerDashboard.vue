<template>
  <div class="dashboard">

    <!-- Header -->
    <div class="dashboard-header">
      <div>
        <p class="eyebrow">MY ACCOUNT</p>
        <h1>Welcome back!</h1>
        <p class="subtitle">
          Here's an overview of your account.
        </p>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats">

      <div class="stat-card">
        <div class="stat-icon">🛍</div>
        <div>
          <p class="stat-label">TOTAL ORDERS</p>
          <h2>5</h2>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">◷</div>
        <div>
          <p class="stat-label">PENDING ORDERS</p>
          <h2>2</h2>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">🛒</div>
        <div>
          <p class="stat-label">CART ITEMS</p>
          <h2>3</h2>
        </div>
      </div>

    </div>

    <!-- Main Content -->
    <div class="dashboard-content">

      <!-- Recent Orders -->
      <section class="orders-section">

        <div class="section-header">
          <div>
            <p class="eyebrow">YOUR ACTIVITY</p>
            <h2>Recent Orders</h2>
          </div>

          <button class="view-all">
            View All Orders
          </button>
        </div>

        <div class="orders">

          <div class="order">
            <div class="order-info">
              <h3>Order #1002</h3>
              <p>2 items · 8 September 2026</p>
            </div>

            <div class="order-right">
              <span class="status pending">Pending</span>
            </div>
          </div>

          <div class="order">
            <div class="order-info">
              <h3>Order #1001</h3>
              <p>1 item · 2 September 2026</p>
            </div>

            <div class="order-right">
              <span class="status completed">Completed</span>
            </div>
          </div>

          <div class="order">
            <div class="order-info">
              <h3>Order #1000</h3>
              <p>3 items · 28 August 2026</p>
            </div>

            <div class="order-right">
              <span class="status completed">Completed</span>
            </div>
          </div>

        </div>

      </section>

      <!-- Account Navigation -->
      <section class="account-section">

        <p class="eyebrow">ACCOUNT</p>
        <h2>Manage Your Account</h2>

        <div class="account-links">

          <button class="account-link">
            <span>👤</span>
            <div>
              <strong>My Profile</strong>
              <small>View and edit your profile</small>
            </div>
            <b>→</b>
          </button>

          <button class="account-link">
            <span>📦</span>
            <div>
              <strong>My Orders</strong>
              <small>View your complete order history</small>
            </div>
            <b>→</b>
          </button>

          <button class="account-link">
            <span>✦</span>
            <div>
              <strong>Custom Requests</strong>
              <small>Manage your custom artwork requests</small>
            </div>
            <b>→</b>
          </button>

        </div>

      </section>

    </div>

  </div>
</template>


<style scoped>

.dashboard {
  min-height: 100vh;
  padding: 60px 6%;
  background: var(--paper, #f3eee4);
  color: var(--ink, #160a06);
}

/* Header */

.dashboard-header {
  margin-bottom: 45px;
}

.eyebrow {
  margin: 0 0 10px;
  color: var(--rust, #8f3f1c);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.dashboard h1 {
  margin: 0;
  font-family: Georgia, serif;
  font-size: clamp(40px, 5vw, 64px);
  line-height: 1.1;
}

.subtitle {
  margin: 15px 0 0;
  color: var(--muted, #997b69);
  font-size: 17px;
}


/* Stats */

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 60px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 25px;
  border: 1px solid var(--line, #ded5c7);
  background: #fff;
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: var(--dark, #200b07);
  color: white;
  font-size: 20px;
}

.stat-label {
  margin: 0 0 5px;
  color: var(--muted, #997b69);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.stat-card h2 {
  margin: 0;
  font-family: Georgia, serif;
  font-size: 32px;
}


/* Main Content */

.dashboard-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 50px;
}


/* Sections */

.orders-section,
.account-section {
  min-width: 0;
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 25px;
}

.dashboard h2 {
  margin: 0;
  font-family: Georgia, serif;
  font-size: 32px;
}

.view-all {
  border: 0;
  padding: 10px 0;
  color: var(--rust, #8f3f1c);
  background: transparent;
  font-weight: 600;
  cursor: pointer;
}


/* Orders */

.orders {
  border-top: 1px solid var(--line, #ded5c7);
}

.order {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 22px 0;
  border-bottom: 1px solid var(--line, #ded5c7);
}

.order-info h3 {
  margin: 0 0 7px;
  font-family: Georgia, serif;
  font-size: 19px;
}

.order-info p {
  margin: 0;
  color: var(--muted, #997b69);
  font-size: 14px;
}

.status {
  display: inline-block;
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 700;
}

.status.pending {
  color: #8f3f1c;
  background: #ead9ce;
}

.status.completed {
  color: #4e6548;
  background: #dfe6db;
}


/* Account */

.account-section {
  padding: 30px;
  background: #e9e1d4;
}

.account-section h2 {
  margin-bottom: 25px;
  font-size: 27px;
}

.account-links {
  display: flex;
  flex-direction: column;
}

.account-link {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 17px 0;
  border: 0;
  border-top: 1px solid #d6ccbe;
  color: var(--ink, #160a06);
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.account-link > span {
  font-size: 18px;
}

.account-link div {
  flex: 1;
}

.account-link strong {
  display: block;
  margin-bottom: 3px;
  font-size: 14px;
}

.account-link small {
  color: var(--muted, #997b69);
  font-size: 12px;
}

.account-link b {
  color: var(--rust, #8f3f1c);
  font-size: 18px;
}


/* Responsive */

@media (max-width: 900px) {

  .dashboard-content {
    grid-template-columns: 1fr;
  }

  .account-section {
    margin-top: 20px;
  }

}


@media (max-width: 650px) {

  .dashboard {
    padding: 40px 20px;
  }

  .stats {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 45px;
  }

  .section-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .order {
    align-items: flex-start;
    flex-direction: column;
  }

  .dashboard h1 {
    font-size: 42px;
  }

}

</style>
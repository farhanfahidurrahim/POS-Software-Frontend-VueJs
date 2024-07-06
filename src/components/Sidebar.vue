<template>
  <aside class="sidebar">
    <!-- Sidebar content here -->
    <ul class="sidebar-menu">
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li><router-link to="/products">Product</router-link></li>
      <li><router-link to="/categories">Category</router-link></li>
      <li><router-link to="/brands">Brands</router-link></li>
      <li><router-link to="/customers">Customers</router-link></li>
      <li><router-link to="/pos">POS</router-link></li>
      <li><router-link to="/orders">Orders</router-link></li>
      <!-- Report Dropdown -->
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="reportDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Report
        </a>
        <ul class="dropdown-menu" aria-labelledby="reportDropdown">
          <li>
            <router-link to="/sales-report" class="dropdown-item"
              >Sales Report</router-link
            >
          </li>
        </ul>
      </li>
      <li><router-link to="/profile">Profile</router-link></li>
      <li><router-link to="/settings">Settings</router-link></li>
    </ul>
  </aside>
</template>

<script setup></script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #f0f0f0;
  /* Add sidebar styles */
}

.sidebar-menu {
  list-style-type: none;
  padding: 0;
}

.sidebar-menu li {
  margin-bottom: 10px;
}

.sidebar-menu li a {
  text-decoration: none;
  color: #333;
  display: block;
  padding: 10px;
}

.sidebar-menu li a:hover {
  background-color: #ddd;
}
</style>

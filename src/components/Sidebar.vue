<template>
  <aside class="sidebar">
    <!-- Sidebar content here -->
    <ul class="sidebar-menu">
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li><router-link to="/products">Product</router-link></li>
      <li><router-link to="/categories">Category</router-link></li>
      <li><router-link to="/brands">Brands</router-link></li>
      <li><router-link to="/customers">Customers</router-link></li>
      <li><router-link to="/pos">Pos</router-link></li>
      <li><router-link to="/orders">Orders</router-link></li>
      <li><router-link to="/brands">Profile</router-link></li>
      <li><router-link to="/brands">Settings</router-link></li>
      <!-- Add more menu items as needed -->
    </ul>
  </aside>
</template>

<script setup>
// Add any logic here if needed
</script>

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

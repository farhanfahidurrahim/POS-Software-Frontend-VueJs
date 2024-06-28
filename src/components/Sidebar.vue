<template>
  <aside class="sidebar">
    <!-- Sidebar content here -->
    <ul class="sidebar-menu">
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li><router-link to="/users">Users</router-link></li>
      <li><router-link to="/brands/list">Product</router-link></li>
      <li><router-link to="/brands/list">Category</router-link></li>
      <li><router-link to="/brands/list">Brands</router-link></li>
      <li><router-link to="/brands/list">Profile</router-link></li>
      <li><router-link to="/brands/list">Settings</router-link></li>
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

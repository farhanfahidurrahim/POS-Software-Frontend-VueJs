<template>
  <aside class="sidebar">
    <!-- Sidebar content here -->
    <ul class="sidebar-menu">
      <li><router-link to="/dashboard" @click.native="closeAllSubmenus">Dashboard</router-link></li>
      <li><router-link to="/products" @click.native="closeAllSubmenus">Product</router-link></li>
      <li><router-link to="/categories" @click.native="closeAllSubmenus">Category</router-link></li>
      <li><router-link to="/brands" @click.native="closeAllSubmenus">Brands</router-link></li>
      <li><router-link to="/customers" @click.native="closeAllSubmenus">Customers</router-link></li>
      <li><router-link to="/pos" @click.native="closeAllSubmenus">POS</router-link></li>
      <li><router-link to="/orders" @click.native="closeAllSubmenus">Orders</router-link></li>
      <li>
        <a href="#" @click.prevent="toggleSubmenu('report')">Report  </a>
        <ul class="sidebar_submenu" :class="{ hidden: !openSubmenus.report }">
          <li><router-link to="/sales-report" class="dropdown-item" @click.native="closeAllSubmenus">Sales Report</router-link></li>
          <li><router-link to="/purchase-report" class="dropdown-item" @click.native="closeAllSubmenus">Purchase Report</router-link></li>
          <li><router-link to="/inventory-report" class="dropdown-item" @click.native="closeAllSubmenus">Inventory Report</router-link></li>
        </ul>
      </li>
      <li>
        <a href="#" @click.prevent="toggleSubmenu('purchase')">Purchase</a>
        <ul class="sidebar_submenu" :class="{ hidden: !openSubmenus.purchase }">
          <li><router-link to="/add-purchase" class="dropdown-item" @click.native="closeAllSubmenus">Add Purchase</router-link></li>
          <li><router-link to="/create-purchase" class="dropdown-item" @click.native="closeAllSubmenus">Create Purchase</router-link></li>
        </ul>
      </li>
      <li><router-link to="/profile" @click.native="closeAllSubmenus">Profile</router-link></li>
      <li><router-link to="/settings" @click.native="closeAllSubmenus">Settings</router-link></li>
    </ul>
  </aside>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const openSubmenus = reactive({
  report: false,
  purchase: false
});

const toggleSubmenu = (submenu) => {
  for (let key in openSubmenus) {
    if (key !== submenu) {
      openSubmenus[key] = false;
    }
  }
  openSubmenus[submenu] = !openSubmenus[submenu];
};

const closeAllSubmenus = () => {
  for (let key in openSubmenus) {
    openSubmenus[key] = false;
  }
};

const router = useRouter();

onMounted(() => {
  router.beforeEach((to, from, next) => {
    closeAllSubmenus();
    next();
  });
});
</script>

<style scoped>
.hidden {
  display: none;
}
</style>

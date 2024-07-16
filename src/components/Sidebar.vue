<template>
  <aside class="sidebar">
    <!-- Sidebar content here -->

    <div class="logo">
      <a href=""><img src="../assets/logo/logo.png" width="100px" alt=""></a>
    </div>

    <ul class="sidebar-menu">
      <li><router-link to="/dashboard" @click.native="closeAllSubmenus" class="singleItem"><font-awesome-icon :icon="['fas', 'chart-line']" /> Dashboard</router-link></li>
      <li><router-link to="/products" @click.native="closeAllSubmenus" class="singleItem"><font-awesome-icon :icon="['fas', 'bars']" /> Product</router-link></li>
      <li><router-link to="/categories" @click.native="closeAllSubmenus" class="singleItem"><font-awesome-icon :icon="['fas', 'list']" /> Category</router-link></li>
      <li><router-link to="/brands" @click.native="closeAllSubmenus" class="singleItem"><font-awesome-icon :icon="['fas', 'list']" /> Brands</router-link></li>
      <li><router-link to="/customers" @click.native="closeAllSubmenus" class="singleItem"><font-awesome-icon :icon="['fas', 'person-military-pointing']" /> Customers</router-link></li>
      <li><router-link to="/pos" @click.native="closeAllSubmenus" class="singleItem"><font-awesome-icon :icon="['fas', 'signs-post']" /> POS</router-link></li>
      <li><router-link to="/orders" @click.native="closeAllSubmenus" class="singleItem"><font-awesome-icon :icon="['fas', 'file-pen']" /> Orders</router-link></li>
      <li>
        <a href="#" @click.prevent="toggleSubmenu('report')">
          <span><font-awesome-icon :icon="['fas', 'bars']" /> Report</span>
          <font-awesome-icon
              v-if="openSubmenus.report"
              :icon="['fas', 'chevron-down']"
              class="chevron-icon"
          />
          <font-awesome-icon
              v-else
              :icon="['fas', 'chevron-left']"
              class="chevron-icon"
          />
        </a>
        <ul class="sidebar_submenu" :class="{ hidden: !openSubmenus.report }">
          <li>
            <router-link to="/sales/report" class="dropdown-item" @click.native="closeAllSubmenus">
              <font-awesome-icon :icon="['far', 'circle']" class="custom-icon" /> Sales Report
            </router-link>
          </li>
          <li><router-link to="/purchase/report" class="dropdown-item" @click.native="closeAllSubmenus"><font-awesome-icon :icon="['far', 'circle']" class="custom-icon" /> Purchase Report</router-link></li>
        </ul>
      </li>
      <li>
        <a href="#" @click.prevent="toggleSubmenu('purchase')">
          <span>
            <font-awesome-icon :icon="['fas', 'store']" /> Purchase
          </span>
          <font-awesome-icon
              v-if="openSubmenus.report"
              :icon="['fas', 'chevron-down']"
              class="chevron-icon"
          />
          <font-awesome-icon
              v-else
              :icon="['fas', 'chevron-left']"
              class="chevron-icon"
          />
        </a>
        <ul class="sidebar_submenu" :class="{ hidden: !openSubmenus.purchase }">
          <li><router-link to="/purchase" class="dropdown-item" @click.native="closeAllSubmenus"><font-awesome-icon :icon="['far', 'circle']" class="custom-icon" />Index Purchase</router-link></li>
          <li><router-link to="/purchase/create" class="dropdown-item" @click.native="closeAllSubmenus">
            <font-awesome-icon :icon="['far', 'circle']" class="custom-icon" />Create Purchase
          </router-link></li>
        </ul>
      </li>
      <li><router-link to="/profile" @click.native="closeAllSubmenus" class="singleItem"><font-awesome-icon :icon="['fas', 'user']" /> Profile</router-link></li>
      <li><router-link to="/settings" @click.native="closeAllSubmenus" class="singleItem"><font-awesome-icon :icon="['fas', 'gear']" /> Settings</router-link></li>
    </ul>
  </aside>
</template>

<script setup>
import { reactive, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

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
const route = useRoute();

const setActiveSubmenu = () => {
  const path = route.path;
  if (path.includes('report')) {
    openSubmenus.report = true;
  } else if (path.includes('purchase')) {
    openSubmenus.purchase = true;
  } else {
    closeAllSubmenus();
  }
};

onMounted(() => {
  setActiveSubmenu();
  router.beforeEach((to, from, next) => {
    setActiveSubmenu();
    next();
  });
});

// Watch the route and update submenu state accordingly
watch(route, () => {
  setActiveSubmenu();
});
</script>


<style scoped>
.hidden {
  display: none;
}
</style>

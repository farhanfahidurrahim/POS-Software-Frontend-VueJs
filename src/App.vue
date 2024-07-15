<template>
  <div class="layout">
    <Navbar v-if="showNavbar" />
    <div class="layout-content">
      <Sidebar v-if="showSidebar" />
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useRoute} from 'vue-router';
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";

const route = useRoute();

const showNavbar = computed(() => route.meta.layout === 'main');
const showSidebar = computed(() => route.meta.layout === 'main');
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.layout-content {
  display: flex;
  flex: 1;
}

.main-content {
  margin-left: 250px; /* Adjust for sidebar width */
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>

<template>
  <div class="layout">
    <Navbar />
    <div class="layout-content">
      <Sidebar />
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
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

.sidebar {
  width: 250px;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>

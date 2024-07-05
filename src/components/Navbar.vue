<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">POS</router-link>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <button @click="logout" class="btn btn-link nav-link">Logout</button>
          </li>
          <li class="nav-item" v-else>
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "../http.js";

const router = useRouter();

const isLoggedIn = computed(() => {
  // Check if user is logged in based on presence of token
  return !!localStorage.getItem("authToken");
});

const logout = () => {
  // Clear token from local storage
  localStorage.removeItem("authToken");

  // Clear Axios header
  delete axios.defaults.headers.common["Authorization"];

  // Redirect to login page
  router.push({ name: "Login" });
};
</script>

<style scoped>
/* Your custom styles for the Navbar */
</style>

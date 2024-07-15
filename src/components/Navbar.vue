<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/profile">{{ userData.name }}</router-link>
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
import {ref, computed, watchEffect} from "vue";
import {useRouter} from "vue-router";
import axios from "../http.js";

const router = useRouter();
const userData = ref(JSON.parse(localStorage.getItem("user")) || { name: "Admin Name" });

watchEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    userData.value = JSON.parse(storedUser);
  }
});

const isLoggedIn = computed(() => {
  return !!localStorage.getItem("authToken");
});

const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  delete axios.defaults.headers.common["Authorization"];
  router.push({name: "Login"});
};
</script>

<style scoped>
/* Your custom styles for the Navbar */
</style>

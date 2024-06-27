<template>
  <div
    class="d-flex align-items-center justify-content-between shadow-sm p-3 mb-4"
  >
    <div>
      <h2 class="m-0">Brand Edit</h2>
    </div>
    <div>
      <router-link :to="{ name: 'BrandList' }" class="btn btn-sm btn-success"
        >Back List</router-link
      >
    </div>
  </div>
  <div>
    <form @submit.prevent="updateBrand">
      <div class="mb-3">
        <label for="name" class="form-label">Name:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="brand.name"
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description:</label>
        <textarea
          class="form-control"
          id="description"
          v-model="brand.description"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Update</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "../http.js";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const brand = ref({
  name: "",
  description: "",
});

const fetchBrand = async () => {
  try {
    const response = await axios.get(`/api/v1/brands/${route.params.id}`);
    brand.value = response.data.data;
    console.log("Response=>", response);
  } catch (error) {
    console.error("Error fetching brand:", error);
  }
};

const updateBrand = async () => {
  try {
    await axios.put(`/api/v1/brands/${route.params.id}`, brand.value);
    router.push({ name: "BrandList" });
  } catch (error) {
    console.error("Error updating brand:", error);
  }
};

onMounted(() => {
  fetchBrand();
});
</script>

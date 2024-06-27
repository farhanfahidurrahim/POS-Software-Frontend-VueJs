<template>
  <div
    class="d-flex align-items-center justify-content-between shadow-sm p-3 mb-4"
  >
    <div>
      <h2 class="m-0">Brand Create</h2>
    </div>
    <div>
      <router-link :to="{ name: 'BrandList' }" class="btn btn-sm btn-success"
        >Back List</router-link
      >
    </div>
  </div>
  <div>
    <form @submit.prevent="createBrand">
      <div class="form-group mb-3">
        <label for="name" class="form-label">Name:</label>
        <input
          type="text"
          id="name"
          v-model="newBrand.name"
          class="form-control"
        />
      </div>
      <div class="form-group mb-3">
        <label for="category" class="form-label">Category:</label>
        <select id="category" v-model="newBrand.category_id" class="form-control">
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
      <div class="form-group mb-3">
        <label for="description" class="form-label">Description:</label>
        <textarea
          id="description"
          v-model="newBrand.description"
          class="form-control"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "../http.js";
import { useRouter } from "vue-router";

const router = useRouter();

const newBrand = ref({
  name: "",
  category_id: "",
  description: "",
});

const categories = ref([]); // To store categories fetched from the API

const fetchCategories = async () => {
  try {
    const response = await axios.get("/api/v1/categories"); // Adjust the API endpoint as per your actual route
    categories.value = response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const createBrand = async () => {
  try {
    const response = await axios.post("/api/v1/brands", {
      name: newBrand.value.name,
      category_id: newBrand.value.category_id,
      description: newBrand.value.description,
    });
    console.log("Brand added:", response.data); // Log response data
    // Optionally, you can navigate back to the brand list after adding
    router.push({ name: "BrandList" });
  } catch (error) {
    console.error("Error adding brand:", error);
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

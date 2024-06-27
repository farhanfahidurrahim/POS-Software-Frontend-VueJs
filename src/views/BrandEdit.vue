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
        <div v-if="errors.name" class="text-danger">
          {{ errors.name[0] }}
        </div>
      </div>

      <div class="mb-3">
        <label for="category" class="form-label">Category: <span style="color: red;">*</span></label>
        <select id="category" v-model="brand.category_id" class="form-control">
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
        <div v-if="errors.category_id" class="text-danger">
          {{ errors.category_id[0] }}
        </div>
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
const errors = ref({});

const brand = ref({
  name: "",
  description: "",
});

const categories = ref([]);

const fetchCategories = async () => {
  try {
    const response = await axios.get("/api/v1/categories");
    categories.value = response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const fetchBrand = async () => {
  try {
    const response = await axios.get(`/api/v1/brands/${route.params.id}`);
    const data = response.data.data;
    brand.value = {
      name: data.name,
      category_id: data.category.id,
      description: data.description,
    };
    console.log("Response=>", response);
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      console.error("Error:", error);
    }
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
  fetchCategories();
  fetchBrand();
});
</script>

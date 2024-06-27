<template>
  <div
    class="d-flex align-items-center justify-content-between shadow-sm p-3 mb-4"
  >
    <div>
      <h2 class="m-0">Brand Create</h2>
    </div>
    <div>
      <router-link :to="{ name: 'BrandList' }" class="btn btn-sm btn-success">Back List</router-link>
    </div>
  </div>
  <div>
    <form @submit.prevent="addBrand">
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
import { ref } from "vue";
import axios from "../http.js";
import { useRouter } from "vue-router";

const router = useRouter();

const newBrand = ref({
  name: "",
  description: "",
});

const addBrand = async () => {
  try {
    const response = await axios.post("/api/v1/brands", {
      name: newBrand.value.name,
      description: newBrand.value.description,
    });
    console.log("Brand added:", response.data); // Log response data
    // Optionally, you can navigate back to the brand list after adding
    router.push({ name: "BrandList" });
  } catch (error) {
    console.error("Error adding brand:", error);
  }
};

const goToBrandList = () => {
  router.push({ name: "BrandList" });
};
</script>

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
        <label for="name" class="form-label">Name: <span style="color:red">*</span> </label>
        <input
          type="text"
          id="name"
          v-model="newBrand.name"
          class="form-control"
        />
        <div v-if="errors.name" class="text-danger">
          {{ errors.name[0] }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="category" class="form-label">Category: <span style="color: red;">*</span></label>
        <select id="category" v-model="newBrand.category_id" class="form-control">
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
        <div v-if="errors.category_id" class="text-danger">
          {{ errors.category_id[0] }}
        </div>
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
import axios from "../../http.js";
import { useRouter } from "vue-router";
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();

const newBrand = ref({
  name: "",
  category_id: "",
  description: "",
});

const categories = ref([]);
const errors = ref({});

const fetchCategories = async () => {
  try {
    const response = await axios.get("/api/v1/categories");
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
    console.log("Response:", response.data);
    toast.success('Brand Created Successfully!');
    router.push({ name: "BrandList" });
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      console.error("Error:", error);
    }
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

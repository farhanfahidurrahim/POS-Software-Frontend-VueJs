<template>
  <div
    class="d-flex align-items-center justify-content-between shadow-sm p-3 mb-4"
  >
    <div>
      <h2 class="m-0">Brand List</h2>
    </div>
    <div>
      <router-link :to="{ name: 'BrandCreate' }" class="btn btn-sm btn-success">
        Add Brand
      </router-link>
    </div>
  </div>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Category Name</th>
          <th scope="col">Created By</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(brand, index) in brands" :key="brand.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ brand.name }}</td>
          <td>{{ brand.description }}</td>
          <td>{{ brand.category ? brand.category.name : "--" }}</td>
          <td>{{ brand.created_by }}</td>
          <td>
            <router-link
              :to="{ name: 'BrandEdit', params: { id: brand.id } }"
              class="btn btn-sm btn-info mx-2"
              >Edit</router-link
            >
            <button
              @click="deleteBrand(brand.id)"
              class="btn btn-sm btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "../http.js";

const brands = ref([]);

const fetchBrands = async () => {
  try {
    const response = await axios.get("/api/v1/brands");
    console.log("Response=>", response.data.data);
    brands.value = response.data.data;
  } catch (error) {
    console.error("Error fetching=>", error);
    return [];
  }
};

const deleteBrand = async (id) => {
  if (confirm("Are you sure you want to delete this brand?")) {
    try {
      await axios.delete(`/api/v1/brands/${id}`);
      brands.value = brands.value.filter((brand) => brand.id !== id);
      toast.success("Brand deleted successfully!");
    } catch (error) {
      console.error("Error deleting brand:", error);
      toast.error("Failed to delete brand.");
    }
  }
};

onMounted(() => {
  fetchBrands();
});
</script>

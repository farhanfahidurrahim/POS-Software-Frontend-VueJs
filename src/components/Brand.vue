<template>
  <div>
    <h1>Brands</h1>
    <!-- <div v-if="brands.length"></div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const brands = ref([]);

const fetchBrands = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/api/v1/brands`
    );
    console.log("response", response);
    brands.value = response.data.data;
  } catch (error) {
    console.log("Error fetching:", error);
  }
};

onMounted(fetchBrands);
</script>

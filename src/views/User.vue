<template>
  <div>
    <h1>User Page</h1>
    {{ brands }}
    <!-- <div v-if="brands.length">
      <div v-for="brand in brands" :key="brand.id">
        <h2>{{ brand.name }}</h2>
        <p>{{ brand.description }}</p>
        <h3>Category</h3>
        <p>Name: {{ brand.category.name }}</p>
        <p>Description: {{ brand.category.description }}</p>
        <p>Status: {{ brand.category.status }}</p>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";


const fetchBrands = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/api/v1/brands`
    );
    console.log("response=>", response);
    brands.value = response.data;
  } catch (error) {
    console.log("Error fetching=>", error);
    return []
  }
};

// const brands = ref(await fetchBrands());


// onMounted(fetchBrands);
</script>

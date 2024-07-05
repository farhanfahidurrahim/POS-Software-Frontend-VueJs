<template>
  <div>
    <div
      class="d-flex align-items-center justify-content-between shadow-sm p-3 mb-4"
    >
      <div>
        <h2 class="m-0">Product List</h2>
      </div>
      <div>
        <router-link
          :to="{ name: 'ProductCreate' }"
          class="btn btn-sm btn-success"
        >
          Add Product
        </router-link>
      </div>
    </div>

    <div class="mb-3">
      <input
        type="text"
        v-model="searchQuery"
        class="form-control"
        placeholder="Search by name..."
      />
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col">Purchase Price</th>
          <th scope="col">Sale Price</th>
          <th scope="col">Stock Qty</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>
            <img
              :src="product.image"
              alt="Product Image"
              style="max-width: 125px; max-height: 75px"
            />
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.type }}</td>
          <td>{{ product.variation[0].default_purchase_price }}</td>
          <td>{{ product.variation[0].default_sell_price }}</td>
          <td>{{ product.variation[0].stock_amount }}</td>
          <td>
            <button
              :class="[
                'btn',
                product.status === 'active' ? 'btn-success' : 'btn-secondary',
              ]"
              @click="toggleStatus(category)"
            >
              {{ product.status }}
            </button>
          </td>
          <td>
            <router-link
              :to="{ name: 'ProductView', params: { id: product.id } }"
              class="btn btn-sm btn-info mx-2"
            >
              View
            </router-link>
            <button
              @click="deleteProduct(product.id)"
              class="btn btn-sm btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- No search data message -->
    <div v-if="products.length === 0 && !loading" class="alert alert-danger">
      No data found.
    </div>

    <!-- Pagination Links -->
    <nav
      class="d-flex justify-content-end"
      v-if="paginationLinks && paginationLinks.links.length > 0"
    >
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: !paginationLinks.prev }">
          <button
            class="page-link"
            @click="paginationLinks.prev && fetchData(paginationLinks.prev)"
            :disabled="!paginationLinks.prev"
          >
            Previous
          </button>
        </li>
        <li
          class="page-item"
          v-for="(link, index) in paginationLinks.links"
          :key="index"
          :class="{ active: link.active }"
        >
          <button
            class="page-link"
            @click="fetchData(link.url)"
            v-if="link.url"
          >
            {{ link.label }}
          </button>
          <span v-else class="page-link">{{ link.label }}</span>
        </li>
        <li class="page-item" :class="{ disabled: !paginationLinks.next }">
          <button
            class="page-link"
            @click="paginationLinks.next && fetchData(paginationLinks.next)"
            :disabled="!paginationLinks.next"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>

    <!-- Loading indicator -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "../../http.js";
import { useToast } from "vue-toastification";

const toast = useToast();
const fetchProducts = ref([]);
const searchQuery = ref("");
const loading = ref(false);
const paginationLinks = ref({
  links: [],
  prev: null,
  next: null,
});

// Fetch data
const fetchData = async (url = "/api/v1/products") => {
  try {
    loading.value = true;
    const response = await axios.get(url);
    fetchProducts.value = response.data.data;
    console.log("products", response);
    updatePaginationLinks(response.data.links, response.data.meta);
  } catch (error) {
    console.error("Error fetching:", error);
    toast.error("Failed to fetch.");
  } finally {
    loading.value = false;
  }
};

// Update pagination links
const updatePaginationLinks = (links, meta) => {
  const formattedLinks = meta.links.map((link) => ({
    url: link.url,
    label: link.label,
    active: link.active,
  }));
  paginationLinks.value = {
    links: formattedLinks,
    prev: links.prev,
    next: links.next,
  };
};

// Delete function
const deleteProduct = async (id) => {
  if (confirm("Are you sure you want to delete?")) {
    try {
      await axios.delete(`/api/v1/products/${id}`);
      fetchProducts.value = fetchProducts.value.filter((product) => product.id !== id);
      toast.success("Deleted Successfully!");
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Failed to delete.");
    }
  }
};

// Computed filter based on search query
const products = computed(() => {
  return fetchProducts.value.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.pagination {
  margin-top: 1rem;
}
</style>

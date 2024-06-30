<template>
  <div>
    <div
      class="d-flex align-items-center justify-content-between shadow-sm p-3 mb-4"
    >
      <div>
        <h2 class="m-0">Order List</h2>
      </div>
      <div>
        <router-link
          :to="{ name: 'BrandCreate' }"
          class="btn btn-sm btn-success"
        >
          Create POS
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
          <th scope="col">Invoice</th>
          <th scope="col">C.Name</th>
          <th scope="col">C.Phone</th>
          <th scope="col">Date</th>
          <th scope="col">Total Amount</th>
          <th scope="col">Courier</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="order.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ order.invoice }}</td>
          <td>{{ order.customer.name }}</td>
          <td>{{ order.customer.phone_number }}</td>
          <td>{{ order.created_at }}</td>
          <td>{{ order.total_amount }}</td>
          <td>{{ order.courier_id.name }}</td>
          <td>
            <button
              :class="[
                'btn',
                order.status === 'active' ? 'btn-success' : 'btn-secondary',
              ]"
              @click="toggleStatus(order)"
            >
              {{ order.status }}
            </button>
          </td>
          <td>
            <router-link
              :to="{ name: 'BrandEdit', params: { id: order.id } }"
              class="btn btn-sm btn-info mx-2"
            >
              Edit
            </router-link>
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

    <!-- No search data message -->
    <div v-if="orders.length === 0 && !loading" class="alert alert-danger">
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
            @click="paginationLinks.prev && fetchBrands(paginationLinks.prev)"
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
            @click="fetchBrands(link.url)"
            v-if="link.url"
          >
            {{ link.label }}
          </button>
          <span v-else class="page-link">{{ link.label }}</span>
        </li>
        <li class="page-item" :class="{ disabled: !paginationLinks.next }">
          <button
            class="page-link"
            @click="paginationLinks.next && fetchBrands(paginationLinks.next)"
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
const fetchOrders = ref([]);
const searchQuery = ref("");
const loading = ref(false);
const paginationLinks = ref({
  links: [],
  prev: null,
  next: null,
});

// Fetch data
const fetchData = async (url = "/api/v1/sale") => {
  try {
    loading.value = true;
    const response = await axios.get(url);
    fetchOrders.value = response.data.data;
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

// Delete brand function
const deleteBrand = async (id) => {
  if (confirm("Are you sure you want to delete?")) {
    try {
      await axios.delete(`/api/v1/categories/${id}`);
      brands.value = brands.value.filter((brand) => brand.id !== id);
      toast.success("Deleted Successfully!");
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Failed to delete.");
    }
  }
};

// Computed property to filter list based on search query
const orders = computed(() => {
  return fetchOrders.value.filter((order) => {
    // Convert both .name and searchQuery to lowercase for case-insensitive search
    return order.invoice.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

// Fetch initial on component mount
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.pagination {
  margin-top: 1rem;
}
</style>

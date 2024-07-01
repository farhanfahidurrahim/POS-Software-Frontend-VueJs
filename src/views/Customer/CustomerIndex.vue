<template>
  <div>
    <div
      class="d-flex align-items-center justify-content-between shadow-sm p-3 mb-4"
    >
      <div>
        <h2 class="m-0">Customer List</h2>
      </div>
      <div>
        <router-link
          :to="{ name: 'CustomerCreate' }"
          class="btn btn-sm btn-success"
        >
          Add Customer
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
          <th scope="col">Name</th>
          <th scope="col">Phone</th>
          <th scope="col">Email</th>
          <th scope="col">Address</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(customer, index) in customers" :key="customer.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ customer.name }}</td>
          <td>{{ customer.phone_number }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.location }}</td>
          <td>
            <router-link
              :to="{ name: 'CustomerEdit', params: { id: customer.id } }"
              class="btn btn-sm btn-info mx-2"
            >
              Edit
            </router-link>
            <button
              @click="deleteBrand(customer.id)"
              class="btn btn-sm btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- No search data message -->
    <div v-if="customers.length === 0 && !loading" class="alert alert-danger">
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
const fetchCustomers = ref([]);
const searchQuery = ref("");
const loading = ref(false);
const paginationLinks = ref({
  links: [],
  prev: null,
  next: null,
});

// Fetch data
const fetchData = async (url = "/api/v1/customers") => {
  try {
    loading.value = true;
    const response = await axios.get(url);
    fetchCustomers.value = response.data.data;
    console.log("fetch customer", response);
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

//Computed property to filter list based on search query
const customers = computed(() => {
  return fetchCustomers.value.filter((customer) => {
    // Convert both .name and searchQuery to lowercase for case-insensitive search
    return customer.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
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

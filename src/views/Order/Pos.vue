<template>
  <div class="">
    <div class="row">
      <!-- Product Images Section -->
      <div class="col-md-8">
        <div class="row">
          <div
            v-for="variation in variations"
            :key="variation.id"
            class="col-md-2 mb-3"
          >
            <div class="card">
              <img
                :src="variation.image"
                class="card-img-top"
                :alt="variation.name"
              />
              <div class="card-body p-2">
                <h5 class="card-title card-title-custom">
                  {{ variation.name }}
                </h5>
                <p class="card-text">
                  Price: {{ variation.default_sell_price }}
                </p>
                <button
                  @click="addToCart(variation)"
                  class="btn btn-primary cart-button w-100"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <!-- Customer Information -->
        <form @submit.prevent="createOrder">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="customerPhone" class="form-label"
                >Customer Phone*</label
              >
              <input
                type="text"
                class="form-control"
                id="customerPhone"
                v-model="customerPhone"
                @input="fetchCustomers"
                placeholder="Search Phone Number"
                required
              />
              <ul v-if="customerSuggestions.length" class="list-group">
                <li 
                  v-for="suggestion in customerSuggestions" 
                  :key="suggestion.id" 
                  class="list-group-item list-group-item-action"
                  @click="selectCustomer(suggestion)"
                >
                  {{ suggestion.phone_number }}
                </li>
              </ul>
            </div>
            <div class="col-md-6 mb-3">
              <label for="customerName" class="form-label"
                >Customer Name*</label
              >
              <input
                type="text"
                class="form-control"
                id="customerName"
                v-model="customerName"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="customerEmail" class="form-label"
                >Customer Email</label
              >
              <input
                type="email"
                class="form-control"
                id="customerEmail"
                v-model="customerEmail"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="address" class="form-label">Address*</label>
              <input
                type="text"
                class="form-control"
                id="address"
                v-model="address"
                required
              />
            </div>
          </div>

          <!-- Cart Information -->
          <div class="d-flex justify-content-between mb-2">
            <span><strong>Name</strong></span>
            <span><strong>Qty</strong></span>
            <span><strong>Price</strong></span>
          </div>
          <ul class="list-group">
            <li
              v-for="item in cart"
              :key="item.id"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>{{ item.name }}</div>
              <div>{{ item.quantity }}</div>
              <span class="badge badge-primary badge-pill" style="color: black">
                {{ item.default_sell_price }}
              </span>
            </li>
          </ul>

          <!-- Others Information -->
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="customerPhone" class="form-label">Sales From: <span class="text-danger">*</span></label>
              <select name="" id="" class="form-control">
                <option value="Facebook">Facebook</option>
                <option value="Website">Website</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label for="customerName" class="form-label"
                >Shipping Area*</label
              >
              <input
                type="text"
                class="form-control"
                id="customerName"
                v-model="customerName"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="customerEmail" class="form-label"
                >Select Courier</label
              >
              <input
                type="email"
                class="form-control"
                id="customerEmail"
                v-model="customerEmail"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="address" class="form-label">Payment Method*</label>
              <select name="" id="" class="form-control">
                <option value="cod">Cash On Delivery</option>
              </select>
            </div>
          </div>
          <button type="submit" class="btn btn-success mt-3">
            Create Order
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "../../http.js";

const variations = ref([]);
const cart = ref([]);
const customerPhone = ref('');
const customerName = ref('');
const customerEmail = ref('');
const address = ref('');
const customerSuggestions = ref([]);

// Fetch Product Variation
const fetchVariations = async (url = "/api/v1/all-variations") => {
  try {
    const response = await axios.get(url);
    variations.value = response.data.data;
    console.log("Response:", response); // Log the entire response object
  } catch (error) {
    console.error("Error fetching variations:", error);
    toast.error("Failed to fetch variations.");
  }
};

// Function to fetch customers based on phone number
const fetchCustomers = async () => {
  if (customerPhone.value.length >= 3) {
    try {
      const response = await axios.get(`/api/v1/customer-search/${customerPhone.value}`);
      customerSuggestions.value = response.data.data;
      console.log("Customer Search", response);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  } else {
    customerSuggestions.value = [];
  }
};

// Function to select a customer from the suggestions
const selectCustomer = (customer) => {
  customerPhone.value = customer.phone_number;
  customerName.value = customer.name;
  customerEmail.value = customer.email;
  address.value = customer.location;
  customerSuggestions.value = [];
};

// Function to add item to cart
const addToCart = (variation) => {
  const existingItem = cart.value.find((item) => item.id === variation.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.value.push({
      id: variation.id,
      name: variation.name,
      quantity: 1,
      default_sell_price: variation.default_sell_price,
    });
  }
};

// Function to create order
const createOrder = () => {
  // Add logic to create order
};

onMounted(() => {
  fetchVariations();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
}
.card {
  width: 100%;
  /* height: 100%; */
}
.card-img-top {
  width: 100%;
  /* height: 150px; */
}
.card-title {
  font-size: 12px;
}
.card-title-custom {
  overflow: hidden;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  min-height: 30px;
  -webkit-box-orient: vertical;
}
.card-text {
  font-size: 12px;
}
.cart-button {
  font-size: 10px;
}
</style>

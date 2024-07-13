<template>
  <div class="">
    <div class="row">
      <!-- Cart Section Left -->
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
        <!-- Show More button -->
        <button v-if="displayedVariations.length < variations.length" @click="showMoreVariations" class="btn btn-link mt-2">
          Show More
        </button>
      </div>
      <!-- Cart Section Right -->
      <div class="col-md-4">
        <!-- Customer Information -->
        <form @submit.prevent="createOrder">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="phoneNumber" class="form-label"
                >Phone: <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                id="phoneNumber"
                v-model="storeSale.phone_number"
                @input="fetchCustomers"
                placeholder="Search Phone Number"
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
              <div v-if="errors.phone_number" class="text-danger">
                {{ errors.phone_number[0] }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="customerName" class="form-label"
                >Customer Name: <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                id="customerName"
                v-model="storeSale.name"
              />
              <div v-if="errors.name" class="text-danger">
                {{ errors.name[0] }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="customerEmail" class="form-label"
                >Customer Email:</label
              >
              <input
                type="email"
                class="form-control"
                id="customerEmail"
                v-model="storeSale.email"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="address" class="form-label"
                >Address: <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                id="address"
                v-model="storeSale.location"
              />
              <div v-if="errors.location" class="text-danger">
                {{ errors.location[0] }}
              </div>
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
              :key="item.variation_id"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <input type="text" class="form-control" v-model="item.name" />
              </div>
              <div>
                <input
                  type="number"
                  class="form-control"
                  v-model="item.quantity"
                  min="1"
                />
              </div>

              <span class="badge badge-primary badge-pill" style="color: black">
                {{ item.default_sell_price }}
              </span>
            </li>
          </ul>

          <!-- Others Information -->
          <div class="row mt-3">
            <div class="col-md-6 mb-3">
              <label for="salesFrom" class="form-label"
                >Sales From: <span class="text-danger">*</span></label
              >
              <select
                name=""
                v-model="storeSale.sale_from"
                id=""
                class="form-control"
              >
                <option value="Facebook">Facebook</option>
                <option value="Website">Website</option>
                <option value="Offline">Offline</option>
              </select>
              <div v-if="errors.sale_from" class="text-danger">
                {{ errors.sale_from[0] }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="shippingArea" class="form-label"
                >Shipping Area: <span class="text-danger">*</span></label
              >
              <select class="form-control" v-model="storeSale.shipping_charge">
                <option value="50">Inside Dhaka</option>
                <option value="100">Outside Dhaka</option>
              </select>
              <div v-if="errors.shipping_charge" class="text-danger">
                {{ errors.shipping_charge[0] }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="courier" class="form-label"
                >Select Courier: <span class="text-danger">*</span></label
              >
              <select class="form-control" v-model="storeSale.courier_id">
                <option value="2">Sundarban</option>
                <option value="3">Redx</option>
              </select>
              <div v-if="errors.courier_id" class="text-danger">
                {{ errors.courier_id[0] }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="paymentMethod" class="form-label"
                >Payment Method: <span class="text-danger">*</span></label
              >
              <select
                name=""
                v-model="storeSale.delivery_method"
                id=""
                class="form-control"
              >
                <option value="cod">Cash On Delivery</option>
              </select>
              <div v-if="errors.delivery_method" class="text-danger">
                {{ errors.delivery_method[0] }}
              </div>
            </div>
          </div>
          <div class="mt-3">
            <strong>Total Amount: {{ totalAmount }}</strong>
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
import { ref, computed, onMounted } from "vue";
import axios from "../../http.js";
import { useRouter } from "vue-router";
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();

const errors = ref({});
const variations = ref([]);
const displayedVariations = ref([]);
const cart = ref([]);
const customerSuggestions = ref([]);

const storeSale = ref({
  name: "",
  phone_number: "",
  email: "",
  location: "",
  sub_totals: "",
  total_amount: "0.00",
  paid_amount: "",
  due_amount: "",
  sale_from: "",
  courier_id: "",
  shipping_charge: "",
  delivery_method: "",
});

// Fetch Product Variation
const fetchVariations = async (url = "/api/v1/all-variations") => {
  try {
    const response = await axios.get(url);
    variations.value = response.data.data;
    console.log("Response:", response); // Log the entire response object
    displayedVariations.value = variations.value.slice(0, 18);
  } catch (error) {
    console.error("Error fetching variations:", error);
    toast.error("Failed to fetch variations.");
  }
};

// Function to load more variations
const showMoreVariations = () => {
  const currentLength = displayedVariations.value.length;
  const nextBatch = variations.value.slice(currentLength, currentLength + 6); // Load next 6 items, adjust as needed
  displayedVariations.value = [...displayedVariations.value, ...nextBatch];
};

// Fetch customers based on phone number
const fetchCustomers = async () => {
  if (storeSale.value.phone_number.length >= 3) {
    try {
      const response = await axios.get(
        `/api/v1/customer-search/${storeSale.value.phone_number}`
      );
      customerSuggestions.value = response.data.data;
      console.log("Customer Search", response);
    } catch (error) {
      console.error("Error fetching customers:", error.message);
      toast.error("Failed to fetch search");
    }
  } else {
    customerSuggestions.value = [];
  }
};

// select a customer from the suggestions
const selectCustomer = (customer) => {
  storeSale.value.phone_number = customer.phone_number;
  storeSale.value.name = customer.name;
  storeSale.value.email = customer.email;
  storeSale.value.location = customer.location;
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

// calculate subtotal amount
const subTotalAmount = computed(() => {
  return cart.value
    .reduce((sum, item) => {
      return sum + item.quantity * parseFloat(item.default_sell_price);
    }, 0)
    .toFixed(2);
});

// Calculate total amount
const totalAmount = computed(() => {
  const subtotal = parseFloat(subTotalAmount.value);
  const shippingCharge = parseFloat(storeSale.value.shipping_charge);
  return (subtotal + shippingCharge).toFixed(2);
});

// Function to create order
const createOrder = async () => {
  try {
    const variationIds = cart.value.map((item) => item.id);
    const quantities = cart.value.map((item) => item.quantity);
    const unitPrices = cart.value.map((item) => item.default_sell_price);
    console.log("variationIds", variationIds);

    const response = await axios.post("/api/v1/sale", {
      name: storeSale.value.name,
      phone_number: storeSale.value.phone_number,
      email: storeSale.value.email,
      location: storeSale.value.location,
      variation_id: variationIds,
      unit_price: unitPrices,
      quantity: quantities,
      sub_totals: subTotalAmount.value,
      total_amount: totalAmount.value,
      paid_amount: storeSale.value.paid_amount,
      due_amount: totalAmount.value,
      sale_from: storeSale.value.sale_from,
      courier_id: storeSale.value.courier_id,
      shipping_charge: storeSale.value.shipping_charge,
      delivery_method: storeSale.value.delivery_method,
    });
    console.log("Store Response", response.data);
    toast.success("Sale Created Successfully");
    router.push({ name: "OrderIndex" });
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      console.error("Error:", error);
    }
  }
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

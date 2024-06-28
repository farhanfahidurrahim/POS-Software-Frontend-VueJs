<template>
    <div v-if="product" class="product-container">
      <div class="product-image">
        <img :src="product.image" alt="Product Image" class="img-fluid">
      </div>
      <div class="product-details">
        <h2>Product Details</h2>
        <p><strong>Product Name</strong>: {{ product.name }}</p>
        <p><strong>Product Type</strong>: {{ product.type }}</p>
        <p><strong>Product Category</strong>: {{ product.category.name }}</p>
        <p><strong>Product Brand</strong>: {{ product.brand.name }}</p>
        <p><strong>Product Unit</strong>: {{ product.unit?.name || 'N/A' }}</p>
        <p><strong>Status</strong>: {{ product.status }}</p>
  
        <h3>Variation Info</h3>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Purchase Price</th>
              <th>Profit Amount</th>
              <th>Selling Price</th>
              <th>Stock Amount</th>
              <th>Alert Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="variation in product.variation" :key="variation.id">
              <td><img :src="variation.image" alt="Variation Image" class="variation-img"></td>
              <td>{{ variation.name }}</td>
              <td>{{ variation.default_purchase_price }}</td>
              <td>{{ calculateProfit(variation) }}</td>
              <td>{{ variation.default_sell_price }}</td>
              <td>{{ variation.stock_amount }}</td>
              <td>{{ variation.alert_quantity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <p>Loading product...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'ProductView',
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const product = ref(null);
      const errors = ref({});
  
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`/api/v1/products/${props.id}`);
          product.value = response.data.data; // Access the data object
        } catch (error) {
          if (error.response && error.response.data.errors) {
            errors.value = error.response.data.errors;
          } else {
            console.error('Error:', error);
          }
        }
      };
  
      const calculateProfit = (variation) => {
        const purchasePrice = parseFloat(variation.default_purchase_price);
        const sellPrice = parseFloat(variation.default_sell_price);
        return (sellPrice - purchasePrice).toFixed(2);
      };
  
      onMounted(fetchProduct);
  
      return {
        product,
        errors,
        calculateProfit,
      };
    },
  };
  </script>
  
  <style scoped>
  .product-container {
    display: flex;
    align-items: flex-start;
    gap: 20px; /* Add some space between the image and the details */
  }
  
  .product-image img {
    width: 300px;
    height: 300px;
    object-fit: cover; /* Ensures the image covers the container without distorting */
  }
  
  .product-details {
    flex: 1; /* Takes up the remaining space */
  }
  
  .variation-img {
    width: 100px;
    height: 100px;
    object-fit: cover; /* Ensures the image covers the container without distorting */
  }
  
  .table {
    margin-top: 20px;
  }
  
  .table th, .table td {
    vertical-align: middle;
  }
  </style>
  
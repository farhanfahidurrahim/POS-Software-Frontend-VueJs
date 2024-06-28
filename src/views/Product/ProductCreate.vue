<template>
  <div
    class="d-flex align-items-center justify-content-between shadow-sm p-3 mb-4"
  >
    <div>
      <h2 class="m-0">Product Create</h2>
    </div>
    <div>
      <router-link :to="{ name: 'ProductIndex' }" class="btn btn-sm btn-success"
        >Back List</router-link
      >
    </div>
  </div>
  <div>
    <form @submit.prevent="createProduct">
      <div class="row">
        <div class="col-md-4">
          <div class="form-group mb-3">
            <label for="name" class="form-label"
              >Product Name: <span style="color: red">*</span>
            </label>
            <input
              type="text"
              id="name"
              v-model="newProduct.name"
              class="form-control"
              placeholder="Product Name"
            />
            <div v-if="errors.name" class="text-danger">
              {{ errors.name[0] }}
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group mb-3">
            <label for="category" class="form-label">Category: <span style="color: red">*</span></label>
            <select id="category" v-model="newProduct.category_id" class="form-control">
              <option disabled value="">Select Category</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
            <div v-if="errors.category_id" class="text-danger">
              {{ errors.category_id[0] }}
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group mb-3">
            <label for="brand" class="form-label">Brand: <span style="color: red">*</span></label>
            <select id="brand" v-model="newProduct.brand_id" class="form-control">
              <option disabled value="">Select Brand</option>
              <option v-for="brand in categoryWiseBrands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
            </select>
            <div v-if="errors.brand_id" class="text-danger">
              {{ errors.brand_id[0] }}
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group mb-3">
            <label for="image" class="form-label">Product Image: <span style="color: red">*</span></label>
            <input type="file" id="image" @change="handleImageUpload" class="form-control" />
            <div v-if="errors.image" class="text-danger">{{ errors.image[0] }}</div>
          </div>
        </div>
        <div class="col-md-2">
          <div class="preview-image" v-if="newProduct.image">
            <img :src="newProduct.imageUrl" alt="Preview Image" class="img-fluid preview-img" />
          </div>
        </div>
        <div class="col-md-3">
            <label for="description" class="form-label">Description:</label>
            <textarea id="description" v-model="newProduct.description" class="form-control"></textarea>
        </div>
        <div class="col-md-3">
          <div class="form-group mb-3">
            <label for="status" class="form-label">Status: <span style="color: red">*</span></label>
            <select id="status" v-model="newProduct.status" class="form-control">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div v-if="errors.status" class="text-danger">
              {{ errors.status[0] }}
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group mb-3">
            <label for="type" class="form-label">Product Type: <span style="color: red">*</span></label>
            <select id="type" v-model="newProduct.type" class="form-control" @change="handleTypeChange">
              <option disabled value="">Select Type</option>
              <option value="single">Single</option>
              <option value="variable">Variation</option>
            </select>
            <div v-if="errors.type" class="text-danger">
              {{ errors.type[0] }}
            </div>
          </div>
        </div>
      </div>

      <!-- Single Type Select Than Open Field -->
      <div class="row" v-if="showSingleTypeFields">
        <div class="col-md-3">
          <div class="form-group mb-3">
            <label for="purchasePrice" class="form-label">Purchase Price: <span style="color: red">*</span></label>
            <input type="text" id="purchasePrice" v-model="newProduct.default_purchase_price" class="form-control" />
            <div v-if="errors.default_purchase_price" class="text-danger">
              {{ errors.default_purchase_price[0] }}
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="form-group mb-3">
            <label for="salePrice" class="form-label">Sale Price: <span style="color: red">*</span></label>
            <input type="text" id="salePrice" v-model="newProduct.default_sell_price" class="form-control" />
            <div v-if="errors.default_sell_price" class="text-danger">
              {{ errors.default_sell_price[0] }}
            </div>  
          </div>
        </div>

        <div class="col-md-3">
          <div class="form-group mb-3">
            <label for="salePrice" class="form-label">Stock Amount: <span style="color: red">*</span></label>
            <input type="text" id="salePrice" v-model="newProduct.stock_amount" class="form-control" />
            <div v-if="errors.stock_amount" class="text-danger">
              {{ errors.stock_amount[0] }}
            </div>
           </div>
        </div>

        <div class="col-md-3">
          <div class="form-group mb-3">
            <label for="salePrice" class="form-label">Alert Quantity: <span style="color: red">*</span></label>
            <input type="text" id="salePrice" v-model="newProduct.alert_quantity" class="form-control" />
            <div v-if="errors.alert_quantity" class="text-danger">
              {{ errors.alert_quantity[0] }}
            </div>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "../../http.js";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();

const categories = ref([]);
const brands = ref([]);
const categoryWiseBrands = ref([]);
const errors = ref({});
const showSingleTypeFields = ref(false);

const newProduct = ref({
  name: '',
  category_id: '',
  brand_id: '',
  image: '',
  imageUrl: '',
  description: '',
  type: '',
  default_purchase_price: '',
  default_sell_price: '',
  stock_amount: '',
  alert_quantity: '',
  status: ''
});

// Start Handle //

const handleTypeChange = () => {
  // Reset fields
  newProduct.value.purchase_price = '';
  newProduct.value.sale_price = '';
  newProduct.value.stock_amount = '';
  newProduct.value.alert_quantity = '';

  // Toggle visibility based on selected type
  showSingleTypeFields.value = newProduct.value.type === 'single';
};

// Handle image upload and preview
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Update newProduct with selected image file
    newProduct.value.image = file;

    // Create a URL for the image preview
    const imageUrl = URL.createObjectURL(file);
    newProduct.value.imageUrl = imageUrl;
  }
};

// End Handle //

// Fetch categories and brands on component mount
const fetchCategoriesAndBrands = async () => {
  try {
    const [categoriesResponse, brandsResponse] = await Promise.all([
      axios.get("/api/v1/categories"),
      axios.get("/api/v1/brands")
    ]);
    categories.value = categoriesResponse.data.data;
    console.log("categories fetch", categoriesResponse);
    brands.value = brandsResponse.data.data;
    console.log("brands fetch", brandsResponse);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(fetchCategoriesAndBrands);

// Watch for changes in the selected category
watch(() => newProduct.value.category_id, (newCategoryId) => {
  if (newCategoryId) {
    categoryWiseBrands.value = brands.value.filter(brand => brand.category.id === newCategoryId);
  } else {
    categoryWiseBrands.value = [];
  }
});

const createProduct = async () => {
    const formData = new FormData();
    formData.append('name', newProduct.value.name);
    formData.append('category_id', newProduct.value.category_id);
    formData.append('brand_id', newProduct.value.brand_id);
    formData.append('image', newProduct.value.image);
    formData.append('description', newProduct.value.description);
    formData.append('type', newProduct.value.type);
    formData.append('default_purchase_price', newProduct.value.default_purchase_price);
    formData.append('default_sell_price', newProduct.value.default_sell_price);
    formData.append('stock_amount', newProduct.value.stock_amount);
    formData.append('alert_quantity', newProduct.value.alert_quantity);
    formData.append('status', newProduct.value.status);
  try {
    const response = await axios.post('/api/v1/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log("Product Store Response:", response.data);
    toast.success("Product Created Successfully!");
    router.push({ name: "ProductIndex" });
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      console.error("Error:", error);
    }
  }
};
</script>

<style scoped>
.preview-img {
  width: 100px;
  height: 75px;
  object-fit: cover; /* Maintain aspect ratio */
}
</style>


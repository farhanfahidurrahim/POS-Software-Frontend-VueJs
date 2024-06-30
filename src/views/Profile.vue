<template>
    <div class="row">
      <!-- Profile Details Section -->
      <div class="col-md-6">
      </div>
      <!-- Profile Update Section -->
      <div class="col-md-6">
        <!-- Customer Information -->
        <form @submit.prevent="updateProfile">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="customerName" class="form-label"
                >User Name: <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                id="customerName"
              />
              <div v-if="errors.name" class="text-danger">
                {{ errors.name[0] }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="phoneNumber" class="form-label"
                >Phone: <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                id="phoneNumber"
                placeholder="Phone Number"
              />
              <div v-if="errors.phone_number" class="text-danger">
                {{ errors.phone_number[0] }}
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
              />
              <div v-if="errors.location" class="text-danger">
                {{ errors.location[0] }}
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-success mt-3">
            Create Order
          </button>
        </form>
      </div>
    </div>
</template>

<script setup>
const fetchData = async () => {
  try {
    const response = await axios.get(`/api/v1/brands/${route.params.id}`);
    const data = response.data.data;
    brand.value = {
      name: data.name,
      category_id: data.category.id,
      description: data.description,
    };
    console.log("Response=>", response);
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      console.error("Error:", error);
    }
  }
};
</script>
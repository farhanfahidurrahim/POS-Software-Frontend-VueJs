<template>
  <div
    class="d-flex align-items-center justify-content-between shadow-sm p-3 mb-4"
  >
    <div>
      <h2 class="m-0">Customer Create</h2>
    </div>
    <div>
      <router-link :to="{ name: 'BrandIndex' }" class="btn btn-sm btn-success"
        >Back List</router-link
      >
    </div>
  </div>
  <div>
    <form @submit.prevent="createCustomer">
      <div class="form-group mb-3">
        <label for="name" class="form-label"
          >Name: <span style="color: red">*</span>
        </label>
        <input
          type="text"
          id="name"
          v-model="formField.name"
          class="form-control"
        />
        <div v-if="errors.name" class="text-danger">
          {{ errors.name[0] }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="category" class="form-label"
          >Phone: <span style="color: red">*</span></label
        >
        <input
          type="text"
          v-model="formField.phone_number"
          @input="validatePhoneNumber"
          class="form-control"
        />
        <div v-if="errors.phone_number" class="text-danger">
          {{ errors.phone_number[0] }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="category" class="form-label"
          >Email: <span style="color: red">*</span></label
        >
        <input type="email" v-model="formField.email" class="form-control" />
        <div v-if="errors.email" class="text-danger">
          {{ errors.email[0] }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="address" class="form-label"
          >Address: <span style="color: red">*</span></label
        >
        <input type="text" v-model="formField.location" class="form-control" />
        <div v-if="errors.location" class="text-danger">
          {{ errors.location[0] }}
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "../../http.js";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();

const formField = ref({
  name: "",
  phone_number: "",
  email: "",
  location: "",
});

const validatePhoneNumber = () => {
  formField.value.phone_number = formField.value.phone_number.replace(
    /\D/g,
    ""
  );
};

const errors = ref({});

const createCustomer = async () => {
  try {
    const response = await axios.post("/api/v1/customers", {
      name: formField.value.name,
      phone_number: formField.value.phone_number,
      email: formField.value.email,
      location: formField.value.location,
    });
    console.log("Response:", response.data);
    toast.success("Customer Created Successfully!");
    router.push({ name: "CustomerIndex" });
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      console.error("Error:", error);
    }
  }
};
</script>

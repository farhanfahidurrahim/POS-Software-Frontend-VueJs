<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-header text-center">
              <h4>Login</h4>
            </div>
            <div class="card-body">
              <form @submit.prevent="login">
                <div class="mb-3">
                  <label for="email" class="form-label">Email address:</label>
                  <input
                    type="email"
                    id="email"
                    v-model="email"
                    class="form-control"
                    :class="{ 'is-invalid': errors.email }"
                  />
                  <div v-if="errors.email" class="invalid-feedback">
                    {{ errors.email[0] }}
                  </div>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password:</label>
                  <input
                    type="password"
                    id="password"
                    v-model="password"
                    class="form-control"
                    :class="{ 'is-invalid': errors.password }"
                  />
                  <div v-if="errors.password" class="invalid-feedback">
                    {{ errors.password[0] }}
                  </div>
                </div>
                <button type="submit" class="btn btn-primary w-100">Login</button>
              </form>
            </div>
            <div class="card-footer text-center">
              <router-link to="/register">Don't have an account? Register</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import axios from "../../http.js";
  import { useRouter } from "vue-router";
  import { useToast } from "vue-toastification";
  
  const email = ref("");
  const password = ref("");
  const errors = ref({});
  const router = useRouter();
  const toast = useToast();
  
  const login = async () => {
    try {
      const response = await axios.post("/api/v1/login", {
        email: email.value,
        password: password.value,
      });
  
      // Handle successful login
      console.log("Login successful:", response.data);
      toast.success("Login successful!");
      router.push({ name: "HomePage" }); // Redirect to the home page
    } catch (error) {
      if (error.response && error.response.data.errors) {
        errors.value = error.response.data.errors;
      } else {
        console.error("Error:", error);
        toast.error("An error occurred while logging in.");
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    margin-top: 50px;
  }
  
  .card-header {
    background-color: #007bff;
    color: white;
  }
  </style>
  
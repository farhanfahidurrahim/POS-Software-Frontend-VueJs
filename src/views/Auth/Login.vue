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
                    {{ errors.email }}
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
                    {{ errors.password }}
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
      const { token, user } = response.data.data;
      localStorage.setItem("authToken", token.toString());
       // Save the token in local storage
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set the token for future requests
      toast.success("Login successful!");
      // router.push({ name: "Dashboard" }); // Redirect to the dashboard page
    } catch (error) {
      if (error.response && error.response.data.errors) {
        errors.value = parseErrors(error.response.data.errors);
      } else {
        console.error("Error:", error);
        toast.error("An error occurred while logging in.");
      }
    }
  };
  
  const parseErrors = (errorObj) => {
    let parsedErrors = {};
    for (let key in errorObj) {
      if (Array.isArray(errorObj[key])) {
        parsedErrors[key] = errorObj[key][0]; // Get the first error message from the array
      } else {
        parsedErrors[key] = errorObj[key];
      }
    }
    return parsedErrors;
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



  
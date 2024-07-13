<template>
  <div>
    <div
        class="d-flex align-items-center justify-content-between shadow-sm p-3 mb-4"
    >
      <div>
        <h2 class="m-0">Profile</h2>
      </div>
    </div>

    <!-- Tabs -->
    <ul class="nav nav-tabs" id="profileTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
            class="nav-link active"
            id="profile-details-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile-details"
            type="button"
            role="tab"
            aria-controls="profile-details"
            aria-selected="true"
        >
          Profile Details
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
            class="nav-link"
            id="profile-password-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile-password"
            type="button"
            role="tab"
            aria-controls="profile-password"
            aria-selected="false"
        >
          Password Change
        </button>
      </li>
    </ul>

    <!-- Tab Content -->
    <div class="tab-content" id="profileTabContent">
      <!-- Profile Details & Update Tab -->
      <div
          class="tab-pane fade show active"
          id="profile-details"
          role="tabpanel"
          aria-labelledby="profile-details-tab"
      >
        <div class="row">
          <!-- Customer Information -->
          <div class="col-md-6">
            <hr/>
            <div class="col-md-12 mb-3">
              <label for="customerName" class="form-label">User Name: </label>
              <span>{{ user.name }}</span>
            </div>
            <div class="col-md-12 mb-3">
              <label for="customerName" class="form-label">User Phone:</label>
              <span>{{ user.phone }}</span>
            </div>
            <div class="col-md-12 mb-3">
              <label for="customerName" class="form-label">User Email:</label>
              <span>{{ user.email }}</span>
            </div>
          </div>
          <div class="col-md-12">
            <!-- Customer Information -->
            <form @submit.prevent="updateProfile">
              <hr/>
              <div class="col-md-12 mb-3">
                <label for="name" class="form-label"
                >User Name: <span class="text-danger">*</span></label
                >
                <input
                    type="text"
                    class="form-control"
                    id="customerName"
                    v-model="form.name"
                />
                <div v-if="errors.name" class="text-danger">
                  {{ errors.name[0] }}
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <label for="phoneNumber" class="form-label"
                >User Phone: <span class="text-danger">*</span></label
                >
                <input
                    type="text"
                    class="form-control"
                    id="phoneNumber"
                    v-model="form.phone"
                />
                <div v-if="errors.phone_number" class="text-danger">
                  {{ errors.phone_number[0] }}
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <label for="email" class="form-label"
                >User Email: <span class="text-danger">*</span></label
                >
                <input
                    type="email"
                    class="form-control"
                    id="customerEmail"
                    v-model="user.email"
                    readonly
                />
                <div v-if="errors.email" class="text-danger">
                  {{ errors.email[0] }}
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <label for="email" class="form-label"
                >User Current Password:
                  <span class="text-danger">*</span></label
                >
                <input
                    type="password"
                    class="form-control"
                    v-model="form.password"
                />
                <div v-if="errors.password" class="text-danger">
                  {{ errors.password[0] }}
                </div>
              </div>
              <button type="submit" class="btn btn-success mt-3">Update</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Profile Password Change Tab -->
      <div
          class="tab-pane fade"
          id="profile-password"
          role="tabpanel"
          aria-labelledby="profile-password-tab"
      >
        <div class="row">
          <div class="col-md-12">
            <!-- Customer Information -->
            <form @submit.prevent="updatePassword">
              <!-- <h4 class="m-0 mb-3">Password Update</h4> -->
              <hr/>
              <div class="col-md-12 mb-3">
                <label for="name" class="form-label"
                >Current Password: <span class="text-danger">*</span></label
                >
                <input
                    type="password"
                    class="form-control"
                    v-model="passwordForm.current_password"
                />
                <div v-if="errors.current_password" class="text-danger">
                  {{ errors.current_password[0] }}
                </div>
                <div v-if="customMessageError" class="text-danger">Incorrect credentials. Please try again.</div>
              </div>
              <div class="col-md-12 mb-3">
                <label for="phoneNumber" class="form-label"
                >New Password: <span class="text-danger">*</span></label
                >
                <input type="password" class="form-control"
                       v-model="passwordForm.password"
                />
                <div v-if="errors.password" class="text-danger">
                  {{ errors.password[0] }}
                </div>
              </div>

              <div class="col-md-12 mb-3">
                <label for="email" class="form-label"
                >Confirm Password: <span class="text-danger">*</span></label
                >
                <input type="password" class="form-control"
                       v-model="passwordForm.password_confirmation"/>
              </div>
              <button type="submit" class="btn btn-success mt-3">
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Loading indicator -->
  <div v-if="loading" class="text-center">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import axios from "../http.js";
import {useToast} from "vue-toastification";

const loading = ref(false);
const errors = ref({});
const toast = useToast();

const user = ref([]);
const form = ref({
  name: "",
  phone: "",
  password: "",
});
const passwordForm = ref({
  current_password: "",
  password: "",
  password_confirmation: "",
});
const customMessageError = ref(false);

// Fetch data form Local Storage
const fetchData = (async) => {
  try {
    loading.value = true;
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log("UserData", userData);
    user.value = userData || {};
    form.value.name = user.value.name;
    form.value.phone = user.value.phone;
  } catch (error) {
    console.error("Error fetching user data", error);
  } finally {
    loading.value = false;
  }
};

const updateProfile = async () => {
  try {
    const {name, phone, password} = form.value;
    const response = await axios.post("/api/v1/user/profile/update", {
      name,
      phone_number: phone,
      password
    });

    if (response.status === 200) {
      user.value.name = name;
      user.value.phone = phone;
      localStorage.setItem("user", JSON.stringify(user.value));
      toast.success("Profile updated successfully!");
      location.reload()
    }
    console.log("Update Profile", response.data);
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      console.error("Error updating profile", error);
      toast.error("Failed to update profile.");
    }
  }
};

const updatePassword = async () => {
  try {
    const url = "/api/v1/user/profile/password-change";
    const response = await axios.post(url, {
      current_password: passwordForm.value.current_password,
      password: passwordForm.value.password,
      password_confirmation: passwordForm.value.password_confirmation,
    });
    console.log("Password Update", response);
    toast.success("Update Password Successfully!");
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      console.error("Error", error)
    }
    // Check for specific error message
    if (error.response && error.response.status === 422) {
      customMessageError.value = true;
    }
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.profile-details {
  border-right: 1px solid #ccc;
}

.profile-password {
  padding: 15px;
}

.vertical-divider {
  border-right: 1px solid #b10d0d;
  height: auto;
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
}
</style>

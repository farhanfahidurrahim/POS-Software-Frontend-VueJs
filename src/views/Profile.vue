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
          id="profile-update-tab"
          data-bs-toggle="tab"
          data-bs-target="#profile-update"
          type="button"
          role="tab"
          aria-controls="profile-update"
          aria-selected="false"
        >
          Password Change
        </button>
      </li>
    </ul>

    <!-- Tab Content -->
    <div class="tab-content" id="profileTabContent">
      <!-- Profile Details Tab -->
      <div
        class="tab-pane fade show active"
        id="profile-details"
        role="tabpanel"
        aria-labelledby="profile-details-tab"
      >
        <div class="row">
          <div class="col-md-6">
            <!-- <h4 class="m-0 mb-3">Info</h4> -->
            <hr />
            <div class="col-md-12 mb-3">
              <label for="customerName" class="form-label">User Name:</label>
              Farhan
            </div>
            <div class="col-md-12 mb-3">
              <label for="customerName" class="form-label">User Phone:</label>
              Farhan
            </div>
            <div class="col-md-12 mb-3">
              <label for="customerName" class="form-label">User Email:</label>
              Farhan
            </div>
          </div>
          <div class="vertical-divider"></div>
          <div class="col-md-6">
            <!-- <h4 class="m-0 mb-3">Info</h4> -->
            <hr />
            <form action="">
              <div class="col-md-12 mb-3">
                <label for="customerName" class="form-label">User Name:</label>
                <input type="text" />
              </div>
              <div class="col-md-12 mb-3">
                <label for="customerName" class="form-label">User Phone:</label>
                <input type="text" />
              </div>
              <div class="col-md-12 mb-3">
                <label for="customerName" class="form-label">User Email:</label>
                <input type="text" />
              </div>
              <button type="submit" class="btn btn-primary">Update</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Profile Update Tab -->
      <div
        class="tab-pane fade"
        id="profile-update"
        role="tabpanel"
        aria-labelledby="profile-update-tab"
      >
        <div class="row">
          <div class="col-md-12">
            <!-- Customer Information -->
            <form @submit.prevent="updatePassword">
              <!-- <h4 class="m-0 mb-3">Password Update</h4> -->
              <hr />
              <div class="col-md-12 mb-3">
                <label for="name" class="form-label"
                  >Current Password: <span class="text-danger">*</span></label
                >
                <input type="text" class="form-control" id="customerName" />
              </div>
              <div class="col-md-12 mb-3">
                <label for="phoneNumber" class="form-label"
                  >New Password: <span class="text-danger">*</span></label
                >
                <input type="text" class="form-control" id="phoneNumber" />
              </div>

              <div class="col-md-12 mb-3">
                <label for="email" class="form-label"
                  >Confirm Password: <span class="text-danger">*</span></label
                >
                <input type="email" class="form-control" id="customerEmail" />
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
import { ref, onMounted } from "vue";
import axios from "../http.js";

const profile = ref([]);
const loading = ref(false);

const password = ref({
  current_password: "",
  password: "",
  password_confirmation: "",
});

// Fetch data
const fetchData = async (url = "/api/v1/users") => {
  try {
    loading.value = true;
    const response = await axios.get(url);
    profile.value = response.data.data;
    console.log("profile", response);
  } catch (error) {
  } finally {
    loading.value = false;
  }
};

const updatePassword = async (url = "user/profile/password-change") => {
  try {
    const response = await axios.post(url, {
      current_password: password.value.current_password,
      password: password.value.password,
      password_confirmation: password.value.password_confirmation,
    });
    console.log("Password Update", response);
    toast.success("Update Password Successfully!");
  } catch (error) {}
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.profile-details {
  border-right: 1px solid #ccc;
}
.profile-update {
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

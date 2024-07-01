<template>
  <div
    class="d-flex align-items-center justify-content-between shadow-sm p-3 mb-4"
  >
    <div>
      <h2 class="m-0">Report : Sales</h2>
    </div>
  </div>
  <div class="container mt-4">
    <div class="row">
      <!-- Row 1 -->
      <div class="col-md-3">
        <div class="p-3 border bg-light">
          <p>100</p>
          <h6>Total Orders</h6>
        </div>
      </div>
      <div class="col-md-3">
        <div class="p-3 border bg-light">
          <p>100</p>
          <h6>Total Orders Quantity</h6>
        </div>
      </div>
      <div class="col-md-3">
        <div class="p-3 border bg-light">
          <p>100</p>
          <h6>Total Orders Amount</h6>
        </div>
      </div>
      <div class="col-md-3">
        <div class="p-3 border bg-light">
          <p>100</p>
          <h6>Total Paid Amount</h6>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <!-- Row 2 -->
      <div class="col-md-3">
        <div class="p-3 border bg-light">Column 1</div>
      </div>
      <div class="col-md-3">
        <div class="p-3 border bg-light">Column 2</div>
      </div>
      <div class="col-md-3">
        <div class="p-3 border bg-light">Column 3</div>
      </div>
      <div class="col-md-3">
        <div class="p-3 border bg-light">Column 4</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "../../http.js";
import { useToast } from "vue-toastification";

const toast = useToast();
const loading = ref(false);
const fetchSaleReport = ref("");

const fetchData = async (url = "api/v1/report/sale") => {
  try {
    loading.value = true;
    const response = await axios.get(url);
    fetchSaleReport.value = response.data.data;
    console.log("sale report", response);
  } catch (error) {
    console.error("Error fetching:", error);
    toast.error("Failed to fetch.");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.container {
  margin-top: 20px;
}
.border {
  border: 1px solid #ddd;
  text-align: center;
}
</style>

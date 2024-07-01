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
          <p>{{ fetchSaleReport.total_sale }}</p>
          <h6>Total Orders</h6>
        </div>
      </div>
      <div class="col-md-3">
        <div class="p-3 border bg-light">
          <p>{{ fetchSaleReport.total_saleQuantity }}</p>
          <h6>Total Orders Quantity</h6>
        </div>
      </div>
      <div class="col-md-3">
        <div class="p-3 border bg-light">
          <p>{{ fetchSaleReport.total_saleAmount }}</p>
          <h6>Total Orders Amount</h6>
        </div>
      </div>
      <div class="col-md-3">
        <div class="p-3 border bg-light">
          <p>{{ fetchSaleReport.total_paidAmount }}</p>
          <h6>Total Paid Amount</h6>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <!-- Row 2 -->
      <div class="col-md-3">
        <div class="p-3 border bg-light">
          <p>{{ fetchSaleReport.total_dueAmount }}</p>
          <h6>Total Due Amount</h6>
        </div>
      </div>
      <div class="col-md-3">
        <div class="p-3 border bg-light">
          <p>{{ fetchSaleReport.total_shippingCharge }}</p>
          <h6>Total Shipping Charge</h6>
        </div>
      </div>
      <div class="col-md-3">
        <div class="p-3 border bg-light">
          <p>{{ fetchSaleReport.total_cancelSale }}</p>
          Total Cancel Order
        </div>
      </div>
      <div class="col-md-3">
        <div class="p-3 border bg-light">
          <p>{{ fetchSaleReport.total_cancelSaleAmount }}</p>
          Total Cancel Amount
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "../../http.js";
import { useToast } from "vue-toastification";

const toast = useToast();
const loading = ref(false);
const fetchSaleReport = ref({
  total_sale: 0,
  total_saleQuantity: 0,
  total_saleAmount: "0.00",
  total_paidAmount: "0.00",
  total_dueAmount: "0.00",
  total_shippingCharge: "0.00",
  total_cancelSale: 0,
  total_cancelSaleAmount: "0.00",
});

const fetchData = async (url = "api/v1/report/sale") => {
  try {
    loading.value = true;
    const response = await axios.get(url);
    fetchSaleReport.value = response.data;
    console.log("sale-report", response);
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

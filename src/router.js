import { createWebHistory, createRouter } from "vue-router";
import Login from "./views/Auth/Login.vue";
import Dashboard from "./views/Dashboard.vue";
import BrandIndex from "./views/Brand/BrandIndex.vue";
import BrandCreate from "./views/Brand/BrandCreate.vue";
import BrandEdit from "./views/Brand/BrandEdit.vue";
import CategoryIndex from "./views/Category/CategoryIndex.vue";
import CustomerIndex from "./views/Customer/CustomerIndex.vue";
import CustomerCreate from "./views/Customer/CustomerCreate.vue";
import CustomerEdit from "./views/Customer/CustomerEdit.vue";
import OrderIndex from "./views/Order/OrderIndex.vue";
import ProductIndex from "./views/Product/ProductIndex.vue";
import ProductCreate from "./views/Product/ProductCreate.vue";
import ProductView from "./views/Product/ProductView.vue";
import Profile from "./views/Profile.vue";
import Pos from "./views/Order/Pos.vue";
import SalesReport from "./views/Report/SalesReport.vue";
import Setting from "./views/Setting.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Dashboard,
    meta: { requiresAuth: true }, // Example: Requires authentication
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { layout: null }, // No layout for the login page
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },

  // Brand
  {
    path: "/brands",
    name: "BrandIndex",
    component: BrandIndex,
    meta: { requiresAuth: true },
  },
  {
    path: "/brands/create",
    name: "BrandCreate",
    component: BrandCreate,
    meta: { requiresAuth: true },
  },
  {
    path: "/brands/:id/edit",
    name: "BrandEdit",
    component: BrandEdit,
    props: true,
    meta: { requiresAuth: true },
  },

  //Category
  {
    path: "/categories",
    name: "CategoryIndex",
    component: CategoryIndex,
    meta: { requiresAuth: true },
  },

  //Customer
  {
    path: "/customers",
    name: "CustomerIndex",
    component: CustomerIndex,
    meta: { requiresAuth: true },
  },
  {
    path: "/customer/create",
    name: "CustomerCreate",
    component: CustomerCreate,
    meta: { requiresAuth: true },
  },
  {
    path: "/customer/edit",
    name: "CustomerEdit",
    component: CustomerEdit,
    meta: { requiresAuth: true },
  },

  // Product
  {
    path: "/products",
    name: "ProductIndex",
    component: ProductIndex,
    meta: { requiresAuth: true },
  },
  {
    path: "/products/create",
    name: "ProductCreate",
    component: ProductCreate,
    meta: { requiresAuth: true },
  },
  {
    path: "/products/:id/view",
    name: "ProductView",
    component: ProductView,
    props: true,
    meta: { requiresAuth: true },
  },

  // Profile
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    props: true,
    meta: { requiresAuth: true },
  },

  // POS | Order
  {
    path: "/pos",
    name: "Pos",
    component: Pos,
    meta: { requiresAuth: true },
  },
  {
    path: "/orders",
    name: "OrderIndex",
    component: OrderIndex,
    meta: { requiresAuth: true },
  },

  // Report
  {
    path: "/sales-report",
    name: "SalesReport",
    component: SalesReport,
    meta: { requiresAuth: true },
  },

  // Setting
  {
    path: "/settings",
    name: "Setting",
    component: Setting,
    meta: { requiresAuth: true },
  },
];

const BASE_URL = import.meta.env.BASE_URL || "/";

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes,
});

// Global navigation guard to set default layout
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("authToken") !== null;

  // If the route requires authentication and user is not authenticated, redirect to login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "Login" });
  } else {
    // If the route does not have a meta layout defined, set it to 'DashboardLayout'
    if (to.meta.layout === undefined) {
      to.meta.layout = "DashboardLayout";
    }
    next();
  }
});

export default router;

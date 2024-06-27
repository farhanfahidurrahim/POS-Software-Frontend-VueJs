import { createWebHistory, createRouter } from "vue-router";
import BrandEdit from "./views/BrandEdit.vue";
import BrandCreate from "./views/BrandCreate.vue";

const routes = [
  {
    path: "/",
    component: () => import("./views/Dashboard.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("./views/Dashboard.vue"),
  },
  {
    path: "/users",
    component: () => import("./views/User.vue"),
  },
  {
    path: "/brands/create",
    name: "BrandCreate",
    component: BrandCreate,
  },
  {
    path: "/brands/list",
    name: "BrandList",
    component: () => import("./views/BrandList.vue"),
  },
  {
    path: "/brands/:id/edit",
    name: "BrandEdit",
    component: BrandEdit,
    props: true,
  },
];

const BASE_URL = import.meta.env.BASE_URL || "/";

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes,
});

// Global navigation guard to set default layout
router.beforeEach((to, from, next) => {
  if (!to.meta.layout) {
    to.meta.layout = "DashboardLayout";
  }
  next();
});

export default router;

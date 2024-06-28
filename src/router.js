import { createWebHistory, createRouter } from "vue-router";
import Login from "./views/Auth/Login.vue";
import Dashboard from "./views/Dashboard.vue";
import BrandIndex from "./views/Brand/BrandIndex.vue";
import BrandCreate from "./views/Brand/BrandCreate.vue";
import BrandEdit from "./views/Brand/BrandEdit.vue";
import CategoryIndex from "./views/Category/CategoryIndex.vue";
import ProductIndex from "./views/Product/ProductIndex.vue";
import ProductCreate from "./views/Product/ProductCreate.vue";
import ProductView from "./views/Product/ProductView.vue";

const routes = [{
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
];

const BASE_URL =
    import.meta.env.BASE_URL || "/";

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
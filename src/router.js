import { createWebHistory, createRouter } from 'vue-router';
// import Layout from './components/Layout.vue';
import DashboardLayout from './layouts/Dashboard.vue';
// import Dashboard from './views/Dashboard.vue';
// import User from './views/User.vue';

const routes = [{
        path: '/',
        meta: {
            layout: 'DashboardLayout'
        },
        component: () =>
            import ('./views/Dashboard.vue'),

    },
    {
        path: '/dashboard',
        meta: {
            layout: 'DashboardLayout'
        },
        component: () =>
            import ('./views/Dashboard.vue'),
    },
    {
        path: '/users',
        component: () =>
            import ('./views/User.vue'),
        meta: {
            layout: 'DashboardLayout'
        }
    }
]

const BASE_URL =
    import.meta.env.BASE_URL || '/';

const router = createRouter({
    history: createWebHistory(BASE_URL),
    routes,
});

export default router;
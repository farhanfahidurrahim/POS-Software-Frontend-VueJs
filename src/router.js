import { createMemoryHistory, createRouter } from 'vue-router'
import Layout from './components/Layout.vue';
import Brand from './views/Brand.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'Brand',
        component: Brand,
      },
      // Add more routes as needed
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

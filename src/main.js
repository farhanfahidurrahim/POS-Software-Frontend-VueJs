import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import NProgress from './nprogress';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const app = createApp(App);

// NProgress
router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
});
router.afterEach(() => {
    NProgress.done();
});

app.use(router);
app.use(Toast, {
    timeout: 2000,
});
app.mount('#app');
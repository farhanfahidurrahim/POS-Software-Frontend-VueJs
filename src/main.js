import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import NProgress from "./nprogress";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);
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
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");

import { createApp } from "vue";

import App from "./App.vue";
import "./style.css";
import store from "./store";
import router from "./router";

// createApp(App).mount("#app");
const app = createApp(App);
app.use(router).use(store);

router.isReady().then(() => app.mount("#app"));

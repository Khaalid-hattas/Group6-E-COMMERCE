
import "./assets/globalStyle.css";

import { createApp } from "vue";
import store from "./stores";

import App from "./App.vue";
import router from "./router";
import "./style.css";

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
import './style.css'


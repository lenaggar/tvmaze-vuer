import { createApp } from "vue";
import { createPinia } from "pinia";
import { RecycleScroller } from "vue-virtual-scroller";

import "./reset.css";
import "./style.css";

import App from "./App.vue";
import { router } from "./router";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.component("RecycleScroller", RecycleScroller);
app.mount("#root");

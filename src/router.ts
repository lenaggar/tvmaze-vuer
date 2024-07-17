import { createWebHistory, createRouter } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import GenrePage from "./pages/GenrePage.vue";
import DetailedViewPage from "./pages/DetailedViewPage.vue";
import NotFound from "./pages/NotFound.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/genres/:genreId", component: GenrePage },
  { path: "/shows/:showId", component: DetailedViewPage },
  { path: "/404", component: NotFound },
  { path: "/:pathMatch(.*)*", redirect: "/404" },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

import { createRouter, createWebHistory } from "vue-router";
import movieRoutes from "./movie";
import adminRoutes from "./admin"; // Import danh sách routes từ movie.js
const routes = [
  { path: "/", component: () => import("../pages/Home/Home.vue") },
  ...movieRoutes,
  ...adminRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

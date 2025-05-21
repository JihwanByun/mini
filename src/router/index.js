import { createRouter, createWebHistory } from "vue-router";
import Main from "../pages/Home.vue";
import Result from "../pages/Result.vue";

const routes = [
  { path: "/", name: "Main", component: Main },
  { path: "/result", name: "Result", component: Result },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

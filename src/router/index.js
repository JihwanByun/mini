import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Result from "../pages/Result.vue";
import Detail from "../pages/Detail.vue";

const routes = [
  { path: "/", name: "Main", component: Home },
  { path: "/result", name: "Result", component: Result },
  { path: "/detail", name: "Detail", component: Detail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

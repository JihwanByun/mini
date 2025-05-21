import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Result from "../pages/Result.vue";
import Detail from "../pages/Detail.vue";
import Recruit from "../pages/Recruit.vue";

const routes = [
  { path: "/", name: "Main", component: Home },
  { path: "/result", name: "Result", component: Result },
<<<<<<< HEAD
  { path: "/detail", name: "Detail", component: Detail },
  { path: '/jobs', name: 'Jobs', component: Recruit }]
  

=======
  { path: "/detail", name: "Detail", component: Detail, props: true },
>>>>>>> 0719182921a2daa0c09fea7ad0ed238cb61e4e71
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import Main from "../pages/Main.vue";
import Recruit from "../pages/Recruit.vue";
import { createRouter, createWebHistory } from 'vue-router'


// router/index.js
const routes = [
        { path: '/', name: 'Main', component: Main },
        { path: '/jobs', name: 'Jobs', component: Recruit }]
  

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
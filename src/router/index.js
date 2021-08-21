import { createRouter, createWebHistory } from "vue-router";
import About from "../views/About.vue";
import Test from "../views/Test.vue";

const routes = [
  {
    path: "/",
    name: "Test",
    component: Test,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

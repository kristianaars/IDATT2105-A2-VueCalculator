import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ContactView from "@/views/ContactView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactView
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

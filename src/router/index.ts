import {createRouter, createWebHistory} from "vue-router";
import AdminLayout from "../components/AdminLayout.vue";
const adminRoutes = [
  {
    path: "/admin",
    component: AdminLayout,
    children: [],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: adminRoutes,
});

export default router;

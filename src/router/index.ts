import {createRouter, createWebHistory} from "vue-router";
import AdminLayout from "../components/admin/AdminLayout.vue";
const adminRoutes = [
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "dashboard",
        component: () => import("../views/admin/Dashboard.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: adminRoutes,
});

export default router;

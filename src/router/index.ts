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
        meta: {
          title: "Dashboard",
          icon: "HomeFilled",
        },
      },
      {
        path: "articles",
        component: () => import("../views/admin/Articles.vue"),
        meta: {
          title: "Articles",
          icon: "Document",
        },
      },
      {
        path: "consultations",
        component: () => import("../views/admin/Consultations.vue"),
        meta: {
          title: "Consultations",
          icon: "ChatLineRound",
        },
      },
      {
        path: "emotions",
        component: () => import("../views/admin/Emotions.vue"),
        meta: {
          title: "Emotions",
          icon: "HotWater",
        },
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("@/components/admin/AuthLayout.vue"),
    children: [
      {
        path: "login",
        component: () => import("@/views/admin/Login.vue"),
        meta: {
          title: "Login",
          icon: "User",
        },
      },
      {
        path: "register",
        component: () => import("@/views/admin/Register.vue"),
        meta: {
          title: "Register",
          icon: "User",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: adminRoutes,
});

export default router;

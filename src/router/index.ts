import { createRouter, createWebHistory } from "vue-router";

import PortfolioLayout from "@/layouts/PortfolioLayout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: PortfolioLayout,
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/HomeView.vue"),
          meta: {
            starShape: "starfield",
            contentPosition: "left",
            contentSurface: "none",
          },
        },
        {
          path: "about",
          name: "about",
          component: () => import("@/views/AboutView.vue"),
          meta: {
            starShape: "head",
            contentPosition: "left",
            contentSurface: "glass",
          },
        },
        {
          path: "projects",
          name: "projects",
          component: () => import("@/views/ProjectsView.vue"),
          meta: {
            starShape: "cube",
            contentPosition: "right",
            contentSurface: "glass",
          },
        },
        {
          path: "projects/:slug",
          name: "project-detail",
          component: () => import("@/views/ProjectDetailView.vue"),
          props: true,
          meta: {
            starShape: "cube",
            contentPosition: "left",
            contentSurface: "glass",
          },
        },
        {
          path: "contact",
          name: "contact",
          component: () => import("@/views/ContactView.vue"),
          meta: {
            starShape: "satellite",
            contentPosition: "left",
            contentSurface: "glass",
          },
        },
      ],
    },
  ],
});

export default router;

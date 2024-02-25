import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "ListCountries",
    component: () => import("../views/ListCountries.vue"),
  },
  {
    path: "/:name",
    // beforeEnter(route) {
    //   return {
    //     path: route.path,
    //     params: {
    //       ...route.params,
    //       name: route.params.name || "defaultName",
    //     },
    //   };
    // },
    props: true,
    name: "CountryDetails",
    component: () => import("../views/CountryDetails.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "Error404",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;

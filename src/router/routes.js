const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/EventsList.vue") },
      { path: "events", component: () => import("src/pages/EventsList.vue") },
      { path: "event", component: () => import("src/pages/EventInfo.vue") },
      { path: "about", component: () => import("src/pages/About.vue") },
      { path: "profile", component: () => import('src/pages/MyProfile') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

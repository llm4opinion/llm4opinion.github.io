import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Project",
    component: () => import("../views/ProjectView.vue"),
  },
];

export default routes;

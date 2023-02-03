import { lazy } from "react";

const routes = [
  {
    path: "/index",
    component: lazy(() => import("@/pages/index")),
  },
];

export default routes;

import { lazy } from "react";

const routes = [
  {
    path: "/index",
    component: lazy(() => import("@/pages/index")),
  },
  {
    path: "/user/user-auth",
    component: lazy(() => import("@/pages/user/user-auth")),
  },
];

export default routes;

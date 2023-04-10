import { lazy } from "react";

const routes = [
  {
    path: "/index",
    component: lazy(() => import("@/pages/index")),
  },
  {
    path: "/permis/menu",
    component: lazy(() => import("@/pages/permis/menu")),
  },
  {
    path: "/permis/role",
    component: lazy(() => import("@/pages/permis/role")),
  },
  {
    path: "/permis/account",
    component: lazy(() => import("@/pages/permis/account")),
  },
  {
    path: "/error/401",
    component: lazy(() => import("@/pages/401")),
  },
  {
    path: "/error/404",
    component: lazy(() => import("@/pages/404")),
  },
  {
    path: "/user/user-auth",
    component: lazy(() => import("@/pages/user/user-auth")),
  },
];

export default routes;

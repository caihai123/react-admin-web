import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layout";
import Login from "@/pages/login";

export const appRouter = createBrowserRouter(
  [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/*",
      element: <Layout />,
    },
  ],
  {
    basename: process.env.PUBLIC_PATH.slice(0, -1),
  }
);

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
    path: "/pro-table",
    component: lazy(() => import("@/pages/pro-table")),
  },
  {
    path: "/error/401",
    component: lazy(() => import("@/pages/401")),
  },
  {
    path: "/error/404",
    component: lazy(() => import("@/pages/404")),
  },
];

export default routes;

import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// 在此定义的一个重要原因是在axios中我需要此对象来跳转
const rootRouter = createBrowserRouter(
  [
    {
      path: "/login",
      Component: lazy(() => import("@/pages/login")),
    },
    {
      path: "/*",
      Component: lazy(() => import("@/layout")),
    },
  ],
  {
    basename: process.env.PUBLIC_PATH.slice(0, -1),
  }
);

// 需要动态判断权限的路由，由后端提供title
export const asyncRoutes = [
  {
    path: "/index",
    Component: lazy(() => import("@/pages/index")),
  },
  {
    path: "/permis/menu",
    Component: lazy(() => import("@/pages/permis/menu")),
  },
  {
    path: "/permis/role",
    Component: lazy(() => import("@/pages/permis/role")),
  },
  {
    path: "/permis/account",
    Component: lazy(() => import("@/pages/permis/account")),
  },
  {
    path: "/permis/dept",
    Component: lazy(() => import("@/pages/permis/dept")),
  },
  {
    path: "/pro-table",
    Component: lazy(() => import("@/pages/pro-table")),
  },
  {
    path: "/error/404",
    Component: lazy(() => import("@/pages/404")),
  },
  {
    path: "/error/401",
    Component: lazy(() => import("@/pages/401")),
  },
];

export default rootRouter;

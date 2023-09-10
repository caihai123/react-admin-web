import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Auth from "./RouteAuth";
import Err404 from "@/pages/404";

const router = createBrowserRouter(
  [
    {
      path: "/login",
      Component: lazy(() => import("@/pages/login")),
    },
    {
      path: "/",
      Component: lazy(() => import("@/layout")),
      children: [
        { path: "", element: <Navigate to="/index" replace /> },
        {
          path: "/index",
          element: <Auth Component={lazy(() => import("@/pages/index"))} />,
        },
        {
          path: "/permis/menu",
          element: (
            <Auth Component={lazy(() => import("@/pages/permis/menu"))} />
          ),
        },
        {
          path: "/permis/role",
          element: (
            <Auth Component={lazy(() => import("@/pages/permis/role"))} />
          ),
        },
        {
          path: "/permis/account",
          element: (
            <Auth Component={lazy(() => import("@/pages/permis/account"))} />
          ),
        },
        {
          path: "/permis/dept",
          element: (
            <Auth Component={lazy(() => import("@/pages/permis/dept"))} />
          ),
        },
        {
          path: "/pro-table",
          element: <Auth Component={lazy(() => import("@/pages/pro-table"))} />,
        },
        {
          path: "/error/404",
          element: <Auth Component={lazy(() => import("@/pages/404"))} />,
        },
        {
          path: "/error/401",
          element: <Auth Component={lazy(() => import("@/pages/401"))} />,
        },
        {
          path: "/issues",
          children: [
            {
              path: "",
              Component: lazy(() => import("@/pages/issues/index")),
            },
            {
              path: "add",
              Component: lazy(() => import("@/pages/issues/add")),
            },
          ],
        },
        {
          path: "/*",
          element: <Err404 />,
        },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_PATH.slice(0, -1),
  }
);

export default router;

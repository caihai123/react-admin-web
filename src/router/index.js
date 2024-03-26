import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Auth from "./RouteAuth";
import Err404 from "@/pages/404";
import markdownPage from "@/pages/components/mackdown.md";

// markdown 显示组件
const Markdown = lazy(() => import("@/components/Markdown"));

const router = createBrowserRouter(
  [
    {
      path: "/login",
      Component: lazy(() => import("@/pages/login")),
    },
    {
      path: "/",
      handle: { title: "首页" },
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
          children: [
            {
              path: "",
              element: (
                <Auth
                  Component={lazy(() => import("@/pages/permis/account"))}
                />
              ),
            },
            {
              path: "detail",
              element: (
                <Auth
                  Component={lazy(() =>
                    import("@/pages/permis/account/detail")
                  )}
                />
              ),
            },
          ],
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
          path: "/use-loading-delay-and-keep",
          element: (
            <Auth
              Component={lazy(() =>
                import("@/pages/hooks/use-loading-delay-and-keep")
              )}
            />
          ),
        },
        {
          path: "mackdown",
          element: (
            <Auth Component={() => <Markdown markdown={markdownPage} />} />
          ),
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
          handle: { title: "意见反馈" },
          children: [
            {
              path: "",
              Component: lazy(() => import("@/pages/issues/index")),
            },
            {
              path: "add",
              Component: lazy(() => import("@/pages/issues/add")),
              handle: { title: "新增Issues" },
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

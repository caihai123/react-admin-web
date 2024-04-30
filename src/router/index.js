import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Auth from "./RouteAuth";
import Err404 from "@/pages/404";
import lazyMarkdown from "@/components/Markdown/lazyMarkdown";

/**
 * 一级路由数量有限，建议就别做懒加载了。
 * 具体原因就是我在index.html中添加了系统级的loading，如果是懒加载的话在loading过后还是可能出现一段时间白屏。显得这个loading没有意义。
 */
import Layout from "@/layout";
import Login from "@/pages/login";

const router = createBrowserRouter(
  [
    {
      path: "/login",
      Component: Login,
    },
    {
      path: "/",
      handle: { title: "首页" },
      Component: Layout,
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
          path: "/dict",
          element: (
            <Auth Component={lazyMarkdown(() => import("@/pages/dict.md"))} />
          ),
        },
        {
          path: "mackdown",
          element: (
            <Auth
              Component={lazyMarkdown(() =>
                import("@/pages/components/markdown.md")
              )}
            />
          ),
        },
        {
          path: "permission-control",
          element: (
            <Auth
              Component={lazyMarkdown(() =>
                import("@/pages/components/permission-control.md")
              )}
            />
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

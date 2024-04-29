import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  HomeFilled,
  SettingFilled,
  DatabaseFilled,
  ProductFilled,
  GoldFilled,
  CloseCircleFilled,
  SignatureFilled,
} from "@ant-design/icons";
import Auth from "./RouteAuth";
import Err404 from "@/pages/404";
import lazyMarkdown from "@/components/Markdown/lazyMarkdown";

/* 一级路由数量有限，建议就别做懒加载了。
 * 具体原因就是我在index.html中添加了系统级的loading，如果是懒加载的话在loading过后还是可能出现一段时间白屏。显得这个loading没有意义。
 */
import Layout from "@/layout";
import Login from "@/pages/login";

/**
 * 权限路由表
 * role: 允许访问的角色列表，默认继承上级
 */
export const authRouterMap = [
  {
    path: "/index",
    Component: lazy(() => import("@/pages/index")),
    handle: { title: "Dashboard", icon: <HomeFilled /> },
  },
  {
    id: "permis",
    handle: { title: "权限管理", icon: <SettingFilled /> },
    role: ["admin"],
    children: [
      {
        path: "/permis/menu",
        Component: lazy(() => import("@/pages/permis/menu")),
        handle: { title: "菜单管理" },
      },
      {
        path: "/permis/role",
        Component: lazy(() => import("@/pages/permis/role")),
        handle: { title: "角色管理" },
      },
      {
        path: "/permis/account",
        handle: { title: "用户管理" },
        children: [
          {
            path: "",
            Component: lazy(() => import("@/pages/permis/account")),
          },
          {
            path: "detail",
            Component: lazy(() => import("@/pages/permis/account/detail")),
            handle: { title: "用户详情" },
          },
        ],
      },
      {
        path: "/permis/dept",
        Component: lazy(() => import("@/pages/permis/dept")),
        handle: { title: "部门管理" },
      },
    ],
  },
  {
    path: "/pro-table",
    Component: lazy(() => import("@/pages/pro-table")),
    handle: { title: "Pro Table", icon: <DatabaseFilled /> },
  },
  {
    id: "Components",
    handle: { title: "Components", icon: <ProductFilled /> },
    children: [
      {
        path: "mackdown",
        Component: lazyMarkdown(() => import("@/pages/components/markdown.md")),
        handle: { title: "mackdown" },
      },
    ],
  },
  {
    id: "hooks",
    handle: { title: "hooks", icon: <GoldFilled /> },
    children: [
      {
        path: "/use-loading-delay-and-keep",
        Component: lazy(() =>
          import("@/pages/hooks/use-loading-delay-and-keep")
        ),
        handle: { title: "useLoadingDelayAndKeep" },
      },
    ],
  },
  {
    id: "error",
    handle: { title: "错误页面", icon: <CloseCircleFilled /> },
    children: [
      {
        path: "/error/404",
        Component: lazy(() => import("@/pages/404")),
        handle: { title: "404" },
      },
      {
        path: "/error/401",
        Component: lazy(() => import("@/pages/401")),
        handle: { title: "401" },
      },
    ],
  },
  {
    path: "/issues",
    handle: { title: "意见反馈", icon: <SignatureFilled /> },
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
];

// 处理路由表
const handleAuthRouterMap = function (authRouterMap, parent) {
  return authRouterMap.map((item) => {
    if (!item.role && parent) {
      // 让子节点继承上级的权限
      item.role = parent.role;
    }
    const { path, children, role, Component, handle } = item;
    const route = {
      path,
      children: children
        ? handleAuthRouterMap(children || [], item)
        : undefined,
      handle,
    };
    if (Component) {
      route.element =
        role && role.length ? (
          <Auth Component={Component} role={role} />
        ) : (
          <Component />
        );
    }
    return route;
  });
};

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
        ...handleAuthRouterMap(authRouterMap),
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

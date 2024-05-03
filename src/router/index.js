import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  HomeFilled,
  SettingFilled,
  DatabaseFilled,
  ProductFilled,
  GoldFilled,
  CloseCircleFilled,
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
    children: [
      {
        path: "/permis/menu",
        handle: { title: "菜单管理" },
        children: [
          {
            path: "",
            Component: lazy(() => import("@/pages/permis/menu")),
          },
          {
            path: "add",
            handle: { title: "新增" },
            Component: lazy(() => import("@/pages/permis/menu/add")),
          },
        ],
      },
      {
        path: "/permis/role",
        handle: { title: "角色管理" },
        Component: lazy(() => import("@/pages/permis/role")),
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
        handle: { title: "部门管理" },
        Component: lazy(() => import("@/pages/permis/dept")),
      },
    ],
  },
  {
    id: "pro-table",
    path: "/pro-table",
    handle: { title: "Pro Table", icon: <DatabaseFilled /> },
    Component: lazy(() => import("@/pages/pro-table")),
  },
  {
    id: "components",
    handle: { title: "公共组件", icon: <ProductFilled /> },
    children: [
      {
        path: "mackdown",
        Component: lazyMarkdown(() => import("@/pages/components/markdown.md")),
        handle: { title: "mackdown" },
      },
      {
        path: "permission-control",
        handle: { title: "按钮权限" },
        Component: lazyMarkdown(() =>
          import("@/pages/components/permission-control.md")
        ),
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
    id: "dict",
    path: "/dict",
    handle: { title: "字典管理", icon: <CloseCircleFilled /> },
    Component: lazyMarkdown(() => import("@/pages/dict.md")),
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
          path: "/account",
          handle: { title: "个人中心" },
          Component: lazy(() => import("@/pages/account/layout")),
          children: [
            { path: "", element: <Navigate to="/account/center" replace /> },
            {
              path: "center",
              Component: lazy(() => import("@/pages/account/index")),
            },
            {
              path: "settings",
              handle: { title: "个人设置" },
              Component: lazy(() => import("@/pages/account/settings")),
            },
            {
              path: "update-password",
              handle: { title: "修改密码" },
              Component: lazy(() => import("@/pages/account/update-password")),
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

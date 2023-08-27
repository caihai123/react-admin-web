import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import axios from "@/utils/axios";
import Redirect from "@/layout/redirect";

const Login = lazy(() => import("@/pages/login"));
const Layout = lazy(() => import("@/Layout"));
const Issues = lazy(() => import("@/pages/issues"));
const IssuesAdd = lazy(() => import("@/pages/issues/add"));
const Err401 = lazy(() => import("@/pages/401"));
const Err404 = lazy(() => import("@/pages/404"));
const Index = lazy(() => import("@/pages/index"));
const Menu = lazy(() => import("@/pages/permis/menu"));
const Role = lazy(() => import("@/pages/permis/role"));
const Account = lazy(() => import("@/pages/permis/account"));
const Dept = lazy(() => import("@/pages/permis/dept"));
const ProTable = lazy(() => import("@/pages/pro-table"));

const authLoader = function () {
  return null;
};

export const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <Login />,
      meta: { title: "登录页" },
    },
    {
      path: "/",
      element: <Layout />,
      loader: async () => {
        try {
          const { result } = await axios.get("/api/get-menu-all");
          return result;
        } catch (error) {
          return [];
        }
      },
      children: [
        { path: "/", element: <Redirect to="/index" /> },
        {
          path: "/index",
          element: <Index />,
        },
        {
          path: "/permis/menu",
          element: <Menu />,
          loader: authLoader,
        },
        {
          path: "/permis/role",
          element: <Role />,
          loader: authLoader,
        },
        {
          path: "/permis/account",
          element: <Account />,
          loader: authLoader,
        },
        {
          path: "/permis/dept",
          element: <Dept />,
          loader: authLoader,
        },
        {
          path: "/pro-table",
          element: <ProTable />,
          loader: authLoader,
        },
        {
          path: "/error/401",
          element: <Err401 />,
          loader: authLoader,
        },
        {
          path: "/error/404",
          element: <Err404 />,
          loader: authLoader,
        },
        {
          path: "/issues",
          children: [
            {
              path: "",
              element: <Issues />,
              meta: { title: "用户反馈" },
            },
            {
              path: "/issues/add",
              element: <IssuesAdd />,
              meta: { title: "新增Issues" },
            },
          ],
        },
        {
          path: "/401",
          element: <Err401 />,
          meta: { title: "401" },
        },
        {
          path: "/*",
          element: <Err404 />,
          meta: { title: "404" },
        },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_PATH.slice(0, -1),
  }
);

export default router;

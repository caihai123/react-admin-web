import { createBrowserRouter } from "react-router-dom";
import axios from "@/utils/axios";
import Layout from "@/layout";
import Redirect from "@/layout/redirect";

import Login from "@/pages/login";
import Issues from "@/pages/issues";
import IssuesAdd from "@/pages/issues/add";
import Err401 from "@/pages/401";
import Err404 from "@/pages/404";

import Index from "@/pages/index";
import Menu from "@/pages/permis/menu";
import Role from "@/pages/permis/role";
import Account from "@/pages/permis/account";
import Dept from "@/pages/permis/dept";
import ProTable from "@/pages/pro-table";

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
              loader: authLoader,
            },
            {
              path: "/issues/add",
              element: <IssuesAdd />,
              meta: { title: "新增Issues" },
              loader: authLoader,
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

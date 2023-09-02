import { Suspense, lazy } from "react";
import { Layout, FloatButton, Spin } from "antd";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMenu, selectMenuFlatten } from "@/store/menu";
import { asyncRoutes } from "@/router/index";

const Issues = lazy(() => import("@/pages/issues"));
const IssuesAdd = lazy(() => import("@/pages/issues/add"));
const Err404 = lazy(() => import("@/pages/404"));
const Err401 = lazy(() => import("@/pages/401"));

const { Content } = Layout;

const PageLoading = function () {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin />
    </div>
  );
};

export default function LayContent() {
  const { status } = useSelector(selectMenu);

  const menuFlatten = useSelector(selectMenuFlatten);

  const hasMenuPermission = function (path) {
    return menuFlatten.some((item) => item.path === path);
  };

  return (
    <Content style={{ margin: 20 }}>
      {status !== "loading" ? (
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<Navigate to="/index" replace />} />

            {asyncRoutes.map((item) => (
              <Route
                path={item.path}
                key={item.path}
                element={
                  hasMenuPermission(item.path) ? <item.Component /> : <Err401 />
                }
              />
            ))}

            <Route path="/issues">
              <Route path="" element={<Issues />} />
              <Route path="add" element={<IssuesAdd />} />
            </Route>

            <Route path="*" element={<Err404 />} />
          </Routes>
        </Suspense>
      ) : (
        <PageLoading />
      )}

      <FloatButton.BackTop />
    </Content>
  );
}

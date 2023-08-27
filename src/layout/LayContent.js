import { Suspense } from "react";
import { Layout, FloatButton, Spin } from "antd";
import { Outlet } from "react-router-dom";

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
  return (
    <Content style={{ margin: 20 }}>
      <Suspense fallback={<PageLoading />}>
        <Outlet />
      </Suspense>
      <FloatButton.BackTop />
    </Content>
  );
}

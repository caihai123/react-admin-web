import { Suspense } from "react";
import { Layout, FloatButton } from "antd";
import { Outlet } from "react-router-dom";
import PageLoading from "@/router/PageLoading";

const { Content } = Layout;

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

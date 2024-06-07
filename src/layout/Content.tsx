import { Suspense } from "react";
import { Layout, FloatButton } from "antd";
import { Outlet } from "react-router-dom";
import PageLoading from "@/router/PageLoading";
import Breadcrumb from "./Breadcrumb";

const { Content } = Layout;

export default function LayContent(props: {
  layout: "side" | "mix" | "top";
  showBreadcrumb: boolean;
}) {
  return (
    <Content style={{ margin: 20 }}>
      {props.layout !== "side" && props.showBreadcrumb ? (
        <div style={{ marginBottom: 12 }}>
          <Breadcrumb />
        </div>
      ) : null}
      <Suspense fallback={<PageLoading />}>
        <Outlet />
      </Suspense>
      <FloatButton.BackTop />
    </Content>
  );
}

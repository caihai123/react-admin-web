import { Layout, FloatButton } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

export default function LayContent() {
  return (
    <Content style={{ margin: 20 }}>
      <Outlet />
      <FloatButton.BackTop />
    </Content>
  );
}

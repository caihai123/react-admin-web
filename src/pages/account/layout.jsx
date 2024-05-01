import { Suspense } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Card, Menu, Divider } from "antd";

export default function Account() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Card style={{ minHeight: "100%" }}>
      <h1>个人中心 ✨</h1>
      <Divider />
      <div style={{ display: "flex" }}>
        <div style={{ flex: "0 0 210px" }}>
          <Menu
            items={[
              { key: "/account/center", label: "个人信息" },
              { key: "/account/settings", label: "个人设置" },
              { key: "/account/update-password", label: "修改密码" },
            ]}
            selectedKeys={[location.pathname]}
            onClick={({ key }) => navigate(key)}
          ></Menu>
        </div>
        <div style={{ flex: "auto", padding: "8px 20px" }}>
          <Suspense>
            <Outlet></Outlet>
          </Suspense>
        </div>
      </div>
    </Card>
  );
}

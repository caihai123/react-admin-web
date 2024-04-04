import React, { useState } from "react";
import { Layout } from "antd";
import { useMount } from "ahooks";
import { useDispatch } from "react-redux";
import { init } from "@/store/userinfo";
import LayContent from "./Content";
import Header from "./Header";
import Sider from "./Sider";

export default function LayoutViwe() {
  const [collapsed, setCollapsed] = useState(false); // 控制侧边栏展开收起

  // 初始化菜单列表
  const dispatch = useDispatch();
  useMount(() => dispatch(init()));

  return (
    <Layout style={{ minHeight: "100vh", flexDirection: "row" }}>
      <Sider collapsed={collapsed} />
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <LayContent />
      </Layout>
    </Layout>
  );
}

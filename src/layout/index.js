import React, { useState, useEffect } from "react";
import { Layout, theme } from "antd";
import { Link } from "react-router-dom";
import LayMenu from "./LayMenu";
import axios from "@/utils/axios";
import LayContent from "./LayContent";
import Breadcrumb from "./Breadcrumb";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import style from "./style.module.css";
import Logo from "@/assets/logo.svg";

const { Header, Sider } = Layout;

export default function LayoutViwe() {
  const [collapsed, setCollapsed] = useState(false); // 控制侧边栏展开收起

  const [initialMenuList, setInitialMenuList] = useState([]); // 后端返回的路由表
  const [menuLoading, setMenuLoading] = useState(false);
  useEffect(() => {
    // 获取权限路由列表
    setMenuLoading(true);
    axios
      .get("/mock-api/react-antd-admin/get-menu-list.json")
      .then((response) => {
        const { data } = response.data;
        setInitialMenuList(data || []);
      })
      .finally(() => {
        setMenuLoading(false);
      });
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width="210px"
        collapsedWidth={64}
        theme="light"
        collapsed={collapsed}
      ></Sider>
      <Sider
        width="210px"
        collapsedWidth={64}
        theme="light"
        className={style.sider}
        collapsed={collapsed}
        style={{ position: "fixed" }}
      >
        <div className={style.logo}>
          <Link to="/">
            <img src={Logo} alt="logo" />
            <h1 style={{ display: collapsed ? "none" : "block" }}>
              Ant Design Pro
            </h1>
          </Link>
        </div>
        <LayMenu initialMenuList={initialMenuList} loading={menuLoading} />
      </Sider>
      
      <Layout>
        <Header
          theme="light"
          style={{
            padding: 0,
            height: 48,
            lineHeight: 1,
            background: colorBgContainer,
          }}
          className={style.header}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: style.trigger,
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div style={{ height: 36, display: "flex", alignItems: "center" }}>
            <Breadcrumb menuList={initialMenuList} />
          </div>
        </Header>

        <LayContent initialMenuList={initialMenuList} loading={menuLoading} />
      </Layout>
    </Layout>
  );
}

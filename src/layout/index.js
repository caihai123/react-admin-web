import React, { useState, useEffect } from "react";
import { Layout, theme, Avatar } from "antd";
import { Link } from "react-router-dom";
import LayMenu from "./LayMenu";
import axios from "@/utils/axios";
import LayContent from "./LayContent";
import Breadcrumb from "./Breadcrumb";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LockOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";
import style from "./style.module.css";
import Logo from "@/assets/logo.svg";

const { Header, Sider } = Layout;

/**
 * 将后端菜单处理成此框架支持的格式
 * @param {array} menuList 后端返回的路由表
 * @returns 格式化后的路由表
 */
function parseRoutersDeep(menuList) {
  return menuList.map((item) => ({
    id: item.menuId,
    title: item.menuTitle,
    icon: item.menuIcon,
    path: item.routePath === "/" ? "" : item.routePath,
    type: item.routePath === "/" ? "2" : "1", // 1:菜单 2:目录
    children: parseRoutersDeep(item.listMenus || []),
  }));
}

export default function LayoutViwe() {
  const [collapsed, setCollapsed] = useState(false); // 控制侧边栏展开收起

  const [initialMenuList, setInitialMenuList] = useState([]); // 后端返回的路由表
  const [menuLoading, setMenuLoading] = useState(false);
  useEffect(() => {
    // 获取权限路由列表
    setMenuLoading(true);
    axios
      .post("/api/core/sys/user/auth/perm/list")
      .then((response) => {
        const { userMenus } = response.data;
        setInitialMenuList(parseRoutersDeep(userMenus || []));
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
              安心干管理后台
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
          <div style={{ display: "flex", alignItems: "center" }}>
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
          </div>

          <div style={{ display: "flex", paddingRight: 16 }}>
            <div className={style["header-actions-item"]}>
              <LockOutlined />
            </div>
            <div className={style["header-actions-item"]}>
              <FullscreenOutlined />
            </div>

            <div className={style["header-actions-item"]}>
              <Avatar
                src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                size="small"
                style={{ marginRight: 8 }}
              />
              <span style={{ fontSize: 14 }}>Cai Hai</span>
            </div>
          </div>
        </Header>

        <LayContent initialMenuList={initialMenuList} loading={menuLoading} />
      </Layout>
    </Layout>
  );
}

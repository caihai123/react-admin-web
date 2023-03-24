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
import LogoSvg from "@/assets/logo.svg";
import styled, { keyframes } from "styled-components";

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

const Sider = styled(Layout.Sider)`
  position: fixed !important ;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
`;

const titleHide = keyframes`
    0% {
      display: none;
      opacity: 0;
    }

    80% {
      display: none;
      opacity: 0;
    }

    to {
      display: unset;
      opacity: 1;
    }
  `;

const Logo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  & > a {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 32px;
  }
  & img {
    display: inline-block;
    height: 32px;
    vertical-align: middle;
  }
  & h1 {
    display: ${(props) => (props.collapsed ? "none" : "block")};
    height: 32px;
    margin: 0 0 0 12px;
    font-weight: 600;
    font-size: 18px;
    line-height: 32px;
    vertical-align: middle;
    animation: ${titleHide} 0.3s;
  }
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  z-index: 99;
  padding: 0;
  height: 48;
  lineheight: 1;
  background: ${(props) => props.backgroundColor};
  & .header-actions-item {
    display: flex;
    align-items: center;
    height: 48px;
    font-size: 18px;
    padding: 0 12px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
    }
  }
`;

const Trigger = styled.div`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  font-size: 18px;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`;

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

  const siderConfig = {
    width: 210,
    collapsedWidth: 64,
    collapsed,
    theme: "light",
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider {...siderConfig}></Layout.Sider>
      <Sider {...siderConfig}>
        <Logo collapsed={collapsed}>
          <Link to="/">
            <img src={LogoSvg} alt="logo" />
            <h1>安心干管理后台</h1>
          </Link>
        </Logo>
        <LayMenu initialMenuList={initialMenuList} loading={menuLoading} />
      </Sider>

      <Layout>
        <Header backgroundColor={colorBgContainer}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Trigger
              as={collapsed ? MenuUnfoldOutlined : MenuFoldOutlined}
              onClick={() => setCollapsed(!collapsed)}
            />
            <div style={{ height: 36, display: "flex", alignItems: "center" }}>
              <Breadcrumb menuList={initialMenuList} />
            </div>
          </div>

          <div style={{ display: "flex", paddingRight: 16 }}>
            <div className="header-actions-item">
              <LockOutlined />
            </div>
            <div className="header-actions-item">
              <FullscreenOutlined />
            </div>
            <div className="header-actions-item">
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

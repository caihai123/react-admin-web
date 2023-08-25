import React, { useState } from "react";
import { Layout } from "antd";
import { Link, useLoaderData } from "react-router-dom";
import LayMenu from "./LayMenu";
import LayContent from "./LayContent";
import LayHeader from "./LayHeader";
import LogoSvg from "@/assets/logo.svg";
import styled, { keyframes } from "styled-components";

const Sider = styled(Layout.Sider)`
  position: fixed !important ;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
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

export default function LayoutViwe() {
  const menu = useLoaderData();

  const [collapsed, setCollapsed] = useState(false); // 控制侧边栏展开收起

  const siderConfig = {
    width: 210,
    collapsedWidth: 64,
    collapsed,
    theme: "light",
  };

  return (
    <Layout style={{ minHeight: "100vh", flexDirection: "row" }}>
      <Layout.Sider {...siderConfig}></Layout.Sider>
      <Sider {...siderConfig}>
        <Logo collapsed={collapsed}>
          <Link to="/">
            <img src={LogoSvg} alt="logo" />
            <h1>{process.env.REACT_APP_WEBSITE_NAME}</h1>
          </Link>
        </Logo>
        <LayMenu menu={menu} />
      </Sider>

      <Layout>
        <LayHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <LayContent />
      </Layout>
    </Layout>
  );
}

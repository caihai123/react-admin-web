import React from "react";
import { Layout, theme, Dropdown, Avatar } from "antd";
import { useMount, useBoolean, useUnmount } from "ahooks";
import screenfull from "screenfull";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FullscreenOutlined,
  UserOutlined,
  SettingOutlined,
  LoginOutlined,
  FullscreenExitOutlined,
  IssuesCloseOutlined,
  BellOutlined,
} from "@ant-design/icons";
import ThremSwitch from "./ThremSwitch";
import Breadcrumb from "./Breadcrumb";
import Menu from "./Menu";

import type { Menu as MenuType } from "@/api/system/menu";

const { Header } = Layout;

const ActionItem = styled.div`
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
`;

type Props = {
  layout: "side" | "mix" | "top";
  fixed: boolean;
  height: number;
  logo?: React.ReactNode;
  trigger?: React.ReactNode;
  siderWidth: number;
  collapsedWidth: number;
  collapsed: boolean;
  menuItems: MenuType[];
  showBreadcrumb: boolean;
};

export default function MyHeader(props: Props) {
  const {
    token: { colorBgContainer, colorBorder },
  } = theme.useToken();

  const navigate = useNavigate();

  // 全屏相关 start
  const [isFullscreen, { set: setIsFullscreen }] = useBoolean(false);
  const fullscreenChange = () => setIsFullscreen(screenfull.isFullscreen);
  const fullscreenToggle = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    } else {
      // message.warning("您的浏览器不支持全屏！");
    }
  };
  useMount(() => {
    if (screenfull.isEnabled) {
      screenfull.on("change", fullscreenChange);
    }
  });
  useUnmount(() => {
    screenfull.off("change", fullscreenChange);
  });
  // 全屏相关 end

  return (
    <>
      <Header
        style={{
          position: props.fixed ? "fixed" : "static",
          top: 0,
          left: 0,
          width: "100%",
          height: props.height,
          paddingRight: 12,
          paddingLeft:
            // eslint-disable-next-line no-nested-ternary
            props.layout === "side" && props.fixed
              ? props.collapsed
                ? props.collapsedWidth
                : props.siderWidth
              : 0,
          background: colorBgContainer,
          boxShadow: props.fixed ? "rgba(0, 0, 0, 0.15) 0px 0px 4px 0" : "none",
          borderBottom: `1px solid ${colorBorder}`,
          zIndex: props.layout === "side" ? 100 : 101,
          transition: "all 0.2s",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", flex: "auto" }}>
            {props.layout === "side" ? props.trigger : props.logo}
            {props.layout === "side" && props.showBreadcrumb ? (
              <Breadcrumb />
            ) : null}
            {props.layout === "top" ? (
              <Menu
                mode="horizontal"
                menu={props.menuItems}
                style={{
                  flex: "auto",
                  marginLeft: 16,
                  lineHeight: `${props.height - 1}px`,
                }}
              />
            ) : null}
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <ActionItem onClick={fullscreenToggle}>
              {isFullscreen ? (
                <FullscreenExitOutlined />
              ) : (
                <FullscreenOutlined />
              )}
            </ActionItem>

            <ActionItem>
              <BellOutlined />
            </ActionItem>

            <ActionItem>
              <ThremSwitch />
            </ActionItem>

            <Dropdown
              menu={{
                items: [
                  {
                    key: 1,
                    label: "个人中心",
                    icon: <UserOutlined />,
                    onClick: () => navigate("/account/center"),
                  },
                  {
                    key: 2,
                    label: "个人设置",
                    icon: <SettingOutlined />,
                    onClick: () => navigate("/account/settings"),
                  },
                  {
                    key: 4,
                    label: "意见反馈",
                    icon: <IssuesCloseOutlined />,
                    onClick: () => navigate("/issues"),
                  },
                  {
                    type: "divider",
                  },
                  {
                    key: 3,
                    label: "退出登录",
                    icon: <LoginOutlined />,
                    onClick: () => {
                      localStorage.removeItem("token");
                      navigate("/login");
                    },
                  },
                ],
              }}
            >
              <ActionItem>
                <Avatar
                  src="https://avatars.githubusercontent.com/u/47770861?v=4"
                  size="small"
                  style={{ marginRight: 8 }}
                />
                <span style={{ fontSize: 14 }}>Cai Hai</span>
              </ActionItem>
            </Dropdown>
          </div>
        </div>
      </Header>

      {props.fixed ? (
        <Header
          style={{ height: props.height, background: colorBgContainer }}
        ></Header>
      ) : null}
    </>
  );
}

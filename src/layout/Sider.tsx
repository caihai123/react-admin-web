import React from "react";
import { Layout, theme, Skeleton } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
import Menu from "./Menu";

import type { Menu as MenuType } from "@/api/system/menu";

const { Sider } = Layout;

type Props = {
  layout: "side" | "mix" | "top";
  collapsed: boolean;
  logo?: React.ReactNode;
  trigger?: React.ReactNode;
  width: number;
  collapsedWidth: number;
  headerHeight: number;
  menuItems: MenuType[];
  menuLoading: boolean;
};

export default function MySider(props: Props) {
  const {
    token: { colorBorder },
  } = theme.useToken();

  return (
    <>
      <Sider
        collapsed={props.collapsed}
        width={props.width}
        collapsedWidth={props.collapsedWidth}
        theme="light"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          paddingTop: props.layout === "mix" ? props.headerHeight : 0,
          height: "100%",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          zIndex: props.layout === "mix" ? 100 : 101,
        }}
      >
        {props.layout === "side" ? (
          <div
            style={{
              height: props.headerHeight + 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            {props.logo}
          </div>
        ) : null}

        <Scrollbars
          style={{
            height: `calc(100% - ${props.headerHeight + 1}px)`,
          }}
          autoHide
        >
          <Skeleton
            active
            loading={props.menuLoading}
            paragraph={{ rows: 6 }}
            title={false}
            style={{ padding: 20 }}
          >
            <Menu menu={props.menuItems} mode="inline" />
          </Skeleton>
        </Scrollbars>

        {props.layout === "mix" ? (
          <div
            style={{
              width: "100%",
              position: "absolute",
              bottom: 0,
              display: "flex",
              justifyContent: "end",
              borderTop: `1px solid ${colorBorder}`,
            }}
          >
            {props.trigger}
          </div>
        ) : null}
      </Sider>

      <Sider
        collapsed={props.collapsed}
        width={props.width}
        collapsedWidth={props.collapsedWidth}
        theme="light"
      ></Sider>
    </>
  );
}

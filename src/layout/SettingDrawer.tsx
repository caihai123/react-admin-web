import React from "react";
import { Drawer, Button, Divider, Badge, theme, Switch, Alert } from "antd";
import { SettingOutlined, CheckCircleFilled } from "@ant-design/icons";

import styled from "styled-components";

const SideDiv = styled.div`
  width: 60px;
  height: 50px;
  background-color: rgb(229, 230, 235);
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  &:before {
    dispaly: block;
    content: "";
    width: 12px;
    height: 100%;
    background-color: rgba(0, 0, 0);
    position: absolute;
    top: 0;
    left: 0;
  }
  &:after {
    dispaly: block;
    content: "";
    width: 100%;
    height: 12px;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const TopDiv = styled.div`
  width: 60px;
  height: 50px;
  background-color: rgb(229, 230, 235);
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  &:before {
    dispaly: block;
    content: "";
    width: 100%;
    height: 12px;
    background-color: rgba(0, 0, 0);
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const MixDiv = styled.div`
  width: 60px;
  height: 50px;
  background-color: rgb(229, 230, 235);
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  &:after {
    dispaly: block;
    content: "";
    width: 12px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
  }
  &:before {
    dispaly: block;
    content: "";
    width: 100%;
    height: 12px;
    background-color: rgba(0, 0, 0);
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const ToolItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`;

type Config = {
  layout: "side" | "top" | "mix";
  headerFixed: boolean;
  showFooter: boolean;
  showBreadcrumb: boolean;
};

export type Props = {
  config: Config;
  onChange?: (congif: Config) => void;
};

export default function SettingDrawer(props: Props) {
  const [visible, setVisible] = React.useState(false);
  const {
    token: { colorSuccess, colorText },
  } = theme.useToken();

  return (
    <>
      <Button
        type="primary"
        icon={<SettingOutlined />}
        onClick={() => setVisible(!visible)}
        size="large"
        style={{ position: "fixed", top: "40%", right: 0 }}
      ></Button>

      <Drawer
        title="布局配置"
        open={visible}
        width={320}
        onClose={() => setVisible(false)}
        style={{
          color: colorText,
        }}
        footer={
          <div style={{ marginBottom: 10 }}>
            <Alert
              type="warning"
              message="配置栏只应在开发环境用于预览，不应在生产环境不会展现，请手动处理。"
              showIcon
            />
          </div>
        }
      >
        <div>
          <Divider>系统布局</Divider>
          <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            <Badge
              count={
                props.config.layout === "side" ? (
                  <CheckCircleFilled style={{ color: colorSuccess }} />
                ) : null
              }
            >
              <SideDiv
                onClick={() =>
                  props.onChange?.({ ...props.config, layout: "side" })
                }
              ></SideDiv>
            </Badge>
            <Badge
              count={
                props.config.layout === "top" ? (
                  <CheckCircleFilled style={{ color: colorSuccess }} />
                ) : null
              }
            >
              <TopDiv
                onClick={() =>
                  props.onChange?.({ ...props.config, layout: "top" })
                }
              ></TopDiv>
            </Badge>
            <Badge
              count={
                props.config.layout === "mix" ? (
                  <CheckCircleFilled style={{ color: colorSuccess }} />
                ) : null
              }
            >
              <MixDiv
                onClick={() =>
                  props.onChange?.({ ...props.config, layout: "mix" })
                }
              ></MixDiv>
            </Badge>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <Divider>配置</Divider>
          <ToolItem>
            <div>固定 Header</div>
            <Switch
              checked={props.config.headerFixed}
              onChange={(value) =>
                props.onChange?.({ ...props.config, headerFixed: value })
              }
            ></Switch>
          </ToolItem>
          <ToolItem>
            <div>显示 Breadcrumb</div>
            <Switch
              checked={props.config.showBreadcrumb}
              onChange={(value) =>
                props.onChange?.({ ...props.config, showBreadcrumb: value })
              }
            ></Switch>
          </ToolItem>
          <ToolItem>
            <div>显示 Footer</div>
            <Switch
              checked={props.config.showFooter}
              onChange={(value) =>
                props.onChange?.({ ...props.config, showFooter: value })
              }
            ></Switch>
          </ToolItem>
        </div>
      </Drawer>
    </>
  );
}

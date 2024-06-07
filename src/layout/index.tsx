import React from "react";
import { Layout, theme } from "antd";
import SettingDrawer, {
  type Props as SettingDrawerProps,
} from "./SettingDrawer";
import { useLocalStorageState, useMount } from "ahooks";
import styled from "styled-components";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { initMenu, selectMenu } from "@/store/menu";
import Logo from "./Logo";
import Header from "./Header";
import Sider from "./Sider";
import Footer from "./Footer";
import Content from "./Content";
import type { AppDispatch } from "@/store/index";

const Trigger = styled.div`
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

const DEFAULTS: {
  header: {
    height: number;
  };
  sider: {
    width: number;
    collapsedWidth: number;
  };
  config: SettingDrawerProps["config"];
} = {
  header: { height: 55 },
  sider: { width: 210, collapsedWidth: 64 },
  config: {
    layout: "side",
    headerFixed: true,
    showFooter: true,
    showBreadcrumb: true,
  },
};

export default function MyLayout() {
  const [config, setConfig] = useLocalStorageState<
    SettingDrawerProps["config"]
  >("layout-config", {
    defaultValue: DEFAULTS.config,
  });

  // 获取菜单列表
  const dispatch = useDispatch<AppDispatch>();
  useMount(() => dispatch(initMenu()));
  const { list: menu, status } = useSelector(selectMenu);

  const [collapsed, setCollapsed] = useLocalStorageState("layout-collapsed", {
    defaultValue: false,
  });

  const toggleCollapse = React.useCallback(
    () => setCollapsed(!collapsed),
    [collapsed, setCollapsed]
  );

  const renderTrigger = React.useMemo(() => {
    return (
      <Trigger
        // @ts-ignore
        as={collapsed ? MenuUnfoldOutlined : MenuFoldOutlined}
        onClick={toggleCollapse}
        style={{ height: DEFAULTS.header.height }}
      />
    );
  }, [collapsed, toggleCollapse]);

  const renderSider = React.useMemo(() => {
    return (
      <Sider
        layout={config.layout}
        menuItems={menu}
        menuLoading={status === "loading"}
        collapsed={collapsed}
        width={DEFAULTS.sider.width}
        collapsedWidth={DEFAULTS.sider.collapsedWidth}
        logo={<Logo collapsed={collapsed} />}
        trigger={renderTrigger}
        headerHeight={DEFAULTS.header.height}
      />
    );
  }, [config, collapsed, renderTrigger, menu, status]);

  const renderHeader = React.useMemo(() => {
    return (
      <Header
        layout={config.layout}
        menuItems={menu}
        logo={<Logo />}
        fixed={config.headerFixed}
        height={DEFAULTS.header.height}
        collapsed={collapsed}
        siderWidth={DEFAULTS.sider.width}
        collapsedWidth={DEFAULTS.sider.collapsedWidth}
        trigger={renderTrigger}
        showBreadcrumb={config.showBreadcrumb}
      />
    );
  }, [config, collapsed, renderTrigger, menu]);

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  return (
    <Layout style={{ display: "block", background: colorBgLayout }}>
      <Layout style={{ minHeight: "100vh" }}>
        {config.layout === "side" ? renderSider : renderHeader}
        <Layout>
          {config.layout === "side" && renderHeader}
          {config.layout === "mix" && renderSider}
          <Layout>
            <Content
              layout={config.layout}
              showBreadcrumb={config.showBreadcrumb}
            />
            {config.showFooter && <Footer />}
          </Layout>
        </Layout>
      </Layout>
      <SettingDrawer config={config} onChange={setConfig} />
    </Layout>
  );
}

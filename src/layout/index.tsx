import { useEffect, useRef } from "react";
import { Layout } from "antd";
import { useMount, useLocalStorageState } from "ahooks";
import { useDispatch } from "react-redux";
import { initMenu } from "@/store/menu";
import LayContent from "./Content";
import Header from "./Header";
import Sider from "./Sider";

import type { AppDispatch } from "@/store/index";

export default function LayoutViwe() {
  // 控制侧边栏展开收起
  const [collapsed, setCollapsed] = useLocalStorageState("layout-collapsed", {
    defaultValue: false,
  });

  // 初始化菜单列表
  const dispatch = useDispatch<AppDispatch>();
  useMount(() => dispatch(initMenu()));

  const oldScreenWidth = useRef<number>(document.body.clientWidth);
  // 根据屏幕宽度自动设置菜单栏展开状态
  const resizeEnet = () => {
    const minWidth = 1200;
    const screenWidth = document.body.clientWidth;
    if (oldScreenWidth.current >= minWidth && screenWidth < minWidth) {
      // 从大屏切换到小屏
      setCollapsed(true);
    } else if (oldScreenWidth.current < minWidth && screenWidth >= minWidth) {
      // 从小屏切换到大屏
      setCollapsed(false);
    }
    oldScreenWidth.current = screenWidth;
  };
  useEffect(() => {
    // 为什么不使用 useDomSize? 因为 Layout 的高度经常都可能改变，比如页面切换的时候，使用 useDomSize 会很频繁的触发。
    window.addEventListener("resize", resizeEnet);
    return () => window.removeEventListener("resize", resizeEnet);
  });

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

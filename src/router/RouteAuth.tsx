import { FC } from "react";
import { Result } from "antd";
import { useSelector } from "react-redux";
import { selectMenu, selectMenuFlatten } from "@/store/menu";
import { useLocation } from "react-router-dom";
import Error401 from "@/pages/401";
import PageLoading from "./PageLoading";

// 权限路由包装组件
// 根据后端返回的菜单列表显示视图
export default function Auth(props: { Component: FC }) {
  const { pathname } = useLocation();
  const { status } = useSelector(selectMenu);
  const menuFlatten = useSelector(selectMenuFlatten);

  const component = {
    loading: <PageLoading />,
    succeeded: menuFlatten.some((item) => item.path === pathname) ? (
      <props.Component />
    ) : (
      <Error401 />
    ),
    failed: (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Result
          status="500"
          title="权限错误！！！"
          subTitle="没有获取到您的权限，可能是菜单获取失败了，您可以尝试刷新整个页面。"
        ></Result>
      </div>
    ),
    idle: null,
  };

  return component[status];
}

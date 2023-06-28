import { Suspense, useMemo } from "react";
import { Layout, Spin } from "antd";
import { Routes, Route } from "react-router-dom";
import { useBoolean, useTimeout } from "ahooks";
import Redirect from "./redirect";
import Error404 from "@/pages/404";
import Error401 from "@/pages/401";
import routes from "@/router/index"; // 前端路由表
import { flattenDeep } from "./utils";

const { Content } = Layout;

const PageLoading = function () {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin tip="Loading"></Spin>
    </div>
  );
};

export default function LayContent({ initialMenuList, loading }) {
  // 由initialMenuList变化来的一维菜单列表
  const menuList = useMemo(
    () => flattenDeep(initialMenuList),
    [initialMenuList]
  );

  const [pageloading, { set: setPageloading }] = useBoolean(true);
  // 首次加载时可能会先显示出401页面，所以需要控制让路由延时渲染，留出计算菜单权限的时间
  useTimeout(() => setPageloading(false), 500);

  // 判断当前路由是否在菜单列表中 如果在返回true 否则返回false
  const isInMenuList = (pathname) => {
    return menuList.some((item) => item.path === pathname);
  };

  return (
    <Content style={{ margin: 20 }}>
      {!pageloading ? (
        <Suspense fallback={<PageLoading />}>
          <Routes>
            {routes.map((item) => (
              <Route
                path={item.path}
                key={item.path}
                element={
                  isInMenuList(item.path) ? <item.component /> : <Error401 />
                }
              />
            ))}
            <Route path="/" element={<Redirect to="/index" />} />
            <Route path="/*" element={<Error404 />}></Route>
          </Routes>
        </Suspense>
      ) : (
        <PageLoading />
      )}
    </Content>
  );
}

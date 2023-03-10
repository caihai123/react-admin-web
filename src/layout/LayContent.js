import { useState, Suspense, useEffect, useCallback } from "react";
import { Layout, Skeleton } from "antd";
import { Routes, Route } from "react-router-dom";
import { debounce } from "throttle-debounce";
import Redirect from "./redirect";
import Error404 from "@/pages/404.js";
import Error401 from "@/pages/401.js";
import routes from "@/router/index"; // 前端路由表
import { flattenDeep } from "./utils.js";

const { Content } = Layout;

function PageLoading() {
  return (
    <Skeleton active paragraph={{ rows: 6 }} style={{ padding: 20 }}></Skeleton>
  );
}

export default function LayContent({ initialMenuList, loading }) {
  // 由initialMenuList变化来的一维菜单列表
  const [menuList, setMenuList] = useState([]);

  const [pageloading, setPageloading] = useState(false);

  // 首次加载时可能会先显示出401页面，所以需要控制让路由延时渲染，留出计算菜单权限的时间
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedLoading = useCallback(
    debounce(500, (loading) => setPageloading(loading)),
    []
  );

  useEffect(() => {
    setMenuList(flattenDeep(initialMenuList));
    delayedLoading(!loading);
  }, [delayedLoading, initialMenuList, loading]);

  // 判断当前路由是否在菜单列表中 如果在返回true 否则返回false
  const isInMenuList = (pathname) => {
    return menuList.find((item) => item.path === pathname);
  };

  return (
    <Content style={{ margin: 20, background: "#fff" }}>
      {pageloading ? (
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

import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { treeFilter } from "./utils";

// 将一条枝干的树转成一维数组
const treeTOList = function (treeList) {
  let treeListCopy = [...treeList];
  const list = [];
  while (treeListCopy) {
    const item = treeListCopy[0];
    if (item) {
      list.push({
        title: item.title,
        path: item.path,
      });
      treeListCopy = item.children;
    } else {
      treeListCopy = null;
    }
  }
  return list;
};

export default function Component({ menuList }) {
  const location = useLocation();

  const levelList = (() => {
    const path = location.pathname;
    const list = treeFilter(
      menuList,
      (item) => item.path && item.path === path
    );
    let levelList = treeTOList(list);
    if (!levelList[0]) {
      levelList = [{ title: "未知路由" }];
    }

    const [first] = levelList;
    if (first.path !== "/index") {
      levelList.unshift({ title: "首页", path: "/index" });
    }
    return levelList;
  })();

  // 动态修改页面title
  useEffect(() => {
    const title = process.env.REACT_APP_WEBSITE_NAME;
    const currentRoute = levelList[levelList.length - 1];
    document.title = currentRoute?.title
      ? `${title}-${currentRoute?.title}`
      : title;
  }, [levelList]);

  return (
    <Breadcrumb
      items={levelList.map((item) => ({
        title:
          item.path && item.path !== "/" ? (
            <Link to={item.path}>{item.title}</Link>
          ) : (
            item.title
          ),
      }))}
    ></Breadcrumb>
  );
}

import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { treeFilter } from "./utils.js";

// 将一条枝干的树转成一维数组
function treeTOList(treeList) {
  const list = [];
  while (treeList) {
    let item = treeList[0];
    if (item) {
      list.push({
        title: item.title,
        path: item.path,
      });
      treeList = item.children;
    } else {
      treeList = null;
    }
  }
  return list;
}

export default function Component({ menuList }) {
  const [levelList, setLevelList] = useState([]);

  // 监听路由变化，更新面包屑
  let location = useLocation();
  useEffect(() => {
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
    setLevelList(levelList);
  }, [menuList, location]);

  return (
    <Breadcrumb>
      {levelList.map((item, index) => (
        <Breadcrumb.Item key={index}>
          {item.path && item.path !== "/" ? (
            <Link to={item.path}>{item.title}</Link>
          ) : (
            item.title
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, theme, Skeleton } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
import { selectTheme } from "@/store/system";
import { useSelector } from "react-redux";
import { selectUserinfo } from "@/store/userinfo";
import { authRouterMap } from "@/router/index";

const deepCopy = function (obj) {
  // 如果是基本数据类型或 null，则直接返回
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // 创建一个新对象或数组，根据原始对象的类型来判断
  const newObj = Array.isArray(obj) ? [] : {};

  // 遍历原始对象的属性或数组元素
  for (const key in obj) {
    // 递归调用深拷贝函数，复制属性值
    newObj[key] = deepCopy(obj[key]);
  }

  return newObj;
};

// 判断菜单是否是目录
const isSubmenu = function ({ path }) {
  return !path;
};

// 将路由转为菜单格式
const routeToMenu = function (route) {
  const { id, path, children = [], handle = {} } = route;
  const { title, icon } = handle;
  return {
    key: path || id,
    label: title,
    icon,
    children: isSubmenu(route)
      ? children.map((item) => routeToMenu(item))
      : undefined,
  };
};

// 过滤掉路由中没有权限的页面
const routesFilter = function (routes = [], userRole = []) {
  const routesCopy = deepCopy(routes);
  const restRouters = routesCopy.filter(({ role: routeRole }) => {
    if (!routeRole || routeRole.length === 0) {
      return true;
    }
    return userRole.some((item) => routeRole.includes(item));
  });
  // 对子节点进行相同的过滤
  restRouters.forEach((route) => {
    route.children = routesFilter(route.children, userRole);
  });

  return restRouters.filter((route) => {
    if (isSubmenu(route) && route.children.length === 0) {
      // 剔除没有子项的目录
      return false;
    } else {
      return true;
    }
  });
};

export default function LayMenu() {
  const { status, role: userRole } = useSelector(selectUserinfo);
  const menuList = useMemo(
    () => routesFilter(authRouterMap, userRole).map(routeToMenu),
    [userRole]
  );

  const navigate = useNavigate();

  const location = useLocation();

  const themeName = useSelector(selectTheme);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Skeleton
      active
      loading={status === "loading"}
      paragraph={{ rows: 6 }}
      title={false}
      style={{ padding: 20 }}
    >
      <Scrollbars style={{ height: "calc(100% - 64px)" }} autoHide>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuList}
          onClick={({ key }) => navigate(key)}
          style={{ border: "none", background: colorBgContainer }}
          theme={themeName === "dark" ? "dark" : "light"}
        ></Menu>
      </Scrollbars>
    </Skeleton>
  );
}

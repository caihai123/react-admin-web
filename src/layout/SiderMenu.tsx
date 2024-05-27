import { createElement, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, theme, Skeleton } from "antd";
import { selectTheme } from "@/store/system";
import { useSelector } from "react-redux";
import { selectMenu } from "@/store/menu";

import type { MenuProps } from "antd";
import type { Menu as MenuType } from "@/api/system/menu";

import * as icons from "@ant-design/icons";

const allIcons: { [key: string]: any } = icons;
// 动态渲染icon
const antdIcon = function (icon?: string) {
  return icon && createElement(allIcons[icon]);
};

type MenuItem = Required<MenuProps>["items"][number];

const getItem: (menu: MenuType) => MenuItem = function (menu) {
  const { id, type, title, path, children = [], icon } = menu;
  return {
    key: path || id,
    label: title,
    icon: icon ? antdIcon(icon) : "",
    children: type === "2" ? children.map((item) => getItem(item)) : undefined,
  };
};

export default function LayMenu() {
  const { list: menu, status } = useSelector(selectMenu);

  const navigate = useNavigate();

  const location = useLocation();

  const menuList = useMemo(() => menu.map((item) => getItem(item)), [menu]);

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
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuList}
        onClick={({ key }) => navigate(key)}
        style={{ border: "none", background: colorBgContainer }}
        theme={themeName === "dark" ? "dark" : "light"}
      ></Menu>
    </Skeleton>
  );
}

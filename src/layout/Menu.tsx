import { createElement, useMemo, type CSSProperties } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, theme } from "antd";
import { selectTheme } from "@/store/system";
import { useSelector } from "react-redux";

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

export default function MyMenu(props: {
  menu: MenuType[];
  mode: MenuProps["mode"];
  style?: CSSProperties;
}) {
  const navigate = useNavigate();

  const location = useLocation();

  const menuList = useMemo(
    () => props.menu.map((item) => getItem(item)),
    [props.menu]
  );

  const themeName = useSelector(selectTheme);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Menu
      mode={props.mode}
      selectedKeys={[location.pathname]}
      items={menuList}
      onClick={({ key }) => navigate(key)}
      style={{ border: "none", background: colorBgContainer, ...props.style }}
      theme={themeName === "dark" ? "dark" : "light"}
    ></Menu>
  );
}

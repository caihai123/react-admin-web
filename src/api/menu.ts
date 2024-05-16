/* eslint-disable import/prefer-default-export */
import axios from "@/utils/axios";
import { menuType } from "@/utils/dict";

import type { AxiosResultPromise } from "@/utils/axios";

export type Menu = {
  id: string;
  title: string;
  path: string;
  type: (typeof menuType.options)[number]["value"];
  icon: string;
  children?: Menu[];
  buttonList?: { id: string; name: string }[];
};

/**
 * 获取所有菜单
 */
export const getMenuAll: () => AxiosResultPromise<Array<Menu>> = () =>
  axios.get("/api/menu/all");

/**
 * 删除菜单
 * @param id - id
 */
export const removeMenu: (id: string) => AxiosResultPromise<any> = (id) =>
  axios.post("/api/menu/remove", { id });

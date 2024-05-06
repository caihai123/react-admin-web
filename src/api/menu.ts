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
};

export const getMenuAll: () => AxiosResultPromise<Array<Menu>> = () =>
  axios.get("/api/get-menu-all");

/* eslint-disable import/prefer-default-export */
import axios from "@/utils/axios";
import type { AxiosResultPromise } from "@/utils/axios";

export type Menu = {
  id: string;
  title: string;
  path: string;
  type: "1" | "2";
  icon: string;
};

export const getMenuAll: () => AxiosResultPromise<Array<Menu>> = () =>
  axios.get("/api/get-menu-all");

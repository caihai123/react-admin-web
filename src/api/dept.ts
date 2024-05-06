/* eslint-disable import/prefer-default-export */
import axios from "@/utils/axios";
import type { AxiosResultPromise } from "@/utils/axios";

export type Dept = {
  id: string;
  deptName: string;
  description: string;
  children?: Dept[];
};

export type DeptSelectItem = {
  label: string;
  value: string;
  children?: DeptSelectItem[];
};

// 获取所有部门
export const getMenuAll: () => AxiosResultPromise<Array<Dept>> = () =>
  axios.get("/api/dept/list");

// 获取部门options
export const getMenuSelect: () => AxiosResultPromise<
  Array<DeptSelectItem>
> = () => axios.get("/api/dept/select");

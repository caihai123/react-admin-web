/* eslint-disable import/prefer-default-export */
import axios from "@/utils/axios";
import { roleEnabledState } from "@/utils/dict";

import type { AxiosResultPromise } from "@/utils/axios";

export type Role = {
  id: string;
  roleName: string;
  description: string;
  status: (typeof roleEnabledState.options)[number]["value"];
  createTime: string;
};

/**
 * 分页获取角色列表
 * @param params - 查询参数
 * @param pageIndex - 页码 默认： 1
 * @param pageSize - 页大小 默认：10
 */
export const getRoleList: (
  params: any,
  pageIndex: number,
  pageSize: number
) => AxiosResultPromise<{
  records: Role[];
  total: number;
  pageIndex: number;
}> = (params, pageIndex = 1, pageSize = 10) => {
  return axios.post("/api/role/page", { params, pageIndex, pageSize });
};

/**
 * 通过id更新角色状态
 * @param id - id
 * @param status - 角色状态
 */
export const updateRoleStatusById: (
  id: Role["id"],
  status: Role["status"]
) => AxiosResultPromise<any> = (id, status) => {
  return axios.post("/api/role/status/update", { id, status });
};

/**
 * 通过id删除角色
 * @param id - id
 */
export const removeRole: (id: string) => AxiosResultPromise<any> = (id) =>
  axios.post("/api/role/remove", { id });

/**
 * 角色授权
 * @param params
 */
export const authRole: (params: any[]) => AxiosResultPromise<any> = (params) =>
  axios.post("/api/role/auth", params);

/**
 * 获取角色选择器
 */
export const getRoleSelect: () => AxiosResultPromise<
  { value: string; label: string }[]
> = () => axios.get("/api/role/select");

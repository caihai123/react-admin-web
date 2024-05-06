/* eslint-disable import/prefer-default-export */
import axios from "@/utils/axios";
import { roleEnabledState } from "@/utils/dict";

import type { AxiosResultPromise } from "@/utils/axios";

export type Role = {
  id: string;
  roleName: string;
  description: string;
  status: (typeof roleEnabledState.options)[number]["value"];
};

/** 分页获取角色列表*/
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

// 通过id更新角色状态
export const updateRoleStatusById: (
  id: Role["id"],
  status: Role["status"]
) => AxiosResultPromise<any> = (id, status) => {
  return axios.post("/api/role/status/update", { id, status });
};

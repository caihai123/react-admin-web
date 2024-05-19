import axios, { type AxiosResultPromise } from "@/utils/axios";
import { gender, accountEnabledState } from "@/utils/dict";

export type Account = {
  id: string;
  account: string;
  name: string;
  avatar: string;
  gender: (typeof gender.options)[number]["value"];
  phone: string;
  email: string;
  deptId: string;
  deptName: string;
  role?: { name: string; id: string }[];
  status: (typeof accountEnabledState.options)[number]["value"];
  description: string;
};

/**
 * 分页获取用户列表
 * @param params - 查询参数
 * @param pageIndex - 页码 默认： 1
 * @param pageSize - 页大小 默认：10
 */
export const getAccountList: (
  params: any,
  pageIndex: number,
  pageSize: number
) => AxiosResultPromise<{
  records: Account[];
  total: number;
  pageIndex: number;
}> = (params, pageIndex = 1, pageSize = 10) => {
  return axios.post("/api/account/page", { params, pageIndex, pageSize });
};

/**
 * 通过id更新用户状态
 * @param id - id
 * @param status - 角色状态
 */
export const updateAccountStatusById: (
  id: Account["id"],
  status: Account["status"]
) => AxiosResultPromise<any> = (id, status) => {
  return axios.post("/api/account/status/update", { id, status });
};

/**
 * 通过id删除用户
 * @param id - id
 */
export const removeAccount: (id: string) => AxiosResultPromise<any> = (id) =>
  axios.post("/api/account/remove", { id });

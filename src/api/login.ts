/* eslint-disable import/prefer-default-export */
import axios from "@/utils/axios";
import type { AxiosResultPromise } from "@/utils/axios";

export type Params = { userAccount: string; userPassword: string };

/** 用户名加密码登录 成功后返回 token */
export const login: (
  params: Params
) => AxiosResultPromise<{ token: string }> = (params) =>
  axios.post("/api/login", params);

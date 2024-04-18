/* eslint-disable import/prefer-default-export */
import axios from "@/utils/axios";
import type { AxiosResultPromise } from "@/utils/axios";

export type IssuseStatus = 0 | 1 | 2;
export type IssuseType = 1 | 2;
export type Issuse = {
  status: IssuseStatus;
  user: { name: string };
  commentCount: number;
  createTime: string;
  type: IssuseType;
  title: string;
  describe: string;
};

/** 获取 issuse 分页列表 */
export const getIssuseList: (
  pageIndex: number,
  pageSize: number
) => AxiosResultPromise<{
  records: Issuse[];
  total: number;
  pageIndex: number;
}> = (pageIndex, pageSize) =>
  axios.post("/api/issues/page", { pageIndex, pageSize });

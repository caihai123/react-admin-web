import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "@/utils/axios";

import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";

// 自定义查询
const customQuery: BaseQueryFn = async (args, api, extraOptions) => {
  try {
    if (typeof args === "string") {
      const { result } = await axios.get(args);
      return { data: result };
    } else {
      const { url, method, body } = args;
      const { result } = await axios({ url, method, data: body });
      return { data: result };
    }
  } catch (error) {
    // @ts-ignore
    return { error: error.data };
  }
};

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customQuery,
  // tagTypes: [],
  endpoints: (builder) => ({}),
});

export default apiSlice;

import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "@/utils/axios";

// 自定义查询
const customQuery = async (args, api, extraOptions) => {
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
    return { error };
  }
};

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customQuery,
  // tagTypes: ["DeptSelect"],
  endpoints: (builder) => ({}),
});

export default apiSlice;

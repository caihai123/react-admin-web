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

export const catchApi = createApi({
  reducerPath: "catchApi",
  baseQuery: customQuery,
  // tagTypes: ["DeptSelect"],
  endpoints: (builder) => ({
    // 获取部门选择器
    getDeptSelect: builder.query({
      query: () => "/api/dept/select",
      providesTags: ["DeptSelect"],
    }),
    // 新增单个部门
    addDeptItem: builder.mutation({
      query: (body) => ({
        url: "/api/dept/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["DeptSelect"],
    }),
    // 更新单个部门
    updateDeptItem: builder.mutation({
      query: (body) => ({
        url: "/api/dept/update",
        method: "POST",
        body,
      }),
      invalidatesTags: ["DeptSelect"],
    }),
    // 删除单个部门
    deleteDeptItem: builder.mutation({
      query: (body) => ({
        url: "/api/dept/delete",
        method: "POST",
        body,
      }),
      invalidatesTags: ["DeptSelect"],
    }),
  }),
});

export const {
  useGetDeptSelectQuery,
  useAddDeptItemMutation,
  useUpdateDeptItemMutation,
  useDeleteDeptItemMutation,
} = catchApi;

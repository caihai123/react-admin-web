import apiSlice from "../apiSlice";

export const deptSlice = apiSlice.injectEndpoints({
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
} = deptSlice;

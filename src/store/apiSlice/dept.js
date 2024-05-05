import apiSlice from "./index";

export const deptSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 获取所有部门
    getDeptAll: builder.query({
      query: () => "/api/dept/list",
      providesTags: ["deptList"],
    }),
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
      invalidatesTags: ["deptList", "DeptSelect"],
    }),
    // 更新单个部门
    updateDeptItem: builder.mutation({
      query: (body) => ({
        url: "/api/dept/update",
        method: "POST",
        body,
      }),
      invalidatesTags: ["deptList", "DeptSelect"],
    }),
    // 删除单个部门
    deleteDeptItem: builder.mutation({
      query: (body) => ({
        url: "/api/dept/delete",
        method: "POST",
        body,
      }),
      invalidatesTags: ["deptList", "DeptSelect"],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getDeptAll", undefined, (draft) => {
            return draft.filter((dept) => dept.id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetDeptAllQuery,
  useGetDeptSelectQuery,
  useAddDeptItemMutation,
  useUpdateDeptItemMutation,
  useDeleteDeptItemMutation,
} = deptSlice;

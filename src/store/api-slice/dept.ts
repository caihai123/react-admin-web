import apiSlice from "./index";
import type { Dept, DeptSelectItem } from "@/api/dept";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["deptList", "deptSelect"],
});

const deleteDeptByid = (deptTreeList: Dept[] = [], id: string): Dept[] => {
  return deptTreeList
    .filter((dept) => dept.id !== id)
    .map(({ children = [], ...rest }) => ({
      ...rest,
      children: children.length ? deleteDeptByid(children, id) : undefined,
    }));
};

export const deptSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    // 获取所有部门
    getDeptAll: builder.query<Dept[], void>({
      query: () => "/api/dept/list",
      providesTags: ["deptList"],
    }),
    // 获取部门选择器
    getDeptSelect: builder.query<DeptSelectItem[], void>({
      query: () => "/api/dept/select",
      providesTags: ["deptSelect"],
    }),
    // 新增单个部门
    addDeptItem: builder.mutation<any, Omit<Dept, "id">>({
      query: (body) => ({
        url: "/api/dept/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["deptList", "deptSelect"],
    }),
    // 更新单个部门
    updateDeptItem: builder.mutation<any, Dept>({
      query: (body) => ({
        url: "/api/dept/update",
        method: "POST",
        body,
      }),
      invalidatesTags: ["deptList", "deptSelect"],
    }),
    // 删除单个部门
    deleteDeptItem: builder.mutation<any, Pick<Dept, "id">>({
      query: (body) => ({
        url: "/api/dept/delete",
        method: "POST",
        body,
      }),
      invalidatesTags: ["deptList", "deptSelect"],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        // 乐观更新
        const patchResult = dispatch(
          deptSlice.util.updateQueryData(
            "getDeptAll",
            undefined,
            (deptTreeData) => deleteDeptByid(deptTreeData, id)
          )
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

import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "@/utils/axios";

const localMenu = [
  {
    path: "/issues",
    title: "意见反馈",
    children: [
      {
        path: "/issues/add",
        title: "新增Issues",
      },
    ],
  },
];

export const menu = createSlice({
  name: "menu",
  initialState: {
    list: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed",
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(initMenu.pending, (state) => {
        state.status = "loading";
      })
      .addCase(initMenu.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(initMenu.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// 初始化菜单列表
export const initMenu = createAsyncThunk("menu/initMenu", async () => {
  const response = await axios.get("/api/get-menu-all");
  return response.result;
});

export const selectMenu = (state) => state.menu;

export const selectMenuAll = (state) => [...state.menu.list, ...localMenu];

// 扁平化的菜单
export const selectMenuFlatten = createSelector(
  (state) => {
    const list = [];

    const deep = (obj) => {
      if (obj.type === "1") {
        // 只保留菜单
        const { children, ...item } = obj;
        list.push(item);
      }
      if (obj.children && obj.children.length) {
        obj.children.forEach((item) => deep(item));
      }
    };

    state.menu.list.forEach((item) => deep(item));

    return list;
  },
  (list) => list
);

export default menu.reducer;

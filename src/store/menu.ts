import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "@/utils/axios";

import type { RootState } from "./index";
import { Menu } from "@/api/menu";

const initialState: {
  list: Menu[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any;
} = {
  list: [],
  status: "idle",
  error: null,
};

export const menu = createSlice({
  name: "menu",
  initialState,
  reducers: {},
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
  const response = await axios.get("/api/menu/all");
  return response.result;
});

export const selectMenu = (state: RootState) => state.menu;

// 扁平化的菜单
export const selectMenuFlatten = createSelector(
  (state: RootState) => {
    const list: Menu[] = [];

    const deep = (obj: Menu) => {
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

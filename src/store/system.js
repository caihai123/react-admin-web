import { createSlice } from "@reduxjs/toolkit";

export const systemSlice = createSlice({
  name: "system",
  initialState: {
    // 当前主题
    theme: localStorage.getItem("theme"), // or dark

    // 后端返回的菜单列表
    menu: [],
  },
  reducers: {
    // 设置当前主题，如果不传则取切换
    setTheme: (state, action) => {
      const theme =
        action.payload ||
        (() => {
          if (state.theme === "dark") {
            return "light";
          } else {
            return "dark";
          }
        })();
      state.theme = theme;
      localStorage.setItem("theme", theme);
    },
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { setTheme, setMenu } = systemSlice.actions;

export const selectTheme = (state) => state.system.theme;

export const selectMenu = (state) => state.system.menu;

export default systemSlice.reducer;

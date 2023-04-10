import { createSlice } from "@reduxjs/toolkit";

export const systemSlice = createSlice({
  name: "system",
  initialState: {
    theme: localStorage.getItem("theme"), // or dark
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
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { setTheme } = systemSlice.actions;

export const selectTheme = (state) => state.system.theme;

export default systemSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

type Theme = "light" | "dark";

const currentTheme = localStorage.getItem("theme") || "light"; // or dark

const initialState: { theme: Theme } = {
  // 当前主题
  theme: currentTheme as Theme,
};

export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    // 设置当前主题，如果不传则取切换
    setTheme: (state, action: PayloadAction<Theme | undefined>) => {
      const theme: Theme =
        action.payload || state.theme === "dark" ? "light" : "dark";
      state.theme = theme;
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { setTheme } = systemSlice.actions;

export const selectTheme = (state: RootState) => state.system.theme;

export default systemSlice.reducer;

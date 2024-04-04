import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axios";

export const userinfo = createSlice({
  name: "userinfo",
  initialState: {
    userName: "",
    avatar: null,
    role: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed",
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(init.pending, (state) => {
        state.status = "loading";
      })
      .addCase(init.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { userName, avatar, role } = action.payload;
        state.userName = userName;
        state.avatar = avatar;
        state.role = role;
      })
      .addCase(init.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// 初始化菜单列表
export const init = createAsyncThunk("userinfo/init", async () => {
  const response = await axios.get("/api/get-userinfo");
  return response.result;
});

export const selectUserinfo = (state) => state.userinfo;

export default userinfo.reducer;

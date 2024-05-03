import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axios";

export const userinfo = createSlice({
  name: "userinfo",
  initialState: {
    account: "",
    avatar: null,
    name: "",
    gender: "1",
    phone: "",
    email: "",
    deptId: [],
    role: [],
    description: "",

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
        const {
          account,
          avatar,
          name,
          gender,
          phone,
          email,
          deptId,
          role,
          description,
        } = action.payload;
        state.account = account;
        state.avatar = avatar;
        state.name = name;
        state.gender = gender;
        state.phone = phone;
        state.email = email;
        state.deptId = deptId;
        state.role = role;
        state.description = description;
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

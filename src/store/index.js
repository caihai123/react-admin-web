import { configureStore } from "@reduxjs/toolkit";
import system from "./system";
import userinfo from "./userinfo";
import apiSlice from "./apiSlice";

export default configureStore({
  reducer: {
    system,
    userinfo,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

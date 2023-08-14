import { configureStore } from "@reduxjs/toolkit";
import system from "./system";
import apiSlice from "./apiSlice";

export default configureStore({
  reducer: {
    system,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

import { configureStore } from "@reduxjs/toolkit";
import system from "./system";
import menu from "./menu";
import apiSlice from "./apiSlice";

export default configureStore({
  reducer: {
    system,
    menu,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

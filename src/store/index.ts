import { configureStore } from "@reduxjs/toolkit";
import system from "./system";
import menu from "./menu";
import apiSlice from "./api-slice";

const store = configureStore({
  reducer: {
    system,
    menu,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

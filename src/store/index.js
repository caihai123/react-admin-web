import { configureStore } from "@reduxjs/toolkit";
import system from "./modules/system";
import { catchApi } from "./modules/catch-api";

export default configureStore({
  reducer: {
    system,
    [catchApi.reducerPath]: catchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catchApi.middleware),
});

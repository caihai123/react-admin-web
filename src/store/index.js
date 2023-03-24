import { configureStore } from "@reduxjs/toolkit";
import system from "./modules/system";

export default configureStore({
  reducer: {
    system,
  },
});

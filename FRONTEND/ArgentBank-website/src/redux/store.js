import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth.slice";

export default configureStore({
  reducer: {
    user: authSlice,
  },
});
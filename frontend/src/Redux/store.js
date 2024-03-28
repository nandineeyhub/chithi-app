
import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./ProfileSlice";

const store = configureStore({
  reducer: {
    profile: profileSlice,
  },
});
export default store;

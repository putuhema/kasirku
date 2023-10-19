import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import searchReducer from "./features/searchSlice";
export const store = configureStore({
  reducer: {
    cartReducer,
    searchReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

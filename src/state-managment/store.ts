// store.ts
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/products-slice";
import authReducer from "./slices/auth-slice";
import userReducer from "./slices/user-slice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

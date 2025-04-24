// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import userReducer from "./slices/user-slice";
import { productsApi, providersApi } from "./slices";
import { setupListeners } from "@reduxjs/toolkit/query";
import { warehousesApi } from "./slices/warehouse-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [providersApi.reducerPath]: providersApi.reducer,
    [warehousesApi.reducerPath]: warehousesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      providersApi.middleware,
      warehousesApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

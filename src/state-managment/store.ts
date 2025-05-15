// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import userReducer from "./slices/user-slice";
import { productsApi, providersApi } from "./slices";
import { setupListeners } from "@reduxjs/toolkit/query";
import { warehousesApi } from "./slices/warehouse-slice";
import { inventoriesApi } from "./slices/inventoriesSlice";
import dashboardReducer from "./slices/dashboard-slice";  

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,

    // RTK Query reducers
    [productsApi.reducerPath]: productsApi.reducer,
    [providersApi.reducerPath]: providersApi.reducer,
    [warehousesApi.reducerPath]: warehousesApi.reducer,
    [inventoriesApi.reducerPath]: inventoriesApi.reducer,

    // Slice “normal”
    dashboard: dashboardReducer,  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // RTK Query middleware
      productsApi.middleware,
      providersApi.middleware,
      warehousesApi.middleware,
      inventoriesApi.middleware
      // ¡No añadas dashboardSlice.middleware!
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

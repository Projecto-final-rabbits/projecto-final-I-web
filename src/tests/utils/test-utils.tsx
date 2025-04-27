import { PropsWithChildren, ReactElement } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { productsApi, providersApi } from "@/state-managment/slices";
import { warehousesApi } from "@/state-managment/slices/warehouse-slice";
import { inventoriesApi } from "@/state-managment/slices/inventoriesSlice";
import authReducer from "@/state-managment/slices/auth-slice";
import userReducer from "@/state-managment/slices/user-slice";

// Crear un store mock para pruebas
export function createMockStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
      [productsApi.reducerPath]: productsApi.reducer,
      [providersApi.reducerPath]: providersApi.reducer,
      [warehousesApi.reducerPath]: warehousesApi.reducer,
      [inventoriesApi.reducerPath]: inventoriesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        productsApi.middleware,
        providersApi.middleware,
        warehousesApi.middleware,
        inventoriesApi.middleware
      ),
  });
}

// Wrapper con el Provider de Redux
export function renderWithProviders(
  ui: ReactElement,
  { store = createMockStore(), ...renderOptions } = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): ReactElement {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Exportar todo lo de testing-library
export * from "@testing-library/react";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { InventoryApi } from "@/pages/products/inventories-table/columns";
import { env } from "@config/env";

export const inventoriesApi = createApi({
  reducerPath: "inventoriesApi",
  tagTypes: ["Inventories"],
  baseQuery: fetchBaseQuery({
    baseUrl: env.VITE_API_URL_WAREHOUSE,
    timeout: 6000,
    headers: {
      "Content-Type": "application/json",
    },
  }),
  endpoints: (builder) => ({
    getInventories: builder.query<InventoryApi[], void>({
      query: () => "/inventarios/",
      providesTags: ["Inventories"],
    }),
  }),
});

// 👇 Exportamos el hook automático
export const { useGetInventoriesQuery } = inventoriesApi;

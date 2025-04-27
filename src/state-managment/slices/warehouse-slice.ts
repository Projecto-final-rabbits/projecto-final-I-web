import { createApi } from "@reduxjs/toolkit/query/react";
import { Warehouse } from "@core/domain/entities";
import { WarehouseRepositoryImpl } from "@/core/infrastructure/api/repositories/WarehouseRepositoryImpl";
import { getWarehouses } from "@/core/domain/use-cases/warehouse";

export const warehousesApi = createApi({
  reducerPath: "warehouseApi",
  tagTypes: ["Warehouses"],
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    getWarehouses: builder.query<Warehouse[], void>({
      queryFn: async () => {
        try {
          const repo = new WarehouseRepositoryImpl();
          const data = await getWarehouses(repo);
          return { data };
        } catch (error) {
          return {
            error: {
              status: 500,
              data:
                error instanceof Error ? error.message : "Ops, algo salió mal",
            },
          };
        }
      },
      providesTags: ["Warehouses"],
    }),
  }),
});

export const { useGetWarehousesQuery } = warehousesApi;

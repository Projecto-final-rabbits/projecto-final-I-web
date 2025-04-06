// api/productsApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { Product } from "@core/domain/entities";
import { ProductRepositoryImpl } from "@core/infrastructure/api/repositories";
import { getProducts } from "@core/domain/use-cases/products/get-products";
import { ICreateProduct } from "@/core/domain/interfaces";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["Products"],
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      queryFn: async () => {
        try {
          const repo = new ProductRepositoryImpl();
          const data = await getProducts(repo);
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
      providesTags: ["Products"],
    }),
    saveProduct: builder.mutation<void, ICreateProduct>({
      queryFn: async (product) => {
        try {
          const repo = new ProductRepositoryImpl();
          await repo.save(product);
          return { data: undefined };
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
      invalidatesTags: ["Products"],
    }),
    saveMultipleProducts: builder.mutation<void, FormData>({
      queryFn: async (file) => {
        try {
          const repo = new ProductRepositoryImpl();
          await repo.saveMany(file);
          await new Promise((resolve) => setTimeout(resolve, 2000));
          return { data: undefined };
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
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useSaveProductMutation,
  useSaveMultipleProductsMutation,
} = productsApi;

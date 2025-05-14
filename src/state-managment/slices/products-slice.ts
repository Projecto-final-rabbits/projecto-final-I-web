// api/productsApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { Product } from "@core/domain/entities";
import { ProductRepositoryImpl } from "@core/infrastructure/api/repositories";
import { getProducts } from "@core/domain/use-cases/products/get-products";
import { ICreateProduct, IMoveProduct } from "@/core/domain/interfaces";
import { inventoriesApi } from "@/state-managment/slices/inventoriesSlice";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["Products", "Inventories"],
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      Product[],
      { providerId?: string | null; categoryId?: string | null }
    >({
      queryFn: async ({ providerId, categoryId }) => {
        try {
          const repo = new ProductRepositoryImpl();
          const data = await getProducts(repo, { providerId, categoryId });
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
    moveIncomeProduct: builder.mutation<void, IMoveProduct>({
      async queryFn(movement) {
        try {
          const repo = new ProductRepositoryImpl();
          await repo.moveIncome(movement);
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
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(inventoriesApi.util.invalidateTags(["Inventories"]));
        } catch {
          console.log("Error al mover el producto");
        }
      },
    }),
    moveOutcomeProduct: builder.mutation<void, IMoveProduct>({
      async queryFn(movement) {
        try {
          const repo = new ProductRepositoryImpl();
          await repo.moveOutcome(movement);
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
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(inventoriesApi.util.invalidateTags(["Inventories"]));
        } catch {
          console.log("Error al mover el producto");
        }
      },
    }),
    moveTransferProduct: builder.mutation<void, IMoveProduct>({
      async queryFn(movement) {
        try {
          const repo = new ProductRepositoryImpl();
          await repo.moveTransfer(movement);
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
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(inventoriesApi.util.invalidateTags(["Inventories"]));
        } catch {
          console.log("Error al mover el producto");
        }
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useSaveProductMutation,
  useSaveMultipleProductsMutation,
  useMoveIncomeProductMutation,
  useMoveOutcomeProductMutation,
  useMoveTransferProductMutation,
} = productsApi;

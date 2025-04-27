import { createApi } from "@reduxjs/toolkit/query/react";
import { Provider } from "@core/domain/entities";
import { ProviderRepositoryImpl } from "@/core/infrastructure/api/repositories";
import { getProviders } from "@/core/domain/use-cases/providers";
import { ICreateProvider } from "@/core/domain/interfaces";

type UpdateProvider = { provider: ICreateProvider; id: number };

export const providersApi = createApi({
  reducerPath: "providersApi",
  tagTypes: ["Providers"],
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    getProviders: builder.query<Provider[], void>({
      queryFn: async () => {
        try {
          const repo = new ProviderRepositoryImpl();
          const data = await getProviders(repo);
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
      providesTags: ["Providers"],
    }),
    saveProvider: builder.mutation<void, ICreateProvider>({
      queryFn: async (provider) => {
        try {
          const repo = new ProviderRepositoryImpl();
          await repo.save(provider);
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
      invalidatesTags: ["Providers"],
    }),
    updateProvider: builder.mutation<void, UpdateProvider>({
      queryFn: async ({ provider, id }) => {
        try {
          const repo = new ProviderRepositoryImpl();
          const data = await repo.update(provider, id);
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
      invalidatesTags: ["Providers"],
    }),
    delete: builder.mutation<void, number>({
      queryFn: async (id) => {
        try {
          const repo = new ProviderRepositoryImpl();
          await repo.delete(id);
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
    }),
  }),
});

export const {
  useGetProvidersQuery,
  useSaveProviderMutation,
  useUpdateProviderMutation,
  useDeleteMutation,
} = providersApi;

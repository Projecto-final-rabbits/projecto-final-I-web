import { createApi } from "@reduxjs/toolkit/query/react";
import { Provider } from "@core/domain/entities";
import { ProviderRepositoryImpl } from "@/core/infrastructure/api/repositories";
import { getProviders } from "@/core/domain/use-cases/providers";

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
  }),
});

export const { useGetProvidersQuery } = providersApi;

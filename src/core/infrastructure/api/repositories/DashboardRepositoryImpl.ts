// src/core/infraestructure/api/repositories/DashboardRepositoryImpl.ts
import { axiosClientForSales } from "@/core/infraestructure/api/clients";
import { SalesSummary } from "@/core/domain/interfaces/dashboard";

export class DashboardRepositoryImpl {
  async getSalesSummary(params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<SalesSummary> {
    // Mapea camelCase → snake_case para el backend
    const query: Record<string, string | undefined> = {};
    if (params?.startDate) query.start_date = params.startDate;
    if (params?.endDate)   query.end_date   = params.endDate;

    const response = await axiosClientForSales.get<SalesSummary>(
      "/dashboard/sales-summary",
      { params: query }
    );
    return response.data;
  }
}

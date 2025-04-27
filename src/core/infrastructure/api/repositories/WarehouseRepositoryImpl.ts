import { axiosClientForWarehouse } from "@/core/infraestructure/api/clients";
import { IWarehouseRepository } from "@/core/domain/repositories/warehouse.repository";
import { Warehouse } from "@/core/domain/entities";

class WarehouseRepositoryImpl implements IWarehouseRepository {
  async findAll(): Promise<Warehouse[]> {
    const response = await axiosClientForWarehouse.get("/bodegas/", {
      params: {
        page: 1,
        pageSize: 1000,
      },
    });
    return response.data;
  }
}

export { WarehouseRepositoryImpl };

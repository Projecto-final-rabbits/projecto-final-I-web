import { axiosClientForWarehouse } from "@/core/infraestructure/api/clients";
import { IWarehouseRepository } from "@/core/domain/repositories/warehouse.repository";
import { Warehouse } from "@/core/domain/entities";

class WarehouseRepositoryImpl implements IWarehouseRepository {
  async findAll(): Promise<Warehouse[]> {
    return axiosClientForWarehouse.get("/bodegas/", {
      params: {
        page: 1,
        pageSize: 1000,
      },
    });
  }
}

export { WarehouseRepositoryImpl };

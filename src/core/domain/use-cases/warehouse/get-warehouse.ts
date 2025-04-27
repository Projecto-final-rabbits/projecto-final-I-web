import { Warehouse } from "@core/domain/entities/warehouse";
import { IWarehouseRepository } from "@core/domain/repositories/warehouse.repository";

const getWarehouses = async (
  repository: IWarehouseRepository
): Promise<Warehouse[]> => {
  return repository.findAll();
};

export { getWarehouses };

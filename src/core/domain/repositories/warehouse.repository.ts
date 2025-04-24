import { Warehouse } from "../entities";

interface IWarehouseRepository {
  findAll(): Promise<Warehouse[]>;
}

export type { IWarehouseRepository };

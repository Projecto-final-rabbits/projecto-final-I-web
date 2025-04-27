import { Product } from "../entities/product";
import { IMoveProduct } from "../interfaces";

type ProductsFilterParams = {
  provedor_id?: string | null;
  categoryId?: string | null;
};

interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  findAll(params?: ProductsFilterParams): Promise<Product[]>;
  move(movement: IMoveProduct): Promise<void>;
}

export type { IProductRepository, ProductsFilterParams };

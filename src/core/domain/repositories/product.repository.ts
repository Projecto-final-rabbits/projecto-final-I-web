import { Product } from "../entities/product";

type ProductsFilterParams = {
  providerId?: string | null;
  countryId?: string | null;
};

interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  findAll(params?: ProductsFilterParams): Promise<Product[]>;
}

export type { IProductRepository, ProductsFilterParams };

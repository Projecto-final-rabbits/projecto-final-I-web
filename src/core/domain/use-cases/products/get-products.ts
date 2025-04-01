import { IProductRepository } from "@core/domain/repositories";
import { Product } from "@core/domain/entities/product";

export const getProducts = async (
  repository: IProductRepository
): Promise<Product[]> => {
  return repository.findAll();
};

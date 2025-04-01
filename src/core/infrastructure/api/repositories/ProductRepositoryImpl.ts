import { IProductRepository } from "@core/domain/repositories/product.repository";
import { Product } from "@core/domain/entities/product";

export class ProductRepositoryImpl implements IProductRepository {
  async findById(id: string): Promise<Product | null> {
    // TODO: Implement actual API call
    console.log("findById", id);
    throw new Error("Not implemented");
  }

  async findAll(): Promise<Product[]> {
    // TODO: Implement actual API call
    throw new Error("Not implemented");
  }
}

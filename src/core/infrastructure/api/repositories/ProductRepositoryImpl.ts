import { IProductRepository } from "@core/domain/repositories/product.repository";
import { Product } from "@core/domain/entities/product";
import {
  axiosClientForWarehouse,
  axiosClientForBuyers,
} from "@/core/infraestructure/api/clients";
import { ICreateProduct, IProductDTO } from "@/core/domain/interfaces";

class ProductRepositoryImpl implements IProductRepository {
  async findById(id: string): Promise<Product | null> {
    // TODO: Implement actual API call
    console.log("findById", id);
    throw new Error("Not implemented");
  }

  async findAll(): Promise<Product[]> {
    return axiosClientForBuyers.get("/productos/").then((response) => {
      const products = response.data.map((product: IProductDTO) =>
        Product.fromDtoToEntity(product)
      );

      return products;
    });
  }

  async save(product: ICreateProduct): Promise<void> {
    const productDto = Product.fromCreateEntityToDto(product);
    return axiosClientForBuyers.post("/productos/", productDto);
  }

  async saveMany(products: FormData): Promise<void> {
    return axiosClientForWarehouse.post("/productos/masivo", products, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export { ProductRepositoryImpl };

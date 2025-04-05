import { IProductRepository } from "@core/domain/repositories/product.repository";
import { Product } from "@core/domain/entities/product";
import { axiosClientForBuyers } from "@/core/infraestructure/api/clients";
import { IProductDTO } from "@/core/domain/interfaces";

// const PRODUCT_MOCK = [
//   {
//     nombre: "Producto Test",
//     descripcion: "Producto de prueba",
//     precio_compra: 10000,
//     categoria: "Electrónica",
//     proveedor_id: 1,
//     tiempo_entrega_dias: 3,
//     id: 1,
//   },
//   {
//     nombre: "Producto Test2",
//     descripcion: "Producto de prueba",
//     precio_compra: 10000,
//     categoria: "Electrónica",
//     proveedor_id: 1,
//     tiempo_entrega_dias: 3,
//     id: 2,
//   },
//   {
//     nombre: "Producto Test3",
//     descripcion: "Producto de prueba",
//     precio_compra: 10000,
//     categoria: "Electrónica",
//     proveedor_id: 1,
//     tiempo_entrega_dias: 3,
//     id: 3,
//   },
// ];
export class ProductRepositoryImpl implements IProductRepository {
  async findById(id: string): Promise<Product | null> {
    // TODO: Implement actual API call
    console.log("findById", id);
    throw new Error("Not implemented");
  }

  async findAll(): Promise<Product[]> {
    // return PRODUCT_MOCK.map((product: IProductDTO) =>
    //   Product.fromDtoToEntity(product)
    // );

    return axiosClientForBuyers.get("/productos/").then((response) => {
      const products = response.data.map((product: IProductDTO) =>
        Product.fromDtoToEntity(product)
      );

      console.log("***", products);
      return products;
    });
  }

  async save(product: Product): Promise<void> {
    console.log("save", product);
    throw new Error("Not implemented");
  }
}

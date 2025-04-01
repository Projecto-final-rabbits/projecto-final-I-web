import { Product } from "../../../domain/entities/product";
import { IProductRepository } from "../../../domain/repositories/product.repository";

export interface GetProductDTO {
  id: string;
  nombre: string;
  categoria: string;
  fechaVencimiento: Date;
  condicionAlmacenamiento: string;
  descripcion: string;
  precioCompra: number;
  proveedorId: string;
  tiempoEntregaDias: number;
  precioVenta: number;
  promocionActiva: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class GetProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<GetProductDTO | null> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      return null;
    }

    return this.toDTO(product);
  }

  private toDTO(product: Product): GetProductDTO {
    return {
      id: product.id,
      nombre: product.nombre,
      categoria: product.categoria,
      fechaVencimiento: product.fechaVencimiento,
      condicionAlmacenamiento: product.condicionAlmacenamiento,
      descripcion: product.descripcion,
      precioCompra: product.precioCompra,
      proveedorId: product.proveedorId,
      tiempoEntregaDias: product.tiempoEntregaDias,
      precioVenta: product.precioVenta,
      promocionActiva: product.promocionActiva,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}

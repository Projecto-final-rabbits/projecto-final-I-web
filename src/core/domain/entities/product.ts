import {
  IProduct,
  ICreateProductDTO,
  IProductDTO,
  ICreateProduct,
} from "../interfaces/product";

class Product implements IProduct {
  id: string;
  nombre: string;
  descripcion?: string;
  precioCompra: number;
  categoria?: string;
  proveedorId: number;
  tiempoEntregaDias?: number;

  constructor({
    id,
    nombre,
    descripcion,
    precioCompra,
    categoria,
    proveedorId,
    tiempoEntregaDias,
  }: IProduct) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioCompra = precioCompra;
    this.categoria = categoria;
    this.proveedorId = proveedorId;
    this.tiempoEntregaDias = tiempoEntregaDias;
  }
  static fromDtoToEntity(dto: IProductDTO): Product {
    return new Product({
      id: dto.id,
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      precioCompra: dto.precio_compra,
      categoria: dto.categoria,
      proveedorId: dto.proveedor_id,
      tiempoEntregaDias: dto.tiempo_entrega_dias,
    });
  }

  static fromCreateEntityToDto(entity: ICreateProduct): ICreateProductDTO {
    return {
      nombre: entity.nombre,
      descripcion: entity.descripcion,
      precio_compra: entity.precioCompra,
      categoria: entity.categoria,
      proveedor_id: entity.proveedorId,
      tiempo_entrega_dias: entity.tiempoEntregaDias,
    };
  }

  static fromCreateProductToEntity(dto: ICreateProductDTO): Product {
    return new Product({
      id: "",
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      precioCompra: dto.precio_compra,
      categoria: dto.categoria,
      proveedorId: dto.proveedor_id,
      tiempoEntregaDias: dto.tiempo_entrega_dias,
    });
  }
}

export { Product };

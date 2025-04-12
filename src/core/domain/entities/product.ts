import { isoDateToDate } from "@/utils/dates";
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
  promocionActiva?: boolean;
  condicionAlmacenamiento?: string;
  fechaVencimiento?: Date;
  precioVenta?: number;

  constructor({
    id,
    nombre,
    descripcion,
    precioCompra,
    categoria,
    proveedorId,
    tiempoEntregaDias,
    promocionActiva,
    condicionAlmacenamiento,
    fechaVencimiento,
    precioVenta,
  }: IProduct) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioCompra = precioCompra;
    this.categoria = categoria;
    this.proveedorId = proveedorId;
    this.tiempoEntregaDias = tiempoEntregaDias;
    this.promocionActiva = promocionActiva;
    this.condicionAlmacenamiento = condicionAlmacenamiento;
    this.fechaVencimiento = fechaVencimiento;
    this.precioVenta = precioVenta;
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
      promocionActiva: dto.promocion_activa,
      condicionAlmacenamiento: dto.condicion_almacenamiento,
      fechaVencimiento: dto.fecha_vencimiento
        ? isoDateToDate(dto.fecha_vencimiento)
        : undefined,
    });
  }

  static fromCreateEntityToDto(entity: ICreateProduct): ICreateProductDTO {
    return {
      nombre: entity.nombre,
      descripcion: entity.descripcion,
      categoria: entity.categoria,
      proveedor_id: entity.proveedorId,
      precio_compra: entity.precioCompra,
      precio_venta: entity.precioVenta,
      promocion_activa: entity.promocionActiva,
      fecha_vencimiento: entity.fechaVencimiento,
      condicion_almacenamiento: entity.condicionAlmacenamiento,
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

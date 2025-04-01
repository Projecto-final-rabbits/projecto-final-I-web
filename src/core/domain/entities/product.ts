import {
  IProduct,
  ICreateProductDTO,
  IUpdateProductDTO,
} from "../interfaces/product";

export class Product implements IProduct {
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

  private constructor(props: IProduct) {
    this.id = props.id;
    this.nombre = props.nombre;
    this.categoria = props.categoria;
    this.fechaVencimiento = props.fechaVencimiento;
    this.condicionAlmacenamiento = props.condicionAlmacenamiento;
    this.descripcion = props.descripcion;
    this.precioCompra = props.precioCompra;
    this.proveedorId = props.proveedorId;
    this.tiempoEntregaDias = props.tiempoEntregaDias;
    this.precioVenta = props.precioVenta;
    this.promocionActiva = props.promocionActiva;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;

    this.validate();
  }

  // Factory method to create a new product
  public static create(props: ICreateProductDTO): Product {
    const now = new Date();
    return new Product({
      ...props,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    });
  }

  // Factory method to reconstruct a product from persistence
  public static reconstruct(props: IProduct): Product {
    return new Product(props);
  }

  // Business methods
  public activatePromotion(): void {
    this.promocionActiva = true;
    this.updatedAt = new Date();
  }

  public deactivatePromotion(): void {
    this.promocionActiva = false;
    this.updatedAt = new Date();
  }

  public updatePrice(newPrice: number): void {
    if (newPrice <= 0) {
      throw new Error("El precio de venta debe ser mayor a 0");
    }
    this.precioVenta = newPrice;
    this.updatedAt = new Date();
  }

  public isExpired(): boolean {
    return this.fechaVencimiento < new Date();
  }

  public calculateProfit(): number {
    return this.precioVenta - this.precioCompra;
  }

  public update(props: IUpdateProductDTO): void {
    if (props.nombre) this.nombre = props.nombre;
    if (props.categoria) this.categoria = props.categoria;
    if (props.fechaVencimiento) this.fechaVencimiento = props.fechaVencimiento;
    if (props.condicionAlmacenamiento)
      this.condicionAlmacenamiento = props.condicionAlmacenamiento;
    if (props.descripcion) this.descripcion = props.descripcion;
    if (props.precioCompra) this.precioCompra = props.precioCompra;
    if (props.proveedorId) this.proveedorId = props.proveedorId;
    if (props.tiempoEntregaDias)
      this.tiempoEntregaDias = props.tiempoEntregaDias;
    if (props.precioVenta) this.precioVenta = props.precioVenta;
    if (props.promocionActiva !== undefined)
      this.promocionActiva = props.promocionActiva;

    this.updatedAt = new Date();
    this.validate();
  }

  private validate(): void {
    if (!this.nombre || this.nombre.trim().length === 0) {
      throw new Error("El nombre del producto es requerido");
    }
    if (!this.categoria || this.categoria.trim().length === 0) {
      throw new Error("La categoría del producto es requerida");
    }
    if (this.precioCompra <= 0) {
      throw new Error("El precio de compra debe ser mayor a 0");
    }
    if (this.precioVenta <= 0) {
      throw new Error("El precio de venta debe ser mayor a 0");
    }
    if (this.precioVenta <= this.precioCompra) {
      throw new Error("El precio de venta debe ser mayor al precio de compra");
    }
    if (this.tiempoEntregaDias < 0) {
      throw new Error("El tiempo de entrega no puede ser negativo");
    }
    if (!this.proveedorId || this.proveedorId.trim().length === 0) {
      throw new Error("El ID del proveedor es requerido");
    }
  }
}

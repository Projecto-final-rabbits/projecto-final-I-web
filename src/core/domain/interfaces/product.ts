interface IProduct {
  id: string;
  nombre: string;
  descripcion?: string;
  precioCompra: number;
  categoria?: string;
  proveedorId: number;
  tiempoEntregaDias?: number;
  promocionActiva: boolean;
  condicionAlmacenamiento?: string;
  fechaVencimiento?: Date;
  precioVenta: number;
}

interface IProductDTO {
  id: string;
  nombre: string;
  descripcion: string;
  precio_compra: number;
  precio_venta: number;
  promocion_activa: boolean;
  categoria: string;
  condicion_almacenamiento: string;
  fecha_vencimiento: string;
  proveedor_id: number;
  tiempo_entrega_dias: number;
}

type ICreateProduct = {
  nombre: string;
  descripcion?: string;
  categoria?: string;
  proveedorId: number;
  precioCompra: number;
  precioVenta: number;
  promocionActiva: boolean;
  fechaVencimiento: Date;
  condicionAlmacenamiento: string;
  tiempoEntregaDias?: number;
};

type ICreateProductDTO = {
  nombre: string;
  descripcion?: string;
  categoria?: string;
  proveedor_id: number;
  precio_compra: number;
  precio_venta: number;
  promocion_activa: boolean;
  condicion_almacenamiento: string | null;
  fecha_vencimiento: Date | null;
  tiempo_entrega_dias?: number;
};

type IMoveProduct = {
  productId: string;
  warehouseId: string;
  fromWarehouseId?: number;
  toWarehouseId?: number;
  description?: string;
  quantity: number;
  movementType: string;
};

type IUpdateProductDTO = Partial<
  Omit<IProduct, "id" | "createdAt" | "updatedAt">
>;

export type {
  IProduct,
  IProductDTO,
  ICreateProduct,
  ICreateProductDTO,
  IUpdateProductDTO,
  IMoveProduct,
};

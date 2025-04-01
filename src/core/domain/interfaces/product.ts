export interface IProduct {
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

export type ICreateProductDTO = Omit<
  IProduct,
  "id" | "createdAt" | "updatedAt"
>;

export type IUpdateProductDTO = Partial<
  Omit<IProduct, "id" | "createdAt" | "updatedAt">
>;

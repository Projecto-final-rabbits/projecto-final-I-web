interface IProduct {
  id: string;
  nombre: string;
  descripcion: string;
  precioCompra: number;
  categoria: string;
  proveedorId: string;
  tiempoEntregaDias: number;
}

interface IProductDTO {
  id: string;
  nombre: string;
  descripcion: string;
  precio_compra: number;
  categoria: string;
  proveedor_id: string;
  tiempo_entrega_dias: number;
}

type ICreateProduct = {
  nombre: string;
  descripcion: string;
  precioCompra: number;
  categoria: string;
  proveedorId: string;
  tiempoEntregaDias: number;
};

type ICreateProductDTO = {
  nombre: string;
  descripcion: string;
  precio_compra: number;
  categoria: string;
  proveedor_id: string;
  tiempo_entrega_dias: number;
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
};

// src/core/infrastructure/api/repositories/OrdersRepositoryImpl.ts
import { axiosClientForSales } from "@/core/infraestructure/api/clients";

export interface Pedido {
  id: number;
  cliente_id: number;
  vendedor_id: number;
  fecha_envio: string;
  direccion_entrega: string;
  estado: string;
  total: number;
  productos: { producto_id: string; cantidad: number }[];
}

export class OrdersRepositoryImpl {
  async listAll(): Promise<Pedido[]> {
    const { data } = await axiosClientForSales.get<Pedido[]>("/pedidos/");
    return data;
  }
}
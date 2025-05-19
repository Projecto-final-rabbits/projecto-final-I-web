// src/core/infrastructure/api/repositories/OrdersRepositoryImpl.ts
import { RouteOrder } from "@/core/domain/interfaces";
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

interface RawOrder {
  pedido_id: number;
  origen: string;
  destino: string;
}

export class OrdersRepositoryImpl {
  async listAll(): Promise<Pedido[]> {
    const { data } = await axiosClientForSales.get<Pedido[]>("/pedidos/");
    return data;
  }

  async getRoute(pedidoId: number): Promise<RouteOrder> {
    const { data } = await axiosClientForSales.get<RawOrder>(
      `/pedidos/${pedidoId}/direcciones`
    );

    return {
      pedidoId: data.pedido_id,
      origen: data.origen,
      destino: data.destino,
    };
  }
}

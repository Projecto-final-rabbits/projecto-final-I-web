// src/core/domain/interfaces/dashboard.ts

export interface Periodo {
  start_date: string; // ISO date
  end_date: string;   // ISO date
}

export interface TopProductoItem {
  producto_id: string;
  nombre: string;
  cantidad_vendida: number;
  ingreso_generado: number;
}

export interface SalesSummary {
  periodo: Periodo;
  total_pedidos: number;
  ingresos_totales: number;
  pedidos_por_estado: Record<string, number>;
  ticket_promedio: number;
  clientes_activos: number;
  top_productos: TopProductoItem[];
  ventas_por_ciudad: Record<string, number>;
}
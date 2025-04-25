import { GridColDef } from "@mui/x-data-grid";

export interface InventoryApi {
  id: number;
  producto_id: string;       
  bodega_id: string;         
  cantidad_disponible: number;
}

export interface InventoryRow {
  id: string;
  warehouseName: string;
  productName: string;
  quantity: number;
}

export const columns: GridColDef<InventoryRow>[] = [
  { field: "warehouseName", headerName: "Bodega", flex: 1, align: "left" },
  { field: "productName",  headerName: "Producto", flex: 1, align: "left" },
  {
    field: "quantity",
    headerName: "Cantidad disponible",
    type: "number",
    flex: 0.5,
    align: "left",
    headerAlign: "left",
  },
];

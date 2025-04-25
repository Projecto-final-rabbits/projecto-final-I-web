import { GridColDef } from "@mui/x-data-grid";

export type Inventory = {
  id: string;
  warehouseName: string;
  productName: string;
  quantity: number;
  lastUpdated: string;
};

export const columns: GridColDef<Inventory>[] = [
  {
    field: "warehouseName",
    headerName: "Bodega",
  },
  {
    field: "productName",
    headerName: "Producto",
  },
  {
    field: "quantity",
    headerName: "Cantidad Disponible",
  },
  {
    field: "lastUpdated",
    headerName: "Última Actualización",
  },
];
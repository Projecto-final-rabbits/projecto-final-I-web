import { IProduct } from "@/core/domain/interfaces";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef<IProduct>[] = [
  { field: "nombre", headerName: "Nombre", flex: 1 },
  { field: "descripcion", headerName: "Descripcion", flex: 1 },
  {
    field: "precioCompra",
    headerName: "Precio de compra",
    type: "number",
    valueGetter: (value) => `$${value || ""}`,
    flex: 1,
  },
  {
    field: "tiempoEntregaDias",
    headerName: "Tiempo de entrega (dias)",
    type: "number",
    valueGetter: (value) => `${value || ""} dias`,
    flex: 1,
  },
  {
    field: "categoria",
    headerName: "Categoria",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
  },
];

export { columns };

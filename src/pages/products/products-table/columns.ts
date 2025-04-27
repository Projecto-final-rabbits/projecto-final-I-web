import { IProduct } from "@/core/domain/interfaces";
import { dateToStringFormat } from "@/utils/dates";
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
    field: "precioVenta",
    headerName: "Precio de venta",
    type: "number",
    valueGetter: (value) => `$${value || ""}`,
    flex: 1,
  },
  {
    field: "promocionActiva",
    headerName: "Promocion activa",
    type: "boolean",
    flex: 1,
    valueFormatter: ({ value }) => (value ? "Sí" : "No"),
  },
  {
    field: "condicionAlmacenamiento",
    headerName: "Condicion de almacenamiento",
    flex: 1,
  },
  {
    field: "fechaVencimiento",
    headerName: "Fecha de vencimiento",
    flex: 1,
    renderCell: ({ value }) =>
      value ? dateToStringFormat(value) : "No aplica",
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

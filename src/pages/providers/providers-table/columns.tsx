import { IProvider } from "@/core/domain/interfaces";
import { GridColDef } from "@mui/x-data-grid";
import { RowActions } from "./components";

const columns: GridColDef<IProvider>[] = [
  {
    field: "actions",
    headerName: "Acciones",
    width: 130,
    align: "left",
    renderCell: ({ row }) => <RowActions {...row} />,
  },
  { field: "nombre", headerName: "Nombre", flex: 1, align: "left" },
  {
    field: "contacto",
    headerName: "Contacto",
    align: "left",
  },
  { field: "telefono", headerName: "Telefono", flex: 1, align: "left" },
  { field: "email", headerName: "Email", flex: 1, align: "left" },
  { field: "pais", headerName: "Pais", flex: 1, align: "left" },
];

export { columns };

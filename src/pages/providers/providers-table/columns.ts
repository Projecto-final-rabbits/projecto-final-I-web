import { IProvider } from "@/core/domain/interfaces";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef<IProvider>[] = [
  { field: "nombre", headerName: "Nombre", flex: 1 },
  {
    field: "contacto",
    headerName: "Contacto",
  },
  { field: "telefono", headerName: "Telefono", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "pais", headerName: "Pais", flex: 1 },
];

export { columns };

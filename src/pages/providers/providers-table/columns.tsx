import { IProvider } from "@/core/domain/interfaces";
import { GridColDef } from "@mui/x-data-grid";
import { RowActions } from "./components";
import { useTranslation } from "react-i18next";

export const useProviderColumns = (): GridColDef<IProvider>[] => {
  const { t } = useTranslation();
  return [
    {
      field: "actions",
      headerName: t("providers.actions"),
      width: 130,
      align: "left",
      renderCell: ({ row }) => <RowActions {...row} />,
    },
    {
      field: "nombre",
      headerName: t("providers.name"),
      flex: 1,
      align: "left",
    },
    { field: "contacto", headerName: t("providers.contact"), align: "left" },
    {
      field: "telefono",
      headerName: t("providers.phone"),
      flex: 1,
      align: "left",
    },
    {
      field: "email",
      headerName: t("providers.email"),
      flex: 1,
      align: "left",
    },
    {
      field: "pais",
      headerName: t("providers.country"),
      flex: 1,
      align: "left",
    },
  ];
};

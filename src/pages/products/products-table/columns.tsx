import { useTranslation } from "react-i18next";
import { GridColDef } from "@mui/x-data-grid";
import { IProduct } from "@/core/domain/interfaces";
import { dateToStringFormat } from "@/utils/dates";

export const useProductColumns = (): GridColDef<IProduct>[] => {
  const { t } = useTranslation();

  return [
    { field: "nombre", headerName: t("products.name"), flex: 1 },
    { field: "descripcion", headerName: t("products.description"), flex: 1 },
    {
      field: "precioCompra",
      headerName: t("products.purchasePrice"),
      type: "number",
      valueGetter: (value) => `$${value || ""}`,
      flex: 1,
    },
    {
      field: "precioVenta",
      headerName: t("products.salePrice"),
      type: "number",
      valueGetter: (value) => `$${value || ""}`,
      flex: 1,
    },
    {
      field: "promocionActiva",
      headerName: t("products.activePromotion"),
      type: "boolean",
      flex: 1,
      valueFormatter: ({ value }) => (value ? t("common.yes") : t("common.no")),
    },
    {
      field: "condicionAlmacenamiento",
      headerName: t("products.storageCondition"),
      flex: 1,
    },
    {
      field: "fechaVencimiento",
      headerName: t("products.expirationDate"),
      flex: 1,
      renderCell: ({ value }) =>
        value ? dateToStringFormat(value) : t("products.notApplicable"),
    },
    {
      field: "tiempoEntregaDias",
      headerName: t("products.deliveryTime"),
      type: "number",
      valueGetter: (value) => `${value || ""} ${t("products.days")}`,
      flex: 1,
    },
    {
      field: "categoria",
      headerName: t("products.category"),
      description: t("products.categoryDescription"),
      sortable: false,
      flex: 1,
    },
  ];
};

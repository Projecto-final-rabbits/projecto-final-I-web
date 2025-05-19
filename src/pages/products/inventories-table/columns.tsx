import { GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

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

export const useInventoryColumns = (): GridColDef<InventoryRow>[] => {
  const { t } = useTranslation();

  return [
    {
      field: "warehouseName",
      headerName: t("products.warehouse"),
      flex: 1,
      align: "left",
    },
    {
      field: "productName",
      headerName: t("products.name"),
      flex: 1,
      align: "left",
    },
    {
      field: "quantity",
      headerName: t("products.availableQuantity"),
      type: "number",
      flex: 0.5,
      align: "left",
      headerAlign: "left",
    },
  ];
};

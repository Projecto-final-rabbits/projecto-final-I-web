import { columns, InventoryApi, InventoryRow } from "./columns";
import { CustomTable } from "@/components/organisms";
import { Box, Skeleton } from "@mui/material";
import {
  useGetInventoriesQuery,
  useGetProductsQuery,
  useGetWarehousesQuery,
} from "@/state-managment/slices";

const InventoriesTable = () => {
 
  const {
    data: inventories = [] as InventoryApi[],
    isSuccess: okInventories,
    isLoading: isLoadingInventories,
  } = useGetInventoriesQuery();

  const { data: products = [], isSuccess: okProducts } =
    useGetProductsQuery({});
  const { data: warehouses = [], isSuccess: okWarehouses } =
    useGetWarehousesQuery();

  if (isLoadingInventories || !okProducts || !okWarehouses || !okInventories) {
    return <Skeleton variant="rectangular" width="100%" height={400} />;
  }

  /* Transformo los datos del API → filas de tabla */
  const rows: InventoryRow[] = inventories.map((inv) => {
    const product = products.find((p) => p.id === inv.producto_id);
    const warehouse = warehouses.find((w) => w.id.toString() === inv.bodega_id);

    return {
      id: inv.id.toString(),
      warehouseName: warehouse?.nombre ?? `Bodega ${inv.bodega_id}`,
      productName: product?.nombre ?? "Producto desconocido",
      quantity: inv.cantidad_disponible,
    };
  });

  return (
    <Box sx={{ width: "100%" }}>
      <CustomTable rows={rows} columns={columns} />
    </Box>
  );
};

export { InventoriesTable };

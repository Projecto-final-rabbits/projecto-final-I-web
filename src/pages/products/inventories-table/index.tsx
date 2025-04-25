import { columns, Inventory } from "./columns";
import { CustomTable } from "@/components/organisms";
import { Skeleton, Box} from "@mui/material";
import { useGetInventoriesQuery, useGetProductsQuery, useGetWarehousesQuery } from "@/state-managment/slices";

const InventoriesTable = () => {
    const { data: inventoriesData, isSuccess: isSuccessInventories, isLoading } = useGetInventoriesQuery();
    const { data: productsData, isSuccess: isSuccessProducts } = useGetProductsQuery({});
    const { data: warehousesData, isSuccess: isSuccessWarehouses } = useGetWarehousesQuery();
  
    if (isLoading || !isSuccessProducts || !isSuccessWarehouses) {
      return <Skeleton variant="rectangular" width="100%" height={400} />;
    }
  
    if (isSuccessInventories && inventoriesData) {
      const mappedData: Inventory[] = inventoriesData.map((item) => {
        const product = productsData?.find((p) => p.id === item.producto_id);
        const warehouse = warehousesData?.find((w) => w.id === item.bodega_id);
  
        return {
          id: item.id.toString(),
          warehouseName: warehouse?.nombre || `Bodega ${item.bodega_id}`,
          productName: product?.nombre || "Producto desconocido",
          quantity: item.cantidad_disponible,
          lastUpdated: "2025-04-25",
        };
      });
  
      return (
        <Box sx={{ width: "100%", mt: 4 }}>
          <CustomTable
            title="Inventarios por Bodega"
            rows={mappedData}
            columns={columns}
          />
        </Box>
      );
    }
  
    return null;
  };
  

export { InventoriesTable };
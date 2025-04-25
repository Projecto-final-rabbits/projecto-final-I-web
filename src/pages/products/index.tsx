import { Box } from "@mui/material";
import { ProductsTable } from "./products-table";
import { InventoriesTable } from "./inventories-table";

const ProductsPage = () => {
  return (
    <Box>
      <ProductsTable />
      <InventoriesTable />
    </Box>
  );
};
export { ProductsPage };

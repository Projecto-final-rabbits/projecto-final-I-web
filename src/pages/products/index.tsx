import { Box } from "@mui/material";
import { ProductsTable } from "./products-table";
import { InventoriesTable } from "./inventories-table";
import { AccordionSection } from "@/components/organisms/accordion/AccordionSection";

const ProductsPage = () => (
  <Box>
    <ProductsTable />

    <AccordionSection title="Inventarios">
      <InventoriesTable />
    </AccordionSection>
  </Box>
);

export { ProductsPage };
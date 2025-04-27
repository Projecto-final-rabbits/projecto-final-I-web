import { Box } from "@mui/material";
import { ProductsTable } from "./products-table";
import { InventoriesTable } from "./inventories-table";
import { AccordionSection } from "@/components/organisms/accordion/AccordionSection";
import { RootState } from "@/state-managment/store";
import { useSelector } from "react-redux";

const ProductsPage = () => {
  const user = useSelector((state: RootState) => state.auth.user); 

  return (
    <Box>
      <ProductsTable />

      {user?.role !== "ventas" && (
        <AccordionSection title="Inventarios">
          <InventoriesTable />
        </AccordionSection>
      )}
    </Box>
  );
};

export { ProductsPage };

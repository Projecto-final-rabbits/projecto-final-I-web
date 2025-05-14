import { Box } from "@mui/material";
import { ProductsTable } from "./products-table";
import { InventoriesTable } from "./inventories-table";
import { AccordionSection } from "@/components/organisms/accordion/AccordionSection";
import { RootState } from "@/state-managment/store";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ProductsPage = () => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Box>
      <ProductsTable />

      {user?.role !== "ventas" && (
        <AccordionSection title={t("products.inventories")}>
          <InventoriesTable />
        </AccordionSection>
      )}
    </Box>
  );
};

export { ProductsPage };

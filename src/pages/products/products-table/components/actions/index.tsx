import { Box, Stack } from "@mui/material";
import { AddMultipleProducts, AddProduct, InventoryToggle } from "./components";
import { Filters } from "../filters";

type ActionsProps = {
  onCancel?: () => void;
  isLoading?: boolean;
};

const Actions: React.FC<ActionsProps> = () => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack>
        <InventoryToggle />
      </Stack>
      <Box sx={{ minWidth: "300px" }}>
        <Filters />
      </Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <AddMultipleProducts />
        <AddProduct />
      </Stack>
    </Stack>
  );
};

export { Actions };

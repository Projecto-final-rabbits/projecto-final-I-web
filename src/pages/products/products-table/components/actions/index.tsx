import { Stack } from "@mui/material";
import { AddMultipleProducts, AddProduct, InventoryToggle } from "./components";

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
      <Stack direction="row" spacing={1} alignItems="center">
        <AddMultipleProducts />
        <AddProduct />
      </Stack>
    </Stack>
  );
};

export { Actions };

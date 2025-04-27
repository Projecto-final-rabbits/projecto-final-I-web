import { Box, Stack } from "@mui/material";
import {
  AddMultipleProducts,
  AddProduct,
  InventoryToggle,
  MoveProduct,
} from "./components";
import { Filters } from "../filters";
import { RootState } from "@/state-managment/store";
import { useSelector } from "react-redux";

type ActionsProps = {
  onCancel?: () => void;
  isLoading?: boolean;
};

const Actions: React.FC<ActionsProps> = () => {
  const user = useSelector((state: RootState) => state.auth.user); 
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap="0.5rem"
    >
      <Stack>
        <InventoryToggle />
      </Stack>
      <Box sx={{ minWidth: "400px" }}>
        <Filters />
      </Box>
      {user?.role !== "ventas" && (
      <Stack direction="row" spacing={1} alignItems="center">
        <AddMultipleProducts />
        <AddProduct />
        <MoveProduct />
      </Stack>
      )}
    </Stack>
  );
};

export { Actions };

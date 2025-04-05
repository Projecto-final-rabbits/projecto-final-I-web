import { Button, Stack } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import AddIcon from "@mui/icons-material/Add";
import { InventoryToggle } from "./components";

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
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          startIcon={<GetAppIcon />}
        >
          Importar .csv
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          startIcon={<AddIcon />}
        >
          Agregar Producto
        </Button>
      </Stack>
    </Stack>
  );
};

export { Actions };

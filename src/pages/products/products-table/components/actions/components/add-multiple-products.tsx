import { Button } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";

const AddMultipleProducts = () => {
  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        startIcon={<GetAppIcon />}
      >
        Importar .csv
      </Button>
    </>
  );
};

export { AddMultipleProducts };

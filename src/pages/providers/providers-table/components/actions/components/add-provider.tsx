import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "@/components/organisms";
import { useState } from "react";
import { CreateProviderForm } from "@/components/organisms/create-provider-form";

const AddProvider: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOnClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpen(true)}
        data-testid="crear-proveedor"
        size="small"
        startIcon={<AddIcon />}
      >
        Agregar Proveedor
      </Button>
      <Modal
        open={open}
        handleClose={handleOnClose}
        title="Agregar Proveedor"
        disableEscapeKeyDown
      >
        <CreateProviderForm onClose={handleOnClose} />
      </Modal>
    </>
  );
};

export { AddProvider };

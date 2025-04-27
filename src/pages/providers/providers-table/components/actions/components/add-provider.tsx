import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "@/components/organisms";
import { useState } from "react";
import { ProviderForm } from "@/components/organisms/provider-form";
import { useSaveProviderMutation } from "@/state-managment/slices";
import { ICreateProvider } from "@/core/domain/interfaces";
import { toast } from "react-toastify";

const AddProvider: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [saveProvider, { isLoading }] = useSaveProviderMutation();

  const handleCreateProvider = (data: ICreateProvider) => {
    saveProvider(data)
      .unwrap()
      .then(() => {
        toast.success("Proveedor creado correctamente");
        handleOnClose();
      })
      .catch(() => {
        toast.error("Oops! Error, intentalo mas tarde.");
      });
  };

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
        <ProviderForm
          onSubmit={handleCreateProvider}
          onClose={handleOnClose}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
};

export { AddProvider };

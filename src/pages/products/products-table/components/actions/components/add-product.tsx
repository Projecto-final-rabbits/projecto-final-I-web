import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "@/components/organisms";
import { useState } from "react";
import { CreateProductForm } from "@/components/organisms/create-product-form";

const AddProduct: React.FC = () => {
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
        data-testid="crear-producto"
        size="small"
        startIcon={<AddIcon />}
      >
        Agregar Producto
      </Button>
      <Modal
        open={open}
        handleClose={handleOnClose}
        title="Agregar Producto"
        disableEscapeKeyDown
      >
        <CreateProductForm onClose={handleOnClose} />
      </Modal>
    </>
  );
};

export { AddProduct };

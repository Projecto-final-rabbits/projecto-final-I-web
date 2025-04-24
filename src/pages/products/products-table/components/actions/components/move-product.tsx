import { Button } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Modal } from "@/components/organisms";
import { useState } from "react";
import { MoveProductForm } from "@/components/organisms/move-product-form";

const MoveProduct: React.FC = () => {
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
        data-testid="move-producto"
        size="small"
        startIcon={<LocalShippingIcon />}
      >
        Mover Producto
      </Button>
      <Modal
        open={open}
        handleClose={handleOnClose}
        title="Mover Producto"
        disableEscapeKeyDown
      >
        <MoveProductForm onClose={handleOnClose} />
      </Modal>
    </>
  );
};

export { MoveProduct };

import { Button } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Modal } from "@/components/organisms";
import { useState } from "react";
import { MoveProductForm } from "@/components/organisms/move-product-form";
import { useTranslation } from "react-i18next";

const MoveProduct: React.FC = () => {
  const { t } = useTranslation();
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
        {t("products.moveProduct")}
      </Button>
      <Modal
        open={open}
        handleClose={handleOnClose}
        title={t("products.moveProduct")}
        disableEscapeKeyDown
      >
        <MoveProductForm onClose={handleOnClose} />
      </Modal>
    </>
  );
};

export { MoveProduct };

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "@/components/organisms";
import { useState } from "react";
import { CreateProductForm } from "@/components/organisms/create-product-form";
import { useTranslation } from "react-i18next";

const AddProduct: React.FC = () => {
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
        data-testid="crear-producto"
        size="small"
        startIcon={<AddIcon />}
      >
        {t("products.addProduct")}
      </Button>
      <Modal
        open={open}
        handleClose={handleOnClose}
        title={t("products.addProduct")}
        disableEscapeKeyDown
      >
        <CreateProductForm onClose={handleOnClose} />
      </Modal>
    </>
  );
};

export { AddProduct };
